import type { Plugin } from 'vite'

export interface PluginOptions {
  input: string[]
  output: string
}

function VitePluginDtsGenerator(options: PluginOptions): Plugin {
  const { input } = options

  return {
    name: 'vite-plugin-dts-generator',
    buildStart() {
      console.log('RUN')
    },
    resolveId(id) {
      if (input.map(id => `\0${id}`).includes(id)) {
        console.log(id)
        return id
      }
    },
    load(id) {
      console.log(id)
      if (input.map(id => `${id}`).includes(id)) {
        console.log('GET!', id)
      }
    }
  }
}

export default VitePluginDtsGenerator
