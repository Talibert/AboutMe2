import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { AxiosError } from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import apiClient from '../client'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

describe('HTTP Client Centralizado (src/api/client.ts)', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('Request Interceptor (Injeção de Token)', () => {
    it('1. Deve anexar o cabeçalho Authorization com Bearer quando houver token na store', async () => {
      const authStore = useAuthStore()
      authStore.token = 'meu-token-jwt-secreto'

      let capturedConfig: InternalAxiosRequestConfig | null = null

      // Simula o adapter de rede capturando o config final
      apiClient.defaults.adapter = async (config) => {
        capturedConfig = config
        return {
          data: { status: 'ok' },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        }
      }

      await apiClient.get('/teste-protegido')

      expect(capturedConfig).not.toBeNull()
      expect(capturedConfig!.headers.Authorization).toBe('Bearer meu-token-jwt-secreto')
    })

    it('2. Não deve anexar o cabeçalho Authorization quando o usuário estiver deslogado', async () => {
      const authStore = useAuthStore()
      authStore.token = null

      let capturedConfig: InternalAxiosRequestConfig | null = null

      apiClient.defaults.adapter = async (config) => {
        capturedConfig = config
        return {
          data: { status: 'ok' },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        }
      }

      await apiClient.get('/teste-publico')

      expect(capturedConfig).not.toBeNull()
      expect(capturedConfig!.headers.Authorization).toBeUndefined()
    })
  })

  describe('Response Interceptor (Tratamento de 401 Unauthorized)', () => {
    it('3. Deve executar logout() e redirecionar para /login ao receber status 401', async () => {
      const authStore = useAuthStore()
      authStore.token = 'token-expirado'
      authStore.user = { id: '1', name: 'Taliberti', email: 't@t.com', role: 'admin' }

      const logoutSpy = vi.spyOn(authStore, 'logout')
      const routerPushSpy = vi.spyOn(router, 'push').mockImplementation(async () => {})

      // Força a rota atual a ser diferente de login para disparar o redirecionamento
      router.currentRoute.value = {
        name: 'profile',
        fullPath: '/profile',
        path: '/profile',
        hash: '',
        query: {},
        params: {},
        matched: [],
        meta: {},
        redirectedFrom: undefined,
      }

      // Simula resposta de erro 401 do servidor
      apiClient.defaults.adapter = async (config) => {
        const error = new AxiosError(
          'Request failed with status code 401',
          'ERR_BAD_REQUEST',
          config,
          null,
          {
            status: 401,
            statusText: 'Unauthorized',
            data: { message: 'Sessão expirada' },
            headers: {},
            config,
          },
        )
        throw error
      }

      // A requisição deve ser rejeitada
      await expect(apiClient.get('/recurso-protegido')).rejects.toThrow()

      // Valida o auto-logout
      expect(logoutSpy).toHaveBeenCalledTimes(1)

      // Valida o redirecionamento para o login com a rota original salva
      expect(routerPushSpy).toHaveBeenCalledWith({
        name: 'login',
        query: { redirect: '/profile' },
      })
    })

    it('4. Não deve disparar redirecionamento se já estiver na tela de login ao receber 401', async () => {
      const authStore = useAuthStore()
      const routerPushSpy = vi.spyOn(router, 'push').mockImplementation(async () => {})

      router.currentRoute.value = {
        name: 'login',
        fullPath: '/login',
        path: '/login',
        hash: '',
        query: {},
        params: {},
        matched: [],
        meta: {},
        redirectedFrom: undefined,
      }

      apiClient.defaults.adapter = async (config) => {
        const error = new AxiosError('Unauthorized', 'ERR_BAD_REQUEST', config, null, {
          status: 401,
          statusText: 'Unauthorized',
          data: {},
          headers: {},
          config,
        })
        throw error
      }

      await expect(apiClient.post('/auth/login')).rejects.toThrow()

      // Como já está no login, não deve chamar router.push para evitar loop
      expect(routerPushSpy).not.toHaveBeenCalled()
    })
  })
})
