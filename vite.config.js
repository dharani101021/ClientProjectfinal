import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // <-- import path for resolving aliases

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // <-- this sets "@" to point to the "src" folder
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
