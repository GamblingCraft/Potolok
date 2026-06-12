export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return
  if (to.path === '/admin/login') return

  try {
    await $fetch('/api/admin/check')
  } catch {
    return navigateTo('/admin/login')
  }
})
