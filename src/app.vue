<script setup>
import { useDndStore } from 'vueStores/dnd-store';
import icon from 'vueComponents/shared/svg-icon.vue';
import search from 'vueComponents/shared/search-field.vue';
import cardList from 'vueComponents/card/card-list.vue';
import paginationNav from 'vueComponents/shared/pagination-nav.vue';
import loader from 'vueComponents/shared/loader-icon.vue';
import responseError from 'vueComponents/shared/response-error.vue';

//Store
const dndStore = useDndStore();
</script>

<template>
  <div class="bg-gray-800">
    <div class="bg-gray-900 border-solid border-b dark:border-gray-600">
      <div
        class="grid md:grid-rows-1 md:grid-cols-[100px_1fr] gap-4 md:gap-16 place-items-center justify-items-center max-w-5xl mx-auto p-6"
      >
        <header class="flex justify-center content-center py-4">
          <icon
            :id="`dnd-logo`"
            class="inline w-24 fill-white"
            name="dnd-logo"
            :text="`Welcome to Dungeons &amp; Dragons`"
          />
        </header>
        <search />
      </div>
    </div>

    <main class="min-h-screen">
      <section class="max-w-5xl grid grid-cols-1 justify-items-center m-auto p-6">
        <cardList v-if="dndStore.hasResults" />
        <responseError v-if="dndStore.hasError" />
        <paginationNav v-if="dndStore.hasPagination" />
        <loader v-if="dndStore.isLoading" />
      </section>
    </main>

    <footer class="flex justify-center p-5 bg-gray-900">
      <p class="text-white">D&amp;D 5e API 0.1</p>
    </footer>
  </div>
</template>
