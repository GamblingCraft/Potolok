<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

import { promotions as defaultPromos, promoCodes as defaultCodes, type Promotion, type PromoCode } from '~/data/promotions'

// ── State ──────────────────────────────────────────────────────────
const activeTab = ref<'promos' | 'codes' | 'banner'>('promos')
const promos = ref<Promotion[]>(JSON.parse(JSON.stringify(defaultPromos)))
const codes = ref<PromoCode[]>(JSON.parse(JSON.stringify(defaultCodes)))
const editingPromo = ref<Promotion | null>(null)
const editingCode = ref<PromoCode | null>(null)
const saving = ref(false)
const saved = ref(false)

// ── Load ───────────────────────────────────────────────────────────
const { data: promosData } = await useAsyncData('admin-promotions',
  () => $fetch<Promotion[]>('/api/cms/promotions'),
  { default: () => JSON.parse(JSON.stringify(defaultPromos)) },
)
const { data: codesData } = await useAsyncData('admin-promo-codes',
  () => $fetch<PromoCode[]>('/api/cms/promo-codes'),
  { default: () => JSON.parse(JSON.stringify(defaultCodes)) },
)
if (promosData.value) promos.value = promosData.value
if (codesData.value) codes.value = codesData.value

// ── Save ───────────────────────────────────────────────────────────
async function save() {
  saving.value = true
  try {
    if (activeTab.value === 'promos') {
      await $fetch('/api/admin/promotions', { method: 'POST', body: promos.value })
    } else {
      await $fetch('/api/admin/promo-codes', { method: 'POST', body: codes.value })
    }
    saved.value = true
    setTimeout(() => saved.value = false, 2500)
  } finally {
    saving.value = false
  }
}

// ── Promotions CRUD ────────────────────────────────────────────────
function togglePromo(id: number) {
  const item = promos.value.find(p => p.id === id)
  if (item) item.active = !item.active
}
function editPromo(item: Promotion) {
  editingPromo.value = { ...item, conditions: [...item.conditions] }
}
function savePromo() {
  if (!editingPromo.value) return
  const idx = promos.value.findIndex(i => i.id === editingPromo.value!.id)
  if (idx !== -1) promos.value[idx] = { ...editingPromo.value }
  editingPromo.value = null
}
function addCondition() { editingPromo.value?.conditions.push('') }
function removeCondition(i: number) { editingPromo.value?.conditions.splice(i, 1) }

// ── Promo Codes CRUD ───────────────────────────────────────────────
function toggleCode(id: number) {
  const item = codes.value.find(c => c.id === id)
  if (item) item.active = !item.active
}
function editCode(item: PromoCode) {
  editingCode.value = { ...item }
}
function saveCode() {
  if (!editingCode.value) return
  const idx = codes.value.findIndex(i => i.id === editingCode.value!.id)
  if (idx !== -1) codes.value[idx] = { ...editingCode.value }
  else codes.value.push({ ...editingCode.value })
  editingCode.value = null
}
function addCode() {
  const maxId = codes.value.reduce((m, c) => Math.max(m, c.id), 0)
  editingCode.value = {
    id: maxId + 1, code: '', description: '', discount: '',
    discountType: 'percent', discountValue: 0,
    conditions: '', dateEnd: null, active: true, public: false,
  }
}
function deleteCode(id: number) {
  codes.value = codes.value.filter(c => c.id !== id)
}

// ── Banner ─────────────────────────────────────────────────────────
import type { BannerConfig } from '~/server/api/cms/banner.get'

const banner = ref<BannerConfig>({ enabled: true, text: '', label: 'Акция', durationHours: 12 })
const bannerSaving = ref(false)
const bannerSaved  = ref(false)

const { data: bannerData } = await useAsyncData<BannerConfig>(
  'admin-banner',
  () => $fetch<BannerConfig>('/api/cms/banner'),
  { default: () => ({ enabled: true, text: 'Бесплатный замер + скидка 10% на монтаж — только сегодня!', label: 'Акция', durationHours: 12 }) },
)
if (bannerData.value) banner.value = { ...bannerData.value }

async function saveBanner() {
  bannerSaving.value = true
  try {
    await $fetch('/api/admin/banner', { method: 'POST', body: banner.value })
    bannerSaved.value = true
    setTimeout(() => bannerSaved.value = false, 2500)
  } finally {
    bannerSaving.value = false
  }
}
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:20px">

    <!-- Header -->
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap">
      <div>
        <h1 class="adm-page-title">Акции и промокоды</h1>
        <p class="adm-page-sub">
          {{ promos.filter(p => p.active).length }} активных акций · {{ codes.filter(c => c.active).length }} активных промокодов
        </p>
      </div>
      <button v-if="activeTab !== 'banner'"
        class="adm-btn"
        :class="saved ? 'adm-btn--ghost' : 'adm-btn--primary'"
        :disabled="saving"
        @click="save"
        style="flex-shrink:0"
      >
        <Icon :name="saved ? 'lucide:check' : saving ? 'lucide:loader-2' : 'lucide:save'" style="width:15px;height:15px" />
        {{ saved ? 'Сохранено!' : saving ? 'Сохраняем…' : 'Сохранить' }}
      </button>
    </div>

    <!-- Tabs -->
    <div style="display:flex;gap:4px;background:#f4f5f7;padding:4px;border-radius:11px;width:fit-content">
      <button
        v-for="tab in [
          { key: 'promos',  label: 'Акции',      icon: 'lucide:percent',    count: promos.length },
          { key: 'codes',   label: 'Промокоды',  icon: 'lucide:ticket',     count: codes.length },
          { key: 'banner',  label: 'Баннер',     icon: 'lucide:megaphone',  count: null },
        ]"
        :key="tab.key"
        :class="['adm-tab-btn', activeTab === tab.key && 'adm-tab-btn--on']"
        @click="activeTab = tab.key as 'promos' | 'codes' | 'banner'"
      >
        <Icon :name="tab.icon" style="width:14px;height:14px" />
        {{ tab.label }}
        <span v-if="tab.count !== null" style="font-size:11px;background:rgba(0,0,0,.07);padding:1px 6px;border-radius:5px;margin-left:2px">{{ tab.count }}</span>
      </button>
    </div>

    <!-- ═══ АКЦИИ ══════════════════════════════════════════════════════ -->
    <div v-if="activeTab === 'promos'" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px">
      <div
        v-for="promo in promos" :key="promo.id"
        class="adm-card"
        style="padding:18px 20px;display:flex;flex-direction:column;gap:14px;transition:opacity .2s"
        :style="promo.active ? '' : 'opacity:.55'"
      >
        <!-- Card header -->
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px">
          <div style="display:flex;align-items:center;gap:12px">
            <div :style="`width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:${promo.color}22;border:1px solid ${promo.color}44`">
              <Icon :name="promo.icon" :style="`width:20px;height:20px;color:${promo.color}`" />
            </div>
            <div>
              <div style="font-size:14.5px;font-weight:700;color:#111827">{{ promo.title }}</div>
              <div style="font-size:12.5px;color:#9ca3af">{{ promo.subtitle }}</div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:4px;align-items:flex-end;flex-shrink:0">
            <span v-if="promo.badge" class="adm-tag adm-tag--yellow" style="font-size:11px">{{ promo.badge }}</span>
            <span v-if="promo.featured" class="adm-tag adm-tag--blue" style="font-size:11px">на сайте</span>
          </div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:20px;font-weight:800;color:#111827">{{ promo.discount }}</span>
          <span style="font-size:12px;color:#9ca3af">{{ promo.dateEnd ? `до ${promo.dateEnd}` : 'Бессрочно' }}</span>
        </div>

        <div style="display:flex;flex-direction:column;gap:5px">
          <div v-for="(cond, i) in promo.conditions.slice(0, 3)" :key="i" style="display:flex;align-items:flex-start;gap:7px;font-size:12.5px;color:#374151">
            <Icon name="lucide:check" style="width:13px;height:13px;color:#16a34a;flex-shrink:0;margin-top:2px" />
            {{ cond }}
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:8px;padding-top:10px;border-top:1px solid #f0f0f0">
          <button
            @click="togglePromo(promo.id)"
            :style="`flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:7px 12px;border-radius:8px;border:none;cursor:pointer;font-size:12.5px;font-weight:600;transition:all .15s;background:${promo.active ? '#dcfce7' : '#f3f4f6'};color:${promo.active ? '#166534' : '#6b7280'}`"
          >
            <Icon :name="promo.active ? 'lucide:eye' : 'lucide:eye-off'" style="width:13px;height:13px" />
            {{ promo.active ? 'Активна' : 'Отключена' }}
          </button>
          <button
            @click="editPromo(promo)"
            style="padding:7px 10px;background:#f4f5f7;border:1px solid #e8eaed;border-radius:8px;cursor:pointer;color:#6b7280;transition:all .15s"
            onmouseover="this.style.background='#eff6ff';this.style.color='#3b82f6';this.style.borderColor='#bfdbfe'"
            onmouseout="this.style.background='#f4f5f7';this.style.color='#6b7280';this.style.borderColor='#e8eaed'"
          >
            <Icon name="lucide:pencil" style="width:15px;height:15px" />
          </button>
        </div>
      </div>
    </div>

    <!-- ═══ ПРОМОКОДЫ ═══════════════════════════════════════════════════ -->
    <div v-if="activeTab === 'codes'" style="display:flex;flex-direction:column;gap:12px">
      <div style="display:flex;justify-content:flex-end">
        <button class="adm-btn adm-btn--ghost" @click="addCode">
          <Icon name="lucide:plus" style="width:14px;height:14px" />Добавить промокод
        </button>
      </div>

      <div class="adm-card" style="padding:0;overflow:hidden">
        <table style="width:100%;border-collapse:collapse">
          <thead>
            <tr style="background:#f4f5f7;border-bottom:1px solid #e8eaed">
              <th style="padding:10px 18px;text-align:left;font-size:10.5px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.07em;white-space:nowrap">КОД</th>
              <th style="padding:10px 14px;text-align:left;font-size:10.5px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.07em">ОПИСАНИЕ</th>
              <th style="padding:10px 14px;text-align:left;font-size:10.5px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.07em;white-space:nowrap">СКИДКА</th>
              <th style="padding:10px 14px;text-align:left;font-size:10.5px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.07em;white-space:nowrap">ТИП</th>
              <th style="padding:10px 14px;text-align:left;font-size:10.5px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.07em">УСЛОВИЯ</th>
              <th style="padding:10px 14px;text-align:left;font-size:10.5px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.07em;white-space:nowrap">ДАТА</th>
              <th style="padding:10px 14px;text-align:center;font-size:10.5px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.07em;white-space:nowrap">ВИДИМОСТЬ</th>
              <th style="padding:10px 18px;text-align:right;font-size:10.5px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.07em;white-space:nowrap">ДЕЙСТВИЯ</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="code in codes" :key="code.id"
              style="border-bottom:1px solid #f5f5f5;transition:background .1s"
              :style="code.active ? '' : 'opacity:.5'"
              onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background=''"
            >
              <td style="padding:12px 18px;white-space:nowrap">
                <span style="font-family:monospace;font-weight:700;font-size:13.5px;color:#111827;background:#f4f5f7;border:1px solid #e8eaed;padding:3px 10px;border-radius:7px">{{ code.code }}</span>
              </td>
              <td style="padding:12px 14px;max-width:180px">
                <div style="font-size:13px;color:#374151;font-weight:500">{{ code.description }}</div>
              </td>
              <td style="padding:12px 14px;white-space:nowrap">
                <span style="font-size:14px;font-weight:800;color:#f5a623">{{ code.discount }}</span>
              </td>
              <td style="padding:12px 14px;white-space:nowrap">
                <span :class="code.discountType === 'percent' ? 'adm-tag adm-tag--blue' : 'adm-tag adm-tag--green'" style="font-size:11px">
                  {{ code.discountType === 'percent' ? `${code.discountValue}%` : `${code.discountValue} ₽` }}
                </span>
              </td>
              <td style="padding:12px 14px;max-width:160px">
                <div style="font-size:12px;color:#9ca3af">{{ code.conditions || '—' }}</div>
              </td>
              <td style="padding:12px 14px;white-space:nowrap">
                <span v-if="code.dateEnd" style="font-size:12px;color:#f97316">до {{ code.dateEnd }}</span>
                <span v-else style="font-size:12px;color:#d1d5db">∞</span>
              </td>
              <td style="padding:12px 14px;text-align:center">
                <div style="display:flex;flex-direction:column;gap:4px;align-items:center">
                  <span :class="code.active ? 'adm-tag adm-tag--green' : 'adm-tag'" style="font-size:10.5px">{{ code.active ? 'Активен' : 'Откл.' }}</span>
                  <span :class="code.public ? 'adm-tag adm-tag--yellow' : 'adm-tag'" style="font-size:10.5px">{{ code.public ? 'Публичный' : 'Скрытый' }}</span>
                </div>
              </td>
              <td style="padding:12px 18px;text-align:right;white-space:nowrap">
                <div style="display:inline-flex;gap:6px">
                  <button
                    @click="toggleCode(code.id)"
                    :title="code.active ? 'Отключить' : 'Включить'"
                    :style="`padding:6px 8px;border-radius:8px;border:none;cursor:pointer;transition:all .15s;background:${code.active ? '#dcfce7' : '#f3f4f6'};color:${code.active ? '#166534' : '#6b7280'}`"
                  ><Icon :name="code.active ? 'lucide:eye' : 'lucide:eye-off'" style="width:14px;height:14px" /></button>
                  <button
                    @click="editCode(code)"
                    style="padding:6px 8px;background:#f4f5f7;border:1px solid #e8eaed;border-radius:8px;cursor:pointer;color:#6b7280;transition:all .15s"
                    onmouseover="this.style.background='#eff6ff';this.style.color='#3b82f6';this.style.borderColor='#bfdbfe'"
                    onmouseout="this.style.background='#f4f5f7';this.style.color='#6b7280';this.style.borderColor='#e8eaed'"
                  ><Icon name="lucide:pencil" style="width:14px;height:14px" /></button>
                  <button
                    @click="deleteCode(code.id)"
                    style="padding:6px 8px;background:#f4f5f7;border:1px solid #e8eaed;border-radius:8px;cursor:pointer;color:#6b7280;transition:all .15s"
                    onmouseover="this.style.background='#fef2f2';this.style.color='#ef4444';this.style.borderColor='#fecaca'"
                    onmouseout="this.style.background='#f4f5f7';this.style.color='#6b7280';this.style.borderColor='#e8eaed'"
                  ><Icon name="lucide:trash-2" style="width:14px;height:14px" /></button>
                </div>
              </td>
            </tr>
            <tr v-if="codes.length === 0">
              <td colspan="8" style="padding:32px;text-align:center;font-size:13.5px;color:#9ca3af">Промокодов пока нет</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══ БАННЕР ══════════════════════════════════════════════════════ -->
    <div v-if="activeTab === 'banner'" style="max-width:640px">
      <div class="adm-card adm-card--pad" style="display:flex;flex-direction:column;gap:18px">

        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-size:15px;font-weight:700;color:#111827">Верхний баннер (TopBanner)</div>
            <div style="font-size:13px;color:#6b7280;margin-top:2px">Показывается вверху сайта с таймером обратного отсчёта</div>
          </div>
          <label style="display:flex;align-items:center;gap:10px;cursor:pointer;user-select:none">
            <span style="font-size:13.5px;font-weight:600;color:#374151">{{ banner.enabled ? 'Включён' : 'Выключен' }}</span>
            <div
              @click="banner.enabled = !banner.enabled"
              :style="`width:42px;height:24px;border-radius:12px;transition:background .2s;cursor:pointer;position:relative;background:${banner.enabled ? '#22c55e' : '#d1d5db'}`"
            >
              <div :style="`position:absolute;top:3px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:left .2s;left:${banner.enabled ? '21px' : '3px'}`" />
            </div>
          </label>
        </div>

        <div>
          <label class="adm-label">Метка (лейбл)</label>
          <input v-model="banner.label" class="adm-input" placeholder="Акция" />
          <div style="font-size:12px;color:#9ca3af;margin-top:4px">Короткий текст на цветной таблетке слева</div>
        </div>

        <div>
          <label class="adm-label">Текст баннера</label>
          <input v-model="banner.text" class="adm-input" placeholder="Бесплатный замер + скидка 10% на монтаж — только сегодня!" />
        </div>

        <div>
          <label class="adm-label">Длительность таймера (часов)</label>
          <input v-model.number="banner.durationHours" type="number" min="1" max="72" class="adm-input" style="max-width:160px" />
          <div style="font-size:12px;color:#9ca3af;margin-top:4px">С момента первого открытия страницы посетителем</div>
        </div>

        <!-- Preview -->
        <div v-if="banner.enabled" style="background:#1a1a2e;border-radius:10px;padding:10px 16px;display:flex;align-items:center;gap:14px">
          <span style="background:#f5c800;color:#1a1a2e;font-weight:700;font-size:11px;padding:3px 10px;border-radius:20px;white-space:nowrap;flex-shrink:0">{{ banner.label || 'Акция' }}</span>
          <span style="color:#fff;font-size:13px;font-weight:500;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ banner.text || '…' }}</span>
          <span style="color:#aaa;font-size:12px;white-space:nowrap;flex-shrink:0">{{ banner.durationHours }}ч ⏱</span>
        </div>
        <div v-else style="background:#f3f4f6;border-radius:10px;padding:10px 16px;text-align:center;font-size:13px;color:#9ca3af">
          Баннер скрыт на сайте
        </div>

        <div style="display:flex;justify-content:flex-end">
          <button class="adm-btn" :class="bannerSaved ? 'adm-btn--ghost' : 'adm-btn--primary'" :disabled="bannerSaving" @click="saveBanner">
            <Icon :name="bannerSaved ? 'lucide:check' : bannerSaving ? 'lucide:loader-2' : 'lucide:save'" style="width:15px;height:15px" />
            {{ bannerSaved ? 'Сохранено!' : bannerSaving ? 'Сохраняем…' : 'Сохранить баннер' }}
          </button>
        </div>

      </div>
    </div>

  </div>

  <!-- ═══ MODAL: Редактировать акцию ════════════════════════════════════ -->
  <Teleport to="body">
    <div v-if="editingPromo"
      style="position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.5);backdrop-filter:blur(4px)"
      @click.self="editingPromo = null"
    >
      <div style="background:#fff;border-radius:18px;width:100%;max-width:520px;box-shadow:0 24px 64px rgba(0,0,0,.15);padding:24px;display:flex;flex-direction:column;gap:14px;max-height:90vh;overflow-y:auto">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <h3 style="font-size:16px;font-weight:700;color:#111827;margin:0">Редактировать акцию</h3>
          <button @click="editingPromo = null" class="adm-btn adm-btn--ghost" style="padding:6px 8px">
            <Icon name="lucide:x" style="width:15px;height:15px" />
          </button>
        </div>
        <div>
          <label class="adm-label">Заголовок</label>
          <input v-model="editingPromo.title" class="adm-input" />
        </div>
        <div>
          <label class="adm-label">Подзаголовок</label>
          <input v-model="editingPromo.subtitle" class="adm-input" />
        </div>
        <div>
          <label class="adm-label">Скидка (текст)</label>
          <input v-model="editingPromo.discount" class="adm-input" />
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div>
            <label class="adm-label">Метка (badge)</label>
            <input v-model="editingPromo.badge" class="adm-input" placeholder="Хит, Новинка…" />
          </div>
          <div>
            <label class="adm-label">Дата окончания</label>
            <input v-model="editingPromo.dateEnd" type="date" class="adm-input" />
          </div>
        </div>
        <div>
          <label class="adm-label">Описание</label>
          <textarea v-model="editingPromo.description" rows="3" class="adm-input" style="resize:vertical" />
        </div>
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <label class="adm-label" style="margin:0">Условия</label>
            <button class="adm-btn adm-btn--ghost" style="font-size:12px;padding:4px 10px" @click="addCondition">
              <Icon name="lucide:plus" style="width:12px;height:12px" />Добавить
            </button>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px">
            <div v-for="(_, i) in editingPromo.conditions" :key="i" style="display:flex;gap:8px;align-items:center">
              <input v-model="editingPromo.conditions[i]" class="adm-input" style="flex:1" />
              <button @click="removeCondition(i)" class="adm-btn adm-btn--danger" style="padding:7px 8px">
                <Icon name="lucide:x" style="width:13px;height:13px" />
              </button>
            </div>
          </div>
        </div>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
          <input v-model="editingPromo.active" type="checkbox" style="width:16px;height:16px;accent-color:#f5c800;cursor:pointer" />
          <span style="font-size:13.5px;color:#374151">Акция активна (отображается на сайте)</span>
        </label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
          <input v-model="editingPromo.featured" type="checkbox" style="width:16px;height:16px;accent-color:#f5c800;cursor:pointer" />
          <span style="font-size:13.5px;color:#374151">
            Показывать на страницах каталога и главной
            <span style="font-size:11.5px;color:#9ca3af;display:block">секции «Акции и скидки» на всех страницах</span>
          </span>
        </label>
        <div style="display:flex;gap:10px;padding-top:4px">
          <button class="adm-btn adm-btn--ghost" style="flex:1;justify-content:center" @click="editingPromo = null">Отмена</button>
          <button class="adm-btn adm-btn--primary" style="flex:1;justify-content:center" @click="savePromo">Применить</button>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- ═══ MODAL: Редактировать промокод ══════════════════════════════════ -->
  <Teleport to="body">
    <div v-if="editingCode"
      style="position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.5);backdrop-filter:blur(4px)"
      @click.self="editingCode = null"
    >
      <div style="background:#fff;border-radius:18px;width:100%;max-width:460px;box-shadow:0 24px 64px rgba(0,0,0,.15);padding:24px;display:flex;flex-direction:column;gap:14px;max-height:90vh;overflow-y:auto">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <h3 style="font-size:16px;font-weight:700;color:#111827;margin:0">
            {{ codes.find(c => c.id === editingCode!.id) ? 'Редактировать' : 'Новый' }} промокод
          </h3>
          <button @click="editingCode = null" class="adm-btn adm-btn--ghost" style="padding:6px 8px">
            <Icon name="lucide:x" style="width:15px;height:15px" />
          </button>
        </div>
        <div>
          <label class="adm-label">Промокод</label>
          <input
            v-model="editingCode.code"
            class="adm-input"
            placeholder="ПРОМОКОД"
            style="font-family:monospace;font-weight:700;text-transform:uppercase;letter-spacing:.5px"
            @input="editingCode.code = (editingCode.code as string).toUpperCase()"
          />
        </div>
        <div>
          <label class="adm-label">Описание</label>
          <input v-model="editingCode.description" class="adm-input" />
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div>
            <label class="adm-label">Тип скидки</label>
            <select v-model="editingCode.discountType" class="adm-input" style="cursor:pointer">
              <option value="percent">Процент (%)</option>
              <option value="fixed">Фиксированная (₽)</option>
            </select>
          </div>
          <div>
            <label class="adm-label">Значение</label>
            <input v-model.number="editingCode.discountValue" type="number" min="0" class="adm-input" />
          </div>
        </div>
        <div>
          <label class="adm-label">Текст скидки (отображается)</label>
          <input v-model="editingCode.discount" class="adm-input" placeholder="10%, 500 ₽ …" />
        </div>
        <div>
          <label class="adm-label">Условия</label>
          <input v-model="editingCode.conditions" class="adm-input" />
        </div>
        <div>
          <label class="adm-label">Дата окончания</label>
          <input v-model="editingCode.dateEnd" type="date" class="adm-input" />
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
            <input v-model="editingCode.active" type="checkbox" style="width:16px;height:16px;accent-color:#f5c800;cursor:pointer" />
            <span style="font-size:13.5px;color:#374151">Промокод активен</span>
          </label>
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
            <input v-model="editingCode.public" type="checkbox" style="width:16px;height:16px;accent-color:#f5c800;cursor:pointer" />
            <span style="font-size:13.5px;color:#374151">Показывать на сайте (/akczii)</span>
          </label>
        </div>
        <div style="display:flex;gap:10px;padding-top:4px">
          <button class="adm-btn adm-btn--ghost" style="flex:1;justify-content:center" @click="editingCode = null">Отмена</button>
          <button class="adm-btn adm-btn--primary" style="flex:1;justify-content:center" @click="saveCode">Применить</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
