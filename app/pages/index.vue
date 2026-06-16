<template>
  <section class="hero">
      <div class="hero__bg-placeholder"></div>
      <div class="hero__overlay"></div>
      <div class="container hero__container">

        <div class="hero__content">
          <h1 class="hero__pretitle">Натяжные потолки в Иркутске</h1>
          <div class="hero__title">Европейские натяжные&nbsp;потолки — от&nbsp;<span class="hero__title-price">{{ _prices?.['base'] ?? 159 }}&nbsp;руб./м²</span></div>
          <p class="hero__text">
            Акция: <span class="hero__text-accent">3-й потолок в подарок!</span><br>
            Гарантия по договору 12 лет. Монтаж за 1 день.<br>
            Потолки без запаха. Чистый монтаж.
          </p>

          <form class="hero__form" @submit.prevent="submitForm">
            <input v-model="formName" class="hero__input" type="text" placeholder="Ваше имя" />
            <input :value="formPhone" class="hero__input" type="tel" placeholder="+7 (999) 999-99-99" required @input="formPhone = maskPhone($event)" />
            <button type="submit" class="nav-btn hero__submit">
              <Icon name="lucide:calculator" size="17" />
              Рассчитать стоимость
            </button>
          </form>
          <p class="hero__policy">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
        </div>

        <div class="hero__badge">
          <div class="hero__badge-inner">
            <div class="hero__badge-top">Акция</div>
            <div class="hero__badge-num">10%</div>
            <div class="hero__badge-bot">при заказе сегодня</div>
          </div>
        </div>

      </div>

      <div class="hero__facts container">
        <div class="hero__fact">
          <Icon name="lucide:shield-check" size="26" class="hero__fact-icon" />
          <div>
            <div class="hero__fact-val">12 лет</div>
            <div class="hero__fact-label">гарантия</div>
          </div>
        </div>
        <div class="hero__fact">
          <Icon name="lucide:clock" size="26" class="hero__fact-icon" />
          <div>
            <div class="hero__fact-val">1 день</div>
            <div class="hero__fact-label">монтаж</div>
          </div>
        </div>
        <div class="hero__fact">
          <Icon name="lucide:ruler" size="26" class="hero__fact-icon" />
          <div>
            <div class="hero__fact-val">Бесплатно</div>
            <div class="hero__fact-label">замер на дому</div>
          </div>
        </div>
        <div class="hero__fact">
          <Icon name="lucide:banknote" size="26" class="hero__fact-icon" />
          <div>
            <div class="hero__fact-val">Без предоплаты</div>
            <div class="hero__fact-label">оплата после монтажа</div>
          </div>
        </div>
        <div class="hero__fact">
          <Icon name="lucide:star" size="26" class="hero__fact-icon" />
          <div>
            <div class="hero__fact-val">15+ лет</div>
            <div class="hero__fact-label">опыт работы</div>
          </div>
        </div>
      </div>
  </section>

  <!-- КАТАЛОГ -->
  <section class="section catalog-section">
    <div class="container">

      <div class="section-head">
        <div class="section-pretitle">Виды потолков</div>
        <h2 class="section-title">Каталог натяжных потолков</h2>
        <p class="section-desc">Европейские полотна премиум-класса — матовые, глянцевые, сатиновые и тканевые фактуры на любой вкус</p>
      </div>

      <div class="catalog-grid">
        <NuxtLink
          v-for="item in catalog"
          :key="item.slug"
          :to="item.slug"
          class="cat-card"
        >
          <div class="cat-card__img" :style="{ backgroundImage: `url('${heroImg(item)}')` }"></div>
          <div class="cat-card__overlay"></div>
          <div class="cat-card__body">
            <div class="cat-card__badge" v-if="item.badge">{{ item.badge }}</div>
            <div class="cat-card__title">{{ item.title }}</div>
            <div class="cat-card__price">от {{ item.price }}&nbsp;руб/м²</div>
          </div>
          <div class="cat-card__arrow">
            <Icon name="lucide:arrow-right" size="18" />
          </div>
        </NuxtLink>
      </div>

      <!-- По помещению -->
      <div class="cat-subgroup">
        <div class="cat-subgroup__head">
          <h3 class="cat-subgroup__title">По помещению</h3>
          <NuxtLink to="/catalog/po-pomescheniyu" class="cat-subgroup__all">Все помещения <Icon name="lucide:arrow-right" size="14"/></NuxtLink>
        </div>
        <div class="catalog-grid catalog-grid--sm">
          <NuxtLink v-for="item in roomCards" :key="item.to" :to="item.to" class="cat-card cat-card--sm">
            <div class="cat-card__img" :style="{ backgroundImage: `url('${heroImg(item)}')` }"></div>
            <div class="cat-card__overlay"></div>
            <div class="cat-card__body">
              <div class="cat-card__title">{{ item.title }}</div>
            </div>
            <div class="cat-card__arrow"><Icon name="lucide:arrow-right" size="16"/></div>
          </NuxtLink>
        </div>
      </div>

      <!-- По цвету -->
      <div class="cat-subgroup">
        <div class="cat-subgroup__head">
          <h3 class="cat-subgroup__title">По цвету</h3>
          <NuxtLink to="/catalog/tsveta" class="cat-subgroup__all">Все цвета <Icon name="lucide:arrow-right" size="14"/></NuxtLink>
        </div>
        <div class="catalog-grid catalog-grid--sm">
          <NuxtLink v-for="item in colorCards" :key="item.to" :to="item.to" class="cat-card cat-card--sm">
            <div class="cat-card__img" :style="{ backgroundImage: `url('${heroImg(item)}')` }"></div>
            <div class="cat-card__overlay"></div>
            <div class="cat-card__body">
              <div class="cat-card__title">{{ item.title }}</div>
            </div>
            <div class="cat-card__arrow"><Icon name="lucide:arrow-right" size="16"/></div>
          </NuxtLink>
        </div>
      </div>

      <!-- По виду -->
      <div class="cat-subgroup">
        <div class="cat-subgroup__head">
          <h3 class="cat-subgroup__title">По виду</h3>
          <NuxtLink to="/catalog/vidy" class="cat-subgroup__all">Все виды <Icon name="lucide:arrow-right" size="14"/></NuxtLink>
        </div>
        <div class="catalog-grid">
          <NuxtLink v-for="item in typeCards" :key="item.to" :to="item.to" class="cat-card">
            <div class="cat-card__img" :style="{ backgroundImage: `url('${heroImg(item)}')` }"></div>
            <div class="cat-card__overlay"></div>
            <div class="cat-card__body">
              <div class="cat-card__title">{{ item.title }}</div>
              <div class="cat-card__price">от {{ item.price }}&nbsp;руб/м²</div>
            </div>
            <div class="cat-card__arrow"><Icon name="lucide:arrow-right" size="16"/></div>
          </NuxtLink>
        </div>
      </div>

      <div class="catalog-cta">
        <NuxtLink to="/catalog" class="nav-btn catalog-cta__btn">
          <Icon name="lucide:layout-grid" size="18" />
          Перейти в каталог
        </NuxtLink>
      </div>

    </div>
  </section>

  <CalcWidget />

  <!-- ═══ АКЦИИ ═══ -->
  <section class="idx-section idx-promos">
    <div class="container">
      <div class="idx-head">
        <div class="idx-pretitle">Выгодные условия</div>
        <h2 class="idx-title">Акции и скидки</h2>
        <p class="idx-desc">Успейте воспользоваться текущими предложениями — часть акций ограничена по времени</p>
      </div>
      <div class="promo-grid">
        <div v-for="p in promoCards" :key="p.id" class="promo-card">
          <div class="promo-card__icon" :style="{ background: p.color + '22', color: p.color }">
            <Icon :name="p.icon" size="26"/>
          </div>
          <div v-if="p.badge" class="promo-card__badge">{{ p.badge }}</div>
          <div class="promo-card__discount">{{ p.discount }}</div>
          <div class="promo-card__title">{{ p.title }}</div>
          <div class="promo-card__sub">{{ p.subtitle }}</div>
          <ul class="promo-card__list">
            <li v-for="c in p.conditions.slice(0,3)" :key="c">
              <Icon name="lucide:check" size="13" class="promo-card__check"/>{{ c }}
            </li>
          </ul>
          <button class="nav-btn promo-card__btn" @click="callbackOpenIdx = true">Получить подарок</button>
        </div>
      </div>
      <div class="idx-more">
        <NuxtLink to="/akczii" class="idx-more-link">
          Все акции и скидки <Icon name="lucide:arrow-right" size="15"/>
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- ═══ ПОРТФОЛИО ═══ -->
  <section class="idx-section idx-portfolio">
    <div class="container">
      <div class="idx-head">
        <div class="idx-pretitle">Наши работы</div>
        <h2 class="idx-title">Готовые проекты с ценами</h2>
        <p class="idx-desc">Реальные работы наших мастеров в Иркутске — с указанием площади и итоговой стоимости</p>
      </div>
      <div class="port-grid">
        <div v-for="item in portfolioCards" :key="item.id" class="port-card" @click="openLightbox(item.photos[0], item.title)">
          <div class="port-card__img" :style="{ backgroundImage: `url('${item.photos[0]}')` }"></div>
          <div class="port-card__overlay"></div>
          <div class="port-card__zoom"><Icon name="lucide:zoom-in" size="18"/></div>
          <div class="port-card__body">
            <div class="port-card__title">{{ item.title }}</div>
            <div class="port-card__meta">
              <span>{{ item.area }} м²</span>
              <span>{{ item.texture }}</span>
              <span v-if="item.view !== 'Обычный'">{{ item.view }}</span>
            </div>
            <div class="port-card__price">{{ fmt(item.price) }} ₽</div>
          </div>
        </div>
      </div>
      <div class="idx-more">
        <NuxtLink to="/portfolio" class="idx-more-link">
          Смотреть все работы <Icon name="lucide:arrow-right" size="15"/>
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- ═══ ГАЛЕРЕЯ ═══ -->
  <section v-if="gallery.length" class="idx-section idx-gallery">
    <div class="container">
      <div class="idx-head">
        <div class="idx-pretitle">Наши работы</div>
        <h2 class="idx-title">Фотогалерея натяжных потолков</h2>
        <p class="idx-desc">Реальные объекты в Иркутске — нажмите на фото для просмотра</p>
      </div>
      <div class="idx-gallery-grid">
        <div
          v-for="photo in gallery" :key="photo.id"
          class="idx-gallery-item"
          @click="openLightbox(photo.img, photo.title)"
        >
          <img :src="photo.img" :alt="photo.title" loading="lazy" class="idx-gallery-img"/>
          <div class="idx-gallery-overlay">
            <Icon name="lucide:zoom-in" size="22"/>
            <span v-if="photo.title" class="idx-gallery-caption">{{ photo.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ КАК МЫ РАБОТАЕМ ═══ -->
  <section class="idx-section idx-steps">
    <div class="container">
      <div class="idx-head">
        <div class="idx-pretitle">Просто и прозрачно</div>
        <h2 class="idx-title">Как происходит заказ</h2>
        <p class="idx-desc">4 простых шага от звонка до готового потолка — всё за 1–2 дня</p>
      </div>
      <div class="steps-grid">
        <div v-for="(step, i) in steps" :key="step.title" class="step-card">
          <div class="step-card__num">{{ i + 1 }}</div>
          <div class="step-card__icon"><Icon :name="step.icon" size="28"/></div>
          <div class="step-card__title">{{ step.title }}</div>
          <div class="step-card__desc">{{ step.desc }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ ПОЧЕМУ МЫ ═══ -->
  <section class="idx-section idx-why">
    <div class="container">
      <div class="idx-head">
        <div class="idx-pretitle">ПроПотолок Иркутск</div>
        <h2 class="idx-title">Почему выбирают нас</h2>
        <p class="idx-desc">Работаем с 2009 года. Более 3 000 довольных клиентов в Иркутске и области</p>
      </div>
      <div class="why-grid">
        <div v-for="w in whyCards" :key="w.title" class="why-card">
          <div class="why-card__icon"><Icon :name="w.icon" size="24"/></div>
          <div class="why-card__title">{{ w.title }}</div>
          <div class="why-card__desc">{{ w.desc }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ ОТЗЫВЫ ═══ -->
  <section class="idx-section idx-reviews">
    <div class="container">
      <div class="idx-head-row">
        <div>
          <div class="idx-pretitle">Реальные клиенты</div>
          <h2 class="idx-title">Отзывы о нашей работе</h2>
        </div>
        <div class="idx-rating-badges">
          <div v-for="(stat, key) in platformStats" :key="key" class="rating-badge">
            <div class="rating-badge__stars">
              <span v-for="n in 5" :key="n" :class="n <= Math.round(stat.rating) ? 'star-filled' : 'star-empty'">★</span>
            </div>
            <div class="rating-badge__val">{{ stat.rating }}</div>
            <div class="rating-badge__name">{{ stat.name }}</div>
            <div class="rating-badge__count">{{ stat.count }} отзывов</div>
          </div>
        </div>
      </div>

      <!-- Табы -->
      <div class="reviews-tabs">
        <button
          class="reviews-tab"
          :class="{ 'reviews-tab--active': reviewsTab === 'yandex' }"
          @click="reviewsTab = 'yandex'"
        >
          <Icon name="simple-icons:yandex" size="14"/>
          Яндекс Карты
          <span class="reviews-tab__count">{{ platformStats?.yandex?.count }}</span>
        </button>
        <button
          class="reviews-tab"
          :class="{ 'reviews-tab--active': reviewsTab === '2gis' }"
          @click="reviewsTab = '2gis'"
        >
          <Icon name="lucide:map-pin" size="14"/>
          2ГИС
          <span class="reviews-tab__count">{{ platformStats?.['2gis']?.count }}</span>
        </button>
      </div>

      <div class="reviews-grid">
        <div v-for="r in reviewsSlice" :key="r.id" class="review-card">
          <div class="review-card__head">
            <img v-if="r.avatar" :src="r.avatar" :alt="r.author" class="review-card__avatar review-card__avatar--photo" />
            <div v-else class="review-card__avatar">{{ r.author[0] }}</div>
            <div>
              <div class="review-card__author">{{ r.author }}</div>
              <div class="review-card__meta">
                <span class="review-card__room" v-if="r.roomType">{{ r.roomType }}</span>
                <span class="review-card__date">{{ fmtDate(r.date) }}</span>
              </div>
            </div>
            <div class="review-card__stars">
              <span v-for="n in 5" :key="n" :class="n <= r.rating ? 'star-filled' : 'star-empty'">★</span>
            </div>
          </div>
          <div class="review-card__text">{{ r.text }}</div>
          <div v-if="r.reply" class="review-card__reply">
            <Icon name="lucide:corner-down-right" size="13"/>{{ r.reply }}
          </div>
        </div>
      </div>

      <div class="idx-more">
        <NuxtLink to="/otzyvy" class="idx-more-link">
          Все отзывы <Icon name="lucide:arrow-right" size="15"/>
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- ═══ РАССРОЧКА ═══ -->
  <section class="idx-section idx-credit">
    <div class="container idx-credit__inner">
      <div class="idx-credit__text">
        <div class="idx-pretitle">Без переплат</div>
        <h2 class="idx-title">Не хватает денег на потолок?</h2>
        <p class="idx-credit__desc">Оформим рассрочку без переплаты прямо в день замера. Первый взнос — 0%. Монтаж сразу после подписания договора.</p>
        <ul class="idx-credit__list">
          <li v-for="item in creditItems" :key="item"><Icon name="lucide:check-circle" size="16" class="idx-credit__check"/>{{ item }}</li>
        </ul>
        <button class="nav-btn idx-credit__btn" @click="callbackOpenIdx = true">
          <Icon name="lucide:credit-card" size="16"/>Оформить рассрочку
        </button>
      </div>
      <div class="idx-credit__cards">
        <div v-for="c in creditCards" :key="c.title" class="credit-card">
          <div class="credit-card__val">{{ c.val }}</div>
          <div class="credit-card__label">{{ c.title }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ FAQ ═══ -->
  <section class="idx-section idx-faq">
    <div class="container">
      <div class="idx-head">
        <div class="idx-pretitle">Вопросы и ответы</div>
        <h2 class="idx-title">Часто задаваемые вопросы</h2>
      </div>
      <div class="faq-list">
        <div
          v-for="(q, i) in faqs" :key="i"
          class="faq-item"
          :class="{ open: faqOpen === i }"
          @click="faqOpen = faqOpen === i ? -1 : i"
        >
          <div class="faq-item__q">
            <span>{{ q.q }}</span>
            <Icon :name="faqOpen === i ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="18" class="faq-item__arr"/>
          </div>
          <div class="faq-item__a">{{ q.a }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ ФИНАЛЬНЫЙ CTA ═══ -->
  <section class="idx-cta">
    <div class="container idx-cta__inner">
      <div>
        <h2 class="idx-cta__title">Готовы сделать потолок вашей мечты?</h2>
        <p class="idx-cta__desc">Вызовите замерщика бесплатно — приедет в удобное время, покажет образцы и рассчитает стоимость на месте</p>
      </div>
      <div class="idx-cta__btns">
        <button class="nav-btn idx-cta__btn" @click="callbackOpenIdx = true">
          <Icon name="lucide:phone-call" size="17"/>Заказать звонок
        </button>
        <NuxtLink to="/kalkulyator" class="idx-cta__outline">
          <Icon name="lucide:calculator" size="17"/>Калькулятор
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- Lightbox -->
  <Teleport to="body">
    <Transition name="lb">
      <div v-if="lightbox.open" class="idx-lightbox" @click.self="lightbox.open = false">
        <div class="idx-lightbox__box">
          <button class="idx-lightbox__close" @click="lightbox.open = false"><Icon name="lucide:x" size="22"/></button>
          <img :src="lightbox.img" :alt="lightbox.title" class="idx-lightbox__img"/>
          <div class="idx-lightbox__title" v-if="lightbox.title">{{ lightbox.title }}</div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <ModalCallback v-model="callbackOpenIdx" :initial-name="formName" :initial-phone="formPhone" />
</template>

<script setup lang="ts">
const { heroImg } = useCatalogHeroes()
usePageSeoMeta('index')
import { promotions as defaultPromotions } from '~/data/promotions'
import type { Review } from '~/data/reviews'
import { portfolio as defaultPortfolio } from '~/data/portfolio'
import type { PortfolioItem } from '~/data/portfolio'
import { usePageGallery } from '~/composables/usePageContent'
import { useCatalogPrices } from '~/composables/useCatalogPrices'
import type { Promotion } from '~/data/promotions'

const _prices = await useCatalogPrices()
const { data: promotionsData } = await useAsyncData<Promotion[]>(
  'index-promotions',
  () => $fetch<Promotion[]>('/api/cms/promotions'),
  { default: () => defaultPromotions },
)

const formName = ref('')
const formPhone = ref('')

// ── Новые секции ────────────────────────────────────────────────
const callbackOpenIdx = ref(false)
const faqOpen = ref(-1)
const lightbox = reactive({ open: false, img: '', title: '' })

const promoCards = computed(() =>
  (promotionsData.value ?? defaultPromotions).filter(p => p.active && p.featured).slice(0, 3)
)
const gallery = ref(await usePageGallery('index'))

const { data: portfolioData } = await useAsyncData<PortfolioItem[]>(
  'index-portfolio',
  () => $fetch<PortfolioItem[]>('/api/cms/portfolio'),
  { default: () => defaultPortfolio },
)
const portfolioCards = computed(() => (portfolioData.value ?? defaultPortfolio).slice(0, 6))

// Отзывы из API
const { data: reviewsData } = await useAsyncData<Review[]>(
  'index-reviews',
  () => $fetch<Review[]>('/api/reviews'),
  { default: () => [] },
)
const reviewsTab = ref<'yandex' | '2gis'>('yandex')
const reviewsSlice = computed(() => {
  const list = (reviewsData.value ?? []).filter(r => r.platform === reviewsTab.value)
  return list.slice(0, 6)
})
const platformStats = computed(() => {
  const all = reviewsData.value ?? []
  const y = all.filter(r => r.platform === 'yandex')
  const g = all.filter(r => r.platform === '2gis')
  const avg = (arr: Review[]) => arr.length ? Math.round(arr.reduce((s, r) => s + r.rating, 0) / arr.length * 10) / 10 : 4.9
  return {
    yandex: { name: 'Яндекс Карты', rating: avg(y), count: y.length },
    '2gis':  { name: '2ГИС',         rating: avg(g), count: g.length },
  }
})

function openLightbox(img: string, title: string) {
  lightbox.img = img; lightbox.title = title; lightbox.open = true
}
function fmt(n: number) { return n.toLocaleString('ru-RU') }
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

onMounted(() => {
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') lightbox.open = false }
  document.addEventListener('keydown', onKey)
  onUnmounted(() => document.removeEventListener('keydown', onKey))
})

const steps = [
  { icon: 'lucide:phone-call',   title: 'Заявка и замер',       desc: 'Оставьте заявку — замерщик приедет в удобное время, бесплатно измерит помещение и покажет образцы.' },
  { icon: 'lucide:clipboard',    title: 'Договор и расчёт',     desc: 'Подписываем договор с фиксированной ценой. Никаких скрытых доплат — всё включено.' },
  { icon: 'lucide:package',      title: 'Изготовление полотна', desc: 'Полотно нарезается точно под ваши размеры на производстве. Срок — 1–3 рабочих дня.' },
  { icon: 'lucide:hammer',       title: 'Монтаж за 1 день',     desc: 'Мастера приезжают и монтируют потолок за 2–4 часа. Убирают за собой. Сдают работу под ключ.' },
]

const whyCards = [
  { icon: 'lucide:shield-check',  title: 'Гарантия 12 лет',         desc: 'Письменная гарантия по договору на полотно и монтаж. Без ограничений и мелкого шрифта.' },
  { icon: 'lucide:banknote',      title: 'Без предоплаты',           desc: 'Оплата только после монтажа и вашей приёмки работы. Наличными, картой или безналом.' },
  { icon: 'lucide:ruler',         title: 'Бесплатный замер',         desc: 'Замерщик приедет в любой район Иркутска бесплатно и привезёт образцы всех фактур.' },
  { icon: 'lucide:leaf',          title: 'Без запаха',               desc: 'Монтаж методом холодного натяжения. Въезжать можно сразу после завершения работ.' },
  { icon: 'lucide:globe',         title: 'Европейские материалы',    desc: 'Работаем с MSD, Bauf, Pongs, Clipso, Cerutti — сертифицированные полотна в наличии на складе.' },
  { icon: 'lucide:clock',         title: 'Монтаж за 1 день',         desc: 'Всю квартиру монтируем за 1 рабочий день. Мастера работают без выходных.' },
  { icon: 'lucide:droplets',      title: 'Водонепроницаемость',      desc: 'ПВХ-полотно удерживает до 100 л/м² при затоплении. Незаменимо для кухонь и ванных.' },
  { icon: 'lucide:badge-check',   title: 'Опыт с 2009 года',         desc: 'Более 3 000 установленных потолков в Иркутске. Сертифицированные мастера с опытом 5+ лет.' },
  { icon: 'lucide:star',          title: 'Рейтинг 4.9 на Яндексе',  desc: 'Более 190 отзывов на Яндекс Картах, 2ГИС и Авито. 97% клиентов рекомендуют нас друзьям.' },
]

const creditItems = [
  'Рассрочка 0% на срок до 12 месяцев',
  'Первый взнос — 0 рублей',
  'Монтаж сразу после подписания договора',
  'Оформление за 15 минут прямо на замере',
  'Без справок и поручителей',
]

const creditCards = [
  { val: '0%',    title: 'Переплата' },
  { val: '0 ₽',  title: 'Первый взнос' },
  { val: '12',   title: 'Месяцев рассрочки' },
  { val: '15',   title: 'Минут на оформление' },
]

const faqs = [
  { q: 'Сколько стоит натяжной потолок в Иркутске?',      a: `Стоимость зависит от фактуры, площади и дополнительных работ. Минимальная цена — от ${_prices.value?.['base'] ?? 159} ₽/м² за матовое белое полотно. Монтаж включён. Точная цена — после бесплатного замера.` },
  { q: 'Сколько времени занимает монтаж?',                 a: 'Стандартная комната до 20 м² монтируется за 2–4 часа. Всю квартиру из 3–4 комнат выполняем за 1 рабочий день. Мебель выносить не нужно — достаточно отодвинуть от стен на 30 см.' },
  { q: 'Нужно ли выравнивать потолок перед монтажом?',    a: 'Нет. Натяжной потолок скрывает все неровности базового потолка — трещины, перепады, коммуникации. Специальной подготовки не требуется.' },
  { q: 'Чем отличаются матовые и глянцевые потолки?',     a: 'Матовые равномерно рассеивают свет, скрывают неровности, подходят для любых помещений. Глянцевые создают зеркальный эффект и визуально увеличивают пространство. Глянец сложнее в уходе, но эффектнее смотрится в гостиных.' },
  { q: 'Выдержит ли потолок затопление от соседей?',      a: 'Да. ПВХ-полотно удерживает до 100 литров воды на 1 м². Потолок не рухнет — после слива воды мастер приедет и вернёт полотно в форму.' },
  { q: 'Вредны ли натяжные потолки для здоровья?',        a: 'Нет. Мы используем сертифицированные европейские полотна с санитарно-эпидемиологическим заключением. Тканевые потолки без ПВХ рекомендованы для детских и спален.' },
  { q: 'Какую гарантию вы даёте?',                        a: 'Гарантия 12 лет по договору на полотно и монтажные работы. Реальный срок службы полотна — 25–30 лет.' },
  { q: 'Можно ли оплатить в рассрочку?',                  a: 'Да. Оформляем рассрочку 0% на срок до 12 месяцев прямо на замере. Первый взнос — 0 рублей. Монтаж сразу после подписания договора.' },
]

const catalog = computed(() => [
  { slug: '/catalog/faktury/matovye-natyazhnye-potolki',           title: 'Матовые',         price: _prices.value?.['matovye']     ?? 159, badge: 'Хит',   img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75' },
  { slug: '/catalog/faktury/glyancevye-natyazhnye-potolki',        title: 'Глянцевые',       price: _prices.value?.['glyancevye']  ?? 209, badge: null,    img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=75' },
  { slug: '/catalog/faktury/satinovye-natyazhnye-potolki',         title: 'Сатиновые',       price: _prices.value?.['satinovye']   ?? 189, badge: null,    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=75' },
  { slug: '/catalog/faktury/tkanevye-natyazhnye-potolki',          title: 'Тканевые',        price: _prices.value?.['tkanevye']    ?? 319, badge: null,    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=75' },
  { slug: '/catalog/vidy/paryashchie-natyazhnye-potolki',          title: 'Парящий потолок', price: _prices.value?.['paryashchie'] ?? 350, badge: 'Тренд', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=75' },
  { slug: '/catalog/vidy/natyazhnye-potolki-s-podsvetkoy',         title: 'С подсветкой',    price: _prices.value?.['podsvetka']   ?? 320, badge: null,    img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=75' },
  { slug: '/catalog/vidy/dvuhurovnevye-natyazhnye-potolki',        title: 'Двухуровневые',   price: _prices.value?.['dvuhuroven']  ?? 450, badge: null,    img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=75' },
  { slug: '/catalog/vidy/natyazhnye-potolki-s-fotopechatyu',       title: 'Фотопечать',      price: _prices.value?.['fotopechat']  ?? 550, badge: null,    img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=75' },
])

const roomCards = [
  { to: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-gostinoy',      title: 'Гостиная',    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=70' },
  { to: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-spalne',        title: 'Спальня',     img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=70' },
  { to: '/catalog/po-pomescheniyu/natyazhnye-potolki-na-kuhne',        title: 'Кухня',       img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=70' },
  { to: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-vannoy',        title: 'Ванная',      img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=70' },
  { to: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-detskoy',       title: 'Детская',     img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=70' },
  { to: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-prihozhey',     title: 'Прихожая',   img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&q=70' },
  { to: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-kvartire',      title: 'Квартира',    img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&q=70' },
  { to: '/catalog/po-pomescheniyu/natyazhnye-potolki-v-chastnom-dome', title: 'Частный дом', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=70' },
]

const colorCards = [
  { to: '/catalog/tsveta/belye-natyazhnye-potolki',       title: 'Белые',      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=70' },
  { to: '/catalog/tsveta/chernye-natyazhnye-potolki',     title: 'Чёрные',     img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=70' },
  { to: '/catalog/tsveta/serye-natyazhnye-potolki',       title: 'Серые',      img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&q=70' },
  { to: '/catalog/tsveta/bezhevye-natyazhnye-potolki',    title: 'Бежевые',    img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&q=70' },
  { to: '/catalog/tsveta/cvetnye-natyazhnye-potolki',     title: 'Цветные',    img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&q=70' },
  { to: '/catalog/tsveta/zolotye-natyazhnye-potolki',     title: 'Золотые',    img: 'https://images.unsplash.com/photo-1600573472559-240e53e0e27a?w=400&q=70' },
  { to: '/catalog/tsveta/golubye-natyazhnye-potolki',     title: 'Голубые',    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70' },
  { to: '/catalog/tsveta/korichnevye-natyazhnye-potolki', title: 'Коричневые', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=70' },
]

const typeCards = computed(() => [
  { to: '/catalog/vidy/dvuhurovnevye-natyazhnye-potolki',          title: 'Двухуровневые',  price: _prices.value?.['dvuhuroven']  ?? 450, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=70' },
  { to: '/catalog/vidy/paryashchie-natyazhnye-potolki',            title: 'Парящие',        price: _prices.value?.['paryashchie'] ?? 350, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=70' },
  { to: '/catalog/vidy/natyazhnye-potolki-s-podsvetkoy',           title: 'С подсветкой',   price: _prices.value?.['podsvetka']   ?? 320, img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&q=70' },
  { to: '/catalog/vidy/natyazhnye-potolki-s-fotopechatyu',         title: 'Фотопечать',     price: _prices.value?.['fotopechat']  ?? 550, img: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&q=70' },
  { to: '/catalog/vidy/natyazhnye-potolki-zvezdnoe-nebo',          title: 'Звёздное небо',  price: _prices.value?.['zvezdnoe']    ?? 650, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70' },
  { to: '/catalog/vidy/natyazhnye-potolki-so-svetovymi-liniyami',  title: 'Световые линии', price: _prices.value?.['linii']       ?? 380, img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&q=70' },
  { to: '/catalog/vidy/tenevye-natyazhnye-potolki',                title: 'Теневые',        price: _prices.value?.['tenevye']     ?? 300, img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=70' },
  { to: '/catalog/vidy/natyazhnye-potolki-3d',                     title: '3D потолки',     price: 700, img: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&q=70' },
])

function maskPhone(e: Event) {
  const input = e.target as HTMLInputElement
  let val = input.value.replace(/\D/g, '')
  if (val.startsWith('7') || val.startsWith('8')) val = val.slice(1)
  val = val.slice(0, 10)
  val = '7' + val
  let result = '+7'
  if (val.length > 1) result += ' (' + val.slice(1, 4)
  if (val.length >= 4) result += ') ' + val.slice(4, 7)
  if (val.length >= 7) result += '-' + val.slice(7, 9)
  if (val.length >= 9) result += '-' + val.slice(9, 11)
  input.value = result
  return result
}

function submitForm() {
  callbackOpenIdx.value = true
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 580px;
  display: flex;
  flex-direction: column;
}
.hero__bg-placeholder {
  position: absolute;
  inset: 0;
  background-image: url('/img/hero.webp');
  background-size: cover;
  background-position: center;
  z-index: 0;
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0,0,0,.75) 0%, rgba(0,0,0,.5) 60%, rgba(0,0,0,.2) 100%);
  z-index: 1;
}
.hero__container {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 70px;
  padding-bottom: 40px;
  gap: 40px;
}
.hero__content { max-width: 620px; flex: 1; }

.hero__pretitle {
  display: inline-block;
  background: var(--accent);
  color: var(--dark);
  font-size: 13px;
  font-weight: 700;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 18px;
  text-transform: uppercase;
  letter-spacing: .5px;
}
.hero__title {
  font-size: 48px;
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  margin-bottom: 18px;
}
.hero__text {
  font-size: 18px;
  color: rgba(255,255,255,.75);
  line-height: 1.65;
  margin-bottom: 28px;
}

.hero__form {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.hero__input {
  flex: 1;
  min-width: 170px;
  padding: 14px 18px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-family: var(--font);
  color: var(--dark);
  outline: none;
  background: rgba(255,255,255,.95);
}
.hero__input:focus { background: #fff; }
.hero__submit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  font-size: 15px;
  border-radius: 10px;
  white-space: nowrap;
}
.hero__title-price {
  color: var(--accent);
  white-space: nowrap;
}
.hero__text-accent {
  color: var(--accent);
  font-weight: 700;
}
.hero__policy {
  font-size: 11px;
  color: rgba(255,255,255,.4);
}

.hero__badge {
  flex-shrink: 0;
}
.hero__badge-inner {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: var(--accent);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 0 0 10px rgba(245,200,0,.2), 0 0 0 20px rgba(245,200,0,.08);
  animation: badge-pulse 3s ease-in-out infinite;
}
.hero__badge-top {
  font-size: 13px;
  font-weight: 700;
  color: var(--dark);
  text-transform: uppercase;
  letter-spacing: .5px;
}
.hero__badge-num {
  font-size: 52px;
  font-weight: 900;
  color: var(--dark);
  line-height: 1;
}
.hero__badge-bot {
  font-size: 11px;
  font-weight: 600;
  color: rgba(0,0,0,.6);
  max-width: 90px;
  line-height: 1.3;
}
@keyframes badge-pulse {
  0%,100% { box-shadow: 0 0 0 10px rgba(245,200,0,.2), 0 0 0 20px rgba(245,200,0,.08); }
  50%      { box-shadow: 0 0 0 14px rgba(245,200,0,.15), 0 0 0 28px rgba(245,200,0,.05); }
}

.hero__facts {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  background: rgba(0,0,0,.45);
  backdrop-filter: blur(6px);
  border-top: 1px solid rgba(255,255,255,.08);
  padding: 20px 15px;
  gap: 0;
  margin-top: auto;
}
.hero__fact {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
  border-right: 1px solid rgba(255,255,255,.1);
  flex: 1;
}
.hero__fact:last-child { border-right: none; }
.hero__fact-icon { color: var(--accent); flex-shrink: 0; }
.hero__fact-val {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}
.hero__fact-label {
  font-size: 12px;
  color: rgba(255,255,255,.5);
}

@media (max-width: 900px) {
  .hero__badge { display: none; }
  .hero__title { font-size: 36px; }
}
@media (max-width: 640px) {
  .hero__container { padding-top: 40px; }
  .hero__title { font-size: 28px; }
  .hero__text { font-size: 15px; }
  .hero__form { flex-direction: column; }
  .hero__input, .hero__submit { width: 100%; }
  .hero__facts { flex-wrap: wrap; gap: 12px; }
  .hero__fact { flex: 1 1 calc(50% - 24px); border-right: none; padding: 0 8px; }
}

/* ── CATALOG SECTION ── */
.catalog-section { background: #f7f7f7; padding-top: 64px; padding-bottom: 64px; }

.section-head { text-align: center; margin-bottom: 40px; }
.section-pretitle {
  display: inline-block;
  background: var(--accent);
  color: var(--dark);
  font-size: 12px;
  font-weight: 700;
  padding: 3px 14px;
  border-radius: 20px;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: .5px;
}
.section-title {
  font-size: 36px;
  font-weight: 800;
  color: var(--dark);
  margin-bottom: 10px;
  line-height: 1.2;
}
.section-desc {
  font-size: 16px;
  color: var(--gray);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.6;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 28px;
}

.cat-card {
  position: relative;
  display: block;
  border-radius: 14px;
  overflow: hidden;
  height: 220px;
  text-decoration: none;
  box-shadow: 0 2px 12px rgba(0,0,0,.10);
  transition: transform .22s ease, box-shadow .22s ease;
}
.cat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 28px rgba(0,0,0,.18);
}
.cat-card__img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform .4s ease;
}
.cat-card:hover .cat-card__img { transform: scale(1.06); }

.cat-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,.05) 0%, rgba(0,0,0,.65) 100%);
  transition: background .22s;
}
.cat-card:hover .cat-card__overlay {
  background: linear-gradient(180deg, rgba(0,0,0,.1) 0%, rgba(0,0,0,.78) 100%);
}

.cat-card__body {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 16px;
}
.cat-card__badge {
  display: inline-block;
  background: var(--accent);
  color: var(--dark);
  font-size: 10px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: .5px;
  margin-bottom: 6px;
}
.cat-card__title {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  line-height: 1.25;
  margin-bottom: 4px;
}
.cat-card__price {
  font-size: 13px;
  color: rgba(255,255,255,.7);
  font-weight: 500;
}
.cat-card:hover .cat-card__price { color: var(--accent); }

.cat-card__arrow {
  position: absolute;
  top: 14px; right: 14px;
  width: 32px; height: 32px;
  background: rgba(255,255,255,.15);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity .2s ease, transform .2s ease, background .2s;
}
.cat-card:hover .cat-card__arrow {
  opacity: 1;
  transform: translateX(0);
  background: var(--accent);
  color: var(--dark);
}

/* Subgroups */
.cat-subgroup { margin-top: 40px; }
.cat-subgroup__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.cat-subgroup__title {
  font-size: 22px;
  font-weight: 800;
  color: var(--dark);
}
.cat-subgroup__all {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray);
  text-decoration: none;
  transition: color .15s;
}
.cat-subgroup__all:hover { color: var(--dark); }

.catalog-cta {
  margin-top: 48px;
  display: flex;
  justify-content: center;
}
.catalog-cta__btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 40px;
  font-size: 16px;
}

.catalog-grid--sm { grid-template-columns: repeat(8, 1fr); }
.cat-card--sm { height: 140px; border-radius: 10px; }
.cat-card--sm .cat-card__title { font-size: 13px; font-weight: 700; }
.cat-card--sm .cat-card__body { padding: 10px 12px; }

@media (max-width: 1200px) {
  .catalog-grid--sm { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 768px) {
  .catalog-grid--sm { grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .cat-card--sm { height: 110px; }
  .cat-subgroup__title { font-size: 18px; }
}
@media (max-width: 480px) {
  .catalog-grid--sm { grid-template-columns: repeat(3, 1fr); }
  .cat-card--sm { height: 100px; }
}

@media (max-width: 1024px) {
  .catalog-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .catalog-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .section-title { font-size: 28px; }
  .cat-card { height: 180px; }
}
@media (max-width: 480px) {
  .catalog-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .cat-card { height: 160px; }
  .cat-card__title { font-size: 15px; }
  .rooms-row { gap: 10px; }
}

/* ════════════════════════════════════════
   НОВЫЕ СЕКЦИИ
════════════════════════════════════════ */

/* Общие утилиты */
.idx-section { padding: 64px 0; }
.idx-head { text-align: center; margin-bottom: 44px; }
.idx-head-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 32px; flex-wrap: wrap; margin-bottom: 44px; }
.idx-pretitle {
  display: inline-block; background: var(--accent); color: var(--dark);
  font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px;
  margin-bottom: 12px; text-transform: uppercase; letter-spacing: .5px;
}
.idx-title { font-size: 34px; font-weight: 800; color: var(--dark); line-height: 1.2; margin-bottom: 10px; }
.idx-desc  { font-size: 16px; color: var(--gray); max-width: 560px; margin: 0 auto; line-height: 1.65; }
.idx-more  { text-align: center; margin-top: 36px; }
.idx-more-link {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 15px; font-weight: 700; color: var(--dark);
  text-decoration: none; border-bottom: 2px solid var(--accent); padding-bottom: 2px;
  transition: color .15s;
}
.idx-more-link:hover { color: var(--accent); }

/* ── АКЦИИ ── */
.idx-promos { background: #fff; }
.promo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.promo-card {
  background: #f7f7f7; border-radius: 20px; padding: 28px 24px;
  border: 1.5px solid #ececec; position: relative; display: flex; flex-direction: column; gap: 10px;
  transition: border-color .2s, box-shadow .2s;
}
.promo-card:hover { border-color: var(--accent); box-shadow: 0 6px 24px rgba(245,200,0,.12); }
.promo-card__icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
.promo-card__badge {
  position: absolute; top: 16px; right: 16px;
  background: var(--accent); color: var(--dark); font-size: 10px; font-weight: 800;
  padding: 2px 10px; border-radius: 20px; text-transform: uppercase;
}
.promo-card__discount { font-size: 36px; font-weight: 900; color: var(--dark); line-height: 1; font-family: var(--font); }
.promo-card__title { font-size: 17px; font-weight: 800; color: var(--dark); }
.promo-card__sub   { font-size: 13px; color: var(--gray); }
.promo-card__list  { list-style: none; padding: 0; margin: 4px 0 6px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
.promo-card__list li { display: flex; align-items: center; gap: 7px; font-size: 13px; color: #555; }
.promo-card__check { color: var(--accent); flex-shrink: 0; }
.promo-card__btn { display: inline-flex; align-items: center; justify-content: center; padding: 11px; font-size: 13px; margin-top: 4px; }

/* ── ПОРТФОЛИО ── */
.idx-portfolio { background: #f7f7f7; }
.port-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.port-card {
  position: relative; border-radius: 16px; overflow: hidden; height: 260px;
  cursor: pointer; border: 2px solid transparent;
  transition: transform .2s, box-shadow .2s, border-color .2s;
}
.port-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,.15); border-color: var(--accent); }
.port-card__img { position: absolute; inset: 0; background-size: cover; background-position: center; transition: transform .4s ease; }
.port-card:hover .port-card__img { transform: scale(1.06); }
.port-card__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.02) 0%, rgba(0,0,0,.72) 100%); }
.port-card__zoom {
  position: absolute; top: 14px; right: 14px; width: 36px; height: 36px;
  background: rgba(255,255,255,.15); border-radius: 50%;
  display: flex; align-items: center; justify-content: center; color: #fff;
  opacity: 0; transition: opacity .2s;
}
.port-card:hover .port-card__zoom { opacity: 1; }
.port-card__body { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px 18px; }
.port-card__title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 5px; line-height: 1.3; }
.port-card__meta  { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 6px; }
.port-card__meta span { font-size: 11px; color: rgba(255,255,255,.65); background: rgba(255,255,255,.1); padding: 2px 8px; border-radius: 10px; }
.port-card__price { font-size: 16px; font-weight: 800; color: var(--accent); }

/* ── ГАЛЕРЕЯ ── */
.idx-gallery { background: #fff; }
.idx-gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.idx-gallery-item {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  background: #f0f0f0;
}
.idx-gallery-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform .4s ease;
  display: block;
}
.idx-gallery-item:hover .idx-gallery-img { transform: scale(1.07); }
.idx-gallery-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,.4);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 8px; color: #fff;
  opacity: 0; transition: opacity .2s;
}
.idx-gallery-item:hover .idx-gallery-overlay { opacity: 1; }
.idx-gallery-caption {
  font-size: 13px; font-weight: 600;
  text-align: center; padding: 0 12px;
  line-height: 1.35;
}

/* ── ШАГИ ── */
.idx-steps { background: #141414; }
.idx-steps .idx-pretitle { background: rgba(245,200,0,.15); color: var(--accent); }
.idx-steps .idx-title { color: #fff; }
.idx-steps .idx-desc { color: rgba(255,255,255,.4); }
.steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; position: relative; }
.step-card { background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 16px; padding: 28px 22px; position: relative; overflow: hidden; z-index: 1; transition: border-color .2s; }
.step-card:hover { border-color: rgba(245,200,0,.35); }
.step-card__num {
  position: absolute;
  bottom: -74px;
  right: -10px;
  font-size: 260px;
  font-weight: 900;
  font-family: var(--font);
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 2px var(--accent);
  text-stroke: 2px var(--accent);
  opacity: .25;
  user-select: none;
  pointer-events: none;
}
.step-card__icon { width: 52px; height: 52px; background: var(--accent); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--dark); margin-bottom: 16px; }
.step-card__title { font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.step-card__desc  { font-size: 13px; color: rgba(255,255,255,.4); line-height: 1.6; }

/* ── ПОЧЕМУ МЫ ── */
.idx-why { background: #fff; }
.why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.why-card {
  background: #f7f7f7; border-radius: 16px; padding: 24px 20px;
  border: 1.5px solid transparent; transition: border-color .15s, box-shadow .15s;
  display: flex; flex-direction: column; gap: 10px;
}
.why-card:hover { border-color: var(--accent); box-shadow: 0 4px 20px rgba(245,200,0,.1); }
.why-card__icon { width: 48px; height: 48px; background: var(--accent); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--dark); flex-shrink: 0; }
.why-card__title { font-size: 15px; font-weight: 700; color: var(--dark); }
.why-card__desc  { font-size: 13px; color: var(--gray); line-height: 1.6; }

/* ── ОТЗЫВЫ ── */
.idx-reviews { background: #f7f7f7; }
.idx-rating-badges { display: flex; gap: 12px; flex-wrap: wrap; }
.rating-badge {
  background: #fff; border-radius: 14px; padding: 14px 18px;
  border: 1.5px solid #eee; text-align: center; min-width: 120px;
}
.rating-badge__stars { display: flex; gap: 2px; justify-content: center; margin-bottom: 4px; }
.rating-badge__val   { font-size: 22px; font-weight: 900; color: var(--dark); line-height: 1; }
.rating-badge__name  { font-size: 12px; font-weight: 600; color: var(--dark); margin: 2px 0; }
.rating-badge__count { font-size: 11px; color: var(--gray); }
.star-filled { color: #f5c800; }
.star-empty  { color: #e0e0e0; }
.reviews-tabs {
  display: flex; gap: 6px; margin-bottom: 20px;
}
.reviews-tab {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 9px 18px; background: #fff;
  border: 1.5px solid #e0e0e0; border-radius: 24px;
  font-size: 14px; font-weight: 600; color: var(--gray);
  font-family: 'Gilroy', sans-serif; cursor: pointer;
  transition: all .15s;
}
.reviews-tab:hover { border-color: #bbb; color: var(--dark); }
.reviews-tab--active { border-color: var(--accent); color: var(--dark); background: #fffbe6; }
.reviews-tab__count {
  background: #f0f0f0; border-radius: 20px;
  font-size: 11px; font-weight: 700; padding: 1px 7px;
}
.reviews-tab--active .reviews-tab__count { background: rgba(245,200,0,.3); }

.reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.review-card {
  background: #fff; border-radius: 16px; padding: 22px;
  border: 1.5px solid #eee; display: flex; flex-direction: column; gap: 12px;
  transition: border-color .15s, box-shadow .15s;
}
.review-card:hover { border-color: var(--accent); box-shadow: 0 4px 16px rgba(0,0,0,.07); }
.review-card__head { display: flex; align-items: flex-start; gap: 12px; }
.review-card__avatar {
  width: 42px; height: 42px; border-radius: 50%; background: var(--accent);
  color: var(--dark); font-size: 18px; font-weight: 800;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.review-card__avatar--photo { object-fit: cover; }
.review-card__author { font-size: 14px; font-weight: 700; color: var(--dark); }
.review-card__meta   { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 3px; }
.review-card__room   { font-size: 11px; color: var(--accent); background: rgba(245,200,0,.1); padding: 1px 7px; border-radius: 10px; font-weight: 600; }
.review-card__date   { font-size: 11px; color: var(--gray); }
.review-card__stars  { display: flex; gap: 2px; margin-left: auto; flex-shrink: 0; }
.review-card__text   { font-size: 13px; color: #444; line-height: 1.7; flex: 1; }
.review-card__reply  {
  display: flex; align-items: flex-start; gap: 7px;
  font-size: 12px; color: var(--gray); background: #f7f7f7;
  border-radius: 10px; padding: 10px 12px; line-height: 1.5;
}

/* ── РАССРОЧКА ── */
.idx-credit { background: #141414; padding: 64px 0; }
.idx-credit__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.idx-credit .idx-pretitle { background: rgba(245,200,0,.15); color: var(--accent); }
.idx-credit .idx-title { color: #fff; margin-bottom: 14px; }
.idx-credit__desc { font-size: 16px; color: rgba(255,255,255,.5); line-height: 1.7; margin-bottom: 22px; }
.idx-credit__list { list-style: none; padding: 0; margin: 0 0 28px; display: flex; flex-direction: column; gap: 10px; }
.idx-credit__list li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: rgba(255,255,255,.75); }
.idx-credit__check { color: var(--accent); flex-shrink: 0; }
.idx-credit__btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; font-size: 15px; }
.idx-credit__cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.credit-card {
  background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 18px;
  padding: 28px 20px; text-align: center;
  transition: border-color .2s;
}
.credit-card:hover { border-color: rgba(245,200,0,.3); }
.credit-card__val   { font-size: 44px; font-weight: 900; color: var(--accent); line-height: 1; font-family: var(--font); }
.credit-card__label { font-size: 13px; color: rgba(255,255,255,.4); margin-top: 8px; }

/* ── FAQ ── */
.idx-faq { background: #f7f7f7; }
.faq-list { max-width: 860px; margin: 0 auto; display: flex; flex-direction: column; gap: 8px; }
.faq-item {
  background: #fff; border-radius: 14px; border: 1.5px solid transparent;
  overflow: hidden; cursor: pointer; transition: border-color .15s;
}
.faq-item.open { border-color: var(--accent); }
.faq-item__q {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 18px 22px; font-size: 16px; font-weight: 700; color: var(--dark);
  user-select: none;
}
.faq-item__arr { color: var(--gray); flex-shrink: 0; }
.faq-item.open .faq-item__arr { color: var(--accent); }
.faq-item__a {
  max-height: 0; overflow: hidden;
  transition: max-height .3s ease, padding .3s;
  font-size: 14px; color: #555; line-height: 1.75; padding: 0 22px;
}
.faq-item.open .faq-item__a { max-height: 300px; padding: 0 22px 18px; }

/* ── ФИНАЛЬНЫЙ CTA ── */
.idx-cta { background: var(--accent); padding: 60px 0; }
.idx-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.idx-cta__title { font-size: 30px; font-weight: 900; color: var(--dark); margin-bottom: 8px; line-height: 1.2; }
.idx-cta__desc  { font-size: 16px; color: rgba(0,0,0,.55); max-width: 480px; }
.idx-cta__btns  { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; flex-shrink: 0; }
.idx-cta__btn   { background: var(--dark); color: #fff; display: inline-flex; align-items: center; gap: 8px; padding: 15px 30px; font-size: 15px; border-radius: 10px; cursor: pointer; border: none; font-family: var(--font); font-weight: 700; transition: opacity .15s; }
.idx-cta__btn:hover { opacity: .85; }
.idx-cta__outline {
  display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px;
  font-size: 15px; font-weight: 700; font-family: var(--font);
  background: rgba(0,0,0,.1); border: 2px solid rgba(0,0,0,.25);
  border-radius: 10px; color: var(--dark); text-decoration: none;
  transition: background .15s, border-color .15s;
}
.idx-cta__outline:hover { background: rgba(0,0,0,.18); border-color: rgba(0,0,0,.4); }

/* ── LIGHTBOX ── */
.idx-lightbox {
  position: fixed; inset: 0; z-index: 600; background: rgba(0,0,0,.85);
  display: flex; align-items: center; justify-content: center; padding: 20px;
  backdrop-filter: blur(4px);
}
.idx-lightbox__box { position: relative; max-width: 1000px; width: 100%; }
.idx-lightbox__close {
  position: absolute; top: -44px; right: 0;
  background: rgba(255,255,255,.15); border: none; border-radius: 50%;
  width: 36px; height: 36px; cursor: pointer; color: #fff;
  display: flex; align-items: center; justify-content: center; transition: background .15s;
}
.idx-lightbox__close:hover { background: rgba(255,255,255,.25); }
.idx-lightbox__img   { width: 100%; max-height: 80vh; object-fit: contain; border-radius: 10px; display: block; }
.idx-lightbox__title { text-align: center; color: rgba(255,255,255,.7); font-size: 14px; margin-top: 12px; }
.lb-enter-active { transition: opacity .2s ease, transform .2s ease; }
.lb-leave-active { transition: opacity .15s ease; }
.lb-enter-from   { opacity: 0; transform: scale(.97); }
.lb-leave-to     { opacity: 0; }

/* ── RESPONSIVE ── */
@media (max-width: 1100px) {
  .port-grid { grid-template-columns: repeat(2, 1fr); }
  .idx-gallery-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 900px) {
  .steps-grid { grid-template-columns: repeat(2, 1fr); }
  .steps-grid::before { display: none; }
  .why-grid  { grid-template-columns: repeat(2, 1fr); }
  .idx-credit__inner { grid-template-columns: 1fr; gap: 40px; }
}
@media (max-width: 768px) {
  .idx-title { font-size: 26px; }
  .promo-grid { grid-template-columns: 1fr; }
  .port-grid  { grid-template-columns: repeat(2, 1fr); }
  .idx-gallery-grid { grid-template-columns: repeat(2, 1fr); }
  .reviews-grid { grid-template-columns: 1fr; }
  .idx-head-row { flex-direction: column; }
  .idx-rating-badges { justify-content: center; }
  .idx-cta__inner { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 480px) {
  .steps-grid { grid-template-columns: 1fr; }
  .port-grid  { grid-template-columns: 1fr; }
  .why-grid   { grid-template-columns: 1fr; }
  .idx-credit__cards { grid-template-columns: repeat(2, 1fr); }
  .faq-item__q { font-size: 14px; }
}
</style>
