import { readFileSync, writeFileSync } from 'fs'
import { globSync } from 'glob'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const root  = join(__dir, '..')

const IMG_URL = 'https://images.unsplash.com/photo-1600210491892-03d54079b6ac?w=1600&q=80'

const files = globSync('app/pages/irkutsk/*.vue', { cwd: root, absolute: true })

let changed = 0

for (const file of files) {
  let src = readFileSync(file, 'utf8')
  const orig = src

  // HTML: <div class="gp-hero__bg"></div> → <img .../>
  src = src.replace(
    /<div class="gp-hero__bg"><\/div>/g,
    `<img class="gp-hero__bg" src="${IMG_URL}" alt="" fetchpriority="high" decoding="async" width="1600" height="580"/>`
  )

  // CSS однострочный
  src = src.replace(
    `.gp-hero__bg { position: absolute; inset: 0; background-image: url('${IMG_URL}'); background-size: cover; background-position: center; z-index: 0; }`,
    `.gp-hero__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; z-index: 0; display: block; }`
  )

  // CSS многострочный (oktyabrskiy)
  src = src.replace(
    `.gp-hero__bg {\n  position: absolute; inset: 0;\n  background-image: url('${IMG_URL}');\n  background-size: cover; background-position: center;\n  z-index: 0;\n}`,
    `.gp-hero__bg {\n  position: absolute; inset: 0; width: 100%; height: 100%;\n  object-fit: cover; object-position: center; z-index: 0; display: block;\n}`
  )

  if (src !== orig) {
    writeFileSync(file, src, 'utf8')
    changed++
    const rel = file.split('app\\pages\\')[1] || file.split('app/pages/')[1]
    console.log('✓', rel)
  } else {
    console.log('—  пропущен:', file.split('app\\pages\\')[1] || file.split('app/pages/')[1])
  }
}

console.log(`\nГотово: ${changed} файлов изменено`)
