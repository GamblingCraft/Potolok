<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

interface Certificate {
  id: number
  title: string
  desc: string
  num: string
  badge: string | null
  icon: string
  img: string
}

const { data, refresh } = await useFetch<Certificate[]>('/api/cms/certificates')
const certs = ref<Certificate[]>(JSON.parse(JSON.stringify(data.value ?? [])))
watch(data, v => { if (v) certs.value = JSON.parse(JSON.stringify(v)) })

const editId = ref<number | null>(null)
const drafts = ref<Record<number, Certificate>>({})
function draft(id: number) { return drafts.value[id]! }

function startEdit(c: Certificate) {
  drafts.value[c.id] = { ...c }
  editId.value = c.id
}
function cancelEdit() { editId.value = null }
function saveEdit(id: number) {
  const idx = certs.value.findIndex(c => c.id === id)
  if (idx !== -1) certs.value[idx] = { ...draft(id) }
  editId.value = null
}
function addCert() {
  const newId = Math.max(0, ...certs.value.map(c => c.id), 0) + 1
  const c: Certificate = { id: newId, title: 'Новый сертификат', desc: '', num: '', badge: null, icon: 'lucide:award', img: '' }
  certs.value.push(c)
  startEdit(c)
}
function deleteCert(id: number) {
  certs.value = certs.value.filter(c => c.id !== id)
  if (editId.value === id) editId.value = null
}

const saving = ref(false)
const saved = ref(false)
async function save() {
  saving.value = true
  try {
    await $fetch('/api/admin/certificates', { method: 'POST', body: certs.value })
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
    <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px">
      <div>
        <h1 class="adm-page-title">Сертификаты</h1>
        <p class="adm-page-sub">Отображаются на странице /sertifikaty</p>
      </div>
      <div style="display:flex;gap:10px">
        <button class="adm-btn adm-btn--ghost" @click="addCert">
          <Icon name="lucide:plus" style="width:15px;height:15px" />Добавить
        </button>
        <button class="adm-btn adm-btn--primary" :disabled="saving" @click="save">
          <Icon :name="saved ? 'lucide:check' : saving ? 'lucide:loader' : 'lucide:save'" style="width:15px;height:15px" :class="saving && 'adm-spin'" />
          {{ saved ? 'Сохранено!' : saving ? 'Сохранение…' : 'Сохранить' }}
        </button>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px">
      <div v-for="c in certs" :key="c.id" class="adm-card" style="overflow:hidden">

        <!-- View mode -->
        <template v-if="editId !== c.id">
          <div style="aspect-ratio:4/3;background:#f4f5f7;position:relative;overflow:hidden">
            <img v-if="c.img" :src="c.img" :alt="c.title" style="width:100%;height:100%;object-fit:cover" />
            <div v-else style="width:100%;height:100%;display:flex;align-items:center;justify-content:center">
              <Icon :name="c.icon || 'lucide:award'" style="width:40px;height:40px;color:#d1d5db" />
            </div>
            <span v-if="c.badge" style="position:absolute;top:8px;right:8px;background:#f5c800;color:#13131a;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px">{{ c.badge }}</span>
          </div>
          <div style="padding:12px 16px">
            <div style="font-size:14.5px;font-weight:700;color:#111827;margin-bottom:4px">{{ c.title }}</div>
            <div v-if="c.num" style="font-size:11.5px;color:#9ca3af;margin-bottom:6px;font-family:monospace">№ {{ c.num }}</div>
            <div style="font-size:13px;color:#6b7280;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">{{ c.desc }}</div>
          </div>
          <div style="border-top:1px solid #f4f5f7;padding:10px 16px;display:flex;gap:8px">
            <button class="adm-btn adm-btn--ghost" style="flex:1;justify-content:center;font-size:13px" @click="startEdit(c)">
              <Icon name="lucide:pencil" style="width:13px;height:13px" />Изменить
            </button>
            <button class="adm-btn adm-btn--danger" style="padding:7px 10px" @click="deleteCert(c.id)">
              <Icon name="lucide:trash-2" style="width:13px;height:13px" />
            </button>
          </div>
        </template>

        <!-- Edit mode -->
        <div v-else style="padding:16px;display:flex;flex-direction:column;gap:12px;background:#fffbeb;border-left:3px solid #f5c800">
          <AdminImageUpload v-model="draft(c.id).img" label="Изображение сертификата" />
          <div>
            <label class="adm-label">Название</label>
            <input v-model="draft(c.id).title" class="adm-input" />
          </div>
          <div>
            <label class="adm-label">Описание</label>
            <textarea v-model="draft(c.id).desc" class="adm-textarea" rows="3" />
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <div>
              <label class="adm-label">Номер</label>
              <input v-model="draft(c.id).num" class="adm-input" placeholder="C-RU.XX.00001" style="font-family:monospace;font-size:12.5px" />
            </div>
            <div>
              <label class="adm-label">Бейдж (необязательно)</label>
              <input v-model="draft(c.id).badge" class="adm-input" placeholder="MSD / Bauf" />
            </div>
          </div>
          <div>
            <label class="adm-label">Иконка (Lucide)</label>
            <input v-model="draft(c.id).icon" class="adm-input" placeholder="lucide:award" style="font-family:monospace;font-size:12.5px" />
          </div>
          <div style="display:flex;gap:8px">
            <button class="adm-btn adm-btn--ghost" @click="cancelEdit">Отмена</button>
            <button class="adm-btn adm-btn--primary" style="flex:1;justify-content:center" @click="saveEdit(c.id)">
              <Icon name="lucide:check" style="width:14px;height:14px" />Сохранить
            </button>
          </div>
        </div>

      </div>
    </div>

    <div v-if="!certs.length" style="padding:60px;text-align:center;color:#9ca3af;border:2px dashed #e8eaed;border-radius:12px">
      Сертификаты не добавлены — нажмите «Добавить»
    </div>
  </div>
</template>

<style scoped>
.adm-spin { animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
