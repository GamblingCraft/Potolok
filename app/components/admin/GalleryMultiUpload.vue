<script setup lang="ts">
const emit = defineEmits<{
  'add': [items: { img: string; title: string }[]]
}>()

const fileInput = ref<HTMLInputElement>()
const isDragging = ref(false)
const isLoading  = ref(false)
const loadedCount = ref(0)
const totalCount  = ref(0)

function openPicker() {
  fileInput.value?.click()
}

async function processFiles(files: FileList | File[]) {
  const arr = Array.from(files).filter(f => f.type.startsWith('image/'))
  if (!arr.length) return

  isLoading.value  = true
  loadedCount.value = 0
  totalCount.value  = arr.length

  const results: { img: string; title: string }[] = []

  await Promise.all(arr.map(file => new Promise<void>(resolve => {
    const reader = new FileReader()
    reader.onload = (ev) => {
      results.push({
        img:   ev.target?.result as string,
        title: '',
      })
      loadedCount.value++
      resolve()
    }
    reader.readAsDataURL(file)
  })))

  isLoading.value = false
  if (fileInput.value) fileInput.value.value = ''
  emit('add', results)
}

function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files) processFiles(files)
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  const files = e.dataTransfer?.files
  if (files) processFiles(files)
}
</script>

<template>
  <div
    class="mgup"
    :class="isDragging && 'mgup--over'"
    @click="openPicker"
    @dragover.prevent="isDragging = true"
    @dragleave="isDragging = false"
    @drop.prevent="onDrop"
  >
    <template v-if="isLoading">
      <Icon name="lucide:loader" style="width:24px;height:24px;color:#f5c800;animation:adm-spin .7s linear infinite"/>
      <p style="font-size:13px;font-weight:600;color:#374151;margin:0">
        Обработка {{ loadedCount }} / {{ totalCount }}…
      </p>
    </template>
    <template v-else>
      <div class="mgup__icon">
        <Icon name="lucide:images" style="width:22px;height:22px;color:#9ca3af"/>
      </div>
      <p style="font-size:13px;font-weight:600;color:#374151;margin:0">
        Загрузить несколько фото сразу
      </p>
      <p style="font-size:11.5px;color:#9ca3af;margin:2px 0 0">
        Нажмите или перетащите файлы · JPG, PNG, WebP · любое количество
      </p>
    </template>

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      multiple
      style="display:none"
      @change="onFileChange"
    />
  </div>
</template>

<style scoped>
.mgup {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px; padding: 22px 16px;
  border: 2px dashed #e8eaed; border-radius: 12px;
  background: #fafafa; cursor: pointer; text-align: center;
  transition: border-color .15s, background .15s;
}
.mgup:hover, .mgup--over {
  border-color: #f5c800; background: #fffef0;
}
.mgup__icon {
  width: 44px; height: 44px; border-radius: 50%;
  background: #f4f5f7;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 2px;
}
</style>
