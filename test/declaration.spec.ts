import { existsSync, mkdirSync, readFileSync, rmdirSync } from 'fs'
import { describe, expect, it, afterAll, beforeAll } from 'vitest'
//import { getDeclarationBuilder } from '../src/decralation'
import { generateDts } from '../lib/declaration'
import { format } from 'path'

describe('declaration', async () => {
  const CODE_DIR = './test/code'
  const EXPECTED_DIR = './test/expected'
  const ACTUAL_DIR = './test/actual'

  beforeAll(() => {
    if (!existsSync(ACTUAL_DIR)) {
      mkdirSync(ACTUAL_DIR);
    }
  })

  afterAll(() => {
    rmdirSync(ACTUAL_DIR, { recursive: true })
  })

  it('should generate declaration file', () => {
    const code = readFileSync(format({ dir: CODE_DIR, base: 'sample.js' }), { encoding: 'utf8' })

    generateDts('test', code, ACTUAL_DIR)

    const expected = readFileSync(format({ dir: EXPECTED_DIR, base: 'test.d.ts'}), { encoding: 'utf8' })
    const actual = readFileSync(format({ dir: ACTUAL_DIR, base: 'test.d.ts'}), { encoding: 'utf8' })

    expect(actual).toEqual(expected)
  })
})
