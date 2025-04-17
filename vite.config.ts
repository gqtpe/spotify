import {AliasOptions, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//@ts-ignore
import path from "path";

//@ts-ignore
const root = path.resolve(__dirname, "src");
const common = path.resolve(__dirname, "src/common");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": root,
      "@common":common,
    } as AliasOptions,
  },
  plugins: [react()],
  server: {port: 3000},
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  }
})
