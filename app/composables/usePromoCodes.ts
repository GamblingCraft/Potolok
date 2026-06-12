import { promoCodes as defaultCodes, type PromoCode } from '~/data/promotions'

let _cache: PromoCode[] | null = null

export const usePromoCodes = async (): Promise<PromoCode[]> => {
  if (_cache) return _cache
  try {
    const data = await $fetch<PromoCode[]>('/api/cms/promo-codes')
    _cache = data
    return data
  } catch {
    return defaultCodes
  }
}

export const invalidatePromoCodesCache = () => { _cache = null }
