import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.svg'],
      manifest: {
        name: 'Adil Portfolio',
        short_name: 'Portfolio',
        theme_color: '#050816',
        background_color: '#050816',
        display: 'standalone',
        icons: [
          { src: 'logo.svg', sizes: '192x192', type: 'image/svg+xml' },
        ],
      },
      workbox: {
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.endsWith('.gltf') || url.pathname.endsWith('.bin'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'models-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 30 * 24 * 60 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'images-cache',
              expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'static-resources' },
          },
        ],
      },
    }),
    // Brotli and Gzip outputs for CDN/host negotiation
    viteCompression({ algorithm: 'brotliCompress', ext: '.br', verbose: false }),
    viteCompression({ algorithm: 'gzip', ext: '.gz', verbose: false }),
    ...(process.env.ANALYZE ? [visualizer({ filename: 'dist/stats.html', open: false, gzipSize: true, brotliSize: true })] : []),
  ],
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    target: 'es2019',
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
    modulePreload: { polyfill: true },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei', 'maath'],
          motion: ['framer-motion'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei'],
  },
}))
