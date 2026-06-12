<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

import type { PriceItem } from '~/data/prices'

const { data: pricesData, refresh } = await useAsyncData('admin-prices', () =>
  $fetch<{ faktury: PriceItem[]; vidy: PriceItem[] }>('/api/cms/prices')
)

const faktury = ref<PriceItem[]>(JSON.parse(JSON.stringify(pricesData.value?.faktury ?? [])))
const vidy    = ref<PriceItem[]>(JSON.parse(JSON.stringify(pricesData.value?.vidy ?? [])))

type Section = 'faktury' | 'vidy'
const activeSection = ref<Section>('faktury')

const editingId = ref<number | null>(null)
const drafts = ref<Record<number, PriceItem>>({})
function d(id: number): PriceItem { return drafts.value[id]! }

function list(): PriceItem[] { return activeSection.value === 'faktury' ? faktury.value : vidy.value }
function setList(items: PriceItem[]) {
  if (activeSection.value === 'faktury') faktury.value = items
  else vidy.value = items
}

function startEdit(item: PriceItem) {
  drafts.value[item.id] = { ...item }
  editingId.value = item.id
}
function saveEdit(id: number) {
  const l = list()
  const idx = l.findIndex(i => i.id === id)
  if (idx !== -1) l[idx] = { ...d(id) }
  editingId.value = null
}
function removeItem(id: number) {
  setList(list().filter(i => i.id !== id))
  if (editingId.value === id) editingId.value = null
}
function addItem() {
  const l = list()
  const newId = Math.max(0, ...l.map(i => i.id), 0) + 1
  const item: PriceItem = { id: newId, name: 'Новая позиция', description: '', priceFrom: 0, priceTo: null, unit: 'м²', badge: null, popular: false }
  l.push(item)
  startEdit(item)
}

const saved = ref(false)
const saving = ref(false)
async function save() {
  saving.value = true
  try {
    await $fetch('/api/admin/prices', {
      method: 'POST',
      body: { faktury: faktury.value, vidy: vidy.value },
    })
    await refresh()
    saved.value = true
    setTimeout(() => saved.value = false, 2500)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:20px">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
      <div>
        <h1 class="adm-page-title">Цены</h1>
        <p class="adm-page-sub">Управление прайс-листом</p>
      </div>
      <button class="adm-btn adm-btn--primary" :disabled="saving" @click="save">
        <Icon :name="saved ? 'lucide:check' : saving ? 'lucide:loader' : 'lucide:save'" style="width:15px;height:15px" :class="saving && 'adm-spin'" />
        {{ saved ? 'Сохранено!' : saving ? 'Сохранение…' : 'Сохранить' }}
      </button>
    </div>

    <!-- Section tabs -->
    <div style="display:flex;gap:4px;background:#f4f5f7;padding:4px;border-radius:11px;width:fit-content">
      <button @click="activeSection='faktury'; editingId=null" :class="['adm-tab-btn', activeSection==='faktury' && 'adm-tab-btn--on']">
        <Icon name="lucide:layers" style="width:14px;height:14px" />По фактурам
      </button>
      <button @click="activeSection='vidy'; editingId=null" :class="['adm-tab-btn', activeSection==='vidy' && 'adm-tab-btn--on']">
        <Icon name="lucide:list" style="width:14px;height:14px" />По видам
      </button>
    </div>

    <!-- Price table -->
    <div class="adm-card" style="overflow:hidden">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #f0f0f0">
        <span style="font-size:14px;font-weight:600;color:#374151">
          {{ activeSection === 'faktury' ? 'Цены по фактурам' : 'Цены по видам' }}
          <span style="font-size:13px;font-weight:400;color:#9ca3af;margin-left:6px">{{ list().length }} позиций</span>
        </span>
        <button class="adm-btn adm-btn--ghost" style="font-size:13px" @click="addItem">
          <Icon name="lucide:plus" style="width:14px;height:14px" />Добавить
        </button>
      </div>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse">
          <thead>
            <tr style="background:#f8f9fb;border-bottom:1px solid #e8eaed">
              <th style="text-align:left;padding:10px 16px;font-size:11.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em">Название</th>
              <th style="text-align:left;padding:10px 16px;font-size:11.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em">Описание</th>
              <th style="text-align:right;padding:10px 16px;font-size:11.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em;white-space:nowrap">От, ₽</th>
              <th style="text-align:right;padding:10px 16px;font-size:11.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em;white-space:nowrap">До, ₽</th>
              <th style="text-align:left;padding:10px 16px;font-size:11.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em">Ед.</th>
              <th style="text-align:left;padding:10px 16px;font-size:11.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em">Бейдж</th>
              <th style="padding:10px 16px;width:80px"></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in list()" :key="item.id">
              <tr v-if="editingId === item.id" style="background:#fffef0;border-bottom:1px solid #e8eaed">
                <td style="padding:9px 16px"><input v-model="d(item.id).name" class="adm-input" style="min-width:150px" /></td>
                <td style="padding:9px 16px"><input v-model="d(item.id).description" class="adm-input" style="min-width:150px" /></td>
                <td style="padding:9px 16px"><input v-model.number="d(item.id).priceFrom" type="number" class="adm-input" style="width:90px;text-align:right" /></td>
                <td style="padding:9px 16px"><input v-model.number="(d(item.id) as any).priceTo" type="number" class="adm-input" style="width:90px;text-align:right" placeholder="—" /></td>
                <td style="padding:9px 16px"><input v-model="d(item.id).unit" class="adm-input" style="width:60px" /></td>
                <td style="padding:9px 16px"><input v-model="(d(item.id) as any).badge" class="adm-input" style="width:90px" placeholder="—" /></td>
                <td style="padding:9px 16px">
                  <div style="display:flex;gap:6px">
                    <button @click="saveEdit(item.id)" style="padding:5px 8px;background:#f5c800;border:none;border-radius:7px;cursor:pointer;color:#111827;display:flex;align-items:center">
                      <Icon name="lucide:check" style="width:13px;height:13px" />
                    </button>
                    <button @click="editingId=null" style="padding:5px 8px;background:#f4f5f7;border:1px solid #e8eaed;border-radius:7px;cursor:pointer;color:#6b7280;display:flex;align-items:center">
                      <Icon name="lucide:x" style="width:13px;height:13px" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-else style="border-bottom:1px solid #f0f0f0;transition:background .1s"
                onmouseover="this.style.background='#f8f9fb'" onmouseout="this.style.background=''">
                <td style="padding:11px 16px;font-size:14px;font-weight:600;color:#111827">{{ item.name }}</td>
                <td style="padding:11px 16px;font-size:13px;color:#6b7280;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ item.description || '—' }}</td>
                <td style="padding:11px 16px;font-size:14px;font-weight:700;color:#111827;text-align:right">{{ item.priceFrom.toLocaleString('ru') }}</td>
                <td style="padding:11px 16px;font-size:13px;color:#6b7280;text-align:right">{{ item.priceTo ? item.priceTo.toLocaleString('ru') : '—' }}</td>
                <td style="padding:11px 16px;font-size:13px;color:#6b7280">{{ item.unit }}</td>
                <td style="padding:11px 16px">
                  <span v-if="item.badge" class="adm-tag adm-tag--yellow" style="font-size:11px">{{ item.badge }}</span>
                  <span v-else style="color:#d1d5db;font-size:13px">—</span>
                </td>
                <td style="padding:11px 16px">
                  <div style="display:flex;gap:4px;justify-content:flex-end">
                    <button @click="startEdit(item)"
                      style="display:flex;align-items:center;padding:5px 7px;background:#f4f5f7;border:1px solid #e8eaed;border-radius:7px;cursor:pointer;color:#6b7280;transition:all .15s"
                      onmouseover="this.style.background='#eff6ff';this.style.color='#3b82f6';this.style.borderColor='#bfdbfe'"
                      onmouseout="this.style.background='#f4f5f7';this.style.color='#6b7280';this.style.borderColor='#e8eaed'">
                      <Icon name="lucide:pencil" style="width:13px;height:13px" />
                    </button>
                    <button @click="removeItem(item.id)"
                      style="display:flex;align-items:center;padding:5px 7px;background:#f4f5f7;border:1px solid #e8eaed;border-radius:7px;cursor:pointer;color:#6b7280;transition:all .15s"
                      onmouseover="this.style.background='#fef2f2';this.style.color='#ef4444';this.style.borderColor='#fecaca'"
                      onmouseout="this.style.background='#f4f5f7';this.style.color='#6b7280';this.style.borderColor='#e8eaed'">
                      <Icon name="lucide:trash-2" style="width:13px;height:13px" />
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
