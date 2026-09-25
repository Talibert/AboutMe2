import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FeaturedProjects from '../FeaturedProjects.vue'
import { githubService } from '@/api/githubService'

import { DEFAULT_FEATURED_PROJECTS } from '@/api/githubService'

describe('FeaturedProjects.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(githubService, 'getFeaturedProjects').mockResolvedValue(DEFAULT_FEATURED_PROJECTS)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('1. Deve renderizar o título principal "Meus projetos em destaque" e subtítulo', () => {
    const wrapper = mount(FeaturedProjects)

    expect(wrapper.find('.section-title').text()).toBe('Meus projetos em destaque')
    expect(wrapper.find('.section-badge').text()).toContain('PORTFÓLIO')
    expect(wrapper.find('.section-subtitle').text()).toContain('Clean Architecture')
  })

  it('2. Deve renderizar os 3 cards de projetos em destaque', () => {
    const wrapper = mount(FeaturedProjects)

    const cards = wrapper.findAll('.project-card')
    expect(cards).toHaveLength(3)

    const titles = cards.map((c) => c.find('.project-title').text())
    expect(titles[0]).toContain('BaseProject')
    expect(titles[1]).toContain('BaseFront')
    expect(titles[2]).toContain('RuneStore')
  })

  it('3. Deve renderizar as tecnologias em formato de chips para cada projeto', () => {
    const wrapper = mount(FeaturedProjects)

    const cards = wrapper.findAll('.project-card')
    const firstCard = cards[0]
    expect(firstCard).toBeDefined()

    const firstCardTechs = firstCard!.findAll('.tech-chip')
    expect(firstCardTechs.length).toBeGreaterThanOrEqual(4)

    const techNames = firstCardTechs.map((t) => t.text())
    expect(techNames).toContain('Java 21')
    expect(techNames).toContain('Spring Boot 3')
    expect(techNames).toContain('Clean Architecture')
    expect(techNames).toContain('Apache Kafka')
  })

  it('4. Deve renderizar links para o GitHub com atributos de segurança target="_blank" e rel="noopener noreferrer"', () => {
    const wrapper = mount(FeaturedProjects)

    const githubButtons = wrapper.findAll('.btn-project--primary')
    expect(githubButtons).toHaveLength(3)

    githubButtons.forEach((btn) => {
      expect(btn.attributes('href')).toContain('github.com/Talibert/')
      expect(btn.attributes('target')).toBe('_blank')
      expect(btn.attributes('rel')).toContain('noopener')
    })
  })

  it('5. Deve renderizar a área reservada de mídia e ilustrações temáticas quando não houver imagem', () => {
    const wrapper = mount(FeaturedProjects)

    const placeholders = wrapper.findAll('.project-placeholder')
    expect(placeholders).toHaveLength(3)

    // Primeiro card possui o tema backend architecture
    expect(wrapper.find('.theme--backend-architecture').exists()).toBe(true)
    expect(wrapper.find('.architecture-diagram').exists()).toBe(true)
    expect(wrapper.text()).toContain('Domain & Use Cases')
    expect(wrapper.text()).toContain('Kafka Events')

    // Segundo card possui o tema frontend SPA
    expect(wrapper.find('.theme--frontend-spa').exists()).toBe(true)
    expect(wrapper.find('.frontend-mockup').exists()).toBe(true)

    // Terceiro card possui o tema ecommerce platform
    expect(wrapper.find('.theme--ecommerce-platform').exists()).toBe(true)
    expect(wrapper.find('.ecommerce-mockup').exists()).toBe(true)
  })

  it('6. Deve chamar o githubService para enriquecer os dados dos repositórios', async () => {
    const spy = vi.spyOn(githubService, 'getFeaturedProjects')
    mount(FeaturedProjects)

    expect(spy).toHaveBeenCalledWith('Talibert')
  })
})
