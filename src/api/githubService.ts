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
import type { GitHubRepoDetails, PortfolioManifest, ProjectItem } from '@/types/project'
import { DEFAULT_FEATURED_PROJECTS, DEFAULT_ALL_PROJECTS } from '@/data/projects'

// Re-exporta para compatibilidade com consumidores e testes existentes
export { DEFAULT_FEATURED_PROJECTS, DEFAULT_ALL_PROJECTS }

const CACHE_KEY = 'talibert_github_repos_cache_v2'
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
   * Busca o manifesto `portifolio.json` na raiz do repositório via raw.githubusercontent.com
   * (não consome o rate limit de 60 req/hora da API REST do GitHub).
   * Retorna `null` caso o repositório ainda não possua o arquivo.
   */
  async getRepoPortfolioManifest(
    owner: string,
    repo: string,
    branch = 'main',
  ): Promise<PortfolioManifest | null> {
    try {
      const response = await axios.get<PortfolioManifest>(
        `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/portifolio.json`,
      )
      if (response.data && typeof response.data === 'object') {
        return response.data
      }
      return null
    } catch {
      return null
    }
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
   * Retorna a lista completa de todos os projetos públicos do usuário no GitHub.
   * - Nome (`title`) e `description` vêm da API do GitHub (podendo ser refinados pelo `portifolio.json`).
   * - Categoria (`category`) e tecnologias (`technologies`) vêm do arquivo `portifolio.json` na raiz de cada repo.
   * - Caso o repositório não possua `portifolio.json`, aplica o fallback padrão: `category: 'Backend'` e `technologies: ['Java']`.
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

      const response = await axios.get<GitHubRepoDetails[]>(
        `https://api.github.com/users/${owner}/repos?sort=updated&per_page=100`,
        { headers },
      )

      const remoteRepos = response.data

      if (Array.isArray(remoteRepos) && remoteRepos.length > 0) {
        const validRepos = remoteRepos.filter(
          (repo: GitHubRepoDetails & { fork?: boolean }) =>
            !repo.fork && repo.name.toLowerCase() !== owner.toLowerCase(),
        )

        const mappedProjects: ProjectItem[] = await Promise.all(
          validRepos.map(async (repo) => {
            const branch = repo.default_branch || 'main'
            const manifest = await this.getRepoPortfolioManifest(owner, repo.name, branch)

            const category: ProjectItem['category'] = manifest?.category || 'Backend'
            const technologies: string[] =
              Array.isArray(manifest?.technologies) && manifest.technologies.length > 0
                ? manifest.technologies
                : ['Java']

            return {
              id: repo.name.toLowerCase(),
              repoName: repo.name,
              title: manifest?.title || repo.name,
              subtitle:
                manifest?.subtitle ||
                (repo.language ? `Desenvolvido em ${repo.language}` : 'Desenvolvido em Java'),
              description:
                manifest?.description ||
                repo.description ||
                'Repositório público disponível no GitHub.',
              technologies,
              githubUrl: repo.html_url,
              liveUrl: manifest?.liveUrl || repo.homepage || undefined,
              accentColor: manifest?.accentColor || '#38bdf8',
              category,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              language: repo.language || 'Java',
            }
          }),
        )

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
