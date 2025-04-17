// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    base:'/evoa/',
    vite: {
        resolve: {
          alias: {
            '@scripts': '/src/scripts',
          },
        },
      },
})