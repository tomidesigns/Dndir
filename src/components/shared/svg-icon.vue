<script setup>
import { defineAsyncComponent } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const icon = defineAsyncComponent(() => import(`../../assets/svg/${props.name}.svg`));
</script>

<template>
  <div class="block">
    <component :is="icon" role="img" :aria-describedby="id" />
    <span v-if="text" :id="id" class="sr-only">{{ text }}</span>
  </div>
</template>
