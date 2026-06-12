<template>
  <div v-if="visible && config.enabled" class="top-banner">
    <div class="top-banner__inner container">

      <div class="top-banner__text">
        <span class="top-banner__label">
          <Icon name="lucide:zap" size="12" />
          {{ config.label }}
        </span>
        {{ config.text }}
      </div>

      <div class="top-banner__timer">
        <span class="top-banner__timer-label">Осталось:</span>
        <div class="flip-clock">
          <FlipDigit :digit="hh[0]" />
          <FlipDigit :digit="hh[1]" />
          <span class="flip-sep">:</span>
          <FlipDigit :digit="mm[0]" />
          <FlipDigit :digit="mm[1]" />
          <span class="flip-sep">:</span>
          <FlipDigit :digit="ss[0]" />
          <FlipDigit :digit="ss[1]" />
        </div>
      </div>

      <button class="top-banner__close" @click="close" aria-label="Закрыть">
        <Icon name="lucide:x" size="16" />
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { BannerConfig } from '~/server/api/cms/banner.get'

const { data: configData } = await useAsyncData<BannerConfig>(
  'top-banner-config',
  () => $fetch<BannerConfig>('/api/cms/banner'),
  { default: () => ({ enabled: true, text: 'Бесплатный замер + скидка 10% на монтаж — только сегодня!', label: 'Акция', durationHours: 12 }) },
)
const config = computed(() => configData.value!)

const visible = ref(false)
const remaining = ref(0)

const pad = (n: number) => String(n).padStart(2, '0')
const hh = computed(() => pad(Math.floor(remaining.value / 3600)).split(''))
const mm = computed(() => pad(Math.floor((remaining.value % 3600) / 60)).split(''))
const ss = computed(() => pad(remaining.value % 60).split(''))

let interval: ReturnType<typeof setInterval>

onMounted(() => {
  if (localStorage.getItem('banner_closed')) return

  const duration = (config.value.durationHours ?? 12) * 3600
  const saved = localStorage.getItem('banner_end')
  const end = saved ? parseInt(saved) : Date.now() + duration * 1000
  if (!saved) localStorage.setItem('banner_end', String(end))

  remaining.value = Math.max(0, Math.round((end - Date.now()) / 1000))
  visible.value = true

  interval = setInterval(() => {
    remaining.value = Math.max(0, Math.round((end - Date.now()) / 1000))
    if (remaining.value === 0) clearInterval(interval)
  }, 1000)
})

onUnmounted(() => clearInterval(interval))

function close() {
  visible.value = false
  localStorage.setItem('banner_closed', '1')
}
</script>

<style scoped>
.top-banner {
  background: var(--dark);
  color: #fff;
  padding: 8px 0;
  position: relative;
  z-index: 101;
}
.top-banner__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.top-banner__text {
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.top-banner__label {
  background: var(--accent);
  color: var(--dark);
  font-weight: 700;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 20px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.top-banner__timer {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.top-banner__timer-label {
  font-size: 12px;
  color: #aaa;
  white-space: nowrap;
}
.flip-clock {
  display: flex;
  align-items: center;
  gap: 3px;
}
.flip-sep {
  font-size: 22px;
  font-weight: 800;
  color: var(--accent);
  line-height: 1;
  margin: 0 1px;
}
.top-banner__close {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  flex-shrink: 0;
  transition: color .15s;
}
.top-banner__close:hover { color: #fff; }

@media (max-width: 768px) {
  .top-banner__text { display: none; }
  .top-banner__inner { justify-content: center; }
}
</style>
