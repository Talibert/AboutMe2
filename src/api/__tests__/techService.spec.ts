import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import techService from '../techService'
import apiClient from '../client'
import type { TechItem } from '@/types/tech'

vi.mock('../client', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('Service: techService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllEnvs()
  })

  it('1. Deve retornar a lista de tecnologias locais no modo mock', async () => {
    vi.stubEnv('VITE_USE_MOCK_API', 'true')

    const fetchPromise = techService.getItens()

    await vi.advanceTimersByTimeAsync(2000)
    const items = await fetchPromise

    expect(apiClient.get).not.toHaveBeenCalled()
    expect(items.length).toBeGreaterThanOrEqual(5)

    const titles = items.map((i) => i.title)
    expect(titles).toContain('Pinia & Persistência')
    expect(titles).toContain('Vue Router 4 & Layouts')
    expect(titles).toContain('Vitest & Vue Test Utils')
  })

  it('2. Deve buscar tecnologias da API via GET /features quando VITE_USE_MOCK_API for false', async () => {
    vi.stubEnv('VITE_USE_MOCK_API', 'false')

    const mockApiFeatures: TechItem[] = [
      {
        id: 'graphql',
        icon: '📊',
        badge: 'API',
        title: 'GraphQL API',
        description: 'Integração backend',
        highlights: ['Apollo', 'Queries'],
      },
    ]

    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockApiFeatures })

    const result = await techService.getItens()

    expect(apiClient.get).toHaveBeenCalledWith('/features')
    expect(result).toEqual(mockApiFeatures)
  })
})
