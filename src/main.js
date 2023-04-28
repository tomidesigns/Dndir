import 'core-js/modules/es.promise';
import 'core-js/modules/es.array.iterator';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './app.vue';
//import { makeServer } from './server';

//TailwindCSS
import '@/index.css';

//Tailwind Override
import '@/assets/main.css';

// Mock Services
// if (process.env.NODE_ENV === 'development') {
//   makeServer();
// }

const appEl = document.getElementById('app');

if (appEl) {
  const pinia = createPinia();
  const app = createApp(App);

  app.use(pinia);
  app.mount(appEl);
}
