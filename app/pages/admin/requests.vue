<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

interface Request {
  id: number
  name: string
  phone: string
  message: string
  date: string
  status: 'new' | 'in_progress' | 'done' | 'cancelled'
  source: string
}

const { data: requests, refresh } = await useAsyncData<Request[]>('admin-requests', () =>
  $fetch('/api/admin/requests'), { default: () => [] })

const statusCfg: Record<string, { label: string; bg: string; color: string }> = {
  new:         { label: 'Новая',     bg: '#dbeafe', color: '#1d4ed8' },
  in_progress: { label: 'В работе', bg: '#fef9c3', color: '#a16207' },
  done:        { label: 'Выполнена',bg: '#dcfce7', color: '#166534' },
  cancelled:   { label: 'Отменена', bg: '#f3f4f6', color: '#6b7280' },
}

async function setStatus(id: number, status: Request['status']) {
  await $fetch(`/api/admin/requests/${id}`, { method: 'PUT', body: { status } })
  await refresh()
}

const deletingId = ref<number | null>(null)
async function deleteRequest(id: number) {
  await $fetch(`/api/admin/requests/${id}`, { method: 'DELETE' })
  deletingId.value = null
  await refresh()
}

const editingId = ref<number | null>(null)
const editForm = ref<Request | null>(null)
function startEdit(r: Request) { editForm.value = { ...r }; editingId.value = r.id }
async function saveEdit() {
  if (!editForm.value) return
  await $fetch(`/api/admin/requests/${editForm.value.id}`, { method: 'PUT', body: editForm.value })
  editingId.value = null
  await refresh()
}

const filterStatus = ref('')
const filtered = computed(() => {
  if (!filterStatus.value) return requests.value ?? []
  return (requests.value ?? []).filter(r => r.status === filterStatus.value)
})

const counts = computed(() => {
  const list = requests.value ?? []
  return {
    all:  list.length,
    new:  list.filter(r => r.status === 'new').length,
    in_progress: list.filter(r => r.status === 'in_progress').length,
    done: list.filter(r => r.status === 'done').length,
  }
})
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:20px">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
      <div>
        <h1 class="adm-page-title">Заявки</h1>
        <p class="adm-page-sub">Входящие заявки с форм и квиза</p>
      </div>
      <button class="adm-btn adm-btn--ghost" @click="refresh">
        <Icon name="lucide:refresh-cw" style="width:14px;height:14px" />Обновить
      </button>
    </div>

    <!-- Stats -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
      <button @click="filterStatus=''" class="adm-card" :style="`padding:14px 18px;text-align:center;cursor:pointer;border-color:${!filterStatus ? '#f5c800' : '#e8eaed'}`">
        <div style="font-size:26px;font-weight:800;color:#111827">{{ counts.all }}</div>
        <div style="font-size:12.5px;color:#9ca3af;margin-top:2px">Всего</div>
      </button>
      <button @click="filterStatus='new'" class="adm-card" :style="`padding:14px 18px;text-align:center;cursor:pointer;background:#eff6ff;border-color:${filterStatus==='new' ? '#f5c800' : '#e8eaed'}`">
        <div style="font-size:26px;font-weight:800;color:#1d4ed8">{{ counts.new }}</div>
        <div style="font-size:12.5px;color:#3b82f6;margin-top:2px">Новые</div>
      </button>
      <button @click="filterStatus='in_progress'" class="adm-card" :style="`padding:14px 18px;text-align:center;cursor:pointer;background:#fffef5;border-color:${filterStatus==='in_progress' ? '#f5c800' : '#e8eaed'}`">
        <div style="font-size:26px;font-weight:800;color:#a16207">{{ counts.in_progress }}</div>
        <div style="font-size:12.5px;color:#ca8a04;margin-top:2px">В работе</div>
      </button>
      <button @click="filterStatus='done'" class="adm-card" :style="`padding:14px 18px;text-align:center;cursor:pointer;background:#f0fdf4;border-color:${filterStatus==='done' ? '#f5c800' : '#e8eaed'}`">
        <div style="font-size:26px;font-weight:800;color:#166534">{{ counts.done }}</div>
        <div style="font-size:12.5px;color:#16a34a;margin-top:2px">Выполнено</div>
      </button>
    </div>

    <!-- Empty state -->
    <div v-if="!requests?.length" class="adm-card" style="padding:48px;text-align:center">
      <Icon name="lucide:inbox" style="width:40px;height:40px;color:#d1d5db;margin:0 auto 12px;display:block" />
      <p style="font-size:15px;font-weight:600;color:#374151;margin:0 0 4px">Заявок ещё нет</p>
      <p style="font-size:13px;color:#9ca3af;margin:0">Заявки с форм сайта появятся здесь автоматически</p>
    </div>

    <!-- Table -->
    <div v-else class="adm-card" style="overflow:hidden">
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse">
          <thead>
            <tr style="background:#f8f9fb;border-bottom:1px solid #e8eaed">
              <th style="text-align:left;padding:11px 16px;font-size:11.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em">#</th>
              <th style="text-align:left;padding:11px 16px;font-size:11.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em">Клиент</th>
              <th style="text-align:left;padding:11px 16px;font-size:11.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em">Сообщение</th>
              <th style="text-align:left;padding:11px 16px;font-size:11.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em">Источник</th>
              <th style="text-align:left;padding:11px 16px;font-size:11.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em;white-space:nowrap">Дата</th>
              <th style="text-align:left;padding:11px 16px;font-size:11.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em">Статус</th>
              <th style="padding:11px 16px;width:90px"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="req in filtered" :key="req.id" style="border-bottom:1px solid #f0f0f0;transition:background .1s"
              onmouseover="this.style.background='#f8f9fb'" onmouseout="this.style.background=''">
              <td style="padding:12px 16px;font-size:13px;color:#9ca3af">{{ req.id }}</td>
              <td style="padding:12px 16px">
                <div style="font-size:14px;font-weight:600;color:#111827">{{ req.name || '—' }}</div>
                <a v-if="req.phone" :href="`tel:${req.phone}`" style="font-size:12.5px;color:#3b82f6;text-decoration:none">{{ req.phone }}</a>
              </td>
              <td style="padding:12px 16px;max-width:240px">
                <p style="font-size:13.5px;color:#374151;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;margin:0">{{ req.message || '—' }}</p>
              </td>
              <td style="padding:12px 16px;font-size:12.5px;color:#9ca3af;white-space:nowrap">{{ req.source }}</td>
              <td style="padding:12px 16px;font-size:12.5px;color:#9ca3af;white-space:nowrap">{{ req.date }}</td>
              <td style="padding:12px 16px">
                <select
                  :value="req.status"
                  :style="`font-size:12px;font-weight:600;padding:4px 8px;border-radius:6px;border:none;cursor:pointer;outline:none;background:${statusCfg[req.status]?.bg ?? '#f3f4f6'};color:${statusCfg[req.status]?.color ?? '#6b7280'}`"
                  @change="setStatus(req.id, ($event.target as HTMLSelectElement).value as Request['status'])"
                >
                  <option value="new">Новая</option>
                  <option value="in_progress">В работе</option>
                  <option value="done">Выполнена</option>
                  <option value="cancelled">Отменена</option>
                </select>
              </td>
              <td style="padding:12px 16px">
                <div style="display:flex;gap:4px;justify-content:flex-end">
                  <button @click="startEdit(req)"
                    style="display:flex;align-items:center;padding:5px 7px;background:#f4f5f7;border:1px solid #e8eaed;border-radius:7px;cursor:pointer;color:#6b7280;transition:all .15s"
                    onmouseover="this.style.background='#eff6ff';this.style.color='#3b82f6';this.style.borderColor='#bfdbfe'"
                    onmouseout="this.style.background='#f4f5f7';this.style.color='#6b7280';this.style.borderColor='#e8eaed'">
                    <Icon name="lucide:pencil" style="width:13px;height:13px" />
                  </button>
                  <button @click="deletingId = req.id"
                    style="display:flex;align-items:center;padding:5px 7px;background:#f4f5f7;border:1px solid #e8eaed;border-radius:7px;cursor:pointer;color:#6b7280;transition:all .15s"
                    onmouseover="this.style.background='#fef2f2';this.style.color='#ef4444';this.style.borderColor='#fecaca'"
                    onmouseout="this.style.background='#f4f5f7';this.style.color='#6b7280';this.style.borderColor='#e8eaed'">
                    <Icon name="lucide:trash-2" style="width:13px;height:13px" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit modal -->
    <Teleport to="body">
      <div v-if="editingId && editForm"
        style="position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.5);backdrop-filter:blur(4px)">
        <div style="background:#fff;border-radius:18px;width:100%;max-width:480px;box-shadow:0 24px 64px rgba(0,0,0,.15);padding:24px;display:flex;flex-direction:column;gap:14px">
          <div style="display:flex;align-items:center;justify-content:space-between">
            <h3 style="font-size:16px;font-weight:700;color:#111827;margin:0">Редактировать заявку #{{ editForm.id }}</h3>
            <button @click="editingId=null" style="padding:6px;background:#f4f5f7;border:1px solid #e8eaed;border-radius:8px;cursor:pointer;color:#6b7280">
              <Icon name="lucide:x" style="width:15px;height:15px" />
            </button>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div><label class="adm-label">Имя</label><input v-model="editForm.name" class="adm-input" /></div>
            <div><label class="adm-label">Телефон</label><input v-model="editForm.phone" class="adm-input" /></div>
          </div>
          <div><label class="adm-label">Сообщение</label><textarea v-model="editForm.message" rows="3" class="adm-input" style="resize:vertical" /></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div><label class="adm-label">Источник</label><input v-model="editForm.source" class="adm-input" /></div>
            <div>
              <label class="adm-label">Статус</label>
              <select v-model="editForm.status" class="adm-input">
                <option value="new">Новая</option>
                <option value="in_progress">В работе</option>
                <option value="done">Выполнена</option>
                <option value="cancelled">Отменена</option>
              </select>
            </div>
          </div>
          <div style="display:flex;gap:10px;padding-top:4px">
            <button class="adm-btn adm-btn--ghost" style="flex:1;justify-content:center" @click="editingId=null">Отмена</button>
            <button class="adm-btn adm-btn--primary" style="flex:1;justify-content:center" @click="saveEdit">Сохранить</button>
          </div>
        </div>
      </div>

      <div v-if="deletingId !== null"
        style="position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.5);backdrop-filter:blur(4px)">
        <div style="background:#fff;border-radius:18px;width:100%;max-width:340px;box-shadow:0 24px 64px rgba(0,0,0,.15);padding:28px;text-align:center;display:flex;flex-direction:column;gap:16px">
          <div style="width:52px;height:52px;background:#fef2f2;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto">
            <Icon name="lucide:trash-2" style="width:22px;height:22px;color:#ef4444" />
          </div>
          <div>
            <h3 style="font-size:16px;font-weight:700;color:#111827;margin:0 0 4px">Удалить заявку?</h3>
            <p style="font-size:13.5px;color:#9ca3af;margin:0">Это действие нельзя отменить</p>
          </div>
          <div style="display:flex;gap:10px">
            <button class="adm-btn adm-btn--ghost" style="flex:1;justify-content:center" @click="deletingId=null">Отмена</button>
            <button style="flex:1;display:flex;align-items:center;justify-content:center;padding:9px;background:#ef4444;border:none;border-radius:9px;cursor:pointer;color:#fff;font-size:14px;font-weight:600" @click="deleteRequest(deletingId!)">Удалить</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
