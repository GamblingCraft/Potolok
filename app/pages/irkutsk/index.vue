<template>
  <div>

    <!-- ══ HERO (стиль как uslugi) ══ -->
    <section class="ri-hero">
      <div class="container ri-hero__inner">
        <div class="ri-hero__content">
          <nav class="ri-breadcrumbs" aria-label="Хлебные крошки">
            <NuxtLink to="/">Главная</NuxtLink>
            <Icon name="lucide:chevron-right" size="13"/>
            <span>Иркутск</span>
          </nav>
          <div class="ri-pretitle">Работаем по всему городу</div>
          <h1 class="ri-hero__title">Натяжные потолки в Иркутске — по районам</h1>
          <p class="ri-hero__desc">Выезжаем во все округа Иркутска бесплатно. Единые цены без доплат за район. Замер — в день обращения.</p>
          <div class="ri-hero__facts">
            <div class="ri-fact" v-for="f in heroFacts" :key="f.text">
              <Icon :name="f.icon" size="16" class="ri-fact__icon"/>
              {{ f.text }}
            </div>
          </div>
        </div>
        <div class="ri-hero__nums">
          <div class="ri-num" v-for="n in heroNums" :key="n.label">
            <div class="ri-num__val">{{ n.val }}</div>
            <div class="ri-num__label">{{ n.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ РАЙОНЫ ══ -->
    <section class="ri-body">
      <div class="container">

        <!-- Фильтры-пилюли -->
        <div class="ri-filters">
          <button
            v-for="f in filters"
            :key="f.id"
            class="ri-filter"
            :class="{ active: activeFilter === f.id }"
            @click="activeFilter = f.id"
          >
            <Icon :name="f.icon" size="15"/>
            {{ f.label }}
          </button>
        </div>

        <!-- Сетка районов -->
        <div class="ri-grid">
          <NuxtLink
            v-for="d in filteredDistricts"
            :key="d.id"
            :to="d.href"
            class="ri-card"
          >
            <div class="ri-card__img-wrap">
              <div class="ri-card__img" :style="{ backgroundImage: `url('${d.img}')` }"></div>
              <div class="ri-card__overlay"></div>
              <div class="ri-card__badge">{{ d.type }}</div>
              <div class="ri-card__tag">
                <Icon name="lucide:map-pin" size="12"/>
                {{ d.zone }}
              </div>
            </div>
            <div class="ri-card__body">
              <div class="ri-card__icon-wrap">
                <Icon :name="d.icon" size="20"/>
              </div>
              <h2 class="ri-card__title">{{ d.name }}</h2>
              <p class="ri-card__desc">{{ d.description }}</p>
              <ul class="ri-card__features">
                <li v-for="ft in d.features" :key="ft">
                  <Icon name="lucide:check" size="12" class="ri-check"/>{{ ft }}
                </li>
              </ul>
              <div class="ri-card__footer">
                <div>
                  <div class="ri-card__price">от 159 ₽/м²</div>
                  <div class="ri-card__price-note">замер бесплатно</div>
                </div>
                <div class="ri-card__more">Подробнее <Icon name="lucide:arrow-right" size="14"/></div>
              </div>
            </div>
          </NuxtLink>
        </div>

      </div>
    </section>

    <!-- ══ ПОЧЕМУ МЫ ══ -->
    <section class="ri-why">
      <div class="container">
        <div class="ri-section-head">
          <div class="ri-pretitle ri-pretitle--dark">Наши преимущества</div>
          <h2 class="ri-section-title">Один стандарт работы — для всего Иркутска</h2>
        </div>
        <div class="ri-why-grid">
          <div class="ri-why-card" v-for="w in whyCards" :key="w.title">
            <div class="ri-why-card__icon"><Icon :name="w.icon" size="24"/></div>
            <div class="ri-why-card__title">{{ w.title }}</div>
            <div class="ri-why-card__desc">{{ w.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ SEO ══ -->
    <section class="ri-seo">
      <div class="container">
        <div class="ri-seo__inner">
          <div class="ri-seo__content">
            <h2>Натяжные потолки в Иркутске — работаем по всем округам</h2>
            <p>Компания «ПроПотолок» монтирует натяжные потолки в Иркутске с 2009 года. За это время мы выполнили более 4 000 заказов в жилых домах, квартирах, офисах и коммерческих объектах по всему городу.</p>
            <h3>Почему цена не зависит от района</h3>
            <p>Многие компании берут «надбавку за выезд» в отдалённые районы. Мы принципиально работаем по единому прайсу для всего Иркутска. Матовый потолок стоит 159 ₽/м² в Октябрьском округе — и точно столько же в Ленинском или Свердловском.</p>
            <h3>Замер без выходных</h3>
            <p>Замерщик работает ежедневно с 8:00 до 21:00. Выезд в любой округ — в день обращения или на следующий день. С собой привезёт образцы всех фактур и цветов, рассчитает стоимость прямо на месте.</p>
            <h3>Работаем в пригороде</h3>
            <p>Помимо четырёх округов Иркутска выезжаем в Шелехов, Ангарск, Иркутский район. Стоимость выезда за пределы города обсуждается индивидуально при оформлении заявки.</p>
          </div>
          <div class="ri-seo__aside">
            <div class="ri-seo__aside-card">
              <div class="ri-seo__aside-title">Выбрать свой район</div>
              <ul class="ri-seo__aside-list">
                <li v-for="d in districts" :key="d.id">
                  <Icon name="lucide:map-pin" size="14" class="ri-seo__aside-icon"/>
                  <NuxtLink :to="d.href">{{ d.name }}</NuxtLink>
                </li>
              </ul>
              <button class="nav-btn ri-seo__aside-btn" @click="callbackOpen = true">
                <Icon name="lucide:phone-call" size="15"/>Заказать звонок
              </button>
              <NuxtLink to="/kalkulyator" class="ri-seo__aside-calc">
                <Icon name="lucide:calculator" size="14"/>Рассчитать стоимость
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ CTA ══ -->
    <section class="ri-cta">
      <div class="container ri-cta__inner">
        <div>
          <h2 class="ri-cta__title">Не нашли свой район?</h2>
          <p class="ri-cta__desc">Просто позвоните — работаем по всему Иркутску и пригороду</p>
        </div>
        <div class="ri-cta__btns">
          <button class="nav-btn ri-cta__btn" @click="callbackOpen = true">
            <Icon name="lucide:phone-call" size="16"/>Заказать звонок
          </button>
          <NuxtLink to="/kalkulyator" class="ri-cta__btn-outline">
            <Icon name="lucide:calculator" size="16"/>Калькулятор стоимости
          </NuxtLink>
        </div>
      </div>
    </section>

    <ModalCallback v-model="callbackOpen"/>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const site = useSite()

usePageSeoMeta('irkutsk')
useHead({ meta: [{ property: 'og:type', content: 'website' }] })

const callbackOpen = ref(false)
const activeFilter = ref('all')

const heroFacts = [
  { icon: 'lucide:map-pin',     text: 'Все 4 округа города' },
  { icon: 'lucide:ruler',       text: 'Замер бесплатно' },
  { icon: 'lucide:clock',       text: 'Монтаж за 1 день' },
  { icon: 'lucide:shield-check',text: 'Гарантия 12 лет' },
]

const heroNums = [
  { val: '4 000+', label: 'объектов в Иркутске' },
  { val: '4',      label: 'округа города' },
  { val: '0 ₽',   label: 'выезд замерщика' },
  { val: '15 лет', label: 'на рынке Иркутска' },
]

const filters = [
  { id: 'all',     icon: 'lucide:layout-grid', label: 'Все районы' },
  { id: 'center',  icon: 'lucide:landmark',    label: 'Центр' },
  { id: 'novoe',   icon: 'lucide:building-2',  label: 'Новостройки' },
  { id: 'soviet',  icon: 'lucide:warehouse',   label: 'Советский фонд' },
]

const districts = [
  {
    id: 'oktyabrskiy',
    name: 'Октябрьский округ',
    type: 'Центр',
    zone: 'Исторический центр',
    icon: 'lucide:landmark',
    href: '/irkutsk/oktyabrskiy-okrug',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=70',
    tags: ['center'],
    description: 'Исторический центр Иркутска. Сталинки с высокими потолками, дореволюционная застройка, современные ЖК.',
    features: ['Опыт в домах с потолками 3+ м', 'Без доплат за центральный район', 'Монтаж за 1 день'],
  },
  {
    id: 'pravoberezhnyy',
    name: 'Правобережный округ',
    type: 'Новостройки',
    zone: 'Правый берег Ангары',
    icon: 'lucide:building-2',
    href: '/irkutsk/pravoberezhnyy-okrug',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=70',
    tags: ['novoe'],
    description: 'Правый берег Ангары с активным жилым строительством. Работаем в новостройках и домах старого фонда.',
    features: ['Монтаж при черновой отделке', 'Согласовываем с другими строителями', 'Скидки до 20% за объём'],
  },
  {
    id: 'sverdlovskiy',
    name: 'Свердловский округ',
    type: 'Квартиры и дома',
    zone: 'Южный район',
    icon: 'lucide:home',
    href: '/irkutsk/sverdlovskiy-okrug',
    img: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=600&q=70',
    tags: ['novoe', 'soviet'],
    description: 'Южный округ с университетами, тихими кварталами и частным сектором. Квартиры любого типа.',
    features: ['Квартиры и частные дома', 'Тканевые потолки для детских', 'Скидки при заказе нескольких комнат'],
  },
  {
    id: 'leninskiy',
    name: 'Ленинский округ',
    type: 'Советский фонд',
    zone: 'Северный район',
    icon: 'lucide:warehouse',
    href: '/irkutsk/leninskiy-okrug',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=70',
    tags: ['soviet'],
    description: 'Крупный северный округ. Хрущёвки, брежневки, панельные дома — скрываем трещины и дефекты.',
    features: ['Опыт в хрущёвках и брежневках', 'Скрываем трещины и следы протечек', 'Дешевле штукатурки за 1 день'],
  },
]

const filteredDistricts = computed(() => {
  if (activeFilter.value === 'all') return districts
  return districts.filter(d => d.tags.includes(activeFilter.value))
})

const whyCards = [
  { icon: 'lucide:map-pin',     title: 'Весь Иркутск',           desc: 'Работаем во всех 4 округах. Выезд замерщика бесплатный в любую точку города.' },
  { icon: 'lucide:tag',         title: 'Единая цена по городу',  desc: 'Цена не зависит от района. Матовый потолок — 159 ₽/м² в любом округе Иркутска.' },
  { icon: 'lucide:badge-check', title: 'Сертифицированные материалы', desc: 'Европейские полотна MSD, Bauf, Descor. Все сертификаты безопасности в наличии.' },
  { icon: 'lucide:clock',       title: 'Монтаж за 1 день',       desc: 'Стандартная квартира из 2–3 комнат — 4–6 часов. Приедем и уйдём в тот же день.' },
  { icon: 'lucide:shield',      title: 'Гарантия 12 лет',        desc: 'Письменная гарантия на полотно и монтажные работы. Устраним любой дефект бесплатно.' },
  { icon: 'lucide:credit-card', title: 'Оплата после',    desc: 'Платите только после приёмки готовой работы: наличными, картой или переводом.' },
]
</script>

<style scoped>
/* ══ HERO ══ */
.ri-hero { background: #141414; padding: 52px 0 56px; }
.ri-hero__inner { display: grid; grid-template-columns: 1fr auto; gap: 60px; align-items: center; }
.ri-breadcrumbs { display: flex; align-items: center; gap: 6px; font-size: 12px; color: rgba(255,255,255,.35); margin-bottom: 16px; flex-wrap: wrap; }
.ri-breadcrumbs a { color: rgba(255,255,255,.35); text-decoration: none; transition: color .15s; }
.ri-breadcrumbs a:hover { color: var(--accent); }
.ri-pretitle { display: inline-block; background: var(--accent); color: #141414; font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px; margin-bottom: 16px; text-transform: uppercase; letter-spacing: .5px; }
.ri-pretitle--dark { background: var(--accent); color: var(--dark); }
.ri-hero__title { font-size: 40px; font-weight: 900; color: #fff; line-height: 1.15; margin-bottom: 14px; }
.ri-hero__desc  { font-size: 16px; color: rgba(255,255,255,.45); max-width: 540px; line-height: 1.65; margin-bottom: 28px; }
.ri-hero__facts { display: flex; flex-wrap: wrap; gap: 14px; }
.ri-fact { display: flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 600; color: rgba(255,255,255,.55); }
.ri-fact__icon { color: var(--accent); }
.ri-hero__nums { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.ri-num { background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 14px; padding: 18px 20px; text-align: center; min-width: 120px; }
.ri-num__val   { font-size: 26px; font-weight: 900; color: var(--accent); line-height: 1; margin-bottom: 5px; }
.ri-num__label { font-size: 12px; color: rgba(255,255,255,.35); line-height: 1.3; }

/* ══ BODY ══ */
.ri-body { background: #f7f7f7; padding: 52px 0 64px; }

/* Фильтры */
.ri-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
.ri-filter { display: inline-flex; align-items: center; gap: 7px; padding: 9px 18px; background: #fff; border: 1.5px solid #e0e0e0; border-radius: 24px; cursor: pointer; font-size: 14px; font-weight: 600; color: var(--gray); font-family: var(--font); transition: all .15s; }
.ri-filter:hover { border-color: #bbb; color: var(--dark); }
.ri-filter.active { border-color: var(--accent); color: var(--dark); background: #fffbe6; }

/* Сетка */
.ri-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }

/* Карточка района */
.ri-card { background: #fff; border-radius: 18px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,.07); text-decoration: none; border: 2px solid transparent; transition: transform .2s, box-shadow .2s, border-color .2s; display: flex; flex-direction: column; }
.ri-card:hover { transform: translateY(-4px); box-shadow: 0 8px 28px rgba(0,0,0,.12); border-color: var(--accent); }
.ri-card__img-wrap { position: relative; height: 200px; overflow: hidden; flex-shrink: 0; }
.ri-card__img { position: absolute; inset: 0; background-size: cover; background-position: center; transition: transform .4s ease; }
.ri-card:hover .ri-card__img { transform: scale(1.06); }
.ri-card__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.1) 0%, rgba(0,0,0,.55) 100%); }
.ri-card__badge { position: absolute; top: 12px; left: 12px; background: var(--accent); color: var(--dark); font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: .4px; }
.ri-card__tag { position: absolute; bottom: 12px; right: 12px; display: flex; align-items: center; gap: 5px; background: rgba(0,0,0,.6); backdrop-filter: blur(4px); color: #fff; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 20px; }
.ri-card__body { padding: 24px 26px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
.ri-card__icon-wrap { width: 44px; height: 44px; background: rgba(245,200,0,.12); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--dark); }
.ri-card:hover .ri-card__icon-wrap { background: var(--accent); }
.ri-card__title { font-size: 20px; font-weight: 800; color: var(--dark); }
.ri-card__desc  { font-size: 14px; color: var(--gray); line-height: 1.6; }
.ri-card__features { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
.ri-card__features li { display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--dark); }
.ri-check { color: var(--accent); flex-shrink: 0; }
.ri-card__footer { display: flex; align-items: flex-end; justify-content: space-between; padding-top: 14px; border-top: 1px solid #f0f0f0; margin-top: auto; gap: 8px; }
.ri-card__price { font-size: 16px; font-weight: 800; color: var(--dark); }
.ri-card__price-note { font-size: 11px; color: var(--gray); margin-top: 2px; }
.ri-card__more { display: flex; align-items: center; gap: 5px; font-size: 13px; font-weight: 700; color: var(--gray); white-space: nowrap; transition: color .15s; }
.ri-card:hover .ri-card__more { color: var(--dark); }

/* ══ ПОЧЕМУ МЫ ══ */
.ri-why { background: #fff; padding: 64px 0; }
.ri-section-head { text-align: center; margin-bottom: 40px; }
.ri-section-title { font-size: 32px; font-weight: 800; color: var(--dark); margin: 0 0 10px; }
.ri-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.ri-why-card { background: #f7f7f7; border-radius: 16px; padding: 26px 24px; border: 1.5px solid transparent; transition: border-color .15s, box-shadow .15s; }
.ri-why-card:hover { border-color: var(--accent); box-shadow: 0 4px 20px rgba(245,200,0,.1); }
.ri-why-card__icon { width: 50px; height: 50px; background: var(--accent); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--dark); margin-bottom: 14px; }
.ri-why-card__title { font-size: 16px; font-weight: 700; color: var(--dark); margin-bottom: 7px; }
.ri-why-card__desc  { font-size: 13px; color: var(--gray); line-height: 1.6; }

/* ══ SEO ══ */
.ri-seo { background: #f7f7f7; padding: 64px 0; }
.ri-seo__inner { display: grid; grid-template-columns: 1fr 280px; gap: 48px; align-items: start; }
.ri-seo__content h2 { font-size: 24px; font-weight: 800; color: var(--dark); margin-bottom: 14px; }
.ri-seo__content h3 { font-size: 17px; font-weight: 700; color: var(--dark); margin: 22px 0 8px; }
.ri-seo__content p  { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 10px; }
.ri-seo__aside { position: sticky; top: 100px; }
.ri-seo__aside-card { background: #fff; border-radius: 16px; padding: 24px; border: 1.5px solid #ececec; }
.ri-seo__aside-title { font-size: 17px; font-weight: 800; color: var(--dark); margin-bottom: 16px; }
.ri-seo__aside-list { list-style: none; padding: 0; margin: 0 0 20px; display: flex; flex-direction: column; gap: 10px; }
.ri-seo__aside-list li { display: flex; align-items: center; gap: 9px; font-size: 14px; }
.ri-seo__aside-list a { color: var(--dark); text-decoration: none; font-weight: 600; transition: color .15s; }
.ri-seo__aside-list a:hover { color: var(--accent); }
.ri-seo__aside-icon { color: var(--accent); flex-shrink: 0; }
.ri-seo__aside-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px; font-size: 14px; margin-bottom: 10px; }
.ri-seo__aside-calc { display: flex; align-items: center; justify-content: center; gap: 7px; font-size: 14px; font-weight: 600; color: var(--gray); text-decoration: none; transition: color .15s; }
.ri-seo__aside-calc:hover { color: var(--dark); }

/* ══ CTA ══ */
.ri-cta { background: #141414; padding: 60px 0; }
.ri-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.ri-cta__title { font-size: 30px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.ri-cta__desc  { font-size: 15px; color: rgba(255,255,255,.4); max-width: 440px; }
.ri-cta__btns  { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
.ri-cta__btn   { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; font-size: 15px; }
.ri-cta__btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 13px 26px; font-size: 15px; font-weight: 700; font-family: var(--font); background: none; border: 2px solid rgba(255,255,255,.2); border-radius: 10px; color: #fff; text-decoration: none; transition: border-color .15s, color .15s; }
.ri-cta__btn-outline:hover { border-color: var(--accent); color: var(--accent); }

/* ══ RESPONSIVE ══ */
@media (max-width: 1100px) { .ri-hero__inner { grid-template-columns: 1fr; } .ri-hero__nums { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 768px)  { .ri-grid { grid-template-columns: 1fr; } .ri-why-grid { grid-template-columns: repeat(2, 1fr); } .ri-seo__inner { grid-template-columns: 1fr; } .ri-seo__aside { position: static; } }
@media (max-width: 640px)  { .ri-hero__title { font-size: 28px; } .ri-hero__nums { grid-template-columns: repeat(2, 1fr); } .ri-why-grid { grid-template-columns: 1fr; } .ri-section-title { font-size: 26px; } .ri-cta__inner { flex-direction: column; align-items: flex-start; } }
</style>
