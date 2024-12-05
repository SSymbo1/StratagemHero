import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path/win32'

// https://vite.dev/config/
export default defineConfig({
    base: '/',
    plugins: [vue()],
    server: {
        hmr: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
})
