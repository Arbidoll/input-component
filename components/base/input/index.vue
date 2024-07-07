<script setup lang="ts">
  import { ref } from 'vue';
  import type { TInputAttributes } from '~/components/base/input/types';
  import { mergeObjects } from '~/helpers/objects';

  defineOptions({
    inheritAttrs: false,
  });

  const modelValue = defineModel<string>();

  const props = defineProps<{
    inputAttributes: TInputAttributes;
  }>();

  const emits = defineEmits<{
    (e: 'on-cleared'): void;
    (e: 'on-key-down', event: KeyboardEvent): void;
  }>();

  const attributes = useAttrs();
  const cAttributes = computed(() => {
    return mergeObjects(props.inputAttributes, attributes);
  });

  const inputElementRef = ref<HTMLInputElement>();

  const onInput = (evt: Event) => {
    const { value } = (evt as InputEvent).target as EventTarget & {
      value: string;
    };

    if (value.length === 0) {
      emits('on-cleared');
    }
  };

  const onKeyDown = (evt: KeyboardEvent) => {
    emits('on-key-down', evt);
  };

  defineExpose({
    inputElementRef,
  });
</script>

<template>
  <div class="base-input">
    <input
      v-bind="cAttributes"
      ref="inputElementRef"
      v-model="modelValue"
      class="base-input__inner"
      @input="onInput"
      @keydown.up.down.enter="onKeyDown"
    />

    <label :for="props.inputAttributes.id" class="base-input__label">
      {{ props.inputAttributes.placeholder }}
    </label>
  </div>
</template>

<style scoped lang="scss">
  .base-input {
    $b: &;

    position: relative;
    width: 100%;
    padding: 15px 0 0;

    &__inner {
      width: inherit;
      padding: 7px 0;
      color: $black;
      font-size: 1.3rem;
      font-family: inherit;
      background: transparent;
      border: 0;
      border-bottom: 2px solid $gray;
      outline: 0;
      transition: border-color 0.2s;

      &::placeholder {
        color: transparent;
      }

      &::-webkit-search-cancel-button {
        -webkit-appearance: none;
        height: 1em;
        width: 1em;
        background: url(https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg)
          no-repeat 50% 50%;
        background-size: contain;
        opacity: 0;
        pointer-events: none;
      }

      &:focus::-webkit-search-cancel-button {
        opacity: 0.3;
        pointer-events: all;
      }

      &:placeholder-shown ~ .base-input__label {
        top: 20px;
        font-size: 1.3rem;
        cursor: text;
      }
    }

    &__inner:focus {
      padding-bottom: 6px;
      font-weight: 700;
      border-width: 3px;
      border-image: linear-gradient(to right, $primary, $secondary);
      border-image-slice: 1;

      & ~ .base-input__label {
        position: absolute;
        top: 0;
        display: block;
        color: $primary;
        font-weight: 700;
        font-size: 1rem;
        transition: 0.2s;
      }
    }

    &__label {
      position: absolute;
      top: 0;
      display: block;
      color: $gray;
      font-size: 1rem;
      transition: 0.2s;
    }
  }
</style>
