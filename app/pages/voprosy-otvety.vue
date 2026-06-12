<template>
  <div>

    <section class="fq-hero">
      <div class="container fq-hero__inner">
        <div>
          <div class="fq-pretitle">Помогаем разобраться</div>
          <h1 class="fq-hero__title">Вопросы и ответы</h1>
          <p class="fq-hero__desc">Собрали ответы на самые частые вопросы о натяжных потолках, монтаже, ценах и гарантии</p>
        </div>
        <!-- Поиск -->
        <div class="fq-search-wrap">
          <Icon name="lucide:search" size="18" class="fq-search-icon"/>
          <input v-model="search" class="fq-search" type="text" placeholder="Поиск по вопросам..."/>
          <button v-if="search" class="fq-search-clear" @click="search = ''">
            <Icon name="lucide:x" size="16"/>
          </button>
        </div>
      </div>
    </section>

    <!-- Результаты поиска -->
    <section v-if="search.trim()" class="fq-section fq-section--white">
      <div class="container">
        <div class="fq-head">
          <h2 class="fq-title">Результаты поиска: «{{ search }}»</h2>
          <div class="fq-count">Найдено: {{ searchResults.length }}</div>
        </div>
        <div v-if="searchResults.length" class="fq-list">
          <div class="fq-item" v-for="q in searchResults" :key="q.q + q.cat" :class="{ open: openItems.has(q.q) }" @click="toggle(q.q)">
            <div class="fq-item__q">{{ q.q }}<Icon :name="openItems.has(q.q) ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="18" class="fq-arrow"/></div>
            <div class="fq-item__a">{{ q.a }}</div>
          </div>
        </div>
        <div v-else class="fq-empty">
          <Icon name="lucide:search-x" size="32" class="fq-empty__icon"/>
          <div class="fq-empty__text">По запросу «{{ search }}» ничего не найдено. Попробуйте другие слова или <button class="fq-empty__reset" @click="search = ''">сбросьте поиск</button></div>
        </div>
      </div>
    </section>

    <!-- Блоки по категориям -->
    <template v-else>
      <section
        v-for="(cat, idx) in categories" :key="cat.id"
        class="fq-section"
        :class="idx % 2 === 0 ? 'fq-section--white' : 'fq-section--gray'"
      >
        <div class="container">
          <div class="fq-cat-head">
            <div class="fq-cat-icon"><Icon :name="cat.icon" size="22"/></div>
            <div>
              <div class="fq-pretitle fq-pretitle--dark">{{ cat.label }}</div>
              <h2 class="fq-title">{{ cat.title }}</h2>
            </div>
          </div>
          <div class="fq-list">
            <div
              class="fq-item"
              v-for="q in cat.items" :key="q.q"
              :class="{ open: openItems.has(q.q) }"
              @click="toggle(q.q)"
              itemscope itemtype="https://schema.org/Question"
            >
              <div class="fq-item__q" itemprop="name">
                {{ q.q }}
                <Icon :name="openItems.has(q.q) ? 'lucide:chevron-up' : 'lucide:chevron-down'" size="18" class="fq-arrow"/>
              </div>
              <div class="fq-item__a" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
                <div itemprop="text">{{ q.a }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- CTA -->
    <section class="fq-cta">
      <div class="container fq-cta__inner">
        <div>
          <h2 class="fq-cta__title">Не нашли ответ на свой вопрос?</h2>
          <p class="fq-cta__desc">Позвоните или напишите нам — ответим на любой вопрос и бесплатно приедем на замер</p>
        </div>
        <div class="fq-cta__btns">
          <a :href="'tel:' + site.phoneRaw" class="nav-btn fq-btn"><Icon name="lucide:phone-call" size="16"/>Позвонить</a>
          <a :href="site.emailHref" class="fq-btn-outline"><Icon name="lucide:mail" size="16"/>Написать</a>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { site } from '~/data/site'
import { faqCategories } from '~/data/faq'

useHead({
  title: 'Вопросы и ответы о натяжных потолках — ПроПотолок Иркутск',
  meta: [{ name: 'description', content: 'Ответы на частые вопросы о натяжных потолках: цены, монтаж, уход, гарантия, сравнение материалов. Иркутск.' }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage' }) }],
})

const search    = ref('')
const openItems = reactive(new Set<string>())
const categories = faqCategories

function toggle(q: string) {
  openItems.has(q) ? openItems.delete(q) : openItems.add(q)
}

const searchResults = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return []
  return categories.flatMap(cat =>
    cat.items
      .filter(item => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q))
      .map(item => ({ ...item, cat: cat.id }))
  )
})
</script>

<style scoped>
.fq-pretitle { display: inline-block; background: var(--accent); color: #141414; font-size: 12px; font-weight: 700; padding: 3px 14px; border-radius: 20px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: .5px; }
.fq-pretitle--dark { color: var(--dark); }
.fq-head { margin-bottom: 28px; }
.fq-title { font-size: 28px; font-weight: 800; color: var(--dark); line-height: 1.2; }
.fq-count { font-size: 14px; color: var(--gray); margin-top: 6px; }
.fq-section { padding: 56px 0; }
.fq-section--white { background: #fff; }
.fq-section--gray  { background: #f7f7f7; }

.fq-hero { background: #141414; padding: 48px 0; }
.fq-hero__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.fq-hero__title { font-size: 36px; font-weight: 900; color: #fff; margin-bottom: 10px; }
.fq-hero__desc  { font-size: 15px; color: rgba(255,255,255,.4); max-width: 440px; line-height: 1.6; }
.fq-search-wrap { position: relative; flex-shrink: 0; }
.fq-search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,.3); pointer-events: none; }
.fq-search { width: 340px; padding: 14px 44px 14px 46px; background: rgba(255,255,255,.08); border: 1.5px solid rgba(255,255,255,.15); border-radius: 50px; font-size: 15px; font-family: var(--font); color: #fff; outline: none; transition: border-color .15s; }
.fq-search::placeholder { color: rgba(255,255,255,.3); }
.fq-search:focus { border-color: var(--accent); }
.fq-search-clear { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: rgba(255,255,255,.4); display: flex; transition: color .15s; }
.fq-search-clear:hover { color: #fff; }

.fq-cat-head { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 28px; }
.fq-cat-icon { width: 52px; height: 52px; background: var(--accent); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--dark); flex-shrink: 0; }

.fq-list { display: flex; flex-direction: column; gap: 10px; max-width: 900px; }
.fq-item { background: #fff; border-radius: 12px; border: 1.5px solid #eee; overflow: hidden; cursor: pointer; transition: border-color .15s; }
.fq-section--gray .fq-item { background: #fff; }
.fq-section--white .fq-item { background: #f7f7f7; border-color: #ebebeb; }
.fq-item.open { border-color: var(--accent); }
.fq-item__q { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 20px; font-size: 15px; font-weight: 700; color: var(--dark); user-select: none; line-height: 1.3; }
.fq-arrow { flex-shrink: 0; color: var(--gray); }
.fq-item.open .fq-arrow { color: var(--accent); }
.fq-item__a { max-height: 0; overflow: hidden; transition: max-height .35s ease, padding .3s; font-size: 14px; color: #555; line-height: 1.7; padding: 0 20px; }
.fq-item.open .fq-item__a { max-height: 300px; padding: 0 20px 16px; }

.fq-empty { text-align: center; padding: 48px 20px; }
.fq-empty__icon { color: var(--gray); margin: 0 auto 14px; display: block; }
.fq-empty__text { font-size: 15px; color: var(--gray); }
.fq-empty__reset { background: none; border: none; cursor: pointer; color: var(--accent); font-size: 15px; font-family: var(--font); text-decoration: underline; }

.fq-cta { background: #141414; padding: 52px 0; }
.fq-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
.fq-cta__title { font-size: 26px; font-weight: 900; color: #fff; margin-bottom: 8px; }
.fq-cta__desc  { font-size: 15px; color: rgba(255,255,255,.4); }
.fq-cta__btns  { display: flex; gap: 12px; flex-wrap: wrap; }
.fq-btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; font-size: 14px; }
.fq-btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; font-size: 14px; font-weight: 700; font-family: var(--font); background: none; border: 2px solid rgba(255,255,255,.2); border-radius: 50px; color: #fff; cursor: pointer; text-decoration: none; transition: border-color .15s, color .15s; }
.fq-btn-outline:hover { border-color: var(--accent); color: var(--accent); }

@media (max-width: 860px) { .fq-hero__inner { flex-direction: column; align-items: flex-start; } .fq-search { width: 100%; } .fq-search-wrap { width: 100%; } }
@media (max-width: 640px) { .fq-hero__title { font-size: 28px; } .fq-cta__inner { flex-direction: column; align-items: flex-start; } }
</style>
