export default defineEventHandler(async (event) => {
  const body = await readBody<{ yandex: string; google: string }>(event)
  await useStorage('data').setItem('cms:verification', body)
  return { ok: true }
})
