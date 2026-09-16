import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../auth'
import authService from '@/api/authService'
import type { AuthResponse } from '@/types/auth'

vi.mock('@/api/authService')

const MOCK_AUTH_RESPONSE: AuthResponse = {
  token: 'mock-jwt-token-12345',
  user: {
    id: '1',
    name: 'Guilherme Taliberti',
    email: 'guilherme@teste.com',
    role: 'admin',
  },
}

describe('Store: useAuthStore', () => {
  beforeEach(() => {
    // Cria uma nova instância isolada do Pinia para cada teste
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('1. Deve inicializar com o estado padrão deslogado', () => {
    const authStore = useAuthStore()

    expect(authStore.user).toBeNull()
    expect(authStore.token).toBeNull()
    expect(authStore.isLoading).toBe(false)
    expect(authStore.isAuthenticated).toBe(false)
    expect(authStore.userName).toBe('Usuário')
  })

  it('2. Deve autenticar com sucesso e atualizar user e token', async () => {
    vi.mocked(authService.login).mockResolvedValueOnce(MOCK_AUTH_RESPONSE)

    const authStore = useAuthStore()
    expect(authStore.isAuthenticated).toBe(false)

    await authStore.login({ email: 'guilherme@teste.com', password: 'secretpassword' })

    expect(authService.login).toHaveBeenCalledWith({
      email: 'guilherme@teste.com',
      password: 'secretpassword',
    })
    expect(authStore.token).toBe('mock-jwt-token-12345')
    expect(authStore.user?.name).toBe('Guilherme Taliberti')
    expect(authStore.isAuthenticated).toBe(true)
    expect(authStore.userName).toBe('Guilherme Taliberti')
    expect(authStore.isLoading).toBe(false)
  })

  it('3. Deve aceitar login passando apenas string de email', async () => {
    vi.mocked(authService.login).mockResolvedValueOnce(MOCK_AUTH_RESPONSE)

    const authStore = useAuthStore()
    await authStore.login('guilherme@teste.com')

    expect(authService.login).toHaveBeenCalledWith({ email: 'guilherme@teste.com' })
    expect(authStore.isAuthenticated).toBe(true)
  })

  it('4. Deve redefinir isLoading caso o login falhe', async () => {
    vi.mocked(authService.login).mockRejectedValueOnce(new Error('Credenciais inválidas'))

    const authStore = useAuthStore()

    await expect(authStore.login({ email: 'errado@teste.com', password: '123' })).rejects.toThrow(
      'Credenciais inválidas',
    )

    expect(authStore.isLoading).toBe(false)
    expect(authStore.isAuthenticated).toBe(false)
    expect(authStore.token).toBeNull()
    expect(authStore.user).toBeNull()
  })

  it('5. Deve limpar os dados de sessão e autenticação ao executar logout()', async () => {
    vi.mocked(authService.login).mockResolvedValueOnce(MOCK_AUTH_RESPONSE)
    vi.mocked(authService.logout).mockResolvedValueOnce()

    const authStore = useAuthStore()
    await authStore.login('guilherme@teste.com')
    expect(authStore.isAuthenticated).toBe(true)

    await authStore.logout()

    expect(authService.logout).toHaveBeenCalledTimes(1)
    expect(authStore.token).toBeNull()
    expect(authStore.user).toBeNull()
    expect(authStore.isAuthenticated).toBe(false)
    expect(authStore.userName).toBe('Usuário')
  })
})
