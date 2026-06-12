import { priceFaktury, priceVidy } from '~/data/prices'

export type CatalogPrices = Record<string, number>

function buildDefaults(): CatalogPrices {
  const map: CatalogPrices = {}
  for (const item of priceFaktury) {
    if (item.catalogKey) map[item.catalogKey] = item.priceFrom
  }
  for (const item of priceVidy) {
    if (item.catalogKey) map[item.catalogKey] = item.priceFrom
  }
  return map
}

export default defineEventHandler(async (): Promise<CatalogPrices> => {
  const storage = useStorage('data')
  const stored = await storage.getItem<{ faktury?: { catalogKey?: string; priceFrom: number }[]; vidy?: { catalogKey?: string; priceFrom: number }[] }>('cms:prices')
  const result = buildDefaults()

  if (stored?.faktury) {
    for (const item of stored.faktury) {
      if (item.catalogKey) result[item.catalogKey] = item.priceFrom
    }
  }
  if (stored?.vidy) {
    for (const item of stored.vidy) {
      if (item.catalogKey) result[item.catalogKey] = item.priceFrom
    }
  }

  return result
})
