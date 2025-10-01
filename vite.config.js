import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
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
