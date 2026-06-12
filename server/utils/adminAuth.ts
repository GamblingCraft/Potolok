import type { H3Event } from 'h3'

export async function requireAdminAuth(event: H3Event) {
  const cookie = getCookie(event, 'admin_token')
  if (!cookie) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const config = useRuntimeConfig()
  if (!verifyAdminToken(cookie, config.adminSecret)) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
}
