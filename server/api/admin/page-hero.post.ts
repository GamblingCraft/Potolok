export default defineEventHandler(async (event) => {
  const { slug, hero } = await readBody<{ slug: string; hero: { img: string; title: string } }>(event)
  if (!slug) throw createError({ statusCode: 400, message: 'slug required' })
  await useStorage('data').setItem(`cms:page-hero:${slug}`, hero)
  return { ok: true }
})
