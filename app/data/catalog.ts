/**
 * Централизованный справочник каталога ПроПотолок
 *
 * Когда появится API/админка — заменить на:
 *   const { data } = await useFetch('/api/catalog')
 *
 * Структура цен:
 *   price       — цена полотна, ₽/м²
 *   mountPrice  — монтаж, ₽/м² (0 = бесплатно)
 *   extra       — доплата к базовой цене, ₽/м²
 *
 * ⚡ Чтобы изменить минимальную цену — меняйте ТОЛЬКО BASE_PRICE ниже.
 *    Она используется везде: в каталоге, на страницах видов, в калькуляторе.
 */

/** Базовая цена — матовый потолок, монтаж включён, ₽/м² */
export const BASE_PRICE = 159

// ─────────────────────────────────────────
// ФАКТУРЫ
// ─────────────────────────────────────────
export const faktury = [
  {
    id: 'mat',
    slug: '/catalog/faktury/matovye-natyazhnye-potolki',
    title: 'Матовые',
    price: BASE_PRICE,
    mountPrice: 0,
    badge: 'Хит',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75',
  },
  {
    id: 'gly',
    slug: '/catalog/faktury/glyancevye-natyazhnye-potolki',
    title: 'Глянцевые',
    price: 209,
    mountPrice: 0,
    badge: null,
    img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=75',
  },
  {
    id: 'sat',
    slug: '/catalog/faktury/satinovye-natyazhnye-potolki',
    title: 'Сатиновые',
    price: 189,
    mountPrice: 0,
    badge: null,
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=75',
  },
  {
    id: 'tkan',
    slug: '/catalog/faktury/tkanevye-natyazhnye-potolki',
    title: 'Тканевые',
    price: 319,
    mountPrice: 0,
    badge: null,
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=75',
  },
  {
    id: 'fakt',
    slug: '/catalog/faktury/fakturnye-natyazhnye-potolki',
    title: 'Фактурные',
    price: 259,
    mountPrice: 0,
    badge: null,
    img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=75',
  },
  {
    id: 'bess',
    slug: '/catalog/faktury/besshovnye-natyazhnye-potolki',
    title: 'Бесшовные',
    price: 229,
    mountPrice: 0,
    badge: null,
    img: 'https://images.unsplash.com/photo-1600573472559-240e53e0e27a?w=600&q=75',
  },
  {
    id: 'hypo',
    slug: '/catalog/faktury/gipoallergennye-natyazhnye-potolki',
    title: 'Гипоаллергенные',
    price: 279,
    mountPrice: 0,
    badge: null,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75',
  },
  {
    id: 'fire',
    slug: '/catalog/faktury/negoryuchie-natyazhnye-potolki',
    title: 'Негорючие',
    price: 299,
    mountPrice: 0,
    badge: null,
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=75',
  },
]

// ─────────────────────────────────────────
// ВИДЫ / ТЕХНОЛОГИИ
// ─────────────────────────────────────────
export const vidy = [
  {
    id: 'base',
    slug: '/catalog/faktury/matovye-natyazhnye-potolki',
    title: 'Обычный',
    extra: 0,
    badge: null,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75',
  },
  {
    id: 'pary',
    slug: '/catalog/vidy/paryashchie-natyazhnye-potolki',
    title: 'Парящий',
    extra: 180,
    badge: 'Тренд',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=75',
  },
  {
    id: 'light',
    slug: '/catalog/vidy/natyazhnye-potolki-s-podsvetkoy',
    title: 'С подсветкой',
    extra: 220,
    badge: 'Хит',
    img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=75',
  },
  {
    id: 'two',
    slug: '/catalog/vidy/dvuhurovnevye-natyazhnye-potolki',
    title: 'Двухуровневый',
    extra: 350,
    badge: null,
    img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=75',
  },
  {
    id: 'photo',
    slug: '/catalog/vidy/natyazhnye-potolki-s-fotopechatyu',
    title: 'Фотопечать',
    extra: 400,
    badge: null,
    img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=75',
  },
  {
    id: 'star',
    slug: '/catalog/vidy/natyazhnye-potolki-zvezdnoe-nebo',
    title: 'Звёздное небо',
    extra: 500,
    badge: null,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75',
  },
  {
    id: 'lines',
    slug: '/catalog/vidy/natyazhnye-potolki-so-svetovymi-liniyami',
    title: 'Световые линии',
    extra: 280,
    badge: null,
    img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=75',
  },
  {
    id: 'shadow',
    slug: '/catalog/vidy/tenevye-natyazhnye-potolki',
    title: 'Теневой',
    extra: 200,
    badge: null,
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=75',
  },
  {
    id: 'contour',
    slug: '/catalog/vidy/konturnye-natyazhnye-potolki',
    title: 'Контурный',
    extra: 250,
    badge: null,
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=75',
  },
  {
    id: 'many',
    slug: '/catalog/vidy/mnogourovenye-natyazhnye-potolki',
    title: 'Многоуровневый',
    extra: 450,
    badge: null,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75',
  },
  {
    id: 'curve',
    slug: '/catalog/vidy/krivolinejnye-natyazhnye-potolki',
    title: 'Криволинейный',
    extra: 380,
    badge: null,
    img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=75',
  },
  {
    id: 'light3',
    slug: '/catalog/osveshchenie',
    title: 'Освещение',
    extra: 200,
    badge: null,
    img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=75',
  },
]

// ─────────────────────────────────────────
// ПО ПОМЕЩЕНИЮ
// ─────────────────────────────────────────
export const pomeshcheniya = [
  { id: 'living',  slug: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-gostinoy',      title: 'В гостиной',     icon: 'lucide:sofa',       price: BASE_PRICE, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=75' },
  { id: 'bedroom', slug: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-spalne',        title: 'В спальне',      icon: 'lucide:bed',        price: BASE_PRICE, img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=75' },
  { id: 'kitchen', slug: '/catalog/po-pomescheniyu/natyazhnye-potolki-na-kuhne',        title: 'На кухне',       icon: 'lucide:utensils',   price: BASE_PRICE, img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=75' },
  { id: 'bath',    slug: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-vannoy',        title: 'В ванной',       icon: 'lucide:droplets',   price: BASE_PRICE, img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=75' },
  { id: 'kids',    slug: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-detskoy',       title: 'В детской',      icon: 'lucide:baby',       price: BASE_PRICE, img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=75' },
  { id: 'hall',    slug: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-prihozhey',     title: 'В прихожей',     icon: 'lucide:door-open',  price: BASE_PRICE, img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=75' },
  { id: 'flat',    slug: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-kvartire',      title: 'В квартире',     icon: 'lucide:building',   price: BASE_PRICE, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=75' },
  { id: 'house',   slug: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-chastnom-dome', title: 'В частном доме', icon: 'lucide:home',       price: BASE_PRICE, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=75' },
  { id: 'toilet',  slug: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-tualete',       title: 'В туалете',      icon: 'lucide:square',     price: BASE_PRICE, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=75' },
  { id: 'office',  slug: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-ofise',         title: 'В офисе',        icon: 'lucide:building-2', price: BASE_PRICE, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=75' },
  { id: 'balcony', slug: '/catalog/po-pomescheniyu/natyazhnye-potolki-na-balkone',      title: 'На балконе',     icon: 'lucide:wind',       price: BASE_PRICE, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=75' },
  { id: 'dacha',   slug: '/catalog/po-pomescheniyu/natyazhnye-potolki-na-dache',        title: 'На даче',        icon: 'lucide:trees',      price: BASE_PRICE, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=75' },
]

// ─────────────────────────────────────────
// ЦВЕТА
// ─────────────────────────────────────────
export const tsveta = [
  { id: 'white',  slug: '/catalog/tsveta/belye-natyazhnye-potolki',       title: 'Белые',      hex: '#f0f0f0',                                        extra: 0,  price: BASE_PRICE, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75' },
  { id: 'black',  slug: '/catalog/tsveta/chernye-natyazhnye-potolki',     title: 'Чёрные',     hex: '#1a1a1a',                                        extra: 20, price: 169, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=75' },
  { id: 'grey',   slug: '/catalog/tsveta/serye-natyazhnye-potolki',       title: 'Серые',      hex: '#9e9e9e',                                        extra: 10, price: 169, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=75' },
  { id: 'beige',  slug: '/catalog/tsveta/bezhevye-natyazhnye-potolki',    title: 'Бежевые',    hex: '#d4b896',                                        extra: 10, price: 169, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=75' },
  { id: 'color',  slug: '/catalog/tsveta/cvetnye-natyazhnye-potolki',     title: 'Цветные',    hex: 'linear-gradient(135deg,#f66,#fc0,#6cf)',         extra: 30, price: 179, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=75' },
  { id: 'gold',   slug: '/catalog/tsveta/zolotye-natyazhnye-potolki',     title: 'Золотые',    hex: 'linear-gradient(135deg,#c8a84b,#f5e27a)',        extra: 40, price: 199, img: 'https://images.unsplash.com/photo-1600573472559-240e53e0e27a?w=600&q=75' },
  { id: 'blue',   slug: '/catalog/tsveta/golubye-natyazhnye-potolki',     title: 'Голубые',    hex: '#90c8f0',                                        extra: 20, price: 169, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75' },
  { id: 'brown',  slug: '/catalog/tsveta/korichnevye-natyazhnye-potolki', title: 'Коричневые', hex: '#8b6347',                                        extra: 20, price: 169, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=75' },
]

// ─────────────────────────────────────────
// БРЕНДЫ / ПРОИЗВОДИТЕЛИ
// ─────────────────────────────────────────
export const brendy = [
  {
    id: 'msd',
    slug: '/catalog/brendy/natyazhnye-potolki-msd',
    title: 'MSD',
    country: 'Китай / EU',
    countryIcon: 'lucide:factory',
    type: 'ПВХ',
    badge: 'Хит',
    desc: 'Три серии: Classic, Evolution, Premium. Один из самых популярных брендов на рынке — соотношение цены и качества.',
    price: BASE_PRICE,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75',
  },
  {
    id: 'bauf',
    slug: '/catalog/brendy/natyazhnye-potolki-bauf',
    title: 'Bauf',
    country: 'Германия',
    countryIcon: 'lucide:flag',
    type: 'ПВХ',
    badge: null,
    desc: 'Немецкие технологии, 4 сертификата экологичности. Маркировка A+ — воздух в помещении остаётся абсолютно чистым.',
    price: 189,
    img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=75',
  },
  {
    id: 'lumfer',
    slug: '/catalog/brendy/natyazhnye-potolki-lumfer',
    title: 'LumFer',
    country: 'Германия',
    countryIcon: 'lucide:flag',
    type: 'ПВХ двухслойный',
    badge: null,
    desc: 'Двухслойное полотно Ferico GBR. Толщина 32 мм, не просвечивает, не вибрирует на сквозняках. Не воспламеняется.',
    price: 249,
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=75',
  },
  {
    id: 'teqtum',
    slug: '/catalog/brendy/natyazhnye-potolki-teqtum',
    title: 'Teqtum',
    country: 'Россия / EU',
    countryIcon: 'lucide:shield-check',
    type: 'ПВХ',
    badge: 'МЧС ✓',
    desc: 'Единственная плёнка, прошедшая испытания МЧС России. Без формальдегидов, допущена в медучреждения и детские сады.',
    price: 279,
    img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=75',
  },
  {
    id: 'descor',
    slug: '/catalog/brendy/natyazhnye-potolki-descor',
    title: 'Descor',
    country: 'Германия',
    countryIcon: 'lucide:flag',
    type: 'Тканевый',
    badge: null,
    desc: 'Тканевое полотно из волокна Trevira CS. Огнеупорное, жаростойкое, легко моется. Без ПВХ.',
    price: 319,
    img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=75',
  },
  {
    id: 'pongs',
    slug: '/catalog/brendy/natyazhnye-potolki-pongs',
    title: 'Pongs',
    country: 'Германия',
    countryIcon: 'lucide:flag',
    type: 'ПВХ премиум',
    badge: 'Премиум',
    desc: 'Безупречное немецкое качество. Пластификатор DOTP вместо токсичного DOP. Выдерживает 100 л/м² при затоплении.',
    price: 349,
    img: 'https://images.unsplash.com/photo-1600573472559-240e53e0e27a?w=600&q=75',
  },
  {
    id: 'clipso',
    slug: '/catalog/brendy/natyazhnye-potolki-clipso',
    title: 'Clipso',
    country: 'Франция',
    countryIcon: 'lucide:flag',
    type: 'Тканевый',
    badge: null,
    desc: 'Французское тканевое полотно. Монтаж без нагрева, дышит, не образует конденсат. Акустические и цветные варианты.',
    price: 389,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75',
  },
  {
    id: 'cerutti',
    slug: '/catalog/brendy/natyazhnye-potolki-cerutti',
    title: 'Cerutti',
    country: 'Швейцария',
    countryIcon: 'lucide:gem',
    type: 'Тканевый люкс',
    badge: 'Люкс',
    desc: 'Швейцарский дом текстиля. Люкс-сегмент: безупречно ровное покрытие, максимальная экологичность, влагозащитный лак.',
    price: 490,
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=75',
  },
]

// ─────────────────────────────────────────
// ДОП. РАБОТЫ
// ─────────────────────────────────────────
export const extraWorks = [
  { key: 'angles', name: 'Углы / стыки',  icon: 'lucide:corner-up-right', price: 150, unit: 'шт',   default: 4 },
  { key: 'lights', name: 'Светильники',   icon: 'lucide:lightbulb',       price: 300, unit: 'шт',   default: 0 },
  { key: 'pipes',  name: 'Обводы труб',   icon: 'lucide:circle-dashed',   price: 250, unit: 'шт',   default: 0 },
  { key: 'niche',  name: 'Парящая ниша',  icon: 'lucide:lamp-ceiling',    price: 350, unit: 'м.п.', default: 0 },
]
