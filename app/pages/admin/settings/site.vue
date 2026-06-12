<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { data: siteData, refresh } = await useAsyncData('admin-site', () => $fetch('/api/cms/site'))

const form = ref(JSON.parse(JSON.stringify(siteData.value ?? {})))
watch(siteData, v => { if (v) form.value = JSON.parse(JSON.stringify(v)) })

const saved = ref(false)
const saving = ref(false)
async function save() {
  saving.value = true
  try {
    await $fetch('/api/admin/site', { method: 'POST', body: form.value })
    await refresh()
    saved.value = true
    setTimeout(() => saved.value = false, 2500)
  } finally {
    saving.value = false
  }
}

const sections = [
  { key: 'company', label: 'Компания', icon: 'lucide:building-2', fields: [
    { k: 'name',     l: 'Название',         type: 'text' },
    { k: 'nameFull', l: 'Полное название',   type: 'text' },
    { k: 'slogan',   l: 'Слоган',           type: 'text' },
    { k: 'city',     l: 'Город',            type: 'text' },
    { k: 'cityIn',   l: 'В городе (предлог)',type: 'text' },
    { k: 'founded',  l: 'Год основания',    type: 'text' },
  ]},
  { key: 'contacts', label: 'Контакты', icon: 'lucide:phone', fields: [
    { k: 'phone',    l: 'Телефон (отображение)',  type: 'tel' },
    { k: 'phoneRaw', l: 'Телефон (tel:)',          type: 'text' },
    { k: 'email',    l: 'Email',                   type: 'email' },
    { k: 'telegram', l: 'Telegram (ссылка)',        type: 'text' },
    { k: 'vk',       l: 'ВКонтакте (ссылка)',      type: 'text' },
  ]},
  { key: 'address', label: 'Адрес', icon: 'lucide:map-pin', fields: [
    { k: 'address',     l: 'Адрес',          type: 'text' },
    { k: 'addressFull', l: 'Полный адрес',   type: 'text' },
    { k: 'schedule',    l: 'Режим работы',   type: 'text' },
  ]},
  { key: 'seo', label: 'SEO', icon: 'lucide:globe', fields: [
    { k: 'siteUrl',    l: 'URL сайта',   type: 'text' },
    { k: 'siteDomain', l: 'Домен',       type: 'text' },
    { k: 'ogImage',    l: 'OG Image',    type: 'text' },
  ]},
  { key: 'requisites', label: 'Реквизиты', icon: 'lucide:file-text', fields: [
    { k: 'inn',      l: 'ИНН',  type: 'text' },
    { k: 'ogrn',     l: 'ОГРН', type: 'text' },
    { k: 'director', l: 'Директор', type: 'text' },
    { k: 'bank',     l: 'Банк',     type: 'text' },
    { k: 'bankBik',  l: 'БИК',      type: 'text' },
    { k: 'bankAccount', l: 'Р/С',   type: 'text' },
  ]},
]
</script>

<template>
  <div class="adm-seo-page">
    <div class="adm-seo-header">
      <div>
        <h1 class="adm-page-title">Информация о сайте</h1>
        <p class="adm-page-sub">Глобальные настройки — сохраняются в хранилище сервера</p>
      </div>
      <button class="adm-btn adm-btn--primary" :disabled="saving" @click="save">
        <Icon :name="saved ? 'lucide:check' : saving ? 'lucide:loader' : 'lucide:save'" style="width:15px;height:15px" :class="saving && 'adm-spin'" />
        {{ saved ? 'Сохранено!' : saving ? 'Сохранение…' : 'Сохранить' }}
      </button>
    </div>

    <div style="display:flex;flex-direction:column;gap:16px">
      <div v-for="sec in sections" :key="sec.key" class="adm-card adm-card--pad">
        <h3 style="font-size:15px;font-weight:700;margin:0 0 16px;color:#374151;display:flex;align-items:center;gap:8px">
          <Icon :name="sec.icon" style="width:16px;height:16px;color:#9ca3af" />{{ sec.label }}
        </h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div v-for="f in sec.fields" :key="f.k">
            <label class="adm-label">{{ f.l }}</label>
            <input v-model="(form as any)[f.k]" :type="f.type" class="adm-input" />
          </div>
        </div>
      </div>

      <!-- Stats block -->
      <div class="adm-card adm-card--pad">
        <h3 style="font-size:15px;font-weight:700;margin:0 0 16px;color:#374151;display:flex;align-items:center;gap:8px">
          <Icon name="lucide:bar-chart-2" style="width:16px;height:16px;color:#9ca3af" />Ключевые цифры
        </h3>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
          <div v-for="k in ['projects','guarantee','experience','masters','rating']" :key="k">
            <label class="adm-label">{{ { projects:'Проектов', guarantee:'Гарантия', experience:'Опыт', masters:'Мастеров', rating:'Рейтинг' }[k] }}</label>
            <input v-model="(form as any).stats[k]" class="adm-input" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes adm-spin { to { transform: rotate(360deg); } }
.adm-spin { animation: adm-spin .8s linear infinite; }
</style>
