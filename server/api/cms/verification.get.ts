export default defineEventHandler(async () => {
  const storage = useStorage('data')
  const stored = await storage.getItem<{ yandex: string; google: string }>('cms:verification')
  return stored ?? { yandex: '', google: '' }
})
