export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, 'admin_token')
  if (!cookie) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const storage = useStorage('data')
  const stored = await storage.getItem('admin:token')
  if (stored !== cookie) throw createError({ statusCode: 401, message: 'Unauthorized' })

  return { ok: true }
})
