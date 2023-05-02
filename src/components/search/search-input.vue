<script setup>
import { computed } from 'vue';
import { useDndStore } from 'vueStores/dnd-store';
import icon from 'vueComponents/shared/svg-icon.vue';

//Store
const dndStore = useDndStore();

//Computeds
const placeholderText = computed(() =>
  dndStore.isDisabled ? 'Select category...' : 'Search DnD API...'
);
const disabledClass = computed(() => (dndStore.isDisabled ? 'disabled:opacity-75' : ''));
</script>

<template>
  <div class="relative w-full">
    <input
      type="search"
      id="search-dropdown"
      :class="disabledClass"
      class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
      :placeholder="placeholderText"
      :disabled="dndStore.isDisabled"
      v-model="dndStore.term"
    />
    <button
      type="submit"
      :disabled="dndStore.isDisabled"
      :class="disabledClass"
      class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-red-700 rounded-r-lg border border-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-600 dark:bg-red-600 dark:hover:bg-red-700"
    >
      <icon
        class="block w-5 h-5 fill-white"
        name="search-icon"
        :id="`search-icon`"
        :text="`Search button icon`"
      />
      <span class="sr-only">Search</span>
    </button>
  </div>
</template>
