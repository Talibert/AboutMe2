import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ProjectsView from '../ProjectsView.vue'
import { githubService, DEFAULT_ALL_PROJECTS } from '@/api/githubService'

describe('ProjectsView.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(githubService, 'getAllProjects').mockResolvedValue(DEFAULT_ALL_PROJECTS)
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
    expect(wrapper.findAll('.project-card').length).toBe(DEFAULT_ALL_PROJECTS.length)
  })

  it('3. Deve filtrar projetos por categoria ao clicar nas abas', async () => {
    const wrapper = mount(ProjectsView)
    await flushPromises()

    // Clica na aba 'Backend'
    const backendTab = wrapper.findAll('.category-tab').find((tab) => tab.text() === 'Backend')
    expect(backendTab).toBeDefined()
    await backendTab?.trigger('click')

    const backendCount = DEFAULT_ALL_PROJECTS.filter((p) => p.category === 'Backend').length
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

  it('6. Deve recorrer ao fallback DEFAULT_ALL_PROJECTS se a chamada à API falhar', async () => {
    vi.spyOn(githubService, 'getAllProjects').mockRejectedValueOnce(new Error('Rate limit'))

    const wrapper = mount(ProjectsView)
    await flushPromises()

    expect(wrapper.findAll('.project-card').length).toBe(DEFAULT_ALL_PROJECTS.length)
  })
})
