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

    expect(axios.get).toHaveBeenCalledWith('https://api.github.com/repos/Talibert/BaseProject', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })
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
})

