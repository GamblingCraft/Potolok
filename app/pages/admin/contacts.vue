<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })
// Контакты перенесены в Настройки → Информация
await navigateTo('/admin/settings/site', { replace: true })
</script>
<template><div /></template>
