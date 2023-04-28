<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import icon from 'vueComponents/shared/svg-icon.vue';
import { useDndStore } from 'vueStores/dnd-store';

//Store
const dndStore = useDndStore();

const itemRefs = ref([]);
const visibleCategoryList = ref(false);

//Computed
const placeholderText = computed(() =>
  dndStore.isDisabled ? 'Select category...' : 'Search DnD API...'
);
const categoryLabel = computed(() => (dndStore.category ? dndStore.category : 'Categories'));
const disabledClass = computed(() => (dndStore.isDisabled ? 'disabled:opacity-75' : ''));

const transitionClass = computed(() =>
  visibleCategoryList.value
    ? 'translate-x-0 opacity-1'
    : '-translate-x-full opacity-0 invisible md:transform-none'
);

//Methods
async function toggleCategoryList() {
  visibleCategoryList.value = !visibleCategoryList.value;

  if (visibleCategoryList.value) {
    const firstItem = itemRefs.value[0];
    await nextTick();

    firstItem.focus();
  }
}

function getResults() {
  dndStore.getResponseData();
  visibleCategoryList.value = false;
}

function formatLabel(key) {
  let formattedLabel = key.replace(/-/g, ' ').replace(/_/g, ' ');
  let capitalizeLabel = formattedLabel
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  return capitalizeLabel.join(' ');
}

function formatValue(val) {
  return val.replace('/api/', '');
}

onMounted(() => {
  dndStore.getCategories();
});
</script>

<template>
  <form class="w-full" @submit.prevent="getResults">
    <div class="flex md:relative">
      <label
        for="search-dropdown"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <button
        id="dropdown-button"
        @click="toggleCategoryList"
        data-dropdown-toggle="dropdown"
        class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-red-700 dark:text-white dark:border-gray-600"
        type="button"
      >
        {{ formatLabel(categoryLabel) }}
        <svg
          aria-hidden="true"
          class="w-4 h-4 ml-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        id="dropdown"
        class="fixed md:absolute top-0 bottom-0 md:bottom-auto left-0 md:top-11 z-10 bg-white md:rounded-lg shadow w-44 dark:bg-gray-700 border-r-2 border-gray-900 transform overflow-auto ease-in-out transition-all duration-300"
        :class="transitionClass"
      >
        <button
          type="button"
          class="block md:hidden my-2 mr-2 ml-auto w-7 h-7"
          @click="toggleCategoryList"
        >
          <icon
            class="inline my-2 w-64 fill-white"
            name="close-icon"
            :id="`close-icon`"
            :text="`Close button icon`"
          />
          <span class="sr-only">Close category menu</span>
        </button>
        <fieldset
          class="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdown-button"
        >
          <legend class="sr-only">Select a maintenance drone:</legend>

          <div
            class="inline-flex w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            v-for="(category, key, index) in dndStore.categories"
            :key="`${category}-${index}`"
          >
            <input
              class="hidden peer"
              type="radio"
              :id="`${key}-${index}`"
              name="dnd-cat"
              :value="formatValue(category)"
              @click="toggleCategoryList"
              v-model="dndStore.category"
            />
            <label
              class="block w-full px-4 py-2 dark:peer-checked:bg-gray-600 peer-checked:text-white cursor-pointer"
              :for="`${key}-${index}`"
              ref="itemRefs"
              >{{ formatLabel(key) }}</label
            >
          </div>
        </fieldset>
      </div>
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
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </div>
    </div>
  </form>
</template>
