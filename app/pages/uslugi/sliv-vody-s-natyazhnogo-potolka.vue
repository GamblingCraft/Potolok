<template>
  <div itemscope itemtype="https://schema.org/Service">

    <section class="ms-hero">
      <NuxtImg class="ms-hero__bg" :src="heroImg" alt="" fetchpriority="high" loading="eager" width="1200" height="580" sizes="100vw" />
      <div class="ms-hero__overlay"></div>
      <div class="container ms-hero__inner">
        <div class="ms-hero__content">
          <div class="ms-pretitle">Экстренная помощь</div>
          <h1 class="ms-hero__title" itemprop="name">Слив воды с натяжного потолка в&nbsp;Иркутске</h1>
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
              <Icon name="lucide:phone-call" size="16"/>Вызвать мастера срочно
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

    <!-- ВАЖНО ЗНАТЬ -->
    <section class="ms-section ms-info">
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--dark">Важно знать</div>
          <h2 class="ms-title">Что происходит с потолком при затоплении</h2>
          <p class="ms-desc">Натяжной потолок — надёжная защита от затопления. Но действовать нужно правильно и быстро</p>
        </div>
        <div class="ms-info-grid">
          <div class="ms-info-card" v-for="c in infoCards" :key="c.title" :class="{ 'ms-info-card--accent': c.accent }">
            <div class="ms-info-card__icon"><Icon :name="c.icon" size="22"/></div>
            <div class="ms-info-card__title">{{ c.title }}</div>
            <div class="ms-info-card__desc">{{ c.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ЧТО ВХОДИТ + САЙДБАР -->
    <section class="ms-section ms-included">
      <div class="container">
        <div class="ms-two-col">
          <div class="ms-two-col__text">
            <div class="ms-pretitle ms-pretitle--dark">Наша работа</div>
            <h2 class="ms-title ms-title--left">Что включает услуга слива воды</h2>
            <p class="ms-body-text">Мастер аккуратно сливает воду через специальный клапан, не повреждая полотно. После слива потолок полностью восстанавливает форму и внешний вид — как новый.</p>
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
            <div class="ms-aside-card ms-aside-card--urgent">
              <div class="ms-aside-card__badge"><Icon name="lucide:alert-triangle" size="14"/>Залили? Не паникуйте</div>
              <div class="ms-aside-card__title">Звоните прямо сейчас</div>
              <p class="ms-aside-card__desc">Не пытайтесь самостоятельно проколоть или вскрыть потолок — это приведёт к повреждению полотна</p>
              <a :href="'tel:' + site.phoneRaw" class="ms-aside-card__phone">{{ site.phone }}</a>
              <ul class="ms-aside-list">
                <li v-for="i in asideItems" :key="i"><Icon name="lucide:check-circle" size="14" class="ms-check"/>{{ i }}</li>
              </ul>
              <button class="nav-btn ms-aside-card__btn" @click="callbackOpen = true">
                <Icon name="lucide:phone-call" size="15"/>Заказать срочный выезд
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ЭТАПЫ -->
    <section class="ms-section ms-steps" itemscope itemtype="https://schema.org/HowTo">
      <meta itemprop="name" content="Как происходит слив воды с натяжного потолка"/>
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--light">Процесс работы</div>
          <h2 class="ms-title ms-title--light">Как мы сливаем воду с натяжного потолка</h2>
          <p class="ms-desc ms-desc--light">Аккуратно, быстро, без повреждения полотна</p>
        </div>
        <div class="ms-steps-grid ms-steps-grid--4">
          <div class="ms-step" v-for="(step, i) in steps" :key="step.title" itemprop="step" itemscope itemtype="https://schema.org/HowToStep">
            <meta itemprop="position" :content="String(i + 1)"/>
            <meta itemprop="name" :content="step.title"/>
            <meta itemprop="text" :content="step.desc"/>
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
          <h2 class="ms-title">Доверьте слив воды профессионалам</h2>
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
          <h2 class="ms-cta__title">Залили соседи? Звоните сразу!</h2>
          <p class="ms-cta__desc">Выезжаем в день обращения по всему Иркутску. Чем быстрее позвоните — тем меньше ущерб</p>
        </div>
        <div class="ms-cta__btns">
          <button class="nav-btn ms-cta__btn" @click="callbackOpen = true">
            <Icon name="lucide:phone-call" size="16"/>Заказать звонок
          </button>
          <NuxtLink to="/kalkulyator" class="ms-cta__outline">
            <Icon name="lucide:calculator" size="16"/>Калькулятор
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="ms-section ms-faq" itemscope itemtype="https://schema.org/FAQPage">
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--dark">Вопросы и ответы</div>
          <h2 class="ms-title">Частые вопросы о сливе воды</h2>
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
            <h2>Слив воды с натяжного потолка в Иркутске</h2>
            <p>Натяжной потолок способен удержать от <strong>100 литров воды на 1 м²</strong>. Это мощная защита от затопления сверху, но воду необходимо правильно слить — иначе полотно может лопнуть под давлением или деформироваться.</p>
            <h3>Что нельзя делать при затоплении</h3>
            <p>Не пытайтесь самостоятельно проколоть, вскрыть или проткнуть полотно. Это приведёт к разрыву материала, после которого потолок придётся менять полностью. Единственное правильное решение — вызвать специалиста, который сольёт воду через технологический клапан.</p>
            <h3>Восстановление потолка после слива</h3>
            <p>После правильного слива ПВХ-полотно полностью восстанавливает свою форму и внешний вид в течение нескольких часов. Никаких следов затопления не остаётся. Тканевые полотна после сильного затопления могут требовать замены — специалист оценит состояние на месте.</p>
            <h3>Страховой случай</h3>
            <p>Если вас залили соседи, мы предоставим акт выполненных работ и документы, подтверждающие ущерб. Это поможет при оформлении страхового возмещения или претензии к виновным.</p>
          </div>
          <div class="ms-seo-links">
            <div class="ms-seo-links__title">Другие услуги</div>
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

// Данные страницы из pagesInfo.ts + перезаписи из админки
const _content = await usePageContent('sliv-vody-s-natyazhnogo-potolka')
const faqItems = ref(_content.faqItems ?? [])
const seoLinks = ref(_content.seoLinks ?? [])
const service = services.find(s => s.slug === 'sliv-vody-s-natyazhnogo-potolka')!
const heroImg = usePageHero('sliv-vody-s-natyazhnogo-potolka', service.img)

usePageSeoMeta('sliv-vody-s-natyazhnogo-potolka')
useHead({ meta: [{ property: 'og:type', content: 'website' }] })

const callbackOpen = ref(false)
const faqOpen = ref(-1)
const formName = ref('')
const formPhone = ref('')

const heroFacts = [
  { icon: 'lucide:zap',          text: 'Выезд в день обращения' },
  { icon: 'lucide:shield-check', text: 'Полотно сохраняется' },
  { icon: 'lucide:droplets',     text: 'До 100 л/м² удерживает' },
  { icon: 'lucide:file-text',    text: 'Акт для страховой' },
  { icon: 'lucide:banknote',     text: 'От 1 500 ₽' },
]
const heroNums = [
  { val: '100 л',  label: 'удерживает на 1 м²' },
  { val: '1 день', label: 'выезд мастера' },
  { val: '100%',   label: 'восстановление формы' },
  { val: '0',      label: 'повреждений полотна' },
]
const infoCards = [
  { icon: 'lucide:shield',         title: 'Потолок удерживает воду', desc: 'ПВХ-полотно выдерживает до 100 литров воды на 1 м² — квартира снизу остаётся сухой, пока не приедет мастер', accent: false },
  { icon: 'lucide:alert-triangle', title: 'Нельзя самостоятельно прокалывать', desc: 'Прокол или разрез приведут к разрыву полотна — потолок придётся менять полностью. Только вызов специалиста', accent: true },
  { icon: 'lucide:check-circle',   title: 'Полотно восстанавливается', desc: 'После правильного слива через клапан ПВХ-полотно полностью принимает прежнюю форму и вид', accent: false },
  { icon: 'lucide:clock',          title: 'Действуйте быстро', desc: 'Чем дольше вода стоит в потолке — тем выше риск повреждения крепежа и багета. Звоните сразу', accent: false },
]
const includedItems = [
  { icon: 'lucide:search',       title: 'Осмотр и оценка',         desc: 'Специалист оценивает объём воды, состояние полотна и крепежа перед началом работы' },
  { icon: 'lucide:droplets',     title: 'Слив через клапан',        desc: 'Вода сливается через специальный технологический клапан без повреждения полотна' },
  { icon: 'lucide:eye',          title: 'Проверка состояния',       desc: 'После слива проверяем целостность полотна, багета и состояние всей конструкции' },
  { icon: 'lucide:file-text',    title: 'Акт и документы',          desc: 'Выдаём акт выполненных работ — пригодится для страховой компании или при претензии к соседям' },
]
const asideItems = [
  'Не прокалывайте потолок',
  'Выезд в день обращения',
  'Полотно сохраняется целым',
  'Акт для страховой',
  'Работаем ежедневно',
]
const steps = [
  { icon: 'lucide:phone-call',   title: 'Звонок',          desc: 'Позвоните нам. Расскажите о ситуации — сориентируем по стоимости и времени выезда.', time: '5 минут' },
  { icon: 'lucide:car',          title: 'Выезд мастера',   desc: 'Специалист выезжает в приоритетном порядке с необходимым оборудованием.', time: 'В день обращения' },
  { icon: 'lucide:droplets',     title: 'Слив воды',       desc: 'Через технологический клапан аккуратно сливаем всю воду. Полотно не повреждается.', time: '30–90 минут' },
  { icon: 'lucide:file-text',    title: 'Акт и оплата',    desc: 'Проверяем результат, выдаём акт выполненных работ. Оплата после завершения.', time: 'После работы' },
]
const whyCards = [
  { icon: 'lucide:zap',          title: 'Выезд в день обращения',  desc: 'Принимаем экстренные вызовы ежедневно. Мастер приедет в течение нескольких часов после заявки.' },
  { icon: 'lucide:shield-check', title: 'Полотно остаётся целым',  desc: 'Используем технологический клапан — полотно не режем, не прокалываем. После слива оно как новое.' },
  { icon: 'lucide:file-text',    title: 'Документы для страховой', desc: 'Предоставляем акт выполненных работ и необходимые документы для страхового возмещения.' },
  { icon: 'lucide:users',        title: 'Опытные мастера',         desc: 'Специалисты с опытом от 5 лет. Работали с затоплениями любого объёма — от небольших до критических.' },
  { icon: 'lucide:banknote',     title: 'Честная цена',            desc: 'Стоимость от 1 500 ₽ зависит от объёма воды. Цена озвучивается по телефону до выезда.' },
  { icon: 'lucide:map-pin',      title: 'Весь Иркутск',            desc: 'Выезжаем во все районы города и ближайший пригород.' },
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
.ms-title--left { text-align: left; }
.ms-title--light { color: #fff; }
.ms-desc { font-size: 16px; color: var(--gray); max-width: 560px; margin: 0 auto; line-height: 1.6; }
.ms-desc--light { color: rgba(255,255,255,.5); }
.ms-check { color: var(--accent); flex-shrink: 0; }
.ms-body-text { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 24px; }
.ms-section { padding: 72px 0; }

.ms-hero { position: relative; min-height: 520px; display: flex; align-items: center; }
.ms-hero__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; z-index: 0; display: block; }
.ms-hero__overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.6) 60%, rgba(0,0,0,.3) 100%); z-index: 1; }
.ms-hero__inner { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr auto; gap: 60px; align-items: center; padding-top: 60px; padding-bottom: 60px; }
.ms-hero__content { max-width: 620px; }
.ms-hero__title { font-size: 44px; font-weight: 900; color: #fff; line-height: 1.15; margin-bottom: 10px; }
.ms-hero__price { font-size: 20px; color: rgba(255,255,255,.7); margin-bottom: 16px; }
.ms-hero__price strong { color: var(--accent); }
.ms-hero__desc { font-size: 16px; color: rgba(255,255,255,.65); line-height: 1.65; margin-bottom: 24px; }
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

.ms-info { background: #fff; }
.ms-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 860px; margin: 0 auto; }
.ms-info-card { background: #f7f7f7; border-radius: 16px; padding: 26px 22px; border: 1.5px solid transparent; }
.ms-info-card--accent { background: #fff5f5; border-color: #ffcccc; }
.ms-info-card__icon { width: 48px; height: 48px; background: var(--accent); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--dark); margin-bottom: 14px; }
.ms-info-card--accent .ms-info-card__icon { background: #ff4d4d; color: #fff; }
.ms-info-card__title { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 7px; }
.ms-info-card__desc  { font-size: 13px; color: var(--gray); line-height: 1.6; }

.ms-included { background: #f7f7f7; }
.ms-two-col { display: grid; grid-template-columns: 1fr 300px; gap: 56px; align-items: start; }
.ms-include-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ms-include-item { display: flex; align-items: flex-start; gap: 14px; padding: 18px; background: #fff; border-radius: 14px; border: 1.5px solid transparent; transition: border-color .15s; }
.ms-include-item:hover { border-color: var(--accent); }
.ms-include-item__icon { width: 42px; height: 42px; flex-shrink: 0; background: var(--accent); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--dark); }
.ms-include-item__title { font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 4px; }
.ms-include-item__desc  { font-size: 13px; color: var(--gray); line-height: 1.5; }
.ms-aside-card { background: #fff; border-radius: 18px; padding: 26px; border: 1.5px solid #ececec; position: sticky; top: 100px; }
.ms-aside-card--urgent { border-color: #ffcccc; background: #fff5f5; }
.ms-aside-card__badge { display: inline-flex; align-items: center; gap: 6px; background: #ff4d4d; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: .4px; }
.ms-aside-card__title { font-size: 18px; font-weight: 800; color: var(--dark); margin-bottom: 10px; }
.ms-aside-card__desc  { font-size: 14px; color: var(--gray); line-height: 1.55; margin-bottom: 14px; }
.ms-aside-card__phone { display: block; font-size: 22px; font-weight: 900; color: var(--dark); font-family: var(--font); margin-bottom: 18px; transition: color .15s; }
.ms-aside-card__phone:hover { color: #ff4d4d; }
.ms-aside-list { list-style: none; padding: 0; margin: 0 0 20px; display: flex; flex-direction: column; gap: 9px; }
.ms-aside-list li { display: flex; align-items: center; gap: 9px; font-size: 14px; color: #444; }
.ms-aside-card__btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px; font-size: 14px; }

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
@media (max-width: 640px) { .ms-hero__title { font-size: 30px; } .ms-hero__nums { grid-template-columns: repeat(2, 1fr); } .ms-hero__form { flex-direction: column; } .ms-inp, .ms-hero__btn { width: 100%; } .ms-info-grid { grid-template-columns: 1fr; } .ms-include-grid { grid-template-columns: 1fr; } .ms-steps-grid--4 { grid-template-columns: 1fr; } .ms-why-grid { grid-template-columns: 1fr; } .ms-title { font-size: 26px; } .ms-cta__inner { flex-direction: column; align-items: flex-start; } }
</style>
