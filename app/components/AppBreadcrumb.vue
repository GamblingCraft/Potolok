<template>
  <nav class="breadcrumb" aria-label="Breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">

    <NuxtLink
      to="/"
      class="breadcrumb__item"
      itemprop="itemListElement"
      itemscope
      itemtype="https://schema.org/ListItem"
    >
      <span itemprop="item" itemscope itemtype="https://schema.org/WebPage" :itemid="baseUrl + '/'">
        <Icon name="lucide:home" size="13" class="breadcrumb__home-icon"/>
        <span itemprop="name">Главная</span>
      </span>
      <meta itemprop="position" content="1"/>
    </NuxtLink>

    <template v-for="(crumb, i) in items" :key="crumb.to ?? i">
      <span class="breadcrumb__sep" aria-hidden="true">/</span>

      <!-- Last item — no link -->
      <span
        v-if="i === items.length - 1"
        class="breadcrumb__item breadcrumb__item--current"
        aria-current="page"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <span itemprop="item" itemscope itemtype="https://schema.org/WebPage" :itemid="baseUrl + (crumb.to ?? '')">
          <span itemprop="name">{{ crumb.title }}</span>
        </span>
        <meta :itemprop="'position'" :content="String(i + 2)"/>
      </span>

      <!-- Middle items — with link -->
      <NuxtLink
        v-else
        :to="crumb.to!"
        class="breadcrumb__item"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <span itemprop="item" itemscope itemtype="https://schema.org/WebPage" :itemid="baseUrl + crumb.to">
          <span itemprop="name">{{ crumb.title }}</span>
        </span>
        <meta :itemprop="'position'" :content="String(i + 2)"/>
      </NuxtLink>
    </template>

  </nav>

</template>

<script setup lang="ts">
interface Crumb {
  title: string
  to?: string
}

const props = defineProps<{
  items: Crumb[]
}>()

const baseUrl = 'https://ropropotolok.ru'

const schema = computed(() => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Главная',
      item: baseUrl + '/',
    },
    ...props.items.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: crumb.title,
      ...(crumb.to ? { item: baseUrl + crumb.to } : {}),
    })),
  ],
}))

useHead({ script: [{ type: 'application/ld+json', innerHTML: schema }] })
</script>

<style>
.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 13px;
  color: rgba(255,255,255,.35);
  padding: 2px 0;
}
.breadcrumb__home-icon { margin-right: 6px; }

/* Dark variant (hero/dark sections) */
.breadcrumb--light {
  color: var(--gray);
}
.breadcrumb--light .breadcrumb__item { color: var(--gray); }
.breadcrumb--light .breadcrumb__item:hover { color: var(--dark); }
.breadcrumb--light .breadcrumb__item--current { color: var(--dark); font-weight: 600; }
.breadcrumb--light .breadcrumb__sep { color: var(--border); }

.breadcrumb__item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: rgba(255,255,255,.35);
  text-decoration: none;
  transition: color .15s;
  white-space: nowrap;
}
.breadcrumb__item:hover { color: rgba(255,255,255,.7); }
.breadcrumb__item--current {
  color: rgba(255,255,255,.7);
  font-weight: 600;
  cursor: default;
}
.breadcrumb__sep {
  color: rgba(255,255,255,.2);
  user-select: none;
}
.breadcrumb__home-icon { flex-shrink: 0; }
</style>
