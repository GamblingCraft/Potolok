<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

interface TeamMember {
  id: number
  name: string
  role: string
  exp: string
  photo: string
  skills: string[]
}

const { data, refresh } = await useFetch<TeamMember[]>('/api/cms/team')
const members = ref<TeamMember[]>(JSON.parse(JSON.stringify(data.value ?? [])))
watch(data, v => { if (v) members.value = JSON.parse(JSON.stringify(v)) })

const editId = ref<number | null>(null)
const drafts = ref<Record<number, TeamMember>>({})
function draft(id: number) { return drafts.value[id]! }

function startEdit(m: TeamMember) {
  drafts.value[m.id] = { ...m, skills: [...m.skills] }
  editId.value = m.id
}
function cancelEdit() { editId.value = null }
function saveEdit(id: number) {
  const idx = members.value.findIndex(m => m.id === id)
  if (idx !== -1) members.value[idx] = { ...draft(id) }
  editId.value = null
}
function addMember() {
  const newId = Math.max(0, ...members.value.map(m => m.id), 0) + 1
  const m: TeamMember = { id: newId, name: 'Новый сотрудник', role: 'Должность', exp: '1 год', photo: '', skills: [] }
  members.value.push(m)
  startEdit(m)
}
function deleteMember(id: number) {
  members.value = members.value.filter(m => m.id !== id)
  if (editId.value === id) editId.value = null
}
function addSkill(id: number) {
  draft(id).skills.push('')
}
function removeSkill(id: number, idx: number) {
  draft(id).skills.splice(idx, 1)
}

const saving = ref(false)
const saved = ref(false)
async function save() {
  saving.value = true
  try {
    await $fetch('/api/admin/team', { method: 'POST', body: members.value })
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
        <h1 class="adm-page-title">Команда</h1>
        <p class="adm-page-sub">Сотрудники отображаются на странице «О компании»</p>
      </div>
      <div style="display:flex;gap:10px">
        <button class="adm-btn adm-btn--ghost" @click="addMember">
          <Icon name="lucide:plus" style="width:15px;height:15px" />Добавить
        </button>
        <button class="adm-btn adm-btn--primary" :disabled="saving" @click="save">
          <Icon :name="saved ? 'lucide:check' : saving ? 'lucide:loader' : 'lucide:save'" style="width:15px;height:15px" :class="saving && 'adm-spin'" />
          {{ saved ? 'Сохранено!' : saving ? 'Сохранение…' : 'Сохранить' }}
        </button>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px">
      <div v-for="m in members" :key="m.id" class="adm-card" style="overflow:hidden">

        <!-- View mode -->
        <template v-if="editId !== m.id">
          <div style="padding:16px;display:flex;gap:14px;align-items:flex-start">
            <div style="width:64px;height:64px;border-radius:50%;overflow:hidden;flex-shrink:0;background:#f4f5f7;border:2px solid #e8eaed">
              <img v-if="m.photo" :src="m.photo" :alt="m.name" style="width:100%;height:100%;object-fit:cover" />
              <div v-else style="width:100%;height:100%;display:flex;align-items:center;justify-content:center">
                <Icon name="lucide:user" style="width:28px;height:28px;color:#d1d5db" />
              </div>
            </div>
            <div style="flex:1;min-width:0">
              <div style="font-size:15px;font-weight:700;color:#111827">{{ m.name }}</div>
              <div style="font-size:13px;color:#6b7280;margin-top:2px">{{ m.role }}</div>
              <div style="font-size:12px;color:#9ca3af;margin-top:2px">Опыт: {{ m.exp }}</div>
              <div v-if="m.skills.length" style="display:flex;flex-wrap:wrap;gap:4px;margin-top:8px">
                <span v-for="s in m.skills" :key="s" class="adm-tag" style="font-size:11px">{{ s }}</span>
              </div>
            </div>
          </div>
          <div style="border-top:1px solid #f4f5f7;padding:10px 16px;display:flex;gap:8px">
            <button class="adm-btn adm-btn--ghost" style="flex:1;justify-content:center;font-size:13px" @click="startEdit(m)">
              <Icon name="lucide:pencil" style="width:13px;height:13px" />Изменить
            </button>
            <button class="adm-btn adm-btn--danger" style="padding:7px 10px" @click="deleteMember(m.id)">
              <Icon name="lucide:trash-2" style="width:13px;height:13px" />
            </button>
          </div>
        </template>

        <!-- Edit mode -->
        <div v-else style="padding:16px;display:flex;flex-direction:column;gap:12px;background:#fffbeb;border-left:3px solid #f5c800">
          <AdminImageUpload v-model="draft(m.id).photo" label="Фото сотрудника" />
          <div>
            <label class="adm-label">Имя</label>
            <input v-model="draft(m.id).name" class="adm-input" />
          </div>
          <div>
            <label class="adm-label">Должность</label>
            <input v-model="draft(m.id).role" class="adm-input" />
          </div>
          <div>
            <label class="adm-label">Опыт</label>
            <input v-model="draft(m.id).exp" class="adm-input" placeholder="12 лет" style="max-width:160px" />
          </div>
          <div>
            <label class="adm-label">Навыки</label>
            <div style="display:flex;flex-direction:column;gap:6px">
              <div v-for="(sk, si) in draft(m.id).skills" :key="si" style="display:flex;gap:6px">
                <input v-model="draft(m.id).skills[si]" class="adm-input" style="flex:1" placeholder="Навык" />
                <button class="adm-btn adm-btn--danger" style="padding:7px 9px" @click="removeSkill(m.id, si)">
                  <Icon name="lucide:x" style="width:13px;height:13px" />
                </button>
              </div>
              <button class="adm-btn adm-btn--ghost" style="align-self:flex-start;font-size:12.5px" @click="addSkill(m.id)">
                <Icon name="lucide:plus" style="width:13px;height:13px" />Добавить навык
              </button>
            </div>
          </div>
          <div style="display:flex;gap:8px">
            <button class="adm-btn adm-btn--ghost" @click="cancelEdit">Отмена</button>
            <button class="adm-btn adm-btn--primary" style="flex:1;justify-content:center" @click="saveEdit(m.id)">
              <Icon name="lucide:check" style="width:14px;height:14px" />Сохранить
            </button>
          </div>
        </div>

      </div>
    </div>

    <div v-if="!members.length" style="padding:60px;text-align:center;color:#9ca3af;border:2px dashed #e8eaed;border-radius:12px">
      Команда пуста — нажмите «Добавить»
    </div>
  </div>
</template>

<style scoped>
.adm-spin { animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
