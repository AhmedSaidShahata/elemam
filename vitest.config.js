import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '#imports': resolve(__dirname, './.nuxt/imports'),
      '@': resolve(__dirname, './app'),
      '~': resolve(__dirname, './app'),

    },
  },
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',

  },
})