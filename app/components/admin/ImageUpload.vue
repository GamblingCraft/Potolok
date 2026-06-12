<script setup lang="ts">
const props = defineProps<{
  modelValue?: string
  label?: string
  accept?: string
}>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isDragging = ref(false)
const fileInput = ref<HTMLInputElement>()

function openPicker() {
  fileInput.value?.click()
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) readFile(file)
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file && file.type.startsWith('image/')) readFile(file)
}

function readFile(file: File) {
  const reader = new FileReader()
  reader.onload = (ev) => {
    emit('update:modelValue', ev.target?.result as string)
  }
  reader.readAsDataURL(file)
}

function clear() {
  emit('update:modelValue', '')
  if (fileInput.value) fileInput.value.value = ''
}
</script>

<template>
  <div class="adm-imgup">
    <label v-if="label" class="adm-label">{{ label }}</label>

    <!-- Preview -->
    <div v-if="modelValue" class="adm-imgup__preview">
      <img :src="modelValue" alt="" />
      <div class="adm-imgup__ov">
        <button type="button" class="adm-imgup__btn" @click="openPicker">
          <Icon name="lucide:upload" style="width:13px;height:13px" />Заменить
        </button>
        <button type="button" class="adm-imgup__btn adm-imgup__btn--del" @click="clear">
          <Icon name="lucide:trash-2" style="width:13px;height:13px" />Удалить
        </button>
      </div>
    </div>

    <!-- Upload area -->
    <div
      v-else
      class="adm-imgup__drop"
      :class="isDragging && 'adm-imgup__drop--over'"
      @click="openPicker"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="onDrop"
    >
      <div class="adm-imgup__icon">
        <Icon name="lucide:image-plus" style="width:22px;height:22px;color:#9ca3af" />
      </div>
      <p style="font-size:13px;font-weight:500;color:#374151;margin:0">Загрузить изображение</p>
      <p style="font-size:11.5px;color:#9ca3af;margin:2px 0 0">Нажмите или перетащите · JPG, PNG, WebP</p>
    </div>

    <!-- URL input -->
    <input
      :value="modelValue"
      type="text"
      placeholder="или вставьте ссылку на изображение…"
      class="adm-input"
      style="font-size:12px;margin-top:6px"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <input
      ref="fileInput"
      type="file"
      :accept="accept ?? 'image/*'"
      style="display:none"
      @change="onFileChange"
    />
  </div>
</template>

<style>
.adm-imgup { display: flex; flex-direction: column; gap: 0; }
.adm-imgup__preview {
  position: relative; aspect-ratio: 16/9; border-radius: 10px;
  overflow: hidden; border: 1px solid #e8eaed; background: #f4f5f7;
  margin-bottom: 6px;
}
.adm-imgup__preview img { width: 100%; height: 100%; object-fit: cover; display: block; }
.adm-imgup__ov {
  position: absolute; inset: 0; background: rgba(0,0,0,.4);
  opacity: 0; transition: opacity .2s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.adm-imgup__preview:hover .adm-imgup__ov { opacity: 1; }
.adm-imgup__btn {
  display: flex; align-items: center; gap: 5px;
  padding: 6px 12px; background: rgba(255,255,255,.9); color: #111827;
  border: none; border-radius: 7px; font-size: 12px; font-weight: 600;
  cursor: pointer; font-family: inherit;
}
.adm-imgup__btn:hover { background: #fff; }
.adm-imgup__btn--del { background: rgba(239,68,68,.85) !important; color: #fff !important; }
.adm-imgup__btn--del:hover { background: #ef4444 !important; }

.adm-imgup__drop {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px; padding: 28px 16px; border-radius: 10px;
  border: 2px dashed #e8eaed; cursor: pointer;
  background: #fafafa; text-align: center;
  transition: border-color .15s, background .15s;
  margin-bottom: 6px;
}
.adm-imgup__drop:hover, .adm-imgup__drop--over {
  border-color: #f5c800; background: #fffef0;
}
.adm-imgup__icon {
  width: 44px; height: 44px; border-radius: 50%;
  background: #f4f5f7; display: flex; align-items: center; justify-content: center;
}
</style>
