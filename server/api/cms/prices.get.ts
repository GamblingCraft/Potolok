import { priceFaktury, priceVidy } from '~/data/prices'

export default defineEventHandler(async () => {
  const storage = useStorage('data')
  const stored = await storage.getItem<{ faktury: unknown[]; vidy: unknown[] }>('cms:prices')
  return {
    faktury: stored?.faktury ?? priceFaktury,
    vidy: stored?.vidy ?? priceVidy,
  }
})
