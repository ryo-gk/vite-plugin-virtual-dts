import type { Plugin } from 'vite'

const data = {
  firstName: 'John',
  lastName: 'Doe',
  age: 20
}

function VitePluginDemo(): Plugin {
  const virtualModuleId = 'virtual:vite-plugin-demo'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vite-plugin-demo',

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export const data = ${JSON.stringify(data)}`
      }
    }
  }
}

export default VitePluginDemo
