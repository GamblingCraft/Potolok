<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const content = ref(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://propot.ru/sitemap.xml`)

const saved = ref(false)
function save() { saved.value = true; setTimeout(() => saved.value = false, 2500) }
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
        <button class="adm-btn adm-btn--primary" @click="save">
          <Icon :name="saved ? 'lucide:check' : 'lucide:save'" style="width:15px;height:15px" />
          {{ saved ? 'Сохранено!' : 'Сохранить' }}
        </button>
      </div>
    </div>
    <div class="adm-card adm-card--pad">
      <label class="adm-label">Содержимое robots.txt</label>
      <textarea v-model="content" class="adm-textarea adm-textarea--code" rows="16" spellcheck="false" />
      <p style="font-size:12px;color:#9ca3af;margin-top:8px">Файл будет доступен по адресу <code>/robots.txt</code></p>
    </div>
  </div>
</template>

<style>
.adm-seo-page { display: flex; flex-direction: column; gap: 20px; }
.adm-seo-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.adm-textarea--code { font-family: 'Fira Code', 'Consolas', monospace; font-size: 13.5px; line-height: 1.7; background: #fafafa; }
</style>
