import * as path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/StratagemHero',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replaceAll('\\', '/')

          if (normalizedId.includes('/node_modules/')) {
            if (/\/node_modules\/(?:@intlify|pinia|vue|vue-i18n|vue-router)\//.test(normalizedId))
              return 'vue-vendor'

            if (/\/node_modules\/(?:hammerjs|howler)\//.test(normalizedId))
              return 'media-vendor'
          }

          if (normalizedId.endsWith('/src/constants/stratagems.ts'))
            return 'stratagem-data'
        },
      },
    },
  },
  plugins: [vue(), tailwindcss()],
  server: {
    hmr: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
