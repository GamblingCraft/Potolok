<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

import { priceFaktury, priceVidy, type PriceItem } from '~/data/prices'

const tabs = ['Фактуры', 'Виды/Технологии']
const activeTab = ref(0)

const fakturyList = ref<PriceItem[]>(JSON.parse(JSON.stringify(priceFaktury)))
const vidyList = ref<PriceItem[]>(JSON.parse(JSON.stringify(priceVidy)))

const currentList = computed(() => activeTab.value === 0 ? fakturyList.value : vidyList.value)

const editingItem = ref<PriceItem | null>(null)

function editItem(item: PriceItem) {
  editingItem.value = { ...item }
}

function saveItem() {
  if (!editingItem.value) return
  const list = activeTab.value === 0 ? fakturyList : vidyList
  const idx = list.value.findIndex(i => i.id === editingItem.value!.id)
  if (idx !== -1) list.value[idx] = { ...editingItem.value }
  editingItem.value = null
}

function formatPrice(item: PriceItem) {
  if (item.priceTo) return `${item.priceFrom} – ${item.priceTo} ₽/${item.unit}`
  return `от ${item.priceFrom} ₽/${item.unit}`
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Прайс-лист</h1>
      <p class="text-sm text-gray-500 mt-1">Управление ценами на натяжные потолки</p>
    </div>

    <!-- Tabs -->
    <div class="bg-white rounded-xl border border-gray-200 p-1 flex gap-1 w-fit">
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        :class="[
          'px-5 py-2 rounded-lg text-sm font-medium transition',
          activeTab === i ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
        ]"
        @click="activeTab = i"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-100 bg-gray-50">
              <th class="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Название</th>
              <th class="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Описание</th>
              <th class="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Цена</th>
              <th class="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Метка</th>
              <th class="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Популярный</th>
              <th class="text-right px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Действия</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="item in currentList" :key="item.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-5 py-3 font-medium text-gray-800">{{ item.name }}</td>
              <td class="px-5 py-3 max-w-xs">
                <p class="text-gray-500 line-clamp-2">{{ item.description }}</p>
              </td>
              <td class="px-5 py-3">
                <span class="font-semibold text-gray-900">{{ formatPrice(item) }}</span>
              </td>
              <td class="px-5 py-3">
                <span v-if="item.badge" class="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                  {{ item.badge }}
                </span>
                <span v-else class="text-gray-300">—</span>
              </td>
              <td class="px-5 py-3">
                <div :class="['w-5 h-5 rounded-full flex items-center justify-center', item.popular ? 'bg-green-100' : 'bg-gray-100']">
                  <Icon :name="item.popular ? 'lucide:check' : 'lucide:minus'" :class="['w-3 h-3', item.popular ? 'text-green-600' : 'text-gray-400']" />
                </div>
              </td>
              <td class="px-5 py-3">
                <div class="flex items-center justify-end">
                  <button
                    class="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
                    @click="editItem(item)"
                  >
                    <Icon name="lucide:pencil" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit modal -->
    <Teleport to="body">
      <div v-if="editingItem" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Редактировать позицию</h3>
            <button class="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition" @click="editingItem = null">
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
          </div>

          <div class="space-y-1">
            <label class="text-xs font-medium text-gray-600">Название</label>
            <input v-model="editingItem.name" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
          </div>

          <div class="space-y-1">
            <label class="text-xs font-medium text-gray-600">Описание</label>
            <textarea v-model="editingItem.description" rows="3" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition resize-none" />
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div class="space-y-1">
              <label class="text-xs font-medium text-gray-600">Цена от (₽)</label>
              <input v-model.number="editingItem.priceFrom" type="number" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-gray-600">Цена до (₽)</label>
              <input v-model.number="editingItem.priceTo" type="number" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" placeholder="—" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-gray-600">Ед. изм.</label>
              <input v-model="editingItem.unit" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1">
              <label class="text-xs font-medium text-gray-600">Метка (badge)</label>
              <input v-model="editingItem.badge" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" placeholder="Хит, Эко..." />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-gray-600">Популярный</label>
              <div class="flex items-center gap-2 pt-2">
                <input v-model="editingItem.popular" type="checkbox" id="popular" class="w-4 h-4 accent-yellow-400" />
                <label for="popular" class="text-sm text-gray-600">Отображать как популярный</label>
              </div>
            </div>
          </div>

          <div class="flex gap-3 pt-2">
            <button class="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition" @click="editingItem = null">Отмена</button>
            <button class="flex-1 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg text-sm font-semibold transition" @click="saveItem">Сохранить</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
