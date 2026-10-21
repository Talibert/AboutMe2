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

export const DEFAULT_FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'base-project',
    repoName: 'BaseProject',
    title: 'BaseProject - Arquitetura Limpa em Java',
    subtitle: 'Template de microsserviços escalável com Clean Arch & Kafka',
    description:
      'Template robusto para microsserviços e aplicações empresariais em Java. Implementa Clean Architecture (independência de frameworks), mensageria com Apache Kafka para eventos assíncronos, conteinerização com Docker, migrações de banco com Flyway e pirâmide completa de testes automatizados.',
    technologies: [
      'Java 21',
      'Spring Boot 3',
      'Clean Architecture',
      'Apache Kafka',
      'Docker',
      'Flyway',
      'JUnit 5 & Mockito',
      'PostgreSQL',
    ],
    githubUrl: 'https://github.com/Talibert/BaseProject',
    accentColor: '#f89820',
    category: 'Backend',
    previewTheme: 'backend-architecture',
    architectureDiagram: {
      topLayer: {
        icon: '☕',
        name: 'Domain & Use Cases',
        tag: 'Clean Arch',
      },
      flow: {
        leftPill: 'Kafka Events',
        rightPill: 'Flyway / Postgres',
        arrow: '⇄',
      },
      bottomLayer: {
        icon: '🐳',
        name: 'Docker & Spring Boot 3',
        tag: 'Infra & Cloud',
      },
    },
  },
  {
    id: 'base-front',
    repoName: 'BaseFront',
    title: 'BaseFront - Template de Frontend Moderno',
    subtitle: 'Arquitetura SPA escalável com Vue 3, Vite & TypeScript',
    description:
      'Estrutura moderna de frontend desenvolvida como modelo de referência para projetos de alta performance. Adota Composition API com TypeScript estrito, gerenciamento de estado persistente com Pinia, roteamento com guards nativos e suíte abrangente de testes unitários (Vitest) e ponta a ponta (Playwright).',
    technologies: [
      'Vue.js 3',
      'TypeScript',
      'Vite',
      'Pinia',
      'Playwright',
      'Vitest',
      'Axios',
      'CSS Moderno',
    ],
    githubUrl: 'https://github.com/Talibert/BaseFront',
    accentColor: '#42b883',
    category: 'Frontend',
    previewTheme: 'frontend-spa',
    architectureDiagram: {
      topLayer: {
        icon: '⚡',
        name: 'Vue 3 & Composition API',
        tag: 'UI & Views',
      },
      flow: {
        leftPill: 'Pinia (State)',
        rightPill: 'Vue Router & Axios',
        arrow: '⇄',
      },
      bottomLayer: {
        icon: '🧪',
        name: 'Vitest & Playwright E2E',
        tag: 'Testes & CI',
      },
    },
  },
  {
    id: 'rune-store',
    repoName: 'RuneStore',
    title: 'RuneStore - Catálogo & E-commerce de Jogos',
    subtitle: 'Sistema de vendas e gerenciamento de transações digitais',
    description:
      'Plataforma completa para controle de inventário, autenticação segura e fluxo de compras de itens virtuais. Desenvolvida com boas práticas de isolamento de domínio, persistência relacional com JPA/Hibernate e validações transacionais consistentes.',
    technologies: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'Spring Data JPA',
      'Hibernate',
      'PostgreSQL / H2',
      'REST APIs',
    ],
    githubUrl: 'https://github.com/Talibert/RuneStore',
    accentColor: '#38bdf8',
    category: 'Fullstack',
    previewTheme: 'ecommerce-platform',
    architectureDiagram: {
      topLayer: {
        icon: '🎮',
        name: 'Catálogo & Inventário',
        tag: 'REST API',
      },
      flow: {
        leftPill: 'Spring Security (Auth)',
        rightPill: 'Transações & Pedidos',
        arrow: '⇄',
      },
      bottomLayer: {
        icon: '🗄️',
        name: 'Spring Data JPA & Hibernate',
        tag: 'PostgreSQL',
      },
    },
  },
]

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

    if (!Array.isArray(remoteRepos)) {
      throw new Error('Resposta inválida da API do GitHub')
    }

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
  },
}

export default githubService
