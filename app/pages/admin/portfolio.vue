<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

import { portfolio as initialPortfolio, portfolioTags, type PortfolioItem } from '~/data/portfolio'

const { data: apiItems, refresh } = await useAsyncData<PortfolioItem[]>(
  'admin-portfolio',
  () => $fetch<PortfolioItem[]>('/api/cms/portfolio'),
  { default: () => JSON.parse(JSON.stringify(initialPortfolio)) },
)

const items     = ref<PortfolioItem[]>(JSON.parse(JSON.stringify(apiItems.value ?? initialPortfolio)))
watch(apiItems, v => { if (v) items.value = JSON.parse(JSON.stringify(v)) })
const search    = ref('')
const filterTag = ref('all')
const editingId = ref<number | null>(null)
const drafts    = ref<Record<number, PortfolioItem>>({})
const tagInput  = ref('')
const viewItem  = ref<PortfolioItem | null>(null)
const viewPhoto = ref(0)
const saved     = ref(false)
const saving    = ref(false)

function d(id: number): PortfolioItem { return drafts.value[id]! }

const filtered = computed(() => {
  let list = items.value
  if (filterTag.value !== 'all') list = list.filter(i => i.tags.includes(filterTag.value))
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(i =>
      i.title.toLowerCase().includes(q) ||
      i.roomType.toLowerCase().includes(q) ||
      i.tags.some(t => t.includes(q))
    )
  }
  return list
})

function startEdit(item: PortfolioItem) {
  drafts.value[item.id] = JSON.parse(JSON.stringify(item))
  editingId.value = item.id
}
function cancelEdit() { editingId.value = null }
function saveEdit(id: number) {
  const idx = items.value.findIndex(i => i.id === id)
  if (idx !== -1) items.value[idx] = { ...d(id) }
  editingId.value = null
}
function deleteItem(id: number) {
  items.value = items.value.filter(i => i.id !== id)
  if (editingId.value === id) editingId.value = null
}

function addPhoto(id: number) { d(id).photos.push('') }
function removePhoto(id: number, i: number) { d(id).photos.splice(i, 1) }
function updatePhoto(id: number, i: number, val: string) { d(id).photos[i] = val }
function addExtra(id: number) { d(id).extras.push('') }
function removeExtra(id: number, i: number) { d(id).extras.splice(i, 1) }

function addTag(id: number, t: string) {
  const dr = d(id)
  if (t && !dr.tags.includes(t)) dr.tags.push(t)
  tagInput.value = ''
}
function removeTag(id: number, t: string) {
  d(id).tags = d(id).tags.filter((x: string) => x !== t)
}
function handleTagKey(e: KeyboardEvent, id: number) {
  if (e.key === 'Enter') { e.preventDefault(); addTag(id, tagInput.value) }
}

function addNew() {
  const id = Math.max(0, ...items.value.map(i => i.id)) + 1
  const blank: PortfolioItem = {
    id, slug: `rabota-${id}`, title: 'Новая работа', roomType: 'Гостиная',
    area: 0, photos: [], texture: 'Матовый', view: 'Обычный', color: 'Белый',
    extras: [], price: 0, pricePerM2: 159, description: '', tags: [],
    date: new Date().toISOString().slice(0, 10),
  }
  items.value.unshift(blank)
  startEdit(blank)
}

function openView(item: PortfolioItem) { viewItem.value = item; viewPhoto.value = 0 }
function prevPhoto() { if (viewItem.value) viewPhoto.value = (viewPhoto.value - 1 + viewItem.value.photos.length) % viewItem.value.photos.length }
function nextPhoto() { if (viewItem.value) viewPhoto.value = (viewPhoto.value + 1) % viewItem.value.photos.length }

async function savePage() {
  saving.value = true
  try {
    await $fetch('/api/admin/portfolio', { method: 'POST', body: items.value })
    await refresh()
    saved.value = true
    setTimeout(() => saved.value = false, 2500)
  } finally { saving.value = false }
}
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:20px">

    <!-- Header -->
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap">
      <div>
        <h1 class="adm-page-title">Готовые работы</h1>
        <p class="adm-page-sub">{{ filtered.length }} работ в галерее</p>
      </div>
      <div style="display:flex;gap:10px;align-items:center">
        <button class="adm-btn adm-btn--ghost" @click="addNew">
          <Icon name="lucide:plus" style="width:15px;height:15px" />Добавить работу
        </button>
        <button class="adm-btn adm-btn--primary" :disabled="saving" @click="savePage">
          <Icon :name="saved ? 'lucide:check' : saving ? 'lucide:loader-2' : 'lucide:save'" style="width:15px;height:15px" />
          {{ saved ? 'Сохранено!' : saving ? 'Сохраняем…' : 'Сохранить' }}
        </button>
      </div>
    </div>

    <!-- Search + tags -->
    <div class="adm-card" style="padding:14px 16px;display:flex;flex-direction:column;gap:10px">
      <div style="position:relative">
        <Icon name="lucide:search" style="position:absolute;left:11px;top:50%;transform:translateY(-50%);width:15px;height:15px;color:#9ca3af;pointer-events:none" />
        <input v-model="search" placeholder="Поиск по названию, фактуре, тегу…" class="adm-input" style="padding-left:36px" />
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <button
          v-for="tag in portfolioTags" :key="tag.id"
          class="adm-tab-btn"
          :class="filterTag === tag.id ? 'adm-tab-btn--on' : ''"
          style="font-size:12px;padding:5px 12px"
          @click="filterTag = tag.id"
        >
          {{ tag.label }}
          <span style="font-size:11px;background:rgba(0,0,0,.07);padding:1px 6px;border-radius:5px;margin-left:2px">
            {{ tag.id === 'all' ? items.length : items.filter(i => i.tags.includes(tag.id)).length }}
          </span>
        </button>
      </div>
    </div>

    <!-- Grid -->
    <div v-if="filtered.length" class="adm-gal-grid">
      <div
        v-for="item in filtered" :key="item.id"
        class="adm-gal-card"
        :style="editingId === item.id ? 'grid-column:span 3' : ''"
        :class="editingId === item.id ? 'adm-gal-card--edit' : ''"
      >
        <!-- VIEW mode -->
        <template v-if="editingId !== item.id">
          <div class="adm-gal-card__img" style="cursor:pointer" @click="openView(item)">
            <img v-if="item.photos[0]" :src="item.photos[0]" :alt="item.title" />
            <div v-else class="adm-gal-card__noimg"><Icon name="lucide:image" style="width:28px;height:28px" /></div>
            <div class="adm-gal-card__ov">
              <button class="adm-gal-card__btn" @click.stop="startEdit(item)">
                <Icon name="lucide:pencil" style="width:14px;height:14px" />Изменить
              </button>
              <button class="adm-gal-card__del" @click.stop="deleteItem(item.id)">
                <Icon name="lucide:trash-2" style="width:14px;height:14px" />
              </button>
            </div>
            <div style="position:absolute;top:8px;right:8px;display:flex;gap:4px">
              <span style="background:rgba(0,0,0,.6);color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px">{{ item.photos.length }} фото</span>
              <span style="background:#f5c800;color:#111;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px">{{ item.roomType }}</span>
            </div>
          </div>
          <div style="padding:10px 12px">
            <div style="font-size:13.5px;font-weight:600;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ item.title }}</div>
            <div style="font-size:12px;color:#9ca3af;margin-top:2px">{{ item.roomType }} · {{ item.area }} м² · {{ item.price.toLocaleString('ru') }} ₽</div>
            <div v-if="item.tags.length" style="margin-top:6px;display:flex;flex-wrap:wrap;gap:4px">
              <span v-for="t in item.tags" :key="t" class="adm-tag" style="font-size:10.5px">{{ t }}</span>
            </div>
          </div>
        </template>

        <!-- EDIT mode -->
        <template v-else>
          <div style="padding:20px;display:flex;flex-direction:column;gap:14px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:13.5px;font-weight:700;color:#92400e">
                <Icon name="lucide:pencil" style="width:14px;height:14px;margin-right:5px" />Редактирование: {{ d(item.id)?.title }}
              </span>
              <div style="display:flex;gap:8px">
                <button class="adm-btn adm-btn--ghost" style="padding:6px 14px;font-size:13px" @click="cancelEdit">Отмена</button>
                <button class="adm-btn adm-btn--primary" style="font-size:13px" @click="saveEdit(item.id)">
                  <Icon name="lucide:check" style="width:14px;height:14px" />Применить
                </button>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px">
              <!-- Col 1: Main -->
              <div style="display:flex;flex-direction:column;gap:10px">
                <div>
                  <label class="adm-label">Название</label>
                  <input v-model="d(item.id).title" class="adm-input" />
                </div>
                <div>
                  <label class="adm-label">Описание</label>
                  <textarea v-model="d(item.id).description" rows="3" class="adm-input" style="resize:vertical" />
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                  <div>
                    <label class="adm-label">Помещение</label>
                    <input v-model="d(item.id).roomType" class="adm-input" style="font-size:13px" />
                  </div>
                  <div>
                    <label class="adm-label">Дата</label>
                    <input v-model="d(item.id).date" type="date" class="adm-input" style="font-size:13px" />
                  </div>
                  <div>
                    <label class="adm-label">Площадь м²</label>
                    <input v-model.number="d(item.id).area" type="number" class="adm-input" style="font-size:13px" />
                  </div>
                  <div>
                    <label class="adm-label">Цена ₽</label>
                    <input v-model.number="d(item.id).price" type="number" class="adm-input" style="font-size:13px" />
                  </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
                  <div>
                    <label class="adm-label">Фактура</label>
                    <input v-model="d(item.id).texture" class="adm-input" style="font-size:12px;padding:7px 10px" />
                  </div>
                  <div>
                    <label class="adm-label">Вид</label>
                    <input v-model="d(item.id).view" class="adm-input" style="font-size:12px;padding:7px 10px" />
                  </div>
                  <div>
                    <label class="adm-label">Цвет</label>
                    <input v-model="d(item.id).color" class="adm-input" style="font-size:12px;padding:7px 10px" />
                  </div>
                </div>
                <!-- Tags -->
                <div>
                  <label class="adm-label">Теги</label>
                  <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:6px">
                    <span v-for="t in d(item.id).tags" :key="t" class="adm-tag adm-tag--yellow" style="display:inline-flex;align-items:center;gap:4px;font-size:11px">
                      {{ t }}
                      <button @click="removeTag(item.id, t)" style="background:none;border:none;cursor:pointer;color:#92400e;line-height:1;padding:0">×</button>
                    </span>
                  </div>
                  <div style="display:flex;gap:6px">
                    <input v-model="tagInput" @keydown="handleTagKey($event, item.id)" placeholder="Тег + Enter" class="adm-input" style="flex:1;font-size:12px;padding:7px 10px" />
                    <button class="adm-btn adm-btn--primary" style="padding:7px 12px;font-size:13px" @click="addTag(item.id, tagInput)">+</button>
                  </div>
                </div>
              </div>

              <!-- Col 2: Photos -->
              <div style="display:flex;flex-direction:column;gap:10px">
                <label class="adm-label">Фотографии</label>
                <div style="display:flex;flex-direction:column;gap:8px">
                  <div v-for="(ph, pi) in d(item.id).photos" :key="pi" style="display:flex;flex-direction:column;gap:4px">
                    <AdminImageUpload :model-value="ph" @update:model-value="updatePhoto(item.id, pi, $event)" />
                    <button style="font-size:11.5px;color:#ef4444;background:none;border:none;cursor:pointer;text-align:left;font-family:inherit" @click="removePhoto(item.id, pi)">— Удалить фото</button>
                  </div>
                  <button
                    style="padding:10px;border:2px dashed #e8eaed;border-radius:10px;background:none;cursor:pointer;font-size:12px;color:#9ca3af;font-family:inherit;transition:border-color .15s,color .15s;display:flex;align-items:center;justify-content:center;gap:6px"
                    onmouseover="this.style.borderColor='#f5c800';this.style.color='#92400e'"
                    onmouseout="this.style.borderColor='#e8eaed';this.style.color='#9ca3af'"
                    @click="addPhoto(item.id)"
                  >
                    <Icon name="lucide:plus" style="width:14px;height:14px" />Добавить фото
                  </button>
                </div>
              </div>

              <!-- Col 3: Extras -->
              <div style="display:flex;flex-direction:column;gap:10px">
                <label class="adm-label">Особенности монтажа</label>
                <div style="display:flex;flex-direction:column;gap:6px">
                  <div v-for="(ex, ei) in d(item.id).extras" :key="ei" style="display:flex;align-items:center;gap:6px">
                    <input v-model="d(item.id).extras[ei]" placeholder="Парящий контур, LED…" class="adm-input" style="flex:1;font-size:12px;padding:7px 10px" />
                    <button
                      style="padding:6px 8px;background:#fef2f2;border:1px solid #fecaca;border-radius:7px;cursor:pointer;color:#ef4444"
                      @click="removeExtra(item.id, ei)"
                    ><Icon name="lucide:x" style="width:13px;height:13px" /></button>
                  </div>
                  <button
                    style="font-size:12.5px;color:#f5a623;font-weight:600;background:none;border:none;cursor:pointer;font-family:inherit;text-align:left"
                    @click="addExtra(item.id)"
                  >+ Добавить особенность</button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div v-else style="padding:48px;text-align:center;color:#9ca3af;border:2px dashed #e8eaed;border-radius:12px">
      <Icon name="lucide:layout-grid" style="width:40px;height:40px;margin-bottom:12px;opacity:.3" />
      <p style="font-size:14px;margin:0">{{ search || filterTag !== 'all' ? 'Ничего не найдено' : 'Работ пока нет — нажмите «Добавить работу»' }}</p>
    </div>

  </div>

  <!-- Lightbox -->
  <Teleport to="body">
    <div v-if="viewItem" style="position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.9);display:flex;align-items:center;justify-content:center;padding:16px" @click.self="viewItem = null">
      <button style="position:absolute;top:16px;right:16px;padding:8px;color:rgba(255,255,255,.7);background:none;border:none;cursor:pointer" @click="viewItem = null">
        <Icon name="lucide:x" style="width:24px;height:24px" />
      </button>
      <button v-if="viewItem.photos.length > 1" style="position:absolute;left:16px;top:50%;transform:translateY(-50%);padding:8px;color:rgba(255,255,255,.7);background:none;border:none;cursor:pointer" @click="prevPhoto">
        <Icon name="lucide:chevron-left" style="width:32px;height:32px" />
      </button>
      <img :src="viewItem.photos[viewPhoto]" style="max-height:85vh;max-width:90vw;border-radius:12px;object-contain" />
      <button v-if="viewItem.photos.length > 1" style="position:absolute;right:16px;top:50%;transform:translateY(-50%);padding:8px;color:rgba(255,255,255,.7);background:none;border:none;cursor:pointer" @click="nextPhoto">
        <Icon name="lucide:chevron-right" style="width:32px;height:32px" />
      </button>
      <div v-if="viewItem.photos.length > 1" style="position:absolute;bottom:16px;left:50%;transform:translateX(-50%);display:flex;gap:6px">
        <button v-for="(_, i) in viewItem.photos" :key="i"
          :style="`width:8px;height:8px;border-radius:50%;border:none;cursor:pointer;background:${i === viewPhoto ? '#fff' : 'rgba(255,255,255,.3)'}`"
          @click="viewPhoto = i" />
      </div>
    </div>
  </Teleport>
</template>

<style>
.adm-gal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.adm-gal-card { background: #fff; border-radius: 12px; border: 1px solid #e8eaed; overflow: hidden; transition: border-color .15s; }
.adm-gal-card--edit { border-color: #f5c800 !important; border-width: 2px; grid-column: span 3; }
.adm-gal-card__img { aspect-ratio: 16/9; background: #f4f5f7; position: relative; overflow: hidden; }
.adm-gal-card__img img { width: 100%; height: 100%; object-fit: cover; transition: transform .3s; }
.adm-gal-card:hover .adm-gal-card__img img { transform: scale(1.04); }
.adm-gal-card__noimg { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #d1d5db; }
.adm-gal-card__ov { position: absolute; inset: 0; background: rgba(0,0,0,.35); opacity: 0; transition: opacity .2s; display: flex; align-items: flex-end; justify-content: flex-end; padding: 10px; gap: 8px; }
.adm-gal-card:hover .adm-gal-card__ov { opacity: 1; }
.adm-gal-card__btn { display: flex; align-items: center; gap: 5px; padding: 6px 10px; background: rgba(255,255,255,.9); color: #111827; border: none; border-radius: 7px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: inherit; }
.adm-gal-card__btn:hover { background: #fff; }
.adm-gal-card__del { display: flex; align-items: center; justify-content: center; padding: 6px 8px; background: rgba(239,68,68,.85); color: #fff; border: none; border-radius: 7px; cursor: pointer; }
.adm-gal-card__del:hover { background: #ef4444; }
</style>
