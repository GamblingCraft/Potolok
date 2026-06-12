<template>
  <div itemscope itemtype="https://schema.org/Service">

    <section class="ms-hero">
      <div class="ms-hero__bg" :style="{ backgroundImage: `url('${service.img}')` }"></div>
      <div class="ms-hero__overlay"></div>
      <div class="container ms-hero__inner">
        <div class="ms-hero__content">
          <div class="ms-pretitle">Аккуратно и быстро</div>
          <h1 class="ms-hero__title" itemprop="name">Демонтаж натяжного потолка в&nbsp;Иркутске</h1>
          <p class="ms-hero__price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <meta itemprop="price" content="80"/><meta itemprop="priceCurrency" content="RUB"/><meta itemprop="availability" content="https://schema.org/InStock"/>
            <strong>{{ service.price }}</strong> — любой производитель
          </p>
          <p class="ms-hero__desc" itemprop="description">{{ service.description }}</p>
          <div class="ms-hero__facts">
            <div class="ms-fact" v-for="f in heroFacts" :key="f.text"><Icon :name="f.icon" size="15" class="ms-fact__icon"/>{{ f.text }}</div>
          </div>
          <form class="ms-hero__form" @submit.prevent="submitHero">
            <input v-model="formName" class="ms-inp" type="text" placeholder="Ваше имя"/>
            <input :value="formPhone" class="ms-inp" type="tel" placeholder="+7 (999) 999-99-99" required @input="formPhone = maskPhone($event)"/>
            <button type="submit" class="nav-btn ms-hero__btn"><Icon name="lucide:phone-call" size="16"/>Вызвать мастера</button>
          </form>
          <p class="ms-policy">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
        </div>
        <div class="ms-hero__nums">
          <div class="ms-num" v-for="n in heroNums" :key="n.label"><div class="ms-num__val">{{ n.val }}</div><div class="ms-num__label">{{ n.label }}</div></div>
        </div>
      </div>
    </section>

    <!-- ЧТО ВХОДИТ -->
    <section class="ms-section ms-included">
      <div class="container">
        <div class="ms-two-col">
          <div class="ms-two-col__text">
            <div class="ms-pretitle ms-pretitle--dark">Полный комплекс</div>
            <h2 class="ms-title ms-title--left">Что включает демонтаж натяжного потолка</h2>
            <p class="ms-body-text">Демонтируем натяжные потолки любых производителей и конфигураций. Работаем аккуратно, не повреждаем стены и коммуникации. Вывозим весь строительный мусор.</p>
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
              <p class="ms-aside-card__desc">Стоимость зависит от площади и конфигурации. Точную цену назовём после осмотра</p>
              <div class="ms-aside-price">от <strong>80 ₽/м²</strong></div>
              <div class="ms-aside-price-note">минимальный заказ 1 500 ₽</div>
              <ul class="ms-aside-list">
                <li v-for="i in asideItems" :key="i"><Icon name="lucide:check-circle" size="14" class="ms-check"/>{{ i }}</li>
              </ul>
              <button class="nav-btn ms-aside-card__btn" @click="callbackOpen = true"><Icon name="lucide:phone-call" size="15"/>Заказать звонок</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ЭТАПЫ -->
    <section class="ms-section ms-steps" itemscope itemtype="https://schema.org/HowTo">
      <meta itemprop="name" content="Как происходит демонтаж натяжного потолка"/>
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--light">Процесс работы</div>
          <h2 class="ms-title ms-title--light">Этапы демонтажа натяжного потолка</h2>
          <p class="ms-desc ms-desc--light">Аккуратно снимаем полотно и багет, подготавливаем основание под новый потолок</p>
        </div>
        <div class="ms-steps-grid ms-steps-grid--4">
          <div class="ms-step" v-for="(step, i) in steps" :key="step.title" itemprop="step" itemscope itemtype="https://schema.org/HowToStep">
            <meta itemprop="position" :content="String(i + 1)"/>
            <meta itemprop="name" :content="step.title"/>
            <meta itemprop="text" :content="step.desc"/>
            <div class="ms-step__num">{{ String(i + 1).padStart(2, '0') }}</div>
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
          <div class="ms-pretitle ms-pretitle--dark">Наши преимущества</div>
          <h2 class="ms-title">Почему доверяют нам</h2>
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
          <h2 class="ms-cta__title">Нужен демонтаж потолка?</h2>
          <p class="ms-cta__desc">Выезд в любой район Иркутска. Демонтируем аккуратно — без повреждений стен и коммуникаций</p>
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
          <h2 class="ms-title">Частые вопросы о демонтаже</h2>
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
            <h2>Демонтаж натяжного потолка в Иркутске</h2>
            <p>Компания <strong>ПроПотолок</strong> выполняет профессиональный демонтаж натяжных потолков в Иркутске. Снимаем полотна и багет любых производителей — MSD, Bauf, Descor, Clipso и других. Работаем аккуратно, без повреждений стен и скрытых коммуникаций.</p>
            <h3>Когда нужен демонтаж</h3>
            <p>Демонтаж натяжного потолка требуется при капитальном ремонте, замене электропроводки или коммуникаций, при перепланировке помещения, а также при желании установить новый потолок другой конфигурации или цвета.</p>
            <h3>Демонтаж с сохранением профиля</h3>
            <p>Если конструкция потолка в хорошем состоянии, мы снимем только полотно, сохранив профиль и багет. Это позволит сэкономить на последующем монтаже нового полотна — установка обойдётся дешевле.</p>
            <h3>Что делать с мусором</h3>
            <p>После демонтажа вывозим снятые материалы и строительный мусор. Если вы планируете ставить новый потолок у нас — демонтаж входит в стоимость монтажа, и вы платите только за новое полотно и работу.</p>
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
import { site } from '~/data/site'
import { services } from '~/data/services'
import { usePageContent } from '~/composables/usePageContent'

// Данные страницы из pagesInfo.ts + перезаписи из админки
const _content = await usePageContent('demontazh-natyazhnogo-potolka')
const faqItems = ref(_content.faqItems ?? [])
const seoLinks = ref(_content.seoLinks ?? [])
const service = services.find(s => s.slug === 'demontazh-natyazhnogo-potolka')!

useHead({
  title: 'Демонтаж натяжного потолка в Иркутске — от 80 ₽/м² | ПроПотолок',
  meta: [
    { name: 'description', content: 'Профессиональный демонтаж натяжного потолка в Иркутске от 80 ₽/м². Снимаем полотна любых производителей, демонтаж багета, вывоз мусора. Минимальный заказ 1 500 ₽.' },
    { property: 'og:title', content: 'Демонтаж натяжного потолка в Иркутске | ПроПотолок' },
    { property: 'og:type', content: 'website' },
  ],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: 'Демонтаж натяжного потолка', provider: { '@type': 'LocalBusiness', name: 'ПроПотолок', address: { '@type': 'PostalAddress', addressLocality: 'Иркутск', addressCountry: 'RU' }, telephone: '+73952000000' }, areaServed: { '@type': 'City', name: 'Иркутск' }, offers: { '@type': 'Offer', price: '80', priceCurrency: 'RUB', availability: 'https://schema.org/InStock' } }) }],
})

const callbackOpen = ref(false)
const faqOpen = ref(-1)
const formName = ref('')
const formPhone = ref('')

const heroFacts = [
  { icon: 'lucide:badge-check',  text: 'Любой производитель' },
  { icon: 'lucide:shield-check', text: 'Без повреждений стен' },
  { icon: 'lucide:trash-2',      text: 'Вывоз мусора' },
  { icon: 'lucide:clock',        text: '1–4 часа' },
  { icon: 'lucide:banknote',     text: 'От 80 ₽/м²' },
]
const heroNums = [
  { val: '80 ₽',   label: 'от, за м²' },
  { val: '1–4 ч',  label: 'время работы' },
  { val: '100%',   label: 'вывоз мусора' },
  { val: '0',      label: 'повреждений стен' },
]
const includedItems = [
  { icon: 'lucide:package',    title: 'Снятие полотна',       desc: 'Аккуратно извлекаем полотно из багета, скручиваем и упаковываем для вывоза' },
  { icon: 'lucide:minus',      title: 'Демонтаж багета',      desc: 'Снимаем профиль со стен без повреждения поверхности — при необходимости сохраняем' },
  { icon: 'lucide:lightbulb',  title: 'Снятие светильников',  desc: 'Аккуратно извлекаем точечные светильники и люстры, не повреждая проводку' },
  { icon: 'lucide:trash-2',    title: 'Вывоз материалов',     desc: 'Собираем и вывозим все строительные отходы — сдаём помещение чистым' },
]
const asideItems = [
  'Любой производитель',
  'Без повреждений стен',
  'Вывоз мусора включён',
  'Работаем в выходные',
  'Оплата после работы',
]
const steps = [
  { icon: 'lucide:phone-call',     title: 'Заявка',          desc: 'Оставьте заявку — уточним площадь, конфигурацию и назначим дату.', time: '5 минут' },
  { icon: 'lucide:search',         title: 'Осмотр',          desc: 'Мастер осматривает конструкцию и определяет объём работ.', time: '10 минут' },
  { icon: 'lucide:package',        title: 'Демонтаж',        desc: 'Снимаем полотно, демонтируем багет и светильники. Аккуратно, без пыли.', time: '1–4 часа' },
  { icon: 'lucide:trash-2',        title: 'Уборка и вывоз',  desc: 'Собираем весь мусор и вывозим материалы. Помещение остаётся чистым.', time: 'После работы' },
]
const whyCards = [
  { icon: 'lucide:badge-check',  title: 'Любой производитель',       desc: 'Снимаем потолки MSD, Bauf, Descor, Clipso, Teqtum, отечественные и неизвестные марки.' },
  { icon: 'lucide:shield-check', title: 'Без повреждений',           desc: 'Снимаем багет и полотно аккуратно — стены, откосы и коммуникации остаются нетронутыми.' },
  { icon: 'lucide:trash-2',      title: 'Вывоз мусора включён',      desc: 'Стоимость уже включает сбор и вывоз всех строительных отходов.' },
  { icon: 'lucide:clock',        title: 'Быстро',                    desc: 'Стандартную комнату демонтируем за 1–2 часа. Всю квартиру — за 1 день.' },
  { icon: 'lucide:banknote',     title: 'Честная цена',              desc: 'От 80 ₽/м², минимальный заказ 1 500 ₽. Итоговая стоимость фиксируется до начала работ.' },
  { icon: 'lucide:refresh-cw',   title: 'Сразу монтируем новый',     desc: 'Сделаем демонтаж и сразу установим новый потолок. При заказе монтажа — демонтаж со скидкой.' },
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
.ms-pretitle { display: inline-block; font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: .5px; }
.ms-pretitle--dark  { background: var(--accent); color: var(--dark); }
.ms-pretitle--light { background: rgba(245,200,0,.15); color: var(--accent); }
.ms-head { text-align: center; margin-bottom: 44px; }
.ms-title { font-size: 34px; font-weight: 800; color: var(--dark); margin: 0 0 12px; line-height: 1.2; }
.ms-title--left { text-align: left; }
.ms-title--light { color: #fff; }
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
.ms-included { background: #f7f7f7; }
.ms-two-col { display: grid; grid-template-columns: 1fr 300px; gap: 56px; align-items: start; }
.ms-include-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ms-include-item { display: flex; align-items: flex-start; gap: 14px; padding: 18px; background: #fff; border-radius: 14px; border: 1.5px solid transparent; transition: border-color .15s; }
.ms-include-item:hover { border-color: var(--accent); }
.ms-include-item__icon { width: 42px; height: 42px; flex-shrink: 0; background: var(--accent); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--dark); }
.ms-include-item__title { font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 4px; }
.ms-include-item__desc  { font-size: 13px; color: var(--gray); line-height: 1.5; }
.ms-aside-card { background: #fff; border-radius: 18px; padding: 26px; border: 1.5px solid #ececec; position: sticky; top: 100px; }
.ms-aside-card__title { font-size: 18px; font-weight: 800; color: var(--dark); margin-bottom: 10px; }
.ms-aside-card__desc  { font-size: 14px; color: var(--gray); line-height: 1.55; margin-bottom: 14px; }
.ms-aside-price { font-size: 32px; font-weight: 900; color: var(--dark); font-family: var(--font); margin-bottom: 4px; }
.ms-aside-price strong { color: var(--accent); }
.ms-aside-price-note { font-size: 12px; color: var(--gray); margin-bottom: 18px; }
.ms-aside-list { list-style: none; padding: 0; margin: 0 0 20px; display: flex; flex-direction: column; gap: 9px; }
.ms-aside-list li { display: flex; align-items: center; gap: 9px; font-size: 14px; color: #444; }
.ms-aside-card__btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px; font-size: 14px; }
.ms-steps { background: #141414; }
.ms-steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.ms-steps-grid--4 { grid-template-columns: repeat(4, 1fr); }
.ms-step { background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 18px; padding: 26px 22px; position: relative; transition: border-color .2s; }
.ms-step:hover { border-color: var(--accent); }
.ms-step__num { position: absolute; top: 18px; right: 18px; font-size: 36px; font-weight: 900; color: rgba(245,200,0,.08); font-family: 'Gilroy', sans-serif; line-height: 1; }
.ms-step__icon { width: 50px; height: 50px; background: rgba(245,200,0,.12); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--accent); margin-bottom: 16px; transition: background .2s; }
.ms-step:hover .ms-step__icon { background: var(--accent); color: var(--dark); }
.ms-step__title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.ms-step__desc  { font-size: 13px; color: rgba(255,255,255,.45); line-height: 1.6; margin-bottom: 12px; }
.ms-step__time  { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; color: var(--accent); background: rgba(245,200,0,.1); padding: 3px 10px; border-radius: 20px; }
.ms-why { background: #fff; }
.ms-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.ms-why-card { background: #f7f7f7; border-radius: 16px; padding: 26px 22px; border: 1.5px solid transparent; transition: border-color .15s, box-shadow .15s; }
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
.ms-faq { background: #f7f7f7; }
.ms-faq-list { display: flex; flex-direction: column; gap: 10px; max-width: 860px; margin: 0 auto; }
.ms-faq-item { background: #fff; border-radius: 14px; border: 1.5px solid #eee; overflow: hidden; cursor: pointer; transition: border-color .15s; }
.ms-faq-item.open { border-color: var(--accent); }
.ms-faq-item__q { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 22px; font-size: 15px; font-weight: 700; color: var(--dark); user-select: none; }
.ms-faq-item__arrow { flex-shrink: 0; color: var(--gray); }
.ms-faq-item.open .ms-faq-item__arrow { color: var(--accent); }
.ms-faq-item__a { max-height: 0; overflow: hidden; transition: max-height .3s ease, padding .3s; font-size: 14px; color: #555; line-height: 1.7; padding: 0 22px; }
.ms-faq-item.open .ms-faq-item__a { max-height: 300px; padding: 0 22px 18px; }
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
@media (max-width: 1100px) { .ms-hero__inner { grid-template-columns: 1fr; } .ms-hero__nums { grid-template-columns: repeat(4, 1fr); } .ms-steps-grid--4 { grid-template-columns: repeat(2, 1fr); } .ms-why-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 860px) { .ms-two-col { grid-template-columns: 1fr; } .ms-aside-card { position: static; } .ms-seo-inner { grid-template-columns: 1fr; } .ms-seo-links { position: static; } }
@media (max-width: 640px) { .ms-hero__title { font-size: 30px; } .ms-hero__nums { grid-template-columns: repeat(2, 1fr); } .ms-hero__form { flex-direction: column; } .ms-inp, .ms-hero__btn { width: 100%; } .ms-include-grid { grid-template-columns: 1fr; } .ms-steps-grid--4 { grid-template-columns: 1fr; } .ms-why-grid { grid-template-columns: 1fr; } .ms-title { font-size: 26px; } .ms-cta__inner { flex-direction: column; align-items: flex-start; } }
</style>
