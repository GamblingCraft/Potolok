const fs = require('fs')
const path = require('path')

const brendyDir = path.join(__dirname, '../app/pages/catalog/brendy')

for (const name of fs.readdirSync(brendyDir)) {
  if (!name.endsWith('.vue') || name === 'index.vue') continue

  const fullPath = path.join(brendyDir, name)
  let content = fs.readFileSync(fullPath, 'utf8')

  if (content.includes('useCatalogPrices')) {
    console.log('Skip (already done):', name)
    continue
  }

  // 1. Add import after the usePageContent import line
  content = content.replace(
    /import \{ usePageContent, usePageGallery, usePagePortfolio \} from '~\/composables\/usePageContent'/,
    `import { usePageContent, usePageGallery, usePagePortfolio } from '~/composables/usePageContent'\nimport { useCatalogPrices } from '~/composables/useCatalogPrices'`
  )

  // 2. After "const item = brendy.find(...)" line add price setup
  content = content.replace(
    /const item = brendy\.find\(b => b\.id === '(\w+)'\)!/,
    (match, id) => {
      return `${match}\n\nconst _prices = await useCatalogPrices()\nconst price = computed(() => _prices.value?.['base'] ?? item.price)`
    }
  )

  // 3. Replace item.price in template with price
  // Only in template (before <script) — replace {{ item.price }} and :content="String(item.price)"
  const scriptStart = content.indexOf('<script')
  const template = content.slice(0, scriptStart)
  const script = content.slice(scriptStart)

  const fixedTemplate = template
    .replace(/\{\{ item\.price \}\}/g, '{{ price }}')
    .replace(/:content="String\(item\.price\)"/g, ':content="String(price)"')

  content = fixedTemplate + script

  fs.writeFileSync(fullPath, content, 'utf8')
  console.log('Updated:', name)
}

console.log('Done.')
