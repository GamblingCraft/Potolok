<template>
  <div>

    <!-- Hero -->
    <section class="sv-hero">
      <div class="container sv-hero__inner">
        <div class="sv-hero__content">
          <div class="sv-pretitle">Всё под ключ</div>
          <h1 class="sv-hero__title">Услуги по натяжным потолкам</h1>
          <p class="sv-hero__desc">Монтаж, замер, ремонт, замена полотна и установка светильников. Работаем быстро, чисто и с гарантией 12 лет.</p>
          <div class="sv-hero__facts">
            <div class="sv-fact" v-for="f in heroFacts" :key="f.text">
              <Icon :name="f.icon" size="16" class="sv-fact__icon"/>
              {{ f.text }}
            </div>
          </div>
        </div>
        <div class="sv-hero__nums">
          <div class="sv-num" v-for="n in heroNums" :key="n.label">
            <div class="sv-num__val">{{ n.val }}</div>
            <div class="sv-num__label">{{ n.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Каталог услуг -->
    <section class="sv-body">
      <div class="container">

        <!-- Фильтры -->
        <div class="sv-filters">
          <button
            v-for="cat in serviceCategories" :key="cat.id"
            class="sv-filter"
            :class="{ active: activeCategory === cat.id }"
            @click="activeCategory = cat.id"
          >
            <Icon :name="cat.icon" size="15"/>
            {{ cat.label }}
            <span class="sv-filter__count">{{ cat.id === 'all' ? services.length : countByCategory(cat.id) }}</span>
          </button>
        </div>

        <!-- Сетка услуг -->
        <TransitionGroup name="sv-list" tag="div" class="sv-grid">
          <NuxtLink
            v-for="service in filteredServices"
            :key="service.id"
            :to="'/uslugi/' + service.slug"
            class="sv-card"
          >
            <!-- Фото -->
            <div class="sv-card__img-wrap">
              <div class="sv-card__img" :style="{ backgroundImage: `url('${service.img}')` }"></div>
              <div class="sv-card__overlay"></div>
              <div class="sv-card__badge" v-if="service.badge">{{ service.badge }}</div>
              <div class="sv-card__duration">
                <Icon name="lucide:clock" size="13"/>
                {{ service.duration }}
              </div>
            </div>

            <!-- Контент -->
            <div class="sv-card__body">
              <div class="sv-card__icon-wrap">
                <Icon :name="service.icon" size="20"/>
              </div>

              <h2 class="sv-card__title">{{ service.title }}</h2>
              <p class="sv-card__desc">{{ service.description }}</p>

              <ul class="sv-card__features">
                <li v-for="f in service.features.slice(0, 4)" :key="f">
                  <Icon name="lucide:check" size="12" class="sv-card__check"/>
                  {{ f }}
                </li>
              </ul>

              <div class="sv-card__footer">
                <div class="sv-card__price-wrap">
                  <div class="sv-card__price">{{ service.price }}</div>
                  <div class="sv-card__price-note" v-if="service.priceNote">{{ service.priceNote }}</div>
                </div>
                <div class="sv-card__more">
                  Подробнее
                  <Icon name="lucide:arrow-right" size="14"/>
                </div>
              </div>
            </div>
          </NuxtLink>
        </TransitionGroup>

      </div>
    </section>

    <!-- Почему мы -->
    <section class="sv-why">
      <div class="container">
        <div class="sv-section-head">
          <div class="sv-pretitle sv-pretitle--dark">Наши преимущества</div>
          <h2 class="sv-section-title">Почему выбирают ПроПотолок</h2>
        </div>
        <div class="sv-why-grid">
          <div class="sv-why-card" v-for="w in whyUs" :key="w.title">
            <div class="sv-why-card__icon">
              <Icon :name="w.icon" size="24"/>
            </div>
            <div class="sv-why-card__title">{{ w.title }}</div>
            <div class="sv-why-card__desc">{{ w.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- SEO текст -->
    <section class="sv-seo">
      <div class="container">
        <div class="sv-seo__inner">
          <div class="sv-seo__content">
            <h2>Услуги по натяжным потолкам в Иркутске</h2>
            <p>Компания ПроПотолок оказывает полный комплекс услуг по натяжным потолкам — от бесплатного замера и консультации до монтажа, ремонта и обслуживания. Работаем по всему Иркутску и области с 2009 года.</p>
            <h3>Монтаж натяжных потолков</h3>
            <p>Монтаж выполняют сертифицированные мастера с опытом от 5 лет. Установка потолка в стандартной комнате занимает 2–4 часа. Работаем без предоплаты — оплата после приёмки работы. Монтаж входит в стоимость полотна.</p>
            <h3>Ремонт и обслуживание</h3>
            <p>Ремонтируем потолки любых производителей: устраняем провисания, порывы, проблемы с багетом. Сливаем воду после затопления без повреждения полотна — выезд в день обращения. Полотно полностью восстанавливает форму после слива воды.</p>
            <h3>Замер и консультация</h3>
            <p>Бесплатный выезд замерщика в любой район Иркутска. Специалист произведёт точные замеры, покажет образцы полотен, поможет выбрать фактуру и цвет, рассчитает итоговую стоимость прямо на месте.</p>
          </div>
          <div class="sv-seo__aside">
            <div class="sv-seo__aside-card">
              <div class="sv-seo__aside-title">Вызвать мастера</div>
              <ul class="sv-seo__aside-list">
                <li v-for="item in asideList" :key="item">
                  <Icon name="lucide:check-circle" size="15" class="sv-seo__aside-icon"/>
                  {{ item }}
                </li>
              </ul>
              <button class="nav-btn sv-seo__aside-btn" @click="callbackOpen = true">
                <Icon name="lucide:phone-call" size="15"/>
                Заказать звонок
              </button>
              <NuxtLink to="/kalkulyator" class="sv-seo__aside-calc">
                <Icon name="lucide:calculator" size="14"/>
                Рассчитать стоимость
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="sv-cta">
      <div class="container sv-cta__inner">
        <div>
          <h2 class="sv-cta__title">Нужна консультация?</h2>
          <p class="sv-cta__desc">Позвоните или оставьте заявку — ответим на все вопросы и назначим удобное время для замера</p>
        </div>
        <div class="sv-cta__btns">
          <button class="nav-btn sv-cta__btn" @click="callbackOpen = true">
            <Icon name="lucide:phone-call" size="16"/>
            Заказать звонок
          </button>
          <NuxtLink to="/kalkulyator" class="sv-cta__btn-outline">
            <Icon name="lucide:calculator" size="16"/>
            Калькулятор стоимости
          </NuxtLink>
        </div>
      </div>
    </section>

    <ModalCallback v-model="callbackOpen" />

  </div>
</template>

<script setup lang="ts">
import { services, serviceCategories } from '~/data/services'

useHead({
  title: 'Услуги по натяжным потолкам в Иркутске — монтаж, замер, ремонт | ПроПотолок',
  meta: [
    { name: 'description', content: 'Полный комплекс услуг по натяжным потолкам в Иркутске: монтаж, бесплатный замер, ремонт, замена полотна, слив воды, установка светильников. Гарантия 12 лет.' },
  ],
})

const callbackOpen = ref(false)
const activeCategory = ref('all')

const filteredServices = computed(() =>
  activeCategory.value === 'all'
    ? services
    : services.filter(s => s.category === activeCategory.value)
)

function countByCategory(cat: string) {
  return services.filter(s => s.category === cat).length
}

const heroFacts = [
  { icon: 'lucide:shield-check',  text: 'Гарантия 12 лет' },
  { icon: 'lucide:clock',         text: 'Монтаж за 1 день' },
  { icon: 'lucide:banknote',      text: 'Без предоплаты' },
  { icon: 'lucide:star',          text: '15 лет на рынке' },
]

const heroNums = [
  { val: '4 000+', label: 'выполненных проектов' },
  { val: '12 лет', label: 'гарантия по договору' },
  { val: '1 день', label: 'срок монтажа' },
  { val: '0 ₽',    label: 'замер и монтаж' },
]

const whyUs = [
  { icon: 'lucide:badge-check',   title: 'Фиксированная цена',   desc: 'Стоимость согласуется до начала работ и фиксируется в договоре. Никаких доплат.' },
  { icon: 'lucide:users',         title: 'Опытные мастера',       desc: 'Все монтажники сертифицированы, опыт работы от 5 лет. Регулярное обучение.' },
  { icon: 'lucide:truck',         title: 'Быстрый выезд',         desc: 'Замерщик приедет в день обращения. Монтаж — в согласованный день.' },
  { icon: 'lucide:leaf',          title: 'Чистая работа',         desc: 'Работаем аккуратно. Убираем за собой. Полотна без запаха — дышать комфортно.' },
  { icon: 'lucide:shield',        title: 'Гарантия 12 лет',       desc: 'Письменная гарантия на полотно и работы. Устраним любой дефект бесплатно.' },
  { icon: 'lucide:credit-card',   title: 'Оплата после работы',   desc: 'Никакой предоплаты. Принимаем наличные, карту, безналичный расчёт.' },
]

const asideList = [
  'Выезд замерщика бесплатно',
  'Монтаж входит в стоимость',
  'Гарантия 12 лет по договору',
  'Оплата после монтажа',
  'Работаем в выходные',
]
</script>

<style scoped>
/* ═══ Hero ═══ */
.sv-hero { background: #141414; padding: 52px 0 56px; }
.sv-hero__inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 60px; align-items: center;
}
.sv-pretitle {
  display: inline-block;
  background: var(--accent); color: #141414;
  font-size: 12px; font-weight: 700;
  padding: 3px 14px; border-radius: 20px;
  margin-bottom: 16px;
  text-transform: uppercase; letter-spacing: .5px;
}
.sv-pretitle--dark { background: var(--accent); color: var(--dark); }
.sv-hero__title { font-size: 40px; font-weight: 900; color: #fff; line-height: 1.15; margin-bottom: 14px; }
.sv-hero__desc  { font-size: 16px; color: rgba(255,255,255,.45); max-width: 540px; line-height: 1.65; margin-bottom: 28px; }

.sv-hero__facts { display: flex; flex-wrap: wrap; gap: 14px; }
.sv-fact { display: flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 600; color: rgba(255,255,255,.55); }
.sv-fact__icon { color: var(--accent); }

.sv-hero__nums { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.sv-num {
  background: #1e1e1e; border: 1px solid #2a2a2a;
  border-radius: 14px; padding: 18px 20px; text-align: center; min-width: 120px;
}
.sv-num__val   { font-size: 26px; font-weight: 900; color: var(--accent); font-family: 'Gilroy', sans-serif; line-height: 1; margin-bottom: 5px; }
.sv-num__label { font-size: 12px; color: rgba(255,255,255,.35); line-height: 1.3; }

/* ═══ Body ═══ */
.sv-body { background: #f7f7f7; padding: 52px 0 64px; }

/* Фильтры */
.sv-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
.sv-filter {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 9px 18px;
  background: #fff; border: 1.5px solid #e0e0e0;
  border-radius: 24px; cursor: pointer;
  font-size: 14px; font-weight: 600; color: var(--gray);
  font-family: 'Gilroy', sans-serif;
  transition: all .15s;
}
.sv-filter:hover { border-color: #bbb; color: var(--dark); }
.sv-filter.active { border-color: var(--accent); color: var(--dark); background: #fffbe6; }
.sv-filter__count {
  background: #f0f0f0; border-radius: 20px;
  font-size: 11px; font-weight: 700; padding: 1px 7px;
}
.sv-filter.active .sv-filter__count { background: rgba(245,200,0,.3); }

/* Сетка */
.sv-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

/* Карточка услуги */
.sv-card {
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,.07);
  text-decoration: none;
  border: 2px solid transparent;
  transition: transform .2s, box-shadow .2s, border-color .2s;
  display: flex; flex-direction: column;
}
.sv-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 28px rgba(0,0,0,.12);
  border-color: var(--accent);
}

/* Фото */
.sv-card__img-wrap {
  position: relative; height: 180px; overflow: hidden; flex-shrink: 0;
}
.sv-card__img {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  transition: transform .4s ease;
}
.sv-card:hover .sv-card__img { transform: scale(1.06); }
.sv-card__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,.1) 0%, rgba(0,0,0,.5) 100%);
}
.sv-card__badge {
  position: absolute; top: 12px; left: 12px;
  background: var(--accent); color: var(--dark);
  font-size: 11px; font-weight: 800;
  padding: 3px 10px; border-radius: 20px;
  text-transform: uppercase; letter-spacing: .4px;
}
.sv-card__duration {
  position: absolute; bottom: 12px; right: 12px;
  display: flex; align-items: center; gap: 5px;
  background: rgba(0,0,0,.6); backdrop-filter: blur(4px);
  color: #fff; font-size: 12px; font-weight: 600;
  padding: 4px 10px; border-radius: 20px;
}

/* Контент */
.sv-card__body { padding: 22px 24px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
.sv-card__icon-wrap {
  width: 44px; height: 44px;
  background: rgba(245,200,0,.12);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: var(--dark);
}
.sv-card:hover .sv-card__icon-wrap { background: var(--accent); }

.sv-card__title { font-size: 18px; font-weight: 800; color: var(--dark); line-height: 1.2; }
.sv-card__desc  { font-size: 13px; color: var(--gray); line-height: 1.6; }

.sv-card__features {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 5px;
}
.sv-card__features li { display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--dark); }
.sv-card__check { color: var(--accent); flex-shrink: 0; }

.sv-card__footer {
  display: flex; align-items: flex-end; justify-content: space-between;
  padding-top: 14px; border-top: 1px solid #f0f0f0; margin-top: auto;
  gap: 8px;
}
.sv-card__price { font-size: 16px; font-weight: 800; color: var(--dark); }
.sv-card__price-note { font-size: 11px; color: var(--gray); margin-top: 2px; }
.sv-card__more {
  display: flex; align-items: center; gap: 5px;
  font-size: 13px; font-weight: 700; color: var(--gray);
  transition: color .15s;
  white-space: nowrap;
}
.sv-card:hover .sv-card__more { color: var(--dark); }

/* Transition */
.sv-list-enter-active { transition: all .25s ease; }
.sv-list-leave-active { transition: all .2s ease; }
.sv-list-enter-from { opacity: 0; transform: translateY(12px); }
.sv-list-leave-to   { opacity: 0; transform: translateY(-6px); }

/* ═══ Why ═══ */
.sv-why { background: #fff; padding: 64px 0; }
.sv-section-head { text-align: center; margin-bottom: 40px; }
.sv-section-title { font-size: 32px; font-weight: 800; color: var(--dark); margin: 0 0 10px; }
.sv-why-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
}
.sv-why-card {
  background: #f7f7f7; border-radius: 16px; padding: 26px 24px;
  border: 1.5px solid transparent; transition: border-color .15s, box-shadow .15s;
}
.sv-why-card:hover { border-color: var(--accent); box-shadow: 0 4px 20px rgba(245,200,0,.1); }
.sv-why-card__icon {
  width: 50px; height: 50px; background: var(--accent);
  border-radius: 14px; display: flex; align-items: center; justify-content: center;
  color: var(--dark); margin-bottom: 14px;
}
.sv-why-card__title { font-size: 16px; font-weight: 700; color: var(--dark); margin-bottom: 7px; }
.sv-why-card__desc  { font-size: 13px; color: var(--gray); line-height: 1.6; }

/* ═══ SEO ═══ */
.sv-seo { background: #f7f7f7; padding: 64px 0; }
.sv-seo__inner { display: grid; grid-template-columns: 1fr 280px; gap: 48px; align-items: start; }
.sv-seo__content h2 { font-size: 24px; font-weight: 800; color: var(--dark); margin-bottom: 14px; }
.sv-seo__content h3 { font-size: 17px; font-weight: 700; color: var(--dark); margin: 22px 0 8px; }
.sv-seo__content p  { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 10px; }
.sv-seo__aside { position: sticky; top: 100px; }
.sv-seo__aside-card { background: #fff; border-radius: 16px; padding: 24px; border: 1.5px solid #ececec; }
.sv-seo__aside-title { font-size: 17px; font-weight: 800; color: var(--dark); margin-bottom: 16px; }
.sv-seo__aside-list { list-style: none; padding: 0; margin: 0 0 20px; display: flex; flex-direction: column; gap: 9px; }
.sv-seo__aside-list li { display: flex; align-items: center; gap: 9px; font-size: 14px; color: #444; }
.sv-seo__aside-icon { color: var(--accent); flex-shrink: 0; }
.sv-seo__aside-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px; font-size: 14px; margin-bottom: 10px; }
.sv-seo__aside-calc {
  display: flex; align-items: center; justify-content: center; gap: 7px;
  font-size: 14px; font-weight: 600; color: var(--gray);
  text-decoration: none; transition: color .15s;
}
.sv-seo__aside-calc:hover { color: var(--dark); }

/* ═══ CTA ═══ */
.sv-cta { background: #141414; padding: 60px 0; }
.sv-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.sv-cta__title { font-size: 30px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.sv-cta__desc  { font-size: 15px; color: rgba(255,255,255,.4); max-width: 440px; }
.sv-cta__btns  { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
.sv-cta__btn   { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; font-size: 15px; }
.sv-cta__btn:hover { color: var(--dark); }
.sv-cta__btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 26px; font-size: 15px; font-weight: 700;
  font-family: 'Gilroy', sans-serif;
  background: none; border: 2px solid rgba(255,255,255,.2);
  border-radius: 10px; color: #fff; cursor: pointer;
  text-decoration: none; transition: border-color .15s, color .15s;
}
.sv-cta__btn-outline:hover { border-color: var(--accent); color: var(--accent); }

/* ═══ Responsive ═══ */
@media (max-width: 1100px) { .sv-hero__inner { grid-template-columns: 1fr; } .sv-hero__nums { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 960px)  { .sv-grid { grid-template-columns: repeat(2, 1fr); } .sv-why-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px)  { .sv-seo__inner { grid-template-columns: 1fr; } .sv-seo__aside { position: static; } }
@media (max-width: 640px)  {
  .sv-hero__title { font-size: 28px; }
  .sv-hero__nums { grid-template-columns: repeat(2, 1fr); }
  .sv-grid { grid-template-columns: 1fr; }
  .sv-why-grid { grid-template-columns: 1fr; }
  .sv-section-title { font-size: 26px; }
  .sv-cta__inner { flex-direction: column; align-items: flex-start; }
}
</style>
