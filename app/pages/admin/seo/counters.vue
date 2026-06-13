<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { data } = await useFetch<{ yandexMetrika: string; googleGA4: string; custom: string }>('/api/cms/counters')
const yandexMetrika = ref(data.value?.yandexMetrika ?? '')
const googleGA4     = ref(data.value?.googleGA4 ?? '')
const custom        = ref(data.value?.custom ?? '')

const saved = ref(false)
const saving = ref(false)
async function save() {
  saving.value = true
  await $fetch('/api/cms/counters', { method: 'POST', body: { yandexMetrika: yandexMetrika.value, googleGA4: googleGA4.value, custom: custom.value } })
  saving.value = false
  saved.value = true
  setTimeout(() => saved.value = false, 2500)
}
</script>

<template>
  <div class="adm-seo-page">
    <div class="adm-seo-header">
      <div>
        <h1 class="adm-page-title">Счётчики аналитики</h1>
        <p class="adm-page-sub">Скрипты вставляются в &lt;head&gt; на всех страницах автоматически</p>
      </div>
      <button class="adm-btn adm-btn--primary" :disabled="saving" @click="save">
        <Icon :name="saved ? 'lucide:check' : saving ? 'lucide:loader' : 'lucide:save'" style="width:15px;height:15px" :class="saving && 'spin'" />
        {{ saved ? 'Сохранено!' : saving ? 'Сохранение...' : 'Сохранить' }}
      </button>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="adm-card adm-card--pad">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <div style="width:28px;height:28px;background:#ffcc00;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:900;color:#cc0000">Я</div>
          <span style="font-weight:700;font-size:15px">Яндекс.Метрика</span>
        </div>
        <label class="adm-label">Номер счётчика</label>
        <input v-model="yandexMetrika" class="adm-input" placeholder="12345678" style="max-width:280px" />
        <p style="font-size:12px;color:#9ca3af;margin-top:6px">Только цифры — ID счётчика из настроек Метрики</p>
        <div v-if="yandexMetrika" style="margin-top:10px;padding:8px 12px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;font-size:12px;color:#166534">
          <Icon name="lucide:check-circle" style="width:13px;height:13px;vertical-align:middle;margin-right:4px" />Счётчик ym({{ yandexMetrika }}) будет инициализирован на всех страницах
        </div>
      </div>
      <div class="adm-card adm-card--pad">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <Icon name="lucide:bar-chart-2" style="width:20px;height:20px;color:#4285f4" />
          <span style="font-weight:700;font-size:15px">Google Analytics 4</span>
        </div>
        <label class="adm-label">Measurement ID</label>
        <input v-model="googleGA4" class="adm-input" placeholder="G-XXXXXXXXXX" style="max-width:280px;font-family:monospace" />
        <div v-if="googleGA4" style="margin-top:10px;padding:8px 12px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;font-size:12px;color:#166534">
          <Icon name="lucide:check-circle" style="width:13px;height:13px;vertical-align:middle;margin-right:4px" />gtag('config', '{{ googleGA4 }}') будет добавлен на всех страницах
        </div>
      </div>
      <div class="adm-card adm-card--pad">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <Icon name="lucide:code" style="width:18px;height:18px;color:#6b7280" />
          <span style="font-weight:700;font-size:15px">Произвольный скрипт</span>
        </div>
        <label class="adm-label">HTML/JS код — вставляется в &lt;head&gt;</label>
        <textarea v-model="custom" class="adm-textarea adm-textarea--code" rows="6" placeholder="<script>...</script>" spellcheck="false" />
        <p style="font-size:12px;color:#9ca3af;margin-top:6px">Теги &lt;script&gt; можно не указывать — код вставится автоматически</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.adm-seo-page { display: flex; flex-direction: column; gap: 20px; }
.adm-seo-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.adm-textarea--code { font-family: 'Fira Code', 'Consolas', monospace; font-size: 13.5px; line-height: 1.7; background: #fafafa; }
.spin { animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
