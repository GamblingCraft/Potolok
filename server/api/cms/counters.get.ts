export default defineEventHandler(async () => {
  const storage = useStorage('data')
  const stored = await storage.getItem<{ yandexMetrika: string; googleGA4: string; custom: string }>('cms:counters')
  return stored ?? { yandexMetrika: '', googleGA4: '', custom: '' }
})
