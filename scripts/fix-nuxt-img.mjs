import { readFileSync, writeFileSync } from 'fs'
import { globSync } from 'glob'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const root  = join(__dir, '..')

const patterns = [
  'app/pages/catalog/**/*.vue',
  'app/pages/uslugi/*.vue',
  'app/pages/irkutsk/*.vue',
  'app/pages/index.vue',
]

const files = patterns.flatMap(p => globSync(p, { cwd: root, absolute: true }))

let changed = 0

for (const file of files) {
  let src = readFileSync(file, 'utf8')
  const orig = src

  // 1. Каталог: <img class="cp-hero__bg" :src="heroImg" ... fetchpriority="high" .../>
  src = src.replace(
    /<img class="cp-hero__bg" :src="heroImg" alt="" fetchpriority="high" decoding="async" width="1200" height="580"\/>/g,
    `<NuxtImg class="cp-hero__bg" :src="heroImg" alt="" fetchpriority="high" loading="eager" width="1200" height="580" sizes="100vw" />`
  )

  // 2. Услуги: <img class="ms-hero__bg" :src="heroImg" .../>
  src = src.replace(
    /<img class="ms-hero__bg" :src="heroImg" alt="" fetchpriority="high" decoding="async" width="1200" height="580"\/>/g,
    `<NuxtImg class="ms-hero__bg" :src="heroImg" alt="" fetchpriority="high" loading="eager" width="1200" height="580" sizes="100vw" />`
  )

  // 3. Иркутск: <img class="gp-hero__bg" src="https://images.unsplash..." .../>
  src = src.replace(
    /<img class="gp-hero__bg" src="(https:\/\/images\.unsplash\.com[^"]+)" alt="" fetchpriority="high" decoding="async" width="1600" height="580"\/>/g,
    `<NuxtImg class="gp-hero__bg" src="$1" alt="" fetchpriority="high" loading="eager" width="1600" height="580" sizes="100vw" />`
  )

  // 4. Главная: <img ... class="hero__bg-img" fetchpriority="high" .../>
  src = src.replace(
    /<img\s+src="\/img\/hero\.webp"\s+alt=""\s+class="hero__bg-img"\s+fetchpriority="high"\s+decoding="async"\s+width="1920"\s+height="580"\/>/g,
    `<NuxtImg src="/img/hero.webp" alt="" class="hero__bg-img" fetchpriority="high" loading="eager" width="1920" height="580" sizes="100vw" />`
  )

  if (src !== orig) {
    writeFileSync(file, src, 'utf8')
    changed++
    const rel = file.split('app\\pages\\')[1] || file.split('app/pages/')[1]
    console.log('✓', rel)
  }
}

console.log(`\nГотово: ${changed} файлов`)
