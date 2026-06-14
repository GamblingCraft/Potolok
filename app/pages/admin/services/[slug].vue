<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

import { services, type Service } from '~/data/services'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const svc = computed(() => services.find(s => s.slug === slug.value))

if (!svc.value) {
  await navigateTo('/admin/services')
}

type Tab = 'hero' | 'gallery' | 'faq'
const tab = ref<Tab>('faq')

const form = reactive(JSON.parse(JSON.stringify(svc.value ?? {})) as Service)

// Load stored hero override
const { data: storedHero } = await useAsyncData(
  `svc-hero:${slug.value}`,
  () => $fetch<{ img: string; title: string } | null>(`/api/cms/page-hero/${slug.value}`).catch(() => null),
  { default: () => null },
)
if (storedHero.value?.img) form.img = storedHero.value.img

// Gallery
interface GalleryItem { id: number; src: string; alt: string }
const gallery = ref<GalleryItem[]>([
  { id: 1, src: form.img, alt: form.shortTitle },
])
const editingGalId = ref<number | null>(null)
const galDrafts = ref<Record<number, GalleryItem>>({})
function galDraft(id: number): GalleryItem { return galDrafts.value[id]! }
function startGalEdit(item: GalleryItem) {
  galDrafts.value[item.id] = { ...item }
  editingGalId.value = item.id
}
function saveGal(id: number) {
  const idx = gallery.value.findIndex(i => i.id === id)
  if (idx !== -1) gallery.value[idx] = { ...galDraft(id) }
  editingGalId.value = null
}
function addGalItem() {
  const newId = Math.max(0, ...gallery.value.map(i => i.id), 0) + 1
  const item: GalleryItem = { id: newId, src: '', alt: '' }
  gallery.value.push(item)
  startGalEdit(item)
}
function removeGalItem(id: number) {
  gallery.value = gallery.value.filter(i => i.id !== id)
  if (editingGalId.value === id) editingGalId.value = null
}

// FAQ — load from storage (falls back to pagesInfo defaults via API)
interface FaqItem { q: string; a: string }

const { data: pageContent, refresh: refreshContent } = await useAsyncData(
  `svc-page-content:${slug.value}`,
  () => $fetch<{ faqItems?: FaqItem[] }>(`/api/cms/page-content/${slug.value}`),
  { default: () => ({} as { faqItems?: FaqItem[] }) },
)

const faqs = ref<FaqItem[]>(pageContent.value?.faqItems ?? [])
watch(pageContent, v => { if (v?.faqItems) faqs.value = [...v.faqItems] })

const editingFaqIdx = ref<number | null>(null)
const faqDraft = ref<FaqItem>({ q: '', a: '' })

function startFaqEdit(idx: number) {
  faqDraft.value = { ...(faqs.value[idx] ?? { q: '', a: '' }) }
  editingFaqIdx.value = idx
}
function saveFaq() {
  if (editingFaqIdx.value === null) return
  if (editingFaqIdx.value >= faqs.value.length) {
    faqs.value.push({ ...faqDraft.value })
  } else {
    faqs.value[editingFaqIdx.value] = { ...faqDraft.value }
  }
  editingFaqIdx.value = null
}
function addFaq() {
  faqDraft.value = { q: '', a: '' }
  editingFaqIdx.value = faqs.value.length
}
function removeFaq(idx: number) {
  faqs.value.splice(idx, 1)
  if (editingFaqIdx.value === idx) editingFaqIdx.value = null
}

// Save — persists FAQ to Nitro storage
const saved  = ref(false)
const saving = ref(false)
async function save() {
  saving.value = true
  try {
    await Promise.all([
      $fetch('/api/admin/page-content', {
        method: 'POST',
        body: { slug: slug.value, content: { faqItems: faqs.value } },
      }),
      $fetch('/api/admin/page-hero', {
        method: 'POST',
        body: { slug: slug.value, hero: { img: form.img, title: form.title } },
      }),
    ])
    await refreshContent()
    saved.value = true
    setTimeout(() => saved.value = false, 2500)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div v-if="svc" style="display:flex;flex-direction:column;gap:20px">
    <!-- Header -->
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap">
      <div style="display:flex;align-items:center;gap:14px">
        <NuxtLink to="/admin/services" style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;background:#f4f5f7;border-radius:9px;color:#6b7280;text-decoration:none;flex-shrink:0;border:1px solid #e8eaed">
          <Icon name="lucide:arrow-left" style="width:16px;height:16px" />
        </NuxtLink>
        <div>
          <h1 class="adm-page-title">{{ svc.title }}</h1>
          <p class="adm-page-sub">Редактирование страницы услуги</p>
        </div>
      </div>
      <button class="adm-btn adm-btn--primary" :disabled="saving" @click="save">
        <Icon :name="saving ? 'lucide:loader-2' : saved ? 'lucide:check' : 'lucide:save'" :style="{ width:'15px', height:'15px', animation: saving ? 'spin 1s linear infinite' : 'none' }" />
        {{ saving ? 'Сохранение…' : saved ? 'Сохранено!' : 'Сохранить' }}
      </button>
    </div>

    <!-- Tabs -->
    <div style="display:flex;gap:4px;background:#f4f5f7;padding:4px;border-radius:11px;width:fit-content">
      <button v-for="t in ([['hero','lucide:layout','Hero'], ['gallery','lucide:images','Галерея'], ['faq','lucide:help-circle','FAQ']] as const)"
        :key="t[0]" @click="tab = t[0]"
        :class="['adm-tab-btn', tab === t[0] && 'adm-tab-btn--on']">
        <Icon :name="t[1]" style="width:14px;height:14px" />{{ t[2] }}
      </button>
    </div>

    <!-- Hero Tab -->
    <div v-if="tab === 'hero'" style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div class="adm-card adm-card--pad" style="grid-column:1/3">
        <h3 style="font-size:15px;font-weight:700;margin:0 0 16px;color:#374151">Изображение услуги</h3>
        <AdminImageUpload v-model="form.img" label="Главное изображение" />
      </div>
      <div class="adm-card adm-card--pad">
        <h3 style="font-size:15px;font-weight:700;margin:0 0 16px;color:#374151">Основная информация</h3>
        <div style="display:flex;flex-direction:column;gap:12px">
          <div>
            <label class="adm-label">Название</label>
            <input v-model="form.title" class="adm-input" />
          </div>
          <div>
            <label class="adm-label">Краткое название</label>
            <input v-model="form.shortTitle" class="adm-input" />
          </div>
          <div>
            <label class="adm-label">Описание</label>
            <textarea v-model="form.description" rows="4" class="adm-input" style="resize:vertical" />
          </div>
          <div v-if="svc.badge !== undefined">
            <label class="adm-label">Бейдж (метка)</label>
            <input v-model="(form as any).badge" class="adm-input" placeholder="Хит, Бесплатно, Срочно..." />
          </div>
        </div>
      </div>
      <div class="adm-card adm-card--pad">
        <h3 style="font-size:15px;font-weight:700;margin:0 0 16px;color:#374151">Цена и сроки</h3>
        <div style="display:flex;flex-direction:column;gap:12px">
          <div>
            <label class="adm-label">Цена</label>
            <input v-model="form.price" class="adm-input" placeholder="от 159 ₽/м², Бесплатно..." />
          </div>
          <div>
            <label class="adm-label">Примечание к цене</label>
            <input v-model="(form as any).priceNote" class="adm-input" placeholder="При заказе полотна..." />
          </div>
          <div>
            <label class="adm-label">Длительность</label>
            <input v-model="form.duration" class="adm-input" placeholder="1–4 часа, 1 день..." />
          </div>
          <div>
            <label class="adm-label">Иконка (Nuxt Icon)</label>
            <input v-model="form.icon" class="adm-input" placeholder="lucide:hammer" />
          </div>
        </div>
        <h3 style="font-size:15px;font-weight:700;margin:16px 0 12px;color:#374151">Что включено</h3>
        <div style="display:flex;flex-direction:column;gap:6px">
          <div v-for="(f, idx) in form.features" :key="idx" style="display:flex;gap:8px;align-items:center">
            <input v-model="form.features[idx]" class="adm-input" style="flex:1" />
            <button @click="form.features.splice(idx, 1)" style="padding:6px;background:#fef2f2;border:1px solid #fecaca;border-radius:7px;cursor:pointer;color:#ef4444">
              <Icon name="lucide:x" style="width:13px;height:13px" />
            </button>
          </div>
          <button class="adm-btn adm-btn--ghost" style="margin-top:4px;font-size:13px" @click="form.features.push('')">
            <Icon name="lucide:plus" style="width:13px;height:13px" />Добавить пункт
          </button>
        </div>
      </div>
    </div>

    <!-- Gallery Tab -->
    <div v-if="tab === 'gallery'" style="display:flex;flex-direction:column;gap:14px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <p class="adm-page-sub">{{ gallery.length }} фото в галерее</p>
        <button class="adm-btn adm-btn--primary" @click="addGalItem">
          <Icon name="lucide:plus" style="width:14px;height:14px" />Добавить фото
        </button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px">
        <template v-for="item in gallery" :key="item.id">
          <!-- Editing state -->
          <div v-if="editingGalId === item.id" class="adm-card adm-card--pad adm-gal-edit">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
              <span style="font-size:13px;font-weight:600;color:#374151">Редактирование фото</span>
              <button @click="editingGalId = null" style="background:none;border:none;cursor:pointer;color:#9ca3af;padding:4px">
                <Icon name="lucide:x" style="width:15px;height:15px" />
              </button>
            </div>
            <AdminImageUpload v-model="galDraft(item.id).src" label="Изображение" style="margin-bottom:10px" />
            <label class="adm-label">Alt-текст</label>
            <input v-model="galDraft(item.id).alt" class="adm-input" style="margin-bottom:12px" />
            <div style="display:flex;gap:8px">
              <button class="adm-btn adm-btn--primary" style="flex:1;justify-content:center" @click="saveGal(item.id)">
                <Icon name="lucide:check" style="width:13px;height:13px" />Сохранить
              </button>
              <button class="adm-btn adm-btn--ghost" style="color:#ef4444;border-color:#fecaca" @click="removeGalItem(item.id)">
                <Icon name="lucide:trash-2" style="width:13px;height:13px" />
              </button>
            </div>
          </div>
          <!-- View state -->
          <div v-else class="adm-gal-card">
            <div class="adm-gal-img-wrap">
              <img v-if="item.src" :src="item.src" :alt="item.alt" class="adm-gal-img" />
              <div v-else class="adm-gal-empty"><Icon name="lucide:image" style="width:28px;height:28px;color:#d1d5db" /></div>
              <div class="adm-gal-overlay">
                <button class="adm-gal-act" @click="startGalEdit(item)"><Icon name="lucide:pencil" style="width:14px;height:14px" /></button>
                <button class="adm-gal-act adm-gal-act--del" @click="removeGalItem(item.id)"><Icon name="lucide:trash-2" style="width:14px;height:14px" /></button>
              </div>
            </div>
            <div style="padding:10px 12px">
              <p style="font-size:12.5px;color:#6b7280;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ item.alt || '—' }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- FAQ Tab -->
    <div v-if="tab === 'faq'" style="display:flex;flex-direction:column;gap:12px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <p class="adm-page-sub">{{ faqs.length }} вопросов</p>
        <button class="adm-btn adm-btn--primary" @click="addFaq">
          <Icon name="lucide:plus" style="width:14px;height:14px" />Добавить вопрос
        </button>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <template v-for="(faq, idx) in faqs" :key="idx">
          <div v-if="editingFaqIdx === idx" class="adm-card adm-card--pad" style="border-left:3px solid #f5c800;background:#fffef0">
            <label class="adm-label">Вопрос</label>
            <input v-model="faqDraft.q" class="adm-input" style="margin-bottom:10px" />
            <label class="adm-label">Ответ</label>
            <textarea v-model="faqDraft.a" rows="3" class="adm-input" style="resize:vertical;margin-bottom:12px" />
            <div style="display:flex;gap:8px">
              <button class="adm-btn adm-btn--primary" @click="saveFaq">
                <Icon name="lucide:check" style="width:13px;height:13px" />Сохранить
              </button>
              <button class="adm-btn adm-btn--ghost" @click="editingFaqIdx = null">Отмена</button>
              <button class="adm-btn adm-btn--ghost" style="color:#ef4444;border-color:#fecaca;margin-left:auto" @click="removeFaq(idx)">
                <Icon name="lucide:trash-2" style="width:13px;height:13px" />
              </button>
            </div>
          </div>
          <div v-else class="adm-card" style="display:flex;align-items:flex-start;gap:14px;padding:14px 18px;cursor:pointer" @click="startFaqEdit(idx)">
            <div style="width:28px;height:28px;background:#fef9c3;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">
              <span style="font-size:13px;font-weight:700;color:#a16207">?</span>
            </div>
            <div style="flex:1;min-width:0">
              <div style="font-size:14.5px;font-weight:600;color:#111827">{{ faq.q }}</div>
              <div style="font-size:13px;color:#6b7280;margin-top:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ faq.a }}</div>
            </div>
            <Icon name="lucide:pencil" style="width:14px;height:14px;color:#d1d5db;flex-shrink:0;margin-top:3px" />
          </div>
        </template>
        <div v-if="editingFaqIdx === faqs.length" class="adm-card adm-card--pad" style="border-left:3px solid #f5c800;background:#fffef0">
          <label class="adm-label">Вопрос</label>
          <input v-model="faqDraft.q" class="adm-input" style="margin-bottom:10px" />
          <label class="adm-label">Ответ</label>
          <textarea v-model="faqDraft.a" rows="3" class="adm-input" style="resize:vertical;margin-bottom:12px" />
          <div style="display:flex;gap:8px">
            <button class="adm-btn adm-btn--primary" @click="saveFaq">
              <Icon name="lucide:check" style="width:13px;height:13px" />Сохранить
            </button>
            <button class="adm-btn adm-btn--ghost" @click="editingFaqIdx = null">Отмена</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.adm-tab-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 14px; border-radius: 8px; border: none;
  background: transparent; cursor: pointer;
  font-size: 13.5px; font-weight: 500; color: #6b7280;
  transition: all .15s;
}
.adm-tab-btn--on {
  background: #fff; color: #111827; font-weight: 600;
  box-shadow: 0 1px 4px rgba(0,0,0,.1);
}
.adm-gal-edit {
  grid-column: span 2;
}
.adm-gal-card {
  background: #fff; border: 1.5px solid #e8eaed;
  border-radius: 12px; overflow: hidden;
  transition: border-color .15s;
}
.adm-gal-card:hover { border-color: #d1d5db; }
.adm-gal-img-wrap {
  position: relative; aspect-ratio: 4/3; overflow: hidden;
  background: #f4f5f7;
}
.adm-gal-img { width: 100%; height: 100%; object-fit: cover; }
.adm-gal-empty {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
}
.adm-gal-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,.45);
  display: flex; align-items: center; justify-content: center; gap: 8px;
  opacity: 0; transition: opacity .15s;
}
.adm-gal-img-wrap:hover .adm-gal-overlay { opacity: 1; }
.adm-gal-act {
  width: 36px; height: 36px; border-radius: 10px;
  background: rgba(255,255,255,.9); border: none;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #374151;
  transition: background .15s;
}
.adm-gal-act:hover { background: #fff; }
.adm-gal-act--del:hover { color: #ef4444; }
</style>
