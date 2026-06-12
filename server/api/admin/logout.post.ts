export default defineEventHandler(async (event) => {
  const storage = useStorage('data')
  await storage.removeItem('admin:token')
  deleteCookie(event, 'admin_token', { path: '/' })
  return { ok: true }
})
