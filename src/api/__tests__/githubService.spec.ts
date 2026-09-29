import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import githubService, { DEFAULT_FEATURED_PROJECTS, DEFAULT_ALL_PROJECTS } from '../githubService'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('Service: githubService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('1. Deve consultar detalhes do repositório no endpoint do GitHub', async () => {
    const mockRepo = {
      id: 999,
      name: 'BaseProject',
      full_name: 'Talibert/BaseProject',
      html_url: 'https://github.com/Talibert/BaseProject',
      description: 'Descrição remota do GitHub',
      stargazers_count: 25,
      forks_count: 5,
      language: 'Java',
      homepage: 'https://baseproject.demo',
    }

    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockRepo } as any)

    const result = await githubService.getRepoDetails('Talibert', 'BaseProject')

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.github.com/repos/Talibert/BaseProject',
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: 'application/vnd.github.v3+json',
        }),
      }),
    )
    expect(result).toEqual(mockRepo)
  })

  it('2. Deve enriquecer a lista de projetos em destaque com dados retornados pela API', async () => {
    vi.mocked(axios.get).mockImplementation((url: string) => {
      const repoName = url.split('/').pop()
      return Promise.resolve({
        data: {
          id: 100,
          name: repoName,
          html_url: `https://github.com/Talibert/${repoName}`,
          description: `Repo ${repoName}`,
          stargazers_count: 42,
          forks_count: 8,
          language: 'TypeScript',
          homepage: null,
        },
      } as any)
    })

    const projects = await githubService.getFeaturedProjects('Talibert')

    expect(projects).toHaveLength(DEFAULT_FEATURED_PROJECTS.length)
    expect(projects[0]?.stars).toBe(42)
    expect(projects[0]?.forks).toBe(8)
  })

  it('3. Deve preservar dados locais de fallback caso a requisição à API do GitHub falhe', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('Rate limit exceeded'))

    const projects = await githubService.getFeaturedProjects('Talibert')

    expect(projects).toHaveLength(DEFAULT_FEATURED_PROJECTS.length)
    expect(projects[0]?.id).toBe('base-project')
    expect(projects[0]?.title).toBe(DEFAULT_FEATURED_PROJECTS[0]?.title)
  })

  it('4. Deve retornar a lista completa de projetos com getAllProjects caso a API falhe', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('Rate limit'))

    const projects = await githubService.getAllProjects('Talibert')

    expect(projects).toHaveLength(DEFAULT_ALL_PROJECTS.length)
    expect(projects.map((p) => p.id)).toContain('course-plataform')
    expect(projects.map((p) => p.id)).toContain('api-clean-arch')
  })

  it('5. Deve buscar repositórios dinamicamente do endpoint de repositórios do usuário', async () => {
    const mockRemoteRepos = [
      {
        name: 'BaseProject',
        description: 'Descrição remota do BaseProject',
        stargazers_count: 50,
        forks_count: 10,
        html_url: 'https://github.com/Talibert/BaseProject',
        homepage: 'https://baseproject.demo',
        fork: false,
      },
      {
        name: 'NovoRepoCriadoHoje',
        description: 'Um novo repositório criado no GitHub',
        language: 'Java',
        topics: ['spring', 'clean-code'],
        stargazers_count: 5,
        forks_count: 1,
        html_url: 'https://github.com/Talibert/NovoRepoCriadoHoje',
        fork: false,
      },
      {
        name: 'ForkDeOutroDev',
        description: 'Repo forkado',
        fork: true, // deve ser ignorado
      },
    ]

    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockRemoteRepos } as any)

    const projects = await githubService.getAllProjects('Talibert')

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.github.com/users/Talibert/repos?sort=updated&per_page=100',
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: 'application/vnd.github.v3+json',
        }),
      }),
    )

    // Apenas 2 repositórios (o fork é ignorado)
    expect(projects).toHaveLength(2)

    // BaseProject deve ter mantido curadoria e atualizado stars
    const baseProject = projects.find((p) => p.repoName === 'BaseProject')
    expect(baseProject?.stars).toBe(50)
    expect(baseProject?.category).toBe('Backend')

    // NovoRepoCriadoHoje deve ter sido gerado dinamicamente
    const novoRepo = projects.find((p) => p.repoName === 'NovoRepoCriadoHoje')
    expect(novoRepo?.title).toBe('NovoRepoCriadoHoje')
    expect(novoRepo?.stars).toBe(5)
    expect(novoRepo?.technologies).toContain('Java')
    expect(novoRepo?.technologies).toContain('spring')
  })
})

