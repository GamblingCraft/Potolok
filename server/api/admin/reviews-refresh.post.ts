export default defineEventHandler(async (event) => {
  requireAdminAuth(event)
  const storage = useStorage('data')
  await Promise.all([
    storage.removeItem('cms:reviews-yandex'),
    storage.removeItem('cms:reviews-2gis'),
  ])
  return { ok: true }
})
