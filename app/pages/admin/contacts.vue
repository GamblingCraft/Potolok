<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

import { company as initialCompany } from '~/data/contacts'

const company = ref(JSON.parse(JSON.stringify(initialCompany)))
const saved = ref(false)
function save() { saved.value = true; setTimeout(() => saved.value = false, 3000) }
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:20px">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
      <div>
        <h1 class="adm-page-title">Контактные данные</h1>
        <p class="adm-page-sub">Телефоны, адрес, режим работы</p>
      </div>
      <button class="adm-btn adm-btn--primary" @click="save">
        <Icon :name="saved ? 'lucide:check' : 'lucide:save'" style="width:15px;height:15px" />
        {{ saved ? 'Сохранено!' : 'Сохранить' }}
      </button>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <!-- Company -->
      <div class="adm-card adm-card--pad">
        <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 16px;display:flex;align-items:center;gap:8px">
          <Icon name="lucide:building-2" style="width:16px;height:16px;color:#6b7280" />Данные компании
        </h2>
        <div style="display:flex;flex-direction:column;gap:12px">
          <div><label class="adm-label">Название</label><input v-model="company.name" class="adm-input" /></div>
          <div><label class="adm-label">Полное название (юр. лицо)</label><input v-model="company.fullName" class="adm-input" /></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <div><label class="adm-label">ИНН</label><input v-model="company.inn" class="adm-input" /></div>
            <div><label class="adm-label">ОГРН</label><input v-model="company.ogrn" class="adm-input" /></div>
          </div>
          <div><label class="adm-label">Город</label><input v-model="company.city" class="adm-input" /></div>
        </div>
      </div>

      <!-- Phone & Email -->
      <div class="adm-card adm-card--pad">
        <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 16px;display:flex;align-items:center;gap:8px">
          <Icon name="lucide:phone" style="width:16px;height:16px;color:#6b7280" />Телефоны и email
        </h2>
        <div style="display:flex;flex-direction:column;gap:12px">
          <div><label class="adm-label">Основной телефон (отображение)</label><input v-model="company.phone" class="adm-input" /></div>
          <div><label class="adm-label">Основной телефон (tel: ссылка)</label><input v-model="company.phoneTel" class="adm-input" /></div>
          <div><label class="adm-label">Второй телефон (отображение)</label><input v-model="company.phoneAlt" class="adm-input" /></div>
          <div><label class="adm-label">Email (основной)</label><input v-model="company.email" type="email" class="adm-input" /></div>
          <div><label class="adm-label">Email для заказов</label><input v-model="company.emailSales" type="email" class="adm-input" /></div>
        </div>
      </div>

      <!-- Address -->
      <div class="adm-card adm-card--pad">
        <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 16px;display:flex;align-items:center;gap:8px">
          <Icon name="lucide:map-pin" style="width:16px;height:16px;color:#6b7280" />Адрес
        </h2>
        <div style="display:flex;flex-direction:column;gap:12px">
          <div><label class="adm-label">Полный адрес</label><input v-model="company.address" class="adm-input" /></div>
          <div><label class="adm-label">Короткий адрес</label><input v-model="company.addressShort" class="adm-input" /></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <div><label class="adm-label">Широта</label><input v-model.number="company.mapLat" type="number" step="0.0001" class="adm-input" /></div>
            <div><label class="adm-label">Долгота</label><input v-model.number="company.mapLng" type="number" step="0.0001" class="adm-input" /></div>
          </div>
        </div>
      </div>

      <!-- Hours + Social -->
      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="adm-card adm-card--pad">
          <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 16px;display:flex;align-items:center;gap:8px">
            <Icon name="lucide:clock" style="width:16px;height:16px;color:#6b7280" />Режим работы
          </h2>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div v-for="(hour, i) in company.hours" :key="i" style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
              <input v-model="company.hours[i].days" class="adm-input" placeholder="Дни" />
              <input v-model="company.hours[i].time" class="adm-input" placeholder="Время" />
            </div>
          </div>
        </div>
        <div class="adm-card adm-card--pad">
          <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 16px;display:flex;align-items:center;gap:8px">
            <Icon name="lucide:share-2" style="width:16px;height:16px;color:#6b7280" />Социальные сети
          </h2>
          <div style="display:flex;flex-direction:column;gap:12px">
            <div><label class="adm-label">Telegram</label><input v-model="company.social.telegram" class="adm-input" /></div>
            <div><label class="adm-label">ВКонтакте</label><input v-model="company.social.vk" class="adm-input" /></div>
            <div><label class="adm-label">WhatsApp</label><input v-model="company.social.whatsapp" class="adm-input" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
