<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const pages = [
  { title: 'Главная',        href: '/',               icon: 'lucide:home',        adminHref: '/admin/pages/glavnaya' },
  { title: 'Отзывы',         href: '/otzyvy',         icon: 'lucide:star',        adminHref: '/admin/reviews' },
  { title: 'Акции',          href: '/akcii',          icon: 'lucide:percent',     adminHref: '/admin/promotions' },
  { title: 'FAQ',            href: '/voprosy-otvety', icon: 'lucide:help-circle', adminHref: '/admin/faq' },
  { title: 'Контакты',       href: '/kontakty',       icon: 'lucide:map-pin',     adminHref: '/admin/contacts' },
  { title: 'Наши работы',    href: '/portfolio',      icon: 'lucide:image',       adminHref: '/admin/portfolio' },
]

const router = useRouter()
function openEdit(p: typeof pages[0]) {
  if (p.adminHref) router.push(p.adminHref)
}
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:20px">
    <div>
      <h1 class="adm-page-title">Страницы сайта</h1>
      <p class="adm-page-sub">Статические страницы — нажмите для редактирования</p>
    </div>

    <div class="adm-card" style="padding:0;overflow:hidden">
      <div
        v-for="p in pages" :key="p.href"
        style="display:flex;align-items:center;gap:14px;padding:13px 20px;border-bottom:1px solid #f0f0f0;transition:background .1s"
        :style="p.adminHref ? 'cursor:pointer' : 'opacity:.55'"
        onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background=''"
        @click="openEdit(p)"
      >
        <!-- Icon -->
        <div style="width:40px;height:40px;background:#f4f5f7;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid #e8eaed">
          <Icon :name="p.icon" style="width:18px;height:18px;color:#6b7280" />
        </div>

        <!-- Info -->
        <div style="flex:1;min-width:0">
          <div style="font-size:14.5px;font-weight:600;color:#111827">{{ p.title }}</div>
          <div style="font-size:12px;color:#9ca3af;font-family:monospace">{{ p.href }}</div>
        </div>

        <!-- Actions -->
        <div style="display:flex;gap:6px;flex-shrink:0" @click.stop>
          <NuxtLink
            v-if="p.adminHref"
            :to="p.adminHref"
            style="display:inline-flex;align-items:center;gap:5px;padding:6px 12px;background:#f5c800;border-radius:8px;cursor:pointer;color:#111827;font-size:12.5px;font-weight:600;text-decoration:none;transition:background .15s;white-space:nowrap"
            onmouseover="this.style.background='#e0b400'" onmouseout="this.style.background='#f5c800'"
          >
            <Icon name="lucide:pencil" style="width:13px;height:13px" />Редактировать
          </NuxtLink>
          <span v-else style="display:inline-flex;align-items:center;gap:5px;padding:6px 12px;background:#f4f5f7;border:1px solid #e8eaed;border-radius:8px;color:#9ca3af;font-size:12.5px">
            <Icon name="lucide:lock" style="width:13px;height:13px" />Скоро
          </span>
          <a
            :href="p.href" target="_blank"
            style="display:inline-flex;align-items:center;padding:6px 8px;background:#f4f5f7;border:1px solid #e8eaed;border-radius:8px;color:#6b7280;text-decoration:none;transition:all .15s"
            onmouseover="this.style.background='#eaebed'" onmouseout="this.style.background='#f4f5f7'"
          >
            <Icon name="lucide:external-link" style="width:14px;height:14px" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
