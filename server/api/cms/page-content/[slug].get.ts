import { getPageInfo } from '~/data/pagesInfo'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') ?? ''
  const storage = useStorage('data')
  const stored = await storage.getItem<Record<string, unknown>>(`cms:page:${slug}`)
  const defaults = getPageInfo(slug)
  return { ...defaults, ...stored }
})
