<template>
  <div style="display: flex; width: 320px; margin: 100px 0 0 200px">
    <autocompleted-input
      v-model="value"
      :options="cities"
      :option-key="'name'"
      :input-options="{
        placeholder: 'Введите город',
      }"
    />
  </div>
</template>

<script setup lang="ts">
  import AutocompletedInput from '~/components/base/input/autocompleted/index.vue';
  import { cities } from './components/base/input/autocompleted/cities.mock';

  const value = ref('');
</script>
