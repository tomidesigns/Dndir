<script setup>
import { computed, nextTick } from 'vue';
import { useDndStore } from 'vueStores/dnd-store';
import icon from 'vueComponents/shared/svg-icon.vue';

//Store
const dndStore = useDndStore();

//Props
const props = defineProps({
  dndData: {
    required: true,
    type: Object,
  },
});

const categoryName = dndStore.category;

const title = computed(() => props.dndData.name);

//Methods
async function getItemInfo() {
  dndStore.term = title.value;

  await nextTick();
  dndStore.getResponseData();
}
</script>

<template>
  <div
    class="flex flex-col items-center max-w-md w-full mx-auto rounded-lg shadow-xl overflow-hidden border-4 border-red-700 cursor-pointer ease-in duration-300 hover:border-gray-900"
    @click="getItemInfo"
  >
    <div class="relative flex flex-row items-center w-full p-2 bg-white">
      <div class="w-9 w-full mb-4 md:mb-0 md:mr-4">
        <icon
          :id="`${categoryName}-icon`"
          class="w-full m-0 my-2 w-32 mx-auto"
          :name="`${categoryName}-icon`"
          :text="`${categoryName} icon`"
        />
      </div>
      <h3 class="mt-0 mt-1 text-lg text-black font-pt text-center font-bold">
        {{ title }}
        <span class="sr-only">Click item to find out more</span>
      </h3>
    </div>
  </div>
</template>
