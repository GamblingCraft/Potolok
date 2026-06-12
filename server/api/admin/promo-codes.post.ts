export default defineEventHandler(async (event) => {
  await requireAdminAuth(event)
  const body = await readBody(event)
  const storage = useStorage('data')
  await storage.setItem('cms:promo-codes', body)
  return { ok: true }
})
