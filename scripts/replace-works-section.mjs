/**
 * Replaces the inline cp-works section in all catalog pages
 * with <CpWorksSection :works="worksWithPrice" @lightbox="openLightbox" />
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PAGES_DIR = join(__dirname, '..', 'app', 'pages', 'catalog')

function collectVue(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) collectVue(full, files)
    else if (entry.endsWith('.vue')) files.push(full)
  }
  return files
}

// Match the works section (with or without comment header)
const OLD_SECTION = /(?:[ \t]*<!-- [^\n]*ГОТОВЫЕ РАБОТЫ[^\n]*-->\n)?    <section class="cp-section cp-works" v-if="worksWithPrice\.length">[\s\S]*?<\/section>/

const NEW_SECTION = `    <!-- ГОТОВЫЕ РАБОТЫ -->
    <CpWorksSection :works="worksWithPrice" @lightbox="openLightbox" />`

// For brend pages that have worksWithPrice in script but no section in template
const BREND_INSERT_AFTER = `    </section>

    <section class="cp-calc-cta">`
const BREND_INSERT_WITH = `    </section>

    <!-- ГОТОВЫЕ РАБОТЫ -->
    <CpWorksSection :works="worksWithPrice" @lightbox="openLightbox" />

    <section class="cp-calc-cta">`

const files = collectVue(PAGES_DIR)
let replaced = 0
let inserted = 0

for (const file of files) {
  const src = readFileSync(file, 'utf-8')
  const name = file.split('/catalog/')[1] ?? file.split('\\catalog\\')[1] ?? file

  if (src.includes('CpWorksSection')) {
    console.log(`  ⏭  ${name} (уже заменено)`)
    continue
  }

  if (OLD_SECTION.test(src)) {
    const updated = src.replace(OLD_SECTION, NEW_SECTION)
    writeFileSync(file, updated, 'utf-8')
    console.log(`  ✅ ${name}`)
    replaced++
    continue
  }

  // Pages with worksWithPrice in script but no section — insert after cp-about closes before cp-calc-cta
  if (src.includes('worksWithPrice') && src.includes('cp-calc-cta')) {
    const updated = src.replace(BREND_INSERT_AFTER, BREND_INSERT_WITH)
    if (updated !== src) {
      writeFileSync(file, updated, 'utf-8')
      console.log(`  ➕ ${name} (вставлено)`)
      inserted++
    } else {
      console.log(`  ⚠️  ${name} (паттерн не найден)`)
    }
    continue
  }
}

console.log(`\nГотово: заменено ${replaced}, вставлено ${inserted} из ${files.length} файлов`)
