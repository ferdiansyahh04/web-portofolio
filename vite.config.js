import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Saat build di Vercel, env VERCEL=1 di-set otomatis → base = '/'.
// Saat build di GitHub Pages (atau lokal default), base = '/web-portofolio/'.
const isVercel = process.env.VERCEL === '1'

export default defineConfig({
  base: isVercel ? '/' : '/web-portofolio/',
  plugins: [react(), tailwindcss()],
  server: {
    // Saat dev lokal, jalankan `vercel dev` di port 3000 untuk eksekusi /api routes,
    // atau set DATABYTE_API_KEY dan jalankan `vercel dev` saja.
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
