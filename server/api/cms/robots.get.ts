const DEFAULT = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://пропотолок.рф/sitemap.xml`

export default defineEventHandler(async () => {
  const storage = useStorage('data')
  const stored = await storage.getItem<string>('cms:robots')
  return { content: stored ?? DEFAULT }
})
