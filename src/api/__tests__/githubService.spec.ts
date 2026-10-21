import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import githubService, { DEFAULT_FEATURED_PROJECTS } from '../githubService'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('Service: githubService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.clear()
    }
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

  it('4. Deve propagar erro em getAllProjects caso a API do GitHub não responda', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('Rate limit'))

    await expect(githubService.getAllProjects('Talibert')).rejects.toThrow('Rate limit')
  })

  it('5. Deve montar os projetos via portifolio.json e aplicar fallback Backend + Java quando ausente', async () => {
    const mockRemoteRepos = [
      {
        name: 'AboutMe2',
        description: 'Descrição padrão do GitHub para AboutMe2',
        default_branch: 'main',
        stargazers_count: 12,
        forks_count: 2,
        html_url: 'https://github.com/Talibert/AboutMe2',
        homepage: 'https://talibert.dev',
        fork: false,
      },
      {
        name: 'RepoSemPortifolioJson',
        description: 'Descrição vinda direto da API do GitHub',
        default_branch: 'main',
        language: 'TypeScript',
        stargazers_count: 5,
        forks_count: 1,
        html_url: 'https://github.com/Talibert/RepoSemPortifolioJson',
        fork: false,
      },
      {
        name: 'ForkDeOutroDev',
        description: 'Repo forkado',
        fork: true, // deve ser ignorado
      },
    ]

    vi.mocked(axios.get).mockImplementation((url: string) => {
      if (url.includes('/users/Talibert/repos')) {
        return Promise.resolve({ data: mockRemoteRepos } as any)
      }
      if (url.includes('raw.githubusercontent.com/Talibert/AboutMe2/main/portifolio.json')) {
        return Promise.resolve({
          data: {
            title: 'AboutMe2 - Portfólio Profissional Moderno',
            description: 'Versão mais recente do portfólio em Vue 3',
            category: 'Frontend',
            technologies: ['Vue.js 3', 'TypeScript', 'Pinia'],
            accentColor: '#42b883',
          },
        } as any)
      }
      return Promise.reject(new Error('404 Not Found'))
    })

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

    // 1. AboutMe2 deve ser preenchido pelo portifolio.json
    const aboutMe2 = projects.find((p) => p.repoName === 'AboutMe2')
    expect(aboutMe2?.title).toBe('AboutMe2 - Portfólio Profissional Moderno')
    expect(aboutMe2?.description).toBe('Versão mais recente do portfólio em Vue 3')
    expect(aboutMe2?.category).toBe('Frontend')
    expect(aboutMe2?.technologies).toEqual(['Vue.js 3', 'TypeScript', 'Pinia'])
    expect(aboutMe2?.stars).toBe(12)

    // 2. RepoSemPortifolioJson deve pegar título e descrição da API do GitHub e usar fallback Backend + Java
    const repoSemJson = projects.find((p) => p.repoName === 'RepoSemPortifolioJson')
    expect(repoSemJson?.title).toBe('RepoSemPortifolioJson')
    expect(repoSemJson?.description).toBe('Descrição vinda direto da API do GitHub')
    expect(repoSemJson?.category).toBe('Backend')
    expect(repoSemJson?.technologies).toEqual(['Java'])
    expect(repoSemJson?.stars).toBe(5)
  })
})

