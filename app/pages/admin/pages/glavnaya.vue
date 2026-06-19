<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

interface Photo { id: number; img: string; title: string }

// ── Hero ────────────────────────────────────────────────
const { data: storedHero } = await useAsyncData(
  'index-hero',
  () => $fetch<{ img: string; title: string } | null>('/api/cms/page-hero/index').catch(() => null),
)
const hero = reactive({
  img:   storedHero.value?.img   ?? '',
  title: storedHero.value?.title ?? '',
})

const heroSaved  = ref(false)
const heroSaving = ref(false)
async function saveHero() {
  heroSaving.value = true
  try {
    await $fetch('/api/admin/page-hero', {
      method: 'POST',
      body: { slug: 'index', hero: { img: hero.img, title: hero.title } },
    })
    heroSaved.value = true
    setTimeout(() => heroSaved.value = false, 2500)
  } finally {
    heroSaving.value = false
  }
}

// ── Gallery ─────────────────────────────────────────────
const { data: apiData, refresh: refreshGallery } = await useAsyncData(
  'index-page-gallery',
  () => $fetch<Photo[]>('/api/cms/page-gallery/index'),
  { default: () => [] as Photo[] },
)
const photos = ref<Photo[]>(JSON.parse(JSON.stringify(apiData.value ?? [])))
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

function addMultiple(items: { img: string; title: string }[]) {
  let nextId = Math.max(0, ...photos.value.map(i => i.id)) + 1
  const newItems = items.map(it => ({ id: nextId++, img: it.img, title: it.title }))
  photos.value = [...newItems, ...photos.value]
}

const galSaved  = ref(false)
const galSaving = ref(false)
async function saveGallery() {
  galSaving.value = true
  try {
    await $fetch('/api/admin/page-gallery', {
      method: 'POST',
      body: { slug: 'index', items: photos.value },
    })
    await refreshGallery()
    galSaved.value = true
    setTimeout(() => galSaved.value = false, 2500)
  } finally {
    galSaving.value = false
  }
}

// ── Active tab ──────────────────────────────────────────
const tab = ref<'hero' | 'gallery'>('gallery')
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:20px">

    <!-- Header -->
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap">
      <div>
        <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#9ca3af;margin-bottom:6px">
          <NuxtLink to="/admin/pages" style="color:#9ca3af;text-decoration:none;transition:color .15s" onmouseover="this.style.color='#374151'" onmouseout="this.style.color='#9ca3af'">Страницы</NuxtLink>
          <Icon name="lucide:chevron-right" style="width:12px;height:12px"/>
          <span style="color:#374151">Главная</span>
        </div>
        <h1 class="adm-page-title">Главная страница</h1>
        <p class="adm-page-sub">Hero-изображение и галерея на главной странице сайта</p>
      </div>
      <a href="/" target="_blank" class="adm-btn adm-btn--ghost">
        <Icon name="lucide:external-link" style="width:15px;height:15px"/>Открыть сайт
      </a>
    </div>

    <!-- Tabs -->
    <div style="display:flex;gap:6px;background:#f4f5f7;padding:4px;border-radius:12px;width:fit-content">
      <button
        :class="['adm-tab-btn', tab === 'gallery' && 'adm-tab-btn--on']"
        @click="tab = 'gallery'"
      >
        <Icon name="lucide:images" style="width:15px;height:15px"/>Галерея
        <span style="font-size:11px;background:rgba(255,255,255,.15);padding:1px 7px;border-radius:10px;margin-left:2px">{{ photos.length }}</span>
      </button>
      <button
        :class="['adm-tab-btn', tab === 'hero' && 'adm-tab-btn--on']"
        @click="tab = 'hero'"
      >
        <Icon name="lucide:image" style="width:15px;height:15px"/>Hero-изображение
      </button>
    </div>

    <!-- ══ GALLERY TAB ══ -->
    <template v-if="tab === 'gallery'">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
        <p style="font-size:13px;color:#6b7280;margin:0">Фото отображаются в блоке галереи между «Наши работы» и «Этапами работы»</p>
        <button class="adm-btn adm-btn--primary" :disabled="galSaving" @click="saveGallery">
          <Icon :name="galSaved ? 'lucide:check' : galSaving ? 'lucide:loader' : 'lucide:save'" style="width:15px;height:15px" :class="galSaving && 'adm-spin'" />
          {{ galSaved ? 'Сохранено!' : galSaving ? 'Сохранение…' : 'Сохранить галерею' }}
        </button>
      </div>

      <!-- Multi-upload zone -->
      <AdminGalleryMultiUpload @add="addMultiple" />

      <!-- Empty -->
      <div v-if="photos.length === 0" class="adm-card" style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:56px;gap:14px;border:2px dashed #e8eaed;background:#fafafa">
        <Icon name="lucide:image-plus" style="width:44px;height:44px;color:#d1d5db"/>
        <p style="font-size:15px;font-weight:600;color:#6b7280;margin:0">Нет фотографий</p>
        <p style="font-size:13px;color:#9ca3af;margin:0;text-align:center">Добавьте фото — они появятся в галерее на главной странице</p>
        <button class="adm-btn adm-btn--primary" style="margin-top:6px" @click="addItem">
          <Icon name="lucide:plus" style="width:15px;height:15px"/>Добавить первое фото
        </button>
      </div>

      <!-- Photo grid -->
      <div v-else style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
        <div
          v-for="item in photos" :key="item.id"
          class="adm-card"
          :style="editingId === item.id
            ? 'grid-column:1/-1;padding:24px;border-color:#f5c800;box-shadow:0 0 0 3px rgba(245,200,0,.15)'
            : 'padding:0;overflow:hidden'"
        >
          <!-- View -->
          <template v-if="editingId !== item.id">
            <div class="gal-thumb">
              <img v-if="item.img" :src="item.img" :alt="item.title" class="gal-thumb__img"/>
              <div v-else class="gal-thumb__empty">
                <Icon name="lucide:image" style="width:28px;height:28px"/>
                <span style="font-size:12px">Нет фото</span>
              </div>
              <div class="gal-thumb__hover">
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

          <!-- Edit -->
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
                <Icon name="lucide:check" style="width:15px;height:15px"/>Применить
              </button>
            </div>
          </template>
        </div>

        <!-- Add -->
        <button class="gal-add" @click="addItem">
          <Icon name="lucide:plus" style="width:28px;height:28px"/>
          <span style="font-size:13px;font-weight:600">Добавить фото</span>
        </button>
      </div>
    </template>

    <!-- ══ HERO TAB ══ -->
    <template v-if="tab === 'hero'">
      <div style="display:grid;grid-template-columns:1fr 360px;gap:20px;align-items:start">
        <div class="adm-card adm-card--pad">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
            <h3 style="font-size:15px;font-weight:700;margin:0;color:#374151;display:flex;align-items:center;gap:8px">
              <Icon name="lucide:image" style="width:16px;height:16px;color:#9ca3af"/>Фотография hero
            </h3>
            <button class="adm-btn adm-btn--primary" :disabled="heroSaving" @click="saveHero">
              <Icon :name="heroSaved ? 'lucide:check' : heroSaving ? 'lucide:loader' : 'lucide:save'" style="width:15px;height:15px" :class="heroSaving && 'adm-spin'" />
              {{ heroSaved ? 'Сохранено!' : heroSaving ? 'Сохранение…' : 'Сохранить' }}
            </button>
          </div>
          <AdminImageUpload v-model="hero.img" label="Hero-изображение" />
          <div style="margin-top:16px">
            <label class="adm-label">Alt-текст</label>
            <input v-model="hero.title" class="adm-input" placeholder="Натяжные потолки ПроПотолок Иркутск"/>
          </div>
        </div>

        <div class="adm-card adm-card--pad">
          <h3 style="font-size:15px;font-weight:700;margin:0 0 14px;color:#374151;display:flex;align-items:center;gap:8px">
            <Icon name="lucide:eye" style="width:16px;height:16px;color:#9ca3af"/>Предпросмотр
          </h3>
          <div style="border-radius:12px;overflow:hidden;aspect-ratio:4/3;background:#f0f0f0">
            <img v-if="hero.img" :src="hero.img" :alt="hero.title" style="width:100%;height:100%;object-fit:cover;display:block"/>
            <div v-else style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#d1d5db">
              <Icon name="lucide:image" style="width:40px;height:40px"/>
              <span style="font-size:13px">Изображение не выбрано</span>
            </div>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<style scoped>
.gal-thumb {
  position: relative; aspect-ratio: 4/3;
  background: #f0f0f0; overflow: hidden;
}
.gal-thumb__img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform .3s;
}
.gal-thumb:hover .gal-thumb__img { transform: scale(1.04); }
.gal-thumb__empty {
  width: 100%; height: 100%;
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 6px; color: #d1d5db;
}
.gal-thumb__hover {
  position: absolute; inset: 0;
  background: rgba(0,0,0,.45);
  opacity: 0; transition: opacity .2s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.gal-thumb:hover .gal-thumb__hover { opacity: 1; }

.gal-add {
  aspect-ratio: 4/3;
  border: 2px dashed #e8eaed; border-radius: 14px;
  background: #fafafa; cursor: pointer;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 8px; color: #9ca3af;
  transition: border-color .15s, color .15s, background .15s;
}
.gal-add:hover {
  border-color: #f5c800; color: #92400e; background: #fefce8;
}
</style>
