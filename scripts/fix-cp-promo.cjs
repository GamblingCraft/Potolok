const fs = require('fs')
const path = require('path')
const glob = require('glob')

const files = glob.sync('app/pages/catalog/**/*.vue', {
  cwd: path.resolve(__dirname, '..'),
  absolute: true,
})

let changed = 0

for (const file of files) {
  let src = fs.readFileSync(file, 'utf8')

  // Skip if already uses CpPromoCards
  if (src.includes('CpPromoCards')) continue

  // Skip if no cp-promo section
  if (!src.includes('cp-promo-grid')) continue

  // Replace the promo grid block in template
  const oldGrid = /<div class="cp-promo-grid">\s*<div class="cp-promo-card" v-for="p in promos"[\s\S]*?<\/div>\s*<\/div>/
  const newGrid = `<CpPromoCards @callback="callbackOpen = true" />`

  if (!oldGrid.test(src)) {
    console.log('SKIP (grid not matched):', path.basename(file))
    continue
  }
  src = src.replace(oldGrid, newGrid)

  // Remove hardcoded promos array from script
  src = src.replace(/\nconst promos = \[[^\]]*(?:\[[^\]]*\][^\]]*)*\]\s*\n/, '\n')

  fs.writeFileSync(file, src, 'utf8')
  changed++
  console.log('FIXED:', path.basename(file))
}

console.log(`\nDone: ${changed} files updated`)
