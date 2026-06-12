<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const site = useSite()

const siteData = ref(JSON.parse(JSON.stringify(site)))
const saved = ref(false)

function save() {
  saved.value = true
  setTimeout(() => { saved.value = false }, 3000)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Настройки сайта</h1>
        <p class="text-sm text-gray-500 mt-1">SEO, мета-теги, аналитика</p>
      </div>
      <button
        class="flex items-center gap-2 px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition text-sm"
        @click="save"
      >
        <Icon v-if="saved" name="lucide:check" class="w-4 h-4" />
        <Icon v-else name="lucide:save" class="w-4 h-4" />
        {{ saved ? 'Сохранено!' : 'Сохранить' }}
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="font-semibold text-gray-900 flex items-center gap-2">
          <Icon name="lucide:globe" class="w-4 h-4 text-gray-500" />
          SEO настройки
        </h2>
        <div class="space-y-3">
          <div class="space-y-1">
            <label class="text-xs font-medium text-gray-500">Название сайта</label>
            <input v-model="siteData.name" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-medium text-gray-500">Слоган</label>
            <input v-model="siteData.slogan" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-medium text-gray-500">Описание (meta description)</label>
            <textarea v-model="siteData.description" rows="3" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition resize-none" />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-medium text-gray-500">Домен сайта</label>
            <input v-model="siteData.domain" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 class="font-semibold text-gray-900 flex items-center gap-2">
          <Icon name="lucide:shield" class="w-4 h-4 text-gray-500" />
          Безопасность и доступ
        </h2>
        <div class="space-y-3">
          <div class="p-3 bg-gray-50 rounded-lg space-y-1">
            <p class="text-xs font-medium text-gray-600">Текущий логин администратора</p>
            <p class="text-sm text-gray-800 font-mono">propotolok77</p>
          </div>
          <div class="p-3 bg-yellow-50 rounded-lg flex items-start gap-2">
            <Icon name="lucide:info" class="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p class="text-xs text-yellow-700">
              Для смены пароля обновите файл <code class="font-mono bg-yellow-100 px-1 rounded">.env</code> и перезапустите сервер.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
