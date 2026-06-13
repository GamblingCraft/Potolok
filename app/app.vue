<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { data: verification } = await useAsyncData('cms-verification',
  () => $fetch<{ yandex: string; google: string }>('/api/cms/verification'),
  { default: () => ({ yandex: '', google: '' }) },
)

const { data: counters } = await useAsyncData('cms-counters',
  () => $fetch<{ yandexMetrika: string; googleGA4: string; custom: string }>('/api/cms/counters'),
  { default: () => ({ yandexMetrika: '', googleGA4: '', custom: '' }) },
)

// Извлекаем content= из полного тега или берём как есть
function extractContent(val: string): string {
  if (!val) return ''
  const m = val.match(/content=["']([^"']+)["']/)
  return m ? m[1] : val.trim()
}

useHead(computed(() => {
  const meta: any[] = []
  const script: any[] = []

  // Верификация Яндекс
  const ym = extractContent(verification.value?.yandex ?? '')
  if (ym) meta.push({ name: 'yandex-verification', content: ym })

  // Верификация Google
  const gv = extractContent(verification.value?.google ?? '')
  if (gv) meta.push({ name: 'google-site-verification', content: gv })

  // Яндекс.Метрика
  const metrikaId = counters.value?.yandexMetrika?.trim()
  if (metrikaId) {
    script.push({
      innerHTML: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
ym(${metrikaId},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`,
      type: 'text/javascript',
    })
  }

  // Google Analytics 4
  const ga4Id = counters.value?.googleGA4?.trim()
  if (ga4Id) {
    script.push({ src: `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`, async: true })
    script.push({
      innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`,
      type: 'text/javascript',
    })
  }

  // Произвольный скрипт
  const custom = counters.value?.custom?.trim()
  if (custom) script.push({ innerHTML: custom.replace(/<script[^>]*>|<\/script>/gi, '') })

  return { meta, script }
}))
</script>
