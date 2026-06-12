import type { H3Event } from 'h3'

export async function requireAdminAuth(event: H3Event) {
  const storage = useStorage('data')
  const cookie = getCookie(event, 'admin_token')
  const stored = await storage.getItem<string>('admin:token')
  if (!cookie || !stored || cookie !== stored) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
}
