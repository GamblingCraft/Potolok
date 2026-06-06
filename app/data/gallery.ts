/**
 * Галерея работ по страницам каталога
 *
 * Структура: Record<slug страницы, массив фото>
 *
 * Когда появится API/админка → заменить на $fetch('/api/gallery?slug=...')
 *
 * GalleryItem.img    — URL фото (загружается через админку)
 * GalleryItem.price  — итоговая стоимость работы ₽ (опционально)
 * GalleryItem.details — детали монтажа (углы, профиль, светильники и т.д.)
 */

export interface GalleryItem {
  id: number
  img: string
  title: string           // Название работы
  area?: number           // Площадь, м²
  room?: string           // Тип помещения
  price?: number          // Итоговая цена ₽
  details?: string[]      // ['Углы: 8 шт', 'Профиль: 22 м', ...]
}

// ─────────────────────────────────────────
// ФАКТУРЫ
// ─────────────────────────────────────────

export const catalogGallery: Record<string, GalleryItem[]> = {

  'glyancevye-natyazhnye-potolki': [
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80',
      title: 'Глянцевый потолок в гостиной',
      area: 22,
      room: 'Гостиная',
      price: 9680,
      details: ['Углы: 8 шт', 'Профиль: 24 м', 'Светильники: 8 шт', 'Цвет: белый'],
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
      title: 'Глянцевый потолок в спальне',
      area: 14,
      room: 'Спальня',
      price: 6230,
      details: ['Углы: 4 шт', 'Профиль: 16 м', 'Светильники: 5 шт', 'Цвет: бежевый'],
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      title: 'Глянцевый потолок на кухне',
      area: 9,
      room: 'Кухня',
      price: 4870,
      details: ['Углы: 4 шт', 'Профиль: 13 м', 'Светильники: 7 шт', 'Цвет: белый'],
    },
    {
      id: 4,
      img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
      title: 'Глянцевый в прихожей',
      area: 7,
      room: 'Прихожая',
      price: 3560,
      details: ['Углы: 6 шт', 'Профиль: 10 м', 'Светильники: 4 шт', 'Цвет: серебро'],
    },
    {
      id: 5,
      img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
      title: 'Глянцевый в ванной',
      area: 5,
      room: 'Ванная',
      price: 2940,
      details: ['Углы: 4 шт', 'Профиль: 9 м', 'Споты: 6 шт', 'Цвет: белый'],
    },
    {
      id: 6,
      img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80',
      title: 'Глянцевый потолок в зале',
      area: 30,
      room: 'Зал',
      price: 13100,
      details: ['Углы: 10 шт', 'Профиль: 34 м', 'Светильники: 12 шт', 'Цвет: белый'],
    },
    {
      id: 7,
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      title: 'Глянцевый в детской',
      area: 12,
      room: 'Детская',
      price: 5440,
      details: ['Углы: 4 шт', 'Профиль: 14 м', 'Споты: 6 шт', 'Цвет: голубой'],
    },
    {
      id: 8,
      img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      title: 'Глянцевый + фотопечать',
      area: 18,
      room: 'Гостиная',
      price: 13810,
      details: ['Углы: 4 шт', 'Профиль: 18 м', 'Споты: 12 шт', 'Фотопечать'],
    },
  ],

  'matovye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Матовый белый в гостиной', area: 22, room: 'Гостиная', price: 7920, details: ['Углы: 6 шт', 'Профиль: 24 м', 'Светильники: 8 шт', 'Цвет: белый'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Матовый потолок в спальне', area: 16, room: 'Спальня', price: 5760, details: ['Углы: 4 шт', 'Профиль: 16 м', 'Споты: 6 шт', 'Цвет: белый'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', title: 'Матовый на кухне с точечными', area: 10, room: 'Кухня', price: 3600, details: ['Углы: 4 шт', 'Профиль: 13 м', 'Споты: 9 шт', 'Цвет: белый'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', title: 'Матовый в детской', area: 13, room: 'Детская', price: 4680, details: ['Углы: 4 шт', 'Профиль: 14 м', 'Споты: 5 шт', 'Цвет: белый'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80', title: 'Матовый в прихожей', area: 8, room: 'Прихожая', price: 2880, details: ['Углы: 8 шт', 'Профиль: 11 м', 'Споты: 5 шт', 'Цвет: белый'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Матовый серый в зале', area: 28, room: 'Зал', price: 10080, details: ['Углы: 6 шт', 'Профиль: 30 м', 'Светильники: 12 шт', 'Цвет: серый'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Матовый + фотопечать', area: 18, room: 'Гостиная', price: 11700, details: ['Углы: 4 шт', 'Профиль: 18 м', 'Фотопечать', 'Споты: 8 шт'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', title: 'Матовый в ванной', area: 6, room: 'Ванная', price: 2160, details: ['Углы: 4 шт', 'Профиль: 10 м', 'Споты: 6 шт', 'Цвет: белый'] },
  ],

  'satinovye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Сатиновый в гостиной', area: 22, room: 'Гостиная', price: 9900, details: ['Углы: 6 шт', 'Профиль: 24 м', 'Светильники: 8 шт', 'Цвет: белый'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80', title: 'Сатиновый бежевый в спальне', area: 18, room: 'Спальня', price: 8100, details: ['Углы: 4 шт', 'Профиль: 18 м', 'Споты: 6 шт', 'Цвет: бежевый'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Сатиновый серый в зале', area: 30, room: 'Зал', price: 13500, details: ['Углы: 8 шт', 'Профиль: 32 м', 'Светильники: 12 шт', 'Цвет: серый'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Сатиновый в детской', area: 14, room: 'Детская', price: 6300, details: ['Углы: 4 шт', 'Профиль: 15 м', 'Споты: 5 шт', 'Цвет: белый'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', title: 'Сатиновый на кухне', area: 11, room: 'Кухня', price: 4950, details: ['Углы: 4 шт', 'Профиль: 13 м', 'Споты: 8 шт', 'Цвет: белый'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1600573472559-240e53e0e27a?w=800&q=80', title: 'Сатиновый кремовый', area: 20, room: 'Гостиная', price: 9000, details: ['Углы: 6 шт', 'Профиль: 20 м', 'Светильники: 8 шт', 'Цвет: кремовый'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Сатиновый с LED-подсветкой', area: 25, room: 'Гостиная', price: 14750, details: ['Парящая ниша: 10 м', 'Споты: 10 шт', 'LED-лента', 'Цвет: белый'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80', title: 'Сатиновый в прихожей', area: 7, room: 'Прихожая', price: 3150, details: ['Углы: 6 шт', 'Профиль: 10 м', 'Споты: 4 шт', 'Цвет: белый'] },
  ],

  'tkanevye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Тканевый Clipso в гостиной', area: 26, room: 'Гостиная', price: 19500, details: ['Clipso (Франция)', 'Углы: 6 шт', 'Профиль: 28 м', 'Споты: 10 шт'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80', title: 'Тканевый Descor в спальне', area: 17, room: 'Спальня', price: 12750, details: ['Descor (Германия)', 'Углы: 4 шт', 'Профиль: 17 м', 'Споты: 6 шт'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', title: 'Тканевый в детской', area: 14, room: 'Детская', price: 10500, details: ['Без ПВХ', 'Углы: 4 шт', 'Профиль: 15 м', 'Цвет: белый'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Тканевый акустический офис', area: 40, room: 'Офис', price: 30000, details: ['Clipso акустик', 'Профиль: 40 м', 'Споты: 20 шт', 'Без шва'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80', title: 'Тканевый в прихожей', area: 9, room: 'Прихожая', price: 6750, details: ['Descor', 'Углы: 8 шт', 'Профиль: 12 м', 'Споты: 5 шт'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Тканевый Cerutti в зале', area: 32, room: 'Зал', price: 28800, details: ['Cerutti (Швейцария)', 'Без шва', 'Споты: 14 шт', 'Профиль: 34 м'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Тканевый в кабинете', area: 18, room: 'Кабинет', price: 13500, details: ['Clipso', 'Углы: 4 шт', 'Профиль: 18 м', 'Трековые светильники'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', title: 'Тканевый цветной Clipso', area: 22, room: 'Гостиная', price: 18150, details: ['Clipso цветной', 'Углы: 6 шт', 'Профиль: 22 м', 'Цвет: пастельный'] },
  ],

  'fakturnye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Фактурный под кожу в кабинете', area: 18, room: 'Кабинет', price: 8680, details: ['Имитация кожи', 'Углы: 4 шт', 'Профиль: 18 м', 'Трековые светильники'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Фактурный под мрамор в гостиной', area: 24, room: 'Гостиная', price: 11570, details: ['Имитация мрамора', 'Углы: 6 шт', 'Профиль: 24 м', 'Споты: 10 шт'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1600573472559-240e53e0e27a?w=800&q=80', title: 'Фактурный металлик', area: 20, room: 'Гостиная', price: 9650, details: ['Металлик', 'Углы: 6 шт', 'Профиль: 22 м', 'Направленный свет'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Фактурный под камень', area: 16, room: 'Коридор', price: 7720, details: ['Имитация камня', 'Углы: 8 шт', 'Профиль: 18 м', 'Споты: 6 шт'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Фактурный замша в спальне', area: 15, room: 'Спальня', price: 7230, details: ['Имитация замши', 'Углы: 4 шт', 'Профиль: 15 м', 'Точечный свет'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Фактурный + подсветка', area: 22, room: 'Гостиная', price: 13400, details: ['Фактурный', 'Парящая ниша: 8 м', 'LED-лента', 'Споты: 8 шт'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Комбинация фактур в зале', area: 30, room: 'Зал', price: 18250, details: ['Две фактуры', 'Спайка по диагонали', 'Споты: 14 шт', 'Профиль: 34 м'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Фактурный ресторан', area: 55, room: 'Коммерческое', price: 33450, details: ['Имитация кожи', 'Профиль: 58 м', 'Трековые светильники', 'Без шва'] },
  ],

  'besshovnye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Бесшовный в большой гостиной', area: 35, room: 'Гостиная', price: 11375, details: ['Полотно 5 м', 'Без шва', 'Светильники: 14 шт', 'Профиль: 38 м'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Бесшовный в зале ЖК', area: 42, room: 'Зал', price: 13650, details: ['Полотно 5 м', 'Без шва', 'Светильники: 16 шт', 'Профиль: 46 м'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Бесшовный тканевый Clipso', area: 28, room: 'Гостиная', price: 12880, details: ['Clipso 5.2 м', 'Без шва', 'Споты: 10 шт', 'Профиль: 32 м'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Бесшовный в офисе open-space', area: 80, room: 'Офис', price: 26000, details: ['Без шва', 'Трековые светильники', 'Профиль: 80 м', 'ПВХ матовый'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Бесшовный в ресторане', area: 65, room: 'Ресторан', price: 21125, details: ['Без шва', 'Споты: 30 шт', 'Профиль: 70 м', 'Глянец'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Бесшовный в спальне', area: 20, room: 'Спальня', price: 6500, details: ['Полотно 5 м', 'Без шва', 'Споты: 8 шт', 'Профиль: 22 м'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Бесшовный апартаменты', area: 50, room: 'Апартаменты', price: 16250, details: ['Без шва', 'LED-линии: 12 м', 'Споты: 22 шт', 'Профиль: 55 м'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Бесшовный в бассейне', area: 25, room: 'Бассейн', price: 8125, details: ['Без шва', 'ПВХ влагостойкий', 'Профиль: 26 м', 'Споты: 10 шт'] },
  ],

  'gipoallergennye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', title: 'Гипоаллергенный в детской', area: 14, room: 'Детская', price: 7840, details: ['Clipso без ПВХ', 'Углы: 4 шт', 'Профиль: 15 м', 'Споты: 5 шт'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80', title: 'Гипоаллергенный в спальне', area: 17, room: 'Спальня', price: 9520, details: ['Descor без ПВХ', 'Углы: 4 шт', 'Профиль: 18 м', 'Споты: 6 шт'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Тканевый Cerutti в гостиной', area: 24, room: 'Гостиная', price: 13440, details: ['Cerutti (Швейцария)', 'Профиль: 24 м', 'Споты: 10 шт', 'Без запаха'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Гипоаллергенный в медкабинете', area: 20, room: 'Медкабинет', price: 11200, details: ['Teqtum', 'Углы: 4 шт', 'Профиль: 22 м', 'Сертификат СЭС'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80', title: 'Гипоаллергенный в прихожей', area: 9, room: 'Прихожая', price: 5040, details: ['Clipso', 'Углы: 6 шт', 'Профиль: 12 м', 'Споты: 5 шт'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', title: 'Детская «Звёздное небо»', area: 13, room: 'Детская', price: 9100, details: ['Без ПВХ', 'Звёздное небо: 200 точек', 'Профиль: 14 м', 'Углы: 4 шт'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Тканевый в детском саду', area: 35, room: 'Детский сад', price: 19600, details: ['Clipso сертифицирован', 'Без ПВХ', 'Профиль: 38 м', 'Споты: 16 шт'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Гипоаллергенный в студии', area: 22, room: 'Студия', price: 12320, details: ['Descor', 'Без шва', 'Споты: 10 шт', 'Профиль: 24 м'] },
  ],

  'negoryuchie-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Негорючий Teqtum в офисе', area: 45, room: 'Офис', price: 22500, details: ['Teqtum (МЧС ✓)', 'Профиль: 50 м', 'Трековые светильники', 'Без шва'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Противопожарный в ресторане', area: 60, room: 'Ресторан', price: 30000, details: ['Teqtum', 'Профиль: 65 м', 'Споты: 28 шт', 'Без шва'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Negoryuchiy Descor в гостинице', area: 25, room: 'Гостиница', price: 12500, details: ['Descor Trevira CS', 'Углы: 4 шт', 'Профиль: 26 м', 'Споты: 12 шт'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Негорючий в торговом зале', area: 100, room: 'Магазин', price: 50000, details: ['Teqtum (МЧС ✓)', 'Трековые светильники', 'Профиль: 110 м', 'Без шва'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Негорючий в квартире', area: 22, room: 'Гостиная', price: 11000, details: ['Teqtum', 'Углы: 6 шт', 'Профиль: 24 м', 'Споты: 8 шт'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Descor в детском учреждении', area: 30, room: 'Детский сад', price: 15000, details: ['Descor Trevira CS', 'Огнеупорный', 'Профиль: 32 м', 'Споты: 14 шт'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Негорючий в медцентре', area: 40, room: 'Медцентр', price: 20000, details: ['Teqtum (МЧС ✓)', 'Сертификат СЭС', 'Профиль: 44 м', 'Споты: 20 шт'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Противопожарный в школе', area: 55, room: 'Школа', price: 27500, details: ['Teqtum (МЧС ✓)', 'Без шва', 'Профиль: 58 м', 'Светильники: 24 шт'] },
  ],

  // ─────────────────────────────────────────
  // БРЕНДЫ
  // Ключ совпадает с сегментом URL: /catalog/brendy/{key}
  // Фото загружаются через админку — структура GalleryItem зафиксирована
  // ─────────────────────────────────────────

  'natyazhnye-potolki-msd': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Матовый MSD в гостиной', area: 22, room: 'Гостиная', price: 8360 },
    { id: 2, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Глянцевый MSD в спальне', area: 14, room: 'Спальня', price: 5900 },
    { id: 3, img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', title: 'MSD на кухне', area: 10, room: 'Кухня', price: 4200 },
    { id: 4, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'MSD в детской', area: 12, room: 'Детская', price: 4800 },
    { id: 5, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'MSD с подсветкой', area: 18, room: 'Гостиная', price: 9100 },
    { id: 6, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'MSD Premium в зале', area: 30, room: 'Зал', price: 13500 },
  ],

  'natyazhnye-potolki-bauf': [
    { id: 1, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Bauf глянец в гостиной', area: 24, room: 'Гостиная', price: 10800 },
    { id: 2, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Bauf матовый в спальне', area: 16, room: 'Спальня', price: 6720 },
    { id: 3, img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', title: 'Bauf в ванной', area: 6, room: 'Ванная', price: 3240 },
    { id: 4, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Bauf матовый в детской', area: 13, room: 'Детская', price: 5460 },
    { id: 5, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Bauf в прихожей', area: 8, room: 'Прихожая', price: 3360 },
    { id: 6, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Bauf двухуровневый', area: 26, room: 'Гостиная', price: 18200 },
  ],

  'natyazhnye-potolki-lumfer': [
    { id: 1, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'LumFer с трековым освещением', area: 20, room: 'Гостиная', price: 11400 },
    { id: 2, img: 'https://images.unsplash.com/photo-1600573472559-240e53e0e27a?w=800&q=80', title: 'LumFer в коридоре', area: 9, room: 'Прихожая', price: 4860 },
    { id: 3, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'LumFer со споттами', area: 16, room: 'Спальня', price: 8640 },
    { id: 4, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'LumFer в кабинете', area: 14, room: 'Кабинет', price: 7560 },
    { id: 5, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'LumFer в зале', area: 28, room: 'Зал', price: 15120 },
    { id: 6, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'LumFer с LED-лентой', area: 18, room: 'Гостиная', price: 10800 },
  ],

  'natyazhnye-potolki-teqtum': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Teqtum в детской', area: 14, room: 'Детская', price: 6720 },
    { id: 2, img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', title: 'Teqtum в спальне', area: 16, room: 'Спальня', price: 7680 },
    { id: 3, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Teqtum в гостиной', area: 22, room: 'Гостиная', price: 10560 },
    { id: 4, img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', title: 'Teqtum на кухне', area: 11, room: 'Кухня', price: 5280 },
    { id: 5, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Teqtum в медкабинете', area: 30, room: 'Офис', price: 14400 },
    { id: 6, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Teqtum в прихожей', area: 7, room: 'Прихожая', price: 3360 },
  ],

  'natyazhnye-potolki-descor': [
    { id: 1, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Descor тканевый в гостиной', area: 24, room: 'Гостиная', price: 15360 },
    { id: 2, img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80', title: 'Descor в спальне', area: 16, room: 'Спальня', price: 10240 },
    { id: 3, img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', title: 'Descor в детской', area: 13, room: 'Детская', price: 8320 },
    { id: 4, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Descor в прихожей', area: 9, room: 'Прихожая', price: 5760 },
    { id: 5, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Descor в кабинете', area: 18, room: 'Кабинет', price: 11520 },
    { id: 6, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Descor огнеупорный в офисе', area: 45, room: 'Офис', price: 28800 },
  ],

  'natyazhnye-potolki-pongs': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600573472559-240e53e0e27a?w=800&q=80', title: 'Pongs премиум в гостиной', area: 26, room: 'Гостиная', price: 18200 },
    { id: 2, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Pongs в зале', area: 32, room: 'Зал', price: 22400 },
    { id: 3, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Pongs в спальне', area: 18, room: 'Спальня', price: 12600 },
    { id: 4, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Pongs глянец в прихожей', area: 8, room: 'Прихожая', price: 5600 },
    { id: 5, img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', title: 'Pongs в ванной', area: 7, room: 'Ванная', price: 4900 },
    { id: 6, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Pongs в частном доме', area: 40, room: 'Дом', price: 28000 },
  ],

  'natyazhnye-potolki-clipso': [
    { id: 1, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Clipso тканевый в зале', area: 28, room: 'Гостиная', price: 22400 },
    { id: 2, img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80', title: 'Clipso в спальне', area: 17, room: 'Спальня', price: 13600 },
    { id: 3, img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', title: 'Clipso акустический в кабинете', area: 22, room: 'Кабинет', price: 17600 },
    { id: 4, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Clipso в детской', area: 14, room: 'Детская', price: 11200 },
    { id: 5, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Clipso цветной', area: 18, room: 'Гостиная', price: 14400 },
    { id: 6, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', title: 'Clipso в ресторане', area: 60, room: 'Коммерческое', price: 48000 },
  ],

  'natyazhnye-potolki-cerutti': [
    { id: 1, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Cerutti люкс в гостиной', area: 30, room: 'Гостиная', price: 29400 },
    { id: 2, img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80', title: 'Cerutti в спальне', area: 20, room: 'Спальня', price: 19600 },
    { id: 3, img: 'https://images.unsplash.com/photo-1600573472559-240e53e0e27a?w=800&q=80', title: 'Cerutti в пентхаусе', area: 55, room: 'Гостиная', price: 53900 },
    { id: 4, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Cerutti в кабинете', area: 18, room: 'Кабинет', price: 17640 },
    { id: 5, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Cerutti в детской', area: 14, room: 'Детская', price: 13720 },
    { id: 6, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Cerutti в загородном доме', area: 45, room: 'Дом', price: 44100 },
  ],

}
