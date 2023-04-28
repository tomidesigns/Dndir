<script setup>
import { useDndStore } from 'vueStores/dnd-store';

//Store
const dndStore = useDndStore();

//Methods
function nextPage() {
  dndStore.pageNumber++;
}

function prevPage() {
  if (dndStore.pageNumber > 1) dndStore.pageNumber--;
}

function goToPage(numPage) {
  dndStore.pageNumber = numPage;
}

function activePagItem(itemVal) {
  return dndStore.pageNumber === itemVal ? 'active-pag-item' : '';
}
</script>

<template>
  <nav aria-label="Page navigation" class="mt-8">
    <ul class="inline-flex -space-x-px">
      <li>
        <button
          @click="prevPage"
          :disabled="dndStore.paginationDisabledPrev"
          type="button"
          class="mr-1 px-3 py-2 ml-0 text-white bg-red-700 border rounded-l-lg border-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-600 dark:bg-red-600 dark:hover:bg-red-700"
        >
          Previous
        </button>
      </li>
      <li class="flex flex-row flex-wrap justify-center">
        <button
          v-for="item in dndStore.paginationNavItems"
          :key="item"
          @click="() => goToPage(item)"
          type="button"
          :class="activePagItem(item)"
          class="px-3 py-2 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          {{ item }}
        </button>
      </li>
      <li>
        <button
          @click="nextPage"
          :disabled="dndStore.paginationDisabledNext"
          type="button"
          class="ml-1 px-3 py-2 text-white bg-red-700 border rounded-r-lg border-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-600 dark:bg-red-600 dark:hover:bg-red-700"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.active-pag-item {
  background-color: #dc2626;
  border-color: #ffffff;
  color: #ffffff;
}
</style>
