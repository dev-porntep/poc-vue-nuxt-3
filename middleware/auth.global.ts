import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()

  if (to.path === '/login' && auth.isAuthenticated) {
    return navigateTo('/dashboard')
  }

  const requiresAuth = to.meta?.requiresAuth === true
  if (!requiresAuth) {
    return
  }

  if (!auth.initialized && !auth.loading) {
    try {
      await auth.fetchMe()
    } catch {
      return navigateTo('/login')
    }
  }

  if (!auth.isAuthenticated) {
    return navigateTo('/login')
  }
})

