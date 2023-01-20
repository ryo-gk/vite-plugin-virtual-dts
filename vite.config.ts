import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import demo from './dev/plugins/vite-plugin-demo'
import dts from './lib'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), demo(), dts({ input: ['virtual:vite-plugin-demo'], output: '' })],
})
