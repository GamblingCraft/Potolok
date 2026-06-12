export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const body = await readBody(event)
  const storage = useStorage('data')
  await storage.setItem('cms:banner', body)
  return { ok: true }
})
