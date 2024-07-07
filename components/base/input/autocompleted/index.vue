<script setup lang="ts" generic="T extends object | string">
  import BaseInput from '~/components/base/input/index.vue';
  import InputDropdown from '~/components/base/input/autocompleted/_inputDropdown/index.vue';
  import InputDropdownOption from '~/components/base/input/autocompleted/_inputDropdown/InputDropdownOption.vue';
  import useModalVisibility from '~/composables/useModalVisibility';
  import useInputSearchOptions from '~/components/base/input/autocompleted/useInputSearchOptions';
  import type { TInputAttributes } from '~/components/base/input/types';
  import { mergeObjects } from '~/helpers/objects';

  defineOptions({
    inheritAttrs: false,
  });

  const modelValue = defineModel<string>();

  const attributes = useAttrs();

  interface IProps {
    options: T[];
    optionKey: keyof T;
    inputOptions: TInputAttributes;
  }

  const props = withDefaults(defineProps<IProps>(), {
    options: () => [],
  });

  const cAttributes = computed(() => {
    const attrs = mergeObjects(props.inputOptions, attributes);

    attrs.onFocus = (e: FocusEvent) => {
      showDropdown();

      if (Object.hasOwn(props.inputOptions, 'onFocus')) {
        props.inputOptions!.onFocus!(e);
      }
    };

    return attrs;
  });

  const { options, optionKey } = toRefs(props);
  const { filteredOptions, filterOptions } = useInputSearchOptions(
    options,
    optionKey.value,
  );
  const debounceOptions = useDebounce(filterOptions);
  watch(
    () => modelValue.value,
    () => debounceOptions(modelValue.value),
  );

  const inputWrapperRef = ref<HTMLDivElement>();
  const {
    isShow,
    showModal: showDropdown,
    hideModal: hideDropdown,
  } = useModalVisibility(inputWrapperRef);

  const onOptionClick = (optionText: string) => {
    modelValue.value = optionText;
    hideDropdown();
  };
</script>

<template>
  <div ref="inputWrapperRef" class="base-input-with-autocomplete">
    <base-input
      v-model="modelValue"
      v-bind="cAttributes"
      type="search"
      class="base-input-with-autocomplete__inner"
      :input-attributes="props.inputOptions"
      @focus="showDropdown"
    />

    <input-dropdown
      v-show="filteredOptions.length"
      :is-show="isShow"
      class="base-input-with-autocomplete__dropdown"
    >
      <input-dropdown-option
        v-for="option in filteredOptions"
        :key="option"
        :search="modelValue!"
        :text="option"
        class="base-input-with-autocomplete__dropdown-item"
        @on-option-click="onOptionClick"
      />
    </input-dropdown>
  </div>
</template>

<style lang="scss">
  .base-input-with-autocomplete {
    $b: &;

    position: relative;
    display: inline-block;
    width: 100%;
  }
</style>
