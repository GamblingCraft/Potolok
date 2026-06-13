<template>
  <!-- Collapsed -->
  <div v-if="!expanded"
    style="display:flex;align-items:center;gap:14px;padding:12px 20px;cursor:pointer;border-bottom:1px solid #f5f5f5;transition:background .1s"
    onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background=''"
    @click="$emit('toggle')"
  >
    <div style="flex:1;min-width:0">
      <div style="font-size:13.5px;font-weight:600;color:#111827;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ page.title }}</div>
      <div style="font-size:11.5px;color:#9ca3af;font-family:monospace;margin-top:1px">{{ page.slug }}</div>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
      <span :style="`font-size:11px;padding:2px 7px;border-radius:5px;font-weight:600;background:${page.title.length > 70 ? '#fef2f2' : '#f0fdf4'};color:${page.title.length > 70 ? '#dc2626' : '#166534'}`">
        {{ page.title.length }}
      </span>
      <Icon name="lucide:chevron-down" style="width:14px;height:14px;color:#9ca3af" />
    </div>
  </div>

  <!-- Expanded -->
  <div v-else style="padding:16px 20px;background:#fffef5;border-left:3px solid #f5c800;border-bottom:1px solid #f0e68c">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
      <code style="font-size:12px;color:#6b7280;background:#f4f5f7;padding:2px 8px;border-radius:5px">{{ page.slug }}</code>
      <button @click="$emit('toggle')" style="background:none;border:none;cursor:pointer;color:#9ca3af;padding:4px">
        <Icon name="lucide:x" style="width:15px;height:15px" />
      </button>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px">
      <div>
        <label class="adm-label" style="display:flex;align-items:center;justify-content:space-between">
          Title
          <span :style="`font-size:11px;padding:1px 6px;border-radius:5px;font-weight:600;background:${page.title.length > 70 ? '#fef2f2' : '#f0fdf4'};color:${page.title.length > 70 ? '#dc2626' : '#166534'}`">{{ page.title.length }} / 70</span>
        </label>
        <input v-model="page.title" class="adm-input" />
      </div>
      <div>
        <label class="adm-label" style="display:flex;align-items:center;justify-content:space-between">
          Description
          <span :style="`font-size:11px;padding:1px 6px;border-radius:5px;font-weight:600;background:${page.description.length > 160 ? '#fef2f2' : '#f0fdf4'};color:${page.description.length > 160 ? '#dc2626' : '#166534'}`">{{ page.description.length }} / 160</span>
        </label>
        <textarea v-model="page.description" rows="3" class="adm-input" style="resize:vertical" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  page: { slug: string; title: string; description: string }
  expanded: boolean
}>()
defineEmits(['toggle'])
</script>
