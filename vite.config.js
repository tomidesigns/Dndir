import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import { VitePluginFonts } from 'vite-plugin-fonts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslint(),
    svgLoader(),
    VitePluginFonts({
      google: {
        families: ['PT Serif'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vueComponents: fileURLToPath(new URL('./src/components', import.meta.url)),
      vueComposables: fileURLToPath(new URL('./src/composables', import.meta.url)),
      vueStores: fileURLToPath(new URL('./src/stores', import.meta.url)),
    },
  },
});
