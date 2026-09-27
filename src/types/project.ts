export interface GitHubRepoDetails {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  homepage: string | null
  updated_at: string
  default_branch: string
}

/**
 * Camada estrutural do diagrama do projeto (ex: Domínio, Infra, UI, Persistência)
 */
export interface ProjectDiagramLayer {
  icon: string
  name: string
  tag?: string
}

/**
 * Fluxo de dados, mensageria ou comunicação entre camadas
 */
export interface ProjectDiagramFlow {
  leftPill: string
  rightPill: string
  arrow?: string
}

/**
 * Estrutura tipada do diagrama arquitetural em "cardzinhos" ilustrativos
 */
export interface ProjectArchitectureDiagram {
  topLayer: ProjectDiagramLayer
  flow: ProjectDiagramFlow
  bottomLayer: ProjectDiagramLayer
}

export interface ProjectItem {
  id: string
  repoName: string
  title: string
  subtitle: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
  accentColor: string
  category: 'Backend' | 'Frontend' | 'Fullstack' | 'Sistemas Distribuídos'
  previewTheme?: 'backend-architecture' | 'frontend-spa' | 'ecommerce-platform'
  architectureDiagram?: ProjectArchitectureDiagram
  image?: string
  stars?: number
  forks?: number
  language?: string
}

