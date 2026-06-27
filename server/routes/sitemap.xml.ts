const BASE_URL = 'https://пропотолок.рф'

interface SitemapEntry {
  loc: string
  priority: string
  changefreq: string
}

function url(path: string, priority: string, changefreq: string): SitemapEntry {
  return { loc: BASE_URL + path, priority, changefreq }
}

function buildEntries(): SitemapEntry[] {
  return [
    // Главная
    url('/', '1.0', 'daily'),

    // Основные страницы
    url('/catalog',           '0.9', 'weekly'),
    url('/ceny',              '0.9', 'weekly'),
    url('/portfolio',         '0.9', 'weekly'),
    url('/otzyvy',            '0.9', 'weekly'),
    url('/kalkulyator',       '0.9', 'weekly'),
    url('/akczii',            '0.9', 'weekly'),
    url('/kontakty',          '0.8', 'weekly'),
    url('/o-kompanii',        '0.8', 'monthly'),
    url('/garantiya',         '0.8', 'monthly'),
    url('/voprosy-otvety',    '0.7', 'monthly'),
    url('/rekvizity',         '0.5', 'yearly'),
    url('/sertifikaty',       '0.6', 'monthly'),
    url('/obmen-i-vozvrat',   '0.5', 'yearly'),
    url('/rassrochka-i-oplata','0.7', 'monthly'),

    // Каталог — разделы
    url('/catalog/faktury',       '0.8', 'weekly'),
    url('/catalog/vidy',          '0.8', 'weekly'),
    url('/catalog/po-pomescheniyu','0.8', 'weekly'),
    url('/catalog/tsveta',        '0.8', 'weekly'),
    url('/catalog/brendy',        '0.7', 'monthly'),
    url('/uslugi',                '0.8', 'weekly'),

    // Каталог — Фактуры
    url('/catalog/faktury/matovye-natyazhnye-potolki',          '0.8', 'monthly'),
    url('/catalog/faktury/glyancevye-natyazhnye-potolki',       '0.8', 'monthly'),
    url('/catalog/faktury/satinovye-natyazhnye-potolki',        '0.7', 'monthly'),
    url('/catalog/faktury/tkanevye-natyazhnye-potolki',         '0.7', 'monthly'),
    url('/catalog/faktury/fakturnye-natyazhnye-potolki',        '0.7', 'monthly'),
    url('/catalog/faktury/besshovnye-natyazhnye-potolki',       '0.7', 'monthly'),
    url('/catalog/faktury/gipoallergennye-natyazhnye-potolki',  '0.7', 'monthly'),
    url('/catalog/faktury/negoryuchie-natyazhnye-potolki',      '0.7', 'monthly'),

    // Каталог — Виды
    url('/catalog/vidy/dvuhurovnevye-natyazhnye-potolki',         '0.8', 'monthly'),
    url('/catalog/vidy/mnogourovenye-natyazhnye-potolki',         '0.7', 'monthly'),
    url('/catalog/vidy/paryashchie-natyazhnye-potolki',           '0.8', 'monthly'),
    url('/catalog/vidy/tenevye-natyazhnye-potolki',               '0.8', 'monthly'),
    url('/catalog/vidy/natyazhnye-potolki-s-fotopechatyu',        '0.7', 'monthly'),
    url('/catalog/vidy/natyazhnye-potolki-zvezdnoe-nebo',         '0.7', 'monthly'),
    url('/catalog/vidy/natyazhnye-potolki-so-svetovymi-liniyami', '0.7', 'monthly'),
    url('/catalog/vidy/natyazhnye-potolki-beton',                  '0.7', 'monthly'),
    url('/catalog/vidy/natyazhnye-potolki-s-podsvetkoy',          '0.7', 'monthly'),
    url('/catalog/vidy/konturnye-natyazhnye-potolki',             '0.7', 'monthly'),
    url('/catalog/vidy/krivolinejnye-natyazhnye-potolki',         '0.7', 'monthly'),
    url('/catalog/vidy/besshchelevye-natyazhnye-potolki',         '0.7', 'monthly'),
    url('/catalog/vidy/natyazhnye-potolki-3d',                    '0.7', 'monthly'),
    url('/catalog/vidy/besshovnye-natyazhnye-potolki',            '0.6', 'monthly'),

    // Каталог — По помещению
    url('/catalog/po-pomescheniyu/natyazhnye-potolki-na-kuhne',        '0.7', 'monthly'),
    url('/catalog/po-pomescheniyu/natyazhnye-potolki-v-vannoy',        '0.7', 'monthly'),
    url('/catalog/po-pomescheniyu/natyazhnye-potolki-v-gostinoy',      '0.8', 'monthly'),
    url('/catalog/po-pomescheniyu/natyazhnye-potolki-v-spalne',        '0.7', 'monthly'),
    url('/catalog/po-pomescheniyu/natyazhnye-potolki-v-detskoy',       '0.7', 'monthly'),
    url('/catalog/po-pomescheniyu/natyazhnye-potolki-v-prihozhey',     '0.6', 'monthly'),
    url('/catalog/po-pomescheniyu/natyazhnye-potolki-v-kvartire',      '0.8', 'monthly'),
    url('/catalog/po-pomescheniyu/natyazhnye-potolki-v-chastnom-dome', '0.7', 'monthly'),
    url('/catalog/po-pomescheniyu/natyazhnye-potolki-v-ofise',         '0.6', 'monthly'),
    url('/catalog/po-pomescheniyu/natyazhnye-potolki-v-tualete',       '0.5', 'monthly'),
    url('/catalog/po-pomescheniyu/natyazhnye-potolki-na-balkone',      '0.5', 'monthly'),
    url('/catalog/po-pomescheniyu/natyazhnye-potolki-na-dache',        '0.5', 'monthly'),

    // Каталог — Цвета
    url('/catalog/tsveta/belye-natyazhnye-potolki',      '0.7', 'monthly'),
    url('/catalog/tsveta/chernye-natyazhnye-potolki',    '0.6', 'monthly'),
    url('/catalog/tsveta/serye-natyazhnye-potolki',      '0.6', 'monthly'),
    url('/catalog/tsveta/bezhevye-natyazhnye-potolki',   '0.6', 'monthly'),
    url('/catalog/tsveta/cvetnye-natyazhnye-potolki',    '0.6', 'monthly'),
    url('/catalog/tsveta/zolotye-natyazhnye-potolki',    '0.6', 'monthly'),
    url('/catalog/tsveta/golubye-natyazhnye-potolki',    '0.5', 'monthly'),
    url('/catalog/tsveta/korichnevye-natyazhnye-potolki','0.5', 'monthly'),

    // Каталог — Бренды
    url('/catalog/brendy/natyazhnye-potolki-msd',     '0.6', 'monthly'),
    url('/catalog/brendy/natyazhnye-potolki-bauf',    '0.6', 'monthly'),
    url('/catalog/brendy/natyazhnye-potolki-descor',  '0.6', 'monthly'),
    url('/catalog/brendy/natyazhnye-potolki-clipso',  '0.6', 'monthly'),
    url('/catalog/brendy/natyazhnye-potolki-teqtum',  '0.5', 'monthly'),
    url('/catalog/brendy/natyazhnye-potolki-lumfer',  '0.5', 'monthly'),
    url('/catalog/brendy/natyazhnye-potolki-cerutti', '0.5', 'monthly'),
    url('/catalog/brendy/natyazhnye-potolki-pongs',   '0.5', 'monthly'),

    // Услуги
    url('/uslugi/montazh-natyazhnyh-potolkov',   '0.8', 'monthly'),
    url('/uslugi/vyezd-zamershchika',             '0.8', 'monthly'),
    url('/uslugi/srochnyj-montazh-24-chasa',     '0.7', 'monthly'),
    url('/uslugi/demontazh-natyazhnogo-potolka', '0.7', 'monthly'),
    url('/uslugi/remont-natyazhnogo-potolka',    '0.7', 'monthly'),
    url('/uslugi/sliv-vody-s-natyazhnogo-potolka','0.6', 'monthly'),
    url('/uslugi/zamena-polotna',                '0.6', 'monthly'),
    url('/uslugi/peretyazhka-potolka',           '0.6', 'monthly'),
    url('/uslugi/ustanovka-svetilnikov',          '0.6', 'monthly'),

    // Гео-страницы
    url('/irkutsk',                         '0.7', 'monthly'),
    url('/irkutsk/oktyabrskiy-okrug',       '0.6', 'monthly'),
    url('/irkutsk/pravoberezhnyy-okrug',    '0.6', 'monthly'),
    url('/irkutsk/sverdlovskiy-okrug',      '0.6', 'monthly'),
    url('/irkutsk/leninskiy-okrug',         '0.6', 'monthly'),
  ]
}

function toXml(entries: SitemapEntry[]): string {
  const today = new Date().toISOString().slice(0, 10)
  const urls = entries.map(e => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600')
  return toXml(buildEntries())
})
