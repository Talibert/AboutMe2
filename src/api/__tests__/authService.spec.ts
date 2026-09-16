import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import authService from '../authService'
import apiClient from '../client'
import type { AuthResponse, User } from '@/types/auth'

vi.mock('../client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}))

describe('Service: authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllEnvs()
  })

  describe('Modo Mock (VITE_USE_MOCK_API = true)', () => {
    beforeEach(() => {
      vi.stubEnv('VITE_USE_MOCK_API', 'true')
    })

    it('1. Deve simular login e retornar usuário fictício e token sem chamar a rede', async () => {
      const loginPromise = authService.login({ email: 'developer@empresa.com' })

      // Avança a latência simulada de 600ms
      await vi.advanceTimersByTimeAsync(600)
      const result = await loginPromise

      expect(apiClient.post).not.toHaveBeenCalled()
      expect(result.user.email).toBe('developer@empresa.com')
      expect(result.user.name).toBe('developer')
      expect(result.token).toContain('mock_jwt_token_')
    })

    it('2. Deve ignorar a chamada de logout à rede no modo mock', async () => {
      await authService.logout()
      expect(apiClient.post).not.toHaveBeenCalled()
    })
  })

  describe('Modo Real (VITE_USE_MOCK_API = false)', () => {
    beforeEach(() => {
      vi.stubEnv('VITE_USE_MOCK_API', 'false')
    })

    it('3. Deve enviar requisição POST para /auth/login com as credenciais informadas', async () => {
      const mockResponse: AuthResponse = {
        token: 'real-backend-jwt-token',
        user: {
          id: 'u_100',
          name: 'Taliberti Backend',
          email: 'taliberti@backend.com',
          role: 'admin',
        },
      }

      vi.mocked(apiClient.post).mockResolvedValueOnce({ data: mockResponse })

      const result = await authService.login({
        email: 'taliberti@backend.com',
        password: 'password123',
      })

      expect(apiClient.post).toHaveBeenCalledWith('/auth/login', {
        email: 'taliberti@backend.com',
        password: 'password123',
      })
      expect(result).toEqual(mockResponse)
    })

    it('4. Deve buscar perfil com GET /auth/me', async () => {
      const mockUser: User = {
        id: 'u_100',
        name: 'Taliberti',
        email: 'taliberti@backend.com',
        role: 'user',
      }

      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockUser })

      const result = await authService.getProfile()

      expect(apiClient.get).toHaveBeenCalledWith('/auth/me')
      expect(result).toEqual(mockUser)
    })

    it('5. Deve notificar a API com POST /auth/logout ao deslogar no modo real', async () => {
      vi.mocked(apiClient.post).mockResolvedValueOnce({ data: {} })

      await authService.logout()

      expect(apiClient.post).toHaveBeenCalledWith('/auth/logout')
    })
  })
})
