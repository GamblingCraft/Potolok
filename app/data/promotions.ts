/**
 * Акции, скидки и промокоды
 * Когда появится API/админка → заменить на $fetch('/api/promotions')
 */

export interface Promotion {
  id: number
  slug: string
  title: string
  subtitle: string
  description: string
  badge: string | null       // метка: «Хит», «Новинка» и т.д.
  discount: string           // «10%», «3-й потолок бесплатно» и т.д.
  conditions: string[]       // условия получения
  dateEnd: string | null     // дата окончания (null = бессрочно)
  icon: string               // lucide-иконка
  color: string              // акцентный цвет карточки
  active: boolean
}

export interface PromoCode {
  id: number
  code: string
  description: string
  discount: string           // «10%», «500 ₽» и т.д.
  conditions: string
  dateEnd: string | null
  active: boolean
}

export const promotions: Promotion[] = [
  {
    id: 1,
    slug: 'tretij-potolok-v-podarok',
    title: '3-й потолок в подарок',
    subtitle: 'При заказе от 3 помещений',
    description: 'Закажите натяжные потолки в трёх помещениях — и третий по счёту (наименьший по площади) мы установим бесплатно. Акция распространяется на все фактуры.',
    badge: 'Хит',
    discount: '3-й бесплатно',
    conditions: [
      'Заказ от 3 помещений одновременно',
      'Бесплатно — наименьшее помещение',
      'Распространяется на все фактуры',
      'Монтаж в один день',
    ],
    dateEnd: null,
    icon: 'lucide:gift',
    color: '#f5c800',
    active: true,
  },
  {
    id: 2,
    slug: 'skidka-10-segodnya',
    title: 'Скидка 10% при заказе сегодня',
    subtitle: 'Только для новых клиентов',
    description: 'Оставьте заявку сегодня и получите скидку 10% на весь заказ. Скидка фиксируется в договоре и распространяется на полотно, монтаж и дополнительные работы.',
    badge: 'Актуально',
    discount: '10%',
    conditions: [
      'Новые клиенты компании',
      'Заявка оставлена сегодня',
      'Скидка на весь заказ',
      'Фиксируется в договоре',
    ],
    dateEnd: null,
    icon: 'lucide:percent',
    color: '#f5c800',
    active: true,
  },
  {
    id: 3,
    slug: 'besplatnyj-zamer',
    title: 'Бесплатный замер на дому',
    subtitle: 'Выезд в любой район Иркутска',
    description: 'Вызовите замерщика бесплатно — он приедет в удобное время, произведёт точные замеры, покажет образцы полотен и рассчитает стоимость прямо на месте.',
    badge: null,
    discount: '0 ₽',
    conditions: [
      'Любой район Иркутска',
      'Выезд в день обращения',
      'Образцы всех фактур с собой',
      'Расчёт стоимости на месте',
    ],
    dateEnd: null,
    icon: 'lucide:ruler',
    color: '#4a9eff',
    active: true,
  },
  {
    id: 4,
    slug: 'skidka-pensioneram',
    title: 'Скидка пенсионерам 5%',
    subtitle: 'По предъявлению пенсионного удостоверения',
    description: 'Специальное предложение для пенсионеров — дополнительная скидка 5% на все виды работ. Скидки не суммируются.',
    badge: null,
    discount: '5%',
    conditions: [
      'Пенсионное удостоверение',
      'На все виды работ',
      'Скидки не суммируются',
    ],
    dateEnd: null,
    icon: 'lucide:heart-handshake',
    color: '#a78bfa',
    active: true,
  },
  {
    id: 5,
    slug: 'skidka-novosyolam',
    title: 'Скидка новосёлам 5%',
    subtitle: 'При въезде в новую квартиру',
    description: 'Только переехали? Получите скидку 5% на натяжные потолки для всей новой квартиры. Нужен только документ, подтверждающий покупку или аренду жилья.',
    badge: null,
    discount: '5%',
    conditions: [
      'Новая квартира или дом',
      'Документ о праве собственности / аренды',
      'На все помещения квартиры',
      'Скидки не суммируются',
    ],
    dateEnd: null,
    icon: 'lucide:home',
    color: '#34d399',
    active: true,
  },
  {
    id: 6,
    slug: 'skidka-ot-ploshchadi',
    title: 'Скидка за объём',
    subtitle: 'Чем больше площадь — тем выгоднее',
    description: 'Действует накопительная система скидок в зависимости от общей площади заказа. Оптимально для тех, кто делает потолки сразу во всей квартире.',
    badge: 'Выгодно',
    discount: 'до 20%',
    conditions: [
      'От 10 до 30 м² — скидка 7%',
      'От 30 до 50 м² — скидка 10%',
      'От 50 до 70 м² — скидка 15%',
      'От 70 м² — скидка 20%',
    ],
    dateEnd: null,
    icon: 'lucide:trending-up',
    color: '#f97316',
    active: true,
  },
]

export const promoCodes: PromoCode[] = [
  {
    id: 1,
    code: 'НОВОСЕЛ10',
    description: 'Для новосёлов — скидка на первый заказ',
    discount: '10%',
    conditions: 'Только для новых клиентов, первый заказ',
    dateEnd: null,
    active: true,
  },
  {
    id: 2,
    code: 'ДРУГ500',
    description: 'Скидка за рекомендацию друга',
    discount: '500 ₽',
    conditions: 'Передайте другу, оба получают скидку',
    dateEnd: null,
    active: true,
  },
  {
    id: 3,
    code: 'ЛЕТО2024',
    description: 'Летняя акция — скидка на матовые потолки',
    discount: '7%',
    conditions: 'Только матовые полотна, от 15 м²',
    dateEnd: '2024-08-31',
    active: false,
  },
]
