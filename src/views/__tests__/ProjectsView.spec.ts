import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ProjectsView from '../ProjectsView.vue'
import { githubService } from '@/api/githubService'
import type { ProjectItem } from '@/types/project'

const mockProjects: ProjectItem[] = [
  {
    id: 'base-project',
    repoName: 'BaseProject',
    title: 'BaseProject - Arquitetura Limpa em Java',
    subtitle: 'Template de microsserviços escalável',
    description: 'Template robusto para microsserviços em Java.',
    technologies: ['Java 21', 'Spring Boot 3', 'Kafka'],
    githubUrl: 'https://github.com/Talibert/BaseProject',
    accentColor: '#f89820',
    category: 'Backend',
  },
  {
    id: 'base-front',
    repoName: 'BaseFront',
    title: 'BaseFront - Template de Frontend Moderno',
    subtitle: 'Arquitetura SPA escalável com Vue 3',
    description: 'Estrutura moderna de frontend com Vue 3 e TypeScript.',
    technologies: ['Vue.js 3', 'TypeScript', 'Pinia'],
    githubUrl: 'https://github.com/Talibert/BaseFront',
    accentColor: '#42b883',
    category: 'Frontend',
  },
  {
    id: 'rune-store',
    repoName: 'RuneStore',
    title: 'RuneStore - Catálogo & E-commerce de Jogos',
    subtitle: 'Sistema de vendas digitais',
    description: 'Plataforma completa para controle de inventário.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL'],
    githubUrl: 'https://github.com/Talibert/RuneStore',
    accentColor: '#38bdf8',
    category: 'Fullstack',
  },
]

describe('ProjectsView.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(githubService, 'getAllProjects').mockResolvedValue(mockProjects)
  })

  it('1. Deve exibir placeholders modernos (skeletons) enquanto estiver carregando', () => {
    const wrapper = mount(ProjectsView)

    // Antes de resolver a Promise, deve mostrar skeletons
    expect(wrapper.find('.loading-meta').exists()).toBe(true)
    expect(wrapper.findAll('.mac-skeleton-card').length).toBe(6)
  })

  it('2. Deve renderizar o cabeçalho e a lista de projetos após o carregamento', async () => {
    const wrapper = mount(ProjectsView)
    await flushPromises()

    expect(wrapper.find('h2').text()).toBe('Todos os Projetos')
    expect(wrapper.find('.loading-meta').exists()).toBe(false)
    expect(wrapper.findAll('.project-card').length).toBe(mockProjects.length)
  })

  it('3. Deve filtrar projetos por categoria ao clicar nas abas', async () => {
    const wrapper = mount(ProjectsView)
    await flushPromises()

    // Clica na aba 'Backend'
    const backendTab = wrapper.findAll('.category-tab').find((tab) => tab.text() === 'Backend')
    expect(backendTab).toBeDefined()
    await backendTab?.trigger('click')

    const backendCount = mockProjects.filter((p) => p.category === 'Backend').length
    expect(wrapper.findAll('.project-card').length).toBe(backendCount)
  })

  it('4. Deve filtrar projetos ao digitar no campo de busca', async () => {
    const wrapper = mount(ProjectsView)
    await flushPromises()

    const searchInput = wrapper.find('.search-input')
    await searchInput.setValue('BaseFront')

    expect(wrapper.findAll('.project-card').length).toBe(1)
    expect(wrapper.find('.project-title').text()).toContain('BaseFront')
  })

  it('5. Deve exibir estado vazio quando nenhum projeto corresponder aos filtros', async () => {
    const wrapper = mount(ProjectsView)
    await flushPromises()

    const searchInput = wrapper.find('.search-input')
    await searchInput.setValue('termo-completamente-inexistente-xyz')

    expect(wrapper.findAll('.project-card').length).toBe(0)
    expect(wrapper.find('.empty-state').exists()).toBe(true)
    expect(wrapper.find('.empty-title').text()).toContain('Nenhum projeto encontrado')
  })

  it('6. Deve exibir o componente de fallback ProjectsErrorState se a chamada à API falhar e permitir tentar novamente', async () => {
    const spy = vi
      .spyOn(githubService, 'getAllProjects')
      .mockRejectedValueOnce(new Error('Rate limit'))
      .mockResolvedValueOnce(mockProjects)

    const wrapper = mount(ProjectsView)
    await flushPromises()

    expect(wrapper.findAll('.project-card').length).toBe(0)
    expect(wrapper.find('.error-state').exists()).toBe(true)
    expect(wrapper.find('.error-title').text()).toContain('Não foi possível obter os projetos')

    // Ao clicar em "Tentar novamente", deve refazer a chamada e exibir os projetos
    await wrapper.find('.btn-retry').trigger('click')
    await flushPromises()

    expect(spy).toHaveBeenCalledTimes(2)
    expect(wrapper.find('.error-state').exists()).toBe(false)
    expect(wrapper.findAll('.project-card').length).toBe(mockProjects.length)
  })
})
