import { defaultSeoMeta } from '~/data/seoMeta'
import type { SeoMetaMap } from '~/data/seoMeta'
import { site } from '~/data/site'

// Slug → catalog price key (catalogKey in prices.ts)
const SLUG_PRICE_KEY: Record<string, string> = {
  'matovye-natyazhnye-potolki':              'matovye',
  'glyancevye-natyazhnye-potolki':           'glyancevye',
  'satinovye-natyazhnye-potolki':            'satinovye',
  'tkanevye-natyazhnye-potolki':             'tkanevye',
  'fakturnye-natyazhnye-potolki':            'fakturnye',
  'besshovnye-natyazhnye-potolki':           'besshovnye',
  'gipoallergennye-natyazhnye-potolki':      'gipoallergennye',
  'negoryuchie-natyazhnye-potolki':          'negoryuchie',
  'paryashchie-natyazhnye-potolki':          'paryashchie',
  'natyazhnye-potolki-s-podsvetkoy':         'podsvetka',
  'dvuhurovnevye-natyazhnye-potolki':        'dvuhuroven',
  'natyazhnye-potolki-s-fotopechatyu':       'fotopechat',
  'natyazhnye-potolki-zvezdnoe-nebo':        'zvezdnoe',
  'natyazhnye-potolki-so-svetovymi-liniyami':'linii',
  'tenevye-natyazhnye-potolki':              'tenevye',
  'konturnye-natyazhnye-potolki':            'konturnye',
  'mnogourovenye-natyazhnye-potolki':        'mnogourovenye',
  'krivolinejnye-natyazhnye-potolki':        'krivolinejnye',
}

// Slug → group key mapping for group template fallback
const SLUG_GROUP: Record<string, string> = {}
const _gmap: Record<string, string[]> = {
  faktury:     ['faktury','matovye-natyazhnye-potolki','glyancevye-natyazhnye-potolki','satinovye-natyazhnye-potolki','tkanevye-natyazhnye-potolki','gipoallergennye-natyazhnye-potolki','besshovnye-natyazhnye-potolki','fakturnye-natyazhnye-potolki','negoryuchie-natyazhnye-potolki'],
  vidy:        ['vidy','paryashchie-natyazhnye-potolki','natyazhnye-potolki-s-podsvetkoy','dvuhurovnevye-natyazhnye-potolki','natyazhnye-potolki-s-fotopechatyu','natyazhnye-potolki-zvezdnoe-nebo','natyazhnye-potolki-so-svetovymi-liniyami','tenevye-natyazhnye-potolki','konturnye-natyazhnye-potolki','mnogourovenye-natyazhnye-potolki','krivolinejnye-natyazhnye-potolki'],
  tsveta:      ['tsveta','belye-natyazhnye-potolki','chernye-natyazhnye-potolki','serye-natyazhnye-potolki','bezhevye-natyazhnye-potolki','cvetnye-natyazhnye-potolki','zolotye-natyazhnye-potolki','golubye-natyazhnye-potolki','korichnevye-natyazhnye-potolki'],
  pomescheniya:['po-pomescheniyu','natyazhnye-potolki-v-gostinoy','natyazhnye-potolki-v-detskoy','natyazhnye-potolki-na-kuhne','natyazhnye-potolki-v-spalne','natyazhnye-potolki-v-vannoy','natyazhnye-potolki-v-tualete','natyazhnye-potolki-v-prihozhey','natyazhnye-potolki-v-kvartire','natyazhnye-potolki-v-chastnom-dome','natyazhnye-potolki-v-ofise','natyazhnye-potolki-na-balkone','natyazhnye-potolki-na-dache'],
  brendy:      ['brendy','natyazhnye-potolki-msd','natyazhnye-potolki-bauf','natyazhnye-potolki-lumfer','natyazhnye-potolki-teqtum','natyazhnye-potolki-descor','natyazhnye-potolki-pongs','natyazhnye-potolki-clipso','natyazhnye-potolki-cerutti'],
  uslugi:      ['uslugi','montazh-natyazhnyh-potolkov','demontazh-natyazhnogo-potolka','peretyazhka-potolka','remont-natyazhnogo-potolka','zamena-polotna','sliv-vody-s-natyazhnogo-potolka','ustanovka-svetilnikov','srochnyj-montazh-24-chasa','vyezd-zamershchika'],
  irkutsk:     ['irkutsk','leninskiy-okrug','oktyabrskiy-okrug','pravoberezhnyy-okrug','sverdlovskiy-okrug'],
}
for (const [gk, slugs] of Object.entries(_gmap)) for (const s of slugs) SLUG_GROUP[s] = gk

export function usePageSeoMeta(slug: string) {
  const { data: seoData } = useAsyncData<SeoMetaMap>(
    'cms-seo-meta',
    () => $fetch<SeoMetaMap>('/api/cms/seo-meta'),
    { default: () => ({ ...defaultSeoMeta }) as SeoMetaMap },
  )

  const { data: prices } = useAsyncData<Record<string, number>>(
    'catalog-prices-seo',
    () => $fetch<Record<string, number>>('/api/cms/catalog-prices'),
    { default: () => ({}) as Record<string, number> },
  )

  const meta = computed(() => {
    const map = (seoData.value ?? defaultSeoMeta) as Record<string, any>
    let raw = map[slug] ?? defaultSeoMeta[slug as keyof typeof defaultSeoMeta]

    // Fallback to group template if page title is empty
    if (!raw?.title) {
      const gKey = SLUG_GROUP[slug]
      if (gKey) raw = map[`_tpl:${gKey}`]
    }

    if (!raw) raw = { title: '', description: '' }

    const p = prices.value ?? {}
    const priceKey = SLUG_PRICE_KEY[slug] ?? slug
    const price = p[priceKey] ?? p[slug] ?? p['base'] ?? p['matovye'] ?? 159
    const replace = (s: string) => s ? s.replace(/\{price\}/g, String(price)) : s
    return {
      title:         replace(raw.title ?? ''),
      description:   replace(raw.description ?? ''),
      ogTitle:       replace(raw.ogTitle ?? raw.title ?? ''),
      ogDescription: replace(raw.ogDescription ?? raw.description ?? ''),
      ogImage:       raw.ogImage ?? site.ogImage,
    }
  })

  const route = useRoute()

  useHead({
    title: computed(() => meta.value.title),
    meta: [
      { name: 'description',        content: computed(() => meta.value.description) as any },
      { property: 'og:title',       content: computed(() => meta.value.ogTitle) as any },
      { property: 'og:description', content: computed(() => meta.value.ogDescription) as any },
      { property: 'og:image',       content: computed(() => site.siteUrl + meta.value.ogImage) as any },
      { property: 'og:url',         content: computed(() => site.siteUrl + route.path) as any },
      { property: 'og:type',        content: 'website' },
      { property: 'og:locale',      content: 'ru_RU' },
    ],
  })
}
