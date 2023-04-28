<script setup>
import { computed, ref, nextTick } from 'vue';
import { useDndStore } from 'vueStores/dnd-store';
import icon from 'vueComponents/shared/svg-icon.vue';

//Store
const dndStore = useDndStore();

//Refs
const noTerm = ref(true);

//Props
const props = defineProps({
  dndData: {
    required: true,
    type: Object,
  },
});
const baseUrl = 'https://www.dnd5eapi.co';
const categoryName = dndStore.category;
const type = computed(() => props.dndData.attack_type);
const title = computed(() => props.dndData.name);
const desc = computed(() => props.dndData.description);
const image = computed(() => baseUrl + props.dndData.image);

const noTermClass = computed(() => ({
  'no-term': noTerm.value && !dndStore.hasTerm,
}));

//Methods
async function getItemInfo() {
  dndStore.term = title.value;

  await nextTick();
  dndStore.getResponseData();
}
</script>

<template>
  <div
    @click="getItemInfo"
    :class="noTermClass"
    class="group flex flex-col items-center max-w-md w-full mx-auto pb-8 px-4 bg-red-700 rounded-lg shadow-xl overflow-hidden pointer-events-none"
  >
    <icon
      v-if="dndStore.hasTerm"
      class="inline my-2 w-64 fill-white"
      name="dnd-card-logo"
      :id="`dnd-card-logo`"
      :text="`Dungeons &amp; Dragons card`"
    />
    <div
      class="group-[.no-term]:relative group-[.no-term]:flex group-[.no-term]:flex-row group-[.no-term]:items-center group-[.no-term]:p-0 w-full p-2 bg-white rounded-lg"
    >
      <div class="group-[.no-term]:w-9 w-full mb-4 md:mb-0 md:mr-4" v-if="image">
        <img
          class="h-full w-full object-cover"
          :src="image"
          :alt="`Artwork of ${title}`"
          fetchpriority="high"
          v-if="dndData.image"
        />
        <icon
          v-else
          class="group-[.no-term]:w-full group-[.no-term]:m-0 my-2 w-32 mx-auto"
          :name="`${categoryName}-icon`"
          :id="`${categoryName}-icon`"
          :text="`${categoryName} icon`"
        />
      </div>
      <span class="block uppercase tracking-wide text-sm text-violet-500 font-medium" v-if="type">{{
        type
      }}</span>
      <h3 class="group-[.no-term]:mt-0 mt-1 text-lg text-black font-pt text-center font-bold">
        {{ title }}
        <span class="sr-only">Click item to find out more</span>
      </h3>
      <p class="mt-2 text-base text-slate-500" v-if="desc">{{ desc }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.no-term {
  padding: 0.8rem 0.8rem 0.8rem 0.5rem;
  border-bottom: 3px solid #374151;
  border-right: 3px solid #374151;
  border-top: 3px solid #dc2626;
  border-left: 3px solid #dc2626;
  background-color: #ffffff;
  pointer-events: auto;
  cursor: pointer;
  transition: border 0.3s ease-in-out;

  &:hover {
    border-right: 3px solid #dc2626;
    border-bottom: 3px solid #dc2626;
  }
}
</style>
