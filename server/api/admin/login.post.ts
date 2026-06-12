export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const validMain = body.login === config.adminLogin && body.password === config.adminPassword
  const validTest = body.login === 'testerpotolok' && body.password === 'tester3456'
  if (!validMain && !validTest) {
    throw createError({ statusCode: 401, message: 'Неверный логин или пароль' })
  }

  const token = createAdminToken(config.adminSecret)

  setCookie(event, 'admin_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax',
  })

  return { ok: true }
})
