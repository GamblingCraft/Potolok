import { defaultSeoMeta } from '~/data/seoMeta'

export default defineEventHandler(async () => {
  const storage = useStorage('data')
  const stored = await storage.getItem<typeof defaultSeoMeta>('cms:seo-meta')
  if (!stored) return defaultSeoMeta
  // Merge: stored overrides default per-slug
  const merged = { ...defaultSeoMeta }
  for (const [slug, meta] of Object.entries(stored)) {
    merged[slug] = { ...(merged[slug] ?? {}), ...meta }
  }
  return merged
})
