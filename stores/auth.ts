import { defineStore } from 'pinia'
import { createApiFetcher } from '~/services/http'
import { createAuthService } from '~/services/auth.service'
import type { LoginDto, User } from '~/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const initialized = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  const apiFetch = createApiFetcher(useRuntimeConfig().public.apiBase)
  const authService = createAuthService(apiFetch)

  async function fetchMe() {
    loading.value = true
    error.value = null
    try {
      user.value = await authService.me()
      initialized.value = true
      return user.value
    } catch (e: unknown) {
      user.value = null
      initialized.value = true
      error.value = e instanceof Error ? e.message : 'Failed to fetch session'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function login(dto: LoginDto) {
    loading.value = true
    error.value = null
    try {
      user.value = await authService.login(dto)
      initialized.value = true
      return user.value
    } catch (e: unknown) {
      user.value = null
      initialized.value = true
      error.value = e instanceof Error ? e.message : 'Login failed'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    error.value = null
    try {
      await authService.logout()
    } finally {
      user.value = null
      initialized.value = true
      loading.value = false
    }
  }

  return {
    user,
    initialized,
    loading,
    error,
    isAuthenticated,
    fetchMe,
    login,
    logout,
  }
})

