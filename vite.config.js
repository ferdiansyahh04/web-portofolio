import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Use the GitHub Pages sub-path only when building inside GitHub Actions.
// Vercel and local dev will use the root path "/".
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'

// https://vite.dev/config/
export default defineConfig({
  base: isGitHubPages ? '/web-portofolio/' : '/',
  plugins: [react(), tailwindcss()],
})
