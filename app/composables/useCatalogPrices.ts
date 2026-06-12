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

const _defaults = buildDefaults()

export async function useCatalogPrices(): Promise<Ref<CatalogPrices>> {
  const { data } = await useAsyncData<CatalogPrices>(
    'catalog-prices',
    () => $fetch<CatalogPrices>('/api/cms/catalog-prices'),
    { default: () => ({ ..._defaults }) },
  )
  return data as Ref<CatalogPrices>
}
