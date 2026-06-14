<script setup lang="ts">
defineOptions({ name: 'AdminLayout' })

import { faktury, vidy, pomeshcheniya, brendy, tsveta } from '~/data/catalog'
import { services } from '~/data/services'

const route  = useRoute()
const { logout } = useAdminAuth()

// ── Sidebar open/collapsed ─────────────────────────────
const collapsed = ref(false)

// ── Open groups set ────────────────────────────────────
const open = ref<Set<string>>(new Set(['catalog', 'services']))

function toggle(id: string) {
  open.value.has(id) ? open.value.delete(id) : open.value.add(id)
}
function isOpen(id: string) { return open.value.has(id) }

// ── Active check ───────────────────────────────────────
function active(href: string, exact = false) {
  if (exact) return route.path === href
  return route.path === href || route.path.startsWith(href + '/')
}

// ── Catalog sections ───────────────────────────────────
const catalogSections = [
  { id: 'faktury',      label: 'Фактуры',       icon: 'lucide:layers',      items: faktury },
  { id: 'vidy',         label: 'Виды',           icon: 'lucide:sparkles',    items: vidy },
  { id: 'pomeshcheniya',label: 'По помещению',   icon: 'lucide:home',        items: pomeshcheniya },
  { id: 'brendy',       label: 'Бренды',         icon: 'lucide:award',       items: brendy },
  { id: 'tsveta',       label: 'Цвета',          icon: 'lucide:palette',     items: tsveta },
]

// ── SEO sub-items ──────────────────────────────────────
const seoItems = [
  { label: 'Верификация',   href: '/admin/seo/verification', icon: 'lucide:shield-check' },
  { label: 'Счётчики',      href: '/admin/seo/counters',     icon: 'lucide:code' },
  { label: 'Meta шаблоны',  href: '/admin/seo/meta',         icon: 'lucide:file-type' },
  { label: 'Robots.txt',    href: '/admin/seo/robots',       icon: 'lucide:bot' },
  { label: 'llms.txt',      href: '/admin/seo/llms',         icon: 'lucide:brain' },
  { label: 'Sitemap.xml',   href: '/admin/seo/sitemap',      icon: 'lucide:map' },
]

const settingsItems = [
  { label: 'Информация',    href: '/admin/settings/site',    icon: 'lucide:building-2' },
  { label: 'Цены',          href: '/admin/settings/prices',  icon: 'lucide:tag' },
  { label: 'Контакты',      href: '/admin/contacts',         icon: 'lucide:map-pin' },
]

// Auto-open section based on route
watch(() => route.path, (p) => {
  if (p.startsWith('/admin/catalog'))  open.value.add('catalog')
  if (p.startsWith('/admin/services')) open.value.add('services')
  if (p.startsWith('/admin/seo'))      open.value.add('seo')
  if (p.startsWith('/admin/settings')) open.value.add('settings')
}, { immediate: true })

// New requests count
const { data: requestsData } = await useAsyncData(
  'admin-new-requests-count',
  () => $fetch<{ id: number; status: string }[]>('/api/admin/requests'),
  { default: () => [] },
)
const newRequestsCount = computed(() =>
  (requestsData.value ?? []).filter((r) => r.status === 'new').length
)
</script>

<template>
  <div class="adm">

    <!-- ══════════════ SIDEBAR ══════════════ -->
    <aside :class="['adm-sidebar', collapsed && 'adm-sidebar--sm']">

      <!-- Logo -->
      <div class="adm-logo">
        <div class="adm-logo__icon">
          <Icon name="lucide:zap" />
        </div>
        <div v-if="!collapsed" class="adm-logo__text">
          <span class="adm-logo__name">ПроПотолок</span>
          <span class="adm-logo__sub">Панель управления</span>
        </div>
      </div>

      <!-- Nav -->
      <nav class="adm-nav">

        <!-- Dashboard -->
        <NuxtLink to="/admin" class="adm-link" :class="active('/admin', true) && 'adm-link--on'" :title="collapsed ? 'Дашборд' : ''">
          <Icon name="lucide:layout-dashboard" class="adm-link__ic" />
          <span v-if="!collapsed" class="adm-link__label">Дашборд</span>
        </NuxtLink>

        <!-- Requests -->
        <NuxtLink to="/admin/requests" class="adm-link" :class="active('/admin/requests') && 'adm-link--on'" :title="collapsed ? 'Заявки' : ''">
          <Icon name="lucide:inbox" class="adm-link__ic" />
          <span v-if="!collapsed" class="adm-link__label">Заявки</span>
          <span v-if="!collapsed && newRequestsCount > 0" class="adm-badge">{{ newRequestsCount }}</span>
        </NuxtLink>

        <div class="adm-sep" />

        <!-- ── CATALOG ── -->
        <button class="adm-group-head" :class="active('/admin/catalog') && 'adm-group-head--on'" @click="toggle('catalog')" :title="collapsed ? 'Каталог' : ''">
          <Icon name="lucide:book-open" class="adm-link__ic" />
          <span v-if="!collapsed" class="adm-link__label">Каталог</span>
          <Icon v-if="!collapsed" name="lucide:chevron-down" class="adm-chevron" :class="isOpen('catalog') && 'adm-chevron--open'" />
        </button>

        <div v-if="isOpen('catalog') && !collapsed" class="adm-sub">
          <!-- Overview -->
          <NuxtLink to="/admin/catalog" class="adm-sub__link" :class="active('/admin/catalog', true) && 'adm-sub__link--on'">
            <Icon name="lucide:grid-2x2" class="adm-sub__ic" />Обзор
          </NuxtLink>

          <!-- Nested sections -->
          <div v-for="sec in catalogSections" :key="sec.id">
            <button class="adm-sub__group" @click="toggle('cat-' + sec.id)">
              <Icon :name="sec.icon" class="adm-sub__ic" />
              <span>{{ sec.label }}</span>
              <span class="adm-sub__count">{{ sec.items.length }}</span>
              <Icon name="lucide:chevron-right" class="adm-sub__arrow" :class="isOpen('cat-' + sec.id) && 'adm-sub__arrow--open'" />
            </button>
            <div v-if="isOpen('cat-' + sec.id)" class="adm-sub2">
              <NuxtLink
                v-for="item in sec.items"
                :key="item.id"
                :to="`/admin/catalog/page/${item.slug.split('/').pop()}`"
                class="adm-sub2__link"
                :class="route.path.includes(item.slug.split('/').pop()!) && 'adm-sub2__link--on'"
              >
                {{ item.title }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- ── SERVICES ── -->
        <button class="adm-group-head" :class="active('/admin/services') && 'adm-group-head--on'" @click="toggle('services')" :title="collapsed ? 'Услуги' : ''">
          <Icon name="lucide:wrench" class="adm-link__ic" />
          <span v-if="!collapsed" class="adm-link__label">Услуги</span>
          <Icon v-if="!collapsed" name="lucide:chevron-down" class="adm-chevron" :class="isOpen('services') && 'adm-chevron--open'" />
        </button>

        <div v-if="isOpen('services') && !collapsed" class="adm-sub">
          <NuxtLink to="/admin/services" class="adm-sub__link" :class="active('/admin/services', true) && 'adm-sub__link--on'">
            <Icon name="lucide:grid-2x2" class="adm-sub__ic" />Все услуги
          </NuxtLink>
          <NuxtLink
            v-for="svc in services.slice(0, 8)"
            :key="svc.id"
            :to="`/admin/services/${svc.slug}`"
            class="adm-sub__link"
            :class="route.path.includes(svc.slug) && 'adm-sub__link--on'"
          >
            <Icon :name="svc.icon" class="adm-sub__ic" />{{ svc.shortTitle }}
          </NuxtLink>
        </div>

        <!-- Pages -->
        <NuxtLink to="/admin/pages" class="adm-link" :class="active('/admin/pages') && 'adm-link--on'" :title="collapsed ? 'Страницы' : ''">
          <Icon name="lucide:file-text" class="adm-link__ic" />
          <span v-if="!collapsed" class="adm-link__label">Страницы</span>
        </NuxtLink>

        <!-- О компании -->
        <button class="adm-group-head" :class="active('/admin/about') && 'adm-group-head--on'" @click="toggle('about')" :title="collapsed ? 'О компании' : ''">
          <Icon name="lucide:users" class="adm-link__ic" />
          <span v-if="!collapsed" class="adm-link__label">О компании</span>
          <Icon v-if="!collapsed" name="lucide:chevron-down" class="adm-chevron" :class="isOpen('about') && 'adm-chevron--open'" />
        </button>
        <div v-if="isOpen('about') && !collapsed" class="adm-sub">
          <NuxtLink to="/admin/about/team" class="adm-sub__link" :class="active('/admin/about/team') && 'adm-sub__link--on'">
            <Icon name="lucide:user-circle" class="adm-sub__ic" />Команда
          </NuxtLink>
          <NuxtLink to="/admin/about/certificates" class="adm-sub__link" :class="active('/admin/about/certificates') && 'adm-sub__link--on'">
            <Icon name="lucide:award" class="adm-sub__ic" />Сертификаты
          </NuxtLink>
        </div>

        <div class="adm-sep" />

        <!-- ── SETTINGS ── -->
        <button class="adm-group-head" :class="active('/admin/settings') && 'adm-group-head--on'" @click="toggle('settings')" :title="collapsed ? 'Настройки' : ''">
          <Icon name="lucide:settings-2" class="adm-link__ic" />
          <span v-if="!collapsed" class="adm-link__label">Настройки</span>
          <Icon v-if="!collapsed" name="lucide:chevron-down" class="adm-chevron" :class="isOpen('settings') && 'adm-chevron--open'" />
        </button>
        <div v-if="isOpen('settings') && !collapsed" class="adm-sub">
          <NuxtLink v-for="it in settingsItems" :key="it.href" :to="it.href" class="adm-sub__link" :class="active(it.href) && 'adm-sub__link--on'">
            <Icon :name="it.icon" class="adm-sub__ic" />{{ it.label }}
          </NuxtLink>
        </div>

        <!-- ── SEO ── -->
        <button class="adm-group-head" :class="active('/admin/seo') && 'adm-group-head--on'" @click="toggle('seo')" :title="collapsed ? 'SEO' : ''">
          <Icon name="lucide:search" class="adm-link__ic" />
          <span v-if="!collapsed" class="adm-link__label">SEO</span>
          <Icon v-if="!collapsed" name="lucide:chevron-down" class="adm-chevron" :class="isOpen('seo') && 'adm-chevron--open'" />
        </button>
        <div v-if="isOpen('seo') && !collapsed" class="adm-sub">
          <NuxtLink v-for="it in seoItems" :key="it.href" :to="it.href" class="adm-sub__link" :class="active(it.href) && 'adm-sub__link--on'">
            <Icon :name="it.icon" class="adm-sub__ic" />{{ it.label }}
          </NuxtLink>
        </div>

        <div class="adm-sep" />

        <!-- Site link -->
        <a href="/" target="_blank" class="adm-link" :title="collapsed ? 'Открыть сайт' : ''">
          <Icon name="lucide:external-link" class="adm-link__ic" />
          <span v-if="!collapsed" class="adm-link__label">Открыть сайт</span>
        </a>

      </nav>

      <!-- User footer -->
      <div class="adm-user">
        <div class="adm-user__av">A</div>
        <div v-if="!collapsed" class="adm-user__info">
          <span class="adm-user__name">Администратор</span>
          <button class="adm-user__logout" @click="logout">Выйти</button>
        </div>
        <button v-if="!collapsed" class="adm-user__toggle" @click="collapsed = !collapsed" title="Свернуть">
          <Icon name="lucide:panel-left-close" />
        </button>
        <button v-else class="adm-user__toggle" @click="collapsed = !collapsed" title="Развернуть">
          <Icon name="lucide:panel-left-open" />
        </button>
      </div>
    </aside>

    <!-- ══════════════ MAIN ══════════════ -->
    <div class="adm-main">

      <!-- Topbar -->
      <header class="adm-topbar">
        <div class="adm-topbar__crumbs">
          <NuxtLink to="/admin" class="adm-crumb">Главная</NuxtLink>
          <template v-for="(seg, i) in route.path.replace('/admin','').split('/').filter(Boolean)" :key="i">
            <Icon name="lucide:chevron-right" style="width:14px;height:14px;opacity:.4;flex-shrink:0" />
            <span class="adm-crumb adm-crumb--cur">{{ seg }}</span>
          </template>
        </div>
        <div class="adm-topbar__right">
          <a href="/" target="_blank" class="adm-topbar__site">
            <Icon name="lucide:globe" style="width:15px;height:15px" />
            Сайт
          </a>
        </div>
      </header>

      <!-- Content -->
      <main class="adm-content">
        <slot />
      </main>
    </div>

  </div>
</template>

<style>
/* ═══════════════════════════════════════════════════════════════
   ADMIN SHELL — isolated styles, never leak to main site
   All selectors start with .adm or are inside .adm
═══════════════════════════════════════════════════════════════ */

/* ── Layout ── */
.adm {
  display: flex;
  min-height: 100vh;
  background: #f4f5f7;
  font-family: 'Inter', 'Gilroy', 'Roboto', sans-serif;
  font-size: 15px;
  line-height: 1.5;
  color: #111827;
}
.adm *, .adm *::before, .adm *::after {
  box-sizing: border-box;
}

/* ── Sidebar ── */
.adm-sidebar {
  width: 260px;
  min-height: 100vh;
  background: #13131a;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  transition: width .25s ease;
  z-index: 40;
}
.adm-sidebar--sm { width: 60px; }

/* Logo */
.adm-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 16px;
  border-bottom: 1px solid rgba(255,255,255,.07);
  flex-shrink: 0;
}
.adm-logo__icon {
  width: 36px; height: 36px;
  background: #f5c800;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: #13131a;
  font-size: 18px;
}
.adm-logo__text { display: flex; flex-direction: column; min-width: 0; }
.adm-logo__name { font-size: 15px; font-weight: 700; color: #fff; white-space: nowrap; }
.adm-logo__sub  { font-size: 11px; color: rgba(255,255,255,.35); white-space: nowrap; }

/* Nav */
.adm-nav {
  flex: 1;
  overflow-y: auto;
  padding: 10px 8px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,.08) transparent;
}
.adm-nav::-webkit-scrollbar { width: 3px; }
.adm-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 2px; }

.adm-sep {
  height: 1px;
  background: rgba(255,255,255,.06);
  margin: 6px 4px;
}

/* Base link */
.adm-link, .adm-group-head {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 10px;
  border-radius: 8px;
  font-size: 14.5px;
  font-weight: 500;
  color: rgba(255,255,255,.5);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background .15s, color .15s;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
}
.adm-link:hover, .adm-group-head:hover {
  background: rgba(255,255,255,.06);
  color: rgba(255,255,255,.9);
}
.adm-link--on {
  background: #f5c800 !important;
  color: #13131a !important;
  font-weight: 700;
}
.adm-group-head--on {
  color: #f5c800 !important;
}

.adm-link__ic {
  width: 18px; height: 18px;
  flex-shrink: 0;
}
.adm-link__label { flex: 1; }
.adm-badge {
  background: #ef4444;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 10px;
  flex-shrink: 0;
}
.adm-chevron {
  width: 14px; height: 14px;
  flex-shrink: 0;
  transition: transform .2s;
  opacity: .5;
}
.adm-chevron--open { transform: rotate(180deg); }

/* Sub-items (level 2) */
.adm-sub {
  padding-left: 8px;
  margin: 2px 0 4px;
  border-left: 2px solid rgba(255,255,255,.08);
  margin-left: 18px;
}
.adm-sub__link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 8px;
  border-radius: 7px;
  font-size: 13.5px;
  font-weight: 500;
  color: rgba(255,255,255,.45);
  text-decoration: none;
  transition: background .15s, color .15s;
  white-space: nowrap;
  overflow: hidden;
}
.adm-sub__link:hover { background: rgba(255,255,255,.05); color: rgba(255,255,255,.85); }
.adm-sub__link--on   { color: #f5c800 !important; background: rgba(245,200,0,.08) !important; }

.adm-sub__group {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 7px 8px;
  border-radius: 7px;
  font-size: 13.5px;
  font-weight: 500;
  color: rgba(255,255,255,.45);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background .15s, color .15s;
}
.adm-sub__group:hover { background: rgba(255,255,255,.05); color: rgba(255,255,255,.85); }

.adm-sub__ic { width: 14px; height: 14px; flex-shrink: 0; opacity: .6; }
.adm-sub__count {
  font-size: 11px;
  color: rgba(255,255,255,.25);
  background: rgba(255,255,255,.08);
  padding: 0 5px;
  border-radius: 8px;
  margin-left: auto;
}
.adm-sub__arrow {
  width: 12px; height: 12px;
  flex-shrink: 0;
  opacity: .4;
  transition: transform .2s;
}
.adm-sub__arrow--open { transform: rotate(90deg); }

/* Sub-items level 3 */
.adm-sub2 {
  padding-left: 6px;
  margin: 1px 0 2px;
  border-left: 1px solid rgba(255,255,255,.06);
  margin-left: 14px;
  max-height: 200px;
  overflow-y: auto;
  scrollbar-width: none;
}
.adm-sub2__link {
  display: block;
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 12.5px;
  color: rgba(255,255,255,.35);
  text-decoration: none;
  transition: background .12s, color .12s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.adm-sub2__link:hover { color: rgba(255,255,255,.75); background: rgba(255,255,255,.04); }
.adm-sub2__link--on   { color: #f5c800 !important; }

/* User footer */
.adm-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-top: 1px solid rgba(255,255,255,.07);
  flex-shrink: 0;
}
.adm-user__av {
  width: 32px; height: 32px;
  background: #f5c800;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px;
  font-weight: 800;
  color: #13131a;
  flex-shrink: 0;
}
.adm-user__info { flex: 1; min-width: 0; }
.adm-user__name { display: block; font-size: 13px; font-weight: 600; color: rgba(255,255,255,.8); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.adm-user__logout { display: block; font-size: 11.5px; color: rgba(255,255,255,.3); background: none; border: none; cursor: pointer; padding: 0; font-family: inherit; transition: color .15s; }
.adm-user__logout:hover { color: #ef4444; }
.adm-user__toggle { background: none; border: none; cursor: pointer; color: rgba(255,255,255,.3); padding: 4px; border-radius: 6px; transition: color .15s, background .15s; flex-shrink: 0; display: flex; }
.adm-user__toggle:hover { color: rgba(255,255,255,.7); background: rgba(255,255,255,.06); }

/* ── Main area ── */
.adm-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 100vh;
}

/* Topbar */
.adm-topbar {
  background: #fff;
  border-bottom: 1px solid #e8eaed;
  padding: 0 24px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 20;
}
.adm-topbar__crumbs { display: flex; align-items: center; gap: 6px; }
.adm-crumb { font-size: 14px; color: #6b7280; text-decoration: none; transition: color .15s; }
.adm-crumb:hover { color: #111827; }
.adm-crumb--cur { color: #111827; font-weight: 600; }
.adm-topbar__right { display: flex; align-items: center; gap: 10px; }
.adm-topbar__site {
  display: flex; align-items: center; gap: 6px;
  font-size: 13.5px; color: #6b7280;
  background: #f4f5f7;
  border: 1px solid #e8eaed;
  padding: 5px 12px;
  border-radius: 8px;
  text-decoration: none;
  transition: background .15s, color .15s;
}
.adm-topbar__site:hover { background: #eaebed; color: #374151; }

/* Content */
.adm-content {
  flex: 1;
  padding: 28px 28px;
  overflow: auto;
}

/* ── Global helper classes for admin pages ── */
.adm-page-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px;
}
.adm-page-sub {
  font-size: 13.5px;
  color: #9ca3af;
  margin: 0;
}
.adm-card {
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e8eaed;
  padding: 20px;
}
.adm-card--pad { padding: 24px; }
.adm-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 18px;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-family: inherit;
  transition: background .15s, opacity .15s;
  text-decoration: none;
  white-space: nowrap;
}
.adm-btn--primary { background: #f5c800; color: #13131a; }
.adm-btn--primary:hover { background: #e0b400; }
.adm-btn--ghost { background: #f4f5f7; color: #374151; border: 1px solid #e8eaed; }
.adm-btn--ghost:hover { background: #eaebed; }
.adm-btn--danger { background: #fef2f2; color: #ef4444; border: 1px solid #fecaca; }
.adm-btn--danger:hover { background: #fee2e2; }
.adm-input {
  width: 100%;
  padding: 9px 13px;
  border: 1.5px solid #e8eaed;
  border-radius: 9px;
  font-size: 14px;
  font-family: inherit;
  color: #111827;
  background: #fff;
  outline: none;
  transition: border-color .15s;
}
.adm-input:focus { border-color: #f5c800; }
.adm-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: .05em;
  margin-bottom: 6px;
}
.adm-textarea {
  width: 100%;
  padding: 10px 13px;
  border: 1.5px solid #e8eaed;
  border-radius: 9px;
  font-size: 14px;
  font-family: inherit;
  color: #111827;
  background: #fff;
  outline: none;
  transition: border-color .15s;
  resize: vertical;
}
.adm-textarea:focus { border-color: #f5c800; }
.adm-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 11.5px;
  font-weight: 600;
  background: #f4f5f7;
  color: #6b7280;
  border: 1px solid #e8eaed;
}
.adm-tag--yellow { background: #fefce8; color: #92400e; border-color: #fde68a; }
.adm-tag--green  { background: #f0fdf4; color: #166534; border-color: #bbf7d0; }
.adm-tag--red    { background: #fef2f2; color: #991b1b; border-color: #fecaca; }
.adm-tag--blue   { background: #eff6ff; color: #1e40af; border-color: #bfdbfe; }

.adm-tab-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 14px; border-radius: 9px;
  font-size: 13px; font-weight: 500; color: #6b7280;
  background: none; border: none; cursor: pointer;
  font-family: inherit; transition: background .15s, color .15s;
}
.adm-tab-btn:hover { background: #e8eaed; color: #374151; }
.adm-tab-btn--on { background: #13131a !important; color: #f5c800 !important; font-weight: 700; }

@keyframes adm-spin { to { transform: rotate(360deg); } }
.adm-spin { animation: adm-spin .8s linear infinite; display: inline-block; }
</style>
