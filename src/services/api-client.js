// api-clients.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www.dnd5eapi.co',
  timeout: 1000,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
});

export default apiClient;
