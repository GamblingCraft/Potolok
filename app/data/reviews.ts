/**
 * Отзывы клиентов
 * Когда появится API → заменить на:
 *   Яндекс.Карты: GET https://api-maps.yandex.ru/...
 *   2ГИС:         GET https://public-api.2gis.com/...
 *   Авито:        парсинг / виджет
 */

export type Platform = 'yandex' | '2gis' | 'avito' | 'own'

export interface Review {
  id: number
  platform: Platform
  author: string
  avatar: string | null   // URL аватара или null (инициалы)
  rating: number          // 1–5
  date: string
  text: string
  photos?: string[]       // фото в отзыве
  reply?: string          // ответ компании
  verified: boolean
  roomType?: string       // тип помещения (если указал)
}

export interface VideoReview {
  id: number
  author: string
  avatar: string | null
  preview: string         // превью-картинка
  videoUrl: string        // ссылка на видео (YouTube/VK/Rutube)
  duration: string        // «1:23»
  roomType: string
  date: string
  caption: string
}

export const reviews: Review[] = [
  {
    id: 1,
    platform: 'yandex',
    author: 'Елена Смирнова',
    avatar: null,
    rating: 5,
    date: '2024-11-20',
    text: 'Заказывали потолки сразу в три комнаты — гостиная, спальня и кухня. Мастера приехали вовремя, работали аккуратно, всё убрали за собой. Особенно понравилось, что привезли образцы полотен прямо на замер — выбрали сатиновый бежевый, смотрится великолепно! Рекомендую без раздумий.',
    verified: true,
    roomType: 'Гостиная + спальня + кухня',
  },
  {
    id: 2,
    platform: 'yandex',
    author: 'Дмитрий Козлов',
    avatar: null,
    rating: 5,
    date: '2024-11-08',
    text: 'Делали парящий потолок в зале. Честно говоря, сначала сомневался — смотрел много компаний, но у ПроПотолка лучшая цена за такое качество. Монтаж занял 4 часа, всё чисто, без запаха. Подсветка работает отлично. Жена в восторге!',
    verified: true,
    roomType: 'Гостиная',
  },
  {
    id: 3,
    platform: '2gis',
    author: 'Марина Петрова',
    avatar: null,
    rating: 5,
    date: '2024-10-30',
    text: 'Спасибо огромное! Сделали потолок в детской — тканевый, гипоаллергенный. Ребёнок аллергик, поэтому долго искали подходящую компанию. Здесь всё объяснили, показали сертификаты на материал. Качество отличное, ребёнок доволен — сделали звёздное небо по его просьбе.',
    verified: true,
    roomType: 'Детская',
  },
  {
    id: 4,
    platform: '2gis',
    author: 'Алексей Волков',
    avatar: null,
    rating: 4,
    date: '2024-10-15',
    text: 'В целом остался доволен. Потолок сделали качественно, матовый белый, смотрится хорошо. Небольшая задержка с выездом замерщика на день, но предупредили заранее. Цена вышла чуть выше, чем ожидал из-за углов, но всё честно прописали в договоре.',
    reply: 'Алексей, спасибо за отзыв! Приносим извинения за задержку замерщика. Рады, что результат вас устроил!',
    verified: true,
    roomType: 'Спальня',
  },
  {
    id: 5,
    platform: 'avito',
    author: 'Ольга Новикова',
    avatar: null,
    rating: 5,
    date: '2024-10-05',
    text: 'Нашла через Авито, долго выбирала — позвонила в несколько компаний. ПроПотолок перезвонили быстрее всех и замерщик приехал в тот же день! Сделали глянцевый потолок в ванной — смотрится шикарно, визуально увеличивает пространство. Однозначно советую!',
    verified: true,
    roomType: 'Ванная',
  },
  {
    id: 6,
    platform: 'avito',
    author: 'Сергей Иванов',
    avatar: null,
    rating: 5,
    date: '2024-09-22',
    text: 'Заказал демонтаж старого потолка и установку нового. Работали двое мастеров, справились за полдня. Цена адекватная, без накруток. Особо отмечу чистоту работы — всё плёнкой накрыли, мусор вывезли. Буду обращаться ещё когда будем делать ремонт в других комнатах.',
    verified: true,
    roomType: 'Кухня',
  },
  {
    id: 7,
    platform: 'yandex',
    author: 'Наталья Фёдорова',
    avatar: null,
    rating: 5,
    date: '2024-09-10',
    text: 'Делали двухуровневый потолок с подсветкой в гостиной — мечтала об этом давно! Результат превзошёл ожидания. Мастера посоветовали хорошее расположение LED-ленты, я бы сама не додумалась. Гарантия 12 лет — это очень важно. Спасибо!',
    verified: true,
    roomType: 'Гостиная',
  },
  {
    id: 8,
    platform: '2gis',
    author: 'Виктор Соколов',
    avatar: null,
    rating: 5,
    date: '2024-08-28',
    text: 'Устанавливали потолки в офисе — 65 квадратов. Работали без выходных, уложились в 2 дня, не мешали работе сотрудников. Световые линии SLOTT выглядят очень стильно. Руководство в восторге, несколько партнёров уже спросили контакты.',
    verified: true,
    roomType: 'Офис',
  },
]

export const videoReviews: VideoReview[] = [
  {
    id: 1,
    author: 'Семья Крыловых',
    avatar: null,
    preview: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
    videoUrl: '#',
    duration: '1:42',
    roomType: 'Гостиная',
    date: '2024-11-15',
    caption: 'Парящий потолок — до и после',
  },
  {
    id: 2,
    author: 'Анна К.',
    avatar: null,
    preview: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80',
    videoUrl: '#',
    duration: '0:58',
    roomType: 'Спальня',
    date: '2024-10-20',
    caption: 'Сатиновый потолок в спальне',
  },
  {
    id: 3,
    author: 'Михаил Д.',
    avatar: null,
    preview: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&q=80',
    videoUrl: '#',
    duration: '2:15',
    roomType: 'Квартира',
    date: '2024-09-30',
    caption: 'Вся квартира за 1 день',
  },
  {
    id: 4,
    author: 'Ирина С.',
    avatar: null,
    preview: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    videoUrl: '#',
    duration: '1:10',
    roomType: 'Кухня',
    date: '2024-09-12',
    caption: 'Глянец + световые линии на кухне',
  },
  {
    id: 5,
    author: 'Павел В.',
    avatar: null,
    preview: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80',
    videoUrl: '#',
    duration: '1:33',
    roomType: 'Детская',
    date: '2024-08-25',
    caption: 'Звёздное небо для дочки',
  },
]

// Статистика по платформам
export const platformStats = {
  yandex: { name: 'Яндекс Карты', rating: 4.9, count: 87,  icon: 'simple-icons:yandex',  color: '#fc3f1d' },
  '2gis':  { name: '2ГИС',        rating: 4.8, count: 64,  icon: 'simple-icons:2gis',    color: '#00b956' },
  avito:   { name: 'Авито',       rating: 4.9, count: 43,  icon: 'simple-icons:avito',   color: '#00aaff' },
}
