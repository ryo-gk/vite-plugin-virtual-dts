# Vite Plugin Dts Generator
** Not released yet **

## How to use

Write config like below.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import demo from 'vite-plugin-demo`
import dts from 'vite-plugin-dts-generator'

export default defineConfig({
  plugins: [
    vue(),
    demo(),// assume this generates `virtual:vite-plugin-demo`
    dts({
      targets: ['virtual:vite-plugin-demo'], // specify the name of virtual modules
      outDir: './types' // specify the directory to generate d.ts files
    })
  ],
})
```
