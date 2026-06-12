const fs = require('fs')
const path = require('path')

const files = [
  {
    file: 'app/pages/catalog/faktury/index.vue',
    oldImport: `import { faktury } from '~/data/catalog'`,
    newScript: `import { faktury as _faktury } from '~/data/catalog'
import { useCatalogPrices } from '~/composables/useCatalogPrices'

const _prices = await useCatalogPrices()

const faktury = computed(() => _faktury.map(f => ({
  ...f,
  price: _prices.value?.[f.catalogKey] ?? f.price,
})))`,
  },
  {
    file: 'app/pages/catalog/vidy/index.vue',
    oldImport: `import { vidy } from '~/data/catalog'`,
    newScript: `import { vidy as _vidy } from '~/data/catalog'
import { useCatalogPrices } from '~/composables/useCatalogPrices'

const _prices = await useCatalogPrices()

const vidy = computed(() => _vidy.map(v => {
  const base = _prices.value?.['base'] ?? 159
  return {
    ...v,
    extra: (_prices.value?.[v.catalogKey] ?? (base + v.extra)) - base,
  }
}))`,
  },
  {
    file: 'app/pages/catalog/po-pomescheniyu/index.vue',
    oldImport: `import { pomeshcheniya } from '~/data/catalog'`,
    newScript: `import { pomeshcheniya as _pomeshcheniya } from '~/data/catalog'
import { useCatalogPrices } from '~/composables/useCatalogPrices'

const _prices = await useCatalogPrices()

const pomeshcheniya = computed(() => _pomeshcheniya.map(p => ({
  ...p,
  price: _prices.value?.['base'] ?? p.price,
})))`,
  },
  {
    file: 'app/pages/catalog/tsveta/index.vue',
    oldImport: `import { tsveta } from '~/data/catalog'`,
    newScript: `import { tsveta as _tsveta } from '~/data/catalog'
import { useCatalogPrices } from '~/composables/useCatalogPrices'

const _prices = await useCatalogPrices()

const tsveta = computed(() => _tsveta.map(t => ({
  ...t,
  price: (_prices.value?.['base'] ?? 159) + t.extra,
})))`,
  },
]

const base = path.join(__dirname, '..')

for (const { file, oldImport, newScript } of files) {
  const fullPath = path.join(base, file)
  let content = fs.readFileSync(fullPath, 'utf8')
  if (content.includes('useCatalogPrices')) {
    console.log('Already updated:', file)
    continue
  }
  content = content.replace(oldImport, newScript)
  fs.writeFileSync(fullPath, content, 'utf8')
  console.log('Updated:', file)
}
console.log('Done.')
