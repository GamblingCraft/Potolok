<template>
  <section class="cp-section cp-works">
    <div class="container">
      <div class="cp-section-head">
        <div class="cp-pretitle cp-pretitle--dark">Реальные проекты</div>
        <h2 class="cp-h2 cp-h2--center">Готовые работы с ценами и описанием</h2>
        <p class="cp-section-desc">Материалы сертифицированы, имеем все необходимые документы. Устанавливаем в жилых и коммерческих помещениях.</p>
      </div>
      <div class="cp-works-grid">
        <div class="cp-work-card" v-for="w in visibleItems" :key="w.id">
          <div class="cp-work-card__img-wrap" @click="$emit('lightbox', w.img, w.title)">
            <img :src="w.img" :alt="w.title" class="cp-work-card__img" loading="lazy"/>
            <div class="cp-work-card__zoom"><Icon name="lucide:zoom-in" size="18"/></div>
          </div>
          <div class="cp-work-card__body">
            <div class="cp-work-card__title">{{ w.title }}</div>
            <div class="cp-work-card__details" v-if="w.details?.length">
              <span v-for="d in w.details" :key="d" class="cp-work-card__detail">{{ d }}</span>
            </div>
            <div class="cp-work-card__footer">
              <div class="cp-work-card__area" v-if="w.area">{{ w.area }} м²</div>
              <div class="cp-work-card__price" v-if="w.price">{{ fmt(w.price) }} ₽</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Кнопки: "ещё" для своих работ, или ссылка на /portfolio для дефолта -->
      <div class="cp-works-more" v-if="isFallback">
        <NuxtLink to="/portfolio" class="cp-more-btn cp-more-btn--portfolio">
          <Icon name="lucide:images" size="16"/>Все наши работы в портфолио
        </NuxtLink>
      </div>
      <div class="cp-works-more" v-else-if="works.length > visibleCount">
        <button class="cp-more-btn" @click="visibleCount += 4">
          <Icon name="lucide:chevron-down" size="16"/>Смотреть ещё
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { portfolio } from '~/data/portfolio'
import type { GalleryItem } from '~/data/gallery'

const props = defineProps<{ works: GalleryItem[] }>()
defineEmits<{ (e: 'lightbox', img: string, title: string): void }>()

const visibleCount = ref(4)
const route = useRoute()

const isFallback = computed(() => props.works.length === 0)

const fallbackItems = portfolio.slice(0, 4).map(p => ({
  id: p.id,
  img: p.photos[0],
  title: p.title,
  area: p.area,
  price: p.price,
  details: [p.roomType, p.texture].filter(Boolean),
}))

// Детерминированный сдвиг по slug — каждая страница показывает свой срез,
// одинаковый при любом запросе (SSR + клиент = одно и то же → нет mismatch)
function slugOffset(slug: string, len: number): number {
  if (len <= 4) return 0
  let hash = 0
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) & 0xffff
  return hash % len
}

const pagedWorks = computed(() => {
  if (isFallback.value || !props.works.length) return []
  const w = props.works
  const offset = slugOffset(String(route.path), w.length)
  // крутим массив со сдвигом, добираем с начала если вышли за конец
  return [...w.slice(offset), ...w.slice(0, offset)]
})

const visibleItems = computed(() =>
  isFallback.value
    ? fallbackItems
    : pagedWorks.value.slice(0, visibleCount.value)
)

function fmt(n: number) { return n.toLocaleString('ru-RU') }
</script>

<style scoped>
.cp-pretitle {
  display: inline-block; font-size: 12px; font-weight: 700;
  padding: 3px 14px; border-radius: 20px; margin-bottom: 14px;
  text-transform: uppercase; letter-spacing: .5px;
  background: var(--accent); color: var(--dark);
}
.cp-pretitle--dark { background: var(--accent); color: var(--dark); }
.cp-section { padding: 64px 0; }
.cp-section-head { text-align: center; margin-bottom: 40px; }
.cp-h2 { font-size: 30px; font-weight: 800; color: var(--dark); margin: 0 0 10px; line-height: 1.2; }
.cp-h2--center { text-align: center; }
.cp-section-desc { font-size: 15px; color: var(--gray); max-width: 560px; margin: 0 auto; line-height: 1.6; }
.cp-works { background: #f7f7f7; }
.cp-works-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.cp-work-card { background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,.06); border: 1.5px solid transparent; transition: border-color .2s, box-shadow .2s; }
.cp-work-card:hover { border-color: var(--accent); box-shadow: 0 6px 24px rgba(0,0,0,.1); }
.cp-work-card__img-wrap { position: relative; aspect-ratio: 4/3; overflow: hidden; cursor: pointer; }
.cp-work-card__img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s ease; }
.cp-work-card:hover .cp-work-card__img { transform: scale(1.06); }
.cp-work-card__zoom {
  position: absolute; inset: 0; background: rgba(0,0,0,.35);
  display: flex; align-items: center; justify-content: center;
  color: #fff; opacity: 0; transition: opacity .2s;
}
.cp-work-card__img-wrap:hover .cp-work-card__zoom { opacity: 1; }
.cp-work-card__body { padding: 14px 14px 12px; }
.cp-work-card__title { font-size: 13px; font-weight: 700; color: var(--dark); margin-bottom: 8px; line-height: 1.3; }
.cp-work-card__details { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; }
.cp-work-card__detail { font-size: 11px; color: var(--gray); background: #f7f7f7; border-radius: 5px; padding: 2px 7px; }
.cp-work-card__footer { display: flex; align-items: center; justify-content: space-between; padding-top: 10px; border-top: 1px solid #f0f0f0; }
.cp-work-card__area  { font-size: 12px; color: var(--gray); }
.cp-work-card__price { font-size: 14px; font-weight: 800; color: var(--dark); }
.cp-works-more { text-align: center; }
.cp-more-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 32px; font-size: 14px; font-weight: 700;
  font-family: var(--font); background: #fff; border: 1.5px solid #ddd;
  border-radius: 50px; cursor: pointer; color: var(--gray);
  transition: border-color .15s, color .15s; text-decoration: none;
}
.cp-more-btn:hover { border-color: var(--accent); color: var(--dark); }
.cp-more-btn--portfolio { border-color: var(--accent); color: var(--dark); }

@media (max-width: 1100px) { .cp-works-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px)  { .cp-works-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px)  { .cp-works-grid { grid-template-columns: repeat(2, 1fr); } }
</style>
