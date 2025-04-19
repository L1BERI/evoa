// @ts-check
import { defineConfig, envField } from 'astro/config';

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
      env: {
        schema: {
          TG_BOT_TOKEN: envField.string({ context: "server", access: "secret"}),
          TG_CHAT_TOKEN: envField.string({ context: "server", access: "secret"})
        }
      }
})