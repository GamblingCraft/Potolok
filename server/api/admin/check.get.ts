export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, 'admin_token')
  if (!cookie) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const config = useRuntimeConfig()
  if (!verifyAdminToken(cookie, config.adminSecret)) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  return { ok: true }
})
