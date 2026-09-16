import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import GitHubProfileCard from '../GitHubProfileCard.vue'
import githubService from '@/api/githubService'
import type { GitHubUser } from '@/types/github'

// Mockamos o serviço do GitHub para não depender de chamadas reais à rede
vi.mock('@/api/githubService')

const MOCK_USER: GitHubUser = {
  id: 123456,
  login: 'Talibert',
  name: 'Guilherme Taliberti',
  avatar_url: 'https://avatars.githubusercontent.com/u/123456?v=4',
  html_url: 'https://github.com/Talibert',
  bio: 'Desenvolvedor focado em Vue, TypeScript e arquitetura limpa.',
  company: 'Empresa Teste',
  blog: 'https://taliberti.dev',
  location: 'São Paulo, Brasil',
  public_repos: 42,
  public_gists: 0,
  followers: 128,
  following: 64,
  created_at: '2018-05-10T12:00:00Z',
}

describe('GitHubProfileCard.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('1. Deve renderizar o Skeleton Shimmer enquanto os dados estiverem carregando', () => {
    // Mantém a Promise pendente para verificar o estado inicial
    vi.mocked(githubService.getUserProfile).mockReturnValue(new Promise(() => {}))

    const wrapper = mount(GitHubProfileCard, {
      props: { username: 'Talibert' },
    })

    // Garante que o Skeleton está visível e o conteúdo real não
    expect(wrapper.find('.skeleton-card').exists()).toBe(true)
    expect(wrapper.find('.skeleton-shimmer').exists()).toBe(true)
    expect(wrapper.find('.profile-content').exists()).toBe(false)
    expect(wrapper.find('.state-error').exists()).toBe(false)
  })

  it('2. Deve renderizar as informações do perfil com sucesso após a API responder', async () => {
    vi.mocked(githubService.getUserProfile).mockResolvedValueOnce(MOCK_USER)

    const wrapper = mount(GitHubProfileCard, {
      props: { username: 'Talibert' },
    })

    // Avança o timer do delay simulado e resolve as promises
    await vi.advanceTimersByTimeAsync(600)
    await flushPromises()

    // O skeleton deve desaparecer e o perfil deve ser exibido
    expect(wrapper.find('.skeleton-card').exists()).toBe(false)
    expect(wrapper.find('.profile-content').exists()).toBe(true)

    // Verifica nome, handle e bio
    expect(wrapper.text()).toContain('Guilherme Taliberti')
    expect(wrapper.text()).toContain('@Talibert')
    expect(wrapper.text()).toContain('Desenvolvedor focado em Vue')

    // Verifica metadados calculados (ano de entrada)
    expect(wrapper.text()).toContain('Desde 2018')
    expect(wrapper.text()).toContain('São Paulo, Brasil')
    expect(wrapper.text()).toContain('Empresa Teste')

    // Verifica estatísticas numéricas
    expect(wrapper.text()).toContain('42') // Repositórios
    expect(wrapper.text()).toContain('128') // Seguidores
    expect(wrapper.text()).toContain('64') // Seguindo

    // Verifica avatar
    const avatar = wrapper.find('img.avatar')
    expect(avatar.exists()).toBe(true)
    expect(avatar.attributes('src')).toBe(MOCK_USER.avatar_url)
  })

  it('3. Deve exibir mensagem de erro e botão de retry quando a API falhar', async () => {
    vi.mocked(githubService.getUserProfile).mockRejectedValueOnce(new Error('Erro de conexão'))

    const wrapper = mount(GitHubProfileCard, {
      props: { username: 'Talibert' },
    })

    await vi.advanceTimersByTimeAsync(600)
    await flushPromises()

    // O skeleton e conteúdo somem, estado de erro aparece
    expect(wrapper.find('.skeleton-card').exists()).toBe(false)
    expect(wrapper.find('.profile-content').exists()).toBe(false)
    expect(wrapper.find('.state-error').exists()).toBe(true)
    expect(wrapper.text()).toContain('Não foi possível carregar os dados do GitHub')

    // Botão de tentar novamente deve existir
    expect(wrapper.find('.retry-btn').exists()).toBe(true)
  })

  it('4. Deve tentar buscar o perfil novamente ao clicar no botão "Tentar novamente"', async () => {
    // Primeira tentativa falha
    vi.mocked(githubService.getUserProfile).mockRejectedValueOnce(new Error('Falha 1'))

    const wrapper = mount(GitHubProfileCard, {
      props: { username: 'Talibert' },
    })

    await vi.advanceTimersByTimeAsync(600)
    await flushPromises()

    expect(wrapper.find('.state-error').exists()).toBe(true)
    expect(githubService.getUserProfile).toHaveBeenCalledTimes(1)

    // Segunda tentativa terá sucesso
    vi.mocked(githubService.getUserProfile).mockResolvedValueOnce(MOCK_USER)

    // Clica no botão de tentar novamente
    await wrapper.find('.retry-btn').trigger('click')

    await vi.advanceTimersByTimeAsync(600)
    await flushPromises()

    // Deve ter chamado o serviço pela 2ª vez e agora exibir o perfil
    expect(githubService.getUserProfile).toHaveBeenCalledTimes(2)
    expect(wrapper.find('.profile-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Guilherme Taliberti')
  })
})
