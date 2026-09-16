import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import router from '../index'
import { useAuthStore } from '@/stores/auth'

describe('Router & Navigation Guards', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    // Garante que o router está inicializado e na rota raiz
    await router.push('/')
    await router.isReady()
  })

  it('1. Deve permitir acesso a rotas públicas e atualizar document.title dinamicamente', async () => {
    await router.push('/about')
    expect(router.currentRoute.value.name).toBe('about')
    expect(document.title).toContain('Sobre')

    await router.push('/')
    expect(router.currentRoute.value.name).toBe('home')
    expect(document.title).toContain('Início')
  })

  it('2. Deve barrar usuário deslogado em rota protegida (/profile) e redirecionar para /login com redirect query', async () => {
    const authStore = useAuthStore()
    authStore.token = null // Garante que está deslogado

    await router.push('/profile')

    // Deve ser redirecionado para login
    expect(router.currentRoute.value.name).toBe('login')
    expect(router.currentRoute.value.query.redirect).toBe('/profile')
  })

  it('3. Deve permitir acesso a rota protegida (/profile) quando o usuário estiver autenticado', async () => {
    const authStore = useAuthStore()
    authStore.token = 'fake-valid-jwt-token'

    await router.push('/profile')

    expect(router.currentRoute.value.name).toBe('profile')
    expect(document.title).toContain('Meu Perfil')
  })

  it('4. Deve redirecionar usuário já autenticado para Home se tentar acessar /login', async () => {
    const authStore = useAuthStore()
    authStore.token = 'fake-valid-jwt-token'

    await router.push('/login')

    // Deve redirecionar automaticamente para a home
    expect(router.currentRoute.value.name).toBe('home')
  })

  it('5. Deve redirecionar para a página 404 (not-found) ao acessar uma rota inexistente', async () => {
    await router.push('/rota-inexistente-12345')

    expect(router.currentRoute.value.name).toBe('not-found')
    expect(document.title).toContain('404')
  })
})
