// Saves a catalog section override (faktury, vidy, brendy, tsveta, pomeshcheniya)
// Body: { section: 'faktury', items: [...] }
export default defineEventHandler(async (event) => {
  await requireAdminAuth(event)
  const body = await readBody<{ section: string; items: unknown[] }>(event)

  const allowed = ['faktury', 'vidy', 'brendy', 'tsveta', 'pomeshcheniya']
  if (!allowed.includes(body.section)) {
    throw createError({ statusCode: 400, message: 'Unknown section' })
  }

  const storage = useStorage('data')
  await storage.setItem(`cms:catalog:${body.section}`, body.items)
  return { ok: true }
})
