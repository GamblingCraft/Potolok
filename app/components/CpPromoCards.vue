<script setup lang="ts">
import { useFeaturedPromotions } from '~/composables/usePromotions'

defineEmits<{ callback: [] }>()

const { data } = await useFeaturedPromotions()
const promos = computed(() => (data.value ?? []).slice(0, 3))
</script>

<template>
  <div class="cp-feat-grid">
    <div v-for="p in promos" :key="p.id" class="cp-feat-card">
      <div class="cp-feat-card__icon" :style="{ background: p.color + '22', color: p.color }">
        <Icon :name="p.icon" size="26" />
      </div>
      <div v-if="p.badge" class="cp-feat-card__badge">{{ p.badge }}</div>
      <div class="cp-feat-card__discount">{{ p.discount }}</div>
      <div class="cp-feat-card__title">{{ p.title }}</div>
      <div class="cp-feat-card__sub">{{ p.subtitle }}</div>
      <ul class="cp-feat-card__list">
        <li v-for="c in p.conditions.slice(0, 3)" :key="c">
          <Icon name="lucide:check" size="13" class="cp-feat-card__check" />{{ c }}
        </li>
      </ul>
      <button class="nav-btn cp-feat-card__btn" @click="$emit('callback')">Получить скидку</button>
    </div>
  </div>
</template>

<style>
.cp-feat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.cp-feat-card {
  background: #f7f7f7;
  border-radius: 20px;
  padding: 28px 24px;
  border: 1.5px solid #ececec;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: border-color .2s, box-shadow .2s;
}
.cp-feat-card:hover {
  border-color: var(--accent);
  box-shadow: 0 6px 24px rgba(245,200,0,.12);
}
.cp-feat-card__icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cp-feat-card__badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--accent);
  color: var(--dark);
  font-size: 10px;
  font-weight: 800;
  padding: 2px 10px;
  border-radius: 20px;
  text-transform: uppercase;
}
.cp-feat-card__discount {
  font-size: 36px;
  font-weight: 900;
  color: var(--dark);
  line-height: 1;
  font-family: var(--font);
}
.cp-feat-card__title {
  font-size: 17px;
  font-weight: 800;
  color: var(--dark);
}
.cp-feat-card__sub {
  font-size: 13px;
  color: var(--gray);
}
.cp-feat-card__list {
  list-style: none;
  padding: 0;
  margin: 4px 0 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}
.cp-feat-card__list li {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: #555;
}
.cp-feat-card__check { color: var(--accent); flex-shrink: 0; }
.cp-feat-card__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px;
  font-size: 13px;
  margin-top: 4px;
}

@media (max-width: 900px) {
  .cp-feat-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 580px) {
  .cp-feat-grid { grid-template-columns: 1fr; }
}
</style>
