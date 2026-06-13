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
  // ПО ПОМЕЩЕНИЮ
  // ─────────────────────────────────────────

  'natyazhnye-potolki-v-gostinoy': [
    { id: 1, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Гостиная с парящим потолком', area: 26, room: 'Гостиная', price: 14040, details: ['Парящий', 'LED-ниша: 10 м', 'Матовое белое', 'Споты: 12 шт'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Двухуровневый в зале', area: 32, room: 'Гостиная', price: 25600, details: ['2 уровня', 'LED RGB', 'Матовое + глянцевое', 'Споты: 14 шт'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Матовый в гостиной', area: 22, room: 'Гостиная', price: 7920, details: ['Матовое белое', 'Споты: 10 шт', 'Углы: 6 шт', 'Профиль: 24 м'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Световые линии в зале', area: 30, room: 'Гостиная', price: 23700, details: ['SLOTT: 10 м', 'LED 4000К', 'Матовое', 'Без шва'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Теневой потолок', area: 24, room: 'Гостиная', price: 13440, details: ['Теневой профиль', 'LED-ниша', 'Матовое белое', 'Бесщелевое'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Глянцевый в гостиной', area: 28, room: 'Гостиная', price: 14280, details: ['Глянцевое белое', 'Споты: 12 шт', 'Углы: 6 шт', 'Без шва'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Контурный потолок', area: 26, room: 'Гостиная', price: 16900, details: ['Контурная ниша', 'LED RGB', 'Матовое', 'Двойной контур'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Сатиновый в зале', area: 30, room: 'Гостиная', price: 13500, details: ['Сатиновое белое', 'Споты: 12 шт', 'Без шва', 'Углы: 8 шт'] },
  ],

  'natyazhnye-potolki-v-spalne': [
    { id: 1, img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80', title: 'Матовый в спальне', area: 17, room: 'Спальня', price: 6120, details: ['Матовое белое', 'Споты: 6 шт', 'Углы: 4 шт', 'Профиль: 17 м'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Парящий над кроватью', area: 20, room: 'Спальня', price: 10800, details: ['Парящий', 'LED тёплая 2700К', 'Матовое белое', 'Над изголовьем'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1600573472559-240e53e0e27a?w=800&q=80', title: 'Сатиновый бежевый', area: 18, room: 'Спальня', price: 8100, details: ['Сатиновое бежевое', 'Споты: 6 шт', 'Углы: 4 шт', 'Без шва'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Тканевый Clipso в спальне', area: 17, room: 'Спальня', price: 13600, details: ['Clipso (Франция)', 'Без ПВХ', 'Споты: 6 шт', 'Без шва'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Двухуровневый в спальне', area: 20, room: 'Спальня', price: 17000, details: ['2 уровня', 'Над кроватью ниша', 'LED тёплая', 'Матовое'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'LED подсветка в спальне', area: 16, room: 'Спальня', price: 8960, details: ['Парящая ниша', 'LED 2700К', 'Матовое', 'Споты: 5 шт'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Звёздное небо в спальне', area: 18, room: 'Спальня', price: 27000, details: ['300 оптоволокон', 'Мерцание', 'Тканевое', 'Диммер'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Белый глянец в спальне', area: 15, room: 'Спальня', price: 7650, details: ['Глянцевое белое', 'Споты: 5 шт', 'Без шва', 'Углы: 4 шт'] },
  ],

  'natyazhnye-potolki-na-kuhne': [
    { id: 1, img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', title: 'Матовый на кухне', area: 12, room: 'Кухня', price: 4320, details: ['Матовое белое', 'Споты: 9 шт', 'IP44', 'Углы: 4 шт'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Световые линии на кухне', area: 14, room: 'Кухня', price: 11060, details: ['FLEXY: 5 м', 'LED 4000К', 'Матовое', 'Над рабочей зоной'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Глянцевый белый кухня', area: 10, room: 'Кухня', price: 5100, details: ['Глянцевое белое', 'Споты: 7 шт', 'Влагостойкий', 'IP44'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Двухуровневый на кухне', area: 16, room: 'Кухня', price: 13600, details: ['2 уровня', 'Зонирование', 'LED 4000К', 'Споты: 8 шт'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Парящий на кухне-гостиной', area: 28, room: 'Кухня-гостиная', price: 15120, details: ['Парящий', 'LED тёплая', 'Без шва', 'Споты: 12 шт'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Сатиновый на кухне', area: 11, room: 'Кухня', price: 4950, details: ['Сатиновое белое', 'Споты: 8 шт', 'IP44', 'Углы: 4 шт'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Студия кухня-гостиная', area: 35, room: 'Студия', price: 18900, details: ['Световые линии', 'Зонирование', 'LED', 'Без шва'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Белый матовый + точечные', area: 13, room: 'Кухня', price: 4680, details: ['Матовое белое', 'Споты: 10 шт', 'IP44', 'Влагостойкий'] },
  ],

  'natyazhnye-potolki-v-vannoy': [
    { id: 1, img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', title: 'Глянцевый белый в ванной', area: 7, room: 'Ванная', price: 3570, details: ['Глянцевое белое', 'IP44 споты: 6 шт', 'Влагостойкий', 'Углы: 4 шт'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Двухуровневый в ванной', area: 9, room: 'Ванная', price: 7650, details: ['2 уровня', 'IP44', 'LED-ниша', 'Глянец + матовый'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Матовый с подсветкой', area: 8, room: 'Ванная', price: 4320, details: ['Матовое белое', 'IP44 споты: 6 шт', 'LED-ниша', 'Влагостойкий'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Глянец серый ванная', area: 6, room: 'Ванная', price: 3060, details: ['Глянцевое серое', 'IP44 споты: 5 шт', 'Влагостойкий', 'Углы: 4 шт'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Ванная с теневым', area: 8, room: 'Ванная', price: 4480, details: ['Теневой профиль', 'IP44', 'Глянцевое', 'Бесщелевое'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Бесшовный в ванной', area: 10, room: 'Ванная', price: 5100, details: ['Без шва', 'Глянцевое белое', 'IP44 споты: 7 шт', 'Влагостойкий'] },
  ],

  'natyazhnye-potolki-v-detskoy': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', title: 'Тканевый в детской', area: 14, room: 'Детская', price: 10500, details: ['Clipso без ПВХ', 'Гипоаллергенный', 'Споты: 5 шт', 'Безопасно'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', title: 'Звёздное небо детская', area: 13, room: 'Детская', price: 19500, details: ['200 оптоволокон', 'Мерцание', 'Тканевое', 'Пульт'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Матовый белый детская', area: 12, room: 'Детская', price: 4320, details: ['Матовое белое', 'Без ПВХ Bauf A+', 'Споты: 5 шт', 'Безопасно'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'RGB подсветка детская', area: 14, room: 'Детская', price: 7420, details: ['LED RGB', 'Споты: 6 шт', 'Тканевое', 'Пульт управления'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Фотопечать облака', area: 14, room: 'Детская', price: 13720, details: ['Фотопечать облака', 'УФ-печать', 'Матовое', 'Споты: 5 шт'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Голубой тканевый', area: 12, room: 'Детская', price: 9000, details: ['Clipso голубой', 'Без ПВХ', 'Без шва', 'Споты: 5 шт'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Парящий в детской', area: 14, room: 'Детская', price: 7560, details: ['Парящая ниша', 'LED RGB', 'Тканевое', 'Безопасно'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Двухцветный детская', area: 13, room: 'Детская', price: 11700, details: ['2 цвета', 'Голубой + белый', 'LED-ниша', 'Tканевое'] },
  ],

  'natyazhnye-potolki-v-prihozhey': [
    { id: 1, img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80', title: 'Матовый в прихожей', area: 8, room: 'Прихожая', price: 2880, details: ['Матовое белое', 'Споты: 5 шт', 'Углы: 6 шт', 'Профиль: 11 м'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Глянцевый прихожая', area: 7, room: 'Прихожая', price: 3570, details: ['Глянцевое белое', 'Споты: 5 шт', 'Зеркальный эффект', 'Без шва'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Теневой в прихожей', area: 10, room: 'Прихожая', price: 5600, details: ['Теневой профиль', 'LED белая', 'Матовое', 'Бесщелевое'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Световые линии коридор', area: 9, room: 'Прихожая', price: 7110, details: ['FLEXY: 4 м', 'LED 4000К', 'Матовое', 'Без шва'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Парящий в коридоре', area: 10, room: 'Прихожая', price: 5400, details: ['Парящая ниша: 6 м', 'LED белая', 'Матовое', 'Профиль FLEXY'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Трековые в прихожей', area: 11, room: 'Прихожая', price: 6820, details: ['Трек: 2 м', 'LED 4000К', 'Матовое', 'Гибкое размещение'] },
  ],

  'natyazhnye-potolki-v-kvartire': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Вся квартира за 1 день', area: 65, room: 'Квартира', price: 23400, details: ['Все помещения', 'Матовое белое', 'Монтаж 1 день', 'Споты: 40 шт'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: '3-комнатная квартира', area: 80, room: 'Квартира', price: 28800, details: ['5 помещений', 'Матовое + парящий в зале', 'LED-ниши', 'Споты: 45 шт'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Студия с световыми линиями', area: 35, room: 'Студия', price: 18900, details: ['Световые линии', 'Зонирование', 'LED', 'Без шва'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Квартира-новостройка', area: 55, room: 'Квартира', price: 19800, details: ['4 помещения', 'Матовое белое', 'Споты везде', '1 рабочий день'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: '2-комнатная + парящий', area: 55, room: 'Квартира', price: 24750, details: ['Парящий в зале', 'Матовое в спальне/кухне', 'LED-ниши', 'Споты: 30 шт'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Однушка под ключ', area: 38, room: 'Квартира', price: 13680, details: ['3 помещения', 'Матовое белое', 'Споты: 20 шт', '1 рабочий день'] },
  ],

  'natyazhnye-potolki-v-chastnom-dome': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Весь дом под ключ', area: 120, room: 'Дом', price: 43200, details: ['8 помещений', 'Матовое белое', 'Споты везде', '2 рабочих дня'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Гостиная дом парящий', area: 40, room: 'Гостиная', price: 21600, details: ['Парящая ниша', 'LED RGB', 'Без шва', 'Споты: 14 шт'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Деревянный дом', area: 80, room: 'Дом', price: 28800, details: ['5 помещений', 'Монтаж без гвоздей', 'Матовое', 'Без запаха'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Мансарда', area: 30, room: 'Мансарда', price: 10800, details: ['Скошенные стены', 'Специальный монтаж', 'Матовое', 'Споты: 10 шт'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Кухня-гостиная в доме', area: 45, room: 'Кухня-гостиная', price: 20250, details: ['Световые линии', 'Зонирование', 'LED', 'Без шва'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Баня с потолком', area: 20, room: 'Баня', price: 7200, details: ['Влагостойкий ПВХ', 'IP44', 'Споты: 6 шт', 'Термостойкий монтаж'] },
  ],

  'natyazhnye-potolki-v-tualete': [
    { id: 1, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Белый глянец в туалете', area: 3, room: 'Туалет', price: 1530, details: ['Глянцевое белое', 'IP44 спот: 1 шт', 'Влагостойкий', 'Углы: 4 шт'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Матовый туалет', area: 4, room: 'Туалет', price: 1440, details: ['Матовое белое', 'IP44 спот: 1 шт', 'Влагостойкий', 'Углы: 4 шт'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', title: 'Серый в туалете', area: 3, room: 'Туалет', price: 1530, details: ['Матовое серое', 'IP44 спот: 1 шт', 'Влагостойкий', 'Современный'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Совмещённый санузел', area: 8, room: 'Санузел', price: 4080, details: ['Глянцевое белое', 'IP44 споты: 4 шт', 'Влагостойкий', 'Без шва'] },
  ],

  'natyazhnye-potolki-v-ofise': [
    { id: 1, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Офис open-space', area: 80, room: 'Офис', price: 28800, details: ['Матовое белое', 'Трековые: 6 шт', 'LED 5000К', 'Без шва'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Световые линии офис', area: 45, room: 'Офис', price: 35550, details: ['SLOTT: 18 м', 'LED 4000К', 'Матовое', 'Без шва'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Переговорная комната', area: 20, room: 'Офис', price: 7200, details: ['Матовое белое', 'Трек: 2 м', 'LED', 'Бесщелевой профиль'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Ресепшн с подсветкой', area: 25, room: 'Офис', price: 14750, details: ['Световые линии', 'LED RGB', 'Матовое', 'Представительский'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Кабинет руководителя', area: 30, room: 'Офис', price: 16200, details: ['Теневой профиль', 'LED 3000К', 'Матовое', 'Трековые споты'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Офис 2 этажа', area: 160, room: 'Офис', price: 57600, details: ['Матовое белое', 'Трековые системы', 'LED 5000К', 'Без шва'] },
  ],

  'natyazhnye-potolki-na-balkone': [
    { id: 1, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Балкон матовый', area: 4, room: 'Балкон', price: 1440, details: ['Матовое белое', 'Влагостойкий', 'Споты: 2 шт', 'Углы: 4 шт'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Застеклённый балкон', area: 6, room: 'Балкон', price: 2160, details: ['Матовое белое', 'Споты: 3 шт', 'Влагостойкий', 'Без шва'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Лоджия с подсветкой', area: 8, room: 'Лоджия', price: 3480, details: ['LED-лента', 'Матовое', 'Споты: 4 шт', 'IP44'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Большая лоджия', area: 12, room: 'Лоджия', price: 4320, details: ['Матовое белое', 'Споты: 6 шт', 'Влагостойкий', 'Утеплённая'] },
  ],

  'natyazhnye-potolki-na-dache': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Гостиная на даче', area: 25, room: 'Дача', price: 9000, details: ['Матовое белое', 'Споты: 8 шт', 'Влагостойкий', 'Быстрый монтаж'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Спальня на даче', area: 15, room: 'Дача', price: 5400, details: ['Матовое белое', 'Споты: 5 шт', 'Углы: 4 шт', 'Без запаха'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Кухня на даче', area: 12, room: 'Дача', price: 4320, details: ['Матовое белое', 'Споты: 6 шт', 'IP44', 'Влагостойкий'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Веранда с потолком', area: 20, room: 'Веранда', price: 7200, details: ['Влагостойкий ПВХ', 'IP44', 'Споты: 8 шт', 'Без шва'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Вся дача под ключ', area: 60, room: 'Дача', price: 21600, details: ['4 помещения', 'Матовое белое', 'Монтаж 1 день', 'Споты везде'] },
  ],

  // ─────────────────────────────────────────
  // ВИДЫ / ТЕХНОЛОГИИ
  // ─────────────────────────────────────────

  'paryashchie-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Парящий потолок в гостиной', area: 24, room: 'Гостиная', price: 12960, details: ['Парящая ниша: 10 м', 'LED-лента RGB', 'Матовое полотно', 'Углы: 4 шт'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Парящий в зале с периметром', area: 32, room: 'Зал', price: 17280, details: ['Парящая ниша: 14 м', 'LED-лента тёплая', 'Сатиновое полотно', 'Двойной периметр'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Парящий потолок в спальне', area: 18, room: 'Спальня', price: 9720, details: ['Парящая ниша: 8 м', 'LED тёплая 3000К', 'Матовое белое', 'Над изголовьем'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Парящий двухуровневый', area: 28, room: 'Гостиная', price: 22400, details: ['Парящая ниша: 12 м', '2 уровня', 'LED RGB', 'Матовое + глянцевое'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Парящий потолок в коридоре', area: 10, room: 'Прихожая', price: 5400, details: ['Парящая ниша: 6 м', 'LED белая', 'Матовое полотно', 'Профиль FLEXY'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Парящий в частном доме', area: 40, room: 'Дом', price: 21600, details: ['Парящая ниша: 16 м', 'LED лента 2 цвета', 'Сатиновое полотно', 'Без шва'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Парящий потолок в кухне', area: 15, room: 'Кухня', price: 8100, details: ['Парящая ниша: 6 м', 'LED тёплая', 'Матовое белое', 'Над островом'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Парящий в детской', area: 14, room: 'Детская', price: 7560, details: ['Парящая ниша: 6 м', 'LED RGB цветная', 'Тканевое полотно', 'Безопасно для детей'] },
  ],

  'natyazhnye-potolki-s-podsvetkoy': [
    { id: 1, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Точечные споты в гостиной', area: 22, room: 'Гостиная', price: 10560, details: ['Споты: 12 шт', 'LED 4000К', 'Матовое полотно', 'Углы: 6 шт'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'LED-подсветка + трек', area: 28, room: 'Зал', price: 15680, details: ['Трек: 6 м', 'LED-лента', 'Матовое белое', 'Диммер'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Подсветка в спальне', area: 18, room: 'Спальня', price: 8640, details: ['Споты: 8 шт', 'LED тёплая 2700К', 'Сатиновое полотно', 'Диммер'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'RGB подсветка детская', area: 14, room: 'Детская', price: 7420, details: ['LED RGB', 'Споты: 6 шт', 'Тканевое полотно', 'Пульт управления'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Трековые светильники офис', area: 45, room: 'Офис', price: 21600, details: ['Треки: 4 шт × 2 м', 'LED 5000К', 'Матовое белое', 'Без шва'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Полупрозрачный с подсветкой', area: 20, room: 'Гостиная', price: 11200, details: ['LED за полотном', 'Полупрозрачное полотно', 'Эффект свечения', 'Диммер'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Подсветка на кухне', area: 12, room: 'Кухня', price: 6360, details: ['Споты: 9 шт', 'LED 4000К', 'Матовое белое', 'IP44 влагостойкие'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Контурная подсветка в нише', area: 25, room: 'Гостиная', price: 16250, details: ['Ниша: 10 м', 'LED контурная', 'Глянцевое полотно', 'Двойная подсветка'] },
  ],

  'dvuhurovnevye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Двухуровневый в гостиной', area: 26, room: 'Гостиная', price: 22100, details: ['2 уровня', 'ГКЛ + натяжной', 'LED-ниша: 10 м', 'Споты: 12 шт'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Двухуровневый зонирование', area: 35, room: 'Зал', price: 29750, details: ['2 уровня', 'Зонирование', 'LED RGB: 14 м', 'Матовое + сатиновое'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Двухуровневый в спальне', area: 20, room: 'Спальня', price: 17000, details: ['2 уровня', 'Над кроватью ниша', 'LED тёплая', 'Матовое белое'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Двухуровневый чёрно-белый', area: 22, room: 'Гостиная', price: 18700, details: ['2 уровня', 'Матовый белый + чёрный', 'LED-ниша', 'Споты: 10 шт'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Двухуровневый с трековыми', area: 30, room: 'Зал', price: 25500, details: ['2 уровня', 'Трековые: 3 шт', 'LED-ниша: 12 м', 'Без шва'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Двухуровневый на кухне', area: 16, room: 'Кухня', price: 13600, details: ['2 уровня', 'Зонирование', 'LED 4000К', 'Споты: 8 шт'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Многоуровневый в зале', area: 40, room: 'Зал', price: 40000, details: ['3 уровня', 'LED RGB', 'Профиль FLEXY', 'Без шва'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Двухуровневый в ванной', area: 9, room: 'Ванная', price: 7650, details: ['2 уровня', 'LED-ниша', 'Глянец + матовый', 'IP44'] },
  ],

  'natyazhnye-potolki-s-fotopechatyu': [
    { id: 1, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Фотопечать облака в детской', area: 14, room: 'Детская', price: 13720, details: ['Фотопечать', 'Облака', 'УФ-печать', 'Матовое полотно'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', title: 'Фотопечать звёздное небо', area: 20, room: 'Гостиная', price: 19600, details: ['Фотопечать', 'Звёздное небо', 'HD-разрешение', 'Матовое полотно'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Фотопечать морской пейзаж', area: 22, room: 'Гостиная', price: 21560, details: ['Фотопечать', 'Морской закат', 'УФ-печать', 'Матовое полотно'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Фотопечать абстракция', area: 18, room: 'Спальня', price: 17640, details: ['Фотопечать', 'Абстрактный рисунок', 'УФ-печать', 'Матовое'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Фотопечать лес детская', area: 13, room: 'Детская', price: 12740, details: ['Фотопечать', 'Сказочный лес', 'УФ-печать', 'Тканевое'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Фотопечать в ресторане', area: 55, room: 'Ресторан', price: 53900, details: ['Фотопечать', 'Индивидуальный дизайн', 'УФ-печать', 'Без шва'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Фотопечать паттерн', area: 24, room: 'Гостиная', price: 23520, details: ['Фотопечать', 'Геометрический паттерн', 'УФ-печать', 'Матовое'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Фотопечать карта мира', area: 16, room: 'Кабинет', price: 15680, details: ['Фотопечать', 'Карта мира', 'УФ-печать', 'Матовое'] },
  ],

  'natyazhnye-potolki-zvezdnoe-nebo': [
    { id: 1, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', title: 'Звёздное небо в детской', area: 14, room: 'Детская', price: 21000, details: ['200 оптоволокон', 'Мерцание', 'Тканевое полотно', 'Пульт управления'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Звёздное небо в спальне', area: 18, room: 'Спальня', price: 27000, details: ['300 оптоволокон', 'Мерцание + цвет', 'Тканевое полотно', 'Диммер'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Звёздное небо в гостиной', area: 25, room: 'Гостиная', price: 37500, details: ['400 оптоволокон', 'RGB мерцание', 'Тканевое полотно', 'Пульт + приложение'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Звёздное небо в детской (синее)', area: 12, room: 'Детская', price: 18000, details: ['150 оптоволокон', 'Синее свечение', 'Тканевое', 'Безопасно для детей'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Звёздное небо в ресторане', area: 60, room: 'Ресторан', price: 90000, details: ['1000 оптоволокон', 'RGB + мерцание', 'Без шва', 'Профессиональный монтаж'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Звёздное небо + парящий', area: 20, room: 'Гостиная', price: 32000, details: ['300 оптоволокон', 'Парящая ниша', 'LED + оптоволокно', 'Пульт управления'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Звёздное небо в SPA', area: 30, room: 'SPA', price: 45000, details: ['500 оптоволокон', 'Мерцание волнами', 'Тканевое полотно', 'Влагостойкое'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Звёздное небо с кометами', area: 16, room: 'Спальня', price: 24000, details: ['250 оптоволокон', 'Эффект падающей звезды', 'Тканевое', 'Диммер'] },
  ],

  'natyazhnye-potolki-so-svetovymi-liniyami': [
    { id: 1, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Световые линии SLOTT в зале', area: 30, room: 'Зал', price: 23700, details: ['SLOTT: 10 м', 'LED 4000К', 'Матовое белое', 'Без шва'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Световые линии в офисе', area: 45, room: 'Офис', price: 35550, details: ['SLOTT: 18 м', 'LED 5000К', 'Матовое', 'Профессиональный монтаж'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Световые линии в гостиной', area: 25, room: 'Гостиная', price: 19750, details: ['FLEXY: 8 м', 'LED тёплая', 'Матовое белое', 'Диммер'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Световые линии + споты', area: 22, room: 'Гостиная', price: 18920, details: ['Световые линии: 8 м', 'Споты: 8 шт', 'Матовое', 'LED 4000К'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Световые линии ресторан', area: 70, room: 'Ресторан', price: 55300, details: ['SLOTT: 24 м', 'LED 3000К', 'Без шва', 'Диммер'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Световые линии в кухне', area: 14, room: 'Кухня', price: 11060, details: ['FLEXY: 5 м', 'LED 4000К', 'Матовое', 'Над рабочей зоной'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Световые линии геометрия', area: 28, room: 'Гостиная', price: 22120, details: ['SLOTT: 10 м', 'Геометрический рисунок', 'LED RGB', 'Матовое'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Световые линии в спальне', area: 18, room: 'Спальня', price: 14220, details: ['FLEXY: 6 м', 'LED тёплая 2700К', 'Сатиновое', 'Диммер'] },
  ],

  'tenevye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Теневой потолок в гостиной', area: 24, room: 'Гостиная', price: 13440, details: ['Теневой профиль', 'LED-ниша скрытая', 'Матовое белое', 'Бесщелевое примыкание'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Теневой в спальне', area: 18, room: 'Спальня', price: 10080, details: ['Теневой профиль', 'LED тёплая', 'Матовое', 'Бесщелевое'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Теневой + световые линии', area: 30, room: 'Зал', price: 21600, details: ['Теневой профиль', 'SLOTT: 10 м', 'Матовое белое', 'LED 4000К'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Теневой в офисе', area: 50, room: 'Офис', price: 28000, details: ['Теневой профиль', 'Трековые: 4 шт', 'Матовое', 'Профиль по периметру'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Теневой в прихожей', area: 10, room: 'Прихожая', price: 5600, details: ['Теневой профиль', 'LED белая', 'Матовое', 'Бесщелевое'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Теневой + парящий', area: 28, room: 'Гостиная', price: 19600, details: ['Теневой профиль', 'Парящая ниша', 'LED RGB', 'Матовое'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Теневой в кухне', area: 14, room: 'Кухня', price: 7840, details: ['Теневой профиль', 'LED 4000К', 'Матовое белое', 'Споты: 8 шт'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Теневой в ванной', area: 8, room: 'Ванная', price: 4480, details: ['Теневой профиль', 'LED IP44', 'Глянцевое', 'Бесщелевое'] },
  ],

  'konturnye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Контурный потолок в гостиной', area: 26, room: 'Гостиная', price: 16900, details: ['Контурная ниша', 'LED по периметру', 'Матовое белое', 'Двойной контур'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Контурный в спальне', area: 20, room: 'Спальня', price: 13000, details: ['Контурная ниша', 'LED тёплая', 'Сатиновое', 'Один контур'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Контурный RGB в зале', area: 35, room: 'Зал', price: 22750, details: ['Контурная ниша', 'LED RGB', 'Матовое', 'Двойной контур'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Контурный в детской', area: 14, room: 'Детская', price: 9100, details: ['Контурная ниша', 'LED RGB цветная', 'Тканевое', 'Безопасно'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Контурный в офисе', area: 40, room: 'Офис', price: 26000, details: ['Контурная ниша', 'LED 4000К', 'Матовое', 'Трековые светильники'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Контурный + споты', area: 22, room: 'Гостиная', price: 14300, details: ['Контурная ниша', 'Споты: 10 шт', 'LED тёплая', 'Матовое'] },
  ],

  'mnogourovenye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Трёхуровневый в гостиной', area: 32, room: 'Гостиная', price: 38400, details: ['3 уровня', 'LED RGB', 'Матовое + глянцевое', 'Споты: 16 шт'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Многоуровневый в зале', area: 45, room: 'Зал', price: 54000, details: ['4 уровня', 'LED RGB', 'Профиль FLEXY', 'Сложная геометрия'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Многоуровневый с парящим', area: 28, room: 'Гостиная', price: 33600, details: ['3 уровня', 'Парящий элемент', 'LED RGB', 'Матовое + сатиновое'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Многоуровневый в ресторане', area: 80, room: 'Ресторан', price: 96000, details: ['4 уровня', 'LED RGB', 'Без шва', 'Индивидуальный проект'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Многоуровневый в холле', area: 40, room: 'Холл', price: 48000, details: ['3 уровня', 'Световые линии', 'LED', 'Глянцевое + матовое'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Двухуровневый цветной', area: 25, room: 'Гостиная', price: 30000, details: ['2 уровня', 'Цветной нижний', 'LED RGB', 'Матовое + цветное'] },
  ],

  'krivolinejnye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Криволинейный волнообразный', area: 24, room: 'Гостиная', price: 22320, details: ['Спайка по кривой', 'LED-ниша', 'Матовое + сатиновое', 'Профиль FLEXY'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Криволинейный полукруг', area: 18, room: 'Холл', price: 16740, details: ['Полукруглая форма', 'Спайка', 'Матовое белое', 'LED по периметру'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Криволинейный эллипс', area: 30, room: 'Зал', price: 27900, details: ['Эллиптическая форма', 'LED-ниша', 'Глянцевое', 'Споты: 12 шт'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Криволинейный в ресторане', area: 60, room: 'Ресторан', price: 55800, details: ['Сложная геометрия', 'LED RGB', 'Без шва', 'Индивидуальный проект'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Криволинейный диагональ', area: 22, room: 'Гостиная', price: 20460, details: ['Диагональная спайка', 'LED', 'Матовое + глянцевое', 'Контрастные цвета'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Криволинейный каплевидный', area: 16, room: 'Спальня', price: 14880, details: ['Каплевидная форма', 'LED по контуру', 'Сатиновое', 'Профиль FLEXY'] },
  ],

  'natyazhnye-potolki-3d': [
    { id: 1, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: '3D небо в гостиной', area: 22, room: 'Гостиная', price: 21560, details: ['3D фотопечать', 'Облака и небо', 'УФ-печать', 'Матовое полотно'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', title: '3D космос в спальне', area: 18, room: 'Спальня', price: 17640, details: ['3D фотопечать', 'Космический пейзаж', 'LED-подсветка', 'Матовое полотно'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: '3D океан в ванной', area: 10, room: 'Ванная', price: 9800, details: ['3D фотопечать', 'Морская волна', 'УФ-печать', 'Водостойкое'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: '3D лес в детской', area: 14, room: 'Детская', price: 13720, details: ['3D фотопечать', 'Сказочный лес', 'УФ-печать', 'Тканевое'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: '3D абстракция в зале', area: 28, room: 'Зал', price: 27440, details: ['3D фотопечать', 'Абстрактный рисунок', 'LED RGB', 'Матовое'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: '3D горный пейзаж', area: 20, room: 'Гостиная', price: 19600, details: ['3D фотопечать', 'Горный закат', 'HD-разрешение', 'Матовое полотно'] },
  ],

  'besshchelevye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Бесщелевой в гостиной', area: 24, room: 'Гостиная', price: 11040, details: ['Бесщелевой профиль', 'Без видимых зазоров', 'Матовое белое', 'Споты: 10 шт'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Бесщелевой в спальне', area: 18, room: 'Спальня', price: 8280, details: ['Бесщелевой профиль', 'Матовое', 'LED-ниша', 'Диммер'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Бесщелевой в офисе', area: 40, room: 'Офис', price: 18400, details: ['Бесщелевой профиль', 'Трековые светильники', 'Матовое', 'Профессиональный'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Бесщелевой в прихожей', area: 9, room: 'Прихожая', price: 4140, details: ['Бесщелевой профиль', 'LED', 'Матовое', 'Чистый минимализм'] },
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

  // ─────────────────────────────────────────
  // ЦВЕТА
  // ─────────────────────────────────────────

  'belye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Белый матовый в гостиной', area: 22, room: 'Гостиная', price: 8360, details: ['Матовое белое', 'Споты: 8 шт', 'Углы: 4 шт', 'MSD'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Белый глянец в спальне', area: 16, room: 'Спальня', price: 6720, details: ['Глянцевое белое', 'Споты: 6 шт', 'Без шва', 'Bauf'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Белый сатиновый на кухне', area: 12, room: 'Кухня', price: 5040, details: ['Сатиновое белое', 'Споты: 9 шт', 'IP44', 'Углы: 4 шт'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Белый парящий в зале', area: 30, room: 'Зал', price: 16200, details: ['Парящая ниша: 12 м', 'LED тёплая', 'Матовое белое', 'Без шва'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Белый тканевый в детской', area: 13, room: 'Детская', price: 9750, details: ['Clipso без ПВХ', 'Гипоаллергенный', 'Споты: 5 шт', 'Белый'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Белый матовый в прихожей', area: 8, room: 'Прихожая', price: 2880, details: ['Матовое белое', 'Споты: 5 шт', 'Углы: 6 шт', 'Профиль: 11 м'] },
    { id: 7, img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', title: 'Белый глянец в ванной', area: 7, room: 'Ванная', price: 3570, details: ['Глянцевое белое', 'IP44 споты: 5 шт', 'Влагостойкий', 'Углы: 4 шт'] },
    { id: 8, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Белый двухуровневый', area: 26, room: 'Гостиная', price: 14040, details: ['2 уровня', 'LED-ниша', 'Матовое белое', 'Споты: 12 шт'] },
  ],

  'chernye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Чёрный матовый в гостиной', area: 24, room: 'Гостиная', price: 9600, details: ['Матовое чёрное', 'Споты: 10 шт', 'LED тёплая', 'MSD'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Чёрный глянец в спальне', area: 18, room: 'Спальня', price: 7920, details: ['Глянцевое чёрное', 'Споты: 7 шт', 'Без шва', 'Эффект неба'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Чёрно-белый двухуровневый', area: 22, room: 'Гостиная', price: 18700, details: ['2 уровня', 'Чёрный + белый', 'LED-ниша', 'Споты: 10 шт'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Чёрный с подсветкой в зале', area: 30, room: 'Зал', price: 15300, details: ['Матовое чёрное', 'LED RGB ниша', 'Споты: 12 шт', 'Без шва'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Чёрный матовый в кабинете', area: 20, room: 'Кабинет', price: 7800, details: ['Матовое чёрное', 'Трековые: 2 шт', 'LED 4000К', 'Без шва'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Чёрный звёздное небо', area: 18, room: 'Спальня', price: 27000, details: ['300 оптоволокон', 'Мерцание', 'Чёрное тканевое', 'Диммер'] },
  ],

  'serye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Серый матовый в гостиной', area: 24, room: 'Гостиная', price: 9120, details: ['Матовое серое', 'Споты: 10 шт', 'Углы: 4 шт', 'MSD'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Серый сатиновый в спальне', area: 18, room: 'Спальня', price: 7020, details: ['Сатиновое серое', 'Споты: 6 шт', 'Диммер', 'Углы: 4 шт'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Серый теневой', area: 26, room: 'Гостиная', price: 14560, details: ['Теневой профиль', 'Серое матовое', 'LED ниша', 'Споты: 10 шт'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Серый в офисе open-space', area: 50, room: 'Офис', price: 18000, details: ['Матовое серое', 'Трековые: 5 шт', 'LED 4000К', 'Без шва'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Серый двухуровневый', area: 22, room: 'Гостиная', price: 17600, details: ['2 уровня', 'Серый + белый', 'LED-ниша', 'Матовое'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Серый с точечным освещением', area: 14, room: 'Кухня', price: 5460, details: ['Матовое серое', 'Споты: 10 шт', 'IP44', 'Лофт-стиль'] },
  ],

  'bezhevye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Бежевый сатиновый в гостиной', area: 24, room: 'Гостиная', price: 9360, details: ['Сатиновое бежевое', 'Споты: 9 шт', 'Углы: 4 шт', 'Тёплый свет'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Бежевый матовый в спальне', area: 18, room: 'Спальня', price: 6660, details: ['Матовое бежевое', 'Споты: 6 шт', 'Диммер', 'Классика'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Бежевый с LED в зале', area: 28, room: 'Зал', price: 15120, details: ['Матовое бежевое', 'LED-ниша: 10 м', 'Споты: 12 шт', 'Тёплая'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Бежевый тканевый в спальне', area: 16, room: 'Спальня', price: 12000, details: ['Tканевое бежевое', 'Clipso', 'Без шва', 'Диммер'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Бежевый в классическом интерьере', area: 22, room: 'Гостиная', price: 8580, details: ['Сатиновое бежевое', 'Споты: 8 шт', 'Без шва', 'MSD'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Бежевый на кухне', area: 12, room: 'Кухня', price: 4680, details: ['Матовое бежевое', 'Споты: 9 шт', 'IP44', 'Углы: 4 шт'] },
  ],

  'cvetnye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', title: 'Голубой в детской', area: 13, room: 'Детская', price: 9100, details: ['Clipso голубой', 'Без ПВХ', 'Без шва', 'Споты: 5 шт'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'RGB подсветка в детской', area: 14, room: 'Детская', price: 7420, details: ['LED RGB', 'Споты: 6 шт', 'Тканевое', 'Пульт'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', title: 'Зелёный в детской', area: 12, room: 'Детская', price: 8400, details: ['Матовое зелёное', 'Споты: 5 шт', 'Без ПВХ', 'Тканевое'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Синий цветной зал', area: 25, room: 'Гостиная', price: 11250, details: ['Матовое синее', 'Споты: 10 шт', 'Акцентный', 'MSD'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Фиолетовый в баре', area: 30, room: 'Бар', price: 16200, details: ['Матовое фиолетовое', 'LED RGB', 'Без шва', 'Атмосферный'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Цветные панели', area: 20, room: 'Студия', price: 11000, details: ['Многоцветный', 'Криволинейный', 'LED', 'Дизайн-проект'] },
  ],

  'zolotye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600573472559-240e53e0e27a?w=800&q=80', title: 'Золотой глянец в гостиной', area: 28, room: 'Гостиная', price: 15120, details: ['Глянцевое золото', 'Споты: 12 шт', 'Хрустальная люстра', 'Классика'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Золотой в ресторане', area: 60, room: 'Ресторан', price: 34200, details: ['Глянцевое золото', 'Без шва', 'LED 3000К', 'Премиум'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Золотой двухуровневый', area: 26, room: 'Гостиная', price: 22100, details: ['2 уровня', 'Золото + белый', 'LED-ниша', 'Классический'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Золотой в холле', area: 20, room: 'Холл', price: 10800, details: ['Глянцевое золото', 'Споты: 8 шт', 'Люстра', 'Представительский'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Золотой сатиновый в спальне', area: 18, room: 'Спальня', price: 9720, details: ['Сатиновое золото', 'Споты: 7 шт', 'Диммер', 'Люкс'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Золотой металлик', area: 22, room: 'Гостиная', price: 12540, details: ['Металлик золото', 'Споты: 9 шт', 'LED 3000К', 'Pongs Premium'] },
  ],

  'golubye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', title: 'Голубой в детской', area: 14, room: 'Детская', price: 9100, details: ['Матовое голубое', 'Споты: 6 шт', 'Без ПВХ', 'Безопасный'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', title: 'Голубой тканевый', area: 12, room: 'Детская', price: 9000, details: ['Clipso голубой', 'Без ПВХ', 'Без шва', 'Споты: 5 шт'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', title: 'Голубой в ванной', area: 7, room: 'Ванная', price: 3570, details: ['Матовое голубое', 'IP44 споты: 4 шт', 'Влагостойкий', 'Морской'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Голубой с подсветкой', area: 18, room: 'Спальня', price: 8640, details: ['LED тёплая', 'Матовое голубое', 'Диммер', 'Споты: 7 шт'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80', title: 'Небесно-голубой в студии', area: 28, room: 'Студия', price: 13440, details: ['Матовое голубое', 'Световые линии', 'LED', 'Без шва'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', title: 'Голубой двухцветный', area: 16, room: 'Детская', price: 9600, details: ['Голубой + белый', 'LED-ниша', 'Тканевое', 'Диммер'] },
  ],

  'korichnevye-natyazhnye-potolki': [
    { id: 1, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', title: 'Коричневый матовый в гостиной', area: 24, room: 'Гостиная', price: 9120, details: ['Матовое коричневое', 'Споты: 9 шт', 'Углы: 4 шт', 'Тёплый интерьер'] },
    { id: 2, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Коричневый под дерево', area: 18, room: 'Гостиная', price: 8280, details: ['Фактурное под дерево', 'Споты: 7 шт', 'Тёплый свет', 'Эко-стиль'] },
    { id: 3, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', title: 'Коричневый в кабинете', area: 20, room: 'Кабинет', price: 7800, details: ['Матовое коричневое', 'Трековые: 2 шт', 'LED 3000К', 'Строгий стиль'] },
    { id: 4, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', title: 'Коричневый в ресторане', area: 55, room: 'Ресторан', price: 24750, details: ['Матовое тёмное', 'Без шва', 'LED тёплая', 'Атмосферный'] },
    { id: 5, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', title: 'Коричневый в частном доме', area: 30, room: 'Дом', price: 13500, details: ['Матовое коричневое', 'Споты: 10 шт', 'Тёплая LED', 'Без шва'] },
    { id: 6, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80', title: 'Двухцветный коричневый + белый', area: 26, room: 'Гостиная', price: 15600, details: ['2 уровня', 'Коричневый + белый', 'LED-ниша', 'Тёплый свет'] },
  ],

}
