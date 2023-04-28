<script setup>
import icon from 'vueComponents/shared/svg-icon.vue';
import { useDndStore } from 'vueStores/dnd-store';

//Store
const dndStore = useDndStore();
</script>

<template>
  <div class="flex flex-col justify-center">
    <icon
      class="my-12 w-32 mx-auto animate-pulse"
      :name="`error-icon`"
      :id="`error-icon`"
      :text="`Error icon`"
    />

    <h2 class="block text-center text-xl text-white">
      {{ dndStore.responseError }}
    </h2>
  </div>
</template>
