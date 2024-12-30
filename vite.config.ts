import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"
import * as path from "node:path"

// https://vite.dev/config/
export default defineConfig({
    base: "/StratagemHero",
    plugins: [vue()],
    server: {
        hmr: true
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
})
