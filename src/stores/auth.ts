import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/auth'

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
    async function login(email: string): Promise<void> {
      isLoading.value = true
      try {
        // Simulação de requisição à API
        await new Promise((resolve) => setTimeout(resolve, 600))

        token.value = `mock_jwt_token_${Date.now()}`
        user.value = {
          id: 'user_1',
          name: email.split('@')[0] ?? 'Usuário BaseFront',
          email,
          role: 'admin',
        }
      } finally {
        isLoading.value = false
      }
    }

    function logout(): void {
      token.value = null
      user.value = null
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
