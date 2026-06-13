export default defineEventHandler(async (event) => {
  const body = await readBody<{ yandexMetrika: string; googleGA4: string; custom: string }>(event)
  await useStorage('data').setItem('cms:counters', body)
  return { ok: true }
})
