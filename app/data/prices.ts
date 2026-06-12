/**
 * Прайс-лист ПроПотолок
 * Когда появится API/админка → заменить на $fetch('/api/prices')
 */

export interface PriceItem {
  id: number
  catalogKey?: string      // ключ для связи с каталожными страницами
  name: string
  description: string
  priceFrom: number       // цена от, ₽/м²
  priceTo: number | null  // цена до (null = фиксированная)
  unit: string            // 'м²', 'шт', 'м.п.' и т.д.
  badge: string | null
  popular: boolean
}

export interface ExtraWork {
  id: number
  name: string
  description: string
  price: number
  unit: string
  icon: string
}

export interface Package {
  id: string
  name: string
  subtitle: string
  priceFrom: number
  color: string
  features: string[]
  notIncluded: string[]
  badge: string | null
  popular: boolean
}

// ─── Фактуры ───
export const priceFaktury: PriceItem[] = [
  { id: 1,  catalogKey: 'matovye',         name: 'Матовый',        description: 'Классический белый ПВХ. Равномерное рассеивание света, скрывает неровности.',    priceFrom: 159, priceTo: 220,  unit: 'м²', badge: 'Хит',    popular: true  },
  { id: 2,  catalogKey: 'glyancevye',      name: 'Глянцевый',      description: 'Зеркальный эффект, визуально увеличивает пространство. Популярен в гостиных.',   priceFrom: 209, priceTo: 290,  unit: 'м²', badge: null,     popular: false },
  { id: 3,  catalogKey: 'satinovye',       name: 'Сатиновый',      description: 'Мягкий шёлковый блеск. Универсален для любых помещений.',                       priceFrom: 189, priceTo: 260,  unit: 'м²', badge: null,     popular: true  },
  { id: 4,  catalogKey: 'tkanevye',        name: 'Тканевый',       description: 'Немецкое полотно без ПВХ. Гипоаллергенен, для детских и спален.',               priceFrom: 319, priceTo: 420,  unit: 'м²', badge: 'Эко',    popular: false },
  { id: 5,  catalogKey: 'fakturnye',       name: 'Фактурный',      description: 'Структурированная поверхность. Скрывает мелкие дефекты.',                       priceFrom: 259, priceTo: 350,  unit: 'м²', badge: null,     popular: false },
  { id: 6,  catalogKey: 'besshovnye',      name: 'Бесшовный',      description: 'Без видимых швов на больших площадях. До 5 м шириной.',                         priceFrom: 229, priceTo: 310,  unit: 'м²', badge: null,     popular: false },
  { id: 7,  catalogKey: 'gipoallergennye', name: 'Гипоаллергенный',description: 'Сертифицированный материал без вредных веществ. Для чувствительных.',           priceFrom: 279, priceTo: 370,  unit: 'м²', badge: null,     popular: false },
  { id: 8,  catalogKey: 'negoryuchie',     name: 'Негорючий',      description: 'Класс пожарной безопасности Г1. Для коридоров и коммерческих помещений.',       priceFrom: 299, priceTo: 400,  unit: 'м²', badge: null,     popular: false },
]

// ─── Виды/Технологии ───
export const priceVidy: PriceItem[] = [
  { id: 1,  catalogKey: 'base',            name: 'Обычный одноуровневый', description: 'Стандартный натяжной потолок на одном уровне.',                           priceFrom: 159, priceTo: null, unit: 'м²', badge: null,     popular: false },
  { id: 2,  catalogKey: 'paryashchie',     name: 'Парящий потолок',       description: 'Световая ниша по периметру с LED-подсветкой. Эффект левитации.',          priceFrom: 350, priceTo: 550,  unit: 'м²', badge: 'Тренд',  popular: true  },
  { id: 3,  catalogKey: 'podsvetka',       name: 'С подсветкой',          description: 'Встроенная LED-лента, точечные или линейные светильники.',                 priceFrom: 320, priceTo: 480,  unit: 'м²', badge: null,     popular: true  },
  { id: 4,  catalogKey: 'dvuhuroven',      name: 'Двухуровневый',         description: 'Два полотна на разных уровнях. Зонирование пространства.',                priceFrom: 450, priceTo: 700,  unit: 'м²', badge: null,     popular: false },
  { id: 5,  catalogKey: 'linii',           name: 'Световые линии',        description: 'LED-профили встроены в полотно. Архитектурный эффект.',                   priceFrom: 380, priceTo: 580,  unit: 'м²', badge: null,     popular: false },
  { id: 6,  catalogKey: 'fotopechat',      name: 'Фотопечать',            description: 'Печать любого изображения на полотне. Уникальный дизайн.',                priceFrom: 550, priceTo: 900,  unit: 'м²', badge: null,     popular: false },
  { id: 7,  catalogKey: 'zvezdnoe',        name: 'Звёздное небо',         description: 'Оптоволоконная подсветка имитирует ночное небо.',                         priceFrom: 650, priceTo: null, unit: 'м²', badge: null,     popular: false },
  { id: 8,  catalogKey: 'tenevye',         name: 'Теневой профиль',       description: 'Щель между потолком и стеной. Минималистичный дизайн.',                   priceFrom: 300, priceTo: 450,  unit: 'м²', badge: null,     popular: false },
  { id: 9,  catalogKey: 'konturnye',       name: 'Контурный потолок',     description: 'Световые контуры и геометрические формы из LED-профиля.',                 priceFrom: 420, priceTo: 600,  unit: 'м²', badge: null,     popular: false },
  { id: 10, catalogKey: 'krivolinejnye',   name: 'Криволинейный',         description: 'Волнообразные и изогнутые формы. Сложные архитектурные решения.',         priceFrom: 540, priceTo: 800,  unit: 'м²', badge: null,     popular: false },
  { id: 11, catalogKey: 'mnogourovenye',   name: 'Многоуровневый',        description: 'Три и более уровней. Максимально сложная конструкция.',                   priceFrom: 600, priceTo: 950,  unit: 'м²', badge: null,     popular: false },
]

// ─── Доп. работы ───
export const extraWorks: ExtraWork[] = [
  { id: 1, name: 'Обработка угла',    description: 'Стык полотна со стеной в углу',        price: 150, unit: 'шт',   icon: 'lucide:corner-up-right' },
  { id: 2, name: 'Светильник (спот)', description: 'Установка точечного светильника',       price: 300, unit: 'шт',   icon: 'lucide:lightbulb' },
  { id: 3, name: 'Обвод трубы',       description: 'Обход трубы или колонны',               price: 250, unit: 'шт',   icon: 'lucide:circle-dashed' },
  { id: 4, name: 'Парящая ниша',      description: 'Монтаж профиля парящей ниши с LED',     price: 350, unit: 'м.п.', icon: 'lucide:lamp-ceiling' },
  { id: 5, name: 'Световая линия',    description: 'Монтаж LED-профиля SLOTT в полотно',    price: 420, unit: 'м.п.', icon: 'lucide:minus' },
  { id: 6, name: 'Демонтаж потолка',  description: 'Снятие старого натяжного полотна',      price: 80,  unit: 'м²',   icon: 'lucide:trash-2' },
  { id: 7, name: 'Пристенный профиль',description: 'Декоративный багет по периметру',       price: 120, unit: 'м.п.', icon: 'lucide:frame' },
  { id: 8, name: 'Люстра',            description: 'Установка люстры с платформой',         price: 600, unit: 'шт',   icon: 'lucide:sparkles' },
]

// ─── Пакеты ───
export const packages: Package[] = [
  {
    id: 'base',
    name: 'Базовый',
    subtitle: 'Простой монтаж в одной комнате',
    priceFrom: 159,
    color: '#6b7280',
    badge: null,
    popular: false,
    features: [
      'Матовое или сатиновое полотно',
      'Монтаж за 1 день',
      'Бесплатный замер',
      'Гарантия 12 лет',
      'Уборка после монтажа',
    ],
    notIncluded: [
      'Цветные полотна',
      'Дизайнерские виды',
      'Доп. подсветка',
    ],
  },
  {
    id: 'comfort',
    name: 'Комфорт',
    subtitle: 'Оптимальное решение для квартиры',
    priceFrom: 189,
    color: '#f5c800',
    badge: 'Популярный',
    popular: true,
    features: [
      'Любая фактура на выбор',
      'Монтаж за 1 день',
      'Бесплатный замер с образцами',
      'Гарантия 12 лет',
      'Установка до 8 светильников',
      'Обработка углов включена',
      'Уборка после монтажа',
    ],
    notIncluded: [
      'Парящие ниши',
      'Многоуровневые конструкции',
    ],
  },
  {
    id: 'premium',
    name: 'Премиум',
    subtitle: 'Дизайнерские решения без ограничений',
    priceFrom: 350,
    color: '#a78bfa',
    badge: 'Максимум',
    popular: false,
    features: [
      'Все фактуры и цвета',
      'Любой вид и технология',
      'Парящие ниши, подсветка',
      'Многоуровневые конструкции',
      'Безлимитные светильники',
      'Дизайн-консультация',
      'Приоритетный выезд мастера',
      'Гарантия 12 лет',
    ],
    notIncluded: [],
  },
]

// ─── Скидки по объёму ───
export const volumeDiscounts = [
  { range: 'от 10 до 30 м²',  discount: 7,  example: 'Комната 4×4 м — экономия ~1 100 ₽' },
  { range: 'от 30 до 50 м²',  discount: 10, example: '2–3 комнаты — экономия ~4 700 ₽' },
  { range: 'от 50 до 70 м²',  discount: 15, example: 'Вся квартира — экономия ~9 500 ₽' },
  { range: 'свыше 70 м²',     discount: 20, example: 'Большой заказ — экономия от 14 000 ₽' },
]
