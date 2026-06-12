export interface BannerConfig {
  enabled: boolean
  text: string
  label: string
  durationHours: number
}

const defaults: BannerConfig = {
  enabled: true,
  text: 'Бесплатный замер + скидка 10% на монтаж — только сегодня!',
  label: 'Акция',
  durationHours: 12,
}

export default defineEventHandler(async () => {
  const storage = useStorage('data')
  return (await storage.getItem<BannerConfig>('cms:banner')) ?? defaults
})
