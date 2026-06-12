export const useAdminAuth = () => {
  const isLoading = ref(false)
  const error = ref('')

  async function login(login: string, password: string) {
    isLoading.value = true
    error.value = ''
    try {
      await $fetch('/api/admin/login', { method: 'POST', body: { login, password } })
      await navigateTo('/admin')
    } catch (e: any) {
      error.value = e?.data?.message || 'Ошибка входа'
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    await $fetch('/api/admin/logout', { method: 'POST' })
    await navigateTo('/admin/login')
  }

  return { login, logout, isLoading, error }
}
