<script setup>
import { useDndStore } from 'vueStores/dnd-store';
import articleCard from 'vueComponents/card/card-item.vue';

//Store
const dndStore = useDndStore();
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
    <articleCard v-for="item in dndStore.paginationData" :key="item.index" :dndData="item" />
  </div>
</template>
