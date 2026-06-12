export default defineEventHandler(async (event) => {
  await requireAdminAuth(event)
  const id = Number(getRouterParam(event, 'id'))
  const storage = useStorage('data')
  const requests = await storage.getItem<Record<string, unknown>[]>('cms:requests') ?? []
  const filtered = requests.filter((r) => r.id !== id)
  await storage.setItem('cms:requests', filtered)
  return { ok: true }
})
