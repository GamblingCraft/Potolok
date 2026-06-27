import { readFileSync, writeFileSync } from 'fs'
import { globSync } from 'glob'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const root  = join(__dir, '..')

const files = globSync('app/pages/catalog/**/*.vue', { cwd: root, absolute: true })

// Многострочный CSS паттерн → img-совместимый
const CSS_OLD = `.cp-hero__bg {
  position: absolute; inset: 0;
  background-size: cover; background-position: center; z-index: 0;
}`

const CSS_NEW = `.cp-hero__bg {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover; object-position: center; z-index: 0; display: block;
}`

let changed = 0

for (const file of files) {
  let src = readFileSync(file, 'utf8')
  if (!src.includes(CSS_OLD)) continue
  writeFileSync(file, src.replace(CSS_OLD, CSS_NEW), 'utf8')
  changed++
  const rel = file.split('app/pages/')[1]
  console.log('✓ CSS:', rel)
}

console.log(`\nГотово: CSS исправлен в ${changed} файлах`)
