<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

import { defaultSeoMeta } from '~/data/seoMeta'

const { data: seoData, refresh } = await useAsyncData('admin-seo-meta', () => $fetch<Record<string, any>>('/api/cms/seo-meta'))

function buildPages(data: Record<string, any>) {
  // Always merge defaults + CMS so no page is ever lost
  const merged = { ...defaultSeoMeta, ...data }
  return Object.entries(merged)
    .filter(([slug]) => !slug.startsWith('_tpl:'))
    .map(([slug, m]) => ({
      slug,
      title: (m as any).title as string ?? '',
      description: (m as any).description as string ?? '',
    }))
}

const pages = ref(buildPages(seoData.value ?? {}))

watch(seoData, v => { if (v) pages.value = buildPages(v) })

// ── Категории ──────────────────────────────────────────────────────────────
const GROUPS = [
  {
    key: 'main',
    label: 'Основные страницы',
    icon: 'lucide:layout-dashboard',
    hasTemplate: false,
    slugs: ['index', 'catalog', 'ceny', 'akczii', 'otzyvy', 'portfolio', 'kontakty', 'kalkulyator', 'o-kompanii', 'garantiya', 'voprosy-otvety', 'rekvizity', 'sertifikaty', 'obmen-i-vozvrat', 'rassrochka-i-oplata', 'politika-konfidentsialnosti'],
  },
  {
    key: 'faktury',
    label: 'Каталог — Фактуры',
    icon: 'lucide:layers',
    hasTemplate: true,
    slugs: ['faktury', 'matovye-natyazhnye-potolki', 'glyancevye-natyazhnye-potolki', 'satinovye-natyazhnye-potolki', 'tkanevye-natyazhnye-potolki', 'gipoallergennye-natyazhnye-potolki', 'besshovnye-natyazhnye-potolki', 'fakturnye-natyazhnye-potolki', 'negoryuchie-natyazhnye-potolki'],
  },
  {
    key: 'vidy',
    label: 'Каталог — Виды',
    icon: 'lucide:sparkles',
    hasTemplate: true,
    slugs: ['vidy', 'paryashchie-natyazhnye-potolki', 'natyazhnye-potolki-s-podsvetkoy', 'dvuhurovnevye-natyazhnye-potolki', 'natyazhnye-potolki-s-fotopechatyu', 'natyazhnye-potolki-zvezdnoe-nebo', 'natyazhnye-potolki-so-svetovymi-liniyami', 'tenevye-natyazhnye-potolki', 'konturnye-natyazhnye-potolki', 'mnogourovenye-natyazhnye-potolki', 'krivolinejnye-natyazhnye-potolki', 'besshchelevye-natyazhnye-potolki', 'natyazhnye-potolki-3d'],
  },
  {
    key: 'tsveta',
    label: 'Каталог — Цвета',
    icon: 'lucide:palette',
    hasTemplate: true,
    slugs: ['tsveta', 'belye-natyazhnye-potolki', 'chernye-natyazhnye-potolki', 'serye-natyazhnye-potolki', 'bezhevye-natyazhnye-potolki', 'cvetnye-natyazhnye-potolki', 'zolotye-natyazhnye-potolki', 'golubye-natyazhnye-potolki', 'korichnevye-natyazhnye-potolki'],
  },
  {
    key: 'pomescheniya',
    label: 'Каталог — По помещению',
    icon: 'lucide:home',
    hasTemplate: true,
    slugs: ['po-pomescheniyu', 'natyazhnye-potolki-v-gostinoy', 'natyazhnye-potolki-v-detskoy', 'natyazhnye-potolki-na-kuhne', 'natyazhnye-potolki-v-spalne', 'natyazhnye-potolki-v-vannoy', 'natyazhnye-potolki-v-tualete', 'natyazhnye-potolki-v-prihozhey', 'natyazhnye-potolki-v-kvartire', 'natyazhnye-potolki-v-chastnom-dome', 'natyazhnye-potolki-v-ofise', 'natyazhnye-potolki-na-balkone', 'natyazhnye-potolki-na-dache'],
  },
  {
    key: 'brendy',
    label: 'Каталог — Бренды',
    icon: 'lucide:award',
    hasTemplate: true,
    slugs: ['brendy', 'natyazhnye-potolki-msd', 'natyazhnye-potolki-bauf', 'natyazhnye-potolki-lumfer', 'natyazhnye-potolki-teqtum', 'natyazhnye-potolki-descor', 'natyazhnye-potolki-pongs', 'natyazhnye-potolki-clipso', 'natyazhnye-potolki-cerutti'],
  },
  {
    key: 'uslugi',
    label: 'Услуги',
    icon: 'lucide:wrench',
    hasTemplate: true,
    slugs: ['uslugi', 'montazh-natyazhnyh-potolkov', 'demontazh-natyazhnogo-potolka', 'peretyazhka-potolka', 'remont-natyazhnogo-potolka', 'zamena-polotna', 'sliv-vody-s-natyazhnogo-potolka', 'ustanovka-svetilnikov', 'srochnyj-montazh-24-chasa', 'vyezd-zamershchika'],
  },
  {
    key: 'irkutsk',
    label: 'Районы Иркутска',
    icon: 'lucide:map-pin',
    hasTemplate: true,
    slugs: ['irkutsk', 'leninskiy-okrug', 'oktyabrskiy-okrug', 'pravoberezhnyy-okrug', 'sverdlovskiy-okrug'],
  },
]

// ── Шаблоны групп ──────────────────────────────────────────────────────────
// Stored as _tpl:groupKey in seo-meta
type GroupTemplate = { title: string; description: string }
const groupTemplates = ref<Record<string, GroupTemplate>>({})

function initGroupTemplates(data: Record<string, any>) {
  const tpl: Record<string, GroupTemplate> = {}
  for (const g of GROUPS) {
    if (!g.hasTemplate) continue
    const key = `_tpl:${g.key}`
    const raw = data[key]
    tpl[g.key] = { title: raw?.title ?? '', description: raw?.description ?? '' }
  }
  groupTemplates.value = tpl
}

initGroupTemplates(seoData.value ?? {})
watch(seoData, v => { if (v) initGroupTemplates(v) })

const tplOpen = ref<string | null>(null)
function toggleTpl(key: string) {
  tplOpen.value = tplOpen.value === key ? null : key
}

// Apply group template to all empty pages in group
function applyTemplate(groupKey: string) {
  const tpl = groupTemplates.value[groupKey]
  if (!tpl?.title && !tpl?.description) return
  const g = GROUPS.find(g => g.key === groupKey)
  if (!g) return
  let count = 0
  for (const slug of g.slugs) {
    const p = pageMap.value[slug]
    if (!p) continue
    if (!p.title) { p.title = tpl.title; count++ }
    if (!p.description) { p.description = tpl.description; count++ }
  }
  if (count === 0) alert('Все страницы уже заполнены')
}

const search = ref('')
const activeGroup = ref('main')
const expandedSlug = ref<string | null>(null)

const pageMap = computed(() => {
  const m: Record<string, typeof pages.value[0]> = {}
  for (const p of pages.value) m[p.slug] = p
  return m
})

const ungroupedSlugs = computed(() => {
  const covered = new Set(GROUPS.flatMap(g => g.slugs))
  return pages.value.filter(p => !covered.has(p.slug) && !p.slug.startsWith('_tpl:')).map(p => p.slug)
})

const allGroupsWithUngrouped = computed(() => {
  const groups = [...GROUPS]
  if (ungroupedSlugs.value.length) {
    groups.push({ key: 'other', label: 'Прочие', icon: 'lucide:file-text', hasTemplate: false, slugs: ungroupedSlugs.value })
  }
  return groups
})

const filteredGroups = computed(() => {
  const q = search.value.toLowerCase()
  if (!q) return allGroupsWithUngrouped.value
  return allGroupsWithUngrouped.value.map(g => ({
    ...g,
    slugs: g.slugs.filter(slug => {
      const p = pageMap.value[slug]
      return p && (slug.includes(q) || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    }),
  })).filter(g => g.slugs.length > 0)
})

const currentGroupSlugs = computed(() => {
  if (search.value) return filteredGroups.value.flatMap(g => g.slugs)
  return filteredGroups.value.find(g => g.key === activeGroup.value)?.slugs ?? []
})

const currentGroupPages = computed(() =>
  currentGroupSlugs.value.map(s => pageMap.value[s]).filter(Boolean)
)

const currentGroupMeta = computed(() =>
  allGroupsWithUngrouped.value.find(g => g.key === activeGroup.value)
)

function setGroup(key: string) {
  activeGroup.value = key
  expandedSlug.value = null
  tplOpen.value = null
}

const saved = ref(false)
const saving = ref(false)
async function save() {
  saving.value = true
  try {
    const body: Record<string, { title: string; description: string }> = {}
    for (const p of pages.value) body[p.slug] = { title: p.title, description: p.description }
    // Include group templates
    for (const [gKey, tpl] of Object.entries(groupTemplates.value)) {
      body[`_tpl:${gKey}`] = { title: tpl.title, description: tpl.description }
    }
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

    <!-- Header -->
    <div class="adm-seo-header">
      <div>
        <h1 class="adm-page-title">Meta шаблоны</h1>
        <p class="adm-page-sub">
          Title и Description всех страниц. Плейсхолдер
          <code style="background:#f4f5f7;padding:1px 5px;border-radius:4px;font-size:12px">{price}</code>
          подставляет актуальную цену из прайс-листа.
        </p>
      </div>
      <button class="adm-btn adm-btn--primary" :disabled="saving" @click="save">
        <Icon :name="saved ? 'lucide:check' : saving ? 'lucide:loader' : 'lucide:save'" style="width:15px;height:15px" :class="saving && 'adm-spin'" />
        {{ saved ? 'Сохранено!' : saving ? 'Сохранение…' : 'Сохранить всё' }}
      </button>
    </div>

    <!-- Search -->
    <div style="position:relative">
      <Icon name="lucide:search" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);width:15px;height:15px;color:#9ca3af;pointer-events:none" />
      <input v-model="search" class="adm-input" style="padding-left:36px" placeholder="Поиск по slug, заголовку или описанию…" />
    </div>

    <div style="display:flex;gap:16px;align-items:flex-start">

      <!-- Sidebar -->
      <div v-if="!search" class="adm-card" style="width:220px;flex-shrink:0;overflow:hidden;padding:6px">
        <button
          v-for="g in allGroupsWithUngrouped" :key="g.key"
          @click="setGroup(g.key)"
          :class="['adm-seo-group-btn', activeGroup === g.key && 'adm-seo-group-btn--on']"
        >
          <Icon :name="g.icon" style="width:14px;height:14px;flex-shrink:0" />
          <span style="flex:1;text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ g.label }}</span>
          <span style="font-size:11px;background:rgba(0,0,0,.07);padding:1px 6px;border-radius:5px;flex-shrink:0">{{ g.slugs.filter(s => pageMap[s]).length }}</span>
        </button>
      </div>

      <!-- Main -->
      <div style="flex:1;min-width:0">

        <!-- Search results -->
        <template v-if="search">
          <template v-for="g in filteredGroups" :key="g.key">
            <div style="font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;margin:0 0 6px;display:flex;align-items:center;gap:6px">
              <Icon :name="g.icon" style="width:13px;height:13px" />{{ g.label }}
            </div>
            <div class="adm-card" style="overflow:hidden;margin-bottom:14px">
              <AdminSeoPageRow v-for="slug in g.slugs" :key="slug" :page="pageMap[slug]" :expanded="expandedSlug === slug" @toggle="expandedSlug = expandedSlug === slug ? null : slug" />
            </div>
          </template>
        </template>

        <!-- Normal grouped view -->
        <template v-else>
          <div style="font-size:13px;font-weight:700;color:#374151;margin-bottom:10px;display:flex;align-items:center;gap:8px">
            <Icon :name="currentGroupMeta?.icon ?? 'lucide:file'" style="width:15px;height:15px;color:#9ca3af" />
            {{ currentGroupMeta?.label }}
            <span style="font-size:12px;color:#9ca3af;font-weight:400">— {{ currentGroupPages.length }} страниц</span>
          </div>

          <!-- Pages list -->
          <div class="adm-card" style="overflow:hidden;margin-bottom:12px">
            <template v-if="currentGroupPages.length">
              <AdminSeoPageRow v-for="p in currentGroupPages" :key="p.slug" :page="p" :expanded="expandedSlug === p.slug" @toggle="expandedSlug = expandedSlug === p.slug ? null : p.slug" />
            </template>
            <div v-else style="padding:24px;text-align:center;font-size:13px;color:#9ca3af">Нет страниц</div>
          </div>

          <!-- Group template -->
          <div v-if="currentGroupMeta?.hasTemplate" class="adm-card" style="overflow:hidden">
            <!-- Toggle header -->
            <button
              @click="toggleTpl(activeGroup)"
              style="width:100%;display:flex;align-items:center;gap:10px;padding:13px 16px;background:none;border:none;cursor:pointer;text-align:left"
            >
              <Icon name="lucide:layout-template" style="width:15px;height:15px;color:#9ca3af;flex-shrink:0" />
              <span style="flex:1;font-size:13px;font-weight:700;color:#374151">Шаблон группы</span>
              <span style="font-size:11px;color:#9ca3af;background:#f4f5f7;padding:2px 8px;border-radius:5px;margin-right:4px">
                {{ groupTemplates[activeGroup]?.title ? 'заполнен' : 'пустой' }}
              </span>
              <Icon :name="tplOpen === activeGroup ? 'lucide:chevron-up' : 'lucide:chevron-down'" style="width:14px;height:14px;color:#9ca3af" />
            </button>

            <!-- Template editor -->
            <div v-if="tplOpen === activeGroup" style="padding:0 16px 16px;border-top:1px solid #f0f0f0">
              <p style="font-size:12px;color:#6b7280;margin:12px 0 14px;line-height:1.6">
                Шаблон используется как образец для всей группы. Используйте
                <code style="background:#f4f5f7;padding:1px 5px;border-radius:4px">{price}</code> для цены.
                Кнопка «Применить» заполняет только <em>пустые</em> страницы группы.
              </p>

              <div style="display:flex;flex-direction:column;gap:10px">
                <div>
                  <label class="adm-label" style="display:flex;align-items:center;justify-content:space-between">
                    Title шаблон
                    <span :style="`font-size:11px;padding:1px 6px;border-radius:5px;font-weight:600;background:${(groupTemplates[activeGroup]?.title?.length??0)>70?'#fef2f2':'#f0fdf4'};color:${(groupTemplates[activeGroup]?.title?.length??0)>70?'#dc2626':'#166534'}`">
                      {{ groupTemplates[activeGroup]?.title?.length ?? 0 }} / 70
                    </span>
                  </label>
                  <input v-model="groupTemplates[activeGroup].title" class="adm-input" placeholder="Натяжные потолки … в Иркутске — от {price} ₽/м² | ПроПотолок" />
                </div>
                <div>
                  <label class="adm-label" style="display:flex;align-items:center;justify-content:space-between">
                    Description шаблон
                    <span :style="`font-size:11px;padding:1px 6px;border-radius:5px;font-weight:600;background:${(groupTemplates[activeGroup]?.description?.length??0)>160?'#fef2f2':'#f0fdf4'};color:${(groupTemplates[activeGroup]?.description?.length??0)>160?'#dc2626':'#166534'}`">
                      {{ groupTemplates[activeGroup]?.description?.length ?? 0 }} / 160
                    </span>
                  </label>
                  <textarea v-model="groupTemplates[activeGroup].description" rows="3" class="adm-input" style="resize:vertical" placeholder="… в Иркутске от {price} ₽/м². Монтаж за 1 день, гарантия 12 лет." />
                </div>
              </div>

              <div style="display:flex;gap:8px;margin-top:12px">
                <button class="adm-btn adm-btn--secondary" @click="applyTemplate(activeGroup)" style="font-size:12px">
                  <Icon name="lucide:copy-check" style="width:13px;height:13px" />
                  Применить к пустым страницам
                </button>
              </div>
            </div>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<style>
@keyframes adm-spin { to { transform: rotate(360deg); } }
.adm-spin { animation: adm-spin .8s linear infinite; }

.adm-seo-group-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  color: #374151;
  transition: background .12s, color .12s;
}
.adm-seo-group-btn:hover { background: #f4f5f7; }
.adm-seo-group-btn--on { background: #fffef0; color: #92400e; font-weight: 600; }
.adm-seo-group-btn--on:hover { background: #fef9c3; }
</style>
