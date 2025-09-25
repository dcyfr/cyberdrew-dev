#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const repoRoot = resolve(__dirname, '..')
const sourcePath = resolve(repoRoot, '.github', 'copilot-instructions.md')
const targetPath = resolve(repoRoot, 'agents.md')

function main() {
  if (!existsSync(sourcePath)) {
    console.error(`Source not found: ${sourcePath}`)
    process.exit(1)
  }
  const header = '<!--\n  NOTE: This file is auto-synced from .github/copilot-instructions.md.\n  Edit the source file instead: .github/copilot-instructions.md\n-->'
  const src = readFileSync(sourcePath, 'utf8').trim()
  const out = `${header}\n\n${src}`
  writeFileSync(targetPath, out)
  console.log(`Synced ${targetPath} from ${sourcePath}`)
}

main()
