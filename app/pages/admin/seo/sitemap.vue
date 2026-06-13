<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { data: xml, refresh, pending } = await useFetch<string>('/sitemap.xml')

const urls = computed(() => {
  if (!xml.value) return []
  const matches = xml.value.match(/<loc>(.*?)<\/loc>/g) ?? []
  return matches.map(m => m.replace(/<\/?loc>/g, ''))
})

const lastmod = computed(() => {
  if (!xml.value) return '—'
  const m = xml.value.match(/<lastmod>(.*?)<\/lastmod>/)
  return m ? m[1] : '—'
})

const copied = ref(false)
async function copyXml() {
  if (!xml.value) return
  await navigator.clipboard.writeText(xml.value)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

const sections = [
  { label: 'Главная и основные страницы', match: 'пропотолок.рф/' },
  { label: 'Каталог — Фактуры',           match: '/catalog/faktury/' },
  { label: 'Каталог — Виды',              match: '/catalog/vidy/' },
  { label: 'Каталог — По помещению',      match: '/catalog/po-pomescheniyu/' },
  { label: 'Каталог — Цвета',             match: '/catalog/tsveta/' },
  { label: 'Каталог — Бренды',            match: '/catalog/brendy/' },
  { label: 'Услуги',                       match: '/uslugi/' },
  { label: 'Гео-страницы',                match: '/irkutsk' },
]
</script>

<template>
  <div class="adm-seo-page">
    <div class="adm-seo-header">
      <div>
        <h1 class="adm-page-title">Sitemap.xml</h1>
        <p class="adm-page-sub">Карта сайта для поисковых систем — {{ urls.length }} URL</p>
      </div>
      <div style="display:flex;gap:10px">
        <button class="adm-btn adm-btn--ghost" style="font-size:13px" @click="copyXml">
          <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" style="width:14px;height:14px" />
          {{ copied ? 'Скопировано!' : 'Скопировать XML' }}
        </button>
        <a href="/sitemap.xml" target="_blank" class="adm-btn adm-btn--ghost" style="font-size:13px">
          <Icon name="lucide:external-link" style="width:14px;height:14px" />Открыть
        </a>
        <button class="adm-btn adm-btn--primary" :disabled="pending" @click="refresh()">
          <Icon :name="pending ? 'lucide:loader' : 'lucide:refresh-cw'" style="width:15px;height:15px" :class="pending && 'spin'" />
          {{ pending ? 'Загрузка...' : 'Обновить' }}
        </button>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
      <!-- Статистика -->
      <div class="adm-card adm-card--pad">
        <h3 style="font-size:15px;font-weight:700;margin:0 0 16px">Информация</h3>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div class="sm-stat">
            <span class="sm-stat__label">Всего URL</span>
            <span class="sm-stat__val">{{ urls.length }}</span>
          </div>
          <div class="sm-stat">
            <span class="sm-stat__label">Дата последнего изменения</span>
            <span class="sm-stat__val">{{ lastmod }}</span>
          </div>
          <div class="sm-stat">
            <span class="sm-stat__label">Формат</span>
            <span class="sm-stat__val">XML Sitemap 0.9</span>
          </div>
          <div class="sm-stat">
            <span class="sm-stat__label">Кэш</span>
            <span class="sm-stat__val">1 час (Cache-Control)</span>
          </div>
          <div style="margin-top:4px;padding:12px;background:#f0fdf4;border-radius:9px;border:1px solid #bbf7d0;display:flex;gap:10px;align-items:center">
            <Icon name="lucide:check-circle" style="width:15px;height:15px;color:#16a34a;flex-shrink:0" />
            <span style="font-size:13px;color:#166534">Sitemap доступен по адресу <strong>/sitemap.xml</strong></span>
          </div>
        </div>
      </div>

      <!-- Разбивка по разделам -->
      <div class="adm-card adm-card--pad">
        <h3 style="font-size:15px;font-weight:700;margin:0 0 16px">Разделы</h3>
        <div style="display:flex;flex-direction:column;gap:6px">
          <div v-for="sec in sections" :key="sec.label" class="sm-section">
            <span class="sm-section__label">{{ sec.label }}</span>
            <span class="sm-section__count">{{ urls.filter(u => u.includes(sec.match)).length }} URL</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview URL-list -->
    <div class="adm-card adm-card--pad">
      <h3 style="font-size:15px;font-weight:700;margin:0 0 14px">Все URL в sitemap</h3>
      <div class="sm-url-list">
        <div v-for="(u, i) in urls" :key="u" class="sm-url-item">
          <span class="sm-url-num">{{ i + 1 }}</span>
          <a :href="u" target="_blank" class="sm-url-link">{{ u }}</a>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.sm-stat { display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; background: #f8f9fb; border-radius: 7px; }
.sm-stat__label { font-size: 13px; color: #6b7280; }
.sm-stat__val   { font-size: 13px; font-weight: 700; color: #111827; }

.sm-section { display: flex; align-items: center; justify-content: space-between; padding: 7px 10px; background: #f8f9fb; border-radius: 7px; }
.sm-section__label { font-size: 13px; color: #374151; }
.sm-section__count { font-size: 12px; font-weight: 700; background: #e5e7eb; color: #374151; padding: 2px 8px; border-radius: 20px; }

.sm-url-list { display: flex; flex-direction: column; gap: 2px; max-height: 440px; overflow-y: auto; }
.sm-url-item { display: flex; align-items: center; gap: 10px; padding: 6px 8px; border-radius: 6px; transition: background .1s; }
.sm-url-item:hover { background: #f3f4f6; }
.sm-url-num  { font-size: 11px; color: #9ca3af; width: 28px; text-align: right; flex-shrink: 0; }
.sm-url-link { font-size: 12.5px; color: #374151; text-decoration: none; font-family: monospace; }
.sm-url-link:hover { color: #f5c800; text-decoration: underline; }

.spin { animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.adm-toggle { width: 42px; height: 24px; background: #d1d5db; border-radius: 12px; padding: 3px; cursor: pointer; border: none; transition: background .2s; flex-shrink: 0; position: relative; }
.adm-toggle--on { background: #f5c800; }
.adm-toggle__dot { display: block; width: 18px; height: 18px; background: #fff; border-radius: 50%; transition: transform .2s; box-shadow: 0 1px 3px rgba(0,0,0,.2); }
.adm-toggle--on .adm-toggle__dot { transform: translateX(18px); }
</style>
