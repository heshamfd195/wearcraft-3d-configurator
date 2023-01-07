import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':"https://hesh-configurator-3d.s3.ap-south-1.amazonaws.com"
    }

  },
  plugins: [react()]
})
