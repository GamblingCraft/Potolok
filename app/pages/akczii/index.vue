<template>
  <div>

    <!-- Hero -->
    <section class="ak-hero">
      <div class="container ak-hero__inner">
        <div class="ak-hero__content">
          <div class="ak-pretitle">Специальные предложения</div>
          <h1 class="ak-hero__title">Акции и скидки на натяжные потолки</h1>
          <p class="ak-hero__desc">Выгодные условия для новых клиентов, новосёлов, пенсионеров и больших заказов. Все скидки фиксируются в договоре.</p>
          <div class="ak-hero__stats">
            <div class="ak-stat" v-for="s in stats" :key="s.label">
              <div class="ak-stat__val">{{ s.val }}</div>
              <div class="ak-stat__label">{{ s.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Акции -->
    <section class="ak-section">
      <div class="container">
        <div class="ak-section__head">
          <div class="ak-pretitle ak-pretitle--dark">Действующие акции</div>
          <h2 class="ak-section__title">{{ activePromos.length }} актуальных предложения</h2>
        </div>

        <div class="ak-grid">
          <article v-for="promo in activePromos" :key="promo.id" class="ak-card">
            <div class="ak-card__accent" :style="{ background: promo.color }"></div>

            <div class="ak-card__head">
              <div class="ak-card__icon-wrap" :style="{ background: promo.color + '22' }">
                <Icon :name="promo.icon" size="26" :style="{ color: promo.color }"/>
              </div>
              <div class="ak-card__badge" v-if="promo.badge">{{ promo.badge }}</div>
            </div>

            <div class="ak-card__discount">{{ promo.discount }}</div>
            <h3 class="ak-card__title">{{ promo.title }}</h3>
            <p class="ak-card__subtitle">{{ promo.subtitle }}</p>
            <p class="ak-card__desc">{{ promo.description }}</p>

            <ul class="ak-card__conditions">
              <li v-for="c in promo.conditions" :key="c">
                <Icon name="lucide:check" size="13" class="ak-card__check"/>
                {{ c }}
              </li>
            </ul>

            <div class="ak-card__footer">
              <div class="ak-card__date" v-if="promo.dateEnd">
                <Icon name="lucide:clock" size="13"/>
                До {{ formatDate(promo.dateEnd) }}
              </div>
              <div class="ak-card__date ak-card__date--forever" v-else>
                <Icon name="lucide:infinity" size="13"/>
                Бессрочно
              </div>
              <button class="nav-btn ak-card__btn" @click="callbackOpen = true">
                Получить скидку
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Промокоды -->
    <section class="ak-promo-section">
      <div class="container">
        <div class="ak-section__head">
          <div class="ak-pretitle ak-pretitle--dark">Промокоды</div>
          <h2 class="ak-section__title">Введите промокод при расчёте</h2>
          <p class="ak-section__desc">Используйте промокод в калькуляторе или сообщите менеджеру при оформлении заказа</p>
        </div>

        <div class="ak-promo-grid">
          <div
            v-for="promo in activePromoCodes" :key="promo.id"
            class="ak-promo-card"
            :class="{ copied: copiedCode === promo.code }"
            @click="copyCode(promo.code)"
          >
            <div class="ak-promo-card__left">
              <div class="ak-promo-card__code">{{ promo.code }}</div>
              <div class="ak-promo-card__desc">{{ promo.description }}</div>
              <div class="ak-promo-card__cond">{{ promo.conditions }}</div>
            </div>
            <div class="ak-promo-card__right">
              <div class="ak-promo-card__discount">{{ promo.discount }}</div>
              <div class="ak-promo-card__copy">
                <Transition name="copy" mode="out-in">
                  <span v-if="copiedCode === promo.code" key="copied">
                    <Icon name="lucide:check" size="14"/> Скопировано
                  </span>
                  <span v-else key="copy">
                    <Icon name="lucide:copy" size="14"/> Скопировать
                  </span>
                </Transition>
              </div>
            </div>
          </div>
        </div>

        <div class="ak-promo-note">
          <Icon name="lucide:info" size="15"/>
          <span>Промокоды не суммируются между собой и с другими скидками. Один промокод — один заказ.</span>
        </div>
      </div>
    </section>

    <!-- Таблица скидок по объёму -->
    <section class="ak-volume-section">
      <div class="container">
        <div class="ak-section__head">
          <div class="ak-pretitle ak-pretitle--dark">Скидка за объём</div>
          <h2 class="ak-section__title">Чем больше заказ — тем выгоднее</h2>
        </div>
        <div class="ak-volume-table">
          <div class="ak-volume-row" v-for="row in volumeTable" :key="row.range" :class="{ highlight: row.highlight }">
            <div class="ak-volume-row__range">
              <Icon name="lucide:maximize-2" size="16" class="ak-volume-row__icon"/>
              {{ row.range }}
            </div>
            <div class="ak-volume-row__discount">{{ row.discount }}</div>
            <div class="ak-volume-row__save">экономия {{ row.save }}</div>
          </div>
        </div>
        <p class="ak-volume-note">* Скидка рассчитывается от базовой стоимости. Не суммируется с другими акциями.</p>
      </div>
    </section>

    <!-- FAQ скидок -->
    <section class="ak-faq-section">
      <div class="container">
        <div class="ak-section__head">
          <div class="ak-pretitle ak-pretitle--dark">Вопросы об акциях</div>
          <h2 class="ak-section__title">Частые вопросы</h2>
        </div>
        <div class="ak-faq-list">
          <div
            v-for="(faq, i) in faqs" :key="i"
            class="ak-faq-item"
            :class="{ open: openFaq === i }"
            @click="openFaq = openFaq === i ? null : i"
          >
            <div class="ak-faq-q">
              {{ faq.q }}
              <Icon :name="openFaq === i ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="17"/>
            </div>
            <Transition @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave" @after-leave="onAfterLeave">
              <div v-if="openFaq === i" class="ak-faq-a">{{ faq.a }}</div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="ak-cta">
      <div class="container ak-cta__inner">
        <div>
          <h2 class="ak-cta__title">Хотите узнать свою скидку?</h2>
          <p class="ak-cta__desc">Рассчитайте стоимость в калькуляторе или оставьте заявку — менеджер подберёт максимально выгодные условия</p>
        </div>
        <div class="ak-cta__btns">
          <NuxtLink to="/kalkulyator" class="nav-btn ak-cta__btn">
            <Icon name="lucide:calculator" size="16"/>
            Рассчитать со скидкой
          </NuxtLink>
          <button class="ak-cta__btn-outline" @click="callbackOpen = true">
            <Icon name="lucide:phone-call" size="16"/>
            Позвонить
          </button>
        </div>
      </div>
    </section>

    <ModalCallback v-model="callbackOpen" />

  </div>
</template>

<script setup lang="ts">
import { promotions as defaultPromotions, promoCodes as defaultCodes, type Promotion, type PromoCode } from '~/data/promotions'

useHead({
  title: 'Акции и скидки на натяжные потолки в Иркутске | ПроПотолок',
  meta: [
    { name: 'description', content: 'Актуальные акции и скидки на натяжные потолки в Иркутске: 3-й потолок в подарок, скидка 10% новым клиентам, скидки пенсионерам и новосёлам. Промокоды.' },
  ],
})

const { data: promotionsData } = await useAsyncData<Promotion[]>(
  'akczii-promotions',
  () => $fetch<Promotion[]>('/api/cms/promotions'),
  { default: () => defaultPromotions },
)
const { data: promoCodesData } = await useAsyncData<PromoCode[]>(
  'akczii-promo-codes',
  () => $fetch<PromoCode[]>('/api/cms/promo-codes'),
  { default: () => defaultCodes },
)

const callbackOpen = ref(false)
const openFaq = ref<number | null>(null)
const copiedCode = ref<string | null>(null)

const activePromos     = computed(() => (promotionsData.value ?? defaultPromotions).filter(p => p.active))
const activePromoCodes = computed(() => (promoCodesData.value ?? defaultCodes).filter(c => c.active && c.public))

const stats = [
  { val: 'до 20%',      label: 'максимальная скидка' },
  { val: '6',           label: 'действующих акций' },
  { val: 'бессрочно',   label: 'большинство предложений' },
  { val: '0 ₽',         label: 'замер и монтаж' },
]

const volumeTable = [
  { range: 'от 10 до 30 м²',  discount: '−7%',  save: '~1 100 ₽',  highlight: false },
  { range: 'от 30 до 50 м²',  discount: '−10%', save: '~4 700 ₽',  highlight: false },
  { range: 'от 50 до 70 м²',  discount: '−15%', save: '~9 500 ₽',  highlight: true  },
  { range: 'от 70 м²',        discount: '−20%', save: 'от 14 000 ₽', highlight: false },
]

const faqs = [
  { q: 'Можно ли суммировать несколько скидок?', a: 'Нет, скидки не суммируются. Действует одна скидка — наибольшая из доступных вам. Менеджер при расчёте всегда применит самую выгодную для вас.' },
  { q: 'Как воспользоваться промокодом?', a: 'Введите промокод в поле калькулятора на сайте или назовите его менеджеру при оформлении заказа. Скидка по промокоду фиксируется в договоре.' },
  { q: 'Акция «3-й потолок бесплатно» — как она работает?', a: 'При заказе натяжных потолков в трёх или более помещениях одновременно — наименьшее по площади помещение мы устанавливаем бесплатно. Итоговая стоимость рассчитывается индивидуально.' },
  { q: 'До какого числа действуют акции?', a: 'Большинство акций бессрочные — действуют постоянно. Сезонные предложения имеют дату окончания, указанную на карточке. Рекомендуем не откладывать — условия могут измениться.' },
  { q: 'Скидка фиксируется в договоре?', a: 'Да, все скидки и итоговая стоимость фиксируются в договоре до начала монтажа. После подписания договора цена не меняется.' },
]

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

async function copyCode(code: string) {
  try {
    await navigator.clipboard.writeText(code)
    copiedCode.value = code
    setTimeout(() => { copiedCode.value = null }, 2000)
  } catch {
    copiedCode.value = code
    setTimeout(() => { copiedCode.value = null }, 2000)
  }
}

function onEnter(el: Element) {
  const e = el as HTMLElement
  e.style.overflow = 'hidden'; e.style.height = '0'
  requestAnimationFrame(() => requestAnimationFrame(() => {
    e.style.transition = 'height .3s ease'
    e.style.height = e.scrollHeight + 'px'
  }))
}
function onAfterEnter(el: Element) {
  const e = el as HTMLElement; e.style.height = e.style.overflow = e.style.transition = ''
}
function onLeave(el: Element) {
  const e = el as HTMLElement
  e.style.overflow = 'hidden'; e.style.height = e.scrollHeight + 'px'
  e.getBoundingClientRect()
  e.style.transition = 'height .25s ease'; e.style.height = '0'
}
function onAfterLeave(el: Element) {
  const e = el as HTMLElement; e.style.height = e.style.overflow = e.style.transition = ''
}
</script>

<style scoped>
/* ═══ Hero ═══ */
.ak-hero {
  background: #141414;
  padding: 52px 0 56px;
}
.ak-pretitle {
  display: inline-block;
  background: var(--accent); color: #141414;
  font-size: 12px; font-weight: 700;
  padding: 3px 14px; border-radius: 20px;
  margin-bottom: 16px;
  text-transform: uppercase; letter-spacing: .5px;
}
.ak-pretitle--dark { background: var(--accent); color: var(--dark); }

.ak-hero__title {
  font-size: 40px; font-weight: 900; color: #fff;
  line-height: 1.15; margin-bottom: 14px;
}
.ak-hero__desc {
  font-size: 16px; color: rgba(255,255,255,.45);
  max-width: 580px; line-height: 1.65; margin-bottom: 36px;
}
.ak-hero__stats { display: flex; gap: 32px; flex-wrap: wrap; }
.ak-stat__val { font-size: 28px; font-weight: 900; color: var(--accent); font-family: 'Gilroy', sans-serif; }
.ak-stat__label { font-size: 13px; color: rgba(255,255,255,.35); }

/* ═══ Shared ═══ */
.ak-section { background: #f7f7f7; padding: 64px 0; }
.ak-section__head { text-align: center; margin-bottom: 40px; }
.ak-section__title { font-size: 32px; font-weight: 800; color: var(--dark); margin: 0 0 10px; }
.ak-section__desc { font-size: 16px; color: var(--gray); max-width: 520px; margin: 0 auto; line-height: 1.6; }

/* ═══ Promo cards grid ═══ */
.ak-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.ak-card {
  background: #fff;
  border-radius: 18px;
  padding: 28px 26px 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,.07);
  position: relative;
  overflow: hidden;
  display: flex; flex-direction: column; gap: 10px;
  transition: transform .2s, box-shadow .2s;
}
.ak-card:hover { transform: translateY(-4px); box-shadow: 0 8px 28px rgba(0,0,0,.12); }

.ak-card__accent {
  position: absolute; top: 0; left: 0; right: 0;
  height: 4px;
}
.ak-card__head { display: flex; align-items: center; justify-content: space-between; }
.ak-card__icon-wrap {
  width: 48px; height: 48px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
}
.ak-card__badge {
  background: var(--accent); color: var(--dark);
  font-size: 11px; font-weight: 800;
  padding: 3px 10px; border-radius: 20px;
  text-transform: uppercase; letter-spacing: .4px;
}
.ak-card__discount {
  font-size: 38px; font-weight: 900; color: var(--dark);
  font-family: 'Gilroy', sans-serif; line-height: 1;
}
.ak-card__title { font-size: 18px; font-weight: 800; color: var(--dark); line-height: 1.2; }
.ak-card__subtitle { font-size: 13px; color: var(--gray); }
.ak-card__desc { font-size: 14px; color: #555; line-height: 1.6; }

.ak-card__conditions {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 5px;
  flex: 1;
}
.ak-card__conditions li { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--dark); }
.ak-card__check { color: var(--accent); flex-shrink: 0; }

.ak-card__footer {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding-top: 16px; border-top: 1px solid #f0f0f0; margin-top: auto;
  flex-wrap: wrap;
}
.ak-card__date {
  display: flex; align-items: center; gap: 5px;
  font-size: 12px; color: var(--gray);
}
.ak-card__date--forever { color: #22c55e; }
.ak-card__btn {
  padding: 9px 20px; font-size: 13px;
  display: inline-flex; align-items: center; gap: 6px;
  white-space: nowrap;
}
.ak-card__btn:hover { color: var(--dark); }

/* ═══ Промокоды ═══ */
.ak-promo-section { background: #141414; padding: 64px 0; }
.ak-promo-section .ak-section__head { text-align: center; margin-bottom: 36px; }
.ak-promo-section .ak-section__title { color: #fff; }
.ak-promo-section .ak-section__desc { color: rgba(255,255,255,.4); }

.ak-promo-grid { display: flex; flex-direction: column; gap: 12px; max-width: 720px; margin: 0 auto 20px; }

.ak-promo-card {
  display: flex; align-items: center; justify-content: space-between; gap: 20px;
  background: #1e1e1e; border: 1.5px solid #2a2a2a;
  border-radius: 14px; padding: 20px 24px;
  cursor: pointer;
  transition: border-color .15s, background .15s;
  position: relative; overflow: hidden;
}
.ak-promo-card::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0;
  width: 4px; background: var(--accent);
}
.ak-promo-card:hover { border-color: var(--accent); background: rgba(245,200,0,.05); }
.ak-promo-card.copied { border-color: #22c55e; background: rgba(34,197,94,.05); }
.ak-promo-card.copied::before { background: #22c55e; }

.ak-promo-card__left { flex: 1; }
.ak-promo-card__code {
  font-size: 22px; font-weight: 900;
  color: var(--accent); font-family: 'Gilroy', sans-serif;
  letter-spacing: 1px; margin-bottom: 4px;
}
.ak-promo-card.copied .ak-promo-card__code { color: #22c55e; }
.ak-promo-card__desc { font-size: 14px; font-weight: 600; color: #ddd; margin-bottom: 3px; }
.ak-promo-card__cond { font-size: 12px; color: rgba(255,255,255,.35); }

.ak-promo-card__right { text-align: right; flex-shrink: 0; }
.ak-promo-card__discount {
  font-size: 28px; font-weight: 900; color: #fff;
  font-family: 'Gilroy', sans-serif; line-height: 1; margin-bottom: 6px;
}
.ak-promo-card__copy {
  font-size: 12px; font-weight: 600; color: rgba(255,255,255,.4);
  display: flex; align-items: center; gap: 4px; justify-content: flex-end;
}
.ak-promo-card.copied .ak-promo-card__copy { color: #22c55e; }

.ak-promo-note {
  display: flex; align-items: flex-start; gap: 8px;
  font-size: 13px; color: rgba(255,255,255,.3);
  max-width: 720px; margin: 0 auto;
}

.copy-enter-active, .copy-leave-active { transition: all .15s ease; }
.copy-enter-from { opacity: 0; transform: translateY(-4px); }
.copy-leave-to   { opacity: 0; transform: translateY(4px); }

/* ═══ Таблица объёма ═══ */
.ak-volume-section { background: #fff; padding: 64px 0; }
.ak-volume-table { max-width: 680px; margin: 0 auto 16px; display: flex; flex-direction: column; gap: 10px; }
.ak-volume-row {
  display: flex; align-items: center; gap: 0;
  background: #f7f7f7; border-radius: 12px;
  overflow: hidden; border: 1.5px solid transparent;
  transition: border-color .15s;
}
.ak-volume-row:hover { border-color: #e0e0e0; }
.ak-volume-row.highlight { border-color: var(--accent); background: #fffbe6; }
.ak-volume-row__range {
  display: flex; align-items: center; gap: 10px;
  flex: 1; padding: 16px 20px;
  font-size: 15px; font-weight: 600; color: var(--dark);
}
.ak-volume-row__icon { color: var(--gray); flex-shrink: 0; }
.ak-volume-row.highlight .ak-volume-row__icon { color: var(--accent); }
.ak-volume-row__discount {
  padding: 16px 24px;
  font-size: 20px; font-weight: 900; color: var(--dark);
  font-family: 'Gilroy', sans-serif;
  background: rgba(0,0,0,.04);
  min-width: 100px; text-align: center;
}
.ak-volume-row.highlight .ak-volume-row__discount { background: var(--accent); color: var(--dark); }
.ak-volume-row__save {
  padding: 16px 20px;
  font-size: 13px; font-weight: 600; color: #22c55e;
  min-width: 140px; text-align: right;
}
.ak-volume-note { font-size: 13px; color: var(--gray); max-width: 680px; margin: 0 auto; }

/* ═══ FAQ ═══ */
.ak-faq-section { background: #f7f7f7; padding: 64px 0; }
.ak-faq-list { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 8px; }
.ak-faq-item {
  background: #fff; border-radius: 14px;
  border: 1.5px solid transparent; overflow: hidden; cursor: pointer;
  transition: border-color .15s;
}
.ak-faq-item.open { border-color: var(--accent); }
.ak-faq-q {
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
  padding: 18px 22px; font-size: 15px; font-weight: 700; color: var(--dark);
  user-select: none;
}
.ak-faq-a { padding: 0 22px 18px; font-size: 14px; color: var(--gray); line-height: 1.7; }

/* ═══ CTA ═══ */
.ak-cta { background: #141414; padding: 60px 0; }
.ak-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.ak-cta__title { font-size: 30px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.ak-cta__desc { font-size: 15px; color: rgba(255,255,255,.4); max-width: 460px; }
.ak-cta__btns { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
.ak-cta__btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; font-size: 15px; }
.ak-cta__btn:hover { color: var(--dark); }
.ak-cta__btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 26px; font-size: 15px; font-weight: 700;
  font-family: 'Gilroy', sans-serif;
  background: none; border: 2px solid rgba(255,255,255,.2);
  border-radius: 10px; color: #fff; cursor: pointer;
  transition: border-color .15s, color .15s;
}
.ak-cta__btn-outline:hover { border-color: var(--accent); color: var(--accent); }

/* ═══ Responsive ═══ */
@media (max-width: 1024px) { .ak-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) {
  .ak-hero__title { font-size: 28px; }
  .ak-grid { grid-template-columns: 1fr; }
  .ak-section__title { font-size: 24px; }
  .ak-volume-row__save { display: none; }
  .ak-cta__inner { flex-direction: column; align-items: flex-start; }
  .ak-promo-card { flex-direction: column; align-items: flex-start; }
  .ak-promo-card__right { align-self: flex-end; }
}
</style>
