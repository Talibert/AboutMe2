import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from '../ProjectCard.vue'
import type { ProjectItem } from '@/types/project'

const mockProject: ProjectItem = {
  id: 'base-project',
  repoName: 'BaseProject',
  title: 'BaseProject - Arquitetura Limpa em Java',
  subtitle: 'Template de microsserviços escalável com Clean Arch & Kafka',
  description: 'Template robusto para microsserviços em Java.',
  technologies: ['Java 21', 'Spring Boot 3', 'Clean Architecture', 'Apache Kafka'],
  githubUrl: 'https://github.com/Talibert/BaseProject',
  liveUrl: 'https://demo.exemplo.com',
  accentColor: '#f89820',
  category: 'Backend',
  previewTheme: 'backend-architecture',
  stars: 12,
  forks: 3,
}

describe('ProjectCard.vue', () => {
  it('1. Deve renderizar os dados do projeto (título, subtítulo, descrição, categoria)', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject,
        growOnScroll: false,
      },
    })

    expect(wrapper.find('.project-title').text()).toContain('BaseProject - Arquitetura Limpa em Java')
    expect(wrapper.find('.project-subtitle').text()).toContain('Clean Arch & Kafka')
    expect(wrapper.find('.project-description').text()).toBe('Template robusto para microsserviços em Java.')
    expect(wrapper.find('.category-badge').text()).toBe('Backend')
    expect(wrapper.find('.stat-badge').text()).toContain('12')
  })

  it('2. Deve renderizar todas as tags de tecnologias', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject,
        growOnScroll: false,
      },
    })

    const chips = wrapper.findAll('.tech-chip')
    expect(chips).toHaveLength(4)
    expect(chips[0]!.text()).toBe('Java 21')
    expect(chips[3]!.text()).toBe('Apache Kafka')
  })

  it('3. Deve renderizar links para GitHub e Demonstração Online com segurança', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject,
        growOnScroll: false,
      },
    })

    const githubLink = wrapper.find('.btn-project--primary')
    expect(githubLink.attributes('href')).toBe('https://github.com/Talibert/BaseProject')
    expect(githubLink.attributes('target')).toBe('_blank')
    expect(githubLink.attributes('rel')).toContain('noopener')

    const demoLink = wrapper.find('.btn-project--secondary')
    expect(demoLink.exists()).toBe(true)
    expect(demoLink.attributes('href')).toBe('https://demo.exemplo.com')
  })

  it('4. Deve renderizar placeholder temático quando não houver imagem', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject,
        growOnScroll: false,
      },
    })

    expect(wrapper.find('.project-image').exists()).toBe(false)
    expect(wrapper.find('.theme--backend-architecture').exists()).toBe(true)
    expect(wrapper.find('.architecture-diagram').exists()).toBe(true)
  })

  it('5. Deve renderizar a imagem quando fornecida', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: {
          ...mockProject,
          image: 'https://exemplo.com/preview.png',
        },
        growOnScroll: false,
      },
    })

    const img = wrapper.find('.project-image')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://exemplo.com/preview.png')
    expect(wrapper.find('.project-placeholder').exists()).toBe(false)
  })
})
