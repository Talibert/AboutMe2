import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AppHeader from '../AppHeader.vue'
import { useThemeStore } from '@/stores/theme'

describe('AppHeader.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('1. Deve renderizar a marca com nome Taliberti', () => {
    const wrapper = mount(AppHeader, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    expect(wrapper.find('.brand-name').text()).toBe('Taliberti.')
    expect(wrapper.find('.brand-logo').exists()).toBe(false)
  })

  it('2. Deve renderizar links de navegação para Início e Projetos', () => {
    const wrapper = mount(AppHeader, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a :href="$attrs.to"><slot /></a>',
          },
        },
      },
    })

    const links = wrapper.findAll('.nav-link')
    expect(links).toHaveLength(2)
    expect(links[0]?.text()).toBe('Início')
    expect(links[1]?.text()).toBe('Projetos')
  })

  it('3. Deve alternar o tema ao clicar no botão de alternância', async () => {
    const wrapper = mount(AppHeader, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    })

    const themeStore = useThemeStore()
    const initialDark = themeStore.isDark

    const toggleBtn = wrapper.find('.theme-toggle-btn')
    expect(toggleBtn.exists()).toBe(true)

    await toggleBtn.trigger('click')
    expect(themeStore.isDark).toBe(!initialDark)
  })
})
