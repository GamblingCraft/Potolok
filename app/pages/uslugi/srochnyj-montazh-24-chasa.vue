<template>
  <div itemscope itemtype="https://schema.org/Service">

    <!-- HERO -->
    <section class="ms-hero">
      <div class="ms-hero__bg" :style="{ backgroundImage: `url('${heroImg}')` }"></div>
      <div class="ms-hero__overlay"></div>
      <div class="container ms-hero__inner">
        <div class="ms-hero__content">
          <div class="ms-pretitle">Экстренный выезд</div>
          <h1 class="ms-hero__title" itemprop="name">
            Срочный монтаж натяжного потолка за&nbsp;24&nbsp;часа в&nbsp;Иркутске
          </h1>
          <p class="ms-hero__price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <meta itemprop="priceCurrency" content="RUB"/>
            <meta itemprop="availability" content="https://schema.org/InStock"/>
            <strong>{{ service.price }}</strong> — выезд в&nbsp;день обращения
          </p>
          <p class="ms-hero__desc" itemprop="description">{{ service.description }}</p>
          <div class="ms-hero__facts">
            <div class="ms-fact" v-for="f in heroFacts" :key="f.text">
              <Icon :name="f.icon" size="15" class="ms-fact__icon"/>{{ f.text }}
            </div>
          </div>
          <form class="ms-hero__form" @submit.prevent="submitHero">
            <input v-model="formName" class="ms-inp" type="text" placeholder="Ваше имя"/>
            <input :value="formPhone" class="ms-inp" type="tel" placeholder="+7 (999) 999-99-99" required @input="formPhone = maskPhone($event)"/>
            <button type="submit" class="nav-btn ms-hero__btn">
              <Icon name="lucide:zap" size="16"/>
              Вызвать срочно
            </button>
          </form>
          <p class="ms-policy">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
        </div>
        <div class="ms-hero__nums">
          <div class="ms-num" v-for="n in heroNums" :key="n.label">
            <div class="ms-num__val">{{ n.val }}</div>
            <div class="ms-num__label">{{ n.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- КОГДА НУЖЕН СРОЧНЫЙ МОНТАЖ -->
    <section class="ms-section ms-cases">
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--dark">Типичные случаи</div>
          <h2 class="ms-title">Когда нужен срочный монтаж потолка</h2>
          <p class="ms-desc">Принимаем заявки круглосуточно. Мастер выезжает в течение 2–4 часов после подтверждения</p>
        </div>
        <div class="ms-cases-grid">
          <div class="ms-case-card" v-for="c in caseCards" :key="c.title">
            <div class="ms-case-card__icon"><Icon :name="c.icon" size="24"/></div>
            <div class="ms-case-card__title">{{ c.title }}</div>
            <div class="ms-case-card__desc">{{ c.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ЧТО ВХОДИТ + САЙДБАР -->
    <section class="ms-section ms-included">
      <div class="container">
        <div class="ms-two-col">
          <div class="ms-two-col__text">
            <div class="ms-pretitle ms-pretitle--dark">Всё включено</div>
            <h2 class="ms-title ms-title--left">Что входит в срочный монтаж</h2>
            <p class="ms-body-text">Срочный монтаж — это тот же полный комплекс работ, что и при стандартном заказе, только с приоритетным выездом. Доплата за срочность составляет +15% к базовой стоимости.</p>
            <div class="ms-include-grid">
              <div class="ms-include-item" v-for="item in includedItems" :key="item.title">
                <div class="ms-include-item__icon"><Icon :name="item.icon" size="20"/></div>
                <div>
                  <div class="ms-include-item__title">{{ item.title }}</div>
                  <div class="ms-include-item__desc">{{ item.desc }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="ms-two-col__aside">
            <div class="ms-aside-card">
              <div class="ms-aside-card__badge">
                <Icon name="lucide:zap" size="14"/>Срочный выезд
              </div>
              <div class="ms-aside-card__title">Позвоните прямо сейчас</div>
              <p class="ms-aside-card__desc">Принимаем заявки ежедневно с 8:00 до 22:00, в экстренных случаях — круглосуточно</p>
              <a :href="'tel:' + site.phoneRaw" class="ms-aside-card__phone">{{ site.phone }}</a>
              <ul class="ms-aside-list">
                <li v-for="i in asideItems" :key="i">
                  <Icon name="lucide:check-circle" size="14" class="ms-check"/>{{ i }}
                </li>
              </ul>
              <button class="nav-btn ms-aside-card__btn" @click="callbackOpen = true">
                <Icon name="lucide:phone-call" size="15"/>
                Заказать звонок
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ЭТАПЫ — HowTo schema -->
    <section class="ms-section ms-steps" itemscope itemtype="https://schema.org/HowTo">
      <meta itemprop="name" content="Как заказать срочный монтаж натяжного потолка в Иркутске"/>
      <meta itemprop="description" content="Процесс срочного монтажа натяжного потолка за 24 часа"/>
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--light">Схема работы</div>
          <h2 class="ms-title ms-title--light">Срочный монтаж за 24 часа — как это работает</h2>
          <p class="ms-desc ms-desc--light">Принимаем заявку — выезжаем — монтируем. Всё чётко и быстро</p>
        </div>
        <div class="ms-steps-grid">
          <div
            class="ms-step"
            v-for="(step, i) in steps" :key="step.title"
            itemprop="step" itemscope itemtype="https://schema.org/HowToStep"
          >
            <meta itemprop="position" :content="String(i + 1)"/>
            <meta itemprop="name" :content="step.title"/>
            <meta itemprop="text" :content="step.desc"/>
            <div class="ms-step__num">{{ i + 1 }}</div>
            <div class="ms-step__icon"><Icon :name="step.icon" size="24"/></div>
            <div class="ms-step__title">{{ step.title }}</div>
            <div class="ms-step__desc">{{ step.desc }}</div>
            <div class="ms-step__time" v-if="step.time">
              <Icon name="lucide:clock" size="12"/>{{ step.time }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ПОЧЕМУ МЫ -->
    <section class="ms-section ms-why">
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--dark">Наши преимущества</div>
          <h2 class="ms-title">Почему иркутяне выбирают ПроПотолок</h2>
        </div>
        <div class="ms-why-grid">
          <div class="ms-why-card" v-for="w in whyCards" :key="w.title">
            <div class="ms-why-card__icon"><Icon :name="w.icon" size="22"/></div>
            <div class="ms-why-card__title">{{ w.title }}</div>
            <div class="ms-why-card__desc">{{ w.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="ms-cta">
      <div class="container ms-cta__inner">
        <div>
          <h2 class="ms-cta__title">Нужен срочный монтаж?</h2>
          <p class="ms-cta__desc">Позвоните или оставьте заявку — выедем в течение 2–4 часов в любой район Иркутска</p>
        </div>
        <div class="ms-cta__btns">
          <button class="nav-btn ms-cta__btn" @click="callbackOpen = true">
            <Icon name="lucide:phone-call" size="16"/>
            Заказать звонок
          </button>
          <NuxtLink to="/kalkulyator" class="ms-cta__outline">
            <Icon name="lucide:calculator" size="16"/>
            Калькулятор
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- FAQ — FAQPage schema -->
    <section class="ms-section ms-faq" itemscope itemtype="https://schema.org/FAQPage">
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--dark">Вопросы и ответы</div>
          <h2 class="ms-title">Часто задаваемые вопросы о срочном монтаже</h2>
        </div>
        <div class="ms-faq-list">
          <div
            class="ms-faq-item"
            v-for="(q, i) in faqItems" :key="q.q"
            itemprop="mainEntity" itemscope itemtype="https://schema.org/Question"
            :class="{ open: faqOpen === i }"
            @click="faqOpen = faqOpen === i ? -1 : i"
          >
            <div class="ms-faq-item__q" itemprop="name">
              {{ q.q }}
              <Icon :name="faqOpen === i ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="18" class="ms-faq-item__arrow"/>
            </div>
            <div class="ms-faq-item__a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
              <div itemprop="text">{{ q.a }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SEO-ТЕКСТ -->
    <section class="ms-section ms-seo">
      <div class="container">
        <div class="ms-seo-inner">
          <div class="ms-seo-content">
            <h2>Срочный монтаж натяжного потолка в Иркутске за 24 часа</h2>
            <p>Компания <strong>ПроПотолок</strong> выполняет срочный монтаж натяжных потолков в Иркутске в течение 24 часов после обращения. Работаем ежедневно с 8:00 до 22:00, в экстренных ситуациях — принимаем заявки круглосуточно.</p>
            <h3>Когда требуется срочный монтаж</h3>
            <p>Срочный заказ актуален при сдаче квартиры в аренду, срочном ремонте перед торжеством, после затопления (когда нужно срочно восстановить внешний вид потолка) или при необходимости быстро завершить объект. Мы понимаем срочность и гарантируем выезд в течение 2–4 часов после подтверждения заявки.</p>
            <h3>Стоимость срочного монтажа</h3>
            <p>Базовая стоимость монтажа {{ _prices?.["base"] ?? 159 }} ₽/м² + надбавка за срочность 15%. Итоговая цена рассчитывается по стандартному прайсу с учётом фактуры, площади и дополнительных работ. Стоимость фиксируется в договоре до начала работ — никаких непредвиденных доплат.</p>
            <h3>Гарантия на срочный монтаж</h3>
            <p>На срочный монтаж распространяются те же условия гарантии, что и на стандартный — 12 лет письменной гарантии на полотно и работы. Качество не снижается из-за скорости: те же мастера, те же материалы, тот же стандарт работы.</p>
          </div>
          <div class="ms-seo-links">
            <div class="ms-seo-links__title">Другие наши услуги</div>
            <nav>
              <NuxtLink v-for="l in seoLinks" :key="l.to" :to="l.to" class="ms-seo-link">
                <Icon name="lucide:arrow-right" size="13"/>{{ l.label }}
              </NuxtLink>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <ModalCallback v-model="callbackOpen" :initial-name="formName" :initial-phone="formPhone" />
  </div>
</template>

<script setup lang="ts">
const site = useSite()
import { services } from '~/data/services'
import { usePageContent } from '~/composables/usePageContent'
import { useCatalogPrices } from '~/composables/useCatalogPrices'

// Данные страницы из pagesInfo.ts + перезаписи из админки
const _prices = await useCatalogPrices()
const _content = await usePageContent('srochnyj-montazh-24-chasa')
const faqItems = ref(_content.faqItems ?? [])
const seoLinks = ref(_content.seoLinks ?? [])

const service = services.find(s => s.slug === 'srochnyj-montazh-24-chasa')!
const heroImg = usePageHero('srochnyj-montazh-24-chasa', service.img)

usePageSeoMeta('srochnyj-montazh-24-chasa')
useHead({ meta: [{ property: 'og:type', content: 'website' }] })

const callbackOpen = ref(false)
const faqOpen = ref(-1)
const formName = ref('')
const formPhone = ref('')

const heroFacts = [
  { icon: 'lucide:zap',           text: 'Выезд за 2–4 часа' },
  { icon: 'lucide:calendar',      text: 'Ежедневно 8:00–22:00' },
  { icon: 'lucide:shield-check',  text: 'Гарантия 12 лет' },
  { icon: 'lucide:banknote',      text: 'Оплата после' },
  { icon: 'lucide:hammer',        text: 'Монтаж за 1 день' },
]

const heroNums = [
  { val: '2–4 ч',  label: 'время выезда мастера' },
  { val: '24 ч',   label: 'принимаем заявки' },
  { val: '+15%',   label: 'надбавка за срочность' },
  { val: '12 лет', label: 'гарантия' },
]

const caseCards = [
  { icon: 'lucide:home',          title: 'Сдача квартиры',          desc: 'Сдаёте квартиру в аренду, а потолок ещё не готов — выполним монтаж за сутки' },
  { icon: 'lucide:party-popper',  title: 'Торжество или мероприятие', desc: 'Завтра праздник, а потолок не сделан — успеем до начала события' },
  { icon: 'lucide:droplets',      title: 'После затопления',         desc: 'Залили соседи, нужно быстро привести квартиру в порядок — приедем в тот же день' },
  { icon: 'lucide:building-2',    title: 'Сдача объекта',            desc: 'Дедлайн по ремонту, и потолок — последнее что осталось — выполним в сжатые сроки' },
  { icon: 'lucide:refresh-cw',    title: 'Замена повреждённого',     desc: 'Порвали или испортили потолок — срочно установим новое полотно' },
  { icon: 'lucide:key',           title: 'Новоселье',                desc: 'Переезд уже запланирован, но ремонт ещё не закончен — поможем уложиться в срок' },
]

const includedItems = [
  { icon: 'lucide:ruler',         title: 'Экспресс-замер',          desc: 'Замерщик приедет в приоритетном порядке и проведёт обмеры в течение 30 минут' },
  { icon: 'lucide:package',       title: 'Полотно из наличия',      desc: 'Держим склад наиболее популярных фактур и цветов — не нужно ждать изготовления' },
  { icon: 'lucide:hammer',        title: 'Монтаж в тот же день',    desc: 'Бригада выезжает сразу после замера и установки — стандартная комната за 2–4 часа' },
  { icon: 'lucide:zap',           title: 'Приоритетный выезд',      desc: 'Ваша заявка обрабатывается первой — выезд в течение 2–4 часов после подтверждения' },
  { icon: 'lucide:shield-check',  title: 'Та же гарантия',          desc: 'Срочность не влияет на качество — гарантия 12 лет, как и при стандартном заказе' },
  { icon: 'lucide:trash-2',       title: 'Уборка после монтажа',    desc: 'Убираем строительный мусор и снимаем защитную плёнку — уходим с чистой квартирой' },
]

const asideItems = [
  'Выезд за 2–4 часа',
  'Ежедневно 8:00–22:00',
  'Монтаж в тот же день',
  'Оплата после приёмки',
  'Гарантия 12 лет',
]

const steps = [
  { icon: 'lucide:phone-call',      title: 'Звонок или заявка',       desc: 'Позвоните или оставьте заявку. Уточним адрес, желаемое время и наличие нужного полотна на складе.',          time: '5 минут' },
  { icon: 'lucide:check-circle',    title: 'Подтверждение',           desc: 'Менеджер перезванивает, подтверждает заказ, озвучивает точную стоимость с учётом срочности.',              time: '15 минут' },
  { icon: 'lucide:car',             title: 'Выезд замерщика',         desc: 'Замерщик выезжает в приоритетном порядке. Производит обмеры и оформляет договор.',                         time: '2–4 часа' },
  { icon: 'lucide:package',         title: 'Подготовка материалов',   desc: 'Полотно берём со склада или нарезаем по размерам. Для нестандартных — ускоренное изготовление.',            time: 'В тот же день' },
  { icon: 'lucide:hammer',          title: 'Монтаж',                  desc: 'Бригада выполняет монтаж. Стандартная комната — 2–4 часа. Всё чисто, без запаха, без мусора.',              time: '2–8 часов' },
  { icon: 'lucide:clipboard-check', title: 'Приёмка и оплата',        desc: 'Вы принимаете работу и производите оплату. Выдаём гарантийный талон и акт выполненных работ.',             time: 'После монтажа' },
]

const whyCards = [
  { icon: 'lucide:zap',           title: 'Выезд за 2–4 часа',          desc: 'Принимаем экстренные заявки и гарантируем выезд бригады в течение 2–4 часов после подтверждения.' },
  { icon: 'lucide:package',       title: 'Склад популярных полотен',    desc: 'Держим запас наиболее востребованных фактур и цветов — не нужно ждать изготовления.' },
  { icon: 'lucide:shield-check',  title: 'Качество без компромиссов',   desc: 'Те же мастера, те же материалы. Срочность не влияет на стандарт работы и гарантию.' },
  { icon: 'lucide:calendar',      title: 'Ежедневно без выходных',      desc: 'Работаем 7 дней в неделю с 8:00 до 22:00. Экстренные выезды — в любое время.' },
  { icon: 'lucide:banknote',      title: 'Фиксированная цена',          desc: 'Стоимость согласуется до начала работ и фиксируется в договоре. Доплата за срочность — только +15%.' },
  { icon: 'lucide:badge-check',   title: 'Гарантия 12 лет',            desc: 'Письменная гарантия на полотно и монтажные работы — такая же, как при стандартном заказе.' },
]

function maskPhone(e: Event) {
  const input = e.target as HTMLInputElement
  let val = input.value.replace(/\D/g, '')
  if (val.startsWith('7') || val.startsWith('8')) val = val.slice(1)
  val = '7' + val.slice(0, 10)
  let r = '+7'
  if (val.length > 1) r += ' (' + val.slice(1, 4)
  if (val.length >= 4) r += ') ' + val.slice(4, 7)
  if (val.length >= 7) r += '-' + val.slice(7, 9)
  if (val.length >= 9) r += '-' + val.slice(9, 11)
  input.value = r; return r
}

function submitHero() { callbackOpen.value = true }
</script>

<style scoped>
.ms-pretitle {
  display: inline-block;
  background: var(--accent); color: var(--dark);
  font-size: 12px; font-weight: 700;
  padding: 3px 14px; border-radius: 20px;
  margin-bottom: 14px;
  text-transform: uppercase; letter-spacing: .5px;
}
.ms-pretitle--dark  { background: var(--accent); color: var(--dark); }
.ms-pretitle--light { background: rgba(245,200,0,.15); color: var(--accent); }
.ms-head { text-align: center; margin-bottom: 44px; }
.ms-title { font-size: 34px; font-weight: 800; color: var(--dark); margin: 0 0 12px; line-height: 1.2; }
.ms-title--left  { text-align: left; }
.ms-title--light { color: #fff; }
.ms-desc  { font-size: 16px; color: var(--gray); max-width: 560px; margin: 0 auto; line-height: 1.6; }
.ms-desc--light { color: rgba(255,255,255,.5); }
.ms-check { color: var(--accent); flex-shrink: 0; }
.ms-body-text { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 24px; }
.ms-section { padding: 72px 0; }

/* HERO */
.ms-hero { position: relative; min-height: 520px; display: flex; align-items: center; }
.ms-hero__bg { position: absolute; inset: 0; background-size: cover; background-position: center; z-index: 0; }
.ms-hero__overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.6) 60%, rgba(0,0,0,.3) 100%); z-index: 1; }
.ms-hero__inner { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr auto; gap: 60px; align-items: center; padding-top: 60px; padding-bottom: 60px; }
.ms-hero__content { max-width: 620px; }
.ms-hero__title { font-size: 44px; font-weight: 900; color: #fff; line-height: 1.15; margin-bottom: 10px; }
.ms-hero__price { font-size: 20px; color: rgba(255,255,255,.7); margin-bottom: 16px; }
.ms-hero__price strong { color: var(--accent); }
.ms-hero__desc  { font-size: 16px; color: rgba(255,255,255,.65); line-height: 1.65; margin-bottom: 24px; }
.ms-hero__facts { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 28px; }
.ms-fact { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,.6); }
.ms-fact__icon { color: var(--accent); }
.ms-hero__form { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; }
.ms-inp { flex: 1; min-width: 160px; padding: 13px 16px; border: none; border-radius: 10px; font-size: 15px; font-family: var(--font); color: var(--dark); outline: none; background: rgba(255,255,255,.95); }
.ms-inp:focus { background: #fff; }
.ms-hero__btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 24px; font-size: 15px; border-radius: 10px; white-space: nowrap; }
.ms-policy { font-size: 11px; color: rgba(255,255,255,.35); margin: 0; }
.ms-hero__nums { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.ms-num { background: rgba(255,255,255,.08); backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,.12); border-radius: 14px; padding: 18px 20px; text-align: center; min-width: 130px; }
.ms-num__val   { font-size: 26px; font-weight: 900; color: var(--accent); line-height: 1; margin-bottom: 5px; }
.ms-num__label { font-size: 12px; color: rgba(255,255,255,.45); line-height: 1.3; }

/* СЛУЧАИ */
.ms-cases { background: #f7f7f7; }
.ms-cases-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.ms-case-card { background: #fff; border-radius: 16px; padding: 26px 22px; border: 1.5px solid transparent; transition: border-color .15s, box-shadow .15s; }
.ms-case-card:hover { border-color: var(--accent); box-shadow: 0 4px 20px rgba(245,200,0,.1); }
.ms-case-card__icon { width: 50px; height: 50px; background: rgba(245,200,0,.12); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--dark); margin-bottom: 14px; transition: background .15s; }
.ms-case-card:hover .ms-case-card__icon { background: var(--accent); }
.ms-case-card__title { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 7px; }
.ms-case-card__desc  { font-size: 13px; color: var(--gray); line-height: 1.6; }

/* ЧТО ВХОДИТ */
.ms-included { background: #fff; }
.ms-two-col { display: grid; grid-template-columns: 1fr 300px; gap: 56px; align-items: start; }
.ms-include-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ms-include-item { display: flex; align-items: flex-start; gap: 14px; padding: 18px; background: #f7f7f7; border-radius: 14px; border: 1.5px solid transparent; transition: border-color .15s; }
.ms-include-item:hover { border-color: var(--accent); }
.ms-include-item__icon { width: 42px; height: 42px; flex-shrink: 0; background: var(--accent); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--dark); }
.ms-include-item__title { font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 4px; }
.ms-include-item__desc  { font-size: 13px; color: var(--gray); line-height: 1.5; }

.ms-aside-card { background: #f7f7f7; border-radius: 18px; padding: 26px; border: 1.5px solid #ececec; position: sticky; top: 100px; }
.ms-aside-card__badge { display: inline-flex; align-items: center; gap: 6px; background: #ff4d4d; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: .4px; }
.ms-aside-card__title { font-size: 18px; font-weight: 800; color: var(--dark); margin-bottom: 10px; }
.ms-aside-card__desc  { font-size: 14px; color: var(--gray); line-height: 1.55; margin-bottom: 14px; }
.ms-aside-card__phone { display: block; font-size: 22px; font-weight: 900; color: var(--dark); font-family: var(--font); margin-bottom: 18px; transition: color .15s; }
.ms-aside-card__phone:hover { color: var(--accent); }
.ms-aside-list { list-style: none; padding: 0; margin: 0 0 20px; display: flex; flex-direction: column; gap: 9px; }
.ms-aside-list li { display: flex; align-items: center; gap: 9px; font-size: 14px; color: #444; }
.ms-aside-card__btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px; font-size: 14px; }

/* ═══ ЭТАПЫ ═══ */
.ms-steps { background: #141414; }
.ms-steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.ms-step { overflow: hidden; background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 18px; padding: 26px 22px; position: relative; transition: border-color .2s; }
.ms-step:hover { border-color: var(--accent); }
.ms-step__num {
  position: absolute; bottom: -60px; right: -6px;
  font-size: 200px; font-weight: 900; font-family: var(--font);
  line-height: 1; color: transparent;
  -webkit-text-stroke: 2px var(--accent); text-stroke: 2px var(--accent);
  opacity: .2; user-select: none;
}
.ms-step__icon { width: 50px; height: 50px; background: rgba(245,200,0,.12); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--accent); margin-bottom: 16px; transition: background .2s; }
.ms-step:hover .ms-step__icon { background: var(--accent); color: var(--dark); }
.ms-step__title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.ms-step__desc  { font-size: 13px; color: rgba(255,255,255,.45); line-height: 1.6; margin-bottom: 12px; }
.ms-step__time  { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; color: var(--accent); background: rgba(245,200,0,.1); padding: 3px 10px; border-radius: 20px; }

/* ═══ ПОЧЕМУ МЫ ═══ */
.ms-why { background: #f7f7f7; }
.ms-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.ms-why-card { background: #fff; border-radius: 16px; padding: 26px 22px; border: 1.5px solid transparent; transition: border-color .15s, box-shadow .15s; }
.ms-why-card:hover { border-color: var(--accent); box-shadow: 0 4px 20px rgba(245,200,0,.1); }
.ms-why-card__icon { width: 50px; height: 50px; background: var(--accent); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--dark); margin-bottom: 14px; }
.ms-why-card__title { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 7px; }
.ms-why-card__desc  { font-size: 13px; color: var(--gray); line-height: 1.6; }

/* ═══ FAQ ═══ */
.ms-faq { background: #f7f7f7; }
.ms-faq-list { display: flex; flex-direction: column; gap: 10px; max-width: 860px; margin: 0 auto; }
.ms-faq-item { background: #fff; border-radius: 14px; border: 1.5px solid #eee; overflow: hidden; cursor: pointer; transition: border-color .15s; }
.ms-faq-item.open { border-color: var(--accent); }
.ms-faq-item__q { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 22px; font-size: 15px; font-weight: 700; color: var(--dark); user-select: none; }
.ms-faq-item__arrow { flex-shrink: 0; color: var(--gray); }
.ms-faq-item.open .ms-faq-item__arrow { color: var(--accent); }
.ms-faq-item__a { max-height: 0; overflow: hidden; transition: max-height .3s ease, padding .3s; font-size: 14px; color: #555; line-height: 1.7; padding: 0 22px; }
.ms-faq-item.open .ms-faq-item__a { max-height: 300px; padding: 0 22px 18px; }

/* ═══ SEO ═══ */
.ms-seo { background: #fff; }
.ms-seo-inner { display: grid; grid-template-columns: 1fr 240px; gap: 56px; align-items: start; }
.ms-seo-content h2 { font-size: 22px; font-weight: 800; color: var(--dark); margin: 0 0 14px; }
.ms-seo-content h3 { font-size: 16px; font-weight: 700; color: var(--dark); margin: 20px 0 8px; }
.ms-seo-content p  { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 10px; }
.ms-seo-content strong { color: var(--dark); }
.ms-seo-links { position: sticky; top: 100px; }
.ms-seo-links__title { font-size: 14px; font-weight: 800; color: var(--dark); margin-bottom: 14px; text-transform: uppercase; letter-spacing: .4px; }
.ms-seo-link { display: flex; align-items: center; gap: 7px; padding: 9px 0; font-size: 14px; font-weight: 500; color: var(--gray); text-decoration: none; border-bottom: 1px solid #f0f0f0; transition: color .15s, padding-left .15s; }
.ms-seo-link:hover { color: var(--dark); padding-left: 4px; }

/* ═══ CTA ═══ */
.ms-cta { background: #141414; padding: 64px 0; }
.ms-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.ms-cta__title { font-size: 30px; font-weight: 900; color: #fff; margin-bottom: 8px; }
.ms-cta__desc  { font-size: 15px; color: rgba(255,255,255,.4); max-width: 440px; }
.ms-cta__btns  { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
.ms-cta__btn   { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; font-size: 15px; }
.ms-cta__outline { display: inline-flex; align-items: center; gap: 8px; padding: 13px 26px; font-size: 15px; font-weight: 700; font-family: var(--font); background: none; border: 2px solid rgba(255,255,255,.2); border-radius: 10px; color: #fff; cursor: pointer; text-decoration: none; transition: border-color .15s, color .15s; }
.ms-cta__outline:hover { border-color: var(--accent); color: var(--accent); }

/* ═══ Responsive ═══ */
@media (max-width: 1100px) {
  .ms-hero__inner { grid-template-columns: 1fr; }
  .ms-hero__nums  { grid-template-columns: repeat(4, 1fr); }
  .ms-steps-grid  { grid-template-columns: repeat(2, 1fr); }
  .ms-why-grid    { grid-template-columns: repeat(2, 1fr); }
  .ms-cases-grid  { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 860px) {
  .ms-two-col    { grid-template-columns: 1fr; }
  .ms-aside-card { position: static; }
  .ms-seo-inner  { grid-template-columns: 1fr; }
  .ms-seo-links  { position: static; }
}
@media (max-width: 640px) {
  .ms-hero__title { font-size: 30px; }
  .ms-hero__nums  { grid-template-columns: repeat(2, 1fr); }
  .ms-hero__form  { flex-direction: column; }
  .ms-inp, .ms-hero__btn { width: 100%; }
  .ms-cases-grid  { grid-template-columns: 1fr; }
  .ms-include-grid { grid-template-columns: 1fr; }
  .ms-steps-grid  { grid-template-columns: 1fr; }
  .ms-why-grid    { grid-template-columns: 1fr; }
  .ms-title       { font-size: 26px; }
  .ms-cta__inner  { flex-direction: column; align-items: flex-start; }
}
</style>
