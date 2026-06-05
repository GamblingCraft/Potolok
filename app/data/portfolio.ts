/**
 * Портфолио / Наши работы
 * Когда появится API/админка → заменить на $fetch('/api/portfolio')
 */

export interface PortfolioItem {
  id: number
  slug: string
  title: string
  roomType: string         // тип помещения
  area: number             // площадь, м²
  photos: string[]         // массив URL фото
  texture: string          // фактура полотна
  view: string             // вид (парящий, обычный и т.д.)
  color: string            // цвет
  extras: string[]         // доп. работы
  price: number            // итоговая цена, ₽
  pricePerM2: number       // цена за м²
  description: string      // краткое описание
  tags: string[]           // теги для фильтра
  date: string             // дата монтажа
}

export const portfolio: PortfolioItem[] = [
  {
    id: 1,
    slug: 'gostinaya-jk-baikal-siti',
    title: 'Гостиная в ЖК «Байкал Сити»',
    roomType: 'Гостиная',
    area: 24,
    photos: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    ],
    texture: 'Матовый',
    view: 'Парящий потолок',
    color: 'Белый',
    extras: ['Парящая ниша 8 м.п.', 'Точечные споты 12 шт', 'Обработка углов 6 шт'],
    price: 18400,
    pricePerM2: 159,
    description: 'Парящий матовый потолок с LED-подсветкой по периметру. Создаёт эффект невесомости и визуально увеличивает высоту помещения.',
    tags: ['гостиная', 'парящий', 'матовый', 'подсветка'],
    date: '2024-11-15',
  },
  {
    id: 2,
    slug: 'spalnya-chastnyj-dom-angara',
    title: 'Спальня в частном доме «Ангара»',
    roomType: 'Спальня',
    area: 18,
    photos: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
    ],
    texture: 'Сатиновый',
    view: 'Обычный',
    color: 'Бежевый',
    extras: ['Точечные споты 8 шт', 'Обработка углов 4 шт'],
    price: 6840,
    pricePerM2: 189,
    description: 'Сатиновый потолок в тёплом бежевом оттенке. Мягкий блеск полотна гармонирует со скандинавским интерьером спальни.',
    tags: ['спальня', 'сатиновый', 'бежевый'],
    date: '2024-10-28',
  },
  {
    id: 3,
    slug: 'kuhnya-kvartira-studiya',
    title: 'Кухня-гостиная в квартире-студии',
    roomType: 'Кухня',
    area: 32,
    photos: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80',
    ],
    texture: 'Глянцевый',
    view: 'С подсветкой',
    color: 'Белый',
    extras: ['Световые линии 6 м', 'Точечные споты 10 шт', 'Обработка углов 4 шт'],
    price: 14880,
    pricePerM2: 209,
    description: 'Глянцевый белый потолок со световыми линиями зонирует пространство кухни и гостиной, визуально увеличивая площадь.',
    tags: ['кухня', 'глянцевый', 'световые линии', 'подсветка'],
    date: '2024-10-10',
  },
  {
    id: 4,
    slug: 'detskaya-jk-raduga',
    title: 'Детская комната в ЖК «Радуга»',
    roomType: 'Детская',
    area: 14,
    photos: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    ],
    texture: 'Тканевый',
    view: 'Звёздное небо',
    color: 'Голубой',
    extras: ['Звёздное небо 200 точек', 'Обработка углов 4 шт'],
    price: 12600,
    pricePerM2: 319,
    description: 'Тканевый потолок «Звёздное небо» с оптоволоконной подсветкой. Гипоаллергенный материал, безопасный для детей.',
    tags: ['детская', 'тканевый', 'звёздное небо', 'голубой'],
    date: '2024-09-20',
  },
  {
    id: 5,
    slug: 'vannaya-dvuhurovnevyj',
    title: 'Ванная с двухуровневым потолком',
    roomType: 'Ванная',
    area: 8,
    photos: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    ],
    texture: 'Глянцевый',
    view: 'Двухуровневый',
    color: 'Серый',
    extras: ['Двухуровневая конструкция', 'Точечные споты 6 шт', 'Обход трубы 2 шт'],
    price: 8720,
    pricePerM2: 209,
    description: 'Двухуровневый глянцевый потолок в серых тонах. Нижний уровень с подсветкой создаёт зонирование в ванной комнате.',
    tags: ['ванная', 'глянцевый', 'двухуровневый', 'серый'],
    date: '2024-09-05',
  },
  {
    id: 6,
    slug: 'ofis-panoramnyj-vid',
    title: 'Офис с панорамными окнами',
    roomType: 'Офис',
    area: 65,
    photos: [
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472559-240e53e0e27a?w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    ],
    texture: 'Матовый',
    view: 'Световые линии',
    color: 'Белый',
    extras: ['Световые линии SLOTT 18 м', 'Обработка углов 8 шт', 'Точечные споты 24 шт'],
    price: 38350,
    pricePerM2: 159,
    description: 'Корпоративный интерьер с матовым потолком и архитектурной подсветкой световыми линиями SLOTT. Монтаж за 2 дня без остановки работы офиса.',
    tags: ['офис', 'матовый', 'световые линии', 'коммерческий'],
    date: '2024-08-18',
  },
]

// Все теги для фильтрации
export const portfolioTags = [
  { id: 'all',        label: 'Все работы' },
  { id: 'гостиная',   label: 'Гостиная' },
  { id: 'спальня',    label: 'Спальня' },
  { id: 'кухня',      label: 'Кухня' },
  { id: 'детская',    label: 'Детская' },
  { id: 'ванная',     label: 'Ванная' },
  { id: 'офис',       label: 'Офис' },
  { id: 'парящий',    label: 'Парящий' },
  { id: 'подсветка',  label: 'С подсветкой' },
]
