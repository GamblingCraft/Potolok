export default defineEventHandler(async (event) => {
  const { content } = await readBody<{ content: string }>(event)
  if (typeof content !== 'string') throw createError({ statusCode: 400, message: 'content required' })
  const storage = useStorage('data')
  await storage.setItem('cms:robots', content)
  return { ok: true }
})
