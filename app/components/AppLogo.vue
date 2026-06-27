<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 380 185"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :aria-label="alt"
  >
    <title>{{ alt }}</title>
    <text
      x="190"
      y="108"
      text-anchor="middle"
      font-family="'Gilroy', 'Arial Black', 'Impact', sans-serif"
      font-weight="800"
      font-size="138"
      fill="currentColor"
      letter-spacing="-2"
    >PRO</text>
    <text
      x="222"
      y="178"
      text-anchor="middle"
      font-family="'Gilroy', 'Arial Black', 'Impact', sans-serif"
      font-weight="700"
      font-size="68"
      fill="currentColor"
      letter-spacing="1"
    >potolok</text>
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  width?: number | string
  height?: number | string
  alt?: string
}>(), {
  width: 'auto',
  height: '100%',
  alt: 'ПроПотолок — натяжные потолки Иркутск',
})
</script>
