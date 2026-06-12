export default defineEventHandler(async (event) => {
  await requireAdminAuth(event)
  const { slug, items } = await readBody(event)
  const storage = useStorage('data')
  await storage.setItem(`cms:gallery:${slug}`, items)
  return { ok: true }
})
