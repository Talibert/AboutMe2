import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TechStackCarousel from '../TechStackCarousel.vue'
import { techService } from '@/api/techService'

describe('TechStackCarousel.vue', () => {
  const mockItems = [
    {
      id: 'pinia',
      icon: '🍍',
      badge: 'Estado Global',
      title: 'Pinia & Persistência',
      description: 'Gerenciamento de estado reativo.',
      highlights: ['TypeScript Nativo', 'Stores Modulares'],
    },
    {
      id: 'vite',
      icon: '⚡',
      badge: 'Performance',
      title: 'Vite & TypeScript First',
      description: 'Ambiente ultrarrápido.',
      highlights: ['HMR instantâneo'],
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(techService, 'getItens').mockResolvedValue(mockItems)
  })

  it('1. Deve renderizar o cabeçalho da seção com título e badge', () => {
    const wrapper = mount(TechStackCarousel)

    expect(wrapper.find('.section-title').text()).toBe('Tecnologias & Arquitetura')
    expect(wrapper.find('.section-badge').text()).toContain('ECOSSISTEMA')
    expect(wrapper.find('.section-subtitle').text()).toContain('Padrões modernos de engenharia')
  })

  it('2. Deve chamar techService.getItens() na montagem do componente', async () => {
    mount(TechStackCarousel)
    expect(techService.getItens).toHaveBeenCalledTimes(1)
  })

  it('3. Deve renderizar os cards de tecnologias após o carregamento', async () => {
    const wrapper = mount(TechStackCarousel)
    // Aguarda resolução das Promises do ciclo de vida onMounted
    await vi.dynamicImportSettled()
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Pinia & Persistência')
  })
})
