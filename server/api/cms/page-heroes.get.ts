export default defineEventHandler(async () => {
  const storage = useStorage('data')
  const keys = await storage.getKeys('cms:page-hero')
  const map: Record<string, string> = {}
  await Promise.all(
    keys.map(async (key) => {
      const slug = key.replace('cms:page-hero:', '')
      const val = await storage.getItem<{ img: string }>(key)
      if (val?.img) map[slug] = val.img
    }),
  )
  return map
})
