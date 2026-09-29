import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCardSkeleton from '../ProjectCardSkeleton.vue'

describe('ProjectCardSkeleton.vue', () => {
  it('1. Deve renderizar a moldura macOS e os blocos de shimmer', () => {
    const wrapper = mount(ProjectCardSkeleton)

    expect(wrapper.find('.mac-skeleton-card').exists()).toBe(true)
    expect(wrapper.find('.skeleton-controls').exists()).toBe(true)
    expect(wrapper.find('.control-dot--close').exists()).toBe(true)
    expect(wrapper.findAll('.shimmer-block').length).toBeGreaterThan(5)
  })
})
