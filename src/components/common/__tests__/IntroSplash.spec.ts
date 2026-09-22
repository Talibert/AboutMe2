import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import IntroSplash from '../IntroSplash.vue'

describe('IntroSplash.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
    document.body.style.overflow = ''
  })

  it('1. Deve renderizar o nome "Guilherme Taliberti" e o subtítulo por padrão', () => {
    const wrapper = mount(IntroSplash)

    expect(wrapper.find('.intro-name').text()).toContain('Guilherme Taliberti')
    expect(wrapper.find('.intro-badge').text()).toContain('Analista de Sistemas')
    expect(wrapper.find('.progress-bar').exists()).toBe(true)
  })

  it('2. Deve permitir customizar o nome e subtítulo via props', () => {
    const wrapper = mount(IntroSplash, {
      props: {
        name: 'Taliberti Developer',
        subtitle: 'Engenharia de Software',
      },
    })

    expect(wrapper.find('.intro-name').text()).toContain('Taliberti Developer')
    expect(wrapper.find('.intro-badge').text()).toContain('Engenharia de Software')
  })

  it('3. Deve travar o overflow do body na montagem e restaurar ao desmontar', () => {
    const wrapper = mount(IntroSplash)
    expect(document.body.style.overflow).toBe('hidden')

    wrapper.unmount()
    expect(document.body.style.overflow).toBe('')
  })

  it('4. Não deve emitir finish ao clicar (não permite pular)', async () => {
    const wrapper = mount(IntroSplash, {
      props: {
        duration: 3000,
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('finish')).toBeUndefined()
  })

  it('5. Não deve emitir finish ao pressionar teclas (não permite pular)', () => {
    const wrapper = mount(IntroSplash, {
      props: {
        duration: 3000,
      },
    })

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

    expect(wrapper.emitted('finish')).toBeUndefined()
  })

  it('6. Deve emitir "finish" estritamente após a conclusão dos 3 segundos (3000ms)', () => {
    const wrapper = mount(IntroSplash, {
      props: {
        duration: 3000,
      },
    })

    expect(wrapper.emitted('finish')).toBeUndefined()

    // Avança 2999ms - ainda não finalizou
    vi.advanceTimersByTime(2999)
    expect(wrapper.emitted('finish')).toBeUndefined()

    // Completa os 3000ms
    vi.advanceTimersByTime(1)
    expect(wrapper.emitted('finish')).toHaveLength(1)
  })
})
