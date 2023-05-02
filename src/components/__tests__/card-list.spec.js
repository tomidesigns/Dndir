import { describe, it, expect, vi } from 'vitest';

import { shallowMount } from '@vue/test-utils';
import { defineStore } from 'pinia';
import { createTestingPinia } from '@pinia/testing';

import cardList from '../card/card-list.vue';

const useDndStore = defineStore('dndStore', {
  state: () => ({
    pageNumber: 0,
    defaultPageSize: 30,
    results: [],
  }),
  getters: {
    paginationData(state) {
      const start = state.pageNumber * state.defaultPageSize,
        end = start + state.defaultPageSize;

      return state.results.slice(start, end);
    },
  },
});

const pinia = createTestingPinia({ createSpy: vi.fn });

useDndStore(pinia);

describe('cardList', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(cardList);
    expect(wrapper.html()).toBeTruthy();
  });
});
