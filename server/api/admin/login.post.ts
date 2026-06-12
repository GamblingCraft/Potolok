export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  if (body.login !== config.adminLogin || body.password !== config.adminPassword) {
    throw createError({ statusCode: 401, message: 'Неверный логин или пароль' })
  }

  const token = `${Date.now()}_${Math.random().toString(36).slice(2)}_${config.adminSecret.slice(0, 8)}`

  setCookie(event, 'admin_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax',
  })

  const storage = useStorage('data')
  await storage.setItem('admin:token', token)

  return { ok: true }
})
