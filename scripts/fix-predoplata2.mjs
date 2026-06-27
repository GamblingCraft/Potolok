import { readFileSync, writeFileSync } from 'fs'

const files = [
  'C:/Users/admin/Desktop/Потолки/nuxt-app/app/data/services.ts',
  'C:/Users/admin/Desktop/Потолки/nuxt-app/app/pages/catalog/vidy/besshovnye-natyazhnye-potolki.vue',
  'C:/Users/admin/Desktop/Потолки/nuxt-app/app/pages/uslugi/remont-natyazhnogo-potolka.vue',
]

const replacements = [
  ['Монтаж за 1 день без предоплаты.', 'Монтаж за 1 день, оплата после приёмки.'],
  ['Монтируем без предоплаты, даём письменную гарантию 12 лет.', 'Оплата после приёмки, гарантия 12 лет.'],
  ['без предоплаты и обязательств.', 'без обязательств.'],
]

for (const file of files) {
  let src = readFileSync(file, 'utf-8')
  const original = src
  for (const [from, to] of replacements) src = src.split(from).join(to)
  if (src !== original) { writeFileSync(file, src); console.log('✅ fixed') }
}
