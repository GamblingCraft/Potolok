import { readFileSync, writeFileSync } from 'fs'
import { globSync } from 'glob'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const root  = join(__dir, '..')

const files = globSync('app/pages/uslugi/**/*.vue', { cwd: root, absolute: true })

const IMG_TAG = '<img class="ms-hero__bg" :src="heroImg" alt="" fetchpriority="high" decoding="async" width="1200" height="580"/>'

const CSS_OLD = '.ms-hero__bg { position: absolute; inset: 0; background-size: cover; background-position: center; z-index: 0; }'
const CSS_NEW = '.ms-hero__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; z-index: 0; display: block; }'

let changed = 0

for (const file of files) {
  let src = readFileSync(file, 'utf8')
  const orig = src

  src = src.replace(
    /<div class="ms-hero__bg" :style="\{ backgroundImage: `url\('\$\{heroImg\}'\)` \}"><\/div>/g,
    IMG_TAG
  )
  src = src.replace(CSS_OLD, CSS_NEW)

  if (src !== orig) {
    writeFileSync(file, src, 'utf8')
    changed++
    const rel = file.split('app\\pages\\')[1] || file.split('app/pages/')[1]
    console.log('✓', rel)
  }
}

console.log(`\nГотово: ${changed} файлов изменено`)
