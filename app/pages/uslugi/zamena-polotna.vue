<template>
  <div itemscope itemtype="https://schema.org/Service">
    <section class="ms-hero">
      <div class="ms-hero__bg" :style="{ backgroundImage: `url('${heroImg}')` }"></div>
      <div class="ms-hero__overlay"></div>
      <div class="container ms-hero__inner">
        <div class="ms-hero__content">
          <div class="ms-pretitle">Профиль остаётся</div>
          <h1 class="ms-hero__title" itemprop="name">Замена натяжного полотна в&nbsp;Иркутске</h1>
          <p class="ms-hero__price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <meta itemprop="price" :content="String(_prices?.['base'] ?? 159)"/><meta itemprop="priceCurrency" content="RUB"/><meta itemprop="availability" content="https://schema.org/InStock"/>
            <strong>{{ service.price }}</strong> — профиль и конструкция сохраняются
          </p>
          <p class="ms-hero__desc" itemprop="description">{{ service.description }}</p>
          <div class="ms-hero__facts">
            <div class="ms-fact" v-for="f in heroFacts" :key="f.text"><Icon :name="f.icon" size="15" class="ms-fact__icon"/>{{ f.text }}</div>
          </div>
          <form class="ms-hero__form" @submit.prevent="submitHero">
            <input v-model="formName" class="ms-inp" type="text" placeholder="Ваше имя"/>
            <input :value="formPhone" class="ms-inp" type="tel" placeholder="+7 (999) 999-99-99" required @input="formPhone = maskPhone($event)"/>
            <button type="submit" class="nav-btn ms-hero__btn"><Icon name="lucide:refresh-cw" size="16"/>Вызвать мастера</button>
          </form>
          <p class="ms-policy">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
        </div>
        <div class="ms-hero__nums">
          <div class="ms-num" v-for="n in heroNums" :key="n.label"><div class="ms-num__val">{{ n.val }}</div><div class="ms-num__label">{{ n.label }}</div></div>
        </div>
      </div>
    </section>

    <!-- КОГДА НУЖНА ЗАМЕНА -->
    <section class="ms-section ms-cases">
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--dark">Когда нужна замена</div>
          <h2 class="ms-title">В каких случаях меняют натяжное полотно</h2>
          <p class="ms-desc">Профиль и конструкция остаются — платите только за новое полотно и работу</p>
        </div>
        <div class="ms-cases-grid">
          <div class="ms-case-card" v-for="c in caseCards" :key="c.title">
            <div class="ms-case-card__icon"><Icon :name="c.icon" size="22"/></div>
            <div class="ms-case-card__title">{{ c.title }}</div>
            <div class="ms-case-card__desc">{{ c.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ЧТО ВХОДИТ -->
    <section class="ms-section ms-included">
      <div class="container">
        <div class="ms-two-col">
          <div class="ms-two-col__text">
            <div class="ms-pretitle ms-pretitle--dark">Всё включено</div>
            <h2 class="ms-title ms-title--left">Что входит в замену полотна</h2>
            <p class="ms-body-text">Замена полотна дешевле полного монтажа: профиль и конструкция уже есть. Мастер снимет старое полотно, при необходимости очистит профиль и установит новое. Любая фактура и цвет из каталога.</p>
            <div class="ms-include-grid">
              <div class="ms-include-item" v-for="item in includedItems" :key="item.title">
                <div class="ms-include-item__icon"><Icon :name="item.icon" size="20"/></div>
                <div><div class="ms-include-item__title">{{ item.title }}</div><div class="ms-include-item__desc">{{ item.desc }}</div></div>
              </div>
            </div>
          </div>
          <div class="ms-two-col__aside">
            <div class="ms-aside-card">
              <div class="ms-aside-card__title">Рассчитать стоимость</div>
              <p class="ms-aside-card__desc">Укажите площадь и фактуру — рассчитаем стоимость замены</p>
              <ul class="ms-aside-list">
                <li v-for="i in asideItems" :key="i"><Icon name="lucide:check-circle" size="14" class="ms-check"/>{{ i }}</li>
              </ul>
              <button class="nav-btn ms-aside-card__btn" @click="callbackOpen = true"><Icon name="lucide:phone-call" size="15"/>Заказать звонок</button>
              <NuxtLink to="/kalkulyator" class="ms-aside-card__calc"><Icon name="lucide:calculator" size="14"/>Рассчитать онлайн</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ЭТАПЫ -->
    <section class="ms-section ms-steps" itemscope itemtype="https://schema.org/HowTo">
      <meta itemprop="name" content="Как происходит замена натяжного полотна"/>
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--light">Процесс</div>
          <h2 class="ms-title ms-title--light">Этапы замены натяжного полотна</h2>
          <p class="ms-desc ms-desc--light">Быстро и аккуратно — без демонтажа конструкции</p>
        </div>
        <div class="ms-steps-grid ms-steps-grid--4">
          <div class="ms-step" v-for="(step, i) in steps" :key="step.title" itemprop="step" itemscope itemtype="https://schema.org/HowToStep">
            <meta itemprop="position" :content="String(i + 1)"/><meta itemprop="name" :content="step.title"/><meta itemprop="text" :content="step.desc"/>
            <div class="ms-step__num">{{ i + 1 }}</div>
            <div class="ms-step__icon"><Icon :name="step.icon" size="24"/></div>
            <div class="ms-step__title">{{ step.title }}</div>
            <div class="ms-step__desc">{{ step.desc }}</div>
            <div class="ms-step__time" v-if="step.time"><Icon name="lucide:clock" size="12"/>{{ step.time }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ПОЧЕМУ МЫ -->
    <section class="ms-section ms-why">
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--dark">Почему мы</div>
          <h2 class="ms-title">Замена полотна с гарантией</h2>
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
          <h2 class="ms-cta__title">Нужна замена полотна?</h2>
          <p class="ms-cta__desc">Приедем в удобное время — заменим быстро и качественно. Все фактуры и цвета в наличии</p>
        </div>
        <div class="ms-cta__btns">
          <button class="nav-btn ms-cta__btn" @click="callbackOpen = true"><Icon name="lucide:phone-call" size="16"/>Заказать звонок</button>
          <NuxtLink to="/kalkulyator" class="ms-cta__outline"><Icon name="lucide:calculator" size="16"/>Калькулятор</NuxtLink>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="ms-section ms-faq" itemscope itemtype="https://schema.org/FAQPage">
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--dark">Вопросы и ответы</div>
          <h2 class="ms-title">Частые вопросы о замене полотна</h2>
        </div>
        <div class="ms-faq-list">
          <div class="ms-faq-item" v-for="(q, i) in faqItems" :key="q.q" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" :class="{ open: faqOpen === i }" @click="faqOpen = faqOpen === i ? -1 : i">
            <div class="ms-faq-item__q" itemprop="name">{{ q.q }}<Icon :name="faqOpen === i ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="18" class="ms-faq-item__arrow"/></div>
            <div class="ms-faq-item__a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer"><div itemprop="text">{{ q.a }}</div></div>
          </div>
        </div>
      </div>
    </section>

    <!-- SEO -->
    <section class="ms-section ms-seo">
      <div class="container">
        <div class="ms-seo-inner">
          <div class="ms-seo-content">
            <h2>Замена натяжного полотна в Иркутске</h2>
            <p>Компания <strong>ПроПотолок</strong> выполняет замену натяжного полотна с сохранением существующего профиля и конструкции. Это значительно дешевле полного монтажа — вы платите только за новое полотно и работу по его установке.</p>
            <h3>Замена или ремонт — что выбрать?</h3>
            <p>Если полотно имеет небольшой дефект (провисание, прокол) — часто достаточно ремонта. При серьёзных повреждениях, желании сменить цвет или фактуру — рекомендуем замену. Мастер оценит на месте и предложит оптимальный вариант.</p>
            <h3>Совместимость с существующим профилем</h3>
            <p>Новое полотно устанавливается в существующий профиль любого производителя. В редких случаях профиль требует замены — мастер предупредит об этом заранее, и вы сами решите, менять ли его.</p>
            <h3>Выбор нового полотна</h3>
            <p>При замене вы можете выбрать любую фактуру и цвет из каталога — матовую, глянцевую, сатиновую или тканевую. Замерщик привезёт образцы и поможет с выбором прямо у вас дома.</p>
          </div>
          <div class="ms-seo-links">
            <div class="ms-seo-links__title">Другие услуги</div>
            <nav>
              <NuxtLink v-for="l in seoLinks" :key="l.to" :to="l.to" class="ms-seo-link"><Icon name="lucide:arrow-right" size="13"/>{{ l.label }}</NuxtLink>
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
const _content = await usePageContent('zamena-polotna')
const faqItems = ref(_content.faqItems ?? [])
const seoLinks = ref(_content.seoLinks ?? [])
const service = services.find(s => s.slug === 'zamena-polotna')!
const heroImg = usePageHero('zamena-polotna', service.img)

usePageSeoMeta('zamena-polotna')
useHead({ meta: [{ property: 'og:type', content: 'website' }] })

const callbackOpen = ref(false)
const faqOpen = ref(-1)
const formName = ref('')
const formPhone = ref('')

const heroFacts = [
  { icon: 'lucide:refresh-cw',   text: 'Профиль остаётся' },
  { icon: 'lucide:palette',      text: '80+ цветов и фактур' },
  { icon: 'lucide:clock',        text: '2–5 часов работы' },
  { icon: 'lucide:shield-check', text: 'Гарантия 12 лет' },
  { icon: 'lucide:banknote',     text: 'От ' + (_prices.value?.['base'] ?? 159) + ' ₽/м²' },
]
const heroNums = [
  { val: (_prices.value?.['base'] ?? 159) + ' ₽',  label: 'от, за м²' },
  { val: '2–5 ч',  label: 'время замены' },
  { val: '80+',    label: 'вариантов полотна' },
  { val: '12 лет', label: 'гарантия' },
]
const caseCards = [
  { icon: 'lucide:scissors',     title: 'Повреждено полотно',       desc: 'Порыв, прокол или разрез, который нельзя отремонтировать' },
  { icon: 'lucide:palette',      title: 'Хотите сменить цвет',      desc: 'Надоел старый цвет или фактура — меняем полотно под новый интерьер' },
  { icon: 'lucide:droplets',     title: 'После сильного затопления', desc: 'Тканевое полотно или сильно повреждённое ПВХ требуют замены' },
  { icon: 'lucide:clock',        title: 'Старое полотно пожелтело', desc: 'Потемнение или пожелтение от возраста и ультрафиолета' },
  { icon: 'lucide:move',         title: 'Провисание полотна',       desc: 'Если полотно утратило эластичность и не поддаётся заправке' },
  { icon: 'lucide:sparkles',     title: 'Обновление интерьера',     desc: 'Ремонт закончен, хочется свежий потолок — быстрая замена без шума и пыли' },
]
const includedItems = [
  { icon: 'lucide:package',      title: 'Снятие старого полотна',  desc: 'Аккуратно извлекаем старое полотно из профиля, не повреждая конструкцию' },
  { icon: 'lucide:sparkles',     title: 'Подготовка профиля',      desc: 'Осматриваем и при необходимости очищаем профиль перед установкой нового полотна' },
  { icon: 'lucide:hammer',       title: 'Монтаж нового полотна',   desc: 'Устанавливаем новое полотно выбранной фактуры и цвета. Работаем методом холодного натяжения' },
  { icon: 'lucide:shield-check', title: 'Гарантия 12 лет',         desc: 'На новое полотно и работу выдаём письменную гарантию 12 лет' },
]
const asideItems = [
  'Профиль и конструкция остаются',
  'Все фактуры и цвета',
  'Работаем без предоплаты',
  'Гарантия 12 лет',
  'Вывоз старого полотна',
]
const steps = [
  { icon: 'lucide:phone-call',  title: 'Заявка',          desc: 'Оставьте заявку. Уточним площадь, фактуру и согласуем удобное время.', time: '5 минут' },
  { icon: 'lucide:package',     title: 'Снятие старого',  desc: 'Мастер аккуратно снимает старое полотно, сохраняя профиль.', time: '30–60 минут' },
  { icon: 'lucide:hammer',      title: 'Установка нового', desc: 'Устанавливаем новое полотно. Прорезаем отверстия для светильников.', time: '1–3 часа' },
  { icon: 'lucide:check-circle', title: 'Приёмка',        desc: 'Вы осматриваете результат, подписываете акт. Выдаём гарантию.', time: 'После работы' },
]
const whyCards = [
  { icon: 'lucide:banknote',     title: 'Дешевле нового монтажа',  desc: 'Профиль уже есть — платите только за полотно и работу. Экономия до 40% по сравнению с полным монтажом.' },
  { icon: 'lucide:palette',      title: 'Все варианты полотен',    desc: 'Матовые, глянцевые, сатиновые, тканевые — более 80 цветов. Привозим образцы на замер.' },
  { icon: 'lucide:shield-check', title: 'Гарантия 12 лет',        desc: 'На новое полотно и монтажные работы — полная письменная гарантия.' },
  { icon: 'lucide:clock',        title: 'Быстро',                  desc: 'Замена полотна в стандартной комнате занимает 2–5 часов — в тот же день.' },
  { icon: 'lucide:badge-check',  title: 'Любой профиль',           desc: 'Устанавливаем новое полотно в профиль любого производителя без замены конструкции.' },
  { icon: 'lucide:trash-2',      title: 'Вывозим старое полотно',  desc: 'Забираем снятое полотно и упаковку — помещение остаётся чистым.' },
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
.ms-pretitle { display: inline-block; background: var(--accent); color: var(--dark); font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: .5px; }
.ms-pretitle--dark  { background: var(--accent); color: var(--dark); }
.ms-pretitle--light { background: rgba(245,200,0,.15); color: var(--accent); }
.ms-head { text-align: center; margin-bottom: 44px; }
.ms-title { font-size: 34px; font-weight: 800; color: var(--dark); margin: 0 0 12px; line-height: 1.2; }
.ms-title--left { text-align: left; } .ms-title--light { color: #fff; }
.ms-desc { font-size: 16px; color: var(--gray); max-width: 560px; margin: 0 auto; line-height: 1.6; }
.ms-desc--light { color: rgba(255,255,255,.5); }
.ms-check { color: var(--accent); flex-shrink: 0; }
.ms-body-text { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 24px; }
.ms-section { padding: 72px 0; }
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
.ms-cases { background: #f7f7f7; }
.ms-cases-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.ms-case-card { background: #fff; border-radius: 16px; padding: 24px 20px; border: 1.5px solid transparent; transition: border-color .15s, box-shadow .15s; }
.ms-case-card:hover { border-color: var(--accent); box-shadow: 0 4px 20px rgba(245,200,0,.1); }
.ms-case-card__icon { width: 46px; height: 46px; background: rgba(245,200,0,.12); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--dark); margin-bottom: 12px; transition: background .15s; }
.ms-case-card:hover .ms-case-card__icon { background: var(--accent); }
.ms-case-card__title { font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 6px; }
.ms-case-card__desc  { font-size: 13px; color: var(--gray); line-height: 1.6; }
.ms-included { background: #fff; }
.ms-two-col { display: grid; grid-template-columns: 1fr 300px; gap: 56px; align-items: start; }
.ms-include-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ms-include-item { display: flex; align-items: flex-start; gap: 14px; padding: 18px; background: #f7f7f7; border-radius: 14px; border: 1.5px solid transparent; transition: border-color .15s; }
.ms-include-item:hover { border-color: var(--accent); }
.ms-include-item__icon { width: 42px; height: 42px; flex-shrink: 0; background: var(--accent); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--dark); }
.ms-include-item__title { font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 4px; }
.ms-include-item__desc  { font-size: 13px; color: var(--gray); line-height: 1.5; }
.ms-aside-card { background: #f7f7f7; border-radius: 18px; padding: 26px; border: 1.5px solid #ececec; position: sticky; top: 100px; }
.ms-aside-card__title { font-size: 18px; font-weight: 800; color: var(--dark); margin-bottom: 10px; }
.ms-aside-card__desc  { font-size: 14px; color: var(--gray); line-height: 1.55; margin-bottom: 18px; }
.ms-aside-list { list-style: none; padding: 0; margin: 0 0 20px; display: flex; flex-direction: column; gap: 9px; }
.ms-aside-list li { display: flex; align-items: center; gap: 9px; font-size: 14px; color: #444; }
.ms-aside-card__btn  { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px; font-size: 14px; margin-bottom: 10px; }
.ms-aside-card__calc { display: flex; align-items: center; justify-content: center; gap: 7px; font-size: 14px; font-weight: 600; color: var(--gray); text-decoration: none; transition: color .15s; }
.ms-aside-card__calc:hover { color: var(--dark); }
.ms-steps { background: #141414; }
.ms-steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.ms-steps-grid--4 { grid-template-columns: repeat(4, 1fr); }
.ms-step { background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 18px; padding: 26px 22px; position: relative; overflow: hidden; overflow: hidden; transition: border-color .2s; }
.ms-step:hover { border-color: var(--accent); }
.ms-step__num { position: absolute; bottom: -60px; right: -6px; font-size: 200px; font-weight: 900; font-family: var(--font); line-height: 1; color: transparent; -webkit-text-stroke: 2px var(--accent); text-stroke: 2px var(--accent); opacity: .2; user-select: none; }
.ms-step__icon { width: 50px; height: 50px; background: rgba(245,200,0,.12); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--accent); margin-bottom: 16px; transition: background .2s; }
.ms-step:hover .ms-step__icon { background: var(--accent); color: var(--dark); }
.ms-step__title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.ms-step__desc  { font-size: 13px; color: rgba(255,255,255,.45); line-height: 1.6; margin-bottom: 12px; }
.ms-step__time  { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; color: var(--accent); background: rgba(245,200,0,.1); padding: 3px 10px; border-radius: 20px; }
.ms-why { background: #f7f7f7; }
.ms-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.ms-why-card { background: #fff; border-radius: 16px; padding: 26px 22px; border: 1.5px solid transparent; transition: border-color .15s, box-shadow .15s; }
.ms-why-card:hover { border-color: var(--accent); box-shadow: 0 4px 20px rgba(245,200,0,.1); }
.ms-why-card__icon { width: 50px; height: 50px; background: var(--accent); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--dark); margin-bottom: 14px; }
.ms-why-card__title { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 7px; }
.ms-why-card__desc  { font-size: 13px; color: var(--gray); line-height: 1.6; }
.ms-cta { background: #141414; padding: 64px 0; }
.ms-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.ms-cta__title { font-size: 30px; font-weight: 900; color: #fff; margin-bottom: 8px; }
.ms-cta__desc  { font-size: 15px; color: rgba(255,255,255,.4); max-width: 440px; }
.ms-cta__btns  { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
.ms-cta__btn   { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; font-size: 15px; }
.ms-cta__outline { display: inline-flex; align-items: center; gap: 8px; padding: 13px 26px; font-size: 15px; font-weight: 700; font-family: var(--font); background: none; border: 2px solid rgba(255,255,255,.2); border-radius: 10px; color: #fff; cursor: pointer; text-decoration: none; transition: border-color .15s, color .15s; }
.ms-cta__outline:hover { border-color: var(--accent); color: var(--accent); }
.ms-faq { background: #fff; }
.ms-faq-list { display: flex; flex-direction: column; gap: 10px; max-width: 860px; margin: 0 auto; }
.ms-faq-item { background: #f7f7f7; border-radius: 14px; border: 1.5px solid #eee; overflow: hidden; cursor: pointer; transition: border-color .15s; }
.ms-faq-item.open { border-color: var(--accent); }
.ms-faq-item__q { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 22px; font-size: 15px; font-weight: 700; color: var(--dark); user-select: none; }
.ms-faq-item__arrow { flex-shrink: 0; color: var(--gray); }
.ms-faq-item.open .ms-faq-item__arrow { color: var(--accent); }
.ms-faq-item__a { max-height: 0; overflow: hidden; transition: max-height .3s ease, padding .3s; font-size: 14px; color: #555; line-height: 1.7; padding: 0 22px; }
.ms-faq-item.open .ms-faq-item__a { max-height: 300px; padding: 0 22px 18px; }
.ms-seo { background: #f7f7f7; }
.ms-seo-inner { display: grid; grid-template-columns: 1fr 240px; gap: 56px; align-items: start; }
.ms-seo-content h2 { font-size: 22px; font-weight: 800; color: var(--dark); margin: 0 0 14px; }
.ms-seo-content h3 { font-size: 16px; font-weight: 700; color: var(--dark); margin: 20px 0 8px; }
.ms-seo-content p  { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 10px; }
.ms-seo-content strong { color: var(--dark); }
.ms-seo-links { position: sticky; top: 100px; }
.ms-seo-links__title { font-size: 14px; font-weight: 800; color: var(--dark); margin-bottom: 14px; text-transform: uppercase; letter-spacing: .4px; }
.ms-seo-link { display: flex; align-items: center; gap: 7px; padding: 9px 0; font-size: 14px; font-weight: 500; color: var(--gray); text-decoration: none; border-bottom: 1px solid #e8e8e8; transition: color .15s, padding-left .15s; }
.ms-seo-link:hover { color: var(--dark); padding-left: 4px; }
@media (max-width: 1100px) { .ms-hero__inner { grid-template-columns: 1fr; } .ms-hero__nums { grid-template-columns: repeat(4, 1fr); } .ms-cases-grid { grid-template-columns: repeat(2, 1fr); } .ms-steps-grid--4 { grid-template-columns: repeat(2, 1fr); } .ms-why-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 860px) { .ms-two-col { grid-template-columns: 1fr; } .ms-aside-card { position: static; } .ms-seo-inner { grid-template-columns: 1fr; } .ms-seo-links { position: static; } }
@media (max-width: 640px) { .ms-hero__title { font-size: 30px; } .ms-hero__nums { grid-template-columns: repeat(2, 1fr); } .ms-hero__form { flex-direction: column; } .ms-inp, .ms-hero__btn { width: 100%; } .ms-cases-grid { grid-template-columns: 1fr; } .ms-include-grid { grid-template-columns: 1fr; } .ms-steps-grid--4 { grid-template-columns: 1fr; } .ms-why-grid { grid-template-columns: 1fr; } .ms-title { font-size: 26px; } .ms-cta__inner { flex-direction: column; align-items: flex-start; } }
</style>
