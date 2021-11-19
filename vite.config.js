import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/klotski/dist',
  plugins: [vue()],
  server:{
    open:true
  }
})
