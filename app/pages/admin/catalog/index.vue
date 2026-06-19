<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

import { faktury, vidy, brendy, tsveta, pomeshcheniya } from '~/data/catalog'

type Section = 'faktury' | 'vidy' | 'brendy' | 'tsveta' | 'pomeshcheniya'
const activeSection = ref<Section>('faktury')

const { heroImg } = useCatalogHeroes()

const sections: { key: Section; label: string; icon: string }[] = [
  { key: 'faktury',     label: 'Фактуры',         icon: 'lucide:layers' },
  { key: 'vidy',        label: 'Виды / Технологии',icon: 'lucide:sparkles' },
  { key: 'brendy',      label: 'Бренды',           icon: 'lucide:badge' },
  { key: 'tsveta',      label: 'Цвета',            icon: 'lucide:palette' },
  { key: 'pomeshcheniya',label: 'По помещению',    icon: 'lucide:layout-dashboard' },
]

const allData: Record<Section, typeof faktury> = { faktury, vidy, brendy, tsveta, pomeshcheniya }
const currentItems = computed(() => allData[activeSection.value])

function pageHref(item: typeof faktury[0]) {
  return `/admin/catalog/page/${item.slug.split('/').pop() ?? item.slug}`
}
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:20px">
    <div>
      <h1 class="adm-page-title">Каталог</h1>
      <p class="adm-page-sub">Управление страницами каталога — фактуры, виды, бренды, цвета, помещения</p>
    </div>

    <!-- Section tabs -->
    <div style="display:flex;gap:4px;background:#f4f5f7;padding:4px;border-radius:11px;overflow-x:auto;width:fit-content">
      <button v-for="s in sections" :key="s.key" @click="activeSection = s.key"
        :class="['adm-tab-btn', activeSection === s.key && 'adm-tab-btn--on']">
        <Icon :name="s.icon" style="width:14px;height:14px" />{{ s.label }}
        <span style="font-size:11px;background:rgba(0,0,0,.07);padding:1px 6px;border-radius:5px;margin-left:2px">{{ allData[s.key].length }}</span>
      </button>
    </div>

    <!-- List -->
    <div class="adm-card" style="overflow:hidden">
      <div style="padding:14px 20px;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:14px;font-weight:600;color:#374151">{{ sections.find(s => s.key === activeSection)?.label }}</span>
        <span style="font-size:13px;color:#9ca3af">{{ currentItems.length }} страниц</span>
      </div>
      <div>
        <div v-for="item in currentItems" :key="item.id"
          style="display:flex;align-items:center;gap:14px;padding:12px 20px;border-bottom:1px solid #f5f5f5;transition:background .1s"
          onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background=''">

          <!-- Thumbnail -->
          <div style="width:44px;height:44px;border-radius:9px;overflow:hidden;flex-shrink:0;background:#f4f5f7;border:1px solid #e8eaed">
            <img v-if="item.img" :src="heroImg(item)" :alt="item.title" style="width:100%;height:100%;object-fit:cover" loading="lazy" />
            <div v-else style="width:100%;height:100%;display:flex;align-items:center;justify-content:center">
              <Icon name="lucide:image" style="width:18px;height:18px;color:#d1d5db" />
            </div>
          </div>

          <!-- Info -->
          <div style="flex:1;min-width:0">
            <div style="font-size:14.5px;font-weight:600;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ item.title }}</div>
            <div style="font-size:12px;color:#9ca3af;font-family:monospace;margin-top:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ item.slug }}</div>
          </div>

          <!-- Price -->
          <div style="text-align:right;flex-shrink:0;min-width:100px">
            <div style="font-size:14px;font-weight:700;color:#111827">от {{ item.price }} ₽/м²</div>
            <span v-if="item.badge" class="adm-tag adm-tag--yellow" style="font-size:11px;display:inline-block;margin-top:2px">{{ item.badge }}</span>
          </div>

          <!-- Actions -->
          <div style="display:flex;gap:6px;flex-shrink:0">
            <NuxtLink :to="pageHref(item)"
              style="display:flex;align-items:center;gap:5px;padding:6px 12px;background:#f5c800;border-radius:8px;cursor:pointer;color:#111827;font-size:12.5px;font-weight:600;text-decoration:none;transition:background .15s;white-space:nowrap"
              onmouseover="this.style.background='#e0b400'" onmouseout="this.style.background='#f5c800'">
              <Icon name="lucide:pencil" style="width:13px;height:13px" />Редактировать
            </NuxtLink>
            <a :href="item.slug" target="_blank"
              style="display:flex;align-items:center;padding:6px 8px;background:#f4f5f7;border:1px solid #e8eaed;border-radius:8px;color:#6b7280;text-decoration:none;transition:all .15s"
              onmouseover="this.style.background='#eff6ff';this.style.color='#3b82f6';this.style.borderColor='#bfdbfe'"
              onmouseout="this.style.background='#f4f5f7';this.style.color='#6b7280';this.style.borderColor='#e8eaed'">
              <Icon name="lucide:external-link" style="width:13px;height:13px" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
