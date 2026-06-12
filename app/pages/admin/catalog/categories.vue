<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

import {
  faktury as initFaktury,
  vidy as initVidy,
  brendy as initBrendy,
  tsveta as initTsveta,
  pomeshcheniya as initPomeshcheniya,
} from '~/data/catalog'

const route = useRoute()

const tabs = [
  { key: 'faktury',      label: 'Фактуры',        icon: 'lucide:layers',      color: 'bg-blue-100 text-blue-600' },
  { key: 'vidy',         label: 'Виды',            icon: 'lucide:sparkles',    color: 'bg-purple-100 text-purple-600' },
  { key: 'brendy',       label: 'Бренды',          icon: 'lucide:badge-check', color: 'bg-yellow-100 text-yellow-700' },
  { key: 'tsveta',       label: 'Цвета',           icon: 'lucide:palette',     color: 'bg-pink-100 text-pink-600' },
  { key: 'pomeshcheniya',label: 'По помещению',    icon: 'lucide:home',        color: 'bg-green-100 text-green-600' },
]

const activeTab = ref((route.query.tab as string) || 'faktury')

// Deep-copy всех списков
const lists = reactive({
  faktury:       JSON.parse(JSON.stringify(initFaktury)),
  vidy:          JSON.parse(JSON.stringify(initVidy)),
  brendy:        JSON.parse(JSON.stringify(initBrendy)),
  tsveta:        JSON.parse(JSON.stringify(initTsveta)),
  pomeshcheniya: JSON.parse(JSON.stringify(initPomeshcheniya)),
})

type TabKey = keyof typeof lists
const currentList = computed(() => lists[activeTab.value as TabKey])
const currentTab  = computed(() => tabs.find(t => t.key === activeTab.value)!)

// Modal state
const editItem    = ref<Record<string, any> | null>(null)
const deleteId    = ref<string | null>(null)
const search      = ref('')

const filtered = computed(() => {
  if (!search.value) return currentList.value
  const q = search.value.toLowerCase()
  return currentList.value.filter((i: any) =>
    i.title?.toLowerCase().includes(q) ||
    i.desc?.toLowerCase().includes(q) ||
    i.country?.toLowerCase().includes(q)
  )
})

function openEdit(item: Record<string, any>) {
  editItem.value = JSON.parse(JSON.stringify(item))
}

function saveEdit() {
  if (!editItem.value) return
  const list = lists[activeTab.value as TabKey] as any[]
  const idx  = list.findIndex((i: any) => i.id === editItem.value!.id)
  if (idx !== -1) list[idx] = { ...editItem.value }
  editItem.value = null
}

function confirmDelete(id: string) { deleteId.value = id }

function doDelete() {
  if (!deleteId.value) return
  const key  = activeTab.value as TabKey
  lists[key] = (lists[key] as any[]).filter((i: any) => i.id !== deleteId.value)
  deleteId.value = null
}

function priceLabel(item: any) {
  if (item.price !== undefined)  return `${item.price} ₽/м²`
  if (item.extra !== undefined)  return item.extra === 0 ? 'Базовая' : `+${item.extra} ₽/м²`
  return '—'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Breadcrumb + title -->
    <div>
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-1">
        <NuxtLink to="/admin/catalog" class="hover:text-gray-700 transition">Каталог</NuxtLink>
        <Icon name="lucide:chevron-right" class="w-3.5 h-3.5" />
        <span class="text-gray-700">Позиции</span>
      </div>
      <h1 class="text-2xl font-bold text-gray-900">Позиции каталога</h1>
      <p class="text-sm text-gray-500 mt-1">Редактирование карточек в каждом разделе каталога</p>
    </div>

    <!-- Tabs -->
    <div class="bg-white rounded-xl border border-gray-200 p-1 flex flex-wrap gap-1">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="[
          'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition',
          activeTab === tab.key ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
        ]"
        @click="activeTab = tab.key; search = ''"
      >
        <Icon :name="tab.icon" class="w-3.5 h-3.5" />
        {{ tab.label }}
        <span :class="['text-[10px] px-1.5 py-0.5 rounded-full font-bold', activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500']">
          {{ lists[tab.key as TabKey].length }}
        </span>
      </button>
    </div>

    <!-- Search + actions bar -->
    <div class="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 flex-wrap">
      <div class="relative flex-1 min-w-48">
        <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          v-model="search"
          type="text"
          :placeholder="`Поиск в «${currentTab.label}»…`"
          class="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
      </div>
      <NuxtLink
        :to="`/admin/catalog/prices?tab=${activeTab === 'faktury' ? 'faktury' : activeTab === 'vidy' ? 'vidy' : activeTab === 'brendy' ? 'brendy' : 'tsveta'}`"
        class="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition"
      >
        <Icon name="lucide:tag" class="w-4 h-4" />
        Цены
      </NuxtLink>
    </div>

    <!-- Items grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <div
        v-for="item in filtered"
        :key="item.id"
        class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      >
        <!-- Image -->
        <div class="aspect-video bg-gray-100 relative overflow-hidden">
          <img
            v-if="item.img"
            :src="item.img"
            :alt="item.title"
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <Icon name="lucide:image" class="w-8 h-8 text-gray-200" />
          </div>

          <!-- Badges -->
          <div class="absolute top-2 left-2 flex flex-wrap gap-1">
            <span
              v-if="item.badge"
              class="px-2 py-0.5 bg-yellow-400 text-gray-900 text-[10px] font-bold rounded-full uppercase tracking-wide"
            >{{ item.badge }}</span>
          </div>

          <!-- Color swatch для tsveta -->
          <div
            v-if="activeTab === 'tsveta' && item.hex"
            class="absolute bottom-2 right-2 w-8 h-8 rounded-full border-2 border-white shadow"
            :style="{ background: item.hex }"
          />
        </div>

        <!-- Info -->
        <div class="p-4">
          <div class="flex items-start justify-between gap-2 mb-1.5">
            <h3 class="font-semibold text-gray-900 text-sm leading-tight">{{ item.title }}</h3>
            <span class="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
              {{ priceLabel(item) }}
            </span>
          </div>

          <!-- Extra fields per tab -->
          <p v-if="item.desc" class="text-xs text-gray-500 line-clamp-2 mb-2">{{ item.desc }}</p>
          <div v-if="item.country" class="flex items-center gap-1 text-xs text-gray-400 mb-2">
            <Icon name="lucide:flag" class="w-3 h-3" />
            {{ item.country }} · {{ item.type }}
          </div>
          <div v-if="item.icon" class="flex items-center gap-1 text-xs text-gray-400 mb-2">
            <Icon :name="item.icon" class="w-3 h-3" />
            {{ item.icon }}
          </div>

          <!-- Slug -->
          <div class="text-[10px] text-gray-300 font-mono truncate mb-3">{{ item.slug }}</div>

          <!-- Actions -->
          <div class="flex items-center gap-2 border-t border-gray-100 pt-3">
            <button
              class="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition"
              @click="openEdit(item)"
            >
              <Icon name="lucide:pencil" class="w-3.5 h-3.5" />
              Редактировать
            </button>
            <a
              :href="item.slug"
              target="_blank"
              class="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
              title="Открыть на сайте"
            >
              <Icon name="lucide:external-link" class="w-3.5 h-3.5" />
            </a>
            <button
              class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
              @click="confirmDelete(item.id)"
            >
              <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div v-if="filtered.length === 0" class="col-span-full py-16 text-center text-gray-400">
        <Icon name="lucide:search-x" class="w-12 h-12 mx-auto mb-3 text-gray-200" />
        Ничего не найдено
      </div>
    </div>

    <!-- ── Edit Modal ───────────────────────────────────── -->
    <Teleport to="body">
      <div v-if="editItem" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Редактировать позицию</h3>
            <button class="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition" @click="editItem = null">
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
          </div>

          <div class="space-y-3">
            <!-- Title -->
            <div class="space-y-1">
              <label class="text-xs font-medium text-gray-600">Название</label>
              <input v-model="editItem.title" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
            </div>

            <!-- Badge -->
            <div class="space-y-1">
              <label class="text-xs font-medium text-gray-600">Метка (badge)</label>
              <input v-model="editItem.badge" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" placeholder="Хит, Тренд, Премиум…" />
            </div>

            <!-- Price / extra -->
            <div v-if="editItem.price !== undefined" class="space-y-1">
              <label class="text-xs font-medium text-gray-600">Цена (₽/м²)</label>
              <input v-model.number="editItem.price" type="number" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
            </div>
            <div v-if="editItem.extra !== undefined" class="space-y-1">
              <label class="text-xs font-medium text-gray-600">Доплата к базовой цене (₽/м²)</label>
              <input v-model.number="editItem.extra" type="number" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
            </div>

            <!-- Desc (brendy) -->
            <div v-if="editItem.desc !== undefined" class="space-y-1">
              <label class="text-xs font-medium text-gray-600">Описание</label>
              <textarea v-model="editItem.desc" rows="3" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition resize-none" />
            </div>

            <!-- Country / type (brendy) -->
            <div v-if="editItem.country !== undefined" class="grid grid-cols-2 gap-3">
              <div class="space-y-1">
                <label class="text-xs font-medium text-gray-600">Страна</label>
                <input v-model="editItem.country" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
              </div>
              <div class="space-y-1">
                <label class="text-xs font-medium text-gray-600">Тип полотна</label>
                <input v-model="editItem.type" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
              </div>
            </div>

            <!-- Hex (tsveta) -->
            <div v-if="editItem.hex !== undefined" class="space-y-1">
              <label class="text-xs font-medium text-gray-600">Цвет (hex / gradient)</label>
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg border border-gray-200 flex-shrink-0" :style="{ background: editItem.hex }" />
                <input v-model="editItem.hex" class="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
              </div>
            </div>

            <!-- Image URL -->
            <div class="space-y-1">
              <label class="text-xs font-medium text-gray-600">URL изображения</label>
              <div class="flex items-center gap-2">
                <div v-if="editItem.img" class="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <img :src="editItem.img" class="w-full h-full object-cover" />
                </div>
                <input v-model="editItem.img" class="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" placeholder="https://..." />
              </div>
            </div>

            <!-- Slug (readonly) -->
            <div class="space-y-1">
              <label class="text-xs font-medium text-gray-600">URL страницы (slug)</label>
              <input v-model="editItem.slug" class="w-full px-3 py-2 border border-gray-100 bg-gray-50 rounded-lg text-xs font-mono text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
            </div>
          </div>

          <div class="flex gap-3 pt-2">
            <button class="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition" @click="editItem = null">Отмена</button>
            <button class="flex-1 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg text-sm font-semibold transition" @click="saveEdit">Сохранить</button>
          </div>
        </div>
      </div>

      <!-- Delete confirm -->
      <div v-if="deleteId" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center space-y-4">
          <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Icon name="lucide:trash-2" class="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Удалить позицию?</h3>
            <p class="text-sm text-gray-500 mt-1">Это действие нельзя отменить</p>
          </div>
          <div class="flex gap-3">
            <button class="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition" @click="deleteId = null">Отмена</button>
            <button class="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition" @click="doDelete">Удалить</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
