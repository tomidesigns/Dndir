<script setup>
import { useDndStore } from 'vueStores/dnd-store';
import cardItem from 'vueComponents/card/card-item.vue';
import cardItemDetail from 'vueComponents/card/card-item-detail.vue';

//Store
const dndStore = useDndStore();
</script>

<template>
  <div v-if="!dndStore.hasTerm" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
    <cardItem v-for="item in dndStore.paginationData" :key="item.index" :dnd-data="item" />
  </div>
  <div v-else class="grid grid-cols-1 w-full">
    <cardItemDetail v-for="item in dndStore.paginationData" :key="item.index" :dnd-data="item" />
  </div>
</template>
