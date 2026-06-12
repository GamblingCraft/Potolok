export default defineEventHandler(async (event) => {
  await requireAdminAuth(event)
  const body = await readBody(event)
  const storage = useStorage('data')
  await storage.setItem('cms:portfolio', body)
  return { ok: true }
})
