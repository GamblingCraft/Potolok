export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') ?? ''
  const storage = useStorage('data')
  const stored = await storage.getItem<unknown[]>(`cms:page-gallery:${slug}`)
  return stored ?? []
})
