// Body: { slug: 'matovye-natyazhnye-potolki', content: { faqItems, advantages, ... } }
export default defineEventHandler(async (event) => {
  await requireAdminAuth(event)
  const body = await readBody<{ slug: string; content: Record<string, unknown> }>(event)
  if (!body.slug) throw createError({ statusCode: 400, message: 'slug required' })
  const storage = useStorage('data')
  await storage.setItem(`cms:page:${body.slug}`, body.content)
  return { ok: true }
})
