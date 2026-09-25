import { describe, it, expect, beforeEach } from 'vitest'
import router from '../index'

describe('Router & Navigation Guards', () => {
  beforeEach(async () => {
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

  it('2. Deve redirecionar para a página 404 (not-found) ao acessar uma rota inexistente', async () => {
    await router.push('/rota-inexistente-12345')

    expect(router.currentRoute.value.name).toBe('not-found')
    expect(document.title).toContain('404')
  })
})
