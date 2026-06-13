<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { data } = await useFetch<{ yandex: string; google: string }>('/api/cms/verification')
const yandex = ref(data.value?.yandex ?? '')
const google = ref(data.value?.google ?? '')

const saved = ref(false)
const saving = ref(false)
async function save() {
  saving.value = true
  await $fetch('/api/cms/verification', { method: 'POST', body: { yandex: yandex.value, google: google.value } })
  saving.value = false
  saved.value = true
  setTimeout(() => saved.value = false, 2500)
}
</script>

<template>
  <div class="adm-seo-page">
    <div class="adm-seo-header">
      <div>
        <h1 class="adm-page-title">Верификация сайта</h1>
        <p class="adm-page-sub">Коды подтверждения вставляются в &lt;head&gt; на всех страницах</p>
      </div>
      <button class="adm-btn adm-btn--primary" :disabled="saving" @click="save">
        <Icon :name="saved ? 'lucide:check' : saving ? 'lucide:loader' : 'lucide:save'" style="width:15px;height:15px" :class="saving && 'spin'" />
        {{ saved ? 'Сохранено!' : saving ? 'Сохранение...' : 'Сохранить' }}
      </button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div class="adm-card adm-card--pad">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
          <div style="width:36px;height:36px;background:#ffcc00;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:#cc0000;flex-shrink:0">Я</div>
          <div>
            <div style="font-weight:700;font-size:15px">Яндекс Вебмастер</div>
            <div style="font-size:12px;color:#9ca3af">webmaster.yandex.ru</div>
          </div>
        </div>
        <label class="adm-label">Мета-тег верификации</label>
        <input v-model="yandex" class="adm-input" placeholder='<meta name="yandex-verification" content="xxxx" />' style="font-family:monospace;font-size:12.5px" />
        <p style="font-size:12px;color:#9ca3af;margin-top:6px">Вставьте весь тег или только значение content=</p>
        <div v-if="yandex" style="margin-top:10px;padding:8px 12px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;font-size:12px;color:#166534">
          <Icon name="lucide:check-circle" style="width:13px;height:13px;vertical-align:middle;margin-right:4px" />Будет добавлен в &lt;head&gt; на всех страницах
        </div>
      </div>
      <div class="adm-card adm-card--pad">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
          <div style="width:36px;height:36px;background:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid #e8eaed">
            <Icon name="lucide:search" style="width:18px;height:18px;color:#4285f4" />
          </div>
          <div>
            <div style="font-weight:700;font-size:15px">Google Search Console</div>
            <div style="font-size:12px;color:#9ca3af">search.google.com/search-console</div>
          </div>
        </div>
        <label class="adm-label">Мета-тег верификации</label>
        <input v-model="google" class="adm-input" placeholder='<meta name="google-site-verification" content="xxxx" />' style="font-family:monospace;font-size:12.5px" />
        <p style="font-size:12px;color:#9ca3af;margin-top:6px">Вставьте весь тег или только значение content=</p>
        <div v-if="google" style="margin-top:10px;padding:8px 12px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;font-size:12px;color:#166534">
          <Icon name="lucide:check-circle" style="width:13px;height:13px;vertical-align:middle;margin-right:4px" />Будет добавлен в &lt;head&gt; на всех страницах
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.adm-seo-page { display: flex; flex-direction: column; gap: 20px; }
.adm-seo-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.spin { animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
