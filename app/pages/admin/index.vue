<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

import { reviews } from '~/data/reviews'
import { priceFaktury, priceVidy } from '~/data/prices'
import { portfolio } from '~/data/portfolio'
import { promotions } from '~/data/promotions'

const stats = [
  { label: 'Отзывов',          value: reviews.length,                     icon: 'lucide:star',    color: '#fef9c3', icolor: '#a16207', href: '/admin/reviews',    trend: '+3 за месяц' },
  { label: 'Позиций в прайсе', value: priceFaktury.length + priceVidy.length, icon: 'lucide:tag', color: '#dbeafe', icolor: '#1d4ed8', href: '/admin/settings/prices', trend: 'актуально' },
  { label: 'Работ в портфолио',value: portfolio.length,                   icon: 'lucide:image',   color: '#dcfce7', icolor: '#166534', href: '/admin/portfolio',   trend: 'обновлено' },
  { label: 'Акций',            value: promotions.length,                  icon: 'lucide:percent', color: '#f3e8ff', icolor: '#7e22ce', href: '/admin/promotions',  trend: 'активно' },
]

const quickLinks = [
  { label: 'Отзывы',       desc: 'Редактировать и добавлять отзывы',    href: '/admin/reviews',          icon: 'lucide:star',      icolor: '#ca8a04' },
  { label: 'Цены',         desc: 'Прайс-лист услуг и материалов',       href: '/admin/settings/prices',  icon: 'lucide:tag',       icolor: '#2563eb' },
  { label: 'Акции',        desc: 'Спецпредложения и скидки',            href: '/admin/promotions',       icon: 'lucide:percent',   icolor: '#9333ea' },
  { label: 'Портфолио',    desc: 'Галерея выполненных работ',           href: '/admin/portfolio',              icon: 'lucide:image',       icolor: '#16a34a' },
  { label: 'Галерея',      desc: 'Фото в разделе «Галерея» на страницах', href: '/admin/catalog/page-gallery', icon: 'lucide:layout-grid', icolor: '#0d9488' },
  { label: 'Каталог',      desc: 'Категории и страницы каталога',       href: '/admin/catalog',                icon: 'lucide:grid-2x2',    icolor: '#0891b2' },
  { label: 'Настройки',    desc: 'Информация о сайте и прочее',         href: '/admin/settings/site',    icon: 'lucide:settings',  icolor: '#6b7280' },
]

const recentReviews = reviews.slice(0, 5)
function platLabel(p: string) {
  return ({ yandex: 'Яндекс', '2gis': '2ГИС', avito: 'Авито', own: 'Свой' } as Record<string,string>)[p] ?? p
}
function platColor(p: string) {
  return ({ yandex: '#fef2f2:#dc2626', '2gis': '#f0fdf4:#16a34a', avito: '#eff6ff:#2563eb', own: '#f9fafb:#6b7280' } as Record<string,string>)[p]?.split(':') ?? ['#f9fafb', '#6b7280']
}
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:24px">
    <div>
      <h1 class="adm-page-title">Дашборд</h1>
      <p class="adm-page-sub">Обзор состояния сайта ПроПотолок</p>
    </div>

    <!-- Stats -->
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px">
      <NuxtLink v-for="s in stats" :key="s.label" :to="s.href"
        class="adm-card" style="display:flex;flex-direction:column;gap:10px;padding:18px 20px;text-decoration:none;transition:box-shadow .15s"
        onmouseover="this.style.boxShadow='0 4px 16px rgba(0,0,0,.08)'"
        onmouseout="this.style.boxShadow=''">
        <div style="display:flex;align-items:flex-start;justify-content:space-between">
          <div :style="`width:38px;height:38px;border-radius:10px;background:${s.color};display:flex;align-items:center;justify-content:center`">
            <Icon :name="s.icon" :style="`width:18px;height:18px;color:${s.icolor}`" />
          </div>
          <Icon name="lucide:arrow-right" style="width:15px;height:15px;color:#d1d5db;margin-top:4px" />
        </div>
        <div>
          <div style="font-size:28px;font-weight:800;color:#111827;line-height:1">{{ s.value }}</div>
          <div style="font-size:13.5px;color:#6b7280;margin-top:3px">{{ s.label }}</div>
          <div style="font-size:12px;color:#9ca3af;margin-top:2px">{{ s.trend }}</div>
        </div>
      </NuxtLink>
    </div>

    <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px">
      <!-- Quick links -->
      <div class="adm-card adm-card--pad">
        <h2 style="font-size:15px;font-weight:700;margin:0 0 14px;color:#111827">Быстрые действия</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <NuxtLink v-for="lk in quickLinks" :key="lk.href" :to="lk.href"
            style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border:1.5px solid #e8eaed;border-radius:10px;text-decoration:none;transition:border-color .15s,background .15s"
            onmouseover="this.style.borderColor='#f5c800';this.style.background='#fffef5'"
            onmouseout="this.style.borderColor='#e8eaed';this.style.background=''">
            <Icon :name="lk.icon" :style="`width:18px;height:18px;color:${lk.icolor};flex-shrink:0;margin-top:1px`" />
            <div>
              <div style="font-size:13.5px;font-weight:600;color:#111827">{{ lk.label }}</div>
              <div style="font-size:12px;color:#9ca3af;margin-top:2px">{{ lk.desc }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Recent reviews -->
      <div class="adm-card adm-card--pad">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
          <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0">Последние отзывы</h2>
          <NuxtLink to="/admin/reviews" style="font-size:12.5px;color:#f5c800;text-decoration:none;font-weight:600">Все →</NuxtLink>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div v-for="r in recentReviews" :key="r.id" style="display:flex;align-items:flex-start;gap:10px;padding:10px;background:#f8f9fb;border-radius:9px">
            <div style="width:30px;height:30px;border-radius:50%;background:#e8eaed;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;font-weight:700;color:#374151">
              {{ r.author[0] }}
            </div>
            <div style="flex:1;min-width:0">
              <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                <span style="font-size:13px;font-weight:600;color:#111827;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ r.author }}</span>
                <span :style="`font-size:11px;padding:1px 6px;border-radius:5px;font-weight:600;background:${platColor(r.platform)[0]};color:${platColor(r.platform)[1]}`">{{ platLabel(r.platform) }}</span>
              </div>
              <div style="display:flex;gap:1px;margin-top:3px">
                <Icon v-for="i in 5" :key="i" name="lucide:star"
                  :style="`width:11px;height:11px;${i <= r.rating ? 'color:#f5c800;fill:#f5c800' : 'color:#e5e7eb'}`" />
              </div>
              <p style="font-size:12px;color:#6b7280;margin:4px 0 0;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">{{ r.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
