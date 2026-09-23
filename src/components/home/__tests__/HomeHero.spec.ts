import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeHero from '../HomeHero.vue'
import { useIntro } from '@/composables/useIntro'

describe('HomeHero.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    const { isIntroActive, isIntroDismissed } = useIntro()
    isIntroActive.value = true
    isIntroDismissed.value = false
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('1. Deve renderizar o nome e cargo de Guilherme Taliberti após o término da intro e digitação', async () => {
    const { markIntroDismissed } = useIntro()
    const wrapper = mount(HomeHero)

    expect(wrapper.find('.hero-name').text()).toContain('Guilherme')
    expect(wrapper.find('.hero-name').text()).toContain('Taliberti')

    // Antes da intro sumir, o hero não possui a classe is-revealed
    expect(wrapper.find('.hero-container').classes()).not.toContain('is-revealed')

    // Simula o fim da intro (splash sumiu e disparou @after-leave)
    markIntroDismissed()
    await wrapper.vm.$nextTick()

    // O container agora possui a classe is-revealed que dispara as animações CSS
    expect(wrapper.find('.hero-container').classes()).toContain('is-revealed')

    // Avança o delay inicial (180ms) + digitação completa (20 caracteres * 110ms = 2200ms)
    vi.advanceTimersByTime(2600)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.hero-role').text()).toContain('Analista de Sistemas')
    expect(wrapper.find('.typewriter-cursor').exists()).toBe(true)
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

  it('6. Deve renderizar a moldura em formato de Janela de Código / IDE minimalista', () => {
    const wrapper = mount(HomeHero)

    expect(wrapper.find('.ide-window').exists()).toBe(true)
    expect(wrapper.find('.ide-titlebar').exists()).toBe(true)
    expect(wrapper.findAll('.control-dot')).toHaveLength(3)
    expect(wrapper.find('.branch-tag').text()).toContain('main*')
    expect(wrapper.find('.ide-statusbar').text()).toContain('master')
    expect(wrapper.find('.ide-statusbar').text()).toContain('UTF-8')
  })

  it('7. Deve exibir a digitação incremental letra por letra do cargo', async () => {
    const { markIntroDismissed } = useIntro()
    const wrapper = mount(HomeHero)

    markIntroDismissed()
    await wrapper.vm.$nextTick()

    // Avança o delay inicial (180ms) + 3 caracteres (110ms cada = 330ms)
    vi.advanceTimersByTime(180 + 110 * 3)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.typewriter-text').text()).toBe('Ana')

    // Avança mais 5 caracteres (110ms * 5 = 550ms)
    vi.advanceTimersByTime(110 * 5)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.typewriter-text').text()).toBe('Analista')
  })
})
