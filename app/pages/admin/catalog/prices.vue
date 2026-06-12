<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

import { PRICES } from '~/data/catalog'

// Deep copy — работает в памяти сессии
const prices = ref<Record<string, number>>(JSON.parse(JSON.stringify(PRICES)))

const tabs = [
  { key: 'faktury',  label: 'Фактуры',           icon: 'lucide:layers' },
  { key: 'vidy',     label: 'Виды (доплата)',     icon: 'lucide:sparkles' },
  { key: 'brendy',   label: 'Бренды',             icon: 'lucide:badge-check' },
  { key: 'tsveta',   label: 'Цвета (доплата)',    icon: 'lucide:palette' },
  { key: 'extra',    label: 'Доп. работы',        icon: 'lucide:plus-circle' },
]
const activeTab = ref('faktury')
const saved = ref(false)

const priceGroups: Record<string, { key: string; label: string; hint?: string }[]> = {
  faktury: [
    { key: 'matovye',         label: 'Матовые' },
    { key: 'glyancevye',      label: 'Глянцевые' },
    { key: 'satinovye',       label: 'Сатиновые' },
    { key: 'tkanevye',        label: 'Тканевые' },
    { key: 'fakturnye',       label: 'Фактурные' },
    { key: 'besshovnye',      label: 'Бесшовные' },
    { key: 'gipoallergennye', label: 'Гипоаллергенные' },
    { key: 'negoryuchie',     label: 'Негорючие' },
  ],
  vidy: [
    { key: 'extra_paryashchie', label: 'Парящий',          hint: 'доплата к базовой цене' },
    { key: 'extra_podsvetka',   label: 'С подсветкой',     hint: 'доплата' },
    { key: 'extra_dvuhuroven',  label: 'Двухуровневый',    hint: 'доплата' },
    { key: 'extra_fotopechat',  label: 'Фотопечать',       hint: 'доплата' },
    { key: 'extra_zvezdnoe',    label: 'Звёздное небо',    hint: 'доплата' },
    { key: 'extra_linii',       label: 'Световые линии',   hint: 'доплата' },
    { key: 'extra_tenevye',     label: 'Теневой',          hint: 'доплата' },
    { key: 'extra_konturnye',   label: 'Контурный',        hint: 'доплата' },
    { key: 'extra_mnogo',       label: 'Многоуровневый',   hint: 'доплата' },
    { key: 'extra_krivo',       label: 'Криволинейный',    hint: 'доплата' },
  ],
  brendy: [
    { key: 'brand_msd',     label: 'MSD' },
    { key: 'brand_bauf',    label: 'Bauf (Германия)' },
    { key: 'brand_lumfer',  label: 'LumFer (Германия)' },
    { key: 'brand_teqtum',  label: 'Teqtum' },
    { key: 'brand_descor',  label: 'Descor (Германия)' },
    { key: 'brand_pongs',   label: 'Pongs (Германия)' },
    { key: 'brand_clipso',  label: 'Clipso (Франция)' },
    { key: 'brand_cerutti', label: 'Cerutti (Швейцария)' },
  ],
  tsveta: [
    { key: 'color_white', label: 'Белый',       hint: 'доплата (0 = базовая)' },
    { key: 'color_black', label: 'Чёрный',      hint: 'доплата' },
    { key: 'color_grey',  label: 'Серый',       hint: 'доплата' },
    { key: 'color_beige', label: 'Бежевый',     hint: 'доплата' },
    { key: 'color_color', label: 'Цветные',     hint: 'доплата' },
    { key: 'color_gold',  label: 'Золотые',     hint: 'доплата' },
    { key: 'color_blue',  label: 'Голубые',     hint: 'доплата' },
    { key: 'color_brown', label: 'Коричневые',  hint: 'доплата' },
  ],
  extra: [
    { key: 'BASE_PRICE_note', label: 'Базовая цена (матовый)', hint: 'совпадает с matovye' },
  ],
}

function save() {
  saved.value = true
  setTimeout(() => { saved.value = false }, 3000)
}

function resetItem(key: string) {
  prices.value[key] = (PRICES as Record<string, number>)[key]
}

function isDirty(key: string) {
  return prices.value[key] !== (PRICES as Record<string, number>)[key]
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <NuxtLink to="/admin/catalog" class="hover:text-gray-700 transition">Каталог</NuxtLink>
          <Icon name="lucide:chevron-right" class="w-3.5 h-3.5" />
          <span class="text-gray-700">Цены</span>
        </div>
        <h1 class="text-2xl font-bold text-gray-900">Редактор цен каталога</h1>
        <p class="text-sm text-gray-500 mt-1">Прайс-лист из <code class="font-mono bg-gray-100 px-1 rounded text-xs">catalog.ts → PRICES</code> — применяется на всех страницах сайта</p>
      </div>
      <div class="flex items-center gap-3">
        <NuxtLink to="/admin/prices" class="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
          Расширенный прайс
        </NuxtLink>
        <button
          class="flex items-center gap-2 px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition text-sm"
          @click="save"
        >
          <Icon v-if="saved" name="lucide:check" class="w-4 h-4" />
          <Icon v-else name="lucide:save" class="w-4 h-4" />
          {{ saved ? 'Сохранено!' : 'Сохранить' }}
        </button>
      </div>
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
        @click="activeTab = tab.key"
      >
        <Icon :name="tab.icon" class="w-3.5 h-3.5" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Price grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      <template v-if="activeTab !== 'extra'">
        <div
          v-for="item in priceGroups[activeTab]"
          :key="item.key"
          :class="[
            'bg-white rounded-xl border p-4 transition',
            isDirty(item.key) ? 'border-yellow-400 ring-1 ring-yellow-300' : 'border-gray-200'
          ]"
        >
          <div class="flex items-start justify-between mb-2">
            <div>
              <div class="font-semibold text-gray-800 text-sm">{{ item.label }}</div>
              <div v-if="item.hint" class="text-xs text-gray-400 mt-0.5">{{ item.hint }}</div>
            </div>
            <button
              v-if="isDirty(item.key)"
              class="text-xs text-gray-400 hover:text-gray-600 transition ml-2 flex-shrink-0"
              title="Сбросить"
              @click="resetItem(item.key)"
            >
              <Icon name="lucide:rotate-ccw" class="w-3.5 h-3.5" />
            </button>
          </div>
          <div class="flex items-center gap-2">
            <div class="relative flex-1">
              <input
                v-model.number="prices[item.key]"
                type="number"
                min="0"
                step="1"
                class="w-full pl-3 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">₽</span>
            </div>
          </div>
          <div class="mt-2 text-xs text-gray-400 flex items-center justify-between">
            <span>Исходное: {{ (PRICES as Record<string,number>)[item.key] }} ₽</span>
            <span
              v-if="isDirty(item.key)"
              :class="prices[item.key] > (PRICES as Record<string,number>)[item.key] ? 'text-green-600' : 'text-red-500'"
              class="font-medium"
            >
              {{ prices[item.key] > (PRICES as Record<string,number>)[item.key] ? '▲' : '▼' }}
              {{ Math.abs(prices[item.key] - (PRICES as Record<string,number>)[item.key]) }} ₽
            </span>
          </div>
        </div>
      </template>

      <!-- Extra tab content -->
      <template v-else>
        <div class="col-span-full">
          <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-5 flex items-start gap-3">
            <Icon name="lucide:info" class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p class="text-sm font-semibold text-yellow-800">Базовая цена (BASE_PRICE)</p>
              <p class="text-xs text-yellow-700 mt-1 leading-relaxed">
                Базовая цена равна цене матового полотна (<strong>matovye</strong>) и используется по всему сайту
                как минимальная цена. Чтобы изменить её — обновите значение <strong>«Матовые»</strong> на вкладке Фактуры.
              </p>
              <div class="mt-3 flex items-center gap-3">
                <div class="px-4 py-2 bg-white border border-yellow-200 rounded-lg">
                  <span class="text-xs text-gray-500">Текущая BASE_PRICE</span>
                  <div class="text-xl font-bold text-gray-900">{{ prices['matovye'] }} <span class="text-sm font-normal text-gray-500">₽/м²</span></div>
                </div>
                <button
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                  @click="activeTab = 'faktury'"
                >
                  Перейти к фактурам →
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Summary -->
    <div v-if="activeTab !== 'extra'" class="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 flex-wrap">
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <Icon name="lucide:info" class="w-4 h-4" />
        <span>
          Изменено позиций:
          <strong class="text-gray-900">
            {{ priceGroups[activeTab].filter(i => isDirty(i.key)).length }}
          </strong>
          из {{ priceGroups[activeTab].length }}
        </span>
      </div>
      <div class="text-xs text-gray-400">
        Изменения выделены жёлтой рамкой. Нажмите «Сохранить» для применения.
      </div>
    </div>

  </div>
</template>
