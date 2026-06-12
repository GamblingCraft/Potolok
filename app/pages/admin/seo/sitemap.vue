<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const baseUrl    = ref('https://propot.ru')
const autoUpdate = ref(true)
const lastGen    = ref('12.06.2026 10:30')
const saved      = ref(false)
function save() { saved.value = true; setTimeout(() => saved.value = false, 2500) }
function regenerate() { lastGen.value = new Date().toLocaleString('ru', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' }) }
</script>

<template>
  <div class="adm-seo-page">
    <div class="adm-seo-header">
      <div>
        <h1 class="adm-page-title">Sitemap.xml</h1>
        <p class="adm-page-sub">Карта сайта для поисковых систем</p>
      </div>
      <div style="display:flex;gap:10px">
        <a href="/sitemap.xml" target="_blank" class="adm-btn adm-btn--ghost" style="font-size:13px">
          <Icon name="lucide:external-link" style="width:14px;height:14px" />Открыть
        </a>
        <button class="adm-btn adm-btn--primary" @click="save">
          <Icon :name="saved ? 'lucide:check' : 'lucide:save'" style="width:15px;height:15px" />
          {{ saved ? 'Сохранено!' : 'Сохранить' }}
        </button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div class="adm-card adm-card--pad">
        <h3 style="font-size:15px;font-weight:700;margin:0 0 16px">Настройки</h3>
        <div style="display:flex;flex-direction:column;gap:12px">
          <div>
            <label class="adm-label">Базовый URL сайта</label>
            <input v-model="baseUrl" class="adm-input" placeholder="https://propot.ru" />
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:#f8f9fb;border-radius:9px;border:1px solid #e8eaed">
            <div>
              <div style="font-size:14px;font-weight:600">Автообновление</div>
              <div style="font-size:12px;color:#9ca3af">При изменении страниц</div>
            </div>
            <button @click="autoUpdate = !autoUpdate" :class="['adm-toggle', autoUpdate && 'adm-toggle--on']">
              <span class="adm-toggle__dot" />
            </button>
          </div>
          <div style="display:flex;align-items:center;gap:10px;padding:12px;background:#f0fdf4;border-radius:9px;border:1px solid #bbf7d0">
            <Icon name="lucide:clock" style="width:15px;height:15px;color:#16a34a;flex-shrink:0" />
            <div style="font-size:13px;color:#166534">Последняя генерация: <strong>{{ lastGen }}</strong></div>
          </div>
          <button class="adm-btn adm-btn--ghost" style="width:100%;justify-content:center" @click="regenerate">
            <Icon name="lucide:refresh-cw" style="width:14px;height:14px" />Сгенерировать сейчас
          </button>
        </div>
      </div>
      <div class="adm-card adm-card--pad">
        <h3 style="font-size:15px;font-weight:700;margin:0 0 16px">Разделы в sitemap</h3>
        <div style="display:flex;flex-direction:column;gap:8px">
          <div v-for="sec in ['Главная', 'Каталог (все страницы)', 'Услуги', 'Готовые работы', 'Отзывы', 'FAQ', 'Контакты', 'Акции']" :key="sec"
            style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#f8f9fb;border-radius:7px">
            <span style="font-size:13.5px;color:#374151">{{ sec }}</span>
            <span class="adm-tag adm-tag--green" style="font-size:11px">включён</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.adm-toggle {
  width: 42px; height: 24px;
  background: #d1d5db;
  border-radius: 12px;
  padding: 3px;
  cursor: pointer;
  border: none;
  transition: background .2s;
  flex-shrink: 0;
  position: relative;
}
.adm-toggle--on { background: #f5c800; }
.adm-toggle__dot {
  display: block;
  width: 18px; height: 18px;
  background: #fff;
  border-radius: 50%;
  transition: transform .2s;
  box-shadow: 0 1px 3px rgba(0,0,0,.2);
}
.adm-toggle--on .adm-toggle__dot { transform: translateX(18px); }
</style>
