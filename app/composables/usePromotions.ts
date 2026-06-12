import { promotions as defaultPromotions, type Promotion } from '~/data/promotions'

export const usePromotions = () =>
  useAsyncData<Promotion[]>(
    'promotions-api',
    () => $fetch<Promotion[]>('/api/cms/promotions'),
    { default: () => defaultPromotions },
  )

export const useFeaturedPromotions = () =>
  useAsyncData<Promotion[]>(
    'featured-promotions',
    async () => {
      const all = await $fetch<Promotion[]>('/api/cms/promotions')
      return all.filter(p => p.active && p.featured)
    },
    { default: () => defaultPromotions.filter(p => p.active && p.featured) },
  )
