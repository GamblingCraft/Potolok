export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') ?? ''
  const stored = await useStorage('data').getItem<{ img: string; title: string }>(`cms:page-hero:${slug}`)
  return stored ?? null
})
