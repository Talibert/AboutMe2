import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCarousel from '../BaseCarousel.vue'

interface MockItem {
  id: number
  title: string
}

const SAMPLE_ITEMS: MockItem[] = [
  { id: 1, title: 'Item Alpha' },
  { id: 2, title: 'Item Beta' },
  { id: 3, title: 'Item Gamma' },
]

describe('BaseCarousel.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('1. Deve renderizar o estado de carregamento (Loading Skeleton) quando loading for true', () => {
    const wrapper = mount(BaseCarousel, {
      props: {
        items: [],
        loading: true,
      },
    })

    expect(wrapper.find('.carousel-viewport--loading').exists()).toBe(true)
    expect(wrapper.find('.skeleton-placeholder').exists()).toBe(true)
  })

  it('2. Deve renderizar o estado vazio (Empty State) quando não houver itens', () => {
    const wrapper = mount(BaseCarousel, {
      props: {
        items: [],
        loading: false,
      },
    })

    expect(wrapper.find('.carousel-viewport--empty').exists()).toBe(true)
    expect(wrapper.text()).toContain('Nenhum item disponível')
  })

  it('3. Deve renderizar os slides usando o Scoped Slot padrão', () => {
    const wrapper = mount(BaseCarousel, {
      props: {
        items: SAMPLE_ITEMS,
      },
      slots: {
        default: `<template #default="{ item, index }">
          <div class="test-slide">#{{ index }}: {{ item.title }}</div>
        </template>`,
      },
    })

    const slides = wrapper.findAll('.test-slide')
    expect(slides).toHaveLength(3)
    expect(slides[0]!.text()).toBe('#0: Item Alpha')
    expect(slides[1]!.text()).toBe('#1: Item Beta')
    expect(slides[2]!.text()).toBe('#2: Item Gamma')
  })

  it('4. Deve navegar para o próximo slide e emitir slideChange ao clicar na seta Next', async () => {
    const wrapper = mount(BaseCarousel, {
      props: {
        items: SAMPLE_ITEMS,
      },
      slots: {
        default: `<template #default="{ item }">
          <div>{{ item.title }}</div>
        </template>`,
      },
    })

    const nextBtn = wrapper.find('.nav-arrow--next')
    expect(nextBtn.exists()).toBe(true)

    // Clica para ir ao slide 1
    await nextBtn.trigger('click')

    const emitted = wrapper.emitted('slideChange')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual([1, SAMPLE_ITEMS[1]])

    // Verifica se o track moveu
    const track = wrapper.find('.carousel-track')
    expect(track.attributes('style')).toContain('transform: translateX(-100%)')
  })

  it('5. Deve fazer loop para o último slide ao clicar na seta Prev no primeiro slide', async () => {
    const wrapper = mount(BaseCarousel, {
      props: {
        items: SAMPLE_ITEMS,
      },
    })

    const prevBtn = wrapper.find('.nav-arrow--prev')
    await prevBtn.trigger('click')

    // Deve voltar para o índice 2 (último item)
    const emitted = wrapper.emitted('slideChange')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual([2, SAMPLE_ITEMS[2]])
  })

  it('6. Deve navegar diretamente para o slide ao clicar no indicador de ponto (dot)', async () => {
    const wrapper = mount(BaseCarousel, {
      props: {
        items: SAMPLE_ITEMS,
        showDots: true,
      },
    })

    const dots = wrapper.findAll('.dot')
    expect(dots).toHaveLength(3)

    // Clica no 3º ponto (índice 2)
    await dots[2]!.trigger('click')

    expect(wrapper.emitted('slideChange')?.[0]).toEqual([2, SAMPLE_ITEMS[2]])
    expect(dots[2]!.classes()).toContain('is-active')
  })

  it('7. Deve avançar os slides automaticamente via Autoplay', async () => {
    const wrapper = mount(BaseCarousel, {
      props: {
        items: SAMPLE_ITEMS,
        autoplayInterval: 2000,
      },
    })

    // Inicialmente no índice 0
    expect(wrapper.emitted('slideChange')).toBeUndefined()

    // Avança 2000ms no tempo falso
    vi.advanceTimersByTime(2000)

    // Deve ter avançado para o slide 1
    expect(wrapper.emitted('slideChange')?.[0]).toEqual([1, SAMPLE_ITEMS[1]])

    // Avança mais 2000ms
    vi.advanceTimersByTime(2000)

    // Deve ter avançado para o slide 2
    expect(wrapper.emitted('slideChange')?.[1]).toEqual([2, SAMPLE_ITEMS[2]])
  })

  it('8. Deve pausar o Autoplay quando o mouse estiver sobre o carrossel (hover)', async () => {
    const wrapper = mount(BaseCarousel, {
      props: {
        items: SAMPLE_ITEMS,
        autoplayInterval: 2000,
      },
    })

    // Simula hover do usuário
    await wrapper.find('.carousel-wrapper').trigger('mouseenter')

    // Avança o tempo que normalmente dispararia o slide
    vi.advanceTimersByTime(4000)

    // Como estava pausado, nenhum evento deve ter sido disparado
    expect(wrapper.emitted('slideChange')).toBeUndefined()

    // Remove o mouse
    await wrapper.find('.carousel-wrapper').trigger('mouseleave')

    // Avança o tempo novamente
    vi.advanceTimersByTime(2000)

    // Agora deve ter avançado
    expect(wrapper.emitted('slideChange')?.[0]).toEqual([1, SAMPLE_ITEMS[1]])
  })
})
