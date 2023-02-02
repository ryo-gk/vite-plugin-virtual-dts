import type { Plugin } from 'vite'
import { generateDts } from './declaration'

export interface PluginOptions {
  targets: string[]
  outDir: string
}

function VitePluginVirtualDts(options: PluginOptions): Plugin {
  const { targets, outDir } = options

  return {
    name: 'vite-plugin-virtual-dts',
    transform(code, id) {
      if (targets.some(target => id.includes(target))) {
        generateDts(id, code, outDir)
      }
    }
  }
}

export default VitePluginVirtualDts
