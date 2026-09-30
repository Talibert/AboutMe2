import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CareerJourney from '../CareerJourney.vue'
import { CAREER_DATA } from '@/data/career'

describe('CareerJourney.vue', () => {
  it('1. Deve renderizar o SectionHeader com título e badge de carreira', () => {
    const wrapper = mount(CareerJourney)

    expect(wrapper.find('h2').text()).toBe('Jornada Profissional')
    expect(wrapper.text()).toContain('TRAJETÓRIA & EXPERIÊNCIA')
  })

  it('2. Deve renderizar todos os marcos de evolução com cargos e datas corretas', () => {
    const wrapper = mount(CareerJourney)

    const items = wrapper.findAll('.timeline-item')
    expect(items).toHaveLength(3)

    // Marco 1: Estagiário (03/2024)
    expect(items[0]?.find('.milestone-role').text()).toBe('Estagiário')
    expect(items[0]?.find('.milestone-date').text()).toBe('03/2024')

    // Marco 2: Programador (01/2025)
    expect(items[1]?.find('.milestone-role').text()).toBe('Programador')
    expect(items[1]?.find('.milestone-date').text()).toBe('01/2025')

    // Marco 3: Analista de Sistemas Jr (01/2026) - Atual
    expect(items[2]?.find('.milestone-role').text()).toBe('Analista de Sistemas Jr')
    expect(items[2]?.find('.milestone-date').text()).toBe('01/2026')
    expect(items[2]?.find('.milestone-badge').text()).toBe('Atual')
    expect(items[2]?.classes()).toContain('timeline-item--current')
  })

  it('3. Deve renderizar os dados da empresa, resumo e tecnologias', () => {
    const wrapper = mount(CareerJourney)

    // Empresa
    expect(wrapper.find('.company-title').text()).toBe(CAREER_DATA.company)
    expect(wrapper.find('.banner-role').text()).toBe(CAREER_DATA.currentRole)

    // Resumo
    expect(wrapper.find('.company-description').text()).toBe(CAREER_DATA.description)

    // Tecnologias
    const chips = wrapper.findAll('.tech-chip')
    expect(chips.length).toBeGreaterThanOrEqual(CAREER_DATA.technologies.length)
    expect(chips[0]?.text()).toBe(CAREER_DATA.technologies[0])
  })
})
