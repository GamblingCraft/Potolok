<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

import { reviews as initialReviews, type Review } from '~/data/reviews'

const reviews = ref<Review[]>(JSON.parse(JSON.stringify(initialReviews)))
const search = ref('')
const filterPlatform = ref('')
const editingId = ref<number | null>(null)
const showDeleteConfirm = ref<number | null>(null)
const editForm = ref<Review | null>(null)

const filtered = computed(() => {
  let list = reviews.value
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(r => r.author.toLowerCase().includes(q) || r.text.toLowerCase().includes(q))
  }
  if (filterPlatform.value) list = list.filter(r => r.platform === filterPlatform.value)
  return list
})

watch(editingId, id => {
  editForm.value = id !== null ? { ...(reviews.value.find(r => r.id === id) ?? ({} as Review)) } : null
})

function saveReview(review: Review) {
  const idx = reviews.value.findIndex(r => r.id === review.id)
  if (idx !== -1) reviews.value[idx] = { ...review }
  editingId.value = null
}
function deleteReview(id: number) {
  reviews.value = reviews.value.filter(r => r.id !== id)
  showDeleteConfirm.value = null
}

function platLabel(p: string) {
  return ({ yandex: 'Яндекс', '2gis': '2ГИС', avito: 'Авито', own: 'Собственный' } as Record<string,string>)[p] ?? p
}
function platBg(p: string) {
  return ({ yandex: '#fef2f2', '2gis': '#f0fdf4', avito: '#eff6ff', own: '#f3f4f6' } as Record<string,string>)[p] ?? '#f3f4f6'
}
function platColor(p: string) {
  return ({ yandex: '#dc2626', '2gis': '#16a34a', avito: '#2563eb', own: '#6b7280' } as Record<string,string>)[p] ?? '#6b7280'
}
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:20px">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
      <div>
        <h1 class="adm-page-title">Отзывы</h1>
        <p class="adm-page-sub">{{ reviews.length }} отзывов в базе</p>
      </div>
      <button class="adm-btn adm-btn--primary">
        <Icon name="lucide:plus" style="width:15px;height:15px" />Добавить отзыв
      </button>
    </div>

    <!-- Filters -->
    <div class="adm-card" style="padding:12px 16px;display:flex;flex-wrap:wrap;gap:10px;align-items:center">
      <div style="position:relative;flex:1;min-width:200px">
        <Icon name="lucide:search" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);width:15px;height:15px;color:#9ca3af" />
        <input v-model="search" type="text" placeholder="Поиск по автору или тексту..."
          class="adm-input" style="padding-left:34px" />
      </div>
      <select v-model="filterPlatform" class="adm-input" style="width:auto;min-width:160px">
        <option value="">Все платформы</option>
        <option value="yandex">Яндекс</option>
        <option value="2gis">2ГИС</option>
        <option value="avito">Авито</option>
        <option value="own">Собственные</option>
      </select>
    </div>

    <!-- Table -->
    <div class="adm-card" style="overflow:hidden">
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse">
          <thead>
            <tr style="background:#f8f9fb;border-bottom:1px solid #e8eaed">
              <th style="text-align:left;padding:11px 16px;font-size:11.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em">Автор</th>
              <th style="text-align:left;padding:11px 16px;font-size:11.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em">Платформа</th>
              <th style="text-align:left;padding:11px 16px;font-size:11.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em">Оценка</th>
              <th style="text-align:left;padding:11px 16px;font-size:11.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em">Дата</th>
              <th style="text-align:left;padding:11px 16px;font-size:11.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em">Отзыв</th>
              <th style="padding:11px 16px;width:80px"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in filtered" :key="r.id" style="border-bottom:1px solid #f0f0f0;transition:background .1s"
              onmouseover="this.style.background='#f8f9fb'" onmouseout="this.style.background=''">
              <td style="padding:12px 16px">
                <div style="display:flex;align-items:center;gap:8px">
                  <div style="width:30px;height:30px;border-radius:50%;background:#e8eaed;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#374151;flex-shrink:0">
                    {{ r.author[0] }}
                  </div>
                  <span style="font-size:14px;font-weight:600;color:#111827">{{ r.author }}</span>
                </div>
              </td>
              <td style="padding:12px 16px">
                <span :style="`font-size:12px;padding:2px 8px;border-radius:6px;font-weight:600;background:${platBg(r.platform)};color:${platColor(r.platform)}`">
                  {{ platLabel(r.platform) }}
                </span>
              </td>
              <td style="padding:12px 16px">
                <div style="display:flex;gap:1px">
                  <Icon v-for="i in 5" :key="i" name="lucide:star"
                    :style="`width:13px;height:13px;${i <= r.rating ? 'color:#f5c800;fill:#f5c800' : 'color:#e5e7eb'}`" />
                </div>
              </td>
              <td style="padding:12px 16px;font-size:13px;color:#9ca3af;white-space:nowrap">{{ r.date }}</td>
              <td style="padding:12px 16px;max-width:280px">
                <p style="font-size:13.5px;color:#374151;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">{{ r.text }}</p>
              </td>
              <td style="padding:12px 16px">
                <div style="display:flex;gap:4px;justify-content:flex-end">
                  <button @click="editingId = r.id"
                    style="display:flex;align-items:center;padding:5px 7px;background:#f4f5f7;border:1px solid #e8eaed;border-radius:7px;cursor:pointer;color:#6b7280;transition:all .15s"
                    onmouseover="this.style.background='#eff6ff';this.style.color='#3b82f6';this.style.borderColor='#bfdbfe'"
                    onmouseout="this.style.background='#f4f5f7';this.style.color='#6b7280';this.style.borderColor='#e8eaed'">
                    <Icon name="lucide:pencil" style="width:14px;height:14px" />
                  </button>
                  <button @click="showDeleteConfirm = r.id"
                    style="display:flex;align-items:center;padding:5px 7px;background:#f4f5f7;border:1px solid #e8eaed;border-radius:7px;cursor:pointer;color:#6b7280;transition:all .15s"
                    onmouseover="this.style.background='#fef2f2';this.style.color='#ef4444';this.style.borderColor='#fecaca'"
                    onmouseout="this.style.background='#f4f5f7';this.style.color='#6b7280';this.style.borderColor='#e8eaed'">
                    <Icon name="lucide:trash-2" style="width:14px;height:14px" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="6" style="padding:48px 16px;text-align:center;color:#9ca3af">
                <Icon name="lucide:inbox" style="width:36px;height:36px;margin:0 auto 8px;display:block;color:#d1d5db" />
                Отзывы не найдены
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
        <div style="background:#fff;border-radius:18px;width:100%;max-width:520px;box-shadow:0 24px 64px rgba(0,0,0,.15);padding:24px;display:flex;flex-direction:column;gap:14px">
          <div style="display:flex;align-items:center;justify-content:space-between">
            <h3 style="font-size:16px;font-weight:700;color:#111827;margin:0">Редактировать отзыв</h3>
            <button @click="editingId = null" style="padding:6px;background:#f4f5f7;border:1px solid #e8eaed;border-radius:8px;cursor:pointer;color:#6b7280">
              <Icon name="lucide:x" style="width:15px;height:15px" />
            </button>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label class="adm-label">Автор</label>
              <input v-model="editForm!.author" class="adm-input" />
            </div>
            <div>
              <label class="adm-label">Оценка</label>
              <select v-model="editForm!.rating" class="adm-input">
                <option v-for="i in 5" :key="i" :value="i">{{ i }} ★</option>
              </select>
            </div>
            <div>
              <label class="adm-label">Платформа</label>
              <select v-model="editForm!.platform" class="adm-input">
                <option value="yandex">Яндекс</option>
                <option value="2gis">2ГИС</option>
                <option value="avito">Авито</option>
                <option value="own">Собственный</option>
              </select>
            </div>
            <div>
              <label class="adm-label">Дата</label>
              <input v-model="editForm!.date" type="date" class="adm-input" />
            </div>
          </div>
          <div>
            <label class="adm-label">Тип помещения</label>
            <input v-model="editForm!.roomType" class="adm-input" />
          </div>
          <div>
            <label class="adm-label">Текст отзыва</label>
            <textarea v-model="editForm!.text" rows="4" class="adm-input" style="resize:vertical" />
          </div>
          <div>
            <label class="adm-label">Ответ компании</label>
            <textarea v-model="editForm!.reply" rows="2" class="adm-input" style="resize:vertical" placeholder="Необязательно" />
          </div>
          <div style="display:flex;gap:10px;padding-top:4px">
            <button class="adm-btn adm-btn--ghost" style="flex:1;justify-content:center" @click="editingId = null">Отмена</button>
            <button class="adm-btn adm-btn--primary" style="flex:1;justify-content:center" @click="saveReview(editForm!)">Сохранить</button>
          </div>
        </div>
      </div>

      <div v-if="showDeleteConfirm !== null"
        style="position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.5);backdrop-filter:blur(4px)">
        <div style="background:#fff;border-radius:18px;width:100%;max-width:360px;box-shadow:0 24px 64px rgba(0,0,0,.15);padding:28px;text-align:center;display:flex;flex-direction:column;gap:16px">
          <div style="width:56px;height:56px;background:#fef2f2;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto">
            <Icon name="lucide:trash-2" style="width:24px;height:24px;color:#ef4444" />
          </div>
          <div>
            <h3 style="font-size:16px;font-weight:700;color:#111827;margin:0 0 4px">Удалить отзыв?</h3>
            <p style="font-size:13.5px;color:#9ca3af;margin:0">Это действие нельзя отменить</p>
          </div>
          <div style="display:flex;gap:10px">
            <button class="adm-btn adm-btn--ghost" style="flex:1;justify-content:center" @click="showDeleteConfirm = null">Отмена</button>
            <button style="flex:1;display:flex;align-items:center;justify-content:center;padding:9px 18px;background:#ef4444;border:none;border-radius:9px;cursor:pointer;color:#fff;font-size:14px;font-weight:600" @click="deleteReview(showDeleteConfirm!)">Удалить</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
