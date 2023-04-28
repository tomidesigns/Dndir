<script setup>
import icon from 'vueComponents/shared/svg-icon.vue';
</script>

<template>
  <div
    class="absolute z-50 inset-0 flex flex-wrap justify-center content-center h-full w-full opacity-80 bg-black"
    role="status"
  >
    <icon
      class="inline w-24 animate-spin fill-white"
      name="d20-dice"
      :id="`loader`"
      :text="`Loading data`"
    />

    <span class="sr-only">Loading...</span>
  </div>
</template>
