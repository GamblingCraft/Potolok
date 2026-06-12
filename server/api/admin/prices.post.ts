export default defineEventHandler(async (event) => {
  await requireAdminAuth(event)
  const body = await readBody(event)
  const storage = useStorage('data')
  await storage.setItem('cms:prices', body)
  return { ok: true }
})
