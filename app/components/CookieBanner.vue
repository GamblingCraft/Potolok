<template>
  <Transition name="cookie">
    <div v-if="visible" class="cookie-banner">
      <div class="cookie-banner__inner">
        <Icon name="lucide:cookie" size="22" class="cookie-banner__icon" />
        <p class="cookie-banner__text">
          Мы используем файлы cookie для улучшения работы сайта.
          Продолжая использовать сайт, вы соглашаетесь с нашей
          <NuxtLink to="/politika-konfidentsialnosti">политикой конфиденциальности</NuxtLink>.
        </p>
        <div class="cookie-banner__btns">
          <button class="nav-btn cookie-banner__accept" @click="accept">Принять</button>
          <button class="cookie-banner__decline" @click="decline">Отклонить</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const visible = ref(false)

onMounted(() => {
  if (!localStorage.getItem('cookie_consent')) {
    setTimeout(() => { visible.value = true }, 1200)
  }
})

function accept() {
  localStorage.setItem('cookie_consent', 'accepted')
  visible.value = false
}

function decline() {
  localStorage.setItem('cookie_consent', 'declined')
  visible.value = false
}
</script>
