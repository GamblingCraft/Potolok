export default defineEventHandler(async (event) => {
  await requireAdminAuth(event)
  const storage = useStorage('data')
  const requests = await storage.getItem<unknown[]>('cms:requests') ?? []
  return requests
})
