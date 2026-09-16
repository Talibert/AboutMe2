import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from '../theme'

describe('Store: useThemeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Limpa classes e atributos do elemento raiz do DOM simulado
    document.documentElement.className = ''
    document.documentElement.removeAttribute('data-theme')
    vi.restoreAllMocks()
  })

  it('1. Deve inicializar com o modo "system" por padrão', () => {
    const themeStore = useThemeStore()
    expect(themeStore.mode).toBe('system')
  })

  it('2. Deve aplicar o tema escuro ("dark") e atualizar classes do documentElement', () => {
    const themeStore = useThemeStore()

    themeStore.setTheme('dark')

    expect(themeStore.mode).toBe('dark')
    expect(themeStore.isDark).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('3. Deve aplicar o tema claro ("light") e remover classes do documentElement', () => {
    const themeStore = useThemeStore()

    // Primeiro define escuro
    themeStore.setTheme('dark')
    expect(themeStore.isDark).toBe(true)

    // Altera para claro
    themeStore.setTheme('light')

    expect(themeStore.mode).toBe('light')
    expect(themeStore.isDark).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('4. Deve alternar entre claro e escuro usando toggleTheme()', () => {
    const themeStore = useThemeStore()

    // Começa em claro
    themeStore.setTheme('light')
    expect(themeStore.isDark).toBe(false)

    // 1º toggle -> deve virar dark
    themeStore.toggleTheme()
    expect(themeStore.mode).toBe('dark')
    expect(themeStore.isDark).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    // 2º toggle -> deve voltar para light
    themeStore.toggleTheme()
    expect(themeStore.mode).toBe('light')
    expect(themeStore.isDark).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
