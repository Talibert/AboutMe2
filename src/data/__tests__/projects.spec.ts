import { describe, it, expect } from 'vitest'
import { DEFAULT_FEATURED_PROJECTS, DEFAULT_ALL_PROJECTS } from '../projects'

describe('Data: projects.ts', () => {
  it('1. Deve conter exatamente 3 projetos selecionados em destaque', () => {
    expect(DEFAULT_FEATURED_PROJECTS).toHaveLength(3)

    const repoNames = DEFAULT_FEATURED_PROJECTS.map((p) => p.repoName)
    expect(repoNames).toContain('BaseProject')
    expect(repoNames).toContain('BaseFront')
    expect(repoNames).toContain('RuneStore')
  })

  it('2. Todos os projetos em destaque devem ter diagrama de arquitetura', () => {
    DEFAULT_FEATURED_PROJECTS.forEach((project) => {
      expect(project.architectureDiagram).toBeDefined()
      expect(project.architectureDiagram?.topLayer).toBeDefined()
      expect(project.architectureDiagram?.flow).toBeDefined()
      expect(project.architectureDiagram?.bottomLayer).toBeDefined()
    })
  })

  it('3. Deve conter o catálogo completo de 24 repositórios públicos reais', () => {
    expect(DEFAULT_ALL_PROJECTS).toHaveLength(24)

    const ids = DEFAULT_ALL_PROJECTS.map((p) => p.id)
    // Verifica IDs únicos (sem duplicidade)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(24)

    // Verifica repositórios chave
    expect(ids).toContain('base-project')
    expect(ids).toContain('base-front')
    expect(ids).toContain('receiver')
    expect(ids).toContain('sender')
    expect(ids).toContain('rabbitmq-docker')
    expect(ids).toContain('api-duxus')
    expect(ids).toContain('nautik-project')
  })

  it('4. Todo projeto deve possuir propriedades essenciais preenchidas', () => {
    DEFAULT_ALL_PROJECTS.forEach((project) => {
      expect(project.id).toBeTruthy()
      expect(project.repoName).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(project.technologies.length).toBeGreaterThan(0)
      expect(project.githubUrl).toMatch(/^https:\/\/github\.com\/Talibert\//)
      expect(['Backend', 'Frontend', 'Fullstack']).toContain(project.category)
    })
  })
})
