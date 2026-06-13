<template>
  <div>
    <section class="cl-hero">
      <div class="container cl-hero__inner">
        <div>
          <div class="cl-breadcrumb">
            <NuxtLink to="/catalog">Каталог</NuxtLink>
            <Icon name="lucide:chevron-right" size="14"/>
            <span>По бренду</span>
          </div>
          <h1 class="cl-hero__title">Натяжные потолки по производителю</h1>
          <p class="cl-hero__desc">Работаем с проверенными европейскими брендами — от бюджетного MSD до швейцарского люкса Cerutti</p>
          <div class="cl-hero__chips">
            <NuxtLink to="/catalog" class="cl-chip">← Весь каталог</NuxtLink>
            <NuxtLink to="/catalog/faktury" class="cl-chip">По фактуре</NuxtLink>
            <NuxtLink to="/catalog/vidy" class="cl-chip">По виду</NuxtLink>
            <NuxtLink to="/catalog/po-pomescheniyu" class="cl-chip">По помещению</NuxtLink>
            <NuxtLink to="/catalog/tsveta" class="cl-chip">По цвету</NuxtLink>
          </div>
        </div>
        <div class="cl-hero__badge">
          <div class="cl-hero__badge-val">{{ brendy.length }}</div>
          <div class="cl-hero__badge-label">брендов в наличии</div>
        </div>
      </div>
    </section>

    <section class="cl-section">
      <div class="container">

        <div class="br-grid">
          <NuxtLink v-for="item in brendy" :key="item.id" :to="item.slug" class="br-card">
            <div class="br-card__img" :style="{ backgroundImage: `url('${item.img}')` }"></div>
            <div class="br-card__overlay"></div>
            <div v-if="item.badge" class="br-card__badge">{{ item.badge }}</div>
            <div class="br-card__body">
              <div class="br-card__name">{{ item.title }}</div>
              <div class="br-card__meta">
                <span class="br-card__country"><Icon :name="item.countryIcon" size="12"/>{{ item.country }}</span>
                <span class="br-card__type">{{ item.type }}</span>
              </div>
              <div class="br-card__desc">{{ item.desc }}</div>
              <div class="br-card__price">от {{ item.price }} ₽/м²</div>
            </div>
            <div class="br-card__arrow"><Icon name="lucide:arrow-right" size="16"/></div>
          </NuxtLink>
        </div>

        <div class="cl-cta">
          <div>
            <div class="cl-cta__title">Не знаете какой бренд выбрать?</div>
            <div class="cl-cta__desc">Замерщик привезёт образцы полотен разных производителей и поможет сравнить прямо у вас дома — бесплатно</div>
          </div>
          <div class="cl-cta__btns">
            <button class="nav-btn cl-cta__btn" @click="callbackOpen = true">
              <Icon name="lucide:ruler" size="16"/>Вызвать замерщика
            </button>
            <NuxtLink to="/kalkulyator" class="cl-cta__outline">
              <Icon name="lucide:calculator" size="16"/>Калькулятор
            </NuxtLink>
          </div>
        </div>

        <div class="cl-seo">
          <h2>Производители натяжных потолков</h2>
          <p><strong>MSD (Китай / EU)</strong> — самый популярный бренд по соотношению цены и качества. Три серии: Classic (от 159 ₽/м²), Evolution и Premium. Соответствует европейским стандартам.</p>
          <p><strong>Bauf (Германия)</strong> — немецкие технологии с маркировкой A+. Четыре сертификата экологичности, одобрено для детских помещений. От 189 ₽/м².</p>
          <p><strong>LumFer (Германия)</strong> — уникальное двухслойное полотно Ferico GBR. Толщина 32 мм, не горит, идеально для скрытого освещения. От 249 ₽/м².</p>
          <p><strong>Teqtum</strong> — единственное полотно, прошедшее испытания МЧС России. Допущено в операционные, санатории, детские сады. От 279 ₽/м².</p>
          <p><strong>Pongs (Германия)</strong> — премиум ПВХ на безопасном пластификаторе DOTP. Без токсичных веществ, немецкое качество. От 349 ₽/м².</p>
          <p><strong>Clipso (Франция)</strong> — тканевое полотно без нагрева, дышит, не образует конденсат. Акустические и цветные версии. От 389 ₽/м².</p>
          <p><strong>Cerutti (Швейцария)</strong> — люкс-сегмент. Швейцарский дом текстиля, максимальная экологичность, безупречное ровное покрытие. От 490 ₽/м².</p>
        </div>
      </div>
    </section>

    <ModalCallback v-model="callbackOpen"/>
  </div>
</template>

<script setup lang="ts">
import { brendy as _brendy } from '~/data/catalog'
import { useCatalogPrices } from '~/composables/useCatalogPrices'

const _prices = await useCatalogPrices()

const brendy = computed(() => _brendy.map(b => ({
  ...b,
  price: _prices.value?.['base'] ?? b.price,
})))

usePageSeoMeta('brendy')

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

/* Brand cards — горизонтальные, 2 колонки */
.br-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 48px; }

.br-card {
  position: relative;
  display: grid;
  grid-template-columns: 200px 1fr;
  border-radius: 16px; overflow: hidden;
  text-decoration: none;
  background: #fff;
  border: 2px solid transparent;
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  transition: transform .2s, box-shadow .2s, border-color .2s;
  min-height: 180px;
}
.br-card:hover { transform: translateY(-4px); box-shadow: 0 8px 28px rgba(0,0,0,.14); border-color: var(--accent); }

.br-card__img {
  position: relative;
  background-size: cover; background-position: center;
  transition: transform .4s ease;
}
.br-card:hover .br-card__img { transform: scale(1.05); }
.br-card__overlay { position: absolute; top: 0; left: 0; width: 200px; bottom: 0; background: linear-gradient(90deg, rgba(0,0,0,.3) 0%, rgba(0,0,0,0) 100%); pointer-events: none; }

.br-card__badge {
  position: absolute; top: 12px; left: 12px;
  background: var(--accent); color: var(--dark);
  font-size: 10px; font-weight: 800;
  padding: 3px 10px; border-radius: 6px;
  text-transform: uppercase; letter-spacing: .4px;
  z-index: 2;
}

.br-card__body { padding: 20px 20px 20px 22px; display: flex; flex-direction: column; justify-content: center; gap: 6px; }
.br-card__name { font-size: 22px; font-weight: 900; color: var(--dark); line-height: 1; }
.br-card__meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.br-card__country { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; color: var(--gray); background: #f0f0f0; padding: 3px 8px; border-radius: 20px; }
.br-card__type { font-size: 12px; font-weight: 600; color: rgba(0,0,0,.4); background: #f5f5f5; padding: 3px 8px; border-radius: 20px; }
.br-card__desc { font-size: 13px; color: #666; line-height: 1.55; }
.br-card__price { font-size: 15px; font-weight: 800; color: var(--dark); margin-top: 2px; }
.br-card:hover .br-card__price { color: var(--accent-dark, #c8a000); }

.br-card__arrow {
  position: absolute; bottom: 16px; right: 16px;
  width: 30px; height: 30px;
  background: rgba(0,0,0,.06); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--dark);
  opacity: 0; transform: translateX(-6px);
  transition: opacity .2s, transform .2s, background .2s;
}
.br-card:hover .br-card__arrow { opacity: 1; transform: translateX(0); background: var(--accent); color: var(--dark); }

/* CTA */
.cl-cta { background: #fff; border-radius: 20px; padding: 28px 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; box-shadow: 0 2px 12px rgba(0,0,0,.06); margin-bottom: 48px; }
.cl-cta__title { font-size: 20px; font-weight: 800; color: var(--dark); margin-bottom: 5px; }
.cl-cta__desc  { font-size: 14px; color: var(--gray); max-width: 440px; }
.cl-cta__btns  { display: flex; gap: 12px; align-items: center; flex-shrink: 0; }
.cl-cta__btn   { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; font-size: 14px; }
.cl-cta__outline { display: inline-flex; align-items: center; gap: 8px; padding: 11px 20px; font-size: 14px; font-weight: 700; font-family: var(--font); background: none; border: 2px solid #ddd; border-radius: 50px; color: var(--dark); text-decoration: none; transition: border-color .15s; }
.cl-cta__outline:hover { border-color: var(--accent); }

/* SEO */
.cl-seo { background: #fff; border-radius: 16px; padding: 28px 32px; }
.cl-seo h2 { font-size: 20px; font-weight: 800; color: var(--dark); margin-bottom: 14px; }
.cl-seo p  { font-size: 14px; color: #555; line-height: 1.7; margin-bottom: 8px; }
.cl-seo strong { color: var(--dark); }

/* Responsive */
@media (max-width: 1024px) { .br-grid { grid-template-columns: 1fr; } }
@media (max-width: 768px) {
  .cl-hero__inner { flex-direction: column; }
  .cl-hero__badge { display: none; }
  .cl-hero__title { font-size: 28px; }
  .br-card { grid-template-columns: 140px 1fr; }
}
@media (max-width: 480px) {
  .br-card { grid-template-columns: 1fr; min-height: auto; }
  .br-card__img { height: 140px; }
  .br-card__overlay { width: 100%; height: 140px; background: linear-gradient(180deg, rgba(0,0,0,.2) 0%, rgba(0,0,0,0) 100%); }
  .cl-cta { flex-direction: column; align-items: flex-start; }
}
</style>
