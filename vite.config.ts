import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import demo from './dev/plugins/vite-plugin-demo'
import VirtualDts from './lib'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    demo(),
    VirtualDts({
      targets: ['virtual:vite-plugin-demo'],
      outDir: './types'
    })
  ],
})
