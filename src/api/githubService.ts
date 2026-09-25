/**
 * ============================================================================
 * SERVIÇO GITHUB (API EXTERNA)
 * ============================================================================
 *
 * Importa o Axios puro diretamente da biblioteca ('axios'), e NÃO o nosso
 * 'apiClient' customizado. Dessa forma:
 * - Aproveitamos o parse automático de JSON e tratamento de erro do Axios;
 * - Garantimos que NENHUM token Bearer da nossa aplicação seja enviado ao GitHub.
 */

import axios from 'axios'
import type { GitHubUser } from '@/types/github'
import type { GitHubRepoDetails, ProjectItem } from '@/types/project'

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
  },
]

export const githubService = {
  /**
   * Busca o perfil público de qualquer usuário no GitHub.
   * @param username Nome de usuário no GitHub
   */
  async getUserProfile(username: string): Promise<GitHubUser> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await axios.get<GitHubUser>(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })
    return response.data
  },

  /**
   * Busca detalhes públicos de um repositório no GitHub.
   * @param owner Dono do repositório (ex: 'Talibert')
   * @param repo Nome do repositório (ex: 'BaseProject')
   */
  async getRepoDetails(owner: string, repo: string): Promise<GitHubRepoDetails> {
    const response = await axios.get<GitHubRepoDetails>(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      },
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
            // Se o repositório tiver descrição no GitHub, pode complementar
            description: repo.description || project.description,
          }
        } catch {
          // Em caso de falha de rede ou rate limit da API pública, preserva os dados de fallback
          return project
        }
      }),
    )

    return enrichedProjects
  },
}

export default githubService
