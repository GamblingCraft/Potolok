<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const slug = 'o-kompanii'

const { data: stored } = await useAsyncData(
  'about-hero',
  () => $fetch<{ img: string; title: string } | null>(`/api/cms/page-hero/${slug}`).catch(() => null),
)

const hero = reactive({
  img:   stored.value?.img   ?? '',
  title: stored.value?.title ?? '',
})

const saved  = ref(false)
const saving = ref(false)
async function save() {
  saving.value = true
  try {
    await $fetch('/api/admin/page-hero', {
      method: 'POST',
      body: { slug, hero: { img: hero.img, title: hero.title } },
    })
    saved.value = true
    setTimeout(() => saved.value = false, 2500)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="adm-seo-page">
    <div class="adm-seo-header">
      <div>
        <h1 class="adm-page-title">Hero-изображение — О компании</h1>
        <p class="adm-page-sub">Фото отображается в шапке страницы «О компании» справа от заголовка</p>
      </div>
      <div style="display:flex;gap:10px;align-items:center">
        <a href="/o-kompanii" target="_blank" class="adm-btn adm-btn--ghost">
          <Icon name="lucide:external-link" style="width:15px;height:15px"/>На сайте
        </a>
        <button class="adm-btn adm-btn--primary" :disabled="saving" @click="save">
          <Icon :name="saved ? 'lucide:check' : saving ? 'lucide:loader' : 'lucide:save'" style="width:15px;height:15px" :class="saving && 'adm-spin'" />
          {{ saved ? 'Сохранено!' : saving ? 'Сохранение…' : 'Сохранить' }}
        </button>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 360px;gap:20px;align-items:start">

      <!-- Upload -->
      <div class="adm-card adm-card--pad">
        <h3 style="font-size:15px;font-weight:700;margin:0 0 16px;color:#374151;display:flex;align-items:center;gap:8px">
          <Icon name="lucide:image" style="width:16px;height:16px;color:#9ca3af"/>Фотография
        </h3>
        <AdminImageUpload v-model="hero.img" label="Hero-изображение" />
        <div style="margin-top:16px">
          <label class="adm-label">Подпись / alt-текст</label>
          <input v-model="hero.title" class="adm-input" placeholder="Натяжные потолки ПроПотолок Иркутск"/>
        </div>
      </div>

      <!-- Preview -->
      <div class="adm-card adm-card--pad">
        <h3 style="font-size:15px;font-weight:700;margin:0 0 14px;color:#374151;display:flex;align-items:center;gap:8px">
          <Icon name="lucide:eye" style="width:16px;height:16px;color:#9ca3af"/>Предпросмотр
        </h3>
        <div style="border-radius:12px;overflow:hidden;aspect-ratio:4/3;background:#f0f0f0">
          <img
            v-if="hero.img"
            :src="hero.img"
            :alt="hero.title"
            style="width:100%;height:100%;object-fit:cover;display:block"
          />
          <div v-else style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#d1d5db">
            <Icon name="lucide:image" style="width:40px;height:40px"/>
            <span style="font-size:13px;font-weight:500">Изображение не выбрано</span>
          </div>
        </div>
        <p style="margin:12px 0 0;font-size:12px;color:#9ca3af;line-height:1.5">
          Рекомендуемый размер: 700×420px. Изображение показывается только на десктопе.
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>
.adm-seo-page { display: flex; flex-direction: column; gap: 20px; }
.adm-seo-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
</style>
