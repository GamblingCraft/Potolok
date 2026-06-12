import { site as defaultSite } from '~/data/site'

export default defineEventHandler(async () => {
  const storage = useStorage('data')
  const stored = await storage.getItem<Record<string, unknown>>('cms:site')
  if (stored) return { ...defaultSite, ...stored }
  return defaultSite
})
