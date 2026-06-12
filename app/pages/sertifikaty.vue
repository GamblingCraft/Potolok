<template>
  <div>

    <section class="sc-hero">
      <div class="container sc-hero__inner">
        <div>
          <div class="sc-pretitle">Документы качества</div>
          <h1 class="sc-hero__title">Сертификаты и лицензии</h1>
          <p class="sc-hero__desc">Все используемые материалы прошли обязательную сертификацию. По запросу предоставим оригиналы документов.</p>
        </div>
        <div class="sc-hero__nums">
          <div class="sc-num" v-for="n in heroNums" :key="n.label">
            <div class="sc-num__val">{{ n.val }}</div>
            <div class="sc-num__label">{{ n.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Сертификаты -->
    <section class="sc-section sc-section--gray">
      <div class="container">
        <div class="sc-head">
          <div class="sc-pretitle sc-pretitle--dark">Наши документы</div>
          <h2 class="sc-title">Сертификаты соответствия и безопасности</h2>
          <p class="sc-desc">Нажмите на сертификат для просмотра. По запросу вышлем сканы на email.</p>
        </div>
        <div class="sc-grid">
          <div
            class="sc-card"
            v-for="cert in certificates" :key="cert.id"
            @click="openLightbox(cert)"
          >
            <div class="sc-card__img-wrap">
              <img :src="cert.img" :alt="cert.title" class="sc-card__img" loading="lazy"/>
              <div class="sc-card__zoom"><Icon name="lucide:zoom-in" size="20"/></div>
              <div class="sc-card__badge" v-if="cert.badge">{{ cert.badge }}</div>
            </div>
            <div class="sc-card__body">
              <div class="sc-card__icon"><Icon :name="cert.icon" size="18"/></div>
              <div class="sc-card__title">{{ cert.title }}</div>
              <div class="sc-card__desc">{{ cert.desc }}</div>
              <div class="sc-card__num" v-if="cert.num">№ {{ cert.num }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Производители -->
    <section class="sc-section sc-section--white">
      <div class="container">
        <div class="sc-head">
          <div class="sc-pretitle sc-pretitle--dark">Партнёры</div>
          <h2 class="sc-title">Сертифицированные производители</h2>
        </div>
        <div class="sc-brands">
          <div class="sc-brand" v-for="b in brands" :key="b.name">
            <div class="sc-brand__name">{{ b.name }}</div>
            <div class="sc-brand__origin">{{ b.origin }}</div>
            <ul class="sc-brand__certs">
              <li v-for="c in b.certs" :key="c">
                <Icon name="lucide:check-circle" size="13" class="sc-check"/>{{ c }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="sc-cta">
      <div class="container sc-cta__inner">
        <Icon name="lucide:file-check" size="32" class="sc-cta__icon"/>
        <div>
          <h2 class="sc-cta__title">Нужны оригиналы сертификатов?</h2>
          <p class="sc-cta__desc">Предоставим полный пакет документов по запросу — для юридических лиц и гос. организаций</p>
        </div>
        <a :href="site.emailHref" class="nav-btn sc-cta__btn">
          <Icon name="lucide:mail" size="16"/>Запросить документы
        </a>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lb">
        <div v-if="lightbox.open" class="sc-lightbox" @click.self="lightbox.open = false">
          <div class="sc-lightbox__box">
            <button class="sc-lightbox__close" @click="lightbox.open = false">
              <Icon name="lucide:x" size="22"/>
            </button>
            <img :src="lightbox.img" :alt="lightbox.title" class="sc-lightbox__img"/>
            <div class="sc-lightbox__title">{{ lightbox.title }}</div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
const site = useSite()
useHead({
  title: 'Сертификаты и лицензии ПроПотолок — Иркутск',
  meta: [{ name: 'description', content: 'Сертификаты соответствия, гигиенические заключения и лицензии компании ПроПотолок. Все материалы проверены и сертифицированы.' }],
})

const lightbox = reactive({ open: false, img: '', title: '' })

function openLightbox(cert: any) {
  lightbox.img = cert.img
  lightbox.title = cert.title
  lightbox.open = true
}

onMounted(() => {
  const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') lightbox.open = false }
  document.addEventListener('keydown', fn)
  onUnmounted(() => document.removeEventListener('keydown', fn))
})

const heroNums = [
  { val: '4',   label: 'вида сертификатов' },
  { val: '3',   label: 'бренда-партнёра' },
  { val: '100%', label: 'проверено ГОСТ' },
]

const certificates = [
  {
    id: 1,
    title: 'Сертификат пожарной безопасности',
    desc: 'Полотна соответствуют требованиям пожарной безопасности РФ. Класс горючести Г1.',
    num: 'C-RU.ПБ01.В.00001',
    badge: 'Обязательный',
    icon: 'lucide:flame',
    img: 'https://images.unsplash.com/photo-1568219557405-376e23e4f7cf?w=600&q=80',
  },
  {
    id: 2,
    title: 'Гигиеническое заключение',
    desc: 'Санитарно-эпидемиологическое заключение Роспотребнадзора. Нетоксичны, без запаха.',
    num: '77.99.02.243.Д.017',
    badge: 'Обязательный',
    icon: 'lucide:shield-check',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
  },
  {
    id: 3,
    title: 'Сертификат соответствия ГОСТ',
    desc: 'Соответствие ГОСТ Р 57958-2017 «Натяжные потолки. Технические условия».',
    num: 'РОСС RU.АЯ46.Н00100',
    badge: null,
    icon: 'lucide:badge-check',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
  },
  {
    id: 4,
    title: 'Экологический сертификат',
    desc: 'Полотна прошли проверку на экологическую безопасность. Допущены к применению в детских учреждениях.',
    num: 'ЭКО.23.00234',
    badge: null,
    icon: 'lucide:leaf',
    img: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=600&q=80',
  },
  {
    id: 5,
    title: 'Декларация о соответствии MSD',
    desc: 'Официальная декларация производителя MSD (Испания) о соответствии европейским стандартам.',
    num: 'EU-CE-2024-MSD',
    badge: 'MSD',
    icon: 'lucide:globe',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
  },
  {
    id: 6,
    title: 'Сертификат Bauf Германия',
    desc: 'Тканевые полотна Bauf сертифицированы по европейскому стандарту EN 13561.',
    num: 'DE-2024-BAUF-001',
    badge: 'Bauf',
    icon: 'lucide:award',
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
  },
]

const brands = [
  {
    name: 'MSD',
    origin: 'Испания',
    certs: ['CE-сертификат ЕС', 'Сертификат РФ', 'Гигиеническое заключение', 'Пожарная безопасность Г1'],
  },
  {
    name: 'Bauf',
    origin: 'Германия',
    certs: ['EN 13561 (Европа)', 'ГОСТ Р 57958-2017', 'Гипоаллергенность', 'Рекомендовано для детских'],
  },
  {
    name: 'Teqtum',
    origin: 'Россия',
    certs: ['Сертификат ГОСТ', 'Пожарная безопасность', 'Антибактериальное покрытие', 'Гигиеническое заключение'],
  },
]
</script>

<style scoped>
.sc-pretitle { display: inline-block; background: var(--accent); color: var(--dark); font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: .5px; }
.sc-pretitle--dark { background: var(--accent); color: var(--dark); }
.sc-head { text-align: center; margin-bottom: 40px; }
.sc-title { font-size: 30px; font-weight: 800; color: var(--dark); margin-bottom: 10px; }
.sc-desc  { font-size: 15px; color: var(--gray); max-width: 520px; margin: 0 auto; line-height: 1.6; }
.sc-check { color: var(--accent); flex-shrink: 0; }
.sc-section { padding: 64px 0; }
.sc-section--gray  { background: #f7f7f7; }
.sc-section--white { background: #fff; }

.sc-hero { background: #141414; padding: 48px 0; }
.sc-hero__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.sc-hero__title { font-size: 36px; font-weight: 900; color: #fff; margin-bottom: 10px; }
.sc-hero__desc  { font-size: 15px; color: rgba(255,255,255,.4); max-width: 440px; line-height: 1.6; }
.sc-hero__nums  { display: flex; gap: 16px; flex-shrink: 0; }
.sc-num { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); border-radius: 14px; padding: 20px 28px; text-align: center; }
.sc-num__val   { font-size: 28px; font-weight: 900; color: var(--accent); line-height: 1; margin-bottom: 4px; }
.sc-num__label { font-size: 12px; color: rgba(255,255,255,.4); }

.sc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.sc-card { background: #fff; border-radius: 16px; overflow: hidden; border: 1.5px solid #eee; transition: border-color .15s, box-shadow .15s; cursor: pointer; }
.sc-card:hover { border-color: var(--accent); box-shadow: 0 6px 24px rgba(245,200,0,.12); }
.sc-card__img-wrap { position: relative; height: 200px; overflow: hidden; background: #f0f0f0; }
.sc-card__img  { width: 100%; height: 100%; object-fit: cover; transition: transform .4s ease; }
.sc-card:hover .sc-card__img { transform: scale(1.05); }
.sc-card__zoom {
  position: absolute; inset: 0; background: rgba(0,0,0,.4);
  display: flex; align-items: center; justify-content: center;
  color: #fff; opacity: 0; transition: opacity .2s;
}
.sc-card:hover .sc-card__zoom { opacity: 1; }
.sc-card__badge {
  position: absolute; top: 12px; left: 12px;
  background: var(--accent); color: var(--dark);
  font-size: 10px; font-weight: 800; padding: 3px 10px; border-radius: 20px;
  text-transform: uppercase;
}
.sc-card__body { padding: 18px 20px; }
.sc-card__icon { color: var(--accent); margin-bottom: 8px; }
.sc-card__title { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 6px; line-height: 1.3; }
.sc-card__desc  { font-size: 13px; color: var(--gray); line-height: 1.55; margin-bottom: 8px; }
.sc-card__num   { font-size: 11px; font-weight: 600; color: rgba(0,0,0,.3); font-family: monospace; }

.sc-brands { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.sc-brand { background: #f7f7f7; border-radius: 16px; padding: 26px 24px; border: 1.5px solid transparent; transition: border-color .15s; }
.sc-brand:hover { border-color: var(--accent); }
.sc-brand__name   { font-size: 26px; font-weight: 900; color: var(--dark); font-family: 'Gilroy', sans-serif; margin-bottom: 4px; }
.sc-brand__origin { font-size: 11px; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: .5px; margin-bottom: 16px; }
.sc-brand__certs  { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 7px; }
.sc-brand__certs li { display: flex; align-items: center; gap: 7px; font-size: 13px; color: #555; }

.sc-cta { background: var(--dark); padding: 40px 0; }
.sc-cta__inner { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
.sc-cta__icon { color: var(--accent); flex-shrink: 0; }
.sc-cta__title { font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 4px; }
.sc-cta__desc  { font-size: 14px; color: rgba(255,255,255,.4); }
.sc-cta__btn   { margin-left: auto; display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; font-size: 14px; flex-shrink: 0; }

.sc-lightbox { position: fixed; inset: 0; z-index: 600; background: rgba(0,0,0,.88); display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(4px); }
.sc-lightbox__box { position: relative; max-width: 900px; width: 100%; }
.sc-lightbox__close { position: absolute; top: -44px; right: 0; background: rgba(255,255,255,.15); border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; color: #fff; display: flex; align-items: center; justify-content: center; transition: background .15s; }
.sc-lightbox__close:hover { background: rgba(255,255,255,.25); }
.sc-lightbox__img   { width: 100%; max-height: 80vh; object-fit: contain; border-radius: 10px; display: block; }
.sc-lightbox__title { text-align: center; color: rgba(255,255,255,.6); font-size: 14px; margin-top: 12px; }
.lb-enter-active { transition: opacity .2s ease, transform .2s ease; }
.lb-leave-active { transition: opacity .15s ease; }
.lb-enter-from   { opacity: 0; transform: scale(.97); }
.lb-leave-to     { opacity: 0; }

@media (max-width: 900px) { .sc-grid { grid-template-columns: repeat(2, 1fr); } .sc-brands { grid-template-columns: 1fr; } }
@media (max-width: 640px) { .sc-hero__title { font-size: 26px; } .sc-grid { grid-template-columns: 1fr; } .sc-cta__btn { margin-left: 0; } .sc-hero__nums { flex-wrap: wrap; } }
</style>
