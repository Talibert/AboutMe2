import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AcademicCarousel from '../AcademicCarousel.vue'
import { DEFAULT_ACADEMIC_ITEMS } from '@/data/academic'

describe('AcademicCarousel.vue', () => {
  it('1. Deve renderizar o SectionHeader com título e badge acadêmico', () => {
    const wrapper = mount(AcademicCarousel)

    expect(wrapper.find('h2').text()).toBe('Trajetória Acadêmica')
    expect(wrapper.text()).toContain('FORMAÇÃO & QUALIFICAÇÕES')
  })

  it('2. Deve carregar e exibir os cards acadêmicos', async () => {
    const wrapper = mount(AcademicCarousel)
    await wrapper.vm.$nextTick()

    // O BaseCarousel renderiza o item atual no carrossel
    expect(wrapper.find('.academic-card').exists()).toBe(true)
    expect(wrapper.text()).toContain(DEFAULT_ACADEMIC_ITEMS[0]?.title)
  })
})
