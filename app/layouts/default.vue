<template>
  <div>
    <TopBanner />
    <AppHeader @open-callback="callbackOpen = true" />

    <!-- Хлебные крошки — автоматически на всех страницах кроме главной -->
    <div v-if="route.path !== '/'" class="layout-breadcrumb">
      <div class="container">
        <AppBreadcrumb :items="crumbs" />
      </div>
    </div>

    <main><slot /></main>
    <AppFooter @open-callback="callbackOpen = true" />

    <ModalCallback v-model="callbackOpen" />
    <CookieBanner />
    <QuizWidget />
  </div>
</template>

<script setup lang="ts">
const callbackOpen = ref(false)
const route = useRoute()
const { crumbs } = useBreadcrumbs()

const { origin } = useRequestURL()
useHead({ link: computed(() => [{ rel: 'canonical', href: origin + route.path }]) })

// После каждой SPA-навигации сбрасываем кэш site-данных,
// чтобы изменения из админки сразу отражались в хедере/футере
const router = useRouter()
router.afterEach(() => refreshNuxtData('cms-site'))
</script>

<style>
.layout-breadcrumb {
  background: #1e1e1e;
  border-bottom: 1px solid #2a2a2a;
  padding: 10px 0;
}
.layout-breadcrumb .breadcrumb {
  margin: 0;
}
.layout-breadcrumb .breadcrumb__item {
  gap: 6px;
}
</style>
