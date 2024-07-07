<script setup lang="ts">
  import useTextWrapper from '~/composables/useTextWrapper';

  const props = defineProps<{
    text: string;
    search: string;
    disabled?: boolean;
  }>();

  const emits = defineEmits<{
    (e: 'on-option-click', text: string): void;
  }>();

  const BASE_CLASS_NAME = 'base-input-dropdown-option';
  const classList = computed(() => {
    const classes = [BASE_CLASS_NAME];

    if (props.disabled) {
      classes.push(`${BASE_CLASS_NAME}--disabled`);
    }

    return classes;
  });

  const { text, search } = toRefs(props);
  const { formattedText } = useTextWrapper(text, search, {
    tag: 'span',
    className: `${BASE_CLASS_NAME}--matched`,
  });

  const onClick = () => {
    if (props.disabled) {
      return;
    }

    emits('on-option-click', props.text);
  };
</script>

<template>
  <span :class="classList" @click="onClick" v-html="formattedText" />
</template>

<style lang="scss">
  .base-input-dropdown-option {
    $b: &;

    padding: 8px;
    font-size: 14px;
    border-radius: 8px;
    cursor: pointer;

    &:hover,
    &:focus {
      background: $secondary--light;
    }

    &--matched {
      font-weight: bold;
      font-size: 16px;
    }
  }
</style>
