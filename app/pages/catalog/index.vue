<template>
  <div>

    <!-- ═══ HERO ═══ -->
    <section class="cat-hero">
      <div class="container cat-hero__inner">
        <h1 class="cat-hero__title">Каталог натяжных потолков</h1>
        <p class="cat-hero__desc">Более 430 фактур и цветов. Матовые, глянцевые, сатиновые, тканевые и дизайнерские потолки — под любой интерьер и бюджет</p>
        <div class="cat-hero__chips">
          <a v-for="tab in tabs" :key="tab.id" :href="'#' + tab.id" class="cat-hero__chip" :class="{ active: activeTab === tab.id }" @click.prevent="activeTab = tab.id">
            {{ tab.label }}
          </a>
        </div>
      </div>
    </section>

    <!-- ═══ CATALOG GROUPS ═══ -->
    <section class="cat-body">
      <div class="container">

        <!-- Фактуры -->
        <div v-show="activeTab === 'all' || activeTab === 'faktury'" id="faktury" class="cat-group">
          <div class="cat-group__head">
            <h2 class="cat-group__title">По фактуре полотна</h2>
            <p class="cat-group__desc">Основной параметр, влияющий на внешний вид и цену потолка</p>
          </div>
          <div class="cat-grid cat-grid--4">
            <NuxtLink v-for="item in faktury" :key="item.slug" :to="item.slug" class="cat-card">
              <div class="cat-card__img" :style="{ backgroundImage: `url('${heroImg(item)}')` }"></div>
              <div class="cat-card__overlay"></div>
              <div class="cat-card__body">
                <div v-if="item.badge" class="cat-card__badge">{{ item.badge }}</div>
                <div class="cat-card__title">{{ item.title }}</div>
                <div class="cat-card__price">от {{ item.price }}&nbsp;₽/м²</div>
              </div>
              <div class="cat-card__arrow"><Icon name="lucide:arrow-right" size="16"/></div>
            </NuxtLink>
          </div>
        </div>

        <!-- Виды -->
        <div v-show="activeTab === 'all' || activeTab === 'vidy'" id="vidy" class="cat-group">
          <div class="cat-group__head">
            <h2 class="cat-group__title">По виду и технологии</h2>
            <p class="cat-group__desc">Парящие ниши, подсветка, многоуровневые конструкции и дизайнерские решения</p>
          </div>
          <div class="cat-grid cat-grid--4">
            <NuxtLink v-for="item in vidy" :key="item.slug" :to="item.slug" class="cat-card">
              <div class="cat-card__img" :style="{ backgroundImage: `url('${heroImg(item)}')` }"></div>
              <div class="cat-card__overlay"></div>
              <div class="cat-card__body">
                <div v-if="item.badge" class="cat-card__badge">{{ item.badge }}</div>
                <div class="cat-card__title">{{ item.title }}</div>
                <div class="cat-card__price">от {{ item.price }}&nbsp;₽/м²</div>
              </div>
              <div class="cat-card__arrow"><Icon name="lucide:arrow-right" size="16"/></div>
            </NuxtLink>
          </div>
        </div>

        <!-- По помещению -->
        <div v-show="activeTab === 'all' || activeTab === 'pomeshcheniya'" id="pomeshcheniya" class="cat-group">
          <div class="cat-group__head">
            <h2 class="cat-group__title">По помещению</h2>
            <p class="cat-group__desc">Подберём оптимальное решение с учётом влажности, освещения и стиля комнаты</p>
          </div>
          <div class="cat-grid cat-grid--4">
            <NuxtLink v-for="item in pomeshcheniya" :key="item.slug" :to="item.slug" class="cat-card">
              <div class="cat-card__img" :style="{ backgroundImage: `url('${heroImg(item)}')` }"></div>
              <div class="cat-card__overlay"></div>
              <div class="cat-card__body">
                <div class="cat-card__title">{{ item.title }}</div>
                <div class="cat-card__price">от {{ item.price }}&nbsp;₽/м²</div>
              </div>
              <div class="cat-card__arrow"><Icon name="lucide:arrow-right" size="16"/></div>
            </NuxtLink>
          </div>
        </div>

        <!-- Цвета -->
        <div v-show="activeTab === 'all' || activeTab === 'tsveta'" id="tsveta" class="cat-group">
          <div class="cat-group__head">
            <h2 class="cat-group__title">По цвету</h2>
            <p class="cat-group__desc">Более 200 оттенков — белые, чёрные, цветные и металлические полотна</p>
          </div>
          <div class="cat-grid cat-grid--4">
            <NuxtLink v-for="item in tsveta" :key="item.slug" :to="item.slug" class="cat-card">
              <div class="cat-card__img" :style="{ backgroundImage: `url('${heroImg(item)}')` }"></div>
              <div class="cat-card__overlay"></div>
              <div class="cat-card__body">
                <div class="cat-card__title">{{ item.title }}</div>
                <div class="cat-card__price">от {{ item.price }}&nbsp;₽/м²</div>
              </div>
              <div class="cat-card__arrow"><Icon name="lucide:arrow-right" size="16"/></div>
            </NuxtLink>
          </div>
        </div>

        <!-- CTA -->
        <div class="cat-cta">
          <div class="cat-cta__text">
            <div class="cat-cta__title">Не можете выбрать?</div>
            <div class="cat-cta__desc">Бесплатный замер — специалист покажет образцы и поможет подобрать идеальный вариант прямо у вас дома</div>
          </div>
          <div class="cat-cta__btns">
            <NuxtLink to="/kalkulyator" class="nav-btn cat-cta__btn">
              <Icon name="lucide:calculator" size="16"/>
              Рассчитать стоимость
            </NuxtLink>
          </div>
        </div>

      </div>
    </section>

    <!-- ═══ SEO TEXT ═══ -->
    <section class="cat-seo">
      <div class="container">
        <div class="cat-seo__inner">
          <div class="cat-seo__content">
            <h2>Натяжные потолки в Иркутске — широкий выбор фактур и технологий</h2>
            <p>
              Компания ПроПотолок предлагает полный каталог натяжных потолков для жилых и коммерческих помещений. Мы работаем с европейскими полотнами премиум-класса, которые отличаются долговечностью, экологичностью и широкой цветовой палитрой — более 430 вариантов на выбор.
            </p>
            <h3>Фактуры натяжных потолков</h3>
            <p>
              <strong>Матовые потолки</strong> — самый популярный вид. Равномерное рассеивание света скрывает неровности и придаёт помещению аккуратный вид. Подходят для любых комнат, цена от 159 ₽/м².
            </p>
            <p>
              <strong>Глянцевые потолки</strong> визуально увеличивают пространство за счёт зеркального эффекта. Идеальны для гостиных и спален с точечным освещением. От 209 ₽/м².
            </p>
            <p>
              <strong>Сатиновые потолки</strong> сочетают мягкий блеск глянца и равномерность матового покрытия. Универсальный вариант для любого интерьера. От 189 ₽/м².
            </p>
            <p>
              <strong>Тканевые (тканевые) потолки</strong> — немецкое полотно из полиэстера без ПВХ. Экологически чистый материал, выдерживает перепады температур. Рекомендуется для детских комнат. От 319 ₽/м².
            </p>
            <h3>Технологии и виды</h3>
            <p>
              <strong>Парящие потолки</strong> создают эффект левитирующей световой ниши — современный тренд в дизайне интерьеров. <strong>Двухуровневые конструкции</strong> зонируют пространство и скрывают коммуникации. <strong>Потолки со световыми линиями</strong> — встроенные LED-профили создают архитектурную подсветку без видимых источников света.
            </p>
            <h3>Монтаж и гарантия</h3>
            <p>
              Все работы выполняют сертифицированные монтажники с опытом более 5 лет. Монтаж занимает 1 день — вы можете пользоваться помещением сразу после установки. Гарантия по договору — <strong>12 лет</strong>. Монтаж входит в стоимость полотна.
            </p>
          </div>
          <div class="cat-seo__aside">
            <div class="cat-seo__aside-card">
              <div class="cat-seo__aside-title">Почему ПроПотолок</div>
              <ul class="cat-seo__aside-list">
                <li v-for="item in seoAside" :key="item.text">
                  <Icon :name="item.icon" size="15" class="cat-seo__aside-icon"/>
                  {{ item.text }}
                </li>
              </ul>
              <NuxtLink to="/kalkulyator" class="nav-btn cat-seo__aside-btn">
                <Icon name="lucide:calculator" size="15"/>
                Рассчитать цену
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ FAQ + Schema ═══ -->
    <section class="cat-faq">
      <div class="container">
        <div class="cat-faq__head">
          <div class="cat-pretitle">Вопросы и ответы</div>
          <h2 class="cat-faq__title">Часто задаваемые вопросы о натяжных потолках</h2>
        </div>
        <div class="cat-faq__list">
          <div
            v-for="(faq, i) in faqs" :key="i"
            class="cat-faq__item"
            :class="{ open: openFaq === i }"
            @click="openFaq = openFaq === i ? null : i"
          >
            <div class="cat-faq__q">
              <span>{{ faq.q }}</span>
              <Icon :name="openFaq === i ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="18" class="cat-faq__arr"/>
            </div>
            <Transition @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave" @after-leave="onAfterLeave">
              <div v-if="openFaq === i" class="cat-faq__a">{{ faq.a }}</div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- JSON-LD FAQ Schema -->
    <Head>
      <Script type="application/ld+json">{{ faqSchema }}</Script>
    </Head>

  </div>
</template>

<script setup lang="ts">
const { heroImg } = useCatalogHeroes()
import { faktury as _faktury, vidy as _vidy, pomeshcheniya, tsveta as _tsveta } from '~/data/catalog'
import { useCatalogPrices } from '~/composables/useCatalogPrices'

const _prices = await useCatalogPrices()

const faktury = computed(() => _faktury.map(f => ({
  ...f,
  price: _prices.value?.[f.catalogKey] ?? f.price,
})))

const vidy = computed(() => _vidy.map(v => {
  const base = _prices.value?.['base'] ?? 159
  const total = (v.catalogKey ? _prices.value?.[v.catalogKey] : undefined) ?? (base + v.extra)
  return { ...v, price: total }
}))

const tsveta = computed(() => _tsveta.map(t => ({
  ...t,
  price: (_prices.value?.['base'] ?? 159) + t.extra,
})))

usePageSeoMeta('catalog')

const activeTab = ref('all')
const openFaq = ref<number | null>(null)

const tabs = [
  { id: 'all',          label: 'Все' },
  { id: 'faktury',      label: 'По фактуре' },
  { id: 'vidy',         label: 'По виду' },
  { id: 'pomeshcheniya',label: 'По помещению' },
  { id: 'tsveta',       label: 'По цвету' },
]


const seoAside = [
  { icon: 'lucide:check-circle', text: 'Монтаж входит в стоимость' },
  { icon: 'lucide:check-circle', text: 'Бесплатный замер на дому' },
  { icon: 'lucide:check-circle', text: 'Гарантия 12 лет по договору' },
  { icon: 'lucide:check-circle', text: 'Оплата после монтажа' },
  { icon: 'lucide:check-circle', text: 'Работаем без посредников' },
  { icon: 'lucide:check-circle', text: 'Европейские полотна' },
]

const faqs = [
  { q: 'Сколько стоит натяжной потолок в Иркутске?', a: 'Стоимость натяжного потолка зависит от выбранной фактуры, площади и дополнительных работ. Минимальная цена — от 159 ₽/м² за матовое белое полотно. Монтаж включён в стоимость. Точная цена определяется после бесплатного замера специалиста.' },
  { q: 'Чем отличаются матовые и глянцевые натяжные потолки?', a: 'Матовые потолки рассеивают свет равномерно, скрывают неровности и подходят для любых помещений. Глянцевые создают зеркальный эффект, визуально увеличивают высоту и подчёркивают освещение. Глянец сложнее в уходе, но смотрится эффектнее в представительских интерьерах.' },
  { q: 'Как долго устанавливается натяжной потолок?', a: 'Монтаж натяжного потолка в стандартной комнате занимает 2–4 часа. Всю квартиру (3–4 комнаты) мы делаем за 1 рабочий день. Специального ухода после установки не требуется — можно пользоваться помещением сразу.' },
  { q: 'Нужно ли освобождать комнату перед монтажом?', a: 'Мебель не нужно выносить полностью. Достаточно отодвинуть её от стен на 30–40 см и убрать хрупкие предметы. Наши мастера работают аккуратно — укрывают мебель и убирают за собой после монтажа.' },
  { q: 'Какую гарантию вы даёте на натяжные потолки?', a: 'Мы даём письменную гарантию 12 лет на полотно и монтажные работы. Гарантия фиксируется в договоре. Европейские полотна, которые мы используем, рассчитаны на срок службы 25–30 лет.' },
  { q: 'Можно ли установить натяжной потолок в ванной и кухне?', a: 'Да. Натяжные потолки отлично подходят для влажных помещений. ПВХ-полотно водонепроницаемо — в случае протечки от соседей потолок удержит до 100 литров воды на 1 м². После слива воды полотно возвращает форму без замены.' },
  { q: 'Вредны ли натяжные потолки для здоровья?', a: 'Качественные натяжные потолки безопасны. Мы используем сертифицированные полотна европейского производства с гигиеническим заключением. Тканевые потолки не содержат ПВХ и рекомендуются для детских комнат и спален. Запах при монтаже полностью исчезает через 2–4 часа.' },
  { q: 'Как выбрать натяжной потолок для своего интерьера?', a: 'Ориентируйтесь на стиль помещения: для классики — матовое или сатиновое белое полотно, для современного интерьера — глянец или парящая ниша. Наш мастер-замерщик привезёт образцы и поможет подобрать оптимальный вариант прямо у вас дома — бесплатно.' },
]

const faqSchema = computed(() => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}))

/* Accordion helpers */
function onEnter(el: Element) {
  const e = el as HTMLElement
  e.style.overflow = 'hidden'
  e.style.height = '0'
  requestAnimationFrame(() => requestAnimationFrame(() => {
    e.style.transition = 'height .3s ease'
    e.style.height = e.scrollHeight + 'px'
  }))
}
function onAfterEnter(el: Element) {
  const e = el as HTMLElement; e.style.height = e.style.overflow = e.style.transition = ''
}
function onLeave(el: Element) {
  const e = el as HTMLElement
  e.style.overflow = 'hidden'
  e.style.height = e.scrollHeight + 'px'
  e.getBoundingClientRect()
  e.style.transition = 'height .25s ease'
  e.style.height = '0'
}
function onAfterLeave(el: Element) {
  const e = el as HTMLElement; e.style.height = e.style.overflow = e.style.transition = ''
}
</script>

<style scoped>
/* ═══ Hero ═══ */
.cat-hero {
  background: #141414;
  padding: 48px 0 52px;
}
.cat-hero__inner { max-width: 860px; }

.breadcrumb { margin-bottom: 20px; }

.cat-hero__title {
  font-size: 40px; font-weight: 900;
  color: #fff; line-height: 1.15;
  margin-bottom: 14px;
}
.cat-hero__desc {
  font-size: 16px; color: rgba(255,255,255,.45);
  max-width: 620px; line-height: 1.65;
  margin-bottom: 28px;
}
.cat-hero__chips { display: flex; flex-wrap: wrap; gap: 8px; }
.cat-hero__chip {
  padding: 8px 18px;
  border: 1.5px solid rgba(255,255,255,.15);
  border-radius: 24px;
  font-size: 14px; font-weight: 600;
  color: rgba(255,255,255,.5);
  cursor: pointer;
  transition: border-color .15s, color .15s, background .15s;
  text-decoration: none;
}
.cat-hero__chip:hover { border-color: rgba(255,255,255,.35); color: #fff; }
.cat-hero__chip.active { border-color: var(--accent); color: var(--accent); background: rgba(245,200,0,.08); }

/* ═══ Body ═══ */
.cat-body { background: #f7f7f7; padding: 56px 0 64px; }

.cat-group { margin-bottom: 56px; }
.cat-group:last-of-type { margin-bottom: 40px; }
.cat-group__head { margin-bottom: 22px; }
.cat-group__title { font-size: 26px; font-weight: 800; color: var(--dark); margin-bottom: 6px; }
.cat-group__desc  { font-size: 15px; color: var(--gray); }

/* Cards */
.cat-grid { display: grid; gap: 14px; }
.cat-grid--4 { grid-template-columns: repeat(4, 1fr); }

.cat-card {
  position: relative;
  display: block;
  border-radius: 14px; overflow: hidden;
  height: 200px;
  border: 2px solid transparent;
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s;
  text-decoration: none;
}
.cat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 28px rgba(0,0,0,.15);
  border-color: var(--accent);
}
.cat-card__img {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  transition: transform .4s ease;
}
.cat-card:hover .cat-card__img { transform: scale(1.06); }
.cat-card__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,.05) 0%, rgba(0,0,0,.68) 100%);
  transition: background .2s;
}
.cat-card:hover .cat-card__overlay { background: linear-gradient(180deg, rgba(0,0,0,.1) 0%, rgba(0,0,0,.78) 100%); }
.cat-card__body { position: absolute; bottom: 0; left: 0; right: 0; padding: 14px 16px; }
.cat-card__badge {
  display: inline-block;
  background: var(--accent); color: var(--dark);
  font-size: 10px; font-weight: 800;
  padding: 2px 8px; border-radius: 5px;
  text-transform: uppercase; letter-spacing: .4px;
  margin-bottom: 5px;
}
.cat-card__title { font-size: 16px; font-weight: 700; color: #fff; line-height: 1.25; margin-bottom: 3px; }
.cat-card__price { font-size: 13px; color: rgba(255,255,255,.65); }
.cat-card:hover .cat-card__price { color: var(--accent); }
.cat-card__arrow {
  position: absolute; top: 12px; right: 12px;
  width: 30px; height: 30px;
  background: rgba(255,255,255,.12); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  opacity: 0; transform: translateX(-6px);
  transition: opacity .2s, transform .2s, background .2s;
}
.cat-card:hover .cat-card__arrow { opacity: 1; transform: translateX(0); background: var(--accent); color: var(--dark); }

/* CTA */
.cat-cta {
  background: #fff;
  border-radius: 20px;
  padding: 32px 36px;
  display: flex; align-items: center; justify-content: space-between; gap: 32px;
  box-shadow: 0 2px 16px rgba(0,0,0,.07);
  flex-wrap: wrap;
}
.cat-cta__title { font-size: 22px; font-weight: 800; color: var(--dark); margin-bottom: 6px; }
.cat-cta__desc  { font-size: 14px; color: var(--gray); max-width: 480px; }
.cat-cta__btn   { display: inline-flex; align-items: center; gap: 8px; padding: 14px 30px; font-size: 15px; white-space: nowrap; }

/* ═══ SEO Text ═══ */
.cat-seo { background: #fff; padding: 64px 0; }
.cat-seo__inner { display: grid; grid-template-columns: 1fr 300px; gap: 48px; align-items: start; }

.cat-seo__content h2 { font-size: 26px; font-weight: 800; color: var(--dark); margin-bottom: 16px; line-height: 1.3; }
.cat-seo__content h3 { font-size: 18px; font-weight: 700; color: var(--dark); margin: 24px 0 10px; }
.cat-seo__content p  { font-size: 15px; color: #555; line-height: 1.75; margin-bottom: 12px; }
.cat-seo__content strong { color: var(--dark); }

.cat-seo__aside { position: sticky; top: 100px; }
.cat-seo__aside-card {
  background: #f7f7f7;
  border-radius: 16px; padding: 24px;
  border: 1.5px solid #ececec;
}
.cat-seo__aside-title { font-size: 17px; font-weight: 800; color: var(--dark); margin-bottom: 18px; }
.cat-seo__aside-list  { display: flex; flex-direction: column; gap: 10px; margin-bottom: 22px; }
.cat-seo__aside-list li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #444; }
.cat-seo__aside-icon { color: var(--accent); flex-shrink: 0; }
.cat-seo__aside-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px; font-size: 14px; }

/* ═══ FAQ ═══ */
.cat-faq { background: #f7f7f7; padding: 64px 0; }
.cat-faq__head { text-align: center; margin-bottom: 40px; }
.cat-pretitle {
  display: inline-block;
  background: var(--accent); color: var(--dark);
  font-size: 12px; font-weight: 700;
  padding: 3px 14px; border-radius: 20px;
  margin-bottom: 12px;
  text-transform: uppercase; letter-spacing: .5px;
}
.cat-faq__title { font-size: 30px; font-weight: 800; color: var(--dark); line-height: 1.2; }
.cat-faq__list { max-width: 820px; margin: 0 auto; display: flex; flex-direction: column; gap: 8px; }
.cat-faq__item {
  background: #fff; border-radius: 14px;
  border: 1.5px solid transparent; overflow: hidden; cursor: pointer;
  transition: border-color .15s;
}
.cat-faq__item.open { border-color: var(--accent); }
.cat-faq__q {
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
  padding: 18px 22px;
  font-size: 16px; font-weight: 700; color: var(--dark);
  user-select: none;
}
.cat-faq__arr { color: var(--gray); flex-shrink: 0; }
.cat-faq__item.open .cat-faq__arr { color: var(--accent); }
.cat-faq__a { padding: 0 22px 18px; font-size: 14px; color: var(--gray); line-height: 1.75; }

/* ═══ Responsive ═══ */
@media (max-width: 1100px) {
  .cat-grid--4 { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .cat-hero__title { font-size: 28px; }
  .cat-grid--4 { grid-template-columns: repeat(2, 1fr); }
  .cat-seo__inner { grid-template-columns: 1fr; }
  .cat-seo__aside { position: static; }
  .cat-cta { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 480px) {
  .cat-grid--4 { grid-template-columns: repeat(2, 1fr); }
  .cat-card { height: 150px; }
  .cat-faq__q { font-size: 14px; }
}
</style>
