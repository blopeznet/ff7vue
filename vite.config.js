import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({
    plugins: [
        vue({
            reactivityTransform: true
        }),
        VitePWA({ registerType: 'autoUpdate' })
    ],

    base: '/ff7vue/',
})