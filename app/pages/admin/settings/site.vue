<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { data: siteData, refresh } = await useAsyncData('admin-site', () => $fetch('/api/cms/site'))

const form = ref(JSON.parse(JSON.stringify(siteData.value ?? {})))
watch(siteData, v => { if (v) form.value = JSON.parse(JSON.stringify(v)) })

// Авто-генерация phoneRaw из phone при изменении
watch(() => (form.value as any).phone, (val: string) => {
  if (!val) return
  const digits = val.replace(/\D/g, '')
  if (digits.length >= 10) {
    const raw = digits.startsWith('7') || digits.startsWith('8')
      ? '+7' + digits.slice(1)
      : '+7' + digits
    ;(form.value as any).phoneRaw = raw
  }
})

// Убеждаемся что branches — массив
const branches = computed({
  get: () => (form.value as any).branches ?? [
    { city: 'Иркутск', address: 'ул. Ширямова, 4а', note: 'Главный офис', main: true },
  ],
  set: (v) => { (form.value as any).branches = v },
})

// Убеждаемся что hours — массив
const hours = computed({
  get: () => (form.value as any).hours ?? [
    { days: 'Пн—Пт',       time: '9:00—20:00' },
    { days: 'Суббота',      time: '10:00—18:00' },
    { days: 'Воскресенье',  time: 'По заявкам' },
  ],
  set: (v) => { (form.value as any).hours = v },
})

const saved = ref(false)
const saving = ref(false)
async function save() {
  saving.value = true
  try {
    await $fetch('/api/admin/site', { method: 'POST', body: form.value })
    await refresh()
    await refreshNuxtData('cms-site')
    saved.value = true
    setTimeout(() => saved.value = false, 2500)
  } finally {
    saving.value = false
  }
}

const sections = [
  { key: 'company', label: 'Компания', icon: 'lucide:building-2', fields: [
    { k: 'name',     l: 'Название',          type: 'text' },
    { k: 'nameFull', l: 'Полное название',    type: 'text' },
    { k: 'slogan',   l: 'Слоган',            type: 'text' },
    { k: 'city',     l: 'Город',             type: 'text' },
    { k: 'cityIn',   l: 'В городе (предлог)', type: 'text' },
    { k: 'founded',  l: 'Год основания',     type: 'text' },
  ]},
  { key: 'contacts', label: 'Телефоны и почта', icon: 'lucide:phone', fields: [
    { k: 'phone',       l: 'Телефон (отображение)',    type: 'tel' },
    { k: 'phoneRaw',    l: 'Телефон (tel: ссылка)',    type: 'text' },
    { k: 'phoneAlt',    l: 'Доп. телефон (отображ.)', type: 'tel' },
    { k: 'phoneAltRaw', l: 'Доп. телефон (tel:)',      type: 'text' },
    { k: 'email',       l: 'Email основной',           type: 'email' },
    { k: 'emailSales',  l: 'Email для заказов',        type: 'email' },
  ]},
  { key: 'social', label: 'Социальные сети', icon: 'lucide:share-2', fields: [
    { k: 'telegram', l: 'Telegram (ссылка)',       type: 'text' },
    { k: 'vk',       l: 'ВКонтакте (ссылка)',      type: 'text' },
    { k: 'whatsapp', l: 'MAX / WhatsApp (ссылка)', type: 'text' },
  ]},
  { key: 'address', label: 'Адрес и карта', icon: 'lucide:map-pin', fields: [
    { k: 'address',      l: 'Адрес (полный)',        type: 'text' },
    { k: 'addressShort', l: 'Адрес (кратко)',        type: 'text' },
    { k: 'addressFull',  l: 'Адрес для документов', type: 'text' },
    { k: 'mapEmbed',     l: 'Яндекс.Карты embed',   type: 'text' },
    { k: 'mapLat',       l: 'Широта (lat)',          type: 'text' },
    { k: 'mapLng',       l: 'Долгота (lng)',         type: 'text' },
  ]},
  { key: 'seo', label: 'SEO', icon: 'lucide:globe', fields: [
    { k: 'siteUrl',    l: 'URL сайта', type: 'text' },
    { k: 'siteDomain', l: 'Домен',     type: 'text' },
    { k: 'ogImage',    l: 'OG Image',  type: 'text' },
  ]},
  { key: 'requisites', label: 'Реквизиты', icon: 'lucide:file-text', fields: [
    { k: 'inn',         l: 'ИНН',       type: 'text' },
    { k: 'ogrn',        l: 'ОГРН',      type: 'text' },
    { k: 'director',    l: 'Директор',  type: 'text' },
    { k: 'bank',        l: 'Банк',      type: 'text' },
    { k: 'bankBik',     l: 'БИК',       type: 'text' },
    { k: 'bankAccount', l: 'Р/С',       type: 'text' },
  ]},
]
</script>

<template>
  <div class="adm-seo-page">
    <div class="adm-seo-header">
      <div>
        <h1 class="adm-page-title">Информация о сайте</h1>
        <p class="adm-page-sub">Единое место для всех настроек — контакты, соцсети, адрес, реквизиты</p>
      </div>
      <button class="adm-btn adm-btn--primary" :disabled="saving" @click="save">
        <Icon :name="saved ? 'lucide:check' : saving ? 'lucide:loader' : 'lucide:save'" style="width:15px;height:15px" :class="saving && 'adm-spin'" />
        {{ saved ? 'Сохранено!' : saving ? 'Сохранение…' : 'Сохранить' }}
      </button>
    </div>

    <div style="display:flex;flex-direction:column;gap:16px">

      <!-- Стандартные секции через loop -->
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

      <!-- Режим работы (hours — массив) -->
      <div class="adm-card adm-card--pad">
        <h3 style="font-size:15px;font-weight:700;margin:0 0 16px;color:#374151;display:flex;align-items:center;gap:8px">
          <Icon name="lucide:clock" style="width:16px;height:16px;color:#9ca3af" />Режим работы
        </h3>
        <div style="display:flex;flex-direction:column;gap:8px">
          <div
            v-for="(row, i) in hours" :key="i"
            style="display:grid;grid-template-columns:1fr 1fr 32px;gap:8px;align-items:center"
          >
            <div>
              <label class="adm-label">Дни</label>
              <input v-model="hours[i]!.days" class="adm-input" placeholder="Пн—Пт" />
            </div>
            <div>
              <label class="adm-label">Время</label>
              <input v-model="hours[i]!.time" class="adm-input" placeholder="9:00—20:00" />
            </div>
            <button
              style="margin-top:18px;width:32px;height:32px;border:none;background:#fee2e2;border-radius:8px;cursor:pointer;color:#dc2626;display:flex;align-items:center;justify-content:center;flex-shrink:0"
              @click="hours.splice(i, 1)"
            >
              <Icon name="lucide:trash-2" size="14" />
            </button>
          </div>
          <button
            style="margin-top:4px;display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:#6b7280;background:#f9fafb;border:1.5px dashed #d1d5db;border-radius:8px;padding:7px 14px;cursor:pointer;transition:.15s"
            @click="hours.push({ days: '', time: '' })"
          >
            <Icon name="lucide:plus" size="14" />Добавить строку
          </button>
        </div>
      </div>

      <!-- Филиалы -->
      <div class="adm-card adm-card--pad">
        <h3 style="font-size:15px;font-weight:700;margin:0 0 16px;color:#374151;display:flex;align-items:center;gap:8px">
          <Icon name="lucide:map-pin" style="width:16px;height:16px;color:#9ca3af" />Филиалы / офисы
        </h3>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div
            v-for="(row, i) in branches" :key="i"
            style="display:grid;grid-template-columns:120px 1fr 160px 80px 32px;gap:8px;align-items:center"
          >
            <div>
              <label v-if="i===0" class="adm-label">Город</label>
              <input v-model="branches[i]!.city" class="adm-input" placeholder="Иркутск" />
            </div>
            <div>
              <label v-if="i===0" class="adm-label">Адрес</label>
              <input v-model="branches[i]!.address" class="adm-input" placeholder="ул. Примерная, 1" />
            </div>
            <div>
              <label v-if="i===0" class="adm-label">Примечание</label>
              <input v-model="branches[i]!.note" class="adm-input" placeholder="Главный офис" />
            </div>
            <div style="display:flex;align-items:center;gap:6px" :style="i===0?'margin-top:18px':''">
              <input type="checkbox" :id="`branch-main-${i}`" v-model="branches[i]!.main" style="width:16px;height:16px;cursor:pointer;accent-color:var(--adm-accent,#2563eb)" />
              <label :for="`branch-main-${i}`" style="font-size:12px;font-weight:600;color:#6b7280;cursor:pointer;white-space:nowrap">Главный</label>
            </div>
            <button
              :style="(i===0?'margin-top:18px;':'')+'width:32px;height:32px;border:none;background:#fee2e2;border-radius:8px;cursor:pointer;color:#dc2626;display:flex;align-items:center;justify-content:center;flex-shrink:0'"
              @click="branches.splice(i, 1)"
            >
              <Icon name="lucide:trash-2" size="14" />
            </button>
          </div>
          <button
            style="margin-top:4px;display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:#6b7280;background:#f9fafb;border:1.5px dashed #d1d5db;border-radius:8px;padding:7px 14px;cursor:pointer;transition:.15s"
            @click="branches.push({ city: '', address: '', note: '', main: false })"
          >
            <Icon name="lucide:plus" size="14" />Добавить офис
          </button>
        </div>
      </div>

      <!-- Ключевые цифры -->
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
