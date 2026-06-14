<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

import { faktury, vidy, pomeshcheniya, brendy, tsveta } from '~/data/catalog'
import type { GalleryItem } from '~/data/gallery'

const route = useRoute()
const slug  = computed(() => route.params.slug as string)

const allPages = [...faktury, ...vidy, ...pomeshcheniya, ...brendy, ...tsveta]
const page     = computed(() => allPages.find(p => p.slug.split('/').pop() === slug.value))

const tab = ref<'hero'|'gallery'|'portfolio'|'faq'>('faq')

// ── Hero ──────────────────────────────────────────────
const hero = reactive({
  img:   page.value?.img ?? '',
  title: page.value?.title ?? '',
  price: (page.value as any)?.price ?? 0,
})

const { data: storedHero } = await useAsyncData(
  `page-hero:${slug.value}`,
  () => $fetch<{ img: string; title: string } | null>(`/api/cms/page-hero/${slug.value}`).catch(() => null),
  { default: () => null },
)
if (storedHero.value?.img)   hero.img   = storedHero.value.img
if (storedHero.value?.title) hero.title = storedHero.value.title

// ── Gallery (отдельные фото страницы) ─────────────────
const { data: galleryApiData, refresh: refreshGallery } = await useAsyncData(
  `page-gallery:${slug.value}`,
  () => $fetch<GalleryItem[]>(`/api/cms/page-gallery/${slug.value}`),
  { default: () => [] as GalleryItem[] },
)
const gallery    = ref<GalleryItem[]>(JSON.parse(JSON.stringify(galleryApiData.value ?? [])))
const editGallId = ref<number | null>(null)
const galDrafts  = ref<Record<number, GalleryItem>>({})

watch(galleryApiData, v => {
  if (v) gallery.value = JSON.parse(JSON.stringify(v))
})

function gd(id: number) { return galDrafts.value[id]! }

function startGalEdit(item: GalleryItem) {
  galDrafts.value[item.id] = { ...item, details: [...(item.details ?? [])] }
  editGallId.value = item.id
}
function saveGalEdit(id: number) {
  const idx = gallery.value.findIndex(i => i.id === id)
  if (idx !== -1) gallery.value[idx] = { ...gd(id) }
  editGallId.value = null
}
function addGalleryItem() {
  const newId = Math.max(0, ...gallery.value.map(i => i.id), 0) + 1
  const item: GalleryItem = { id: newId, img: '', title: 'Новое фото', area: 0, room: '', price: 0, details: [] }
  gallery.value.unshift(item)
  startGalEdit(item)
}
function deleteGalItem(id: number) {
  gallery.value = gallery.value.filter(i => i.id !== id)
  if (editGallId.value === id) editGallId.value = null
}

// ── Portfolio (Готовые работы) ────────────────────────
const { data: portfolioApiData, refresh: refreshPortfolio } = await useAsyncData(
  `portfolio:${slug.value}`,
  () => $fetch<GalleryItem[]>(`/api/cms/gallery/${slug.value}`),
  { default: () => [] as GalleryItem[] },
)
const portfolio    = ref<GalleryItem[]>(JSON.parse(JSON.stringify(portfolioApiData.value ?? [])))
const editPortId   = ref<number | null>(null)
const portDrafts   = ref<Record<number, GalleryItem>>({})

watch(portfolioApiData, v => {
  if (v) portfolio.value = JSON.parse(JSON.stringify(v))
})

function pd(id: number) { return portDrafts.value[id]! }

function startPortEdit(item: GalleryItem) {
  portDrafts.value[item.id] = { ...item, details: [...(item.details ?? [])] }
  editPortId.value = item.id
}
function savePortEdit(id: number) {
  const idx = portfolio.value.findIndex(i => i.id === id)
  if (idx !== -1) portfolio.value[idx] = { ...pd(id) }
  editPortId.value = null
}
function addPortItem() {
  const newId = Math.max(0, ...portfolio.value.map(i => i.id), 0) + 1
  const item: GalleryItem = { id: newId, img: '', title: 'Новая работа', area: 0, room: '', price: 0, details: [] }
  portfolio.value.unshift(item)
  startPortEdit(item)
}
function deletePortItem(id: number) {
  portfolio.value = portfolio.value.filter(i => i.id !== id)
  if (editPortId.value === id) editPortId.value = null
}

// ── FAQ ───────────────────────────────────────────────
const { data: pageContent } = await useAsyncData(
  `page-content:${slug.value}`,
  () => $fetch<{ faqItems?: { q: string; a: string }[] }>(`/api/cms/page-content/${slug.value}`),
  { default: () => ({} as { faqItems?: { q: string; a: string }[] }) },
)

const faqItems   = ref<{ q: string; a: string }[]>(pageContent.value?.faqItems ?? [])
const editFaqIdx = ref<number | null>(null)
const faqDraft   = ref({ q: '', a: '' })

watch(pageContent, v => {
  if (v?.faqItems) faqItems.value = [...v.faqItems]
})

function startFaqEdit(idx: number) {
  editFaqIdx.value = idx
  faqDraft.value = { ...faqItems.value[idx]! }
}
function saveFaq() {
  if (editFaqIdx.value !== null) faqItems.value[editFaqIdx.value] = { ...faqDraft.value }
  editFaqIdx.value = null
}
function addFaq() {
  faqItems.value.push({ q: 'Новый вопрос', a: 'Ответ' })
  startFaqEdit(faqItems.value.length - 1)
}
function deleteFaq(idx: number) {
  faqItems.value.splice(idx, 1)
  if (editFaqIdx.value === idx) editFaqIdx.value = null
}

// ── Save all ──────────────────────────────────────────
const saved  = ref(false)
const saving = ref(false)

async function save() {
  saving.value = true
  try {
    await Promise.all([
      $fetch('/api/admin/page-content', {
        method: 'POST',
        body: { slug: slug.value, content: { faqItems: faqItems.value } },
      }),
      $fetch('/api/admin/page-gallery', {
        method: 'POST',
        body: { slug: slug.value, items: gallery.value },
      }),
      $fetch('/api/admin/gallery', {
        method: 'POST',
        body: { slug: slug.value, items: portfolio.value },
      }),
      $fetch('/api/admin/page-hero', {
        method: 'POST',
        body: { slug: slug.value, hero: { img: hero.img, title: hero.title } },
      }),
    ])
    await Promise.all([refreshGallery(), refreshPortfolio()])
    saved.value = true
    setTimeout(() => saved.value = false, 2500)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="adm-pageed">

    <!-- Header -->
    <div class="adm-pageed__head">
      <div style="display:flex;align-items:center;gap:12px">
        <NuxtLink to="/admin/catalog" class="adm-btn adm-btn--ghost" style="padding:7px 10px">
          <Icon name="lucide:arrow-left" style="width:15px;height:15px" />
        </NuxtLink>
        <div>
          <h1 class="adm-page-title" style="margin:0">{{ page?.title ?? slug }}</h1>
          <p class="adm-page-sub" style="margin:0">Редактирование страницы каталога</p>
        </div>
      </div>
      <div style="display:flex;gap:10px;align-items:center">
        <a :href="page?.slug ?? '#'" target="_blank" class="adm-btn adm-btn--ghost" style="font-size:13px">
          <Icon name="lucide:external-link" style="width:14px;height:14px" />На сайте
        </a>
        <button class="adm-btn adm-btn--primary" :disabled="saving" @click="save">
          <Icon :name="saved ? 'lucide:check' : saving ? 'lucide:loader' : 'lucide:save'" style="width:15px;height:15px" :class="saving && 'adm-spin'" />
          {{ saved ? 'Сохранено!' : saving ? 'Сохранение…' : 'Сохранить всё' }}
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="adm-pageed__tabs">
      <button v-for="t in [
        { id:'faq',       label:`FAQ (${faqItems.length})`,           icon:'lucide:help-circle' },
        { id:'portfolio', label:`Готовые работы (${portfolio.length})`, icon:'lucide:layout-grid' },
        { id:'gallery',   label:`Галерея (${gallery.length})`,         icon:'lucide:images' },
        { id:'hero',      label:'Hero секция',                         icon:'lucide:image' },
      ]" :key="t.id"
        class="adm-pageed__tab"
        :class="tab === t.id && 'adm-pageed__tab--on'"
        @click="tab = t.id as any"
      >
        <Icon :name="t.icon" style="width:15px;height:15px" />
        {{ t.label }}
      </button>
    </div>

    <!-- ── FAQ ── -->
    <div v-if="tab === 'faq'">
      <div style="display:flex;justify-content:flex-end;margin-bottom:12px">
        <button class="adm-btn adm-btn--primary" @click="addFaq">
          <Icon name="lucide:plus" style="width:15px;height:15px" />Добавить вопрос
        </button>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div
          v-for="(item, idx) in faqItems"
          :key="idx"
          class="adm-card"
          :class="editFaqIdx === idx ? 'adm-card--edit' : ''"
          style="overflow:hidden"
        >
          <div v-if="editFaqIdx !== idx" style="padding:14px 16px;display:flex;align-items:flex-start;gap:12px" class="adm-faq-row">
            <div style="width:24px;height:24px;background:#f4f5f7;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#6b7280;flex-shrink:0;margin-top:2px">{{ idx+1 }}</div>
            <div style="flex:1;min-width:0">
              <div style="font-size:14.5px;font-weight:600;color:#111827;margin-bottom:4px">{{ item.q }}</div>
              <div style="font-size:13px;color:#6b7280;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">{{ item.a }}</div>
            </div>
            <div style="display:flex;gap:6px;flex-shrink:0;opacity:0" class="adm-faq-row__actions">
              <button class="adm-btn adm-btn--ghost" style="padding:5px 9px;font-size:12px" @click="startFaqEdit(idx)">
                <Icon name="lucide:pencil" style="width:13px;height:13px" />
              </button>
              <button class="adm-btn adm-btn--danger" style="padding:5px 9px;font-size:12px" @click="deleteFaq(idx)">
                <Icon name="lucide:trash-2" style="width:13px;height:13px" />
              </button>
            </div>
          </div>
          <div v-else style="padding:16px;background:#fffbeb;display:flex;flex-direction:column;gap:10px;border-left:3px solid #f5c800">
            <input v-model="faqDraft.q" class="adm-input" placeholder="Вопрос" />
            <textarea v-model="faqDraft.a" class="adm-textarea" rows="4" placeholder="Ответ" />
            <div style="display:flex;gap:8px">
              <button class="adm-btn adm-btn--ghost" @click="editFaqIdx = null">Отмена</button>
              <button class="adm-btn adm-btn--primary" @click="saveFaq">
                <Icon name="lucide:check" style="width:14px;height:14px" />Сохранить
              </button>
            </div>
          </div>
        </div>
        <div v-if="!faqItems.length" style="padding:40px;text-align:center;color:#9ca3af;border:2px dashed #e8eaed;border-radius:12px">
          FAQ пока пуст — нажмите «Добавить вопрос»
        </div>
      </div>
    </div>

    <!-- ── PORTFOLIO (Готовые работы) ── -->
    <div v-if="tab === 'portfolio'">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <p style="font-size:13px;color:#6b7280;margin:0">Готовые работы — показываются на странице каталога с ценой, площадью и деталями монтажа.</p>
        <button class="adm-btn adm-btn--primary" @click="addPortItem">
          <Icon name="lucide:plus" style="width:15px;height:15px" />Добавить работу
        </button>
      </div>
      <div v-if="portfolio.length" class="adm-gal-grid">
        <div
          v-for="item in portfolio" :key="item.id"
          class="adm-gal-card"
          :class="editPortId === item.id && 'adm-gal-card--edit'"
        >
          <template v-if="editPortId !== item.id">
            <div class="adm-gal-card__img">
              <img v-if="item.img" :src="item.img" :alt="item.title" />
              <div v-else class="adm-gal-card__noimg"><Icon name="lucide:image" style="width:28px;height:28px" /></div>
              <div class="adm-gal-card__ov">
                <button class="adm-gal-card__btn" @click="startPortEdit(item)">
                  <Icon name="lucide:pencil" style="width:14px;height:14px" />Изменить
                </button>
                <button class="adm-gal-card__del" @click="deletePortItem(item.id)">
                  <Icon name="lucide:trash-2" style="width:14px;height:14px" />
                </button>
              </div>
            </div>
            <div style="padding:10px 12px">
              <div style="font-size:13.5px;font-weight:600;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ item.title }}</div>
              <div style="font-size:12px;color:#9ca3af;margin-top:2px">{{ item.room }} · {{ item.area }} м² · {{ item.price?.toLocaleString('ru') }} ₽</div>
              <div v-if="item.details?.length" style="margin-top:6px;display:flex;flex-wrap:wrap;gap:4px">
                <span v-for="d in item.details" :key="d" class="adm-tag" style="font-size:10.5px">{{ d }}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div style="padding:16px;display:flex;flex-direction:column;gap:10px">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:13px;font-weight:700;color:#92400e">Редактирование работы</span>
                <button class="adm-btn adm-btn--ghost" style="padding:5px 10px;font-size:12px" @click="editPortId = null">Отмена</button>
              </div>
              <AdminImageUpload v-model="pd(item.id).img" />
              <input v-model="pd(item.id).title" class="adm-input" placeholder="Название" />
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
                <input v-model="pd(item.id).room" class="adm-input" placeholder="Помещение" style="font-size:12px;padding:7px 10px" />
                <input v-model.number="pd(item.id).area" type="number" class="adm-input" placeholder="м²" style="font-size:12px;padding:7px 10px" />
                <input v-model.number="pd(item.id).price" type="number" class="adm-input" placeholder="₽" style="font-size:12px;padding:7px 10px" />
              </div>
              <div>
                <label class="adm-label">Детали (каждая с новой строки)</label>
                <textarea
                  :value="pd(item.id).details?.join('\n')"
                  class="adm-textarea" rows="3"
                  placeholder="Clipso без ПВХ&#10;Споты: 5 шт"
                  @input="(e) => pd(item.id).details = (e.target as HTMLTextAreaElement).value.split('\n').filter(Boolean)"
                />
              </div>
              <div style="display:flex;gap:8px">
                <button class="adm-btn adm-btn--ghost" @click="editPortId = null">Отмена</button>
                <button class="adm-btn adm-btn--primary" style="flex:1;justify-content:center" @click="savePortEdit(item.id)">
                  <Icon name="lucide:check" style="width:14px;height:14px" />Применить
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div v-else style="padding:48px;text-align:center;color:#9ca3af;border:2px dashed #e8eaed;border-radius:12px">
        <Icon name="lucide:layout-grid" style="width:40px;height:40px;margin-bottom:12px;opacity:.3" />
        <p style="font-size:14px;margin:0">Готовых работ ещё нет — добавьте первую</p>
      </div>
    </div>

    <!-- ── GALLERY (Фотогалерея страницы) ── -->
    <div v-if="tab === 'gallery'">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <p style="font-size:13px;color:#6b7280;margin:0">Фотогалерея — дополнительные фото для страницы (отдельно от готовых работ).</p>
        <button class="adm-btn adm-btn--primary" @click="addGalleryItem">
          <Icon name="lucide:plus" style="width:15px;height:15px" />Добавить фото
        </button>
      </div>
      <div v-if="gallery.length" class="adm-gal-grid">
        <div
          v-for="item in gallery" :key="item.id"
          class="adm-gal-card"
          :class="editGallId === item.id && 'adm-gal-card--edit'"
        >
          <template v-if="editGallId !== item.id">
            <div class="adm-gal-card__img">
              <img v-if="item.img" :src="item.img" :alt="item.title" />
              <div v-else class="adm-gal-card__noimg"><Icon name="lucide:image" style="width:28px;height:28px" /></div>
              <div class="adm-gal-card__ov">
                <button class="adm-gal-card__btn" @click="startGalEdit(item)">
                  <Icon name="lucide:pencil" style="width:14px;height:14px" />Изменить
                </button>
                <button class="adm-gal-card__del" @click="deleteGalItem(item.id)">
                  <Icon name="lucide:trash-2" style="width:14px;height:14px" />
                </button>
              </div>
            </div>
            <div style="padding:10px 12px">
              <div style="font-size:13.5px;font-weight:600;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ item.title }}</div>
              <div style="font-size:12px;color:#9ca3af;margin-top:2px">{{ item.room }} · {{ item.area }} м²</div>
            </div>
          </template>
          <template v-else>
            <div style="padding:16px;display:flex;flex-direction:column;gap:10px">
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:13px;font-weight:700;color:#92400e">Редактирование фото</span>
                <button class="adm-btn adm-btn--ghost" style="padding:5px 10px;font-size:12px" @click="editGallId = null">Отмена</button>
              </div>
              <AdminImageUpload v-model="gd(item.id).img" />
              <input v-model="gd(item.id).title" class="adm-input" placeholder="Описание фото" />
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                <input v-model="gd(item.id).room" class="adm-input" placeholder="Помещение" style="font-size:12px;padding:7px 10px" />
                <input v-model.number="gd(item.id).area" type="number" class="adm-input" placeholder="м²" style="font-size:12px;padding:7px 10px" />
              </div>
              <div style="display:flex;gap:8px">
                <button class="adm-btn adm-btn--ghost" @click="editGallId = null">Отмена</button>
                <button class="adm-btn adm-btn--primary" style="flex:1;justify-content:center" @click="saveGalEdit(item.id)">
                  <Icon name="lucide:check" style="width:14px;height:14px" />Применить
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div v-else style="padding:48px;text-align:center;color:#9ca3af;border:2px dashed #e8eaed;border-radius:12px">
        <Icon name="lucide:images" style="width:40px;height:40px;margin-bottom:12px;opacity:.3" />
        <p style="font-size:14px;margin:0">Галерея пуста — добавьте первое фото</p>
      </div>
    </div>

    <!-- ── HERO ── -->
    <div v-if="tab === 'hero'" class="adm-card adm-card--pad">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
        <AdminImageUpload v-model="hero.img" label="Главное изображение (Hero)" />
        <div style="display:flex;flex-direction:column;gap:12px">
          <div>
            <label class="adm-label">Заголовок страницы</label>
            <input v-model="hero.title" class="adm-input" />
          </div>
          <div>
            <label class="adm-label">Цена от (₽/м²)</label>
            <input v-model.number="hero.price" type="number" class="adm-input" style="max-width:180px" />
          </div>
          <p style="font-size:12.5px;color:#9ca3af;margin:4px 0 0">Описание и текст Hero задаются в .vue файле страницы.</p>
        </div>
      </div>
    </div>

  </div>
</template>

<style>
.adm-pageed { display: flex; flex-direction: column; gap: 16px; }
.adm-pageed__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.adm-pageed__tabs { display: flex; gap: 4px; background: #fff; border: 1px solid #e8eaed; border-radius: 12px; padding: 4px; flex-wrap: wrap; }
.adm-pageed__tab {
  display: flex; align-items: center; gap: 7px;
  padding: 8px 14px; border-radius: 9px;
  font-size: 13.5px; font-weight: 500; color: #6b7280;
  background: none; border: none; cursor: pointer;
  font-family: inherit; transition: background .15s, color .15s;
}
.adm-pageed__tab:hover { background: #f4f5f7; color: #374151; }
.adm-pageed__tab--on { background: #13131a !important; color: #f5c800 !important; font-weight: 700; }
.adm-card--edit { border-color: #f5c800 !important; border-width: 2px; }

.adm-gal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.adm-gal-card { background: #fff; border-radius: 12px; border: 1px solid #e8eaed; overflow: hidden; transition: border-color .15s; }
.adm-gal-card--edit { border-color: #f5c800; border-width: 2px; grid-column: span 3; }
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

.adm-faq-row:hover .adm-faq-row__actions { opacity: 1 !important; }
.adm-faq-row__actions { transition: opacity .15s; }
</style>
