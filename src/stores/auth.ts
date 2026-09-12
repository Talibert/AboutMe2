import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import authService from '@/api/authService'
import type { User, LoginCredentials } from '@/types/auth'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null)
    const token = ref<string | null>(null)
    const isLoading = ref<boolean>(false)

    // Getters (computed)
    const isAuthenticated = computed(() => Boolean(token.value))
    const userName = computed(() => user.value?.name ?? 'Usuário')

    // Actions (functions)
    async function login(credentials: LoginCredentials | string): Promise<void> {
      isLoading.value = true
      try {
        const creds = typeof credentials === 'string' ? { email: credentials } : credentials
        const response = await authService.login(creds)

        token.value = response.token
        user.value = response.user
      } finally {
        isLoading.value = false
      }
    }

    async function logout(): Promise<void> {
      try {
        await authService.logout()
      } finally {
        token.value = null
        user.value = null
      }
    }

    return {
      user,
      token,
      isLoading,
      isAuthenticated,
      userName,
      login,
      logout,
    }
  },
  {
    persist: {
      pick: ['user', 'token'],
    },
  },
)
