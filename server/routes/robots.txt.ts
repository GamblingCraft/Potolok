const DEFAULT = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://пропотолок.рф/sitemap.xml`

export default defineEventHandler(async (event) => {
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')
  const storage = useStorage('data')
  const stored = await storage.getItem<string>('cms:robots')
  return stored ?? DEFAULT
})
