import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs'
import { createCompilerHost, createProgram, CompilerOptions } from 'typescript'
import { format as prettier } from 'prettier'
import { format as formatPath } from 'path'

export function generateDts(id: string, raw: string, outDir: string) {
  const dir = './tmp'
  const fileName = `${formatId(id)}.js`

  createJs(dir, fileName, raw)

  generate(dir, fileName, outDir)

  removeTmpDir(dir)
}

function generate(dir: string, fileName: string, outDir: string) {
  compile(dir, fileName, outDir, {
    allowJs: true,
    declaration: true,
    emitDeclarationOnly: true
  })
}

function formatId(id: string) {
  return id.split('virtual:').slice(-1)
}

function compile(dir: string, fileName: string, outDir: string, options: CompilerOptions): void {
  const createdFiles: Record<string, any> = {}
  const path = formatPath({ dir, base: fileName })

  const host = createCompilerHost(options)
  host.writeFile = (fileName: string, contents: string) => createdFiles[fileName] = contents

  const program = createProgram([path], options, host)
  program.emit()

  host.readFile(path)

  const outFileName = fileName.replace(".js", ".d.ts")
  const dts = createdFiles[`${dir}/${outFileName}`.slice(2)]

  createDts(outDir, outFileName, dts)
}

function createJs(dir: string, fileName: string, raw: string) {
  const path = formatPath({ dir, base: fileName })
  if (!existsSync(dir)) {
    mkdirSync(dir)
  }

  writeFileSync(path, raw)
}

function createDts(dir: string, fileName: string, content: string) {
  const path = formatPath({ dir, base: fileName })
  if (!existsSync(dir)) {
    mkdirSync(dir)
  }

  writeFileSync(path, format(toDeclareModule(fileName.split('.')[0], content)))
}

function removeTmpDir(dir: string) {
  rmSync(dir, { recursive: true })
}

function toDeclareModule(moduleName: string, content: string) {
  return `declare module 'virtual:${moduleName}' {
    ${content}
  }`
}

function format(content: string) {
  return prettier(content, {
    semi: false,
    parser: 'typescript'
  })
}
