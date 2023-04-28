import apiClient from './api-client';

export default {
  dndCategories() {
    return apiClient.get(`/api/`);
  },
  dndCatResults(category) {
    return apiClient.get(`/api/${category}`);
  },
  dndSearchResults(category, formattedTerm) {
    return apiClient.get(`/api/${category}/${formattedTerm}`);
  },
};
