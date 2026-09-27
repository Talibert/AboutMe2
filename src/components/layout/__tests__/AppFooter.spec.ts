import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppFooter from '../AppFooter.vue'

describe('AppFooter.vue', () => {
  it('1. Deve renderizar texto de copyright com o ano corrente', () => {
    const wrapper = mount(AppFooter)
    const currentYear = new Date().getFullYear().toString()

    expect(wrapper.find('.footer').exists()).toBe(true)
    expect(wrapper.text()).toContain('Taliberti')
    expect(wrapper.text()).toContain(currentYear)
  })
})
