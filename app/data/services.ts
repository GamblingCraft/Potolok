/**
 * Услуги компании ПроПотолок
 * Когда появится API/админка → заменить на $fetch('/api/services')
 */

export interface Service {
  id: number
  slug: string
  title: string
  shortTitle: string
  description: string
  price: string            // «от 159 ₽/м²», «Бесплатно», «от 500 ₽» и т.д.
  priceNote: string | null
  duration: string         // «1–4 часа», «1 день» и т.д.
  icon: string
  img: string
  badge: string | null
  features: string[]       // что включено
  category: string         // для фильтрации
}

export interface ServiceCategory {
  id: string
  label: string
  icon: string
}

export const serviceCategories: ServiceCategory[] = [
  { id: 'all',        label: 'Все услуги',    icon: 'lucide:layout-grid' },
  { id: 'montazh',    label: 'Монтаж',        icon: 'lucide:hammer' },
  { id: 'remont',     label: 'Ремонт',        icon: 'lucide:wrench' },
  { id: 'dopolnit',   label: 'Дополнительные', icon: 'lucide:plus-circle' },
]

export const services: Service[] = [
  {
    id: 1,
    slug: 'montazh-natyazhnyh-potolkov',
    title: 'Монтаж натяжных потолков',
    shortTitle: 'Монтаж',
    description: 'Профессиональный монтаж натяжного потолка любой сложности. Работаем с матовыми, глянцевыми, сатиновыми и тканевыми полотнами. Монтаж за 1 день без предоплаты.',
    price: 'Включён в стоимость',
    priceNote: 'При заказе полотна',
    duration: '2–8 часов',
    icon: 'lucide:hammer',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75',
    badge: 'Хит',
    features: [
      'Монтаж любой сложности',
      'Чистая работа без пыли',
      'Уборка после монтажа',
      'Гарантия 12 лет',
      'Работаем в выходные',
    ],
    category: 'montazh',
  },
  {
    id: 2,
    slug: 'vyezd-zamershchika',
    title: 'Бесплатный замер на дому',
    shortTitle: 'Замер',
    description: 'Замерщик приедет в удобное время, произведёт точные замеры, покажет образцы полотен всех фактур и рассчитает итоговую стоимость прямо на месте.',
    price: 'Бесплатно',
    priceNote: null,
    duration: '30–60 минут',
    icon: 'lucide:ruler',
    img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=75',
    badge: 'Бесплатно',
    features: [
      'Выезд в день обращения',
      'Образцы всех фактур с собой',
      'Расчёт стоимости на месте',
      'Любой район Иркутска',
      'Без обязательств',
    ],
    category: 'dopolnit',
  },
  {
    id: 3,
    slug: 'srochnyj-montazh-24-chasa',
    title: 'Срочный монтаж за 24 часа',
    shortTitle: 'Срочный монтаж',
    description: 'Нужно срочно? Выполним монтаж натяжного потолка в течение суток после обращения. Работаем в выходные и праздничные дни.',
    price: '+15% к стоимости',
    priceNote: 'Доплата за срочность',
    duration: 'в течение 24 ч',
    icon: 'lucide:zap',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=75',
    badge: 'Срочно',
    features: [
      'Монтаж в течение 24 часов',
      'Работаем в выходные',
      'Выезд в день обращения',
      'Все фактуры в наличии',
    ],
    category: 'montazh',
  },
  {
    id: 4,
    slug: 'sliv-vody-s-natyazhnogo-potolka',
    title: 'Слив воды с натяжного потолка',
    shortTitle: 'Слив воды',
    description: 'Залили соседи сверху? Аккуратно сольём воду с натяжного потолка без повреждения полотна. Выезд в день обращения. Потолок восстановит форму полностью.',
    price: 'от 1 500 ₽',
    priceNote: 'Зависит от объёма воды',
    duration: '1–3 часа',
    icon: 'lucide:droplets',
    img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=75',
    badge: null,
    features: [
      'Выезд в день обращения',
      'Полотно сохраняется целым',
      'Без демонтажа конструкции',
      'Осмотр и оценка ущерба',
    ],
    category: 'remont',
  },
  {
    id: 5,
    slug: 'demontazh-natyazhnogo-potolka',
    title: 'Демонтаж натяжного потолка',
    shortTitle: 'Демонтаж',
    description: 'Аккуратный демонтаж натяжного потолка любого производителя. Снимем старое полотно, уберём багет и подготовим основание под новый потолок.',
    price: 'от 80 ₽/м²',
    priceNote: 'Минимальный заказ 1 500 ₽',
    duration: '1–4 часа',
    icon: 'lucide:trash-2',
    img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=75',
    badge: null,
    features: [
      'Любой производитель',
      'Аккуратное снятие полотна',
      'Демонтаж багета',
      'Вывоз мусора',
    ],
    category: 'remont',
  },
  {
    id: 6,
    slug: 'remont-natyazhnogo-potolka',
    title: 'Ремонт натяжного потолка',
    shortTitle: 'Ремонт',
    description: 'Устраним провисание, порывы, щели и другие дефекты натяжного потолка. Бесплатная диагностика при выезде.',
    price: 'от 500 ₽',
    priceNote: 'Зависит от вида повреждения',
    duration: '1–3 часа',
    icon: 'lucide:wrench',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=75',
    badge: null,
    features: [
      'Бесплатная диагностика',
      'Устранение провисаний',
      'Заделка порывов',
      'Любой производитель',
    ],
    category: 'remont',
  },
  {
    id: 7,
    slug: 'zamena-polotna',
    title: 'Замена натяжного полотна',
    shortTitle: 'Замена полотна',
    description: 'Заменим старое или повреждённое полотно на новое. Багет и конструкция остаются — платите только за новое полотно и работу.',
    price: 'от 159 ₽/м²',
    priceNote: 'Стоимость нового полотна + работа',
    duration: '2–5 часов',
    icon: 'lucide:refresh-cw',
    img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=75',
    badge: null,
    features: [
      'Багет сохраняется',
      'Все фактуры и цвета',
      'Быстрый монтаж',
      'Гарантия 12 лет на полотно',
    ],
    category: 'remont',
  },
  {
    id: 8,
    slug: 'peretyazhka-potolka',
    title: 'Перетяжка натяжного потолка',
    shortTitle: 'Перетяжка',
    description: 'Полная замена полотна с демонтажом старого, заменой багета при необходимости и монтажом нового. Идеально при смене дизайна интерьера.',
    price: 'от 200 ₽/м²',
    priceNote: 'Демонтаж + новое полотно + монтаж',
    duration: '1 день',
    icon: 'lucide:layers',
    img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=75',
    badge: null,
    features: [
      'Демонтаж старого полотна',
      'Замена или сохранение багета',
      'Новое полотно на выбор',
      'Вывоз старых материалов',
    ],
    category: 'remont',
  },
  {
    id: 9,
    slug: 'ustanovka-svetilnikov',
    title: 'Установка светильников',
    shortTitle: 'Светильники',
    description: 'Установим точечные споты, люстры, LED-ленты и световые линии в натяжном потолке. Подключение к электрике, термокольца, финишная отделка.',
    price: 'от 300 ₽/шт',
    priceNote: 'Без стоимости светильников',
    duration: 'от 1 часа',
    icon: 'lucide:lightbulb',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75',
    badge: null,
    features: [
      'Точечные споты',
      'Люстры и подвесы',
      'LED-ленты и профили',
      'Термокольца в комплекте',
      'Подключение к электрике',
    ],
    category: 'dopolnit',
  },
]
