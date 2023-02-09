# Vite Plugin Virtual Dts

## How to use

Install package.

```bash
> npm install -D vite-plugin-virtual-dts
```

Write config like below.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import demo from 'vite-plugin-demo`
import dts from 'vite-plugin-virtual-dts'

export default defineConfig({
  plugins: [
    vue(),
    demo(),// assume this plugin creates the virtual module named `virtual:vite-plugin-demo`
    dts({
      targets: ['virtual:vite-plugin-demo'], // specify the name of virtual modules
      outDir: './types' // specify the directory to generate d.ts files
    })
  ],
})
```

Once you set the configurations correctly, a declaration file is generated during development.
