<template>
  <div itemscope itemtype="https://schema.org/Product">
    <section class="cp-hero">
      <div class="cp-hero__bg" style="background-image:url('https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80')"></div>
      <div class="cp-hero__overlay"></div>
      <div class="container cp-hero__inner">
        <div class="cp-hero__content">
          <div class="cp-pretitle">3D технология</div>
          <h1 class="cp-hero__title" itemprop="name">3D натяжные потолки в&nbsp;Иркутске</h1>
          <p class="cp-hero__price">Акция: <span>3-й потолок в подарок!</span> Гарантия 12 лет.<br>Фотопечать любого изображения. Монтаж за 1 день.</p>
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
            <h2 class="cp-h2">3D натяжные потолки в Иркутске — объёмные рисунки на потолке</h2>
            <div class="cp-text" itemprop="description">
              <p>3D натяжной потолок отличается от обычного объёмным изображением на полотне. Раньше такое можно было встретить только в кинотеатрах и развлекательных заведениях — сейчас устанавливаем в квартирах и домах Иркутска. Правильно подобранный рисунок придаёт помещению дополнительное визуальное пространство и увеличивает кажущуюся высоту.</p>
              <p><strong>Одноуровневый 3D:</strong> рисунок наносится фотопечатью на ПВХ-плёнку или ткань. Выбирается из каталога или по вашему эскизу. Для большего эффекта добавьте точечное или светодиодное освещение — рисунок будет выглядеть ярче.</p>
              <p><strong>Многоуровневый 3D:</strong> печать распределяется по нескольким ярусам, используются каркасы для придания формы. Более сложный и эффектный вариант для гостиных и залов.</p>
              <h3>Преимущества 3D натяжных потолков</h3>
              <ul class="cp-list">
                <li v-for="adv in advantages" :key="adv.title"><strong>{{ adv.title }}.</strong> {{ adv.desc }}</li>
              </ul>
            </div>
          </div>
          <aside class="cp-aside">
            <div class="cp-aside-card">
              <div class="cp-aside-card__title">Вызвать замерщика</div>
              <p class="cp-aside-card__desc">Замерщик приедет бесплатно, покажет образцы, рассчитает стоимость и оформит договор</p>
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
          <h2 class="cp-h2 cp-h2--center">Фотографии 3D натяжных потолков</h2>
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

    <section class="cp-calc-cta">
      <div class="container cp-calc-cta__inner">
        <div class="cp-calc-cta__icon"><Icon name="lucide:calculator" size="28"/></div>
        <div>
          <div class="cp-calc-cta__title">Рассчитайте стоимость 3D потолка онлайн</div>
          <p class="cp-calc-cta__desc">Укажите площадь и дополнительные работы — калькулятор покажет предварительную цену за 1 минуту</p>
        </div>
        <NuxtLink to="/kalkulyator" class="nav-btn cp-calc-cta__btn"><Icon name="lucide:arrow-right" size="16"/>Открыть калькулятор</NuxtLink>
      </div>
    </section>

    <section class="cp-section cp-promo">
      <div class="container">
        <div class="cp-section-head">
          <div class="cp-pretitle cp-pretitle--dark">Выгодные условия</div>
          <h2 class="cp-h2 cp-h2--center">Акции и скидки на 3D потолки</h2>
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
          <h2 class="cp-h2 cp-h2--center">Частые вопросы про 3D натяжные потолки</h2>
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
            <h2>3D натяжные потолки в Иркутске — цены с установкой под ключ</h2>
            <p>Компания <strong>ПроПотолок</strong> устанавливает 3D натяжные потолки в Иркутске. Работаем с одноуровневыми и многоуровневыми конструкциями. Поможем выбрать изображение или напечатаем по вашему макету. Оплата после приёмки, гарантия 12 лет.</p>
            <h3>Освещение для 3D потолка</h3>
            <p>Для усиления эффекта используем светодиодные ленты и точечные светильники. При правильном освещении объёмный рисунок смотрится особенно выразительно. Устанавливаем закладные и подключаем подсветку в рамках одного монтажа.</p>
            <h3>Монтаж в Иркутске — замер бесплатно</h3>
            <p>Выезжаем по всему Иркутску и Иркутскому району. Замер и консультация — бесплатно. Монтаж — 1 день. Оплата после приёмки работ.</p>
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
          <h2 class="cp-cta__title">Хотите 3D натяжной потолок?</h2>
          <p class="cp-cta__desc">Вызовите замерщика — приедет бесплатно, покажет образцы и рассчитает стоимость на месте</p>
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

const _content = await usePageContent('natyazhnye-potolki-3d')
const faqItems = ref(_content.faqItems ?? [
  { q: 'Можно ли использовать собственный рисунок для 3D потолка?', a: 'Да. Принимаем готовые макеты в PNG, JPG, PDF, AI, CDR. Если нет готового — поможем подобрать из каталога или создадим дизайн под ваш интерьер.' },
  { q: 'Как выбрать рисунок, чтобы получился настоящий 3D-эффект?', a: 'Выбирайте изображения с центральной перспективой, снятые снизу-вверх: небо с облаками, космос, морской горизонт, лесной пейзаж, абстрактные объёмные паттерны. При правильном освещении эффект будет ярким.' },
  { q: 'Какая фактура лучше подходит для 3D потолка?', a: 'Чаще всего используют матовое и сатиновое полотно — они не дают бликов и рисунок смотрится чётче. Глянцевое полотно применяется реже, когда нужен эффект зеркального отражения.' },
  { q: 'Есть ли ограничения по температуре для 3D потолков?', a: 'ПВХ-полотно не рекомендуется устанавливать в помещениях без отопления или с температурой выше 60°C. Для неотапливаемых помещений подойдёт тканевое полотно.' },
  { q: 'Сколько стоит 3D натяжной потолок в Иркутске?', a: 'Стоимость зависит от площади и выбранного изображения. Замерщик рассчитает точную цену на месте бесплатно. Оплата — только после монтажа.' },
])
const advantages = ref(_content.advantages ?? [
  { title: 'Скрывает дефекты', desc: 'Скрывает точечное освещение, неровности и дефекты базового потолочного покрытия.' },
  { title: 'Необычный дизайн', desc: 'Городские пейзажи, океан, лес, космос — создаёт уникальный интерьер.' },
  { title: 'Пожаробезопасность', desc: 'ПВХ-полотно не поддерживает горение. Все материалы сертифицированы.' },
  { title: 'Без конденсата', desc: 'Низкая теплопроводность — можно устанавливать в помещениях с повышенной влажностью.' },
  { title: 'Антистатичность', desc: 'Не притягивает пыль, легко протирается мягкой тряпкой.' },
  { title: 'Долгий срок службы', desc: 'Рисунок не выгорает, не смывается. Гарантия 12 лет по договору.' },
])
const seoLinks = ref(_content.seoLinks ?? [
  { to: '/catalog/vidy/natyazhnye-potolki-s-fotopechatyu', label: 'Потолки с фотопечатью' },
  { to: '/catalog/vidy/natyazhnye-potolki-zvezdnoe-nebo', label: 'Звёздное небо' },
  { to: '/catalog/vidy/natyazhnye-potolki-so-svetovymi-liniyami', label: 'Световые линии' },
  { to: '/catalog/faktury/matovye-natyazhnye-potolki', label: 'Матовые натяжные потолки' },
])

const gallery = ref(await usePageGallery('natyazhnye-potolki-3d'))
const portfolio = ref(await usePagePortfolio('natyazhnye-potolki-3d'))
const _prices = await useCatalogPrices()
const price = computed(() => (_prices.value?.['fotopechat'] ?? 400) + (_prices.value?.['matovye'] ?? 159))

const otherVidy = vidy.filter(v => v.id !== 'base' && v.slug !== '/catalog/vidy/natyazhnye-potolki-3d').map(v => ({ id: v.id, slug: v.slug, title: v.title }))
const worksWithPrice = portfolio.value.filter(g => g.price)

usePageSeoMeta('natyazhnye-potolki-3d')

const callbackOpen = ref(false)
const faqOpen = ref(-1)
const formName = ref('')
const formPhone = ref('')
const visibleWorksCount = ref(4)
const lightbox = reactive({ open: false, img: '', title: '' })
const visibleWorks = computed(() => worksWithPrice.slice(0, visibleWorksCount.value))
function openLightbox(img: string, title: string) { lightbox.img = img; lightbox.title = title; lightbox.open = true }
function fmt(n: number) { return n.toLocaleString('ru-RU') }
onMounted(() => {
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') lightbox.open = false }
  document.addEventListener('keydown', onKey)
  onUnmounted(() => document.removeEventListener('keydown', onKey))
})

const asideItems = ['Бесплатный замер на дому', 'Монтаж включён в цену', 'Гарантия 12 лет по договору', 'Оплата после монтажа', 'Работаем в выходные']
const whyCards = [
  { icon: 'lucide:image',         title: 'Своя дизайн-студия',   desc: 'Поможем подобрать изображение или поработаем с вашим макетом.' },
  { icon: 'lucide:badge-check',   title: 'Сертификаты',          desc: 'На все фактуры предоставим сертификаты соответствия по запросу.' },
  { icon: 'lucide:shield-check',  title: 'Гарантия 12 лет',      desc: 'Письменная гарантия по договору на 12 лет.' },
  { icon: 'lucide:globe',         title: 'Европейские материалы', desc: 'MSD, Bauf, Descor, Clipso — премиальные полотна на складе.' },
  { icon: 'lucide:banknote',      title: 'Оплата после',       desc: 'Платите только после приёмки готовой работы: наличными, картой или переводом.' },
  { icon: 'lucide:hammer',        title: 'Быстрый монтаж',       desc: 'Стандартная комната — 1 день, без пыли и шума.' },
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
.cp-hero { position: relative; min-height: 480px; display: flex; align-items: center; }
.cp-hero__bg { position: absolute; inset: 0; background-size: cover; background-position: center; z-index: 0; }
.cp-hero__overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,.82) 0%, rgba(0,0,0,.55) 55%, rgba(0,0,0,.2) 100%); z-index: 1; }
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
.cp-about { background: #fff; }
.cp-two-col { display: grid; grid-template-columns: 1fr 300px; gap: 56px; align-items: start; }
.cp-text h3 { font-size: 17px; font-weight: 700; color: var(--dark); margin: 22px 0 8px; }
.cp-text p  { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 10px; }
.cp-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
.cp-list li { font-size: 14px; color: #555; line-height: 1.6; padding-left: 16px; position: relative; }
.cp-list li::before { content: '—'; position: absolute; left: 0; color: var(--accent); }
.cp-aside-card { background: #fff; border: 2px solid var(--accent); border-radius: 16px; padding: 24px; margin-bottom: 16px; }
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
.cp-calc-cta { background: var(--dark); padding: 32px 0; }
.cp-calc-cta__inner { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
.cp-calc-cta__icon { color: var(--accent); flex-shrink: 0; }
.cp-calc-cta__title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 4px; }
.cp-calc-cta__desc { font-size: 13px; color: rgba(255,255,255,.5); }
.cp-calc-cta__btn { margin-left: auto; flex-shrink: 0; }
.cp-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.cp-why-card { background: #fff; border-radius: 12px; padding: 20px; border: 1px solid #eee; }
.cp-why-card__icon { width: 40px; height: 40px; background: #fffbe6; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--accent); margin-bottom: 12px; }
.cp-why-card__title { font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 6px; }
.cp-why-card__desc { font-size: 13px; color: var(--gray); line-height: 1.6; }
.cp-faq-list { display: flex; flex-direction: column; gap: 8px; max-width: 800px; margin: 0 auto; }
.cp-faq-item { background: #fff; border-radius: 12px; border: 1px solid #eee; overflow: hidden; cursor: pointer; }
.cp-faq-item__q { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 20px; font-size: 15px; font-weight: 600; color: var(--dark); }
.cp-faq-item__arrow { flex-shrink: 0; color: var(--gray); }
.cp-faq-item__a { max-height: 0; overflow: hidden; transition: max-height .3s ease; padding: 0 20px; font-size: 14px; color: #555; line-height: 1.7; }
.cp-faq-item.open .cp-faq-item__a { max-height: 300px; padding-bottom: 16px; }
.cp-seo { background: #f7f7f7; }
.cp-seo-inner { display: grid; grid-template-columns: 1fr 260px; gap: 40px; }
.cp-seo-content h2 { font-size: 20px; font-weight: 800; color: var(--dark); margin: 0 0 12px; }
.cp-seo-content h3 { font-size: 16px; font-weight: 700; color: var(--dark); margin: 20px 0 6px; }
.cp-seo-content p  { font-size: 14px; color: #555; line-height: 1.8; margin: 0 0 8px; }
.cp-seo-links__title { font-size: 13px; font-weight: 700; color: var(--gray); text-transform: uppercase; letter-spacing: .5px; margin-bottom: 12px; }
.cp-seo-link { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--dark); text-decoration: none; padding: 6px 0; border-bottom: 1px solid #eee; }
.cp-seo-link:last-child { border-bottom: none; }
.cp-cta { background: var(--accent); padding: 56px 0; }
.cp-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
.cp-cta__title { font-size: 28px; font-weight: 900; color: var(--dark); margin: 0 0 8px; }
.cp-cta__desc { font-size: 15px; color: rgba(0,0,0,.6); }
.cp-cta__btns { display: flex; gap: 12px; flex-wrap: wrap; }
.cp-cta__btn { background: var(--dark); color: #fff; }
.cp-cta__outline { display: inline-flex; align-items: center; gap: 8px; padding: 13px 24px; font-size: 15px; font-weight: 700; font-family: var(--font); border: 2px solid rgba(0,0,0,.3); border-radius: 50px; color: var(--dark); text-decoration: none; }
.cp-works { background: #f7f7f7; }
.cp-works-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.cp-work-card { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #eee; display: flex; flex-direction: column; }
.cp-work-card__img-wrap { position: relative; aspect-ratio: 4/3; overflow: hidden; cursor: pointer; background: #f0f0f0; }
.cp-work-card__img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s ease; }
.cp-work-card__img-wrap:hover .cp-work-card__img { transform: scale(1.07); }
.cp-work-card__zoom { position: absolute; inset: 0; background: rgba(0,0,0,.3); display: flex; align-items: center; justify-content: center; color: #fff; opacity: 0; transition: opacity .2s; }
.cp-work-card__img-wrap:hover .cp-work-card__zoom { opacity: 1; }
.cp-work-card__body { padding: 14px; flex: 1; display: flex; flex-direction: column; gap: 8px; }
.cp-work-card__title { font-size: 14px; font-weight: 700; color: var(--dark); }
.cp-work-card__details { display: flex; flex-wrap: wrap; gap: 4px; }
.cp-work-card__detail { font-size: 11px; background: #f0f0f0; border-radius: 20px; padding: 2px 10px; color: #666; }
.cp-work-card__footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
.cp-work-card__area { font-size: 12px; color: var(--gray); }
.cp-work-card__price { font-size: 15px; font-weight: 800; color: var(--dark); }
.cp-works-more { text-align: center; }
.cp-more-btn { display: inline-flex; align-items: center; gap: 8px; padding: 11px 24px; font-size: 14px; font-weight: 700; background: none; border: 2px solid #ddd; border-radius: 50px; color: var(--dark); cursor: pointer; font-family: var(--font); transition: border-color .15s; }
.cp-more-btn:hover { border-color: var(--accent); }
.cp-gallery { background: #fff; }
.cp-gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.cp-gallery-item { position: relative; aspect-ratio: 4/3; overflow: hidden; border-radius: 10px; cursor: pointer; background: #f0f0f0; }
.cp-gallery-img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s ease; }
.cp-gallery-item:hover .cp-gallery-img { transform: scale(1.07); }
.cp-gallery-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.35); display: flex; align-items: center; justify-content: center; color: #fff; opacity: 0; transition: opacity .2s; }
.cp-gallery-item:hover .cp-gallery-overlay { opacity: 1; }
.cp-lightbox { position: fixed; inset: 0; z-index: 600; background: rgba(0,0,0,.85); display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(4px); }
.cp-lightbox__box { position: relative; max-width: 1000px; width: 100%; max-height: 90vh; display: flex; flex-direction: column; }
.cp-lightbox__close { position: absolute; top: -44px; right: 0; background: rgba(255,255,255,.15); border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; color: #fff; display: flex; align-items: center; justify-content: center; transition: background .15s; }
.cp-lightbox__close:hover { background: rgba(255,255,255,.25); }
.cp-lightbox__img { width: 100%; height: auto; max-height: 80vh; object-fit: contain; border-radius: 10px; display: block; }
.cp-lightbox__title { text-align: center; color: rgba(255,255,255,.7); font-size: 14px; margin-top: 12px; }
.lb-enter-active, .lb-leave-active { transition: opacity .2s; }
.lb-enter-from, .lb-leave-to { opacity: 0; }
@media (max-width: 1100px) { .cp-works-grid { grid-template-columns: repeat(3, 1fr); } .cp-gallery-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 900px) {
  .cp-two-col { grid-template-columns: 1fr; }
  .cp-why-grid { grid-template-columns: 1fr 1fr; }
  .cp-seo-inner { grid-template-columns: 1fr; }
  .cp-works-grid { grid-template-columns: repeat(2, 1fr); }
  .cp-gallery-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .cp-hero__title { font-size: 28px; }
  .cp-why-grid { grid-template-columns: 1fr; }
}
</style>
