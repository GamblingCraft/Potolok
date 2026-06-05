<template>
  <div class="fd">
    <Transition name="fd-slide" mode="out-in">
      <span :key="digit" class="fd__num">{{ digit }}</span>
    </Transition>
    <div class="fd__line" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ digit: string }>()
</script>

<style>
.fd {
  width: 32px;
  height: 44px;
  background: #2a2a2a;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 2px 6px rgba(0,0,0,.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.fd__line {
  position: absolute;
  left: 0; right: 0;
  top: 50%;
  height: 1px;
  background: #111;
  z-index: 2;
  pointer-events: none;
}
.fd__num {
  font-size: 24px;
  font-weight: 800;
  font-family: 'Gilroy', 'Roboto', sans-serif;
  color: #f5c800;
  line-height: 1;
  display: block;
  position: relative;
  z-index: 1;
}

.fd-slide-enter-active { transition: transform .2s ease, opacity .2s ease; }
.fd-slide-leave-active { transition: transform .2s ease, opacity .2s ease; }
.fd-slide-enter-from  { transform: translateY(-60%); opacity: 0; }
.fd-slide-leave-to    { transform: translateY(60%);  opacity: 0; }
</style>
