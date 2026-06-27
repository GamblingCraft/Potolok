<template>
  <div>

    <!-- Hero -->
    <section class="pf-hero">
      <div class="container">
        <h1 class="pf-hero__title">Наши работы</h1>
        <p class="pf-hero__desc">{{ filteredItems.length }} выполненных проектов в Иркутске — с фото, описанием и ценами</p>

        <!-- Фильтры -->
        <div class="pf-filters">
          <button
            v-for="tag in portfolioTags" :key="tag.id"
            class="pf-filter"
            :class="{ active: activeTag === tag.id }"
            @click="activeTag = tag.id"
          >
            {{ tag.label }}
            <span v-if="tag.id === 'all'" class="pf-filter__count">{{ portfolio.value?.length }}</span>
            <span v-else-if="countByTag(tag.id) > 0" class="pf-filter__count">{{ countByTag(tag.id) }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Cases -->
    <section class="pf-body">
      <div class="container">

        <TransitionGroup name="case-list" tag="div" class="pf-list">
          <article
            v-for="item in filteredItems"
            :key="item.id"
            class="pf-case"
          >
            <!-- Галерея -->
            <div class="pf-case__gallery">
              <div class="pf-case__main-img">
                <img
                  :src="item.photos[activePhoto[item.id] ?? 0]"
                  :alt="item.title"
                  class="pf-case__img"
                />
                <!-- Стрелки -->
                <button v-if="item.photos.length > 1" class="pf-case__arrow pf-case__arrow--prev" @click.stop="prevPhoto(item)">
                  <Icon name="lucide:chevron-left" size="18"/>
                </button>
                <button v-if="item.photos.length > 1" class="pf-case__arrow pf-case__arrow--next" @click.stop="nextPhoto(item)">
                  <Icon name="lucide:chevron-right" size="18"/>
                </button>
                <!-- Теги -->
                <div class="pf-case__img-tags">
                  <span class="pf-case__tag">{{ item.roomType }}</span>
                  <span class="pf-case__tag pf-case__tag--area">{{ item.area }} м²</span>
                </div>
              </div>
              <!-- Превью -->
              <div class="pf-case__thumbs" v-if="item.photos.length > 1">
                <button
                  v-for="(photo, i) in item.photos" :key="i"
                  class="pf-case__thumb"
                  :class="{ active: (activePhoto[item.id] ?? 0) === i }"
                  @click="activePhoto[item.id] = i"
                >
                  <img :src="photo" :alt="`${item.title} фото ${i + 1}`"/>
                </button>
              </div>
            </div>

            <!-- Инфо -->
            <div class="pf-case__info">

              <div class="pf-case__date">
                <Icon name="lucide:calendar" size="13"/>
                {{ formatDate(item.date) }}
              </div>

              <h2 class="pf-case__title">{{ item.title }}</h2>
              <p class="pf-case__desc">{{ item.description }}</p>

              <!-- Параметры -->
              <div class="pf-case__params">
                <div class="pf-case__param">
                  <div class="pf-case__param-label">Фактура</div>
                  <div class="pf-case__param-val">{{ item.texture }}</div>
                </div>
                <div class="pf-case__param">
                  <div class="pf-case__param-label">Вид</div>
                  <div class="pf-case__param-val">{{ item.view }}</div>
                </div>
                <div class="pf-case__param">
                  <div class="pf-case__param-label">Цвет</div>
                  <div class="pf-case__param-val">{{ item.color }}</div>
                </div>
                <div class="pf-case__param">
                  <div class="pf-case__param-label">Площадь</div>
                  <div class="pf-case__param-val">{{ item.area }} м²</div>
                </div>
              </div>

              <!-- Что делали -->
              <div class="pf-case__works">
                <div class="pf-case__works-title">Что сделали:</div>
                <ul class="pf-case__works-list">
                  <li v-for="ex in item.extras" :key="ex">
                    <Icon name="lucide:check" size="13" class="pf-case__check"/>
                    {{ ex }}
                  </li>
                </ul>
              </div>

              <!-- Цена -->
              <div class="pf-case__price-block">
                <div class="pf-case__price-row">
                  <div>
                    <div class="pf-case__price-label">Стоимость проекта</div>
                    <div class="pf-case__price">{{ fmt(item.price) }} ₽</div>
                  </div>
                  <div class="pf-case__price-m2">
                    <div class="pf-case__price-label">Цена полотна</div>
                    <div class="pf-case__price-m2-val">{{ item.pricePerM2 }} ₽/м²</div>
                  </div>
                </div>
                <NuxtLink to="/kalkulyator" class="nav-btn pf-case__btn">
                  <Icon name="lucide:calculator" size="15"/>
                  Хочу так же — рассчитать
                </NuxtLink>
              </div>

            </div>
          </article>
        </TransitionGroup>

        <!-- Пусто -->
        <div v-if="filteredItems.length === 0" class="pf-empty">
          <Icon name="lucide:search-x" size="48" class="pf-empty__icon"/>
          <p>По этому фильтру работ пока нет</p>
        </div>

        <!-- CTA -->
        <div class="pf-cta">
          <div class="pf-cta__text">
            <div class="pf-cta__title">Хотите такой же потолок?</div>
            <div class="pf-cta__desc">Вызовите замерщика — он приедет бесплатно, покажет образцы и рассчитает стоимость</div>
          </div>
          <div class="pf-cta__btns">
            <NuxtLink to="/kalkulyator" class="nav-btn pf-cta__btn">
              <Icon name="lucide:calculator" size="16"/>
              Рассчитать стоимость
            </NuxtLink>
          </div>
        </div>

        <!-- SEO-текст под CTA -->
        <div class="pf-intro">
          <p class="pf-intro__text">
            Здесь собраны реальные проекты нашей команды — натяжные потолки, которые мы установили в квартирах, домах и офисах Иркутска. Для каждого объекта показываем фотографии в нескольких ракурсах, тип полотна, площадь, перечень работ и итоговую стоимость с монтажом. Никаких рендеров и стоковых картинок — только то, что сделали наши мастера.
          </p>
          <div class="pf-intro__advantages">
            <div class="pf-intro__adv">
              <div class="pf-intro__adv-icon"><Icon name="lucide:camera" size="20"/></div>
              <div>
                <div class="pf-intro__adv-title">Реальные фото</div>
                <div class="pf-intro__adv-desc">Съёмка на объекте после монтажа — видите точный результат</div>
              </div>
            </div>
            <div class="pf-intro__adv">
              <div class="pf-intro__adv-icon"><Icon name="lucide:receipt" size="20"/></div>
              <div>
                <div class="pf-intro__adv-title">Цены без скрытых доплат</div>
                <div class="pf-intro__adv-desc">Указана полная стоимость проекта включая монтаж и материалы</div>
              </div>
            </div>
            <div class="pf-intro__adv">
              <div class="pf-intro__adv-icon"><Icon name="lucide:sliders-horizontal" size="20"/></div>
              <div>
                <div class="pf-intro__adv-title">Фильтр по помещению</div>
                <div class="pf-intro__adv-desc">Смотрите только кухни, спальни или гостиные — удобно для выбора</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { portfolio as defaultPortfolio, portfolioTags, type PortfolioItem } from '~/data/portfolio'

usePageSeoMeta('portfolio')

const { data: portfolioData } = await useAsyncData<PortfolioItem[]>(
  'portfolio',
  () => $fetch<PortfolioItem[]>('/api/cms/portfolio'),
  { default: () => defaultPortfolio },
)
const portfolio = computed(() => portfolioData.value ?? defaultPortfolio)

const activeTag = ref('all')
const activePhoto = reactive<Record<number, number>>({})

const filteredItems = computed(() =>
  activeTag.value === 'all'
    ? portfolio.value
    : portfolio.value.filter(item => item.tags.includes(activeTag.value))
)

function countByTag(tag: string) {
  return portfolio.value.filter(i => i.tags.includes(tag)).length
}

function prevPhoto(item: PortfolioItem) {
  const cur = activePhoto[item.id] ?? 0
  activePhoto[item.id] = cur === 0 ? item.photos.length - 1 : cur - 1
}
function nextPhoto(item: PortfolioItem) {
  const cur = activePhoto[item.id] ?? 0
  activePhoto[item.id] = cur === item.photos.length - 1 ? 0 : cur + 1
}

function fmt(n: number) { return n.toLocaleString('ru-RU') }

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<style scoped>
/* ═══ Hero ═══ */
.pf-hero {
  background: #141414;
  padding: 48px 0 40px;
}
.pf-hero__title {
  font-size: 40px; font-weight: 900;
  color: #fff; margin-bottom: 10px;
}
.pf-hero__desc {
  font-size: 16px; color: rgba(255,255,255,.45);
  margin-bottom: 28px;
}

/* SEO intro — под CTA, на светлом фоне */
.pf-intro { margin-top: 40px; padding-top: 40px; border-top: 1px solid #eee; }
.pf-intro__text {
  font-size: 15px; color: #666; line-height: 1.75;
  max-width: 760px; margin-bottom: 24px;
}
.pf-intro__advantages {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
}
.pf-intro__adv {
  display: flex; gap: 14px; align-items: flex-start;
  background: #fff;
  border: 1.5px solid #eee;
  border-radius: 14px; padding: 16px 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,.04);
}
.pf-intro__adv-icon {
  color: var(--accent); flex-shrink: 0; margin-top: 2px;
}
.pf-intro__adv-title {
  font-size: 14px; font-weight: 700; color: var(--dark); margin-bottom: 4px;
}
.pf-intro__adv-desc {
  font-size: 13px; color: var(--gray); line-height: 1.5;
}

/* Фильтры */
.pf-filters { display: flex; flex-wrap: wrap; gap: 8px; }
.pf-filter {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 8px 18px;
  border: 1.5px solid rgba(255,255,255,.12);
  border-radius: 24px;
  font-size: 14px; font-weight: 600;
  color: rgba(255,255,255,.45);
  background: none; cursor: pointer;
  transition: all .15s;
  font-family: 'Gilroy', sans-serif;
}
.pf-filter:hover { border-color: rgba(255,255,255,.3); color: rgba(255,255,255,.8); }
.pf-filter.active { border-color: var(--accent); color: var(--accent); background: rgba(245,200,0,.08); }
.pf-filter__count {
  background: rgba(255,255,255,.1);
  border-radius: 20px;
  font-size: 11px; font-weight: 700;
  padding: 1px 7px; min-width: 22px; text-align: center;
}
.pf-filter.active .pf-filter__count { background: rgba(245,200,0,.2); }

/* ═══ Body ═══ */
.pf-body { background: #f7f7f7; padding: 56px 0 72px; }

/* Cases list */
.pf-list { display: flex; flex-direction: column; gap: 28px; }

.pf-case {
  display: grid;
  grid-template-columns: 480px 1fr;
  gap: 0;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0,0,0,.08);
  transition: box-shadow .2s;
}
.pf-case:hover { box-shadow: 0 6px 32px rgba(0,0,0,.13); }

/* Gallery */
.pf-case__gallery {
  display: flex; flex-direction: column;
  background: #111;
  flex-shrink: 0;
  min-width: 0;
}
.pf-case__main-img {
  position: relative;
  flex: 1;
  overflow: hidden;
  min-height: 320px;
}
/* Картинка абсолютно позиционирована — не влияет на высоту контейнера */
.pf-case__img {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: transform .4s ease;
}
.pf-case:hover .pf-case__img { transform: scale(1.03); }

.pf-case__arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 36px; height: 36px;
  background: rgba(0,0,0,.5); border: none; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff; cursor: pointer;
  transition: background .15s;
  z-index: 2;
}
.pf-case__arrow:hover { background: var(--accent); color: var(--dark); }
.pf-case__arrow--prev { left: 12px; }
.pf-case__arrow--next { right: 12px; }

.pf-case__img-tags {
  position: absolute; bottom: 12px; left: 12px;
  display: flex; gap: 6px; z-index: 2;
}
.pf-case__tag {
  background: rgba(0,0,0,.6);
  backdrop-filter: blur(4px);
  color: #fff; font-size: 12px; font-weight: 600;
  padding: 4px 10px; border-radius: 20px;
}
.pf-case__tag--area { background: var(--accent); color: var(--dark); }

.pf-case__thumbs {
  display: flex; gap: 4px; padding: 6px;
  background: #0a0a0a;
}
.pf-case__thumb {
  flex: 1; aspect-ratio: 16/9;
  overflow: hidden; border-radius: 6px;
  border: 2px solid transparent;
  cursor: pointer; padding: 0;
  transition: border-color .15s;
}
.pf-case__thumb.active { border-color: var(--accent); }
.pf-case__thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* Info */
.pf-case__info { padding: 32px 36px; display: flex; flex-direction: column; gap: 18px; }

.pf-case__date {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: var(--gray);
}
.pf-case__title {
  font-size: 22px; font-weight: 800; color: var(--dark);
  line-height: 1.2; margin: 0;
}
.pf-case__desc { font-size: 14px; color: #666; line-height: 1.65; margin: 0; }

/* Параметры */
.pf-case__params {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.pf-case__param {
  background: #f7f7f7; border-radius: 10px;
  padding: 10px 12px;
}
.pf-case__param-label { font-size: 11px; font-weight: 600; color: var(--gray); text-transform: uppercase; letter-spacing: .4px; margin-bottom: 4px; }
.pf-case__param-val { font-size: 14px; font-weight: 700; color: var(--dark); }

/* Работы */
.pf-case__works { }
.pf-case__works-title { font-size: 13px; font-weight: 700; color: var(--gray); text-transform: uppercase; letter-spacing: .4px; margin-bottom: 8px; }
.pf-case__works-list { display: flex; flex-direction: column; gap: 5px; list-style: none; padding: 0; margin: 0; }
.pf-case__works-list li { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--dark); }
.pf-case__check { color: var(--accent); flex-shrink: 0; }

/* Цена */
.pf-case__price-block {
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid #f0f0f0;
}
.pf-case__price-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 14px; }
.pf-case__price-label { font-size: 11px; font-weight: 600; color: var(--gray); text-transform: uppercase; letter-spacing: .4px; margin-bottom: 4px; }
.pf-case__price { font-size: 30px; font-weight: 900; color: var(--dark); font-family: 'Gilroy', sans-serif; line-height: 1; }
.pf-case__price-m2-val { font-size: 18px; font-weight: 700; color: var(--gray); }
.pf-case__btn {
  width: 100%; display: flex; align-items: center; justify-content: center;
  gap: 8px; padding: 13px; font-size: 15px;
}
.pf-case__btn:hover { color: var(--dark); }

/* Empty */
.pf-empty { text-align: center; padding: 60px 0; }
.pf-empty__icon { color: #ccc; display: block; margin: 0 auto 16px; }
.pf-empty p { font-size: 16px; color: var(--gray); }

/* CTA */
.pf-cta {
  margin-top: 48px;
  background: #141414;
  border-radius: 20px;
  padding: 36px 40px;
  display: flex; align-items: center; justify-content: space-between; gap: 32px;
  flex-wrap: wrap;
}
.pf-cta__title { font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.pf-cta__desc  { font-size: 15px; color: rgba(255,255,255,.45); max-width: 460px; }
.pf-cta__btn   { display: inline-flex; align-items: center; gap: 8px; padding: 14px 30px; font-size: 15px; white-space: nowrap; }
.pf-cta__btn:hover { color: var(--dark); }

/* Transitions */
.case-list-enter-active { transition: all .3s ease; }
.case-list-leave-active { transition: all .2s ease; }
.case-list-enter-from { opacity: 0; transform: translateY(16px); }
.case-list-leave-to   { opacity: 0; transform: translateY(-8px); }

/* Responsive */
@media (max-width: 1100px) {
  .pf-case { grid-template-columns: 380px 1fr; }
}
@media (max-width: 860px) {
  .pf-case { grid-template-columns: 1fr; }
  .pf-case__main-img { min-height: 260px; }
  .pf-case__params { grid-template-columns: repeat(2, 1fr); }
  .pf-case__info { padding: 24px; }
}
@media (max-width: 768px) {
  .pf-intro__advantages { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .pf-hero__title { font-size: 28px; }
  .pf-case__info { padding: 20px; gap: 14px; }
  .pf-case__params { grid-template-columns: repeat(2, 1fr); }
  .pf-cta { flex-direction: column; align-items: flex-start; padding: 24px; }
}
</style>
