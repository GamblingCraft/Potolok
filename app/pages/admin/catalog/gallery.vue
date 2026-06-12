<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

import { catalogGallery, type GalleryItem } from '~/data/gallery'

const slugMeta: Record<string, { label: string; group: string }> = {
  'matovye-natyazhnye-potolki':         { label: 'Матовые',           group: 'Фактуры' },
  'glyancevye-natyazhnye-potolki':      { label: 'Глянцевые',         group: 'Фактуры' },
  'satinovye-natyazhnye-potolki':       { label: 'Сатиновые',         group: 'Фактуры' },
  'tkanevye-natyazhnye-potolki':        { label: 'Тканевые',          group: 'Фактуры' },
  'fakturnye-natyazhnye-potolki':       { label: 'Фактурные',         group: 'Фактуры' },
  'besshovnye-natyazhnye-potolki':      { label: 'Бесшовные',         group: 'Фактуры' },
  'gipoallergennye-natyazhnye-potolki': { label: 'Гипоаллергенные',   group: 'Фактуры' },
  'negoryuchie-natyazhnye-potolki':     { label: 'Негорючие',         group: 'Фактуры' },
  'paryashchie-natyazhnye-potolki':              { label: 'Парящий',           group: 'Виды' },
  'natyazhnye-potolki-s-podsvetkoy':             { label: 'С подсветкой',      group: 'Виды' },
  'dvuhurovnevye-natyazhnye-potolki':            { label: 'Двухуровневый',     group: 'Виды' },
  'natyazhnye-potolki-s-fotopechatyu':           { label: 'Фотопечать',        group: 'Виды' },
  'natyazhnye-potolki-zvezdnoe-nebo':            { label: 'Звёздное небо',     group: 'Виды' },
  'natyazhnye-potolki-so-svetovymi-liniyami':    { label: 'Световые линии',    group: 'Виды' },
  'tenevye-natyazhnye-potolki':                  { label: 'Теневой',           group: 'Виды' },
  'konturnye-natyazhnye-potolki':                { label: 'Контурный',         group: 'Виды' },
  'mnogourovenye-natyazhnye-potolki':            { label: 'Многоуровневый',    group: 'Виды' },
  'krivolinejnye-natyazhnye-potolki':            { label: 'Криволинейный',     group: 'Виды' },
  'besshchelevye-natyazhnye-potolki':            { label: 'Бесщелевые',        group: 'Виды' },
  'natyazhnye-potolki-v-gostinoy':      { label: 'Гостиная',          group: 'По помещению' },
  'natyazhnye-potolki-v-spalne':        { label: 'Спальня',           group: 'По помещению' },
  'natyazhnye-potolki-na-kuhne':        { label: 'Кухня',             group: 'По помещению' },
  'natyazhnye-potolki-v-vannoy':        { label: 'Ванная',            group: 'По помещению' },
  'natyazhnye-potolki-v-detskoy':       { label: 'Детская',           group: 'По помещению' },
  'natyazhnye-potolki-v-prihozhey':     { label: 'Прихожая',          group: 'По помещению' },
  'natyazhnye-potolki-v-kvartire':      { label: 'Квартира',          group: 'По помещению' },
  'natyazhnye-potolki-v-chastnom-dome': { label: 'Частный дом',       group: 'По помещению' },
  'natyazhnye-potolki-v-tualete':       { label: 'Туалет',            group: 'По помещению' },
  'natyazhnye-potolki-v-ofise':         { label: 'Офис',              group: 'По помещению' },
  'natyazhnye-potolki-na-balkone':      { label: 'Балкон',            group: 'По помещению' },
  'natyazhnye-potolki-na-dache':        { label: 'Дача',              group: 'По помещению' },
  'natyazhnye-potolki-msd':     { label: 'MSD',     group: 'Бренды' },
  'natyazhnye-potolki-bauf':    { label: 'Bauf',    group: 'Бренды' },
  'natyazhnye-potolki-lumfer':  { label: 'LumFer',  group: 'Бренды' },
  'natyazhnye-potolki-teqtum':  { label: 'Teqtum',  group: 'Бренды' },
  'natyazhnye-potolki-descor':  { label: 'Descor',  group: 'Бренды' },
  'natyazhnye-potolki-pongs':   { label: 'Pongs',   group: 'Бренды' },
  'natyazhnye-potolki-clipso':  { label: 'Clipso',  group: 'Бренды' },
  'natyazhnye-potolki-cerutti': { label: 'Cerutti', group: 'Бренды' },
  'belye-natyazhnye-potolki':       { label: 'Белые',       group: 'Цвета' },
  'chernye-natyazhnye-potolki':     { label: 'Чёрные',      group: 'Цвета' },
  'serye-natyazhnye-potolki':       { label: 'Серые',        group: 'Цвета' },
  'bezhevye-natyazhnye-potolki':    { label: 'Бежевые',     group: 'Цвета' },
  'cvetnye-natyazhnye-potolki':     { label: 'Цветные',     group: 'Цвета' },
  'zolotye-natyazhnye-potolki':     { label: 'Золотые',     group: 'Цвета' },
  'golubye-natyazhnye-potolki':     { label: 'Голубые',     group: 'Цвета' },
  'korichnevye-natyazhnye-potolki': { label: 'Коричневые',  group: 'Цвета' },
}

const gallery = ref<Record<string, GalleryItem[]>>(JSON.parse(JSON.stringify(catalogGallery)))

function gList(slug: string): GalleryItem[] { return gallery.value[slug] ?? [] }
function gDraft(id: number): GalleryItem { return drafts.value[id]! }

const slugs        = Object.keys(gallery.value)
const allGroups    = [...new Set(slugs.map(s => slugMeta[s]?.group ?? 'Прочее'))]
const filterGroup  = ref('Все')
const searchSlug   = ref('')
const activeSlug   = ref(slugs[0] ?? '')
const editingId    = ref<number | null>(null)  // inline edit open for item id
const drafts       = ref<Record<number, GalleryItem>>({})

const filteredSlugs = computed(() =>
  slugs.filter(s => {
    const meta = slugMeta[s]
    const grp  = filterGroup.value === 'Все' || meta?.group === filterGroup.value
    const q    = !searchSlug.value || meta?.label.toLowerCase().includes(searchSlug.value.toLowerCase())
    return grp && q
  })
)

const activeItems = computed(() => gallery.value[activeSlug.value] ?? [])
const activeMeta  = computed(() => slugMeta[activeSlug.value] ?? { label: activeSlug.value, group: '—' })

// ── Inline edit ───────────────────────────────────────
function startEdit(item: GalleryItem) {
  drafts.value[item.id] = { ...item, details: [...(item.details ?? [])] }
  editingId.value = item.id
}

function cancelEdit() { editingId.value = null }

function saveEdit(id: number) {
  const list = gList(activeSlug.value)
  const idx  = list.findIndex(i => i.id === id)
  if (idx !== -1) list[idx] = { ...gDraft(id) }
  editingId.value = null
}

function deleteItem(id: number) {
  gallery.value[activeSlug.value] = gList(activeSlug.value).filter(i => i.id !== id)
  if (editingId.value === id) editingId.value = null
}

function addDetail(id: number) { gDraft(id).details?.push('') }
function removeDetail(id: number, i: number) { gDraft(id).details?.splice(i, 1) }

function addItem() {
  const list  = gList(activeSlug.value)
  const newId = Math.max(0, ...list.map(i => i.id), 0) + 1
  const item: GalleryItem = { id: newId, img: '', title: 'Новая работа', area: 0, room: '', price: 0, details: [] }
  list.unshift(item)
  startEdit(item)
}

const saved = ref(false)
const saving = ref(false)
async function save() {
  saving.value = true
  try {
    await $fetch('/api/admin/gallery', {
      method: 'POST',
      body: { slug: activeSlug.value, items: gallery.value[activeSlug.value] ?? [] },
    })
    saved.value = true
    setTimeout(() => saved.value = false, 2500)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs text-gray-400 mb-1">
          <NuxtLink to="/admin/catalog" class="hover:text-gray-600 transition">Каталог</NuxtLink>
          <Icon name="lucide:chevron-right" class="w-3 h-3" />
          <span class="text-gray-600">Галерея</span>
        </div>
        <h1 class="text-2xl font-bold text-gray-900">Галерея работ</h1>
        <p class="text-xs text-gray-400 mt-0.5">{{ slugs.length }} разделов · {{ Object.values(gallery).reduce((s,a) => s + a.length, 0) }} фото</p>
      </div>
      <button :disabled="saving" class="flex items-center gap-2 px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-gray-900 font-semibold rounded-xl text-sm transition" @click="save">
        <Icon :name="saving ? 'lucide:loader' : saved ? 'lucide:check' : 'lucide:save'" :class="['w-4 h-4', saving && 'animate-spin']" />
        {{ saving ? 'Сохранение…' : saved ? 'Сохранено!' : 'Сохранить' }}
      </button>
    </div>

    <div class="flex gap-4">

      <!-- Left: slug list -->
      <div class="w-56 flex-shrink-0 space-y-2">
        <div class="relative">
          <Icon name="lucide:search" class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input v-model="searchSlug" placeholder="Поиск раздела…" class="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white transition" />
        </div>
        <div class="flex flex-wrap gap-1">
          <button v-for="g in ['Все', ...allGroups]" :key="g"
            :class="['px-2 py-0.5 rounded-full text-[10px] font-semibold transition', filterGroup === g ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-400']"
            @click="filterGroup = g">{{ g }}</button>
        </div>
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden max-h-[70vh] overflow-y-auto">
          <button v-for="slug in filteredSlugs" :key="slug"
            :class="['w-full text-left px-3 py-2.5 border-b border-gray-50 last:border-0 flex items-center justify-between gap-2 transition hover:bg-gray-50', activeSlug === slug ? 'bg-yellow-50 border-l-2 border-l-yellow-400' : '']"
            @click="activeSlug = slug; editingId = null">
            <div class="min-w-0">
              <div :class="['text-xs font-semibold truncate', activeSlug === slug ? 'text-gray-900' : 'text-gray-700']">{{ slugMeta[slug]?.label ?? slug }}</div>
              <div class="text-[10px] text-gray-400">{{ slugMeta[slug]?.group ?? '—' }}</div>
            </div>
            <span class="text-[10px] text-gray-400 font-medium flex-shrink-0">{{ gallery[slug]?.length ?? 0 }}</span>
          </button>
        </div>
      </div>

      <!-- Right: photo grid -->
      <div class="flex-1 min-w-0 space-y-3">
        <!-- Section header -->
        <div class="flex items-center justify-between gap-3 bg-white rounded-xl border border-gray-200 px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Icon name="lucide:images" class="w-4 h-4 text-yellow-700" />
            </div>
            <div>
              <div class="font-bold text-gray-900 text-sm">{{ activeMeta.label }}</div>
              <div class="text-[10px] text-gray-400 font-mono">{{ activeSlug }} · {{ activeItems.length }} фото</div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <a :href="`/${activeSlug}`" target="_blank" class="flex items-center gap-1 px-3 py-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg text-xs transition">
              <Icon name="lucide:external-link" class="w-3.5 h-3.5" />На сайте
            </a>
            <button class="flex items-center gap-1.5 px-4 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg text-xs transition" @click="addItem">
              <Icon name="lucide:plus" class="w-3.5 h-3.5" />Добавить фото
            </button>
          </div>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-2 xl:grid-cols-3 gap-3">
          <div
            v-for="item in activeItems"
            :key="item.id"
            :class="[
              'bg-white rounded-xl border overflow-hidden transition-all',
              editingId === item.id ? 'border-yellow-400 ring-2 ring-yellow-200 col-span-2 xl:col-span-3' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            ]"
          >
            <!-- View mode -->
            <template v-if="editingId !== item.id">
              <div class="aspect-video bg-gray-100 relative overflow-hidden group">
                <img v-if="item.img" :src="item.img" :alt="item.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div v-else class="w-full h-full flex flex-col items-center justify-center text-gray-300">
                  <Icon name="lucide:image" class="w-8 h-8 mb-1" />
                  <span class="text-xs">Нет фото</span>
                </div>
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button class="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-gray-900 rounded-lg text-xs font-semibold transition" @click="startEdit(item)">
                    <Icon name="lucide:pencil" class="w-3.5 h-3.5" />Редактировать
                  </button>
                  <button class="p-2 bg-red-500/90 hover:bg-red-500 text-white rounded-lg transition" @click="deleteItem(item.id)">
                    <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div class="px-3 py-2.5">
                <div class="font-semibold text-gray-800 text-sm line-clamp-1">{{ item.title }}</div>
                <div class="flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span v-if="item.room" class="flex items-center gap-1"><Icon name="lucide:home" class="w-3 h-3" />{{ item.room }}</span>
                  <span v-if="item.area" class="flex items-center gap-1"><Icon name="lucide:ruler" class="w-3 h-3" />{{ item.area }} м²</span>
                  <span v-if="item.price" class="ml-auto text-gray-600 font-medium">{{ item.price.toLocaleString('ru') }} ₽</span>
                </div>
              </div>
            </template>

            <!-- Inline edit mode (full-width) -->
            <template v-else>
              <div class="p-5">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-sm font-bold text-yellow-700 flex items-center gap-2">
                    <Icon name="lucide:pencil" class="w-4 h-4" />Редактирование фото
                  </span>
                  <button class="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition" @click="cancelEdit">
                    <Icon name="lucide:x" class="w-4 h-4" />
                  </button>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <!-- Left: image upload -->
                  <AdminImageUpload v-model="gDraft(item.id).img" label="Фотография" />

                  <!-- Right: fields -->
                  <div class="space-y-3">
                    <div class="space-y-1">
                      <label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Название работы</label>
                      <input v-model="gDraft(item.id).title" class="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
                    </div>
                    <div class="grid grid-cols-3 gap-2">
                      <div class="space-y-1">
                        <label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Помещение</label>
                        <input v-model="gDraft(item.id).room" placeholder="Гостиная" class="w-full px-2 py-2 border border-gray-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
                      </div>
                      <div class="space-y-1">
                        <label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Площадь</label>
                        <input v-model.number="gDraft(item.id).area" type="number" class="w-full px-2 py-2 border border-gray-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
                      </div>
                      <div class="space-y-1">
                        <label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Цена ₽</label>
                        <input v-model.number="gDraft(item.id).price" type="number" class="w-full px-2 py-2 border border-gray-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
                      </div>
                    </div>

                    <!-- Details -->
                    <div class="space-y-1.5">
                      <div class="flex items-center justify-between">
                        <label class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Детали монтажа</label>
                        <button class="text-[11px] text-yellow-600 font-semibold hover:underline" @click="addDetail(item.id)">+ Добавить</button>
                      </div>
                      <div v-for="(_, i) in gDraft(item.id).details" :key="i" class="flex items-center gap-1.5">
                        <input v-model="gDraft(item.id).details![i]" placeholder="Углы: 4 шт" class="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
                        <button class="p-1 text-gray-300 hover:text-red-500 transition" @click="removeDetail(item.id, i)"><Icon name="lucide:x" class="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button class="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm hover:bg-gray-50 transition" @click="cancelEdit">Отмена</button>
                  <button class="flex items-center gap-2 px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl text-sm font-semibold transition" @click="saveEdit(item.id)">
                    <Icon name="lucide:check" class="w-4 h-4" />Сохранить
                  </button>
                </div>
              </div>
            </template>
          </div>

          <!-- Add placeholder -->
          <button
            class="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-yellow-600"
            style="aspect-ratio:16/9"
            @click="addItem"
          >
            <Icon name="lucide:plus" class="w-7 h-7" />
            <span class="text-xs font-semibold">Добавить фото</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
