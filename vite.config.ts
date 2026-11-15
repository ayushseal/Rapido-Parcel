import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path detection:
// - Vercel deploys to root domain (e.g. rapido-parcel.vercel.app), so base must be '/'
// - GitHub Pages deploys to subpath (e.g. ayushseal.github.io/Rapido-Parcel), so base is '/Rapido-Parcel/'
// - Local dev / other environments use './' or '/'
const base = process.env.VERCEL ? '/' : (process.env.GITHUB_ACTIONS ? '/Rapido-Parcel/' : './')

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
  ],
})
