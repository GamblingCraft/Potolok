<template>
  <div>

    <!-- ═══ HERO ═══ -->
    <section class="pr-hero">
      <div class="container pr-hero__inner">
        <div class="pr-hero__content">
          <div class="pr-pretitle">Прозрачные цены</div>
          <h1 class="pr-hero__title">Цены на натяжные потолки в Иркутске</h1>
          <p class="pr-hero__desc">Все цены указаны с учётом монтажа. Точная стоимость — после бесплатного замера. Никаких скрытых доплат.</p>
          <div class="pr-hero__badges">
            <div class="pr-badge" v-for="b in heroBadges" :key="b.text">
              <Icon :name="b.icon" size="16" class="pr-badge__icon"/>
              {{ b.text }}
            </div>
          </div>
          <div class="pr-hero__cta">
            <NuxtLink to="/kalkulyator" class="nav-btn pr-hero__btn">
              <Icon name="lucide:calculator" size="16"/>
              Рассчитать стоимость
            </NuxtLink>
            <button class="pr-hero__btn-outline" @click="callbackOpen = true">
              <Icon name="lucide:phone-call" size="16"/>
              Бесплатный замер
            </button>
          </div>
        </div>
        <div class="pr-hero__stats">
          <div class="pr-stat" v-for="s in heroStats" :key="s.label">
            <div class="pr-stat__val">{{ s.val }}</div>
            <div class="pr-stat__label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ ТАБЛИЦА ЦЕН ═══ -->
    <section class="pr-section pr-section--gray">
      <div class="container">
        <div class="pr-section-head">
          <div class="pr-pretitle pr-pretitle--dark">Подробный прайс</div>
          <h2 class="pr-section-title">Цены на все виды потолков</h2>
          <p class="pr-section-desc">Монтаж включён в стоимость. Цены актуальны на {{ currentMonth }}</p>
        </div>

        <!-- Табы -->
        <div class="pr-tabs">
          <button v-for="tab in priceTabs" :key="tab.id" class="pr-tab" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
            <Icon :name="tab.icon" size="15"/>
            {{ tab.label }}
          </button>
        </div>

        <!-- Таблица: Фактуры -->
        <div v-if="activeTab === 'faktury'" class="pr-table">
          <div class="pr-table__head">
            <span>Фактура</span>
            <span>Описание</span>
            <span>Цена</span>
            <span></span>
          </div>
          <div v-for="item in priceFaktury" :key="item.id" class="pr-table__row" :class="{ popular: item.popular }">
            <div class="pr-table__name">
              {{ item.name }}
              <span v-if="item.badge" class="pr-table__badge">{{ item.badge }}</span>
            </div>
            <div class="pr-table__desc">{{ item.description }}</div>
            <div class="pr-table__price">
              <span class="pr-table__price-val">от {{ item.priceFrom }} ₽/м²</span>
              <span v-if="item.priceTo" class="pr-table__price-to">до {{ item.priceTo }} ₽/м²</span>
            </div>
            <div class="pr-table__action">
              <NuxtLink :to="'/catalog/faktury/' + toSlug(item.name)" class="pr-table__link">
                Подробнее <Icon name="lucide:arrow-right" size="13"/>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Таблица: Виды -->
        <div v-if="activeTab === 'vidy'" class="pr-table">
          <div class="pr-table__head">
            <span>Вид</span>
            <span>Описание</span>
            <span>Цена</span>
            <span></span>
          </div>
          <div v-for="item in priceVidy" :key="item.id" class="pr-table__row" :class="{ popular: item.popular }">
            <div class="pr-table__name">
              {{ item.name }}
              <span v-if="item.badge" class="pr-table__badge">{{ item.badge }}</span>
            </div>
            <div class="pr-table__desc">{{ item.description }}</div>
            <div class="pr-table__price">
              <span class="pr-table__price-val">от {{ item.priceFrom }} ₽/м²</span>
              <span v-if="item.priceTo" class="pr-table__price-to">до {{ item.priceTo }} ₽/м²</span>
            </div>
            <div class="pr-table__action">
              <NuxtLink to="/kalkulyator" class="pr-table__link">
                Рассчитать <Icon name="lucide:arrow-right" size="13"/>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Таблица: Доп. работы -->
        <div v-if="activeTab === 'extra'" class="pr-table">
          <div class="pr-table__head">
            <span>Работа</span>
            <span>Описание</span>
            <span>Цена</span>
            <span></span>
          </div>
          <div v-for="item in extraWorks" :key="item.id" class="pr-table__row">
            <div class="pr-table__name">
              <Icon :name="item.icon" size="15" class="pr-table__icon"/>
              {{ item.name }}
            </div>
            <div class="pr-table__desc">{{ item.description }}</div>
            <div class="pr-table__price">
              <span class="pr-table__price-val">{{ item.price }} ₽/{{ item.unit }}</span>
            </div>
            <div class="pr-table__action"></div>
          </div>
        </div>

        <div class="pr-table-note">
          <Icon name="lucide:info" size="14"/>
          Цены ориентировочные. Точная стоимость определяется после бесплатного замера специалиста.
        </div>
      </div>
    </section>

    <!-- ═══ СКИДКИ ЗА ОБЪЁМ ═══ -->
    <section class="pr-section pr-section--dark">
      <div class="container">
        <div class="pr-section-head">
          <div class="pr-pretitle">Система скидок</div>
          <h2 class="pr-section-title pr-section-title--light">Больше площадь — больше экономия</h2>
          <p class="pr-section-desc pr-section-desc--light">Скидки рассчитываются автоматически и фиксируются в договоре</p>
        </div>

        <div class="pr-volume-grid">
          <div v-for="(d, i) in volumeDiscounts" :key="i" class="pr-volume-card" :class="{ highlight: i === 2 }">
            <div class="pr-volume-card__discount">−{{ d.discount }}%</div>
            <div class="pr-volume-card__range">{{ d.range }}</div>
            <div class="pr-volume-card__example">{{ d.example }}</div>
          </div>
        </div>

        <div class="pr-volume-note">
          Скидки не суммируются с промокодами и другими акциями. Применяется максимально выгодная скидка.
        </div>
      </div>
    </section>

    <!-- ═══ ПРИМЕРЫ РАБОТ С ЦЕНАМИ ═══ -->
    <section class="pr-section pr-section--light">
      <div class="container">
        <div class="pr-section-head">
          <div class="pr-pretitle pr-pretitle--dark">Примеры расчётов</div>
          <h2 class="pr-section-title">Сколько стоит конкретный потолок</h2>
          <p class="pr-section-desc">Реальные расчёты для типовых помещений</p>
        </div>
        <div class="pr-examples">
          <div v-for="ex in examples" :key="ex.title" class="pr-example">
            <div class="pr-example__head">
              <Icon :name="ex.icon" size="20" class="pr-example__icon"/>
              <div>
                <div class="pr-example__title">{{ ex.title }}</div>
                <div class="pr-example__params">{{ ex.params }}</div>
              </div>
            </div>
            <div class="pr-example__rows">
              <div v-for="row in ex.rows" :key="row.name" class="pr-example__row">
                <span>{{ row.name }}</span>
                <span>{{ row.price }}</span>
              </div>
            </div>
            <div class="pr-example__total">
              <span>Итого</span>
              <span>{{ ex.total }}</span>
            </div>
            <NuxtLink to="/kalkulyator" class="pr-example__calc">
              Рассчитать свой вариант <Icon name="lucide:arrow-right" size="13"/>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ FAQ ═══ -->
    <section class="pr-section pr-section--gray">
      <div class="container">
        <div class="pr-section-head">
          <div class="pr-pretitle pr-pretitle--dark">Вопросы о ценах</div>
          <h2 class="pr-section-title">Часто задаваемые вопросы</h2>
        </div>
        <div class="pr-faq">
          <div
            v-for="(faq, i) in faqs" :key="i"
            class="pr-faq-item"
            :class="{ open: openFaq === i }"
            @click="openFaq = openFaq === i ? null : i"
          >
            <div class="pr-faq-item__q">
              {{ faq.q }}
              <Icon :name="openFaq === i ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="17" class="pr-faq-item__arr"/>
            </div>
            <Transition @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave" @after-leave="onAfterLeave">
              <div v-if="openFaq === i" class="pr-faq-item__a">{{ faq.a }}</div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ SEO ═══ -->
    <section class="pr-section pr-section--white">
      <div class="container pr-seo">
        <div class="pr-seo__content">
          <h2>Цены на натяжные потолки в Иркутске в {{ currentYear }} году</h2>
          <p>Компания ПроПотолок предлагает натяжные потолки по конкурентным ценам с гарантией качества. Стоимость зависит от фактуры полотна, площади помещения, вида потолка и дополнительных работ.</p>
          <h3>Из чего складывается цена</h3>
          <p>Базовая цена включает само полотно и монтаж — это основная статья расходов. Дополнительно оплачиваются: обработка углов, установка светильников, обводы труб, декоративные элементы. Замер и выезд мастера — бесплатно.</p>
          <h3>Почему цена может отличаться</h3>
          <p>На итоговую стоимость влияют: площадь комнаты (чем больше — тем выгоднее), выбранная фактура и цвет, сложность конструкции, количество доп. работ. При заказе нескольких комнат действует накопительная скидка до 20%.</p>
          <h3>Гарантия цены</h3>
          <p>После замера мастер составляет точную смету. Эта сумма фиксируется в договоре до начала монтажа. <strong>Никаких доплат после выполнения работ</strong> — это наш принцип.</p>
        </div>
        <div class="pr-seo__aside">
          <div class="pr-seo__card">
            <div class="pr-seo__card-title">Рассчитайте стоимость</div>
            <div class="pr-seo__card-desc">Наш калькулятор учитывает фактуру, вид, цвет и все комнаты</div>
            <NuxtLink to="/kalkulyator" class="nav-btn pr-seo__card-btn">
              <Icon name="lucide:calculator" size="15"/>
              Открыть калькулятор
            </NuxtLink>
            <div class="pr-seo__card-divider"></div>
            <div class="pr-seo__card-title">Или вызовите замерщика</div>
            <div class="pr-seo__card-desc">Приедем бесплатно, замерим и рассчитаем на месте</div>
            <button class="pr-seo__card-btn-outline" @click="callbackOpen = true">
              <Icon name="lucide:phone-call" size="15"/>
              Заказать замер
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ═══ -->
    <section class="pr-cta">
      <div class="container pr-cta__inner">
        <div>
          <h2 class="pr-cta__title">Узнайте точную цену для вашей квартиры</h2>
          <p class="pr-cta__desc">Вызовите замерщика — приедет бесплатно, замерит и назовёт окончательную сумму без обязательств</p>
        </div>
        <div class="pr-cta__btns">
          <NuxtLink to="/kalkulyator" class="nav-btn pr-cta__btn">
            <Icon name="lucide:calculator" size="16"/>
            Рассчитать онлайн
          </NuxtLink>
          <button class="pr-cta__btn-outline" @click="callbackOpen = true">
            <Icon name="lucide:phone-call" size="16"/>
            Бесплатный замер
          </button>
        </div>
      </div>
    </section>

    <ModalCallback v-model="callbackOpen" />

    <!-- JSON-LD -->
    <Head>
      <Script type="application/ld+json">{{ schemaOrg }}</Script>
    </Head>

  </div>
</template>

<script setup lang="ts">
import { priceFaktury, priceVidy, extraWorks, packages, volumeDiscounts } from '~/data/prices'
import { useCatalogPrices } from '~/composables/useCatalogPrices'

const _prices = await useCatalogPrices()
const basePrice = computed(() => _prices.value?.['base'] ?? 159)

useHead({
  title: 'Цены на натяжные потолки в Иркутске — прайс-лист 2024 | ПроПотолок',
  meta: [
    { name: 'description', content: 'Актуальные цены на натяжные потолки в Иркутске: матовые от 159 ₽/м², глянцевые от 209 ₽/м². Монтаж включён. Скидки до 20%. Бесплатный замер.' },
  ],
})

const callbackOpen = ref(false)
const activeTab = ref('faktury')
const openFaq = ref<number | null>(null)

const currentMonth = computed(() => new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }))
const currentYear  = computed(() => new Date().getFullYear())

const priceTabs = [
  { id: 'faktury', label: 'По фактуре', icon: 'lucide:layers' },
  { id: 'vidy',    label: 'По виду',    icon: 'lucide:sparkles' },
  { id: 'extra',   label: 'Доп. работы',icon: 'lucide:wrench' },
]

const heroBadges = [
  { icon: 'lucide:shield-check',  text: 'Монтаж включён в цену' },
  { icon: 'lucide:ruler',         text: 'Замер бесплатно' },
  { icon: 'lucide:file-check',    text: 'Цена фиксируется в договоре' },
  { icon: 'lucide:banknote',      text: 'Оплата после монтажа' },
]

const heroStats = computed(() => [
  { val: `от ${basePrice.value} ₽`, label: 'минимальная цена за м²' },
  { val: 'до 20%',   label: 'скидка за большой заказ' },
  { val: '0 ₽',      label: 'замер и монтаж' },
  { val: '12 лет',   label: 'гарантия по договору' },
])

const examples = [
  {
    icon: 'lucide:sofa', title: 'Гостиная 20 м²', params: 'Матовый белый · 4 светильника · 4 угла',
    rows: [
      { name: 'Полотно матовое 20 м²',    price: '3 180 ₽' },
      { name: 'Монтаж включён',           price: '0 ₽' },
      { name: 'Светильники 4 шт',         price: '1 200 ₽' },
      { name: 'Обработка углов 4 шт',     price: '600 ₽' },
    ],
    total: '4 980 ₽',
  },
  {
    icon: 'lucide:lamp-ceiling', title: 'Гостиная 25 м² парящий', params: 'Матовый · Парящая ниша · 8 светильников',
    rows: [
      { name: 'Полотно матовое 25 м²',    price: '3 975 ₽' },
      { name: 'Монтаж включён',           price: '0 ₽' },
      { name: 'Парящая ниша 14 м.п.',     price: '4 900 ₽' },
      { name: 'Светильники 8 шт',         price: '2 400 ₽' },
      { name: 'Обработка углов 4 шт',     price: '600 ₽' },
    ],
    total: '11 875 ₽',
  },
  {
    icon: 'lucide:home', title: 'Квартира 3 комнаты · 55 м²', params: 'Сатиновый · Скидка 15% за объём',
    rows: [
      { name: 'Полотно сатиновое 55 м²',  price: '10 395 ₽' },
      { name: 'Монтаж включён',           price: '0 ₽' },
      { name: 'Светильники 16 шт',        price: '4 800 ₽' },
      { name: 'Обработка углов 12 шт',    price: '1 800 ₽' },
      { name: 'Скидка 15%',               price: '−2 549 ₽' },
    ],
    total: '14 446 ₽',
  },
]

const faqs = [
  { q: 'Почему цены на вашем сайте ориентировочные?', a: 'Точная стоимость зависит от реальных размеров помещения, формы комнаты, высоты потолков, расположения труб и коммуникаций. Все эти параметры замерщик учтёт при выезде и назовёт финальную сумму. Эта сумма фиксируется в договоре — никаких сюрпризов после.' },
  { q: 'Монтаж действительно бесплатный?', a: 'Да. Стоимость монтажа уже включена в цену полотна. Вы платите только за материал и дополнительные работы (светильники, углы и т.д.). Это наше постоянное условие, а не временная акция.' },
  { q: 'Как работает скидка за объём?', a: 'Скидка рассчитывается от общей площади всех помещений в заказе. Например, если вы делаете 3 комнаты суммарно 55 м² — автоматически получаете скидку 15%. Скидка применяется ко всему заказу, включая дополнительные работы.' },
  { q: 'Цена изменится после замера?', a: 'Итоговая цена может незначительно отличаться от ориентировочной, так как она рассчитывается по точным размерам. Но она никогда не будет больше согласованной в договоре. Зафиксированная цена — окончательная.' },
  { q: 'Когда нужно платить?', a: 'Мы работаем без предоплаты. Оплата производится только после завершения монтажа и вашей приёмки работы. Принимаем наличные и банковские карты.' },
  { q: 'Можно ли рассрочку?', a: 'Да, мы работаем с рассрочкой через банки-партнёры. Уточните условия у менеджера при оформлении заказа.' },
]

function toSlug(name: string) {
  const map: Record<string, string> = {
    'Матовый': 'matovye-natyazhnye-potolki',
    'Глянцевый': 'glyancevye-natyazhnye-potolki',
    'Сатиновый': 'satinovye-natyazhnye-potolki',
    'Тканевый': 'tkanevye-natyazhnye-potolki',
    'Фактурный': 'fakturnye-natyazhnye-potolki',
    'Бесшовный': 'besshovnye-natyazhnye-potolki',
    'Гипоаллергенный': 'gipoallergennye-natyazhnye-potolki',
    'Негорючий': 'negoryuchie-natyazhnye-potolki',
  }
  return map[name] ?? name.toLowerCase()
}

function onEnter(el: Element) {
  const e = el as HTMLElement
  e.style.overflow = 'hidden'; e.style.height = '0'
  requestAnimationFrame(() => requestAnimationFrame(() => {
    e.style.transition = 'height .3s ease'; e.style.height = e.scrollHeight + 'px'
  }))
}
function onAfterEnter(el: Element) {
  const e = el as HTMLElement; e.style.height = e.style.overflow = e.style.transition = ''
}
function onLeave(el: Element) {
  const e = el as HTMLElement
  e.style.overflow = 'hidden'; e.style.height = e.scrollHeight + 'px'
  e.getBoundingClientRect(); e.style.transition = 'height .25s ease'; e.style.height = '0'
}
function onAfterLeave(el: Element) {
  const e = el as HTMLElement; e.style.height = e.style.overflow = e.style.transition = ''
}

const schemaOrg = computed(() => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'PriceSpecification',
  name: 'Цены на натяжные потолки ПроПотолок',
  description: `Натяжные потолки в Иркутске от ${basePrice.value} ₽/м²`,
  price: String(basePrice.value),
  priceCurrency: 'RUB',
  eligibleRegion: { '@type': 'Place', name: 'Иркутск' },
}))
</script>

<style scoped>
/* ═══ Общие ═══ */
.pr-pretitle {
  display: inline-block; background: var(--accent); color: #141414;
  font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px;
  margin-bottom: 14px; text-transform: uppercase; letter-spacing: .5px;
}
.pr-pretitle--dark { background: var(--accent); color: var(--dark); }

.pr-section { padding: 64px 0; }
.pr-section--light { background: #fff; }
.pr-section--gray  { background: #f7f7f7; }
.pr-section--dark  { background: #141414; }
.pr-section--white { background: #fff; }

.pr-section-head { text-align: center; margin-bottom: 44px; }
.pr-section-title { font-size: 32px; font-weight: 800; color: var(--dark); margin: 0 0 10px; line-height: 1.2; }
.pr-section-title--light { color: #fff; }
.pr-section-desc { font-size: 15px; color: var(--gray); max-width: 520px; margin: 0 auto; line-height: 1.6; }
.pr-section-desc--light { color: rgba(255,255,255,.45); }

/* ═══ Hero ═══ */
.pr-hero { background: #141414; padding: 52px 0 56px; }
.pr-hero__inner { display: grid; grid-template-columns: 1fr auto; gap: 60px; align-items: center; }
.pr-hero__title { font-size: 40px; font-weight: 900; color: #fff; line-height: 1.15; margin-bottom: 14px; }
.pr-hero__desc  { font-size: 16px; color: rgba(255,255,255,.45); max-width: 560px; line-height: 1.65; margin-bottom: 24px; }

.pr-hero__badges { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 28px; }
.pr-badge {
  display: flex; align-items: center; gap: 7px;
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
  border-radius: 8px; padding: 7px 12px;
  font-size: 13px; font-weight: 600; color: rgba(255,255,255,.7);
}
.pr-badge__icon { color: var(--accent); flex-shrink: 0; }

.pr-hero__cta { display: flex; gap: 12px; flex-wrap: wrap; }
.pr-hero__btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; font-size: 15px; }
.pr-hero__btn:hover { color: var(--dark); }
.pr-hero__btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 26px; font-size: 15px; font-weight: 700;
  font-family: 'Gilroy', sans-serif;
  background: none; border: 2px solid rgba(255,255,255,.2);
  border-radius: 10px; color: #fff; cursor: pointer;
  transition: border-color .15s, color .15s;
}
.pr-hero__btn-outline:hover { border-color: var(--accent); color: var(--accent); }

.pr-hero__stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.pr-stat {
  background: #1e1e1e; border: 1px solid #2a2a2a;
  border-radius: 14px; padding: 18px 20px; text-align: center; min-width: 130px;
}
.pr-stat__val   { font-size: 26px; font-weight: 900; color: var(--accent); font-family: 'Gilroy', sans-serif; line-height: 1; margin-bottom: 5px; }
.pr-stat__label { font-size: 12px; color: rgba(255,255,255,.35); line-height: 1.3; }

/* ═══ Пакеты ═══ */
.pr-packages {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
}
.pr-pkg {
  background: #f7f7f7; border-radius: 20px; padding: 30px 26px;
  border: 2px solid #e8e8e8; position: relative;
  transition: border-color .2s, transform .2s, box-shadow .2s;
  display: flex; flex-direction: column;
}
.pr-pkg:hover { transform: translateY(-4px); box-shadow: 0 8px 28px rgba(0,0,0,.1); }
.pr-pkg.popular {
  background: #fff;
  border-color: var(--pkg-color, var(--accent));
  box-shadow: 0 4px 20px rgba(245,200,0,.15);
}
.pr-pkg__badge {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  background: var(--pkg-color, var(--accent)); color: var(--dark);
  font-size: 12px; font-weight: 800; padding: 4px 16px; border-radius: 20px;
  white-space: nowrap; text-transform: uppercase; letter-spacing: .4px;
}
.pr-pkg__name     { font-size: 22px; font-weight: 900; color: var(--dark); margin-bottom: 4px; }
.pr-pkg__subtitle { font-size: 13px; color: var(--gray); margin-bottom: 18px; }
.pr-pkg__price {
  font-size: 16px; color: var(--gray); margin-bottom: 20px;
}
.pr-pkg__price span { font-size: 36px; font-weight: 900; color: var(--dark); font-family: 'Gilroy', sans-serif; }
.pr-pkg__divider { height: 1px; background: #e8e8e8; margin-bottom: 18px; }
.pr-pkg__features { list-style: none; padding: 0; margin: 0 0 24px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
.pr-pkg__feature  { display: flex; align-items: center; gap: 8px; font-size: 14px; }
.pr-pkg__feature--yes { color: var(--dark); }
.pr-pkg__feature--yes .icon { color: #22c55e; flex-shrink: 0; }
.pr-pkg__feature--no  { color: #ccc; }
.pr-pkg__feature--no  .icon { color: #e0e0e0; flex-shrink: 0; }

.pr-pkg__btn { padding: 13px; font-size: 14px; width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; font-family: 'Gilroy', sans-serif; font-weight: 700; border-radius: 10px; transition: all .15s; }
.nav-btn.pr-pkg__btn { background: var(--accent); color: var(--dark); border: none; }
.nav-btn.pr-pkg__btn:hover { background: var(--accent-hover); }
.pr-pkg__btn--outline { background: none; border: 2px solid #e0e0e0; color: var(--dark); }
.pr-pkg__btn--outline:hover { border-color: var(--accent); }

/* ═══ Табы ═══ */
.pr-tabs { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
.pr-tab {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 9px 20px; background: #fff;
  border: 1.5px solid #e0e0e0; border-radius: 24px;
  font-size: 14px; font-weight: 600; color: var(--gray);
  font-family: 'Gilroy', sans-serif; cursor: pointer;
  transition: all .15s;
}
.pr-tab:hover  { border-color: #bbb; color: var(--dark); }
.pr-tab.active { border-color: var(--accent); color: var(--dark); background: #fffbe6; }

/* ═══ Таблица ═══ */
.pr-table { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 8px rgba(0,0,0,.06); }
.pr-table__head {
  display: grid; grid-template-columns: 180px 1fr 180px 120px;
  padding: 12px 20px; background: var(--dark); gap: 16px;
  font-size: 12px; font-weight: 700; color: rgba(255,255,255,.4);
  text-transform: uppercase; letter-spacing: .4px;
}
.pr-table__row {
  display: grid; grid-template-columns: 180px 1fr 180px 120px;
  padding: 16px 20px; gap: 16px; align-items: center;
  border-bottom: 1px solid #f5f5f5; transition: background .12s;
}
.pr-table__row:last-child { border-bottom: none; }
.pr-table__row:hover { background: #fafafa; }
.pr-table__row.popular { background: #fffbe6; }
.pr-table__row.popular:hover { background: #fff8d6; }

.pr-table__name {
  font-size: 15px; font-weight: 700; color: var(--dark);
  display: flex; align-items: center; gap: 8px;
}
.pr-table__badge {
  background: var(--accent); color: var(--dark);
  font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 5px;
  text-transform: uppercase; letter-spacing: .3px;
}
.pr-table__icon { color: var(--accent); flex-shrink: 0; }
.pr-table__desc { font-size: 13px; color: var(--gray); line-height: 1.5; }
.pr-table__price-val { font-size: 15px; font-weight: 800; color: var(--dark); display: block; }
.pr-table__price-to  { font-size: 12px; color: var(--gray); }
.pr-table__link {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 13px; font-weight: 600; color: var(--gray);
  text-decoration: none; transition: color .15s;
  white-space: nowrap;
}
.pr-table__link:hover { color: var(--dark); }

.pr-table-note {
  display: flex; align-items: flex-start; gap: 8px;
  font-size: 13px; color: var(--gray);
  background: #fff; border-radius: 12px; padding: 14px 18px;
  margin-top: 14px; border-left: 3px solid var(--accent);
}

/* ═══ Скидки за объём ═══ */
.pr-volume-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
  margin-bottom: 20px;
}
.pr-volume-card {
  background: #1e1e1e; border: 1.5px solid #2a2a2a;
  border-radius: 16px; padding: 24px 20px; text-align: center;
  transition: border-color .15s, transform .2s;
}
.pr-volume-card:hover { transform: translateY(-3px); }
.pr-volume-card.highlight { border-color: var(--accent); background: rgba(245,200,0,.06); }
.pr-volume-card__discount { font-size: 48px; font-weight: 900; color: var(--accent); font-family: 'Gilroy', sans-serif; line-height: 1; margin-bottom: 8px; }
.pr-volume-card__range   { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.pr-volume-card__example { font-size: 12px; color: rgba(255,255,255,.35); line-height: 1.4; }
.pr-volume-note { font-size: 13px; color: rgba(255,255,255,.3); text-align: center; }

/* ═══ Примеры ═══ */
.pr-examples { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.pr-example {
  background: #f7f7f7; border-radius: 16px; padding: 24px;
  border: 1.5px solid transparent; transition: border-color .15s;
  display: flex; flex-direction: column; gap: 14px;
}
.pr-example:hover { border-color: var(--accent); }
.pr-example__head { display: flex; align-items: flex-start; gap: 12px; }
.pr-example__icon { color: var(--accent); flex-shrink: 0; margin-top: 2px; }
.pr-example__title  { font-size: 16px; font-weight: 800; color: var(--dark); }
.pr-example__params { font-size: 12px; color: var(--gray); margin-top: 3px; }
.pr-example__rows { display: flex; flex-direction: column; gap: 6px; }
.pr-example__row {
  display: flex; justify-content: space-between; align-items: baseline;
  font-size: 13px; color: var(--gray); gap: 8px;
}
.pr-example__row span:last-child { font-weight: 600; color: var(--dark); white-space: nowrap; }
.pr-example__total {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 12px; border-top: 2px dashed #e0e0e0;
  font-size: 15px; font-weight: 700; color: var(--dark);
}
.pr-example__total span:last-child { font-size: 22px; font-weight: 900; font-family: 'Gilroy', sans-serif; }
.pr-example__calc {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 13px; font-weight: 600; color: var(--gray);
  text-decoration: none; transition: color .15s;
  margin-top: auto;
}
.pr-example__calc:hover { color: var(--dark); }

/* ═══ FAQ ═══ */
.pr-faq { max-width: 780px; margin: 0 auto; display: flex; flex-direction: column; gap: 8px; }
.pr-faq-item {
  background: #fff; border-radius: 14px;
  border: 1.5px solid transparent; overflow: hidden; cursor: pointer;
  transition: border-color .15s;
}
.pr-faq-item.open { border-color: var(--accent); }
.pr-faq-item__q {
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
  padding: 18px 22px; font-size: 15px; font-weight: 700; color: var(--dark);
  user-select: none;
}
.pr-faq-item__arr { color: var(--gray); flex-shrink: 0; }
.pr-faq-item.open .pr-faq-item__arr { color: var(--accent); }
.pr-faq-item__a { padding: 0 22px 18px; font-size: 14px; color: var(--gray); line-height: 1.75; }

/* ═══ SEO ═══ */
.pr-seo { display: grid; grid-template-columns: 1fr 300px; gap: 48px; align-items: start; }
.pr-seo__content h2 { font-size: 24px; font-weight: 800; color: var(--dark); margin-bottom: 14px; }
.pr-seo__content h3 { font-size: 17px; font-weight: 700; color: var(--dark); margin: 22px 0 8px; }
.pr-seo__content p  { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 10px; }
.pr-seo__aside { position: sticky; top: 100px; }
.pr-seo__card { background: #f7f7f7; border-radius: 16px; padding: 24px; border: 1.5px solid #ececec; }
.pr-seo__card-title { font-size: 16px; font-weight: 800; color: var(--dark); margin-bottom: 8px; }
.pr-seo__card-desc  { font-size: 13px; color: var(--gray); line-height: 1.5; margin-bottom: 14px; }
.pr-seo__card-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px; font-size: 14px; }
.pr-seo__card-divider { height: 1px; background: #e0e0e0; margin: 18px 0; }
.pr-seo__card-btn-outline {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 11px; font-size: 14px; font-weight: 700;
  font-family: 'Gilroy', sans-serif; background: none;
  border: 2px solid #e0e0e0; border-radius: 10px; color: var(--dark);
  cursor: pointer; transition: border-color .15s;
}
.pr-seo__card-btn-outline:hover { border-color: var(--accent); }

/* ═══ CTA ═══ */
.pr-cta { background: #141414; padding: 60px 0; }
.pr-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.pr-cta__title { font-size: 30px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.pr-cta__desc  { font-size: 15px; color: rgba(255,255,255,.4); max-width: 460px; }
.pr-cta__btns  { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
.pr-cta__btn   { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; font-size: 15px; }
.pr-cta__btn:hover { color: var(--dark); }
.pr-cta__btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 26px; font-size: 15px; font-weight: 700;
  font-family: 'Gilroy', sans-serif; background: none;
  border: 2px solid rgba(255,255,255,.2); border-radius: 10px;
  color: #fff; cursor: pointer; transition: border-color .15s, color .15s;
}
.pr-cta__btn-outline:hover { border-color: var(--accent); color: var(--accent); }

/* ═══ Responsive ═══ */
@media (max-width: 1100px) {
  .pr-hero__inner { grid-template-columns: 1fr; }
  .pr-hero__stats { grid-template-columns: repeat(4, 1fr); }
  .pr-volume-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 960px) {
  .pr-packages  { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
  .pr-examples  { grid-template-columns: 1fr; }
  .pr-seo       { grid-template-columns: 1fr; }
  .pr-seo__aside { position: static; }
}
@media (max-width: 768px) {
  .pr-table__head,
  .pr-table__row { grid-template-columns: 1fr 1fr; }
  .pr-table__desc,
  .pr-table__action { display: none; }
  .pr-hero__stats { grid-template-columns: repeat(2, 1fr); }
  .pr-hero__title { font-size: 28px; }
  .pr-section-title { font-size: 26px; }
  .pr-cta__inner { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 480px) {
  .pr-volume-grid { grid-template-columns: 1fr 1fr; }
}
</style>
