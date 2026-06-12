import { faktury, vidy, brendy, tsveta, pomeshcheniya } from '~/data/catalog'

const defaults: Record<string, unknown[]> = { faktury, vidy, brendy, tsveta, pomeshcheniya }

export default defineEventHandler(async (event) => {
  const section = getRouterParam(event, 'section') ?? ''
  if (!defaults[section]) {
    throw createError({ statusCode: 404, message: 'Unknown section' })
  }
  const storage = useStorage('data')
  const stored = await storage.getItem<unknown[]>(`cms:catalog:${section}`)
  return stored ?? defaults[section]
})
