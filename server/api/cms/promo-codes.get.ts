import { promoCodes as defaultPromoCodes } from '~/data/promotions'

export default defineEventHandler(async () => {
  const storage = useStorage('data')
  const stored = await storage.getItem('cms:promo-codes')
  return stored ?? defaultPromoCodes
})
