import { defineStore } from 'pinia';
import services from '../services/service';

export const useDndStore = defineStore('dndStore', {
  state: () => ({
    categories: [],
    category: null,
    term: '',
    results: [],
    activeTerm: false,
    loading: false,
    responseError: null,
    pageNumber: 0,
    resultCount: null,
    defaultPageSize: 30,
  }),
  getters: {
    hasError(state) {
      return state.responseError !== null;
    },
    hasResults(state) {
      return state.results !== null;
    },
    isLoading(state) {
      return state.loading !== false;
    },
    hasPagination(state) {
      return state.results !== null && state.results.length > 10;
    },
    formattedTerm(state) {
      return state.term.replace(/[\s]+/g, '-').toLowerCase();
    },
    isDisabled(state) {
      return state.category === null;
    },
    hasTerm(state) {
      return state.activeTerm !== false;
    },
    paginationDisabledPrev(state) {
      return state.pageNumber === 0;
    },
    paginationDisabledNext(state) {
      return state.pageNumber >= state.resultCount - 1;
    },
    paginationData(state) {
      const start = state.pageNumber * state.defaultPageSize,
        end = start + state.defaultPageSize;

      return state.results.slice(start, end);
    },
    paginationNavItems(state) {
      return Math.ceil(state.results.length / state.defaultPageSize) - 1;
    },
  },
  actions: {
    async getCategories() {
      try {
        return await services.dndCategories().then((response) => {
          this.categories = response.data;
        });
      } catch (error) {
        return error;
      }
    },
    async getResponseData() {
      const serviceType =
        this.term !== ''
          ? services.dndSearchResults(this.category, this.formattedTerm)
          : services.dndCatResults(this.category);
      this.loading = true;

      try {
        return await serviceType.then((response) => {
          this.results = [];

          if (this.term !== '') {
            this.activeTerm = true;
            this.results.push(response.data);
          } else {
            this.activeTerm = false;
            this.results.push(...response.data.results);
            this.resultCount = response.data.count;
          }

          this.responseError = null;
          this.loading = false;
        });
      } catch (error) {
        this.loading = false;

        if (error.response) {
          const errStatus = error.response.status;

          if (errStatus === 404) this.results = [];
          this.responseError = `BEHOLD(er)... What you are looking for can't be found.`;
        } else if (error.request) {
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }
    },
  },
});
