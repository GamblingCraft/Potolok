<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

import { defaultSeoMeta } from '~/data/seoMeta'

const { data: seoData, refresh } = await useAsyncData('admin-seo-meta', () => $fetch('/api/cms/seo-meta'))

const pages = ref(Object.entries(seoData.value ?? defaultSeoMeta).map(([slug, m]) => ({
  slug,
  title: (m as any).title as string,
  description: (m as any).description as string,
})))

watch(seoData, v => {
  if (v) pages.value = Object.entries(v).map(([slug, m]) => ({
    slug, title: (m as any).title, description: (m as any).description,
  }))
})

const search = ref('')
const filtered = computed(() => {
  if (!search.value) return pages.value
  const q = search.value.toLowerCase()
  return pages.value.filter(p => p.slug.includes(q) || p.title.toLowerCase().includes(q))
})

const expandedSlug = ref<string | null>(null)

const saved = ref(false)
const saving = ref(false)
async function save() {
  saving.value = true
  try {
    const body: Record<string, { title: string; description: string }> = {}
    for (const p of pages.value) body[p.slug] = { title: p.title, description: p.description }
    await $fetch('/api/admin/seo-meta', { method: 'POST', body })
    await refresh()
    saved.value = true
    setTimeout(() => saved.value = false, 2500)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="adm-seo-page">
    <div class="adm-seo-header">
      <div>
        <h1 class="adm-page-title">Meta шаблоны</h1>
        <p class="adm-page-sub">Title и Description всех страниц каталога. Собраны из исходных файлов страниц.</p>
      </div>
      <button class="adm-btn adm-btn--primary" :disabled="saving" @click="save">
        <Icon :name="saved ? 'lucide:check' : saving ? 'lucide:loader' : 'lucide:save'" style="width:15px;height:15px" :class="saving && 'adm-spin'" />
        {{ saved ? 'Сохранено!' : saving ? 'Сохранение…' : 'Сохранить' }}
      </button>
    </div>

    <!-- Search -->
    <div style="position:relative">
      <Icon name="lucide:search" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);width:15px;height:15px;color:#9ca3af" />
      <input v-model="search" class="adm-input" style="padding-left:36px" placeholder="Поиск по slug или заголовку…" />
    </div>

    <div style="display:flex;align-items:center;gap:8px;padding:0 2px">
      <Icon name="lucide:info" style="width:14px;height:14px;color:#9ca3af;flex-shrink:0" />
      <p style="font-size:12.5px;color:#9ca3af;margin:0">
        Для применения изменений на фронте — страницы должны читать meta через <code style="background:#f4f5f7;padding:1px 5px;border-radius:4px">useSeoMeta(slug)</code>
      </p>
    </div>

    <!-- Pages list -->
    <div class="adm-card" style="overflow:hidden">
      <div style="padding:12px 20px;border-bottom:1px solid #f0f0f0;font-size:13px;color:#9ca3af">
        {{ filtered.length }} страниц
      </div>
      <div v-for="p in filtered" :key="p.slug" style="border-bottom:1px solid #f5f5f5">
        <!-- Collapsed row -->
        <div v-if="expandedSlug !== p.slug"
          style="display:flex;align-items:center;gap:14px;padding:12px 20px;cursor:pointer;transition:background .1s"
          onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background=''"
          @click="expandedSlug = p.slug">
          <div style="flex:1;min-width:0">
            <div style="font-size:13.5px;font-weight:600;color:#111827;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ p.title }}</div>
            <div style="font-size:11.5px;color:#9ca3af;font-family:monospace;margin-top:1px">{{ p.slug }}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
            <span :style="`font-size:11px;padding:2px 7px;border-radius:5px;font-weight:600;background:${p.title.length > 70 ? '#fef2f2' : '#f0fdf4'};color:${p.title.length > 70 ? '#dc2626' : '#166534'}`">
              {{ p.title.length }} симв.
            </span>
            <Icon name="lucide:chevron-down" style="width:14px;height:14px;color:#9ca3af" />
          </div>
        </div>

        <!-- Expanded edit -->
        <div v-else style="padding:16px 20px;background:#fffef5;border-left:3px solid #f5c800">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <code style="font-size:12px;color:#6b7280;background:#f4f5f7;padding:2px 8px;border-radius:5px">{{ p.slug }}</code>
            <button @click="expandedSlug = null" style="background:none;border:none;cursor:pointer;color:#9ca3af;padding:4px">
              <Icon name="lucide:x" style="width:15px;height:15px" />
            </button>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px">
            <div>
              <label class="adm-label" style="display:flex;align-items:center;justify-content:space-between">
                Title
                <span :style="`font-size:11px;padding:1px 6px;border-radius:5px;font-weight:600;background:${p.title.length > 70 ? '#fef2f2' : '#f0fdf4'};color:${p.title.length > 70 ? '#dc2626' : '#166534'}`">{{ p.title.length }} / 70</span>
              </label>
              <input v-model="p.title" class="adm-input" />
            </div>
            <div>
              <label class="adm-label" style="display:flex;align-items:center;justify-content:space-between">
                Description
                <span :style="`font-size:11px;padding:1px 6px;border-radius:5px;font-weight:600;background:${p.description.length > 160 ? '#fef2f2' : '#f0fdf4'};color:${p.description.length > 160 ? '#dc2626' : '#166534'}`">{{ p.description.length }} / 160</span>
              </label>
              <textarea v-model="p.description" rows="3" class="adm-input" style="resize:vertical" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
