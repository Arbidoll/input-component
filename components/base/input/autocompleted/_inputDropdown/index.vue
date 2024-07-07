<script setup lang="ts">
  const props = defineProps<{
    isShow: boolean;
  }>();

  const BASE_CLASS_NAME = 'base-input-dropdown';
  const classList = computed(() => {
    const classes = [BASE_CLASS_NAME];

    if (!props.isShow) {
      classes.push(`${BASE_CLASS_NAME}--hidden`);
    }

    return classes;
  });
</script>

<template>
  <div :class="classList">
    <slot />
  </div>
</template>

<style scoped lang="scss">
  .base-input-dropdown {
    $b: &;

    position: absolute;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-height: 200px;
    padding: 12px 8px;
    overflow-y: auto;
    background-color: #f9f9f9;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);

    &--hidden {
      display: none;
    }
  }
</style>
