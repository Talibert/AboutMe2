import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SectionHeader from '../SectionHeader.vue'

describe('SectionHeader.vue', () => {
  it('1. Deve renderizar título e subtítulo obrigatórios/padrões', () => {
    const wrapper = mount(SectionHeader, {
      props: {
        title: 'Título de Teste',
        subtitle: 'Subtítulo explicativo da seção',
      },
    })

    const titleEl = wrapper.find('.section-title')
    expect(titleEl.exists()).toBe(true)
    expect(titleEl.element.tagName).toBe('H2')
    expect(titleEl.text()).toBe('Título de Teste')

    const subtitleEl = wrapper.find('.section-subtitle')
    expect(subtitleEl.text()).toBe('Subtítulo explicativo da seção')
  })

  it('2. Deve renderizar o badge quando fornecido e omitir quando ausente', () => {
    const wrapperWithBadge = mount(SectionHeader, {
      props: {
        title: 'Com Badge',
        badge: 'PORTFÓLIO',
      },
    })
    expect(wrapperWithBadge.find('.section-badge').exists()).toBe(true)
    expect(wrapperWithBadge.find('.badge-text').text()).toBe('PORTFÓLIO')

    const wrapperWithoutBadge = mount(SectionHeader, {
      props: {
        title: 'Sem Badge',
      },
    })
    expect(wrapperWithoutBadge.find('.section-badge').exists()).toBe(false)
  })

  it('3. Deve suportar tag semântica customizada para o título e id de acessibilidade', () => {
    const wrapper = mount(SectionHeader, {
      props: {
        title: 'Título H3 Custom',
        headingTag: 'h3',
        headingId: 'custom-heading-id',
      },
    })

    const titleEl = wrapper.find('.section-title')
    expect(titleEl.element.tagName).toBe('H3')
    expect(titleEl.attributes('id')).toBe('custom-heading-id')
  })

  it('4. Deve aplicar a classe correta de alinhamento', () => {
    const wrapperCenter = mount(SectionHeader, {
      props: { title: 'Centro', align: 'center' },
    })
    expect(wrapperCenter.classes()).toContain('section-header--center')

    const wrapperLeft = mount(SectionHeader, {
      props: { title: 'Esquerda', align: 'left' },
    })
    expect(wrapperLeft.classes()).toContain('section-header--left')
  })
})
