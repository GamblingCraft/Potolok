<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { data } = await useFetch<{ content: string }>('/api/cms/robots')
const content = ref(data.value?.content ?? '')

const saved = ref(false)
const saving = ref(false)
async function save() {
  saving.value = true
  await $fetch('/api/cms/robots', { method: 'POST', body: { content: content.value } })
  saving.value = false
  saved.value = true
  setTimeout(() => saved.value = false, 2500)
}
</script>

<template>
  <div class="adm-seo-page">
    <div class="adm-seo-header">
      <div>
        <h1 class="adm-page-title">Robots.txt</h1>
        <p class="adm-page-sub">Инструкции для поисковых роботов</p>
      </div>
      <div style="display:flex;gap:10px;align-items:center">
        <a href="/robots.txt" target="_blank" class="adm-btn adm-btn--ghost" style="font-size:13px">
          <Icon name="lucide:external-link" style="width:14px;height:14px" />Открыть файл
        </a>
        <button class="adm-btn adm-btn--primary" :disabled="saving" @click="save">
          <Icon :name="saved ? 'lucide:check' : saving ? 'lucide:loader' : 'lucide:save'" style="width:15px;height:15px" :class="saving && 'spin'" />
          {{ saved ? 'Сохранено!' : saving ? 'Сохранение...' : 'Сохранить' }}
        </button>
      </div>
    </div>
    <div class="adm-card adm-card--pad">
      <label class="adm-label">Содержимое robots.txt</label>
      <textarea v-model="content" class="adm-textarea adm-textarea--code" rows="16" spellcheck="false" />
      <p style="font-size:12px;color:#9ca3af;margin-top:8px">
        Файл доступен по адресу <code>/robots.txt</code>. Изменения сохраняются в базу и применяются сразу.
      </p>
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
