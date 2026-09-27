import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import DefaultLayout from '../DefaultLayout.vue'

describe('DefaultLayout.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('1. Deve renderizar header, footer e o conteúdo passado via slot', () => {
    const wrapper = mount(DefaultLayout, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
      slots: {
        default: '<div class="test-content">Conteúdo da Página</div>',
      },
    })

    expect(wrapper.find('.navbar').exists()).toBe(true)
    expect(wrapper.find('.main-content').text()).toContain('Conteúdo da Página')
    expect(wrapper.find('.footer').exists()).toBe(true)
  })
})
