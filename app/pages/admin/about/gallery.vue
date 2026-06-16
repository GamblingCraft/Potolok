<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

interface Photo { id: number; img: string; title: string }

const slug = 'o-kompanii'

const { data: apiData, refresh } = await useAsyncData(
  'about-gallery',
  () => $fetch<Photo[]>(`/api/cms/page-gallery/${slug}`),
  { default: () => [] as Photo[] },
)
const photos   = ref<Photo[]>(JSON.parse(JSON.stringify(apiData.value ?? [])))
watch(apiData, v => { if (v) photos.value = JSON.parse(JSON.stringify(v)) })

const editingId = ref<number | null>(null)
const drafts    = ref<Record<number, Photo>>({})

function startEdit(item: Photo) {
  drafts.value[item.id] = { ...item }
  editingId.value = item.id
}
function cancelEdit() { editingId.value = null }
function saveEdit(id: number) {
  const idx = photos.value.findIndex(i => i.id === id)
  if (idx !== -1) photos.value[idx] = { ...drafts.value[id]! }
  editingId.value = null
}
function deleteItem(id: number) {
  photos.value = photos.value.filter(i => i.id !== id)
  if (editingId.value === id) editingId.value = null
}
function addItem() {
  const newId = Math.max(0, ...photos.value.map(i => i.id)) + 1
  const item: Photo = { id: newId, img: '', title: 'Новое фото' }
  photos.value.unshift(item)
  startEdit(item)
}

const saved  = ref(false)
const saving = ref(false)
async function save() {
  saving.value = true
  try {
    await $fetch('/api/admin/page-gallery', {
      method: 'POST',
      body: { slug, items: photos.value },
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
  <div class="adm-seo-page">
    <div class="adm-seo-header">
      <div>
        <h1 class="adm-page-title">Галерея — О компании</h1>
        <p class="adm-page-sub">Фотографии отображаются после блока «Наши специалисты»</p>
      </div>
      <div style="display:flex;gap:10px;align-items:center">
        <a href="/o-kompanii" target="_blank" class="adm-btn adm-btn--ghost">
          <Icon name="lucide:external-link" style="width:15px;height:15px"/>На сайте
        </a>
        <button class="adm-btn adm-btn--primary" :disabled="saving" @click="save">
          <Icon :name="saved ? 'lucide:check' : saving ? 'lucide:loader' : 'lucide:save'" style="width:15px;height:15px" :class="saving && 'adm-spin'" />
          {{ saved ? 'Сохранено!' : saving ? 'Сохранение…' : 'Сохранить' }}
        </button>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="photos.length === 0" class="adm-card" style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:56px;gap:14px;border:2px dashed #e8eaed;background:#fafafa">
      <Icon name="lucide:image-plus" style="width:44px;height:44px;color:#d1d5db"/>
      <p style="font-size:15px;font-weight:600;color:#6b7280;margin:0">Нет фотографий</p>
      <p style="font-size:13px;color:#9ca3af;margin:0">Добавьте фото — они появятся в галерее на странице «О компании»</p>
      <button class="adm-btn adm-btn--primary" style="margin-top:6px" @click="addItem">
        <Icon name="lucide:plus" style="width:15px;height:15px"/>Добавить первое фото
      </button>
    </div>

    <!-- Grid -->
    <div v-else style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">

      <div
        v-for="item in photos" :key="item.id"
        class="adm-card"
        :style="editingId === item.id
          ? 'grid-column:1/-1;padding:24px;border-color:#f5c800;box-shadow:0 0 0 3px rgba(245,200,0,.15)'
          : 'padding:0;overflow:hidden'"
      >
        <!-- View mode -->
        <template v-if="editingId !== item.id">
          <div style="position:relative;aspect-ratio:4/3;background:#f0f0f0;overflow:hidden" class="adm-gallery-img-wrap">
            <img v-if="item.img" :src="item.img" :alt="item.title" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s" class="adm-gallery-img"/>
            <div v-else style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:#d1d5db">
              <Icon name="lucide:image" style="width:32px;height:32px"/>
              <span style="font-size:12px">Нет фото</span>
            </div>
            <div class="adm-gallery-hover" style="position:absolute;inset:0;background:rgba(0,0,0,.45);opacity:0;transition:opacity .2s;display:flex;align-items:center;justify-content:center;gap:8px">
              <button class="adm-btn adm-btn--ghost" style="font-size:12px;padding:7px 14px" @click="startEdit(item)">
                <Icon name="lucide:pencil" style="width:13px;height:13px"/>Изменить
              </button>
              <button class="adm-btn adm-btn--danger" style="padding:7px 10px" @click="deleteItem(item.id)">
                <Icon name="lucide:trash-2" style="width:13px;height:13px"/>
              </button>
            </div>
          </div>
          <div style="padding:10px 14px;font-size:13px;font-weight:600;color:#374151;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
            {{ item.title || '—' }}
          </div>
        </template>

        <!-- Edit mode -->
        <template v-else>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
            <span style="font-size:14px;font-weight:700;color:#92400e;display:flex;align-items:center;gap:8px">
              <Icon name="lucide:pencil" style="width:15px;height:15px"/>Редактирование
            </span>
            <button style="padding:6px;border:none;background:#f4f5f7;border-radius:8px;cursor:pointer;display:flex" @click="cancelEdit">
              <Icon name="lucide:x" style="width:15px;height:15px;color:#6b7280"/>
            </button>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
            <AdminImageUpload v-model="drafts[item.id]!.img" label="Фотография" />
            <div>
              <label class="adm-label">Подпись</label>
              <input v-model="drafts[item.id]!.title" class="adm-input" placeholder="Название фото"/>
            </div>
          </div>
          <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px;padding-top:16px;border-top:1px solid #f0f0f0">
            <button class="adm-btn adm-btn--ghost" @click="cancelEdit">Отмена</button>
            <button class="adm-btn adm-btn--primary" @click="saveEdit(item.id)">
              <Icon name="lucide:check" style="width:15px;height:15px"/>Сохранить
            </button>
          </div>
        </template>
      </div>

      <!-- Add button -->
      <button
        style="aspect-ratio:4/3;border:2px dashed #e8eaed;border-radius:14px;background:#fafafa;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#9ca3af;transition:.15s"
        @click="addItem"
        @mouseenter="($event.target as HTMLElement).style.borderColor='#f5c800';($event.target as HTMLElement).style.color='#92400e'"
        @mouseleave="($event.target as HTMLElement).style.borderColor='#e8eaed';($event.target as HTMLElement).style.color='#9ca3af'"
      >
        <Icon name="lucide:plus" style="width:28px;height:28px"/>
        <span style="font-size:13px;font-weight:600">Добавить фото</span>
      </button>
    </div>

  </div>
</template>

<style scoped>
.adm-seo-page { display: flex; flex-direction: column; gap: 20px; }
.adm-seo-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.adm-gallery-img-wrap:hover .adm-gallery-hover { opacity: 1 !important; }
.adm-gallery-img-wrap:hover .adm-gallery-img { transform: scale(1.04); }
</style>
