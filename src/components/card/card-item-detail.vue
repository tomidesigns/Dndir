<script setup>
import { computed } from 'vue';
import icon from 'vueComponents/shared/svg-icon.vue';

//Props
const props = defineProps({
  dndData: {
    required: true,
    type: Object,
  },
});

const baseUrl = 'https://www.dnd5eapi.co';

const type = computed(() => props.dndData.attack_type);
const title = computed(() => props.dndData.name);
const desc = computed(() => props.dndData.description);
const image = computed(() => baseUrl + props.dndData.image);
</script>

<template>
  <div
    class="flex flex-col items-center max-w-md w-full mx-auto pb-8 px-4 bg-red-700 rounded-lg shadow-xl overflow-hidden pointer-events-none"
    @click="getItemInfo"
  >
    <icon
      :id="`dnd-card-logo`"
      class="inline my-2 w-64 fill-white"
      name="dnd-card-logo"
      :text="`Dungeons &amp; Dragons card`"
    />
    <div class="w-full p-2 bg-white rounded-lg">
      <div v-if="image" class="w-full mb-4 md:mb-0 md:mr-4">
        <img
          v-if="dndData.image"
          class="h-full w-full object-cover"
          :src="image"
          :alt="`Artwork of ${title}`"
          fetchpriority="high"
        />
        <icon
          v-else
          :id="`${categoryName}-icon`"
          class="my-2 w-32 mx-auto"
          :name="`${categoryName}-icon`"
          :text="`${categoryName} icon`"
        />
      </div>
      <span v-if="type" class="block uppercase tracking-wide text-sm text-violet-500 font-medium">{{
        type
      }}</span>
      <h3 class="mt-1 text-lg text-black font-pt text-center font-bold">
        {{ title }}
        <span class="sr-only">Click item to find out more</span>
      </h3>
      <p v-if="desc" class="mt-2 text-base text-slate-500">{{ desc }}</p>
    </div>
  </div>
</template>
