<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

import { faqCategories, type FaqCategory, type FaqItem } from '~/data/faq'

const categories   = ref<FaqCategory[]>(JSON.parse(JSON.stringify(faqCategories)))
const activeCatId  = ref(categories.value[0]?.id ?? '')
const search       = ref('')
const editingQKey  = ref<string | null>(null)
const editingCatId = ref<string | null>(null)
const addingCat    = ref(false)
const newCat       = ref<Partial<FaqCategory>>({})
const qDraft       = ref<FaqItem>({ q: '', a: '' })
const catDraft     = ref<Partial<FaqCategory>>({})
const saved        = ref(false)

const activeCat = computed(() => categories.value.find(c => c.id === activeCatId.value))
const totalQ    = computed(() => categories.value.reduce((s, c) => s + c.items.length, 0))

function filteredItems(cat: FaqCategory) {
  if (!search.value) return cat.items.map((item, idx) => ({ item, idx }))
  const q = search.value.toLowerCase()
  return cat.items.map((item, idx) => ({ item, idx })).filter(({ item }) =>
    item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
  )
}

function startEditQ(catId: string, idx: number) {
  const cat = categories.value.find(c => c.id === catId)
  if (!cat) return
  editingQKey.value = `${catId}:${idx}`
  qDraft.value = { ...(cat.items[idx] ?? { q: '', a: '' }) }
}
function saveQ() {
  if (!editingQKey.value) return
  const parts = editingQKey.value.split(':')
  const cat = categories.value.find(c => c.id === parts[0])
  if (cat) cat.items[+parts[1]!] = { ...qDraft.value }
  editingQKey.value = null
}
function cancelQ() { editingQKey.value = null }
function addQuestion(catId: string) {
  const cat = categories.value.find(c => c.id === catId)
  if (!cat) return
  cat.items.push({ q: 'Новый вопрос', a: 'Ответ на вопрос' })
  startEditQ(catId, cat.items.length - 1)
}
function deleteQ(catId: string, idx: number) {
  const cat = categories.value.find(c => c.id === catId)
  if (cat) cat.items.splice(idx, 1)
  if (editingQKey.value === `${catId}:${idx}`) editingQKey.value = null
}
function moveQ(catId: string, idx: number, dir: -1 | 1) {
  const cat = categories.value.find(c => c.id === catId)
  if (!cat) return
  const to = idx + dir
  if (to < 0 || to >= cat.items.length) return
  ;[cat.items[idx], cat.items[to]] = [cat.items[to]!, cat.items[idx]!]
  if (editingQKey.value === `${catId}:${idx}`) editingQKey.value = `${catId}:${to}`
}

function startEditCat(cat: FaqCategory) { editingCatId.value = cat.id; catDraft.value = { ...cat } }
function saveCat() {
  if (!editingCatId.value) return
  const idx = categories.value.findIndex(c => c.id === editingCatId.value)
  if (idx !== -1) Object.assign(categories.value[idx]!, catDraft.value)
  editingCatId.value = null
}
function deleteCat(id: string) {
  categories.value = categories.value.filter(c => c.id !== id)
  if (activeCatId.value === id) activeCatId.value = categories.value[0]?.id ?? ''
  if (editingCatId.value === id) editingCatId.value = null
}
function moveCat(id: string, dir: -1 | 1) {
  const idx = categories.value.findIndex(c => c.id === id)
  const to = idx + dir
  if (to < 0 || to >= categories.value.length) return
  ;[categories.value[idx], categories.value[to]] = [categories.value[to]!, categories.value[idx]!]
}
function startAddCat() {
  newCat.value = { id: '', label: '', title: '', icon: 'lucide:help-circle', items: [] }
  addingCat.value = true
}
function saveAddCat() {
  if (!newCat.value.id || !newCat.value.label) return
  categories.value.push({ ...newCat.value, items: [] } as FaqCategory)
  activeCatId.value = newCat.value.id!
  addingCat.value = false
}
function save() { saved.value = true; setTimeout(() => saved.value = false, 2500) }
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:20px">

    <!-- Header -->
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap">
      <div>
        <h1 class="adm-page-title">FAQ — Вопросы и ответы</h1>
        <p class="adm-page-sub">{{ categories.length }} категорий · {{ totalQ }} вопросов</p>
      </div>
      <div style="display:flex;gap:10px;align-items:center">
        <a href="/voprosy-otvety" target="_blank" class="adm-btn adm-btn--ghost">
          <Icon name="lucide:external-link" style="width:15px;height:15px" />На сайте
        </a>
        <button class="adm-btn adm-btn--primary" @click="save">
          <Icon :name="saved ? 'lucide:check' : 'lucide:save'" style="width:15px;height:15px" />
          {{ saved ? 'Сохранено!' : 'Сохранить' }}
        </button>
      </div>
    </div>

    <!-- Search -->
    <div style="position:relative">
      <Icon name="lucide:search" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);width:15px;height:15px;color:#9ca3af;pointer-events:none" />
      <input v-model="search" placeholder="Поиск по всем вопросам…" class="adm-input" style="padding-left:38px" />
    </div>

    <div style="display:flex;gap:18px;align-items:flex-start">

      <!-- ── Категории ── -->
      <div style="width:210px;flex-shrink:0;display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.08em">Категории</span>
          <button
            style="padding:4px;border-radius:7px;background:#f5c800;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center"
            title="Добавить категорию"
            @click="startAddCat"
          ><Icon name="lucide:plus" style="width:14px;height:14px;color:#111827" /></button>
        </div>

        <!-- New category form -->
        <div v-if="addingCat" class="adm-card" style="padding:14px;border:2px solid #f5c800;display:flex;flex-direction:column;gap:8px">
          <input v-model="newCat.id" placeholder="id (латиница)" class="adm-input" style="font-family:monospace;font-size:12px;padding:7px 10px" />
          <input v-model="newCat.label" placeholder="Название" class="adm-input" style="font-size:12px;padding:7px 10px" />
          <input v-model="newCat.title" placeholder="Заголовок на сайте" class="adm-input" style="font-size:12px;padding:7px 10px" />
          <div style="display:flex;gap:6px;align-items:center">
            <input v-model="newCat.icon" placeholder="lucide:help-circle" class="adm-input" style="flex:1;font-family:monospace;font-size:11px;padding:7px 8px" />
            <Icon :name="(newCat.icon as string) || 'lucide:help-circle'" style="width:28px;height:28px;padding:4px;color:#f5a623;flex-shrink:0" />
          </div>
          <div style="display:flex;gap:6px">
            <button class="adm-btn adm-btn--ghost" style="flex:1;justify-content:center;font-size:12px;padding:6px" @click="addingCat = false">Отмена</button>
            <button class="adm-btn adm-btn--primary" style="flex:1;justify-content:center;font-size:12px;padding:6px" :disabled="!newCat.id || !newCat.label" @click="saveAddCat">Добавить</button>
          </div>
        </div>

        <!-- Cat list -->
        <div class="adm-card" style="padding:0;overflow:hidden">
          <div v-for="(cat, ci) in categories" :key="cat.id">
            <div
              :style="`display:flex;align-items:center;gap:8px;padding:10px 14px;cursor:pointer;border-bottom:1px solid #f5f5f5;transition:background .1s;background:${activeCatId === cat.id ? '#fffbea' : ''}`"
              class="adm-faq-cat-row"
              @click="activeCatId = cat.id; editingCatId = null"
            >
              <div :style="`width:3px;height:22px;border-radius:2px;flex-shrink:0;background:${activeCatId === cat.id ? '#f5c800' : 'transparent'};transition:background .15s`" />
              <Icon :name="cat.icon" style="width:14px;height:14px;color:#9ca3af;flex-shrink:0" />
              <div style="flex:1;min-width:0">
                <div style="font-size:12.5px;font-weight:600;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ cat.label }}</div>
                <div style="font-size:10.5px;color:#9ca3af">{{ cat.items.length }} вопр.</div>
              </div>
              <div class="adm-faq-cat-actions" style="display:none;align-items:center;gap:2px;flex-shrink:0">
                <button style="padding:3px;border:none;background:none;cursor:pointer;color:#d1d5db;border-radius:4px" :disabled="ci === 0" @click.stop="moveCat(cat.id, -1)"><Icon name="lucide:chevron-up" style="width:12px;height:12px" /></button>
                <button style="padding:3px;border:none;background:none;cursor:pointer;color:#d1d5db;border-radius:4px" :disabled="ci === categories.length - 1" @click.stop="moveCat(cat.id, 1)"><Icon name="lucide:chevron-down" style="width:12px;height:12px" /></button>
                <button style="padding:3px;border:none;background:none;cursor:pointer;color:#d1d5db;border-radius:4px" @click.stop="startEditCat(cat)"><Icon name="lucide:pencil" style="width:12px;height:12px" /></button>
                <button style="padding:3px;border:none;background:none;cursor:pointer;color:#d1d5db;border-radius:4px" @click.stop="deleteCat(cat.id)"><Icon name="lucide:trash-2" style="width:12px;height:12px" /></button>
              </div>
            </div>

            <!-- inline cat edit -->
            <div v-if="editingCatId === cat.id" style="padding:10px 14px;background:#fffbea;border-bottom:1px solid #fde68a;display:flex;flex-direction:column;gap:7px">
              <input v-model="catDraft.label" placeholder="Метка" class="adm-input" style="font-size:12px;padding:7px 10px;background:#fff" />
              <input v-model="catDraft.title" placeholder="Заголовок" class="adm-input" style="font-size:12px;padding:7px 10px;background:#fff" />
              <div style="display:flex;gap:6px;align-items:center">
                <input v-model="catDraft.icon" placeholder="lucide:icon" class="adm-input" style="flex:1;font-family:monospace;font-size:11px;padding:7px 8px;background:#fff" />
                <Icon :name="(catDraft.icon as string) || 'lucide:help-circle'" style="width:28px;height:28px;padding:4px;color:#f5a623" />
              </div>
              <div style="display:flex;gap:6px">
                <button class="adm-btn adm-btn--ghost" style="flex:1;justify-content:center;font-size:11.5px;padding:5px" @click="editingCatId = null">Отмена</button>
                <button class="adm-btn adm-btn--primary" style="flex:1;justify-content:center;font-size:11.5px;padding:5px" @click="saveCat">Сохранить</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Вопросы ── -->
      <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:10px">
        <template v-if="activeCat">

          <!-- Cat header -->
          <div class="adm-card" style="padding:14px 18px;display:flex;align-items:center;justify-content:space-between;gap:16px">
            <div style="display:flex;align-items:center;gap:12px">
              <div style="width:36px;height:36px;background:#fffbea;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0">
                <Icon :name="activeCat.icon" style="width:16px;height:16px;color:#92400e" />
              </div>
              <div>
                <div style="font-size:14px;font-weight:700;color:#111827">{{ activeCat.title }}</div>
                <div style="font-size:11px;color:#9ca3af">{{ activeCat.items.length }} вопросов</div>
              </div>
            </div>
            <button class="adm-btn adm-btn--primary" style="font-size:13px" @click="addQuestion(activeCat.id)">
              <Icon name="lucide:plus" style="width:14px;height:14px" />Добавить вопрос
            </button>
          </div>

          <!-- Question rows -->
          <div style="display:flex;flex-direction:column;gap:8px">
            <div
              v-for="({ item, idx }) in filteredItems(activeCat)"
              :key="`${activeCat.id}:${idx}`"
              class="adm-card adm-faq-row"
              :style="editingQKey === `${activeCat.id}:${idx}` ? 'border:2px solid #f5c800;padding:0' : 'padding:0'"
            >
              <!-- View mode -->
              <div v-if="editingQKey !== `${activeCat.id}:${idx}`" style="display:flex;align-items:flex-start;gap:12px;padding:15px 18px">
                <div style="width:24px;height:24px;border-radius:50%;background:#f4f5f7;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#6b7280;flex-shrink:0;margin-top:1px">{{ idx + 1 }}</div>
                <div style="flex:1;min-width:0">
                  <div style="font-size:13.5px;font-weight:600;color:#111827;margin-bottom:5px">{{ item.q }}</div>
                  <p style="font-size:12.5px;color:#6b7280;line-height:1.5;margin:0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">{{ item.a }}</p>
                </div>
                <div class="adm-faq-row-actions" style="display:none;align-items:center;gap:4px;flex-shrink:0">
                  <button style="padding:6px;color:#d1d5db;background:none;border:none;cursor:pointer;border-radius:7px" :disabled="idx === 0" title="Вверх" @click="moveQ(activeCat.id, idx, -1)"><Icon name="lucide:chevron-up" style="width:14px;height:14px" /></button>
                  <button style="padding:6px;color:#d1d5db;background:none;border:none;cursor:pointer;border-radius:7px" :disabled="idx === activeCat.items.length - 1" title="Вниз" @click="moveQ(activeCat.id, idx, 1)"><Icon name="lucide:chevron-down" style="width:14px;height:14px" /></button>
                  <button style="padding:6px;color:#93c5fd;background:none;border:none;cursor:pointer;border-radius:7px" @click="startEditQ(activeCat.id, idx)"><Icon name="lucide:pencil" style="width:14px;height:14px" /></button>
                  <button style="padding:6px;color:#d1d5db;background:none;border:none;cursor:pointer;border-radius:7px" @click="deleteQ(activeCat.id, idx)"><Icon name="lucide:trash-2" style="width:14px;height:14px" /></button>
                </div>
              </div>

              <!-- Edit mode -->
              <div v-else style="padding:16px 18px;background:#fffbea33;display:flex;flex-direction:column;gap:12px">
                <div style="display:flex;align-items:center;gap:8px">
                  <div style="width:24px;height:24px;border-radius:50%;background:#f5c800;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#111827;flex-shrink:0">{{ idx + 1 }}</div>
                  <span style="font-size:12px;font-weight:600;color:#92400e">Редактирование вопроса</span>
                </div>
                <div>
                  <label class="adm-label">Вопрос</label>
                  <input v-model="qDraft.q" class="adm-input" />
                </div>
                <div>
                  <label class="adm-label">Ответ</label>
                  <textarea v-model="qDraft.a" rows="5" class="adm-input" style="resize:vertical;line-height:1.6" />
                </div>
                <div style="display:flex;gap:8px">
                  <button class="adm-btn adm-btn--ghost" style="padding:7px 16px;font-size:13px" @click="cancelQ">Отмена</button>
                  <button class="adm-btn adm-btn--primary" style="font-size:13px" @click="saveQ">
                    <Icon name="lucide:check" style="width:14px;height:14px" />Сохранить
                  </button>
                </div>
              </div>
            </div>

            <div v-if="filteredItems(activeCat).length === 0" style="padding:40px;text-align:center;border:2px dashed #e8eaed;border-radius:12px">
              <Icon name="lucide:help-circle" style="width:36px;height:36px;color:#d1d5db;margin-bottom:10px" />
              <p style="font-size:13px;color:#9ca3af;margin:0">{{ search ? 'Ничего не найдено' : 'Вопросов нет' }}</p>
              <button v-if="!search" style="margin-top:8px;font-size:13px;color:#f5a623;font-weight:600;background:none;border:none;cursor:pointer;font-family:inherit" @click="addQuestion(activeCat.id)">Добавить первый вопрос</button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
.adm-faq-cat-row:hover .adm-faq-cat-actions { display: flex !important; }
.adm-faq-row:hover .adm-faq-row-actions { display: flex !important; }
.adm-faq-row:hover .adm-faq-row-actions button:hover { color: #374151 !important; background: #f4f5f7; }
</style>
