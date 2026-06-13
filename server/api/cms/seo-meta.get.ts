import { defaultSeoMeta } from '~/data/seoMeta'

export default defineEventHandler(async () => {
  const storage = useStorage('data')
  const stored = await storage.getItem<Record<string, any>>('cms:seo-meta')
  if (!stored) return defaultSeoMeta

  const merged: Record<string, any> = { ...defaultSeoMeta }

  for (const [slug, meta] of Object.entries(stored)) {
    if (!meta || typeof meta !== 'object') continue

    if (slug.startsWith('_tpl:')) {
      // Group templates — store as-is (may be empty)
      merged[slug] = meta
      continue
    }

    // Only override fields that have actual non-empty values
    // Empty string from a bad save should not wipe the default
    const base = (merged[slug] as any) ?? {}
    merged[slug] = {
      ...base,
      ...(meta.title       ? { title:          meta.title       } : {}),
      ...(meta.description ? { description:     meta.description } : {}),
      ...(meta.ogTitle     ? { ogTitle:         meta.ogTitle     } : {}),
      ...(meta.ogDescription ? { ogDescription: meta.ogDescription } : {}),
    }
  }

  return merged
})
