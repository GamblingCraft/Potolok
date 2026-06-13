<template>
  <div>

    <!-- ═══ HERO ═══ -->
    <section class="rv-hero">
      <div class="container rv-hero__inner">

        <div class="rv-hero__left">
          <div class="rv-pretitle">Что говорят клиенты</div>
          <h1 class="rv-hero__title">Отзывы о натяжных потолках ПроПотолок</h1>
          <p class="rv-hero__desc">{{ totalReviews }} реальных отзывов с Яндекс Карт и 2ГИС. Читайте — и убедитесь сами.</p>

          <!-- Платформы -->
          <div class="rv-platforms">
            <a
              v-for="(stat, key) in platformStats" :key="key"
              :href="key === 'yandex' ? 'https://yandex.ru/profile/57118507733' : 'https://2gis.ru/irkutsk/branches/70000001060616514/firm/70000001095752055/tab/reviews'"
              target="_blank" rel="noopener"
              class="rv-platform"
              :style="{ '--platform-color': stat.color }"
            >
              <div class="rv-platform__rating">{{ stat.rating }}</div>
              <div class="rv-platform__stars">
                <span v-for="s in 5" :key="s" class="rv-sym-star" :class="s <= Math.round(stat.rating) ? 'filled' : 'empty'">★</span>
              </div>
              <div class="rv-platform__info">
                <div class="rv-platform__name">
                  <Icon :name="stat.icon" size="14" class="rv-platform__ico"/>
                  {{ stat.name }}
                </div>
                <div class="rv-platform__count">{{ stat.count }} отзывов</div>
              </div>
            </a>
          </div>
        </div>

        <!-- Общий рейтинг -->
        <div class="rv-hero__rating">
          <div class="rv-rating-big">
            <div class="rv-rating-big__num">{{ avgRating }}</div>
            <div class="rv-rating-big__stars">
              <span v-for="i in 5" :key="i" class="rv-sym-star rv-sym-star--lg filled">★</span>
            </div>
            <div class="rv-rating-big__label">Средний рейтинг</div>
            <div class="rv-rating-big__total">{{ totalReviews }} отзывов на всех платформах</div>
          </div>
          <div class="rv-rating-bars">
            <div v-for="n in [5,4,3,2,1]" :key="n" class="rv-rating-bar">
              <span class="rv-rating-bar__n">{{ n }}</span>
              <Icon name="lucide:star" size="12" class="rv-rating-bar__star"/>
              <div class="rv-rating-bar__track">
                <div class="rv-rating-bar__fill" :style="{ width: barWidths[n] + '%' }"></div>
              </div>
              <span class="rv-rating-bar__pct">{{ barWidths[n] }}%</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ═══ ОТЗЫВЫ ═══ -->
    <section class="rv-body">
      <div class="container">

        <!-- Фильтры -->
        <div class="rv-filters">
          <button
            v-for="tab in tabs" :key="tab.id"
            class="rv-filter"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = (tab.id as 'all' | 'yandex' | '2gis')"
          >
            {{ tab.label }}
            <span class="rv-filter__count">{{ tab.count }}</span>
          </button>
        </div>

        <!-- Сетка отзывов -->
        <TransitionGroup name="rv-list" tag="div" class="rv-grid">
          <article v-for="review in filteredReviews" :key="review.id" class="rv-card">

            <div class="rv-card__head">
              <!-- Аватар -->
              <img
                v-if="review.avatar"
                :src="review.avatar"
                :alt="review.author"
                class="rv-card__avatar rv-card__avatar--photo"
              />
              <div v-else class="rv-card__avatar" :style="{ background: avatarColor(review.author) }">
                {{ review.author[0] }}
              </div>
              <div class="rv-card__author-info">
                <div class="rv-card__author">
                  {{ review.author }}
                  <Icon v-if="review.verified" name="lucide:badge-check" size="14" class="rv-card__verified"/>
                </div>
                <div class="rv-card__meta">
                  <span class="rv-card__platform" :class="'rv-card__platform--' + review.platform">
                    {{ platformName(review.platform) }}
                  </span>
                  <span class="rv-card__date">{{ formatDate(review.date) }}</span>
                </div>
              </div>
              <!-- Звёзды -->
              <div class="rv-card__stars">
                <span v-for="s in 5" :key="s" class="rv-sym-star" :class="s <= review.rating ? 'filled' : 'empty'">★</span>
              </div>
            </div>

            <div v-if="review.roomType" class="rv-card__room">
              <Icon name="lucide:home" size="12"/>
              {{ review.roomType }}
            </div>

            <p class="rv-card__text" :class="{ expanded: expandedCards.has(review.id) }">
              {{ review.text }}
            </p>
            <button
              v-if="review.text.length > 200"
              class="rv-card__expand"
              @click="toggleExpand(review.id)"
            >
              {{ expandedCards.has(review.id) ? 'Свернуть' : 'Читать полностью' }}
              <Icon :name="expandedCards.has(review.id) ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="13"/>
            </button>

            <!-- Ответ компании -->
            <div v-if="review.reply" class="rv-card__reply">
              <div class="rv-card__reply-head">
                <Icon name="lucide:message-square" size="13"/>
                Ответ ПроПотолок
              </div>
              <p class="rv-card__reply-text">{{ review.reply }}</p>
            </div>

          </article>
        </TransitionGroup>

        <!-- Показать ещё -->
        <div v-if="hasMore" style="text-align:center;margin-bottom:28px">
          <button class="rv-show-more" @click="showMore">Показать ещё</button>
        </div>

        <!-- Ссылки на платформы -->
        <div class="rv-external">
          <div class="rv-external__title">Читать все отзывы на платформах:</div>
          <div class="rv-external__links">
            <a href="https://yandex.ru/profile/57118507733" target="_blank" rel="noopener" class="rv-external__link rv-external__link--yandex">
              <Icon name="simple-icons:yandex" size="16"/>
              Яндекс Карты · {{ platformStats.yandex.count }} отзывов
            </a>
            <a href="https://2gis.ru/irkutsk/branches/70000001060616514/firm/70000001095752055/tab/reviews" target="_blank" rel="noopener" class="rv-external__link rv-external__link--2gis">
              <Icon name="lucide:map-pin" size="16"/>
              2ГИС · {{ platformStats['2gis'].count }} отзывов
            </a>
          </div>
        </div>

      </div>
    </section>

    <!-- ═══ ВИДЕО ОТЗЫВЫ ═══ -->
    <section class="rv-video-section">
      <div class="container">
        <div class="rv-section-head">
          <div class="rv-pretitle rv-pretitle--dark">Видеоотзывы</div>
          <h2 class="rv-section-title">Клиенты показывают результат</h2>
          <p class="rv-section-desc">Короткие видео от реальных клиентов — снимали сами, сразу после монтажа</p>
        </div>

        <div class="rv-videos">
          <div
            v-for="video in videoReviews" :key="video.id"
            class="rv-video"
            @click="openVideo(video)"
          >
            <div class="rv-video__preview">
              <img :src="video.preview" :alt="video.caption" class="rv-video__img"/>
              <div class="rv-video__overlay">
                <div class="rv-video__play">
                  <Icon name="lucide:play" size="20"/>
                </div>
              </div>
              <div class="rv-video__duration">{{ video.duration }}</div>
              <div class="rv-video__room">{{ video.roomType }}</div>
            </div>
            <div class="rv-video__body">
              <div class="rv-video__caption">{{ video.caption }}</div>
              <div class="rv-video__author">
                <div class="rv-video__avatar" :style="{ background: avatarColor(video.author) }">
                  {{ video.author[0] }}
                </div>
                {{ video.author }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ ОСТАВИТЬ ОТЗЫВ ═══ -->
    <section class="rv-leave">
      <div class="container rv-leave__inner">
        <div class="rv-leave__text">
          <h2 class="rv-leave__title">Уже установили потолок?</h2>
          <p class="rv-leave__desc">Поделитесь впечатлением — это помогает другим клиентам сделать выбор и мотивирует нашу команду работать лучше</p>
        </div>
        <div class="rv-leave__btns">
          <a href="https://yandex.ru/profile/57118507733" target="_blank" rel="noopener" class="rv-leave__btn rv-leave__btn--yandex">
            <Icon name="simple-icons:yandex" size="16"/>
            Отзыв на Яндексе
          </a>
          <a href="https://2gis.ru/irkutsk/branches/70000001060616514/firm/70000001095752055/tab/reviews" target="_blank" rel="noopener" class="rv-leave__btn rv-leave__btn--2gis">
            <Icon name="lucide:map-pin" size="16"/>
            Отзыв на 2ГИС
          </a>
        </div>
      </div>
    </section>

    <!-- ═══ SEO ТЕКСТ ═══ -->
    <section class="rv-seo">
      <div class="container rv-seo__inner">
        <div class="rv-seo__content">
          <h2>Отзывы клиентов о натяжных потолках в Иркутске</h2>
          <p>Компания ПроПотолок работает в Иркутске с 2009 года и за это время выполнила более 4 000 проектов. Все отзывы на нашей странице — реальные, от клиентов, оставивших их самостоятельно на независимых платформах: Яндекс Картах, 2ГИС и Авито.</p>
          <p>Средний рейтинг по всем платформам — <strong>4.9 из 5</strong>. Клиенты отмечают качество полотен, аккуратность мастеров, соблюдение сроков и прозрачность ценообразования. Цена фиксируется в договоре до начала работ — никаких доплат после монтажа.</p>
          <h3>Что чаще всего отмечают в отзывах</h3>
          <ul>
            <li><strong>Скорость</strong> — монтаж занимает 1 день, замерщик приезжает в день обращения</li>
            <li><strong>Чистота работы</strong> — мастера укрывают мебель плёнкой и убирают за собой</li>
            <li><strong>Качество материала</strong> — европейские полотна без запаха, сертифицированные</li>
            <li><strong>Честные цены</strong> — всё прописывается в договоре, без скрытых наценок</li>
            <li><strong>Гарантия 12 лет</strong> — письменная, фиксируется в договоре</li>
          </ul>
        </div>
        <div class="rv-seo__aside">
          <div class="rv-seo__aside-card">
            <div class="rv-seo__aside-rating">4.9</div>
            <div class="rv-seo__aside-stars">
              <span v-for="i in 5" :key="i" class="rv-sym-star rv-sym-star--md filled">★</span>
            </div>
            <div class="rv-seo__aside-label">Средний рейтинг</div>
            <div class="rv-seo__aside-platforms">
              <div v-for="(stat, key) in platformStats" :key="key" class="rv-seo__aside-platform">
                <span>{{ stat.name }}</span>
                <span><strong>{{ stat.rating }}</strong> ({{ stat.count }})</span>
              </div>
            </div>
            <NuxtLink to="/kalkulyator" class="nav-btn rv-seo__aside-btn">
              <Icon name="lucide:calculator" size="15"/>
              Рассчитать потолок
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Video modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="activeVideo" class="rv-modal" @click.self="activeVideo = null">
          <div class="rv-modal__inner">
            <button class="rv-modal__close" @click="activeVideo = null">
              <Icon name="lucide:x" size="20"/>
            </button>
            <div class="rv-modal__video-placeholder">
              <Icon name="lucide:video-off" size="48"/>
              <p class="rv-modal__caption">{{ activeVideo.caption }}</p>
              <p>Видео не найдено</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- JSON-LD AggregateRating -->
    <Head>
      <Script type="application/ld+json">{{ schemaOrg }}</Script>
    </Head>

  </div>
</template>

<script setup lang="ts">
import { reviews as fallbackReviews, videoReviews, type Review } from '~/data/reviews'

usePageSeoMeta('otzyvy')

const { data: reviewsData } = await useAsyncData<Review[]>(
  'page-reviews',
  () => $fetch<Review[]>('/api/reviews'),
  { default: () => fallbackReviews },
)
const reviews = computed(() => reviewsData.value ?? fallbackReviews)

const activeTab = ref<'all' | 'yandex' | '2gis'>('all')
const expandedCards = ref(new Set<number>())
const activeVideo = ref<typeof videoReviews[0] | null>(null)
const visibleCount = ref(10)
const PAGE_SIZE = 10

const tabs = computed(() => [
  { id: 'all',    label: 'Все отзывы',    count: reviews.value.length },
  { id: 'yandex', label: 'Яндекс Карты', count: reviews.value.filter(r => r.platform === 'yandex').length },
  { id: '2gis',   label: '2ГИС',          count: reviews.value.filter(r => r.platform === '2gis').length },
])

const allFiltered = computed(() =>
  activeTab.value === 'all' ? reviews.value : reviews.value.filter(r => r.platform === activeTab.value)
)
const filteredReviews = computed(() => allFiltered.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < allFiltered.value.length)

// сбрасываем счётчик при смене вкладки
watch(activeTab, () => { visibleCount.value = PAGE_SIZE })

function showMore() { visibleCount.value += PAGE_SIZE }

// Реальный средний рейтинг из данных
const avgRating = computed(() => {
  if (!reviews.value.length) return 4.9
  const sum = reviews.value.reduce((s, r) => s + r.rating, 0)
  return Math.round((sum / reviews.value.length) * 10) / 10
})

const totalReviews = computed(() => reviews.value.length)

// Процент каждой оценки
const barWidths = computed(() => {
  const total = reviews.value.length || 1
  const result: Record<number, number> = {}
  for (let n = 1; n <= 5; n++) {
    const cnt = reviews.value.filter(r => r.rating === n).length
    result[n] = Math.round((cnt / total) * 100)
  }
  return result
})

// Статистика по платформам
const platformStats = computed(() => {
  const yandex = reviews.value.filter(r => r.platform === 'yandex')
  const gis    = reviews.value.filter(r => r.platform === '2gis')
  const yRating = yandex.length ? Math.round((yandex.reduce((s, r) => s + r.rating, 0) / yandex.length) * 10) / 10 : 4.9
  const gRating = gis.length    ? Math.round((gis.reduce((s, r) => s + r.rating, 0)    / gis.length)    * 10) / 10 : 4.9
  return {
    yandex: { name: 'Яндекс Карты', rating: yRating, count: yandex.length, color: '#fc3f1d', icon: 'simple-icons:yandex' },
    '2gis': { name: '2ГИС',         rating: gRating, count: gis.length,    color: '#00844b', icon: 'lucide:map-pin' },
  }
})

function platformName(p: string) {
  const map: Record<string, string> = { yandex: 'Яндекс', '2gis': '2ГИС' }
  return map[p] ?? p
}

function formatDate(d: string) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

function toggleExpand(id: number) {
  expandedCards.value = new Set(expandedCards.value)
  if (expandedCards.value.has(id)) expandedCards.value.delete(id)
  else expandedCards.value.add(id)
}

function openVideo(video: typeof videoReviews[0]) {
  activeVideo.value = video
}

const avatarColors = ['#f5c800', '#4a9eff', '#a78bfa', '#34d399', '#f97316', '#ec4899']
function avatarColor(name: string) {
  return avatarColors[name.charCodeAt(0) % avatarColors.length]
}

const schemaOrg = computed(() => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ПроПотолок',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: String(avgRating.value),
    reviewCount: totalReviews.value,
    bestRating: '5',
    worstRating: '1',
  },
  review: reviews.value.slice(0, 10).map(r => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.author },
    reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
    datePublished: r.date,
    reviewBody: r.text,
  })),
}))
</script>

<style scoped>
/* ═══ Hero ═══ */
.rv-hero { background: #141414; padding: 52px 0 56px; }
.rv-hero__inner { display: grid; grid-template-columns: 1fr auto; gap: 60px; align-items: center; }

.rv-pretitle {
  display: inline-block; background: var(--accent); color: #141414;
  font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px;
  margin-bottom: 16px; text-transform: uppercase; letter-spacing: .5px;
}
.rv-pretitle--dark { background: var(--accent); color: var(--dark); }

.rv-hero__title { font-size: 38px; font-weight: 900; color: #fff; line-height: 1.15; margin-bottom: 12px; }
.rv-hero__desc  { font-size: 16px; color: rgba(255,255,255,.4); max-width: 540px; line-height: 1.6; margin-bottom: 28px; }

/* Платформы */
.rv-platforms { display: flex; gap: 12px; flex-wrap: wrap; }
.rv-platform {
  display: flex; align-items: center; gap: 10px;
  background: #1e1e1e; border: 1px solid #2a2a2a;
  border-radius: 12px; padding: 12px 16px;
  text-decoration: none; cursor: pointer;
  transition: border-color .15s;
}
.rv-platform:hover { border-color: var(--platform-color, var(--accent)); }
.rv-platform__rating { font-size: 22px; font-weight: 900; color: var(--platform-color, var(--accent)); font-family: 'Gilroy', sans-serif; }
.rv-platform__stars { display: flex; gap: 1px; margin-bottom: 2px; font-size: 13px; }
.rv-platform__ico { flex-shrink: 0; }
.rv-platform__name  { font-size: 13px; font-weight: 700; color: #fff; }
.rv-platform__count { font-size: 11px; color: rgba(255,255,255,.35); }

/* Общий рейтинг */
.rv-hero__rating { display: flex; flex-direction: column; gap: 20px; align-items: center; }
.rv-rating-big {
  background: #1e1e1e; border: 1px solid #2a2a2a;
  border-radius: 20px; padding: 28px 32px; text-align: center;
}
.rv-rating-big__num {
  font-size: 72px; font-weight: 900; color: var(--accent);
  font-family: 'Gilroy', sans-serif; line-height: 1;
}
.rv-rating-big__stars { display: flex; justify-content: center; gap: 2px; margin: 8px 0; font-size: 28px; }
.rv-rating-big__label { font-size: 13px; color: rgba(255,255,255,.4); margin-bottom: 4px; }
.rv-rating-big__total { font-size: 12px; color: rgba(255,255,255,.25); }

.rv-rating-bars { width: 200px; display: flex; flex-direction: column; gap: 5px; }
.rv-rating-bar { display: flex; align-items: center; gap: 7px; }
.rv-rating-bar__n    { font-size: 12px; font-weight: 700; color: rgba(255,255,255,.4); width: 10px; text-align: right; }
.rv-rating-bar__star { color: #facc15; flex-shrink: 0; }
.rv-rating-bar__track { flex: 1; height: 6px; background: #2a2a2a; border-radius: 3px; overflow: hidden; }
.rv-rating-bar__fill  { height: 100%; background: var(--accent); border-radius: 3px; }
.rv-rating-bar__pct   { font-size: 11px; color: rgba(255,255,255,.3); width: 32px; text-align: right; }

/* ═══ Body ═══ */
.rv-body { background: #f7f7f7; padding: 52px 0 56px; }

/* Фильтры */
.rv-filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
.rv-filter {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 9px 18px; background: #fff;
  border: 1.5px solid #e0e0e0; border-radius: 24px;
  font-size: 14px; font-weight: 600; color: var(--gray);
  font-family: 'Gilroy', sans-serif; cursor: pointer;
  transition: all .15s;
}
.rv-filter:hover  { border-color: #bbb; color: var(--dark); }
.rv-filter.active { border-color: var(--accent); color: var(--dark); background: #fffbe6; }
.rv-filter__count {
  background: #f0f0f0; border-radius: 20px;
  font-size: 11px; font-weight: 700; padding: 1px 7px;
}
.rv-filter.active .rv-filter__count { background: rgba(245,200,0,.3); }

/* Сетка отзывов */
.rv-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
  margin-bottom: 32px;
}

/* Карточка отзыва */
.rv-card {
  background: #fff; border-radius: 16px; padding: 22px 22px 18px;
  box-shadow: 0 1px 8px rgba(0,0,0,.06);
  border: 1.5px solid transparent; transition: border-color .15s;
  display: flex; flex-direction: column; gap: 12px;
}
.rv-card:hover { border-color: #e8e8e8; }

.rv-card__head { display: flex; align-items: flex-start; gap: 12px; }
.rv-card__avatar {
  width: 42px; height: 42px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 17px; font-weight: 800; color: var(--dark);
}
.rv-card__avatar--photo { object-fit: cover; }
.rv-card__author {
  font-size: 15px; font-weight: 700; color: var(--dark);
  display: flex; align-items: center; gap: 5px;
}
.rv-card__verified { color: #3b82f6; }
.rv-card__meta { display: flex; align-items: center; gap: 8px; margin-top: 3px; }
.rv-card__platform {
  font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 10px;
  text-transform: uppercase; letter-spacing: .3px;
}
.rv-card__platform--yandex { background: #fff0ed; color: #fc3f1d; }
.rv-card__platform--2gis   { background: #e8faf0; color: #00844b; }
.rv-card__platform--avito  { background: #e8f4ff; color: #0073e6; }
.rv-card__date { font-size: 12px; color: #bbb; }
.rv-card__stars { display: flex; gap: 1px; margin-left: auto; flex-shrink: 0; font-size: 15px; }
/* Символьные звёзды */
.rv-sym-star { font-style: normal; line-height: 1; }
.rv-sym-star.filled { color: #facc15; }
.rv-sym-star.empty  { color: #333; }
.rv-sym-star--lg { font-size: 28px; }
.rv-sym-star--md { font-size: 18px; }

.rv-card__room {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 12px; font-weight: 600; color: var(--gray);
  background: #f7f7f7; border-radius: 8px; padding: 3px 9px;
  width: fit-content;
}

.rv-card__text {
  font-size: 14px; color: #444; line-height: 1.7;
  display: -webkit-box; -webkit-line-clamp: 4;
  -webkit-box-orient: vertical; overflow: hidden;
}
.rv-card__text.expanded { display: block; -webkit-line-clamp: unset; }
.rv-card__expand {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 13px; font-weight: 600; color: var(--gray);
  background: none; border: none; cursor: pointer;
  font-family: 'Gilroy', sans-serif; padding: 0;
  transition: color .15s;
}
.rv-card__expand:hover { color: var(--dark); }

.rv-card__reply {
  background: #f7f7f7; border-left: 3px solid var(--accent);
  border-radius: 0 8px 8px 0; padding: 12px 14px;
}
.rv-card__reply-head {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 700; color: var(--gray);
  margin-bottom: 5px; text-transform: uppercase; letter-spacing: .3px;
}
.rv-card__reply-text { font-size: 13px; color: #555; line-height: 1.6; }

/* Показать ещё */
.rv-show-more {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 13px 32px; background: #fff;
  border: 2px solid #e0e0e0; border-radius: 50px;
  font-size: 15px; font-weight: 700; color: var(--dark);
  font-family: 'Gilroy', sans-serif; cursor: pointer;
  transition: border-color .15s, box-shadow .15s;
}
.rv-show-more:hover { border-color: var(--accent); box-shadow: 0 4px 16px rgba(245,200,0,.2); }

/* Ссылки на платформы */
.rv-external {
  background: #fff; border-radius: 16px; padding: 20px 24px;
  display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
  box-shadow: 0 1px 8px rgba(0,0,0,.06);
}
.rv-external__title { font-size: 14px; font-weight: 700; color: var(--gray); white-space: nowrap; }
.rv-external__links { display: flex; gap: 10px; flex-wrap: wrap; }
.rv-external__link {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 8px 16px; border-radius: 10px;
  font-size: 14px; font-weight: 700; text-decoration: none;
  transition: opacity .15s, transform .15s;
}
.rv-external__link:hover { opacity: .85; transform: translateY(-2px); }
.rv-external__link--yandex { background: #fff0ed; color: #fc3f1d; border: 1.5px solid #ffd5cc; }
.rv-external__link--2gis   { background: #e8faf0; color: #00844b; border: 1.5px solid #b3e6cc; }
.rv-external__link--avito  { background: #e8f4ff; color: #0073e6; border: 1.5px solid #b3d9ff; }

/* Transitions */
.rv-list-enter-active { transition: all .25s ease; }
.rv-list-leave-active { transition: all .2s ease; }
.rv-list-enter-from   { opacity: 0; transform: translateY(10px); }
.rv-list-leave-to     { opacity: 0; }

/* ═══ Видео ═══ */
.rv-video-section { background: #141414; padding: 64px 0; }
.rv-section-head  { text-align: center; margin-bottom: 40px; }
.rv-section-title { font-size: 32px; font-weight: 800; color: #fff; margin: 0 0 10px; }
.rv-section-desc  { font-size: 15px; color: rgba(255,255,255,.4); max-width: 500px; margin: 0 auto; line-height: 1.6; }

.rv-videos { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }

.rv-video {
  cursor: pointer; border-radius: 14px; overflow: hidden;
  background: #1e1e1e; border: 1.5px solid #2a2a2a;
  transition: transform .2s, border-color .2s, box-shadow .2s;
}
.rv-video:hover { transform: translateY(-4px); border-color: var(--accent); box-shadow: 0 8px 24px rgba(0,0,0,.3); }

.rv-video__preview { position: relative; aspect-ratio: 9/16; overflow: hidden; }
.rv-video__img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s; }
.rv-video:hover .rv-video__img { transform: scale(1.05); }
.rv-video__overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,.35);
  display: flex; align-items: center; justify-content: center;
  transition: background .2s;
}
.rv-video:hover .rv-video__overlay { background: rgba(0,0,0,.5); }
.rv-video__play {
  width: 52px; height: 52px; border-radius: 50%;
  background: var(--accent); display: flex; align-items: center; justify-content: center;
  color: var(--dark);
  transform: scale(.9); transition: transform .2s;
}
.rv-video:hover .rv-video__play { transform: scale(1); }
.rv-video__duration {
  position: absolute; bottom: 8px; right: 8px;
  background: rgba(0,0,0,.7); color: #fff;
  font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 6px;
}
.rv-video__room {
  position: absolute; top: 8px; left: 8px;
  background: var(--accent); color: var(--dark);
  font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 6px;
  text-transform: uppercase; letter-spacing: .3px;
}
.rv-video__body { padding: 12px 14px; }
.rv-video__caption { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 8px; line-height: 1.3; }
.rv-video__author {
  display: flex; align-items: center; gap: 7px;
  font-size: 12px; color: rgba(255,255,255,.4);
}
.rv-video__avatar {
  width: 22px; height: 22px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 800; color: var(--dark); flex-shrink: 0;
}

/* ═══ Оставить отзыв ═══ */
.rv-leave {
  background: #f7f7f7; padding: 48px 0;
  border-top: 1px solid #e8e8e8;
}
.rv-leave__inner { display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
.rv-leave__title { font-size: 26px; font-weight: 800; color: var(--dark); margin-bottom: 8px; }
.rv-leave__desc  { font-size: 15px; color: var(--gray); max-width: 460px; }
.rv-leave__btns  { display: flex; gap: 10px; flex-wrap: wrap; }
.rv-leave__btn {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 11px 20px; border-radius: 10px;
  font-size: 14px; font-weight: 700; text-decoration: none;
  transition: opacity .15s, transform .15s;
  border: 2px solid transparent;
}
.rv-leave__btn:hover { opacity: .85; transform: translateY(-2px); }
.rv-leave__btn--yandex { background: #fff0ed; color: #fc3f1d; border-color: #ffd5cc; }
.rv-leave__btn--2gis   { background: #e8faf0; color: #00844b; border-color: #b3e6cc; }
.rv-leave__btn--avito  { background: #e8f4ff; color: #0073e6; border-color: #b3d9ff; }

/* ═══ SEO ═══ */
.rv-seo { background: #fff; padding: 64px 0; }
.rv-seo__inner { display: grid; grid-template-columns: 1fr 280px; gap: 48px; align-items: start; }
.rv-seo__content h2 { font-size: 24px; font-weight: 800; color: var(--dark); margin-bottom: 14px; }
.rv-seo__content h3 { font-size: 17px; font-weight: 700; color: var(--dark); margin: 20px 0 8px; }
.rv-seo__content p  { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 10px; }
.rv-seo__content ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 7px; }
.rv-seo__content li { display: flex; align-items: baseline; gap: 8px; font-size: 15px; color: #555; line-height: 1.6; }
.rv-seo__content li::before { content: '—'; color: var(--accent); font-weight: 700; flex-shrink: 0; }

.rv-seo__aside { position: sticky; top: 100px; }
.rv-seo__aside-card {
  background: #f7f7f7; border-radius: 16px; padding: 24px;
  border: 1.5px solid #ececec; text-align: center;
}
.rv-seo__aside-rating { font-size: 64px; font-weight: 900; color: var(--dark); font-family: 'Gilroy', sans-serif; line-height: 1; }
.rv-seo__aside-stars  { display: flex; justify-content: center; gap: 4px; margin: 8px 0 6px; }
/* Символьные звёзды */
.rv-sym-star { font-style: normal; line-height: 1; }
.rv-sym-star.filled { color: #facc15; }
.rv-sym-star.empty  { color: #333; }
.rv-sym-star--lg { font-size: 28px; }
.rv-sym-star--md { font-size: 18px; }
.rv-seo__aside-label { font-size: 13px; color: var(--gray); margin-bottom: 16px; }
.rv-seo__aside-platforms { display: flex; flex-direction: column; gap: 7px; margin-bottom: 20px; }
.rv-seo__aside-platform { display: flex; justify-content: space-between; font-size: 13px; color: var(--gray); }
.rv-seo__aside-platform strong { color: var(--dark); }
.rv-seo__aside-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px; font-size: 14px; }

/* ═══ Modal ═══ */
.rv-modal {
  position: fixed; inset: 0; background: rgba(0,0,0,.85);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: 20px;
}
.rv-modal__inner {
  background: #1e1e1e; border-radius: 20px;
  padding: 32px; max-width: 600px; width: 100%;
  position: relative; text-align: center;
}
.rv-modal__close {
  position: absolute; top: 16px; right: 16px;
  background: #2a2a2a; border: none; border-radius: 50%;
  width: 36px; height: 36px; cursor: pointer; color: #aaa;
  display: flex; align-items: center; justify-content: center;
  transition: background .15s, color .15s;
}
.rv-modal__close:hover { background: #333; color: #fff; }
.rv-modal__video-placeholder {
  display: flex; flex-direction: column; align-items: center; gap: 14px;
  color: rgba(255,255,255,.3); padding: 20px 0;
}
.rv-modal__caption { font-size: 18px; font-weight: 700; color: #fff; }
.modal-enter-active, .modal-leave-active { transition: opacity .2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

/* ═══ Responsive ═══ */
@media (max-width: 1200px) { .rv-videos { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 1024px) {
  .rv-hero__inner { grid-template-columns: 1fr; }
  .rv-hero__rating { flex-direction: row; align-items: flex-start; }
  .rv-rating-bars { width: auto; flex: 1; }
}
@media (max-width: 768px) {
  .rv-grid    { grid-template-columns: 1fr; }
  .rv-videos  { grid-template-columns: repeat(2, 1fr); }
  .rv-hero__title { font-size: 28px; }
  .rv-section-title { font-size: 24px; }
  .rv-seo__inner { grid-template-columns: 1fr; }
  .rv-seo__aside { position: static; }
  .rv-leave__inner { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 480px) {
  .rv-videos  { grid-template-columns: repeat(2, 1fr); }
  .rv-platforms { flex-direction: column; }
}
</style>
