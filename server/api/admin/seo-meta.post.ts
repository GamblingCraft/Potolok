export default defineEventHandler(async (event) => {
  await requireAdminAuth(event)
  const body = await readBody(event)
  const storage = useStorage('data')
  await storage.setItem('cms:seo-meta', body)
  return { ok: true }
})
