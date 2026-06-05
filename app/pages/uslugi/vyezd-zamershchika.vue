<template>
  <div itemscope itemtype="https://schema.org/Service">

    <!-- ══════════════════════════════════════
         HERO
    ══════════════════════════════════════ -->
    <section class="ms-hero">
      <div class="ms-hero__bg" :style="{ backgroundImage: `url('${service.img}')` }"></div>
      <div class="ms-hero__overlay"></div>
      <div class="container ms-hero__inner">
        <div class="ms-hero__content">
          <div class="ms-pretitle">Без обязательств</div>
          <h1 class="ms-hero__title" itemprop="name">
            Бесплатный замер натяжного&nbsp;потолка в&nbsp;Иркутске
          </h1>
          <p class="ms-hero__price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <meta itemprop="price" content="0"/>
            <meta itemprop="priceCurrency" content="RUB"/>
            <meta itemprop="availability" content="https://schema.org/InStock"/>
            <strong>{{ service.price }}</strong> — выезд в любой район города
          </p>
          <p class="ms-hero__desc" itemprop="description">{{ service.description }}</p>
          <div class="ms-hero__facts">
            <div class="ms-fact" v-for="f in heroFacts" :key="f.text">
              <Icon :name="f.icon" size="15" class="ms-fact__icon"/>
              {{ f.text }}
            </div>
          </div>
          <form class="ms-hero__form" @submit.prevent="submitHero">
            <input v-model="formName" class="ms-inp" type="text" placeholder="Ваше имя"/>
            <input :value="formPhone" class="ms-inp" type="tel" placeholder="+7 (999) 999-99-99" required @input="formPhone = maskPhone($event)"/>
            <button type="submit" class="nav-btn ms-hero__btn">
              <Icon name="lucide:ruler" size="16"/>
              Вызвать замерщика
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

    <!-- ══════════════════════════════════════
         ЧТО ДЕЛАЕТ ЗАМЕРЩИК
    ══════════════════════════════════════ -->
    <section class="ms-section ms-included">
      <div class="container">
        <div class="ms-two-col">
          <div class="ms-two-col__text">
            <div class="ms-pretitle ms-pretitle--dark">Что входит в замер</div>
            <h2 class="ms-title ms-title--left">Что делает замерщик при выезде</h2>
            <p class="ms-body-text">Замерщик — не просто человек с рулеткой. Это специалист, который поможет выбрать подходящую фактуру и цвет, покажет образцы, рассчитает точную стоимость и ответит на все вопросы прямо у вас дома.</p>
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
              <div class="ms-aside-card__title">Вызвать замерщика</div>
              <p class="ms-aside-card__desc">Замерщик приедет в день обращения или в удобное для вас время — включая выходные</p>
              <ul class="ms-aside-list">
                <li v-for="i in asideItems" :key="i">
                  <Icon name="lucide:check-circle" size="14" class="ms-check"/>{{ i }}
                </li>
              </ul>
              <button class="nav-btn ms-aside-card__btn" @click="callbackOpen = true">
                <Icon name="lucide:phone-call" size="15"/>
                Заказать звонок
              </button>
              <NuxtLink to="/kalkulyator" class="ms-aside-card__calc">
                <Icon name="lucide:calculator" size="14"/>
                Рассчитать онлайн
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         ЭТАПЫ ЗАМЕРА — HowTo schema
    ══════════════════════════════════════ -->
    <section class="ms-section ms-steps" itemscope itemtype="https://schema.org/HowTo">
      <meta itemprop="name" content="Как проходит бесплатный замер натяжного потолка в Иркутске"/>
      <meta itemprop="description" content="Пошаговый процесс бесплатного замера: от заявки до подписания договора и назначения даты монтажа"/>
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--light">Как это работает</div>
          <h2 class="ms-title ms-title--light">Как проходит бесплатный замер</h2>
          <p class="ms-desc ms-desc--light">От звонка до готового расчёта — за 30–60 минут</p>
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
            <div class="ms-step__num">{{ String(i + 1).padStart(2, '0') }}</div>
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

    <!-- ══════════════════════════════════════
         ПОЧЕМУ МЫ
    ══════════════════════════════════════ -->
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

    <!-- ══════════════════════════════════════
         CTA
    ══════════════════════════════════════ -->
    <section class="ms-cta">
      <div class="container ms-cta__inner">
        <div>
          <h2 class="ms-cta__title">Вызовите замерщика прямо сейчас</h2>
          <p class="ms-cta__desc">Выезд бесплатно в любой район Иркутска. Замерщик приедет в день обращения или в удобное для вас время</p>
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

    <!-- ══════════════════════════════════════
         FAQ — FAQPage schema
    ══════════════════════════════════════ -->
    <section class="ms-section ms-faq" itemscope itemtype="https://schema.org/FAQPage">
      <div class="container">
        <div class="ms-head">
          <div class="ms-pretitle ms-pretitle--dark">Вопросы и ответы</div>
          <h2 class="ms-title">Часто задаваемые вопросы о замере</h2>
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

    <!-- ══════════════════════════════════════
         SEO-ТЕКСТ
    ══════════════════════════════════════ -->
    <section class="ms-section ms-seo">
      <div class="container">
        <div class="ms-seo-inner">
          <div class="ms-seo-content">
            <h2>Бесплатный замер натяжного потолка в Иркутске</h2>
            <p>Компания <strong>ПроПотолок</strong> предлагает бесплатный выезд замерщика в любой район Иркутска. Услуга действительно бесплатная и не обязывает вас к заказу — специалист приедет, проведёт обмеры и рассчитает стоимость, а решение принимаете только вы.</p>
            <h3>Точность замеров — залог идеального результата</h3>
            <p>Натяжной потолок изготавливается строго по вашим размерам. Ошибка даже в 1–2 см может привести к браку полотна. Наши специалисты используют лазерные дальномеры и производят замеры с точностью до миллиметра.</p>
            <h3>Образцы и консультация на месте</h3>
            <p>Замерщик привозит с собой полный набор образцов полотен: матовые, глянцевые, сатиновые, тканевые — более 80 цветов. Вы можете приложить образцы к стенам и мебели, оценить сочетание прямо в своём интерьере под естественным освещением.</p>
            <h3>Районы обслуживания</h3>
            <p>Выезжаем во все районы Иркутска: Свердловский, Октябрьский, Правобережный, Ленинский округа. Также работаем в Шелехове, Ангарске и Иркутском районе. Стоимость выезда за пределы города уточняйте при оформлении заявки.</p>
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

    <ModalCallback v-model="callbackOpen"/>

  </div>
</template>

<script setup lang="ts">
import { services } from '~/data/services'

const service = services.find(s => s.slug === 'vyezd-zamershchika')!

useHead({
  title: 'Бесплатный замер натяжного потолка в Иркутске — выезд в день обращения | ПроПотолок',
  meta: [
    { name: 'description', content: 'Бесплатный замер натяжного потолка в Иркутске. Выезд замерщика в день обращения, образцы полотен, расчёт стоимости на месте. Без обязательств.' },
    { property: 'og:title', content: 'Бесплатный замер натяжного потолка в Иркутске | ПроПотолок' },
    { property: 'og:description', content: 'Бесплатный выезд замерщика в любой район Иркутска. Образцы, замеры, расчёт на месте.' },
    { property: 'og:type', content: 'website' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Бесплатный замер натяжного потолка',
        description: 'Бесплатный выезд замерщика для обмера помещения, подбора полотна и расчёта стоимости натяжного потолка в Иркутске.',
        provider: {
          '@type': 'LocalBusiness',
          name: 'ПроПотолок',
          address: { '@type': 'PostalAddress', addressLocality: 'Иркутск', addressRegion: 'Иркутская область', addressCountry: 'RU' },
          telephone: '+73952000000',
        },
        areaServed: { '@type': 'City', name: 'Иркутск' },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'RUB', availability: 'https://schema.org/InStock' },
      }),
    },
  ],
})

const callbackOpen = ref(false)
const faqOpen = ref(-1)
const formName = ref('')
const formPhone = ref('')

const heroFacts = [
  { icon: 'lucide:gift',        text: 'Абсолютно бесплатно' },
  { icon: 'lucide:clock',       text: 'Выезд в день обращения' },
  { icon: 'lucide:map-pin',     text: 'Любой район Иркутска' },
  { icon: 'lucide:package',     text: 'Образцы полотен с собой' },
  { icon: 'lucide:thumbs-up',   text: 'Без обязательств' },
]

const heroNums = [
  { val: '4 000+', label: 'замеров выполнено' },
  { val: '30–60',  label: 'минут занимает замер' },
  { val: '80+',    label: 'образцов полотен' },
  { val: '0 ₽',   label: 'стоимость выезда' },
]

const includedItems = [
  { icon: 'lucide:ruler',         title: 'Точные обмеры',          desc: 'Лазерный дальномер, замеры с точностью до мм, учёт всех углов, ниш и перепадов' },
  { icon: 'lucide:package',       title: 'Образцы полотен',         desc: 'Привозим 80+ образцов: матовые, глянцевые, сатиновые, тканевые — все фактуры и цвета' },
  { icon: 'lucide:calculator',    title: 'Расчёт стоимости',        desc: 'Считаем итоговую цену прямо на месте с учётом фактуры, площади, доп. работ' },
  { icon: 'lucide:file-text',     title: 'Договор',                 desc: 'Оформляем договор с фиксированной ценой — никаких доплат после' },
  { icon: 'lucide:lightbulb',     title: 'Консультация по дизайну', desc: 'Поможем подобрать цвет и фактуру под ваш интерьер и освещение' },
  { icon: 'lucide:calendar',      title: 'Дата монтажа',            desc: 'Сразу назначаем удобный день монтажа — в течение 1–3 дней после замера' },
]

const asideItems = [
  'Выезд в день обращения',
  'Работаем в выходные',
  'Любой район Иркутска',
  'Без обязательств',
  'Договор на месте',
]

const steps = [
  { icon: 'lucide:phone-call',     title: 'Оставьте заявку',        desc: 'Позвоните или оставьте заявку на сайте. Уточним адрес и согласуем удобное время приезда специалиста.',          time: '5 минут' },
  { icon: 'lucide:car',            title: 'Выезд замерщика',        desc: 'Специалист приедет в согласованное время — в день обращения или в любой удобный для вас день.',                time: 'В день обращения' },
  { icon: 'lucide:ruler',          title: 'Обмер помещения',        desc: 'Производим точные замеры лазерным дальномером. Учитываем все углы, колонны, ниши и сложные конфигурации.',    time: '15–20 минут' },
  { icon: 'lucide:package',        title: 'Подбор полотна',         desc: 'Показываем образцы, помогаем выбрать фактуру и цвет. Объясняем отличия между материалами.',                    time: '10–20 минут' },
  { icon: 'lucide:calculator',     title: 'Расчёт стоимости',       desc: 'Рассчитываем точную стоимость прямо на месте — с учётом площади, фактуры, цвета и дополнительных работ.',     time: '5 минут' },
  { icon: 'lucide:file-signature', title: 'Договор и дата монтажа', desc: 'Подписываем договор с фиксированной ценой и назначаем удобный день монтажа. Предоплата не нужна.',            time: 'На месте' },
]

const whyCards = [
  { icon: 'lucide:gift',          title: 'Бесплатно и без скрытых условий', desc: 'Замер абсолютно бесплатен. Никаких обязательств по итогам — решение остаётся за вами.' },
  { icon: 'lucide:clock',         title: 'Выезд в день обращения',          desc: 'Принимаем заявки с 8:00 до 20:00. Замерщик выедет в тот же день или в назначенное вами время.' },
  { icon: 'lucide:package',       title: '80+ образцов полотен',            desc: 'Специалист привозит полную коллекцию: все фактуры, все цвета каталога MSD и Bauf.' },
  { icon: 'lucide:badge-check',   title: 'Точность до миллиметра',          desc: 'Используем профессиональные лазерные дальномеры. Полотно изготавливается строго по вашим размерам.' },
  { icon: 'lucide:map-pin',       title: 'Весь Иркутск и область',          desc: 'Выезжаем во все районы города, в Шелехов, Ангарск и пригород без доплаты.' },
  { icon: 'lucide:users',         title: 'Опытные специалисты',             desc: 'Замерщики с опытом от 3 лет. Знают нюансы сложных помещений: низкие потолки, балки, ниши.' },
]

const faqItems = [
  { q: 'Замер действительно бесплатный?', a: 'Да, выезд замерщика полностью бесплатен. Никаких скрытых платежей нет. Если вы решите не заказывать потолок — тоже ничего не платите.' },
  { q: 'Как быстро приедет замерщик?', a: 'В большинстве случаев замерщик приезжает в день обращения. Принимаем заявки ежедневно с 8:00 до 20:00, включая выходные и праздники.' },
  { q: 'Нужно ли что-то подготовить к приезду замерщика?', a: 'Ничего специально готовить не нужно. Убирать мебель тоже не требуется — наш специалист измеряет помещение в любом состоянии.' },
  { q: 'Привезут ли образцы на замер?', a: 'Да. Замерщик привозит полную коллекцию образцов — более 80 цветов и все основные фактуры: матовые, глянцевые, сатиновые и тканевые полотна.' },
  { q: 'Будет ли известна точная цена после замера?', a: 'Да. После замера специалист рассчитает точную стоимость прямо у вас дома с учётом площади, выбранной фактуры, цвета и дополнительных работ. Цена фиксируется в договоре.' },
  { q: 'Работаете ли вы в пригороде Иркутска?', a: 'Выезжаем в Шелехов, Ангарск, Усолье-Сибирское и Иркутский район. Стоимость выезда за пределы Иркутска обсуждается индивидуально.' },
]

const seoLinks = [
  { to: '/uslugi/montazh-natyazhnyh-potolkov',      label: 'Монтаж натяжных потолков' },
  { to: '/uslugi/srochnyj-montazh-24-chasa',         label: 'Срочный монтаж за 24 часа' },
  { to: '/uslugi/demontazh-natyazhnogo-potolka',     label: 'Демонтаж натяжного потолка' },
  { to: '/uslugi/remont-natyazhnogo-potolka',        label: 'Ремонт натяжного потолка' },
  { to: '/uslugi/sliv-vody-s-natyazhnogo-potolka',   label: 'Слив воды с потолка' },
  { to: '/uslugi/zamena-polotna',                    label: 'Замена полотна' },
  { to: '/uslugi/ustanovka-svetilnikov',             label: 'Установка светильников' },
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

function submitHero() {
  callbackOpen.value = true
}
</script>

<style scoped>
.ms-pretitle {
  display: inline-block;
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

/* ═══ HERO ═══ */
.ms-hero {
  position: relative; min-height: 520px;
  display: flex; align-items: center;
}
.ms-hero__bg {
  position: absolute; inset: 0;
  background-size: cover; background-position: center; z-index: 0;
}
.ms-hero__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.6) 60%, rgba(0,0,0,.3) 100%);
  z-index: 1;
}
.ms-hero__inner {
  position: relative; z-index: 2;
  display: grid; grid-template-columns: 1fr auto;
  gap: 60px; align-items: center;
  padding-top: 60px; padding-bottom: 60px;
}
.ms-hero__content { max-width: 620px; }
.ms-hero__title { font-size: 44px; font-weight: 900; color: #fff; line-height: 1.15; margin-bottom: 10px; }
.ms-hero__price { font-size: 20px; color: rgba(255,255,255,.7); margin-bottom: 16px; }
.ms-hero__price strong { color: var(--accent); }
.ms-hero__desc  { font-size: 16px; color: rgba(255,255,255,.65); line-height: 1.65; margin-bottom: 24px; }
.ms-hero__facts { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 28px; }
.ms-fact { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,.6); }
.ms-fact__icon { color: var(--accent); }
.ms-hero__form { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; }
.ms-inp {
  flex: 1; min-width: 160px;
  padding: 13px 16px; border: none; border-radius: 10px;
  font-size: 15px; font-family: var(--font); color: var(--dark);
  outline: none; background: rgba(255,255,255,.95);
}
.ms-inp:focus { background: #fff; }
.ms-hero__btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 24px; font-size: 15px; border-radius: 10px; white-space: nowrap; }
.ms-policy { font-size: 11px; color: rgba(255,255,255,.35); margin: 0; }
.ms-hero__nums { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.ms-num {
  background: rgba(255,255,255,.08); backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 14px; padding: 18px 20px; text-align: center; min-width: 130px;
}
.ms-num__val   { font-size: 26px; font-weight: 900; color: var(--accent); line-height: 1; margin-bottom: 5px; }
.ms-num__label { font-size: 12px; color: rgba(255,255,255,.45); line-height: 1.3; }

/* ═══ ЧТО ВХОДИТ ═══ */
.ms-included { background: #fff; }
.ms-two-col { display: grid; grid-template-columns: 1fr 300px; gap: 56px; align-items: start; }
.ms-include-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.ms-include-item {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 18px; background: #f7f7f7; border-radius: 14px;
  border: 1.5px solid transparent; transition: border-color .15s;
}
.ms-include-item:hover { border-color: var(--accent); }
.ms-include-item__icon {
  width: 42px; height: 42px; flex-shrink: 0;
  background: var(--accent); border-radius: 12px;
  display: flex; align-items: center; justify-content: center; color: var(--dark);
}
.ms-include-item__title { font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 4px; }
.ms-include-item__desc  { font-size: 13px; color: var(--gray); line-height: 1.5; }
.ms-aside-card { background: #f7f7f7; border-radius: 18px; padding: 26px; border: 1.5px solid #ececec; position: sticky; top: 100px; }
.ms-aside-card__title { font-size: 18px; font-weight: 800; color: var(--dark); margin-bottom: 10px; }
.ms-aside-card__desc  { font-size: 14px; color: var(--gray); line-height: 1.55; margin-bottom: 18px; }
.ms-aside-list { list-style: none; padding: 0; margin: 0 0 20px; display: flex; flex-direction: column; gap: 9px; }
.ms-aside-list li { display: flex; align-items: center; gap: 9px; font-size: 14px; color: #444; }
.ms-aside-card__btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px; font-size: 14px; margin-bottom: 10px; }
.ms-aside-card__calc { display: flex; align-items: center; justify-content: center; gap: 7px; font-size: 14px; font-weight: 600; color: var(--gray); text-decoration: none; transition: color .15s; }
.ms-aside-card__calc:hover { color: var(--dark); }

/* ═══ ЭТАПЫ ═══ */
.ms-steps { background: #141414; }
.ms-steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.ms-step {
  background: #1e1e1e; border: 1px solid #2a2a2a;
  border-radius: 18px; padding: 26px 22px; position: relative;
  transition: border-color .2s;
}
.ms-step:hover { border-color: var(--accent); }
.ms-step__num {
  position: absolute; top: 18px; right: 18px;
  font-size: 36px; font-weight: 900; color: rgba(245,200,0,.08);
  font-family: 'Gilroy', sans-serif; line-height: 1;
}
.ms-step__icon {
  width: 50px; height: 50px;
  background: rgba(245,200,0,.12); border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  color: var(--accent); margin-bottom: 16px; transition: background .2s;
}
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
  .ms-include-grid { grid-template-columns: 1fr; }
  .ms-steps-grid  { grid-template-columns: 1fr; }
  .ms-why-grid    { grid-template-columns: 1fr; }
  .ms-title       { font-size: 26px; }
  .ms-cta__inner  { flex-direction: column; align-items: flex-start; }
  .ms-calc-cta__btn { margin-left: 0; width: 100%; justify-content: center; }
}
</style>
