import { site as defaultSite } from '~/data/site'

export type SiteConfig = typeof defaultSite

export function useSite() {
  const { data } = useAsyncData<SiteConfig>(
    'cms-site',
    () => $fetch<SiteConfig>('/api/cms/site'),
    {
      default: () => ({ ...defaultSite }) as SiteConfig,
      // Всегда перезапрашиваем при монтировании компонента (не берём из SSR-кэша)
      getCachedData: () => undefined,
    },
  )
  const s = reactive({ ...defaultSite } as SiteConfig)
  watchEffect(() => {
    if (data.value) Object.assign(s, data.value)
  })
  return s
}
