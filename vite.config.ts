import { defineConfig, type CommonServerOptions } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'

const commonOptions: CommonServerOptions = { open: true, host: true }

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    VitePWA({
      manifest: {
        name: 'Snake Game',
        short_name: 'Simple Snake Game',
        description: 'Game made with Phaser JS, Vite and TypeScript',
        display: 'fullscreen',
        orientation: 'any',
        start_url: '/',
        theme_color: '#00ff00',
        icons: [
          {
            src: '/icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      registerType: 'autoUpdate',
    }),
  ],
  build: { target: 'ESNext', chunkSizeWarningLimit: 1_500 },
  server: { ...commonOptions, port: 5_174 },
  preview: { ...commonOptions, port: 5_175 },
})
