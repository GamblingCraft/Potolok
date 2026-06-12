import { promotions as defaultPromotions } from '~/data/promotions'

export default defineEventHandler(async () => {
  const storage = useStorage('data')
  const stored = await storage.getItem('cms:promotions')
  return stored ?? defaultPromotions
})
