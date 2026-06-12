import type { Review } from '~/data/reviews'

const YANDEX_URL =
  'https://yandex.ru/ugcpub/digest' +
  '?notEscapeUserDisplayName=1&fixTokens=true&add_my_review=true' +
  '&objectId=%2Fsprav%2F57118507733&appId=1org-viewer&otype=Org' +
  '&offset=0&limit=20&withNpsScore=1&use_export_rating_stats=0' +
  '&add_rating_dynamics=1&add_rating_stats=1'

const TWOGIS_BASE =
  'https://public-api.reviews.2gis.com/3.0/orgs/70000001060616514/reviews' +
  '?key=6e7e1929-4ea9-4a5d-8c05-d601860389bd&locale=ru_RU&rated=true' +
  '&sort_by=friends&limit=50' +
  '&fields=meta.org_rating,meta.org_reviews_count,meta.total_count,reviews.object.address,reviews.hiding_reason,reviews.emojis,reviews.trust_factors'

const TWOGIS_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Origin': 'https://2gis.ru',
  'Referer': 'https://2gis.ru/',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'cross-site',
}

const KEY_YANDEX = 'cms:reviews-yandex'
const KEY_2GIS   = 'cms:reviews-2gis'

// ── Yandex parser ──────────────────────────────────────────────────────────
function parseYandex(raw: any): Review[] {
  const views: any[] = raw?.view?.views ?? []
  return views
    .filter((v: any) => v.type === '/ugc/review' && !v.meta?.blocked)
    .map((v: any, i: number) => {
      const reply  = (v.views ?? []).find((c: any) => c.type === '/ugc/comment')
      const photos = (v.photos ?? [])
        .filter((p: any) => p.status === 'ACCEPTED')
        .map((p: any) => `https://avatars.mds.yandex.net${p.url}`)
      return {
        id: 10000 + i,
        platform: 'yandex' as const,
        author:   v.author?.name ?? 'Аноним',
        avatar:   v.author?.pic  ? `https://avatars.yandex.net/get-yapic/${v.author.pic}/islands-middle` : null,
        rating:   v.rating?.val  ?? 5,
        date:     new Date(v.time).toISOString().slice(0, 10),
        text:     v.text ?? '',
        photos:   photos.length ? photos : undefined,
        reply:    reply?.text ?? undefined,
        verified: v.author?.verified ?? false,
      } satisfies Review
    })
}

// ── 2GIS parser ────────────────────────────────────────────────────────────
function parse2gis(items: any[], offset: number): Review[] {
  return items
    .filter((item: any) => item.text || item.rating)
    .map((item: any, i: number) => {
      const photos = (item.photos ?? [])
        .map((p: any) => p.preview_urls?.['320x'] ?? p.preview_urls?.url ?? '')
        .filter(Boolean)
      return {
        id: 20000 + offset + i,
        platform: '2gis' as const,
        author:   item.user?.name ?? 'Пользователь 2ГИС',
        avatar:   item.user?.photo_preview_urls?.['64x64'] ?? null,
        rating:   item.rating ?? 5,
        date:     (item.date_created ?? '').slice(0, 10),
        text:     item.text ?? '',
        photos:   photos.length ? photos : undefined,
        reply:    item.official_answer?.text ?? undefined,
        verified: !!item.user?.is_verified,
      } satisfies Review
    })
}

// ── Fetch all 2GIS pages ───────────────────────────────────────────────────
async function fetchAll2gis(): Promise<Review[]> {
  const all: Review[] = []
  for (let offset = 0; offset <= 350; offset += 50) {
    try {
      const data = await $fetch<any>(`${TWOGIS_BASE}&offset=${offset}`, { headers: TWOGIS_HEADERS })
      const items: any[] = data?.reviews ?? data?.items ?? []
      if (!items.length) break
      all.push(...parse2gis(items, offset))
      // Если отзывов меньше 50 — достигли конца
      if (items.length < 50) break
    } catch (e) {
      console.warn(`[reviews] 2GIS page offset=${offset} failed:`, e)
      break
    }
  }
  return all
}

// ── Main handler ───────────────────────────────────────────────────────────
// Данные отдаются из Storage.
// Если Storage пуст — делаем первичный парсинг и сохраняем.
// Обновление только вручную через POST /api/admin/reviews-refresh.
export default defineEventHandler(async () => {
  const storage = useStorage('data')

  // ── Yandex ──
  let yandexReviews = await storage.getItem<Review[]>(KEY_YANDEX)
  if (!yandexReviews) {
    try {
      const raw = await $fetch<any>(YANDEX_URL, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
          'Referer': 'https://yandex.ru/maps/org/57118507733/reviews/',
        },
      })
      yandexReviews = parseYandex(raw)
      await storage.setItem<Review[]>(KEY_YANDEX, yandexReviews)
    } catch (e) {
      console.warn('[reviews] Yandex fetch failed:', e)
      yandexReviews = []
    }
  }

  // ── 2GIS ──
  let gisReviews = await storage.getItem<Review[]>(KEY_2GIS)
  if (!gisReviews) {
    gisReviews = await fetchAll2gis()
    if (gisReviews.length > 0) {
      await storage.setItem<Review[]>(KEY_2GIS, gisReviews)
    } else {
      gisReviews = []
    }
  }

  const all = [...yandexReviews, ...gisReviews]
  all.sort((a, b) => (b.date > a.date ? 1 : -1))
  return all
})
