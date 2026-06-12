export default defineEventHandler(async (event) => {
  await requireAdminAuth(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)
  const storage = useStorage('data')
  const requests = await storage.getItem<Record<string, unknown>[]>('cms:requests') ?? []
  const idx = requests.findIndex((r) => r.id === id)
  if (idx === -1) throw createError({ statusCode: 404, message: 'Not found' })
  requests[idx] = { ...requests[idx], ...body, id }
  await storage.setItem('cms:requests', requests)
  return requests[idx]
})
