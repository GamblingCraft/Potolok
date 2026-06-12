<template>
  <div>
    <section class="cl-hero">
      <div class="container cl-hero__inner">
        <div>
          <div class="cl-breadcrumb">
            <NuxtLink to="/catalog">Каталог</NuxtLink>
            <Icon name="lucide:chevron-right" size="14"/>
            <span>По цвету</span>
          </div>
          <h1 class="cl-hero__title">Натяжные потолки по цвету</h1>
          <p class="cl-hero__desc">Белые, чёрные, бежевые, цветные и металлик — подберём цвет под любой интерьер и освещение</p>
          <div class="cl-hero__chips">
            <NuxtLink to="/catalog" class="cl-chip">← Весь каталог</NuxtLink>
            <NuxtLink to="/catalog/faktury" class="cl-chip">По фактуре</NuxtLink>
            <NuxtLink to="/catalog/vidy" class="cl-chip">По виду</NuxtLink>
            <NuxtLink to="/catalog/po-pomescheniyu" class="cl-chip">По помещению</NuxtLink>
            <NuxtLink to="/catalog/brendy" class="cl-chip">По бренду</NuxtLink>
          </div>
        </div>
        <div class="cl-hero__badge">
          <div class="cl-hero__badge-val">{{ tsveta.length }}</div>
          <div class="cl-hero__badge-label">цветовых групп</div>
        </div>
      </div>
    </section>

    <section class="cl-section">
      <div class="container">
        <div class="cl-grid">
          <NuxtLink v-for="item in tsveta" :key="item.id" :to="item.slug" class="cl-card">
            <div class="cl-card__img" :style="{ backgroundImage: `url('${item.img}')` }"></div>
            <div class="cl-card__overlay"></div>
            <div class="cl-card__color-dot" :style="{ background: item.hex }"></div>
            <div class="cl-card__body">
              <div class="cl-card__title">{{ item.title }}</div>
              <div class="cl-card__price">от {{ item.price }} ₽/м²<span v-if="item.extra > 0"> (+{{ item.extra }} ₽)</span></div>
            </div>
            <div class="cl-card__arrow"><Icon name="lucide:arrow-right" size="16"/></div>
          </NuxtLink>
        </div>

        <div class="cl-cta">
          <div>
            <div class="cl-cta__title">Не можете выбрать цвет?</div>
            <div class="cl-cta__desc">Замерщик привезёт цветовые образцы и поможет подобрать оттенок прямо у вас дома — бесплатно</div>
          </div>
          <div class="cl-cta__btns">
            <button class="nav-btn cl-cta__btn" @click="callbackOpen = true">
              <Icon name="lucide:palette" size="16"/>Подобрать цвет
            </button>
            <NuxtLink to="/kalkulyator" class="cl-cta__outline">
              <Icon name="lucide:calculator" size="16"/>Калькулятор
            </NuxtLink>
          </div>
        </div>

        <div class="cl-seo">
          <h2>Цвета натяжных потолков</h2>
          <p><strong>Белые</strong> — классика, которая подходит для любого помещения. Визуально увеличивают высоту и светлость комнаты. От 159 ₽/м².</p>
          <p><strong>Чёрные</strong> — эффектный дизайнерский акцент. Особенно выигрышно смотрятся с точечной подсветкой. От 169 ₽/м².</p>
          <p><strong>Бежевые и серые</strong> — нейтральные тона, которые легко сочетаются с любой отделкой стен и мебелью. От 169 ₽/м².</p>
          <p><strong>Цветные</strong> — яркие акценты для детских, баров, студий. Более 1000 оттенков в палитре RAL. От 179 ₽/м².</p>
          <p><strong>Золотые и металлик</strong> — премиальный вид для гостиных и ресторанов. Создают ощущение роскоши. От 199 ₽/м².</p>
        </div>
      </div>
    </section>

    <ModalCallback v-model="callbackOpen"/>
  </div>
</template>

<script setup lang="ts">
import { tsveta as _tsveta } from '~/data/catalog'
import { useCatalogPrices } from '~/composables/useCatalogPrices'

const _prices = await useCatalogPrices()

const tsveta = computed(() => _tsveta.map(t => ({
  ...t,
  price: (_prices.value?.['base'] ?? 159) + t.extra,
})))

useHead({
  title: 'Натяжные потолки по цвету — белые, чёрные, цветные | ПроПотолок Иркутск',
  meta: [{ name: 'description', content: 'Каталог натяжных потолков по цвету: белые, чёрные, серые, бежевые, цветные, золотые. Более 1000 оттенков. Монтаж включён. Бесплатный замер в Иркутске.' }],
})

const callbackOpen = ref(false)
</script>

<style scoped>
.cl-hero { background: #141414; padding: 48px 0 52px; }
.cl-hero__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; }
.cl-breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 13px; color: rgba(255,255,255,.35); margin-bottom: 16px; }
.cl-breadcrumb a { color: rgba(255,255,255,.35); text-decoration: none; transition: color .15s; }
.cl-breadcrumb a:hover { color: var(--accent); }
.cl-hero__title { font-size: 38px; font-weight: 900; color: #fff; line-height: 1.15; margin-bottom: 12px; }
.cl-hero__desc  { font-size: 16px; color: rgba(255,255,255,.45); max-width: 580px; line-height: 1.65; margin-bottom: 24px; }
.cl-hero__chips { display: flex; flex-wrap: wrap; gap: 8px; }
.cl-chip { padding: 7px 16px; border: 1.5px solid rgba(255,255,255,.15); border-radius: 24px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,.5); text-decoration: none; transition: border-color .15s, color .15s; }
.cl-chip:hover { border-color: rgba(255,255,255,.4); color: #fff; }
.cl-hero__badge { text-align: center; background: rgba(245,200,0,.1); border: 1.5px solid rgba(245,200,0,.25); border-radius: 20px; padding: 24px 36px; flex-shrink: 0; }
.cl-hero__badge-val   { font-size: 52px; font-weight: 900; color: var(--accent); font-family: 'Gilroy', sans-serif; line-height: 1; }
.cl-hero__badge-label { font-size: 14px; color: rgba(255,255,255,.4); margin-top: 4px; }
.cl-section { background: #f7f7f7; padding: 56px 0 64px; }
.cl-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 48px; }
.cl-card { position: relative; display: block; border-radius: 14px; overflow: hidden; height: 220px; text-decoration: none; border: 2px solid transparent; transition: transform .2s, box-shadow .2s, border-color .2s; }
.cl-card:hover { transform: translateY(-4px); box-shadow: 0 8px 28px rgba(0,0,0,.15); border-color: var(--accent); }
.cl-card__img { position: absolute; inset: 0; background-size: cover; background-position: center; transition: transform .4s ease; }
.cl-card:hover .cl-card__img { transform: scale(1.06); }
.cl-card__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.05) 0%, rgba(0,0,0,.68) 100%); }
.cl-card__color-dot { position: absolute; top: 12px; left: 12px; width: 28px; height: 28px; border-radius: 50%; border: 2px solid rgba(255,255,255,.6); box-shadow: 0 2px 8px rgba(0,0,0,.3); }
.cl-card__body { position: absolute; bottom: 0; left: 0; right: 0; padding: 14px 16px; }
.cl-card__title { font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 3px; }
.cl-card__price { font-size: 13px; color: rgba(255,255,255,.65); }
.cl-card:hover .cl-card__price { color: var(--accent); }
.cl-card__arrow { position: absolute; top: 12px; right: 12px; width: 30px; height: 30px; background: rgba(255,255,255,.12); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; opacity: 0; transform: translateX(-6px); transition: opacity .2s, transform .2s, background .2s; }
.cl-card:hover .cl-card__arrow { opacity: 1; transform: translateX(0); background: var(--accent); color: var(--dark); }
.cl-cta { background: #fff; border-radius: 20px; padding: 28px 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; box-shadow: 0 2px 12px rgba(0,0,0,.06); margin-bottom: 48px; }
.cl-cta__title { font-size: 20px; font-weight: 800; color: var(--dark); margin-bottom: 5px; }
.cl-cta__desc  { font-size: 14px; color: var(--gray); max-width: 440px; }
.cl-cta__btns  { display: flex; gap: 12px; align-items: center; flex-shrink: 0; }
.cl-cta__btn   { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; font-size: 14px; }
.cl-cta__outline { display: inline-flex; align-items: center; gap: 8px; padding: 11px 20px; font-size: 14px; font-weight: 700; font-family: var(--font); background: none; border: 2px solid #ddd; border-radius: 50px; color: var(--dark); text-decoration: none; transition: border-color .15s; }
.cl-cta__outline:hover { border-color: var(--accent); }
.cl-seo { background: #fff; border-radius: 16px; padding: 28px 32px; }
.cl-seo h2 { font-size: 20px; font-weight: 800; color: var(--dark); margin-bottom: 14px; }
.cl-seo p  { font-size: 14px; color: #555; line-height: 1.7; margin-bottom: 8px; }
.cl-seo strong { color: var(--dark); }
@media (max-width: 1024px) { .cl-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) { .cl-hero__inner { flex-direction: column; } .cl-hero__badge { display: none; } .cl-grid { grid-template-columns: repeat(2, 1fr); } .cl-hero__title { font-size: 28px; } }
@media (max-width: 480px) { .cl-grid { grid-template-columns: 1fr 1fr; } .cl-card { height: 160px; } .cl-cta { flex-direction: column; align-items: flex-start; } }
</style>
