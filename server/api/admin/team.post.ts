export default defineEventHandler(async (event) => {
  const items = await readBody(event)
  if (!Array.isArray(items)) throw createError({ statusCode: 400, message: 'array required' })
  await useStorage('data').setItem('cms:team', items)
  return { ok: true }
})
