import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TechCard from '../TechCard.vue'
import type { TechItem } from '@/types/tech'

const mockItem: TechItem = {
  id: 'pinia',
  icon: '🍍',
  badge: 'Estado Global',
  title: 'Pinia & Persistência',
  description: 'Gerenciamento de estado reativo com a moderna sintaxe Setup Store.',
  highlights: ['TypeScript Nativo', 'Persistência Seletiva', 'Stores Modulares'],
}

describe('TechCard.vue', () => {
  it('1. Deve renderizar os dados do item (badge, ícone, título e descrição)', () => {
    const wrapper = mount(TechCard, {
      props: {
        item: mockItem,
      },
    })

    expect(wrapper.find('.tech-badge').text()).toBe('Estado Global')
    expect(wrapper.find('.tech-icon').text()).toBe('🍍')
    expect(wrapper.find('.tech-title').text()).toBe('Pinia & Persistência')
    expect(wrapper.find('.tech-description').text()).toContain('Gerenciamento de estado reativo')
    expect(wrapper.attributes('aria-label')).toBe('Tecnologia: Pinia & Persistência')
  })

  it('2. Deve renderizar todos os highlights com o marcador de verificação', () => {
    const wrapper = mount(TechCard, {
      props: {
        item: mockItem,
      },
    })

    const tags = wrapper.findAll('.tech-tag')
    expect(tags).toHaveLength(3)
    expect(tags[0]?.text()).toContain('✓ TypeScript Nativo')
    expect(tags[1]?.text()).toContain('✓ Persistência Seletiva')
    expect(tags[2]?.text()).toContain('✓ Stores Modulares')
  })

  it('3. Não deve quebrar nem renderizar a seção de highlights se a lista for vazia', () => {
    const wrapper = mount(TechCard, {
      props: {
        item: {
          ...mockItem,
          highlights: [],
        },
      },
    })

    expect(wrapper.find('.tech-highlights').exists()).toBe(false)
  })
})
