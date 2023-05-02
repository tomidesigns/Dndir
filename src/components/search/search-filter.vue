<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
import { useDndStore } from 'vueStores/dnd-store';

import icon from 'vueComponents/shared/svg-icon.vue';

const windowWidth = ref(window.innerWidth);
const menuIcon = ref(false);

//Store
const dndStore = useDndStore();

const itemRefs = ref([]);
const visibleCategoryList = ref(false);

//Computed
const categoryLabel = computed(() => (dndStore.category ? dndStore.category : 'Categories'));
const transitionStyling = computed(() =>
  visibleCategoryList.value
    ? 'translate-x-0 opacity-1'
    : '-translate-x-full opacity-0 invisible md:transform-none'
);
const rotateIconStyling = computed(() => (visibleCategoryList.value ? 'rotate-180' : 'rotate-0'));
const toggleText = computed(() =>
  visibleCategoryList.value ? 'Close filter menu' : 'Open filter menu'
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

function handleResize() {
  windowWidth.value = window.innerWidth;
  windowWidth.value <= 768 ? (menuIcon.value = true) : (menuIcon.value = false);
}

defineExpose({
  visibleCategoryList,
});

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
  dndStore.getCategories();
});

onUnmounted(() => {
  handleResize();
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <label
    for="search-dropdown"
    class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
    >Search</label
  >
  <button
    id="dropdown-button"
    data-dropdown-toggle="dropdown"
    class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-red-700 dark:text-white dark:border-gray-600"
    type="button"
    @click="toggleCategoryList"
  >
    {{ formatLabel(categoryLabel) }}
    <icon
      v-if="!menuIcon"
      :id="`chevron-icon`"
      class="w-3 h-3 ml-2 fill-white"
      :class="rotateIconStyling"
      name="chevron-icon"
      :text="`Chevron button icon`"
    />
    <icon
      v-else
      :id="`menu-icon`"
      class="w-3 h-3 ml-2 fill-white"
      name="menu-icon"
      :text="`Menu button icon`"
    />
    <span class="sr-only">{{ toggleText }}</span>
  </button>
  <div
    id="dropdown"
    class="fixed md:absolute top-0 bottom-0 md:bottom-auto left-0 md:top-11 z-10 bg-white md:rounded-lg shadow w-44 dark:bg-gray-700 border-r-2 border-gray-900 transform overflow-auto ease-in-out transition-all duration-300"
    :class="transitionStyling"
  >
    <button
      type="button"
      class="block md:hidden my-2 mr-2 ml-auto w-7 h-7"
      @click="toggleCategoryList"
    >
      <icon
        :id="`close-icon`"
        class="inline my-2 w-64 fill-white"
        name="close-icon"
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
        v-for="(category, key, index) in dndStore.categories"
        :key="`${category}-${index}`"
        class="inline-flex w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <input
          :id="`${key}-${index}`"
          v-model="dndStore.category"
          class="hidden peer"
          type="radio"
          name="dnd-cat"
          :value="formatValue(category)"
          @click="toggleCategoryList"
        />
        <label
          ref="itemRefs"
          class="block w-full px-4 py-2 dark:peer-checked:bg-gray-600 peer-checked:text-white cursor-pointer"
          :for="`${key}-${index}`"
          >{{ formatLabel(key) }}</label
        >
      </div>
    </fieldset>
  </div>
</template>
