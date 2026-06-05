/**
 * Промокоды ПроПотолок
 *
 * public: true  — отображаются на странице /akczii (в блоке «Промокоды»)
 * public: false — только для валидации в калькуляторе (офлайн, партнёры, сотрудники и т.д.)
 *
 * Когда появится API/админка → заменить на $fetch('/api/promo')
 */

export interface PromoCode {
  id: number
  code: string               // Промокод в верхнем регистре
  description: string        // Короткое описание (показывается на сайте при public: true)
  discount: string           // Отображаемая строка: «10%», «500 ₽»
  conditions: string         // Условия применения
  active: boolean            // Включён / выключен
  public: boolean            // true = показывать на странице акций
}

export const promoCodes: PromoCode[] = [

  // ─── ПУБЛИЧНЫЕ (видны на сайте) ───────────────────────────────
  {
    id: 1,
    code: 'НОВОСЕЛ10',
    description: 'Для новосёлов — скидка на первый заказ',
    discount: '10%',
    conditions: 'Только для новых клиентов, первый заказ',
    active: true,
    public: true,
  },
  {
    id: 2,
    code: 'ДРУГ500',
    description: 'Скидка за рекомендацию друга',
    discount: '500 ₽',
    conditions: 'Передайте другу — оба получают скидку',
    active: true,
    public: true,
  },
  // ─── НЕПУБЛИЧНЫЕ (только для валидации) ──────────────────────
  {
    id: 4,
    code: 'ПЕНСИОНЕР5',
    description: 'Скидка для пенсионеров',
    discount: '5%',
    conditions: 'По предъявлению пенсионного удостоверения',
    active: true,
    public: false,   // выдаётся лично менеджером
  },
  {
    id: 5,
    code: '2ГИСПРО',
    description: 'Партнёрский промокод',
    discount: '15%',
    conditions: 'Только для партнёров компании',
    active: true,
    public: false,
  },
  {
    id: 6,
    code: 'ЦЕНТР25',
    description: 'Скидка для сотрудников',
    discount: '10%',
    conditions: 'Только для сотрудников ПроПотолок',
    active: true,
    public: false,
  },
  {
    id: 7,
    code: 'НОВОЛЕНИНО2026',
    description: 'Летняя акция 2026',
    discount: '12%',
    conditions: 'Действует при заказе в летний период 2026',
    active: true,
    public: false,   // раздаётся офлайн на выставках/мероприятиях
  },
]

// ── Хелперы для импорта ─────────────────────────────────────────

/** Все активные промокоды — для валидации в калькуляторе */
export const activePromoCodes = promoCodes.filter(p => p.active)

/** Только публичные активные — для блока на странице акций */
export const publicPromoCodes = promoCodes.filter(p => p.active && p.public)
