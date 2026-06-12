<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })
import { services } from '~/data/services'
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:20px">
    <div style="display:flex;align-items:center;justify-content:space-between">
      <div>
        <h1 class="adm-page-title">Услуги</h1>
        <p class="adm-page-sub">{{ services.length }} услуг — нажмите для редактирования</p>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px">
      <NuxtLink
        v-for="svc in services"
        :key="svc.id"
        :to="`/admin/services/${svc.slug}`"
        class="adm-card"
        style="padding:16px;transition:border-color .15s;display:flex;align-items:center;gap:14px;text-decoration:none"
      >
        <div style="width:44px;height:44px;background:#f4f5f7;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <Icon :name="svc.icon" style="width:22px;height:22px;color:#6b7280" />
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-size:14.5px;font-weight:600;color:#111827">{{ svc.shortTitle }}</div>
          <div style="font-size:12.5px;color:#9ca3af;margin-top:2px">{{ svc.price }}</div>
        </div>
        <span v-if="svc.badge" class="adm-tag adm-tag--yellow" style="font-size:11px;flex-shrink:0">{{ svc.badge }}</span>
        <Icon name="lucide:chevron-right" style="width:16px;height:16px;color:#d1d5db;flex-shrink:0" />
      </NuxtLink>
    </div>
  </div>
</template>
