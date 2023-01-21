import type { Plugin } from 'vite'
import { generateDts } from './declaration'

export interface PluginOptions {
  targets: string[]
  outDir: string
}

function VitePluginDtsGenerator(options: PluginOptions): Plugin {
  const { targets, outDir } = options

  return {
    name: 'vite-plugin-dts-generator',
    transform: {
      order: 'post',
      handler (code, id) {
        const resolvedIds = targets.map(i => resolveId(i))

        if (resolvedIds.includes(id)) {
          generateDts(id, code, outDir)
        }
      }
    }
  }
}

function resolveId(id: string) {
  return id.startsWith('\0') ? id :`\0${id}`
}

export default VitePluginDtsGenerator
