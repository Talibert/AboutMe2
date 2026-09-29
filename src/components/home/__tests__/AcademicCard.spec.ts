import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AcademicCard from '../AcademicCard.vue'
import type { AcademicItem } from '@/types/academic'

const mockItem: AcademicItem = {
  id: 'test-academic',
  type: 'Faculdade',
  title: 'Bacharelado em Sistemas de Informação',
  institution: 'Universidade Teste',
  period: '2023 - 2026',
  status: 'Cursando',
  description: 'Uma descrição detalhada sobre a graduação.',
  skills: ['Engenharia de Software', 'Banco de Dados', 'Arquitetura'],
  icon: '🎓',
}

describe('AcademicCard.vue', () => {
  it('1. Deve renderizar o tipo de formação e o status com indicador de pulso', () => {
    const wrapper = mount(AcademicCard, {
      props: { item: mockItem },
    })

    expect(wrapper.find('.type-badge').text()).toContain('Faculdade')
    expect(wrapper.find('.badge-icon').text()).toBe('🎓')
    expect(wrapper.find('.status-pill').text()).toContain('Cursando')
    expect(wrapper.find('.status-dot--pulse').exists()).toBe(true)
  })

  it('2. Deve renderizar a instituição, período e título do curso', () => {
    const wrapper = mount(AcademicCard, {
      props: { item: mockItem },
    })

    expect(wrapper.find('.institution-name').text()).toBe('Universidade Teste')
    expect(wrapper.find('.period-text').text()).toBe('2023 - 2026')
    expect(wrapper.find('.academic-title').text()).toBe('Bacharelado em Sistemas de Informação')
  })

  it('3. Deve renderizar as competências e destaques', () => {
    const wrapper = mount(AcademicCard, {
      props: { item: mockItem },
    })

    const chips = wrapper.findAll('.skill-chip')
    expect(chips).toHaveLength(3)
    expect(chips[0]?.text()).toBe('Engenharia de Software')
    expect(chips[1]?.text()).toBe('Banco de Dados')
    expect(chips[2]?.text()).toBe('Arquitetura')
  })
})
