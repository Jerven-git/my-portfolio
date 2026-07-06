import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative base so the build works under a GitHub Pages project path
  // (e.g. username.github.io/repo-name) as well as a custom domain.
  base: './',
  plugins: [react(), tailwindcss()],
})
