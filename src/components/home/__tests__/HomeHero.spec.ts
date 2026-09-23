import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeHero from '../HomeHero.vue'

describe('HomeHero.vue', () => {
  it('1. Deve renderizar o nome e cargo de Guilherme Taliberti com destaque', () => {
    const wrapper = mount(HomeHero)

    expect(wrapper.find('.hero-name').text()).toContain('Guilherme')
    expect(wrapper.find('.hero-name').text()).toContain('Taliberti')
    expect(wrapper.find('.hero-role').text()).toContain('Analista de Sistemas')
  })

  it('2. Deve renderizar a lista de tecnologias principais', () => {
    const wrapper = mount(HomeHero)

    const stackText = wrapper.find('.stack-tags').text()
    expect(stackText).toContain('Java')
    expect(stackText).toContain('Spring Boot')
    expect(stackText).toContain('Clean Architecture')
    expect(stackText).toContain('Sistemas Distribuídos')
    expect(stackText).toContain('SGBDR')
    expect(stackText).toContain('Vue.js 3')
    expect(stackText).toContain('TypeScript')
  })

  it('3. Deve renderizar os links de GitHub e LinkedIn com rel="noopener noreferrer"', () => {
    const wrapper = mount(HomeHero)

    const links = wrapper.findAll('.btn-hero')
    expect(links.length).toBeGreaterThanOrEqual(2)

    const githubLink = links.find((l) => l.attributes('href')?.includes('github.com/Talibert'))
    expect(githubLink).toBeDefined()
    expect(githubLink?.attributes('target')).toBe('_blank')
    expect(githubLink?.attributes('rel')).toContain('noopener')

    const linkedinLink = links.find((l) => l.attributes('href')?.includes('linkedin.com'))
    expect(linkedinLink).toBeDefined()
  })

  it('4. Deve carregar a imagem em alta resolução com parâmetro s=600', () => {
    const wrapper = mount(HomeHero)

    const img = wrapper.find('img.profile-img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://avatars.githubusercontent.com/u/112726589?v=4&s=600')
    expect(img.attributes('alt')).toBe('Foto de perfil de Guilherme Taliberti')
  })

  it('5. Não deve renderizar o card flutuante sobre a foto', () => {
    const wrapper = mount(HomeHero)

    expect(wrapper.find('.floating-badge').exists()).toBe(false)
  })
})
