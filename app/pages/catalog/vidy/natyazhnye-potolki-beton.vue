<template>
  <div itemscope itemtype="https://schema.org/Product">
    <section class="cp-hero">
      <div class="cp-hero__bg" style="background-image:url('https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1200&q=80')"></div>
      <div class="cp-hero__overlay"></div>
      <div class="container cp-hero__inner">
        <div class="cp-hero__content">
          <div class="cp-pretitle">Эффект бетона</div>
          <h1 class="cp-hero__title" itemprop="name">Натяжной потолок под бетон в&nbsp;Иркутске</h1>
          <p class="cp-hero__price">Акция: <span>3-й потолок в подарок!</span> Гарантия 12 лет.<br>Фотопечать лофт-бетона — 1 день монтажа. Оплата после приёмки.</p>
          <div class="cp-hero__price-badge" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <meta itemprop="priceCurrency" content="RUB"/><meta itemprop="price" :content="String(price)"/>
            от <strong>{{ price }} ₽/м²</strong> — монтаж включён
          </div>
          <form class="cp-hero__form" @submit.prevent="callbackOpen = true">
            <input v-model="formName" class="cp-inp" type="text" placeholder="Ваше имя"/>
            <input :value="formPhone" class="cp-inp" type="tel" placeholder="+7 (999) 999-99-99" required @input="formPhone = maskPhone($event)"/>
            <button type="submit" class="nav-btn cp-hero__btn"><Icon name="lucide:calculator" size="16"/>Рассчитать стоимость</button>
          </form>
          <p class="cp-policy">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
        </div>
      </div>
    </section>

    <section class="cp-section cp-about">
      <div class="container">
        <div class="cp-two-col">
          <div class="cp-main">
            <h2 class="cp-h2">Натяжной потолок под бетон — лофт-эффект без штукатурки</h2>
            <div class="cp-text" itemprop="description">
              <p>Потолок «под бетон» — это натяжное полотно с фотопечатью высокого разрешения, которое воспроизводит текстуру бетонной плиты настолько точно, что отличить от настоящего бетона можно только на ощупь. Популярное решение для лофт-интерьеров, студий, кухонь-гостиных и коммерческих помещений.</p>
              <p>В отличие от декоративной штукатурки «под бетон», натяжной потолок монтируется за 1 день, не требует подготовки основания и скрывает любые коммуникации. Никакой пыли, грязи и дополнительных работ.</p>

              <div class="cp-beton-badge">
                <div class="cp-beton-badge__icon"><Icon name="lucide:printer" size="20"/></div>
                <div>
                  <div class="cp-beton-badge__title">Только 3 принтера в России</div>
                  <div class="cp-beton-badge__desc">способны печатать текстуру бетона с фотореалистичной передачей зернистости, трещин и оттенков. Мы работаем с одним из них — разрешение печати от 1200 dpi.</div>
                </div>
              </div>

              <h3>Как это работает</h3>
              <p>Изображение бетонной текстуры наносится прямой печатью на ПВХ-полотно или ткань. Принтер воспроизводит глубину рисунка, оттенки серого, характерные трещины и поры — точно как у настоящего промышленного бетона. После монтажа полотно натягивается без швов и создаёт полную иллюзию монолитного перекрытия.</p>

              <h3>Преимущества перед штукатуркой «под бетон»</h3>
              <ul class="cp-list">
                <li v-for="adv in advantages" :key="adv.title"><strong>{{ adv.title }}.</strong> {{ adv.desc }}</li>
              </ul>
            </div>
          </div>
          <aside class="cp-aside">
            <div class="cp-aside-card">
              <div class="cp-aside-card__title">Вызвать замерщика</div>
              <p class="cp-aside-card__desc">Замерщик приедет бесплатно, покажет образцы текстур бетона, рассчитает стоимость и оформит договор</p>
              <div class="cp-aside-price">от <strong>{{ price }} ₽</strong><span>/м²</span></div>
              <ul class="cp-aside-list">
                <li v-for="i in asideItems" :key="i"><Icon name="lucide:check-circle" size="14" class="cp-check"/>{{ i }}</li>
              </ul>
              <button class="nav-btn cp-aside-btn" @click="callbackOpen = true"><Icon name="lucide:phone-call" size="15"/>Заказать звонок</button>
              <NuxtLink to="/kalkulyator" class="cp-aside-calc"><Icon name="lucide:calculator" size="14"/>Рассчитать онлайн</NuxtLink>
            </div>
            <div class="cp-aside-nav">
              <div class="cp-aside-nav__title">Другие технологии</div>
              <nav>
                <NuxtLink v-for="v in otherVidy" :key="v.slug" :to="v.slug" class="cp-aside-nav__link">
                  <Icon name="lucide:arrow-right" size="13"/>{{ v.title }}
                </NuxtLink>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ГОТОВЫЕ РАБОТЫ -->
    <CpWorksSection :works="worksWithPrice" @lightbox="openLightbox" />

    <section class="cp-section cp-gallery" v-if="gallery.length">
      <div class="container">
        <div class="cp-section-head">
          <div class="cp-pretitle cp-pretitle--dark">Фотогалерея</div>
          <h2 class="cp-h2 cp-h2--center">Фотографии натяжных потолков под бетон</h2>
          <p class="cp-section-desc">Наши реализованные проекты в Иркутске — нажмите на фото для просмотра</p>
        </div>
        <div class="cp-gallery-grid">
          <div v-for="photo in gallery" :key="'g-'+photo.id" class="cp-gallery-item" @click="openLightbox(photo.img, photo.title)">
            <img :src="photo.img" :alt="photo.title" loading="lazy" class="cp-gallery-img"/>
            <div class="cp-gallery-overlay"><Icon name="lucide:zoom-in" size="22"/></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Сравнение: бетон vs штукатурка -->
    <section class="cp-section cp-compare">
      <div class="container">
        <div class="cp-section-head">
          <div class="cp-pretitle cp-pretitle--dark">Сравнение</div>
          <h2 class="cp-h2 cp-h2--center">Натяжной «бетон» vs декоративная штукатурка</h2>
        </div>
        <div class="cp-compare-grid">
          <div class="cp-compare-col cp-compare-col--win">
            <div class="cp-compare-col__head">
              <Icon name="lucide:check-circle" size="20"/>
              Натяжной потолок «бетон»
            </div>
            <ul>
              <li v-for="p in pros" :key="p"><Icon name="lucide:check" size="14"/>{{ p }}</li>
            </ul>
          </div>
          <div class="cp-compare-col">
            <div class="cp-compare-col__head">
              <Icon name="lucide:x-circle" size="20"/>
              Декоративная штукатурка
            </div>
            <ul>
              <li v-for="c in cons" :key="c"><Icon name="lucide:x" size="14"/>{{ c }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="cp-calc-cta">
      <div class="container cp-calc-cta__inner">
        <div class="cp-calc-cta__icon"><Icon name="lucide:calculator" size="28"/></div>
        <div>
          <div class="cp-calc-cta__title">Рассчитайте стоимость потолка «бетон» онлайн</div>
          <p class="cp-calc-cta__desc">Укажите площадь и дополнительные работы — калькулятор покажет предварительную цену за 1 минуту</p>
        </div>
        <NuxtLink to="/kalkulyator" class="nav-btn cp-calc-cta__btn"><Icon name="lucide:arrow-right" size="16"/>Открыть калькулятор</NuxtLink>
      </div>
    </section>

    <section class="cp-section cp-promo">
      <div class="container">
        <div class="cp-section-head">
          <div class="cp-pretitle cp-pretitle--dark">Выгодные условия</div>
          <h2 class="cp-h2 cp-h2--center">Акции и скидки на потолки «под бетон»</h2>
        </div>
        <CpPromoCards @callback="callbackOpen = true" />
      </div>
    </section>

    <section class="cp-section cp-why">
      <div class="container">
        <div class="cp-section-head">
          <div class="cp-pretitle cp-pretitle--dark">Почему мы</div>
          <h2 class="cp-h2 cp-h2--center">Гарантия на потолки 12 лет</h2>
        </div>
        <div class="cp-why-grid">
          <div class="cp-why-card" v-for="w in whyCards" :key="w.title">
            <div class="cp-why-card__icon"><Icon :name="w.icon" size="22"/></div>
            <div class="cp-why-card__title">{{ w.title }}</div>
            <div class="cp-why-card__desc">{{ w.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="cp-section cp-faq" itemscope itemtype="https://schema.org/FAQPage">
      <div class="container">
        <div class="cp-section-head">
          <div class="cp-pretitle cp-pretitle--dark">Вопросы и ответы</div>
          <h2 class="cp-h2 cp-h2--center">Частые вопросы про натяжной потолок «бетон»</h2>
        </div>
        <div class="cp-faq-list">
          <div class="cp-faq-item" v-for="(q, i) in faqItems" :key="q.q" itemprop="mainEntity" itemscope itemtype="https://schema.org/Question" :class="{ open: faqOpen === i }" @click="faqOpen = faqOpen === i ? -1 : i">
            <div class="cp-faq-item__q" itemprop="name">{{ q.q }}<Icon :name="faqOpen === i ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="18" class="cp-faq-item__arrow"/></div>
            <div class="cp-faq-item__a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer"><div itemprop="text">{{ q.a }}</div></div>
          </div>
        </div>
      </div>
    </section>

    <section class="cp-section cp-seo">
      <div class="container">
        <div class="cp-seo-inner">
          <div class="cp-seo-content">
            <h2>Натяжной потолок «бетон» в Иркутске — цены с установкой под ключ</h2>
            <p>Компания <strong>ПроПотолок</strong> устанавливает натяжные потолки с эффектом бетона в Иркутске. Работаем с фотопечатью высокого разрешения — один из трёх принтеров в России, способных передать фотореалистичную текстуру промышленного бетона. Оплата после приёмки, гарантия 12 лет.</p>
            <h3>Где применяется</h3>
            <p>Потолок «под бетон» идеально вписывается в лофт-интерьеры, квартиры-студии, кухни-гостиные, офисы, шоу-румы и заведения общественного питания. Сочетается с металлом, деревом, кирпичом и бетонными стенами.</p>
            <h3>Монтаж в Иркутске — замер бесплатно</h3>
            <p>Выезжаем по всему Иркутску и Иркутскому району. Привезём образцы текстур бетона на дом. Монтаж — 1 день. Оплата после приёмки работ.</p>
          </div>
          <div class="cp-seo-links">
            <div class="cp-seo-links__title">Смотрите также</div>
            <nav>
              <NuxtLink v-for="l in seoLinks" :key="l.to" :to="l.to" class="cp-seo-link"><Icon name="lucide:arrow-right" size="13"/>{{ l.label }}</NuxtLink>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <section class="cp-cta">
      <div class="container cp-cta__inner">
        <div>
          <h2 class="cp-cta__title">Хотите потолок «под бетон»?</h2>
          <p class="cp-cta__desc">Вызовите замерщика — привезёт образцы текстур, рассчитает стоимость и оформит договор прямо на месте</p>
        </div>
        <div class="cp-cta__btns">
          <button class="nav-btn cp-cta__btn" @click="callbackOpen = true"><Icon name="lucide:phone-call" size="16"/>Заказать звонок</button>
          <NuxtLink to="/kalkulyator" class="cp-cta__outline"><Icon name="lucide:calculator" size="16"/>Калькулятор</NuxtLink>
        </div>
      </div>
    </section>

    <Teleport to="body">
      <Transition name="lb">
        <div v-if="lightbox.open" class="cp-lightbox" @click.self="lightbox.open = false">
          <div class="cp-lightbox__box">
            <button class="cp-lightbox__close" @click="lightbox.open = false"><Icon name="lucide:x" size="22"/></button>
            <img :src="lightbox.img" :alt="lightbox.title" class="cp-lightbox__img"/>
            <div class="cp-lightbox__title" v-if="lightbox.title">{{ lightbox.title }}</div>
          </div>
        </div>
      </Transition>
    </Teleport>
    <ModalCallback v-model="callbackOpen" :initial-name="formName" :initial-phone="formPhone" />
  </div>
</template>

<script setup lang="ts">
import { vidy } from '~/data/catalog'
import type { GalleryItem } from '~/data/gallery'
import { usePageContent, usePageGallery, usePagePortfolio } from '~/composables/usePageContent'
import { useCatalogPrices } from '~/composables/useCatalogPrices'

const _content = await usePageContent('natyazhnye-potolki-beton')
const faqItems = ref(_content.faqItems ?? [
  {
    q: 'Отличается ли натяжной потолок «бетон» от настоящего бетонного?',
    a: 'Визуально — практически нет. Разрешение печати от 1200 dpi воспроизводит текстуру, зернистость и оттенки настоящего бетона. Отличие только на ощупь: натяжное полотно мягкое и гладкое.',
  },
  {
    q: 'Сколько принтеров в России умеют печатать реалистичный бетон?',
    a: 'Только 3 принтера в стране обеспечивают нужное разрешение и цветопередачу для фотореалистичной текстуры промышленного бетона. Мы работаем с одним из них — это гарантирует качество изображения.',
  },
  {
    q: 'Можно ли выбрать оттенок бетона? Тёмный, светлый, с трещинами?',
    a: 'Да. В каталоге десятки вариантов: светлый лофт-бетон, тёмный промышленный, состаренный с патиной, с видимой арматурой и характерными трещинами. Также можем напечатать по вашему референсу.',
  },
  {
    q: 'Подойдёт ли потолок «под бетон» для спальни?',
    a: 'Да, особенно в сочетании с деревянными элементами и мягким освещением. Для спальни рекомендуем светло-серый или «состаренный» бетон — выглядит дорого и уютно, не давит психологически.',
  },
  {
    q: 'Выгорает ли рисунок со временем?',
    a: 'Нет. Пигменты для печати на ПВХ-полотне устойчивы к ультрафиолету. За 12 лет гарантийного срока рисунок не потеряет чёткость и насыщенность.',
  },
])
const advantages = ref(_content.advantages ?? [
  { title: 'Монтаж за 1 день',         desc: 'Против 3–7 дней нанесения и сушки декоративной штукатурки — со всей грязью и пылью.' },
  { title: 'Никакой подготовки потолка', desc: 'Монтируем прямо поверх старого покрытия, скрываем трещины, перепады и коммуникации.' },
  { title: 'Фотореалистичность',         desc: 'Печать 1200+ dpi — зернистость, поры, трещины и оттенки серого как у настоящего бетона.' },
  { title: 'Можно мыть',                desc: 'Полотно протирается влажной тряпкой. Штукатурка боится влаги и механических воздействий.' },
  { title: 'Гарантия 12 лет',           desc: 'Письменная гарантия на полотно, крепёж и монтажные работы по договору.' },
  { title: 'Цена ниже',                 desc: 'Декоративная штукатурка с эффектом бетона стоит дороже в материале и работе.' },
])
const seoLinks = ref(_content.seoLinks ?? [
  { to: '/catalog/vidy/natyazhnye-potolki-s-fotopechatyu', label: 'Потолки с фотопечатью' },
  { to: '/catalog/vidy/natyazhnye-potolki-3d', label: '3D натяжные потолки' },
  { to: '/catalog/faktury/matovye-natyazhnye-potolki', label: 'Матовые натяжные потолки' },
  { to: '/catalog/faktury/tkanevye-natyazhnye-potolki', label: 'Тканевые потолки' },
])

const gallery = ref(await usePageGallery('natyazhnye-potolki-beton'))
const portfolio = ref(await usePagePortfolio('natyazhnye-potolki-beton'))
const _prices = await useCatalogPrices()
const price = computed(() => _prices.value?.['beton'] ?? 550)

const otherVidy = vidy.filter(v => v.slug !== '/catalog/vidy/natyazhnye-potolki-beton').map(v => ({ id: v.id, slug: v.slug, title: v.title }))
const worksWithPrice = portfolio.value.filter(g => g.price)

useHead({
  title: 'Натяжной потолок под бетон в Иркутске — цены с монтажом | ПроПотолок',
  meta: [
    { name: 'description', content: `Натяжной потолок с эффектом бетона в Иркутске от ${price.value} ₽/м² с монтажом. Фотопечать 1200 dpi — только 3 принтера в России. Монтаж за 1 день, гарантия 12 лет. Бесплатный замер.` },
    { property: 'og:type', content: 'product' },
  ],
})

const callbackOpen = ref(false)
const faqOpen = ref(-1)
const formName = ref('')
const formPhone = ref('')
const lightbox = reactive({ open: false, img: '', title: '' })
function openLightbox(img: string, title: string) { lightbox.img = img; lightbox.title = title; lightbox.open = true }

onMounted(() => {
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') lightbox.open = false }
  document.addEventListener('keydown', onKey)
  onUnmounted(() => document.removeEventListener('keydown', onKey))
})

const asideItems = ['Бесплатный замер на дому', 'Образцы текстур бетона на выбор', 'Монтаж включён в цену', 'Гарантия 12 лет по договору', 'Оплата после приёмки']

const whyCards = [
  { icon: 'lucide:printer',       title: '3 принтера в России',   desc: 'Работаем с одним из трёх принтеров в стране, способных печатать фотореалистичную текстуру бетона с разрешением 1200+ dpi.' },
  { icon: 'lucide:badge-check',   title: 'Сертификаты',           desc: 'На все полотна и расходники предоставим сертификаты соответствия по запросу.' },
  { icon: 'lucide:shield-check',  title: 'Гарантия 12 лет',       desc: 'Письменная гарантия по договору. Рисунок не выгорает, не смывается и не трескается.' },
  { icon: 'lucide:palette',       title: 'Десятки текстур',       desc: 'Светлый, тёмный, состаренный, с арматурой — привезём образцы на замер.' },
  { icon: 'lucide:banknote',      title: 'Оплата после',          desc: 'Платите только после приёмки готовой работы: наличными, картой или переводом.' },
  { icon: 'lucide:hammer',        title: 'Монтаж за 1 день',      desc: 'Комнату монтируем за 2–4 часа без пыли, грязи и шума.' },
]

const pros = [
  'Монтаж за 1 день без пыли и грязи',
  'Не нужна подготовка основания',
  'Скрывает коммуникации и дефекты',
  'Фотореалистичная текстура 1200 dpi',
  'Можно мыть влажной тряпкой',
  'Гарантия 12 лет по договору',
  'Цена ниже, чем у штукатурки',
]
const cons = [
  'Нанесение 3–7 дней + сушка',
  'Требует идеально ровного основания',
  'Много пыли и строительного мусора',
  'Боится влаги и царапин',
  'Сложно отремонтировать участок',
  'Стоит дороже в работе и материале',
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
</script>

<style scoped>
.cp-pretitle { display: inline-block; font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: .5px; background: var(--accent); color: var(--dark); }
.cp-pretitle--dark { background: var(--accent); color: var(--dark); }
.cp-check { color: var(--accent); flex-shrink: 0; }
.cp-section { padding: 64px 0; }
.cp-section-head { text-align: center; margin-bottom: 40px; }
.cp-h2 { font-size: 30px; font-weight: 800; color: var(--dark); margin: 0 0 10px; line-height: 1.2; }
.cp-h2--center { text-align: center; }
.cp-section-desc { font-size: 15px; color: var(--gray); max-width: 560px; margin: 0 auto; line-height: 1.6; }

/* HERO */
.cp-hero { position: relative; min-height: 480px; display: flex; align-items: center; }
.cp-hero__bg { position: absolute; inset: 0; background-size: cover; background-position: center; z-index: 0; }
.cp-hero__overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,.6) 55%, rgba(0,0,0,.25) 100%); z-index: 1; }
.cp-hero__inner { position: relative; z-index: 2; padding-top: 56px; padding-bottom: 56px; }
.cp-hero__content { max-width: 620px; }
.cp-hero__title { font-size: 42px; font-weight: 900; color: #fff; line-height: 1.15; margin-bottom: 14px; }
.cp-hero__price { font-size: 16px; color: rgba(255,255,255,.65); line-height: 1.7; margin-bottom: 10px; }
.cp-hero__price span { color: var(--accent); font-weight: 700; }
.cp-hero__price-badge { font-size: 20px; color: rgba(255,255,255,.8); margin-bottom: 26px; }
.cp-hero__price-badge strong { color: var(--accent); font-weight: 900; }
.cp-hero__form { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; }
.cp-inp { flex: 1; min-width: 160px; padding: 13px 16px; border: none; border-radius: 10px; font-size: 15px; font-family: var(--font); color: var(--dark); outline: none; background: rgba(255,255,255,.95); }
.cp-hero__btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 24px; font-size: 15px; border-radius: 10px; white-space: nowrap; }
.cp-policy { font-size: 11px; color: rgba(255,255,255,.35); margin: 0; }

/* ОПИСАНИЕ */
.cp-about { background: #fff; }
.cp-two-col { display: grid; grid-template-columns: 1fr 300px; gap: 56px; align-items: start; }
.cp-text h3 { font-size: 17px; font-weight: 700; color: var(--dark); margin: 22px 0 8px; }
.cp-text p  { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 10px; }
.cp-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
.cp-list li { font-size: 14px; color: #555; line-height: 1.6; padding-left: 16px; position: relative; }
.cp-list li::before { content: '—'; position: absolute; left: 0; color: var(--accent); }

/* Бейдж "3 принтера" */
.cp-beton-badge {
  display: flex; gap: 14px; align-items: flex-start;
  background: #1a1a1a; border-radius: 14px; padding: 18px 20px;
  margin: 20px 0; border-left: 4px solid var(--accent);
}
.cp-beton-badge__icon { width: 40px; height: 40px; flex-shrink: 0; background: var(--accent); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #000; }
.cp-beton-badge__title { font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 4px; }
.cp-beton-badge__desc  { font-size: 13px; color: rgba(255,255,255,.6); line-height: 1.6; }

/* САЙДБАР */
.cp-aside { position: sticky; top: 100px; display: flex; flex-direction: column; gap: 20px; }
.cp-aside-card { background: #fff; border: 2px solid var(--accent); border-radius: 16px; padding: 24px; }
.cp-aside-card__title { font-size: 16px; font-weight: 800; color: var(--dark); margin-bottom: 8px; }
.cp-aside-card__desc { font-size: 13px; color: var(--gray); line-height: 1.6; margin-bottom: 16px; }
.cp-aside-price { font-size: 22px; font-weight: 900; color: var(--dark); margin-bottom: 4px; }
.cp-aside-price strong { color: var(--accent); }
.cp-aside-price span { font-size: 14px; font-weight: 400; color: var(--gray); }
.cp-aside-list { list-style: none; padding: 0; margin: 0 0 20px; display: flex; flex-direction: column; gap: 8px; }
.cp-aside-list li { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #555; }
.cp-aside-btn { width: 100%; justify-content: center; margin-bottom: 10px; }
.cp-aside-calc { display: flex; align-items: center; gap: 6px; justify-content: center; font-size: 13px; color: var(--gray); text-decoration: none; }
.cp-aside-nav { background: #f7f7f7; border-radius: 12px; padding: 16px; }
.cp-aside-nav__title { font-size: 12px; font-weight: 700; color: var(--gray); text-transform: uppercase; letter-spacing: .5px; margin-bottom: 10px; }
.cp-aside-nav__link { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--dark); text-decoration: none; padding: 6px 0; border-bottom: 1px solid #eee; }
.cp-aside-nav__link:last-child { border-bottom: none; }

/* СРАВНЕНИЕ */
.cp-compare { background: #fff; }
.cp-compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 860px; margin: 0 auto; }
.cp-compare-col { border-radius: 16px; border: 1.5px solid #eee; overflow: hidden; }
.cp-compare-col--win { border-color: var(--accent); }
.cp-compare-col__head { display: flex; align-items: center; gap: 10px; padding: 16px 20px; font-size: 15px; font-weight: 800; color: var(--dark); background: #f7f7f7; border-bottom: 1.5px solid #eee; }
.cp-compare-col--win .cp-compare-col__head { background: #fffbe6; border-color: var(--accent); color: var(--dark); }
.cp-compare-col ul { list-style: none; padding: 16px 20px; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.cp-compare-col li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #555; }
.cp-compare-col--win li { color: var(--dark); font-weight: 500; }

/* КАЛЬКУЛЯТОР CTA */
.cp-calc-cta { background: var(--dark); padding: 32px 0; }
.cp-calc-cta__inner { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
.cp-calc-cta__icon { color: var(--accent); flex-shrink: 0; }
.cp-calc-cta__title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 4px; }
.cp-calc-cta__desc { font-size: 13px; color: rgba(255,255,255,.5); }
.cp-calc-cta__btn { margin-left: auto; flex-shrink: 0; }

/* ПОЧЕМУ МЫ */
.cp-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.cp-why-card { background: #fff; border-radius: 12px; padding: 20px; border: 1px solid #eee; }
.cp-why-card__icon { width: 40px; height: 40px; background: #fffbe6; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--accent); margin-bottom: 12px; }
.cp-why-card__title { font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 6px; }
.cp-why-card__desc { font-size: 13px; color: var(--gray); line-height: 1.6; }

/* FAQ */
.cp-faq { background: #f7f7f7; }
.cp-faq-list { display: flex; flex-direction: column; gap: 8px; max-width: 800px; margin: 0 auto; }
.cp-faq-item { background: #fff; border-radius: 12px; border: 1px solid #eee; overflow: hidden; cursor: pointer; }
.cp-faq-item__q { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 20px; font-size: 15px; font-weight: 600; color: var(--dark); }
.cp-faq-item__arrow { flex-shrink: 0; color: var(--gray); }
.cp-faq-item__a { max-height: 0; overflow: hidden; transition: max-height .3s ease; padding: 0 20px; font-size: 14px; color: #555; line-height: 1.7; }
.cp-faq-item.open .cp-faq-item__a { max-height: 300px; padding-bottom: 16px; }

/* SEO */
.cp-seo { background: #fff; }
.cp-seo-inner { display: grid; grid-template-columns: 1fr 260px; gap: 40px; }
.cp-seo-content h2 { font-size: 20px; font-weight: 800; color: var(--dark); margin: 0 0 12px; }
.cp-seo-content h3 { font-size: 16px; font-weight: 700; color: var(--dark); margin: 20px 0 6px; }
.cp-seo-content p  { font-size: 14px; color: #555; line-height: 1.8; margin: 0 0 8px; }
.cp-seo-links__title { font-size: 13px; font-weight: 700; color: var(--gray); text-transform: uppercase; letter-spacing: .5px; margin-bottom: 12px; }
.cp-seo-link { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--dark); text-decoration: none; padding: 6px 0; border-bottom: 1px solid #eee; }
.cp-seo-link:last-child { border-bottom: none; }

/* CTA */
.cp-cta { background: var(--accent); padding: 56px 0; }
.cp-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
.cp-cta__title { font-size: 28px; font-weight: 900; color: var(--dark); margin: 0 0 8px; }
.cp-cta__desc { font-size: 15px; color: rgba(0,0,0,.6); }
.cp-cta__btns { display: flex; gap: 12px; flex-wrap: wrap; }
.cp-cta__btn { background: var(--dark); color: #fff; }
.cp-cta__outline { display: inline-flex; align-items: center; gap: 8px; padding: 13px 24px; font-size: 15px; font-weight: 700; font-family: var(--font); border: 2px solid rgba(0,0,0,.3); border-radius: 50px; color: var(--dark); text-decoration: none; }

/* ГАЛЕРЕЯ */
.cp-gallery { background: #f7f7f7; }
.cp-gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.cp-gallery-item { position: relative; aspect-ratio: 4/3; overflow: hidden; border-radius: 10px; cursor: pointer; background: #e8e8e8; }
.cp-gallery-img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s ease; }
.cp-gallery-item:hover .cp-gallery-img { transform: scale(1.07); }
.cp-gallery-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.35); display: flex; align-items: center; justify-content: center; color: #fff; opacity: 0; transition: opacity .2s; }
.cp-gallery-item:hover .cp-gallery-overlay { opacity: 1; }

/* LIGHTBOX */
.cp-lightbox { position: fixed; inset: 0; z-index: 600; background: rgba(0,0,0,.85); display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(4px); }
.cp-lightbox__box { position: relative; max-width: 1000px; width: 100%; max-height: 90vh; display: flex; flex-direction: column; }
.cp-lightbox__close { position: absolute; top: -44px; right: 0; background: rgba(255,255,255,.15); border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; color: #fff; display: flex; align-items: center; justify-content: center; }
.cp-lightbox__img { width: 100%; height: auto; max-height: 80vh; object-fit: contain; border-radius: 10px; display: block; }
.cp-lightbox__title { text-align: center; color: rgba(255,255,255,.7); font-size: 14px; margin-top: 12px; }
.lb-enter-active, .lb-leave-active { transition: opacity .2s; }
.lb-enter-from, .lb-leave-to { opacity: 0; }

@media (max-width: 1100px) { .cp-gallery-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 900px) {
  .cp-two-col { grid-template-columns: 1fr; }
  .cp-aside { position: static; }
  .cp-why-grid { grid-template-columns: 1fr 1fr; }
  .cp-seo-inner { grid-template-columns: 1fr; }
  .cp-compare-grid { grid-template-columns: 1fr; }
  .cp-gallery-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .cp-hero__title { font-size: 28px; }
  .cp-why-grid { grid-template-columns: 1fr; }
  .cp-gallery-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
