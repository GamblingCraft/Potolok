<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const yandexMetrika = ref('')
const googleGA4     = ref('')
const custom        = ref('')
const saved = ref(false)
function save() { saved.value = true; setTimeout(() => saved.value = false, 2500) }
</script>

<template>
  <div class="adm-seo-page">
    <div class="adm-seo-header">
      <div>
        <h1 class="adm-page-title">Счётчики аналитики</h1>
        <p class="adm-page-sub">Скрипты вставляются в &lt;head&gt; на всех страницах</p>
      </div>
      <button class="adm-btn adm-btn--primary" @click="save">
        <Icon :name="saved ? 'lucide:check' : 'lucide:save'" style="width:15px;height:15px" />
        {{ saved ? 'Сохранено!' : 'Сохранить' }}
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
        <p style="font-size:12px;color:#9ca3af;margin-top:6px">Только цифры — ID счётчика из настроек метрики</p>
      </div>
      <div class="adm-card adm-card--pad">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <Icon name="lucide:bar-chart-2" style="width:20px;height:20px;color:#4285f4" />
          <span style="font-weight:700;font-size:15px">Google Analytics 4</span>
        </div>
        <label class="adm-label">Measurement ID</label>
        <input v-model="googleGA4" class="adm-input" placeholder="G-XXXXXXXXXX" style="max-width:280px;font-family:monospace" />
      </div>
      <div class="adm-card adm-card--pad">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <Icon name="lucide:code" style="width:18px;height:18px;color:#6b7280" />
          <span style="font-weight:700;font-size:15px">Произвольный скрипт</span>
        </div>
        <label class="adm-label">HTML/JS код — вставляется в &lt;head&gt;</label>
        <textarea v-model="custom" class="adm-textarea adm-textarea--code" rows="6" placeholder="<script>...</script>" spellcheck="false" />
      </div>
    </div>
  </div>
</template>
