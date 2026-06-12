import { catalogGallery } from '~/data/gallery'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') ?? ''
  const storage = useStorage('data')
  const stored = await storage.getItem<unknown[]>(`cms:gallery:${slug}`)
  if (stored) return stored
  return catalogGallery[slug] ?? []
})
