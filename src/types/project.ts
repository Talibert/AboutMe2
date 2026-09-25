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
  previewTheme: 'backend-architecture' | 'frontend-spa' | 'ecommerce-platform'
  image?: string
  stars?: number
  forks?: number
  language?: string
}
