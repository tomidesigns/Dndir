<script setup>
import searchInput from 'vueComponents/search/search-input.vue';
import searchFilter from 'vueComponents/search/search-filter.vue';
import { useDndStore } from 'vueStores/dnd-store';

//Store
const dndStore = useDndStore();

//Methods
function getResults() {
  dndStore.getResponseData();
}
</script>

<template>
  <form class="w-full" @submit.prevent="getResults">
    <div class="flex md:relative">
      <searchFilter />
      <searchInput />
    </div>
  </form>
</template>
