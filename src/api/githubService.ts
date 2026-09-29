/**
 * ============================================================================
 * SERVIÇO GITHUB (API EXTERNA & CACHE)
 * ============================================================================
 *
 * Responsabilidade Única (SRP):
 * - Comunicação HTTP com os endpoints públicos da API do GitHub;
 * - Gerenciamento de cache em sessionStorage com TTL de 30 minutos;
 * - Enriquecimento dinâmico de projetos com dados ao vivo (stars, forks, topics);
 * - Fallback resiliente para a camada de dados (src/data/projects.ts) em caso
 *   de rate limit anônimo (HTTP 403) ou ausência de conexão.
 */

import axios from 'axios'
import type { GitHubRepoDetails, ProjectItem } from '@/types/project'
import { DEFAULT_FEATURED_PROJECTS, DEFAULT_ALL_PROJECTS } from '@/data/projects'

// Re-exporta para compatibilidade com consumidores e testes existentes
export { DEFAULT_FEATURED_PROJECTS, DEFAULT_ALL_PROJECTS }

const CACHE_KEY = 'talibert_github_repos_cache'
const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutos

export const githubService = {
  /**
   * Busca detalhes públicos de um repositório no GitHub.
   * @param owner Dono do repositório (ex: 'Talibert')
   * @param repo Nome do repositório (ex: 'BaseProject')
   */
  async getRepoDetails(owner: string, repo: string): Promise<GitHubRepoDetails> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    }
    const token = import.meta.env.VITE_GITHUB_TOKEN
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await axios.get<GitHubRepoDetails>(
      `https://api.github.com/repos/${owner}/${repo}`,
      { headers },
    )
    return response.data
  },

  /**
   * Retorna a lista de 3 projetos em destaque de Guilherme Taliberti,
   * enriquecidos com dados em tempo real da API do GitHub (com fallback gracioso).
   */
  async getFeaturedProjects(owner = 'Talibert'): Promise<ProjectItem[]> {
    const enrichedProjects = await Promise.all(
      DEFAULT_FEATURED_PROJECTS.map(async (project) => {
        try {
          const repo = await this.getRepoDetails(owner, project.repoName)
          return {
            ...project,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language || project.category,
            githubUrl: repo.html_url || project.githubUrl,
            liveUrl: repo.homepage || undefined,
            description: repo.description || project.description,
          }
        } catch {
          return project
        }
      }),
    )

    return enrichedProjects
  },

  /**
   * Retorna a lista completa de todos os projetos públicos do usuário no GitHub,
   * combinando dados da API em tempo real com enriquecimento visual local,
   * cache no sessionStorage e fallback completo em caso de falha de rede/rate limit.
   */
  async getAllProjects(owner = 'Talibert'): Promise<ProjectItem[]> {
    // 1. Tenta recuperar do cache de sessão se ainda for válido
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        const cachedStr = window.sessionStorage.getItem(CACHE_KEY)
        if (cachedStr) {
          const cached = JSON.parse(cachedStr)
          if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS && Array.isArray(cached.data)) {
            return cached.data
          }
        }
      } catch {
        // Ignora erro de parse de cache
      }
    }

    try {
      const headers: Record<string, string> = {
        Accept: 'application/vnd.github.v3+json',
      }
      const token = import.meta.env.VITE_GITHUB_TOKEN
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await axios.get<any[]>(
        `https://api.github.com/users/${owner}/repos?sort=updated&per_page=100`,
        { headers },
      )

      const remoteRepos = response.data

      if (Array.isArray(remoteRepos) && remoteRepos.length > 0) {
        const curatedMap = new Map<string, ProjectItem>(
          DEFAULT_ALL_PROJECTS.map((p) => [p.repoName.toLowerCase(), p]),
        )

        const mappedProjects: ProjectItem[] = remoteRepos
          .filter((repo) => !repo.fork && repo.name.toLowerCase() !== 'talibert')
          .map((repo) => {
            const curated = curatedMap.get(repo.name.toLowerCase())

            if (curated) {
              return {
                ...curated,
                stars: repo.stargazers_count ?? curated.stars,
                forks: repo.forks_count ?? curated.forks,
                githubUrl: repo.html_url || curated.githubUrl,
                liveUrl: repo.homepage || curated.liveUrl,
                description: repo.description || curated.description,
              }
            }

            const technologies: string[] = []
            if (repo.language) technologies.push(repo.language)
            if (Array.isArray(repo.topics)) {
              repo.topics.forEach((t: string) => {
                if (!technologies.includes(t)) technologies.push(t)
              })
            }
            if (technologies.length === 0) technologies.push('Software')

            let category: ProjectItem['category'] = 'Backend'
            const lowerLang = (repo.language || '').toLowerCase()
            const lowerDesc = (repo.description || '').toLowerCase()
            const lowerName = repo.name.toLowerCase()

            if (
              lowerLang.includes('vue') ||
              lowerLang.includes('react') ||
              lowerLang.includes('html') ||
              lowerLang.includes('css') ||
              lowerLang.includes('typescript') ||
              lowerDesc.includes('frontend') ||
              lowerName.includes('front')
            ) {
              category = 'Frontend'
            } else if (
              lowerDesc.includes('fullstack') ||
              lowerDesc.includes('e-commerce') ||
              lowerDesc.includes('plataforma')
            ) {
              category = 'Fullstack'
            }

            return {
              id: repo.name.toLowerCase(),
              repoName: repo.name,
              title: repo.name,
              subtitle: repo.language ? `Desenvolvido em ${repo.language}` : 'Repositório GitHub',
              description: repo.description || 'Repositório público disponível no GitHub.',
              technologies,
              githubUrl: repo.html_url,
              liveUrl: repo.homepage || undefined,
              accentColor: '#38bdf8',
              category,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              language: repo.language || undefined,
            }
          })

        // Salva no sessionStorage para evitar queimar o rate limit de 60 reqs/hora
        if (typeof window !== 'undefined' && window.sessionStorage) {
          try {
            window.sessionStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ timestamp: Date.now(), data: mappedProjects }),
            )
          } catch {
            // Ignora falha de armazenamento de cache
          }
        }

        return mappedProjects
      }

      return DEFAULT_ALL_PROJECTS
    } catch {
      return DEFAULT_ALL_PROJECTS
    }
  },
}

export default githubService
