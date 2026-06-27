import { readFileSync, writeFileSync } from 'fs'
import { globSync } from 'glob'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const root  = join(__dir, '..')

const files = globSync('app/pages/catalog/**/*.vue', { cwd: root, absolute: true })

// IMG тег — замена на <img>
const IMG_TAG = '<img class="cp-hero__bg" :src="heroImg" alt="" fetchpriority="high" decoding="async" width="1200" height="580"/>'

// CSS: background-size/position → object-fit
const CSS_OLD = 'position: absolute; inset: 0; background-size: cover; background-position: center; z-index: 0;'
const CSS_NEW = 'position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; z-index: 0; display: block;'

let changed = 0
let skipped = 0

for (const file of files) {
  let src = readFileSync(file, 'utf8')
  const orig = src

  // 1. Динамический: :style="{ backgroundImage: `url('${heroImg}')` }"
  src = src.replace(
    /<div class="cp-hero__bg" :style="\{ backgroundImage: `url\('\$\{heroImg\}'\)` \}"><\/div>/g,
    IMG_TAG
  )

  // 2. Хардкод: style="background-image:url('...')"  — извлекаем URL
  src = src.replace(
    /<div class="cp-hero__bg" style="background-image:url\('([^']+)'\)"><\/div>/g,
    (_, url) => `<img class="cp-hero__bg" src="${url}" alt="" fetchpriority="high" decoding="async" width="1200" height="580"/>`
  )

  // 3. CSS замена
  src = src.replace(
    /\.cp-hero__bg \{ position: absolute; inset: 0; background-size: cover; background-position: center; z-index: 0; \}/g,
    `.cp-hero__bg { ${CSS_NEW} }`
  )

  if (src !== orig) {
    writeFileSync(file, src, 'utf8')
    changed++
    console.log('✓', file.split('/app/pages/')[1])
  } else {
    skipped++
  }
}

console.log(`\nГотово: ${changed} файлов изменено, ${skipped} пропущено`)
