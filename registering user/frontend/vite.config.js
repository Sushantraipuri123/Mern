import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
      proxy:{
       '/users':'http://localhost:5050'
      },
     },
  plugins: [react()],
})
