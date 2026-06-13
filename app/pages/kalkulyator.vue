<template>
  <div>

    <!-- ═══ HERO ═══ -->
    <section class="kc-hero">
      <div class="container kc-hero__inner">
        <div class="kc-hero__content">
<div class="kc-pretitle">Бесплатно · Без звонков · За 1 минуту</div>
          <h1 class="kc-hero__title">Калькулятор натяжных потолков онлайн</h1>
          <p class="kc-hero__desc">
            Рассчитайте стоимость потолка для любого количества комнат — выберите фактуру, вид, цвет и укажите размеры. Наш калькулятор учитывает все параметры и показывает детальную смету прямо на экране.
          </p>
          <div class="kc-hero__facts">
            <div class="kc-hero__fact">
              <Icon name="lucide:zap" size="18" class="kc-hero__fact-icon"/>
              Результат мгновенно
            </div>
            <div class="kc-hero__fact">
              <Icon name="lucide:layers" size="18" class="kc-hero__fact-icon"/>
              8 фактур на выбор
            </div>
            <div class="kc-hero__fact">
              <Icon name="lucide:home" size="18" class="kc-hero__fact-icon"/>
              Любое количество комнат
            </div>
            <div class="kc-hero__fact">
              <Icon name="lucide:shield-check" size="18" class="kc-hero__fact-icon"/>
              Гарантия итоговой цены
            </div>
          </div>
          <a href="#kalkulator" class="nav-btn kc-hero__btn">
            <Icon name="lucide:calculator" size="17"/>
            Рассчитать стоимость
          </a>
        </div>
        <div class="kc-hero__visual">
          <div class="kc-stat" v-for="s in stats" :key="s.label">
            <div class="kc-stat__val">{{ s.val }}</div>
            <div class="kc-stat__label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ HOW IT WORKS ═══ -->
    <section class="section kc-how">
      <div class="container">
        <div class="kc-section-head">
          <div class="kc-pretitle kc-pretitle--dark">Как это работает</div>
          <h2 class="kc-section-title">4 шага до точной стоимости</h2>
        </div>
        <div class="kc-steps">
          <div class="kc-step" v-for="step in howSteps" :key="step.n">
            <div class="kc-step__n">{{ step.n }}</div>
            <Icon :name="step.icon" size="28" class="kc-step__icon"/>
            <div class="kc-step__title">{{ step.title }}</div>
            <div class="kc-step__desc">{{ step.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CALCULATOR ═══ -->
    <CalcWidget />

    <!-- ═══ WHY US ═══ -->
    <section class="section kc-why">
      <div class="container">
        <div class="kc-section-head">
          <div class="kc-pretitle kc-pretitle--dark">Наши преимущества</div>
          <h2 class="kc-section-title">Почему выбирают ПроПотолок</h2>
          <p class="kc-section-desc">Цены в калькуляторе — реальные. Без скрытых наценок после замера</p>
        </div>
        <div class="kc-why-grid">
          <div class="kc-why-card" v-for="w in whyUs" :key="w.title">
            <div class="kc-why-card__icon">
              <Icon :name="w.icon" size="26"/>
            </div>
            <div class="kc-why-card__title">{{ w.title }}</div>
            <div class="kc-why-card__desc">{{ w.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ PRICE TABLE ═══ -->
    <section class="section kc-prices">
      <div class="container">
        <div class="kc-section-head">
          <div class="kc-pretitle kc-pretitle--dark">Прайс-лист</div>
          <h2 class="kc-section-title">Из чего складывается цена</h2>
          <p class="kc-section-desc">Ориентировочные цены для предварительного расчёта. Точная сумма — после бесплатного замера</p>
        </div>
        <div class="kc-price-tables">

          <div class="kc-ptable">
            <div class="kc-ptable__head">
              <Icon name="lucide:layers" size="18"/>
              Фактуры полотна
            </div>
            <div class="kc-ptable__row" v-for="t in priceTextures" :key="t.name">
              <span>{{ t.name }}</span>
              <span class="kc-ptable__val">от {{ t.price }} ₽/м²</span>
            </div>
          </div>

          <div class="kc-ptable">
            <div class="kc-ptable__head">
              <Icon name="lucide:sparkles" size="18"/>
              Виды и технологии
            </div>
            <div class="kc-ptable__row" v-for="v in priceViews" :key="v.name">
              <span>{{ v.name }}</span>
              <span class="kc-ptable__val">{{ v.extra > 0 ? '+' + v.extra + ' ₽/м²' : 'включено' }}</span>
            </div>
          </div>

          <div class="kc-ptable">
            <div class="kc-ptable__head">
              <Icon name="lucide:wrench" size="18"/>
              Дополнительные работы
            </div>
            <div class="kc-ptable__row" v-for="e in priceExtras" :key="e.name">
              <span>{{ e.name }}</span>
              <span class="kc-ptable__val">{{ e.price }} ₽/{{ e.unit }}</span>
            </div>
          </div>

          <div class="kc-ptable">
            <div class="kc-ptable__head">
              <Icon name="lucide:palette" size="18"/>
              Доплата за цвет (за м²)
            </div>
            <div class="kc-ptable__row" v-for="c in priceColors" :key="c.name">
              <span class="kc-ptable__color-row">
                <span class="kc-ptable__dot" :style="{ background: c.hex }"></span>
                {{ c.name }}
              </span>
              <span class="kc-ptable__val">{{ c.extra > 0 ? '+' + c.extra + ' ₽/м²' : 'включено' }}</span>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══ FAQ ═══ -->
    <section class="section kc-faq">
      <div class="container">
        <div class="kc-section-head">
          <div class="kc-pretitle kc-pretitle--dark">Вопросы и ответы</div>
          <h2 class="kc-section-title">Часто спрашивают о расчёте цены</h2>
        </div>
        <div class="kc-faq-list">
          <div
            v-for="(faq, i) in faqs" :key="i"
            class="kc-faq-item"
            :class="{ open: openFaq === i }"
            @click="openFaq = openFaq === i ? null : i"
          >
            <div class="kc-faq-item__q">
              {{ faq.q }}
              <Icon :name="openFaq === i ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="18" class="kc-faq-item__arrow"/>
            </div>
            <Transition
              @enter="onEnter"
              @after-enter="onAfterEnter"
              @leave="onLeave"
              @after-leave="onAfterLeave"
            >
              <div v-if="openFaq === i" class="kc-faq-item__a">{{ faq.a }}</div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ═══ -->
    <section class="kc-cta">
      <div class="container kc-cta__inner">
        <div>
          <h2 class="kc-cta__title">Не хотите считать сами?</h2>
          <p class="kc-cta__desc">Оставьте заявку — замерщик приедет бесплатно и рассчитает точную стоимость на месте</p>
        </div>
        <div class="kc-cta__btns">
          <a href="#kalkulator" class="nav-btn kc-cta__btn">
            <Icon name="lucide:calculator" size="17"/>
            Рассчитать онлайн
          </a>
          <button class="kc-cta__btn-outline" @click="$emit('open-callback')">
            <Icon name="lucide:phone-call" size="17"/>
            Заказать замер
          </button>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
usePageSeoMeta('kalkulyator')

const openFaq = ref<number | null>(null)

function onEnter(el: Element) {
  const e = el as HTMLElement
  e.style.overflow = 'hidden'
  e.style.height = '0'
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.style.transition = 'height .3s ease'
      e.style.height = e.scrollHeight + 'px'
    })
  })
}
function onAfterEnter(el: Element) {
  const e = el as HTMLElement
  e.style.height = ''
  e.style.overflow = ''
  e.style.transition = ''
}
function onLeave(el: Element) {
  const e = el as HTMLElement
  e.style.overflow = 'hidden'
  e.style.height = e.scrollHeight + 'px'
  // force reflow
  e.getBoundingClientRect()
  e.style.transition = 'height .25s ease'
  e.style.height = '0'
}
function onAfterLeave(el: Element) {
  const e = el as HTMLElement
  e.style.height = ''
  e.style.overflow = ''
  e.style.transition = ''
}

const stats = [
  { val: '159 ₽',  label: 'минимальная цена за м²' },
  { val: '1 день', label: 'срок монтажа' },
  { val: '12 лет', label: 'гарантия по договору' },
  { val: '0 ₽',    label: 'монтаж и замер' },
]

const howSteps = [
  { n: '01', icon: 'lucide:layers',    title: 'Выберите фактуру и вид', desc: 'Матовый, глянцевый, сатиновый, тканевый и другие — с ценой за м²' },
  { n: '02', icon: 'lucide:home',      title: 'Добавьте помещения',     desc: 'Укажите длину и ширину каждой комнаты, выберите цвет отдельно' },
  { n: '03', icon: 'lucide:wrench',    title: 'Укажите доп. работы',    desc: 'Углы, светильники, обводы труб, парящая ниша — всё учтено' },
  { n: '04', icon: 'lucide:receipt',   title: 'Получите смету',         desc: 'Детальный расчёт с разбивкой по комнатам и позициям' },
]

const whyUs = [
  { icon: 'lucide:badge-check',   title: 'Цена фиксируется',        desc: 'После замера специалист составляет смету. Именно эта сумма вписывается в договор — без доплат и сюрпризов.' },
  { icon: 'lucide:ruler',         title: 'Бесплатный замер',        desc: 'Замерщик приедет в удобное время, уточнит все параметры и озвучит точную стоимость.' },
  { icon: 'lucide:truck',         title: 'Монтаж за 1 день',        desc: 'Устанавливаем потолок за один визит. Чисто, без запаха, без мусора.' },
  { icon: 'lucide:shield-check',  title: 'Гарантия 12 лет',         desc: 'Письменная гарантия на полотно и монтажные работы по договору.' },
  { icon: 'lucide:banknote',      title: 'Без предоплаты',          desc: 'Оплата только после завершения монтажа. Принимаем наличные и карту.' },
  { icon: 'lucide:star',          title: '15+ лет на рынке',        desc: 'Более 4 000 довольных клиентов в Иркутске и области.' },
]

const priceTextures = [
  { name: 'Матовый',      price: 159 },
  { name: 'Глянцевый',    price: 209 },
  { name: 'Сатиновый',    price: 189 },
  { name: 'Тканевый',     price: 319 },
  { name: 'Фактурный',    price: 259 },
  { name: 'Бесшовный',    price: 229 },
  { name: 'Гипоаллергенный', price: 279 },
  { name: 'Негорючий',    price: 299 },
]

const priceViews = [
  { name: 'Обычный одноуровневый', extra: 0 },
  { name: 'Парящий потолок',       extra: 180 },
  { name: 'С подсветкой',          extra: 220 },
  { name: 'Двухуровневый',         extra: 350 },
  { name: 'Фотопечать',            extra: 400 },
  { name: 'Звёздное небо',         extra: 500 },
  { name: 'Световые линии',        extra: 280 },
  { name: 'Теневой',               extra: 200 },
]

const priceColors = [
  { name: 'Белый',      hex: '#f0f0f0',  extra: 0 },
  { name: 'Серый',      hex: '#9e9e9e',  extra: 10 },
  { name: 'Бежевый',    hex: '#d4b896',  extra: 10 },
  { name: 'Голубой',    hex: '#90c8f0',  extra: 20 },
  { name: 'Чёрный',     hex: '#1a1a1a',  extra: 20 },
  { name: 'Коричневый', hex: '#8b6347',  extra: 20 },
  { name: 'Цветной',    hex: 'linear-gradient(135deg,#f66,#fc0,#6cf)', extra: 30 },
  { name: 'Золотой',    hex: 'linear-gradient(135deg,#c8a84b,#f5e27a)', extra: 40 },
]

const priceExtras = [
  { name: 'Угол / стык',    price: 150, unit: 'шт' },
  { name: 'Светильник',     price: 300, unit: 'шт' },
  { name: 'Обвод трубы',    price: 250, unit: 'шт' },
  { name: 'Парящая ниша',   price: 350, unit: 'м.п.' },
]

const faqs = [
  {
    q: 'Насколько точен онлайн-калькулятор?',
    a: 'Калькулятор показывает ориентировочную стоимость — чтобы вы понимали порядок цен ещё до звонка. Точная сумма определяется только после бесплатного выезда замерщика: он учитывает реальные размеры, форму комнаты, высоту потолков и расположение коммуникаций.',
  },
  {
    q: 'Монтаж действительно бесплатный?',
    a: 'Да, монтаж натяжного потолка входит в стоимость полотна. Вы платите только за материал и дополнительные работы (углы, светильники и т.д.). Никаких скрытых наценок.',
  },
  {
    q: 'Что входит в цену за м²?',
    a: 'В базовую цену за м² входят: полотно выбранной фактуры и цвета, монтажный багет, установка, уборка после монтажа. Дополнительно оплачиваются: обработка углов, установка светильников, обводы труб, парящие ниши.',
  },
  {
    q: 'Можно ли рассчитать потолок для нескольких комнат сразу?',
    a: 'Да, наш калькулятор позволяет добавить любое количество помещений. Для каждой комнаты можно выбрать отдельный цвет полотна. Итоговая смета покажет стоимость по каждой комнате и общую сумму.',
  },
  {
    q: 'Когда будет известна точная цена?',
    a: 'Точная стоимость озвучивается после бесплатного выезда замерщика. Специалист приедет, измерит помещение и составит итоговую смету. Именно эта сумма фиксируется в договоре — без доплат после монтажа.',
  },
  {
    q: 'Сколько времени занимает монтаж?',
    a: 'Монтаж натяжного потолка в стандартной комнате занимает 2–4 часа. Всю квартиру обычно делаем за 1 рабочий день. После монтажа можно сразу пользоваться помещением.',
  },
]
</script>

<style scoped>
.kc-breadcrumb { margin-bottom: 20px; }

/* ═══ Hero ═══ */
.kc-hero {
  background: #141414;
  padding: 64px 0 72px;
}
.kc-hero__inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 60px;
  align-items: center;
}
.kc-pretitle {
  display: inline-block;
  background: var(--accent);
  color: #141414;
  font-size: 12px; font-weight: 700;
  padding: 3px 14px; border-radius: 20px;
  margin-bottom: 16px;
  text-transform: uppercase; letter-spacing: .5px;
}
.kc-pretitle--dark {
  background: var(--accent);
  color: var(--dark);
}
.kc-hero__title {
  font-size: 42px; font-weight: 900;
  color: #fff; line-height: 1.15;
  margin-bottom: 18px;
}
.kc-hero__desc {
  font-size: 16px; color: rgba(255,255,255,.5);
  line-height: 1.7; max-width: 560px;
  margin-bottom: 28px;
}
.kc-hero__facts {
  display: flex; flex-wrap: wrap; gap: 16px;
  margin-bottom: 32px;
}
.kc-hero__fact {
  display: flex; align-items: center; gap: 7px;
  font-size: 14px; font-weight: 600;
  color: rgba(255,255,255,.6);
}
.kc-hero__fact-icon { color: var(--accent); }
.kc-hero__btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 16px 36px; font-size: 16px;
}
.kc-hero__btn:hover { color: #141414; }

/* Stats */
.kc-hero__visual {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.kc-stat {
  background: #1e1e1e;
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  padding: 20px 22px;
  text-align: center;
  min-width: 130px;
}
.kc-stat__val {
  font-size: 28px; font-weight: 900;
  color: var(--accent);
  font-family: 'Gilroy', sans-serif;
  line-height: 1; margin-bottom: 6px;
}
.kc-stat__label {
  font-size: 12px; color: rgba(255,255,255,.4);
  line-height: 1.3;
}

/* ═══ Shared section head ═══ */
.kc-section-head { text-align: center; margin-bottom: 44px; }
.kc-section-title {
  font-size: 34px; font-weight: 800;
  color: var(--dark); margin: 0 0 10px; line-height: 1.2;
}
.kc-section-desc {
  font-size: 16px; color: var(--gray);
  max-width: 520px; margin: 0 auto; line-height: 1.6;
}

/* ═══ How it works ═══ */
.kc-how { background: #f7f7f7; padding: 72px 0; }
.kc-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.kc-step {
  background: #fff;
  border-radius: 16px;
  padding: 28px 24px;
  box-shadow: 0 1px 8px rgba(0,0,0,.06);
  position: relative;
}
.kc-step__n {
  font-size: 11px; font-weight: 800;
  color: var(--accent);
  background: rgba(245,200,0,.15);
  border-radius: 6px; padding: 3px 8px;
  display: inline-block; margin-bottom: 16px;
  letter-spacing: .5px;
}
.kc-step__icon { color: var(--dark); margin-bottom: 14px; display: block; }
.kc-step__title { font-size: 16px; font-weight: 700; color: var(--dark); margin-bottom: 8px; }
.kc-step__desc  { font-size: 13px; color: var(--gray); line-height: 1.55; }

/* ═══ Why us ═══ */
.kc-why { background: #fff; padding: 72px 0; }
.kc-why-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.kc-why-card {
  background: #f7f7f7;
  border-radius: 16px;
  padding: 28px 24px;
  border: 1.5px solid transparent;
  transition: border-color .15s, box-shadow .15s;
}
.kc-why-card:hover { border-color: var(--accent); box-shadow: 0 4px 20px rgba(245,200,0,.12); }
.kc-why-card__icon {
  width: 52px; height: 52px;
  background: var(--accent);
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  color: var(--dark); margin-bottom: 16px;
}
.kc-why-card__title { font-size: 17px; font-weight: 700; color: var(--dark); margin-bottom: 8px; }
.kc-why-card__desc  { font-size: 14px; color: var(--gray); line-height: 1.6; }

/* ═══ Price table ═══ */
.kc-prices { background: #f7f7f7; padding: 72px 0; }
.kc-price-tables {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.kc-ptable {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 8px rgba(0,0,0,.06);
}
.kc-ptable__head {
  display: flex; align-items: center; gap: 10px;
  background: var(--dark);
  color: #fff;
  font-size: 14px; font-weight: 700;
  padding: 16px 20px;
}
.kc-ptable__head .icon { color: var(--accent); }
.kc-ptable__row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 11px 20px;
  font-size: 14px; color: var(--gray);
  border-bottom: 1px solid #f0f0f0;
}
.kc-ptable__row:last-child { border-bottom: none; }
.kc-ptable__val { font-weight: 700; color: var(--dark); white-space: nowrap; }

.kc-ptable__color-row { display: flex; align-items: center; gap: 8px; }
.kc-ptable__dot {
  width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0;
  border: 1px solid rgba(0,0,0,.1);
}

.kc-price-note {
  display: flex; align-items: flex-start; gap: 8px;
  font-size: 13px; color: var(--gray);
  background: #fff;
  border-radius: 12px; padding: 14px 18px;
  border-left: 3px solid var(--accent);
}
.kc-price-note strong { color: var(--dark); }

/* ═══ FAQ ═══ */
.kc-faq { background: #fff; padding: 72px 0; }
.kc-faq-list {
  max-width: 780px; margin: 0 auto;
  display: flex; flex-direction: column; gap: 8px;
}
.kc-faq-item {
  background: #f7f7f7;
  border-radius: 14px;
  border: 1.5px solid transparent;
  overflow: hidden;
  cursor: pointer;
  transition: border-color .15s;
}
.kc-faq-item.open { border-color: var(--accent); background: #fff; }
.kc-faq-item__q {
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
  padding: 18px 22px;
  font-size: 16px; font-weight: 700; color: var(--dark);
  user-select: none;
}
.kc-faq-item__arrow { color: var(--gray); flex-shrink: 0; }
.kc-faq-item.open .kc-faq-item__arrow { color: var(--accent); }
.kc-faq-item__a {
  padding: 0 22px 18px;
  font-size: 14px; color: var(--gray); line-height: 1.7;
}

/* ═══ CTA ═══ */
.kc-cta {
  background: #141414;
  padding: 60px 0;
}
.kc-cta__inner {
  display: flex; align-items: center;
  justify-content: space-between; gap: 40px;
  flex-wrap: wrap;
}
.kc-cta__title {
  font-size: 32px; font-weight: 800;
  color: #fff; margin-bottom: 10px;
}
.kc-cta__desc { font-size: 15px; color: rgba(255,255,255,.45); max-width: 480px; }
.kc-cta__btns { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
.kc-cta__btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 15px 32px; font-size: 15px;
}
.kc-cta__btn:hover { color: #141414; }
.kc-cta__btn-outline {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 30px; font-size: 15px; font-weight: 700;
  font-family: 'Gilroy', sans-serif;
  background: none;
  border: 2px solid rgba(255,255,255,.2);
  border-radius: 10px; color: #fff; cursor: pointer;
  transition: border-color .15s, background .15s;
}
.kc-cta__btn-outline:hover { border-color: var(--accent); color: var(--accent); }

/* ═══ Responsive ═══ */
@media (max-width: 1024px) {
  .kc-hero__inner { grid-template-columns: 1fr; }
  .kc-hero__visual { display: grid; grid-template-columns: repeat(4, 1fr); max-width: 100%; }
  .kc-steps { grid-template-columns: repeat(2, 1fr); }
  .kc-why-grid { grid-template-columns: repeat(2, 1fr); }
  .kc-price-tables { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .kc-hero__title { font-size: 30px; }
  .kc-hero__visual { grid-template-columns: repeat(2, 1fr); }
  .kc-steps { grid-template-columns: 1fr; }
  .kc-why-grid { grid-template-columns: 1fr; }
  .kc-section-title { font-size: 26px; }
  .kc-price-tables { grid-template-columns: 1fr; }
  .kc-cta__inner { flex-direction: column; align-items: flex-start; }
}
</style>
