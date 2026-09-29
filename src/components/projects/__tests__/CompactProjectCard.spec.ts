import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CompactProjectCard from '../CompactProjectCard.vue'
import type { ProjectItem } from '@/types/project'

const mockProject: ProjectItem = {
  id: 'test-project',
  repoName: 'TestRepo',
  title: 'Test Project Title',
  subtitle: 'Test Subtitle',
  description: 'Uma descrição detalhada para o projeto de teste.',
  technologies: ['Java', 'Spring Boot', 'Kafka'],
  githubUrl: 'https://github.com/Talibert/TestRepo',
  accentColor: '#42b883',
  category: 'Backend',
  stars: 15,
}

describe('CompactProjectCard.vue', () => {
  it('1. Deve renderizar os controles da janela macOS e o nome do repositório no topo', () => {
    const wrapper = mount(CompactProjectCard, {
      props: { project: mockProject },
    })

    expect(wrapper.find('.control-dot--close').exists()).toBe(true)
    expect(wrapper.find('.control-dot--minimize').exists()).toBe(true)
    expect(wrapper.find('.control-dot--maximize').exists()).toBe(true)
    expect(wrapper.find('.filename-text').text()).toBe('TestRepo')
  })

  it('2. Deve renderizar o título, descrição e as tecnologias informadas', () => {
    const wrapper = mount(CompactProjectCard, {
      props: { project: mockProject },
    })

    expect(wrapper.find('.project-title').text()).toBe('Test Project Title')
    expect(wrapper.find('.project-description').text()).toBe('Uma descrição detalhada para o projeto de teste.')

    const chips = wrapper.findAll('.tech-chip')
    expect(chips).toHaveLength(3)
    expect(chips[0]?.text()).toBe('Java')
    expect(chips[1]?.text()).toBe('Spring Boot')
    expect(chips[2]?.text()).toBe('Kafka')
  })

  it('3. Deve renderizar o botão com o link para o GitHub', () => {
    const wrapper = mount(CompactProjectCard, {
      props: { project: mockProject },
    })

    const btn = wrapper.find('.btn-github')
    expect(btn.exists()).toBe(true)
    expect(btn.attributes('href')).toBe('https://github.com/Talibert/TestRepo')
    expect(btn.attributes('target')).toBe('_blank')
  })

  it('4. Deve renderizar badge de estrelas do GitHub quando disponível', () => {
    const wrapper = mount(CompactProjectCard, {
      props: { project: mockProject },
    })

    expect(wrapper.find('.star-badge').text()).toContain('15')
  })
})
