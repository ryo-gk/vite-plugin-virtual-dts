import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs'
import ts, { CompilerOptions } from 'typescript'
import prettier from 'prettier'

const { createCompilerHost, createProgram } = ts

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

// The below function refers to https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#getting-the-dts-from-a-javascript-file
function compile(dir: string, fileName: string, outDir: string, options: CompilerOptions): void {
  // Create a Program with an in-memory emit
  const createdFiles: Record<string, any> = {}
  const path = `${dir}/${fileName}`

  const host = createCompilerHost(options)
  host.writeFile = (fileName: string, contents: string) => createdFiles[fileName] = contents

  // Prepare and emit the d.ts files
  const program = createProgram([path], options, host)
  program.emit()

  host.readFile(path)

  const outFileName = fileName.replace(".js", ".d.ts")
  const dts = createdFiles[`${dir}/${outFileName}`.slice(2)]

  createDts(outDir, outFileName, dts)
}

function createJs(dir: string, fileName: string, raw: string) {
  const path = `${dir}/${fileName}`
  if (!existsSync(dir)) {
    mkdirSync(dir)
  }

  writeFileSync(path, raw)
}

function createDts(dir: string, fileName: string, content: string) {
  const path = `${dir}/${fileName}`
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
  return prettier.format(content, {
    semi: false,
    parser: 'typescript'
  })
}
