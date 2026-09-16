import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'
import githubService from '../githubService'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('Service: githubService', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('1. Deve consultar o perfil no endpoint público do GitHub (após delay de 2000ms)', async () => {
    const mockUser = {
      id: 123,
      login: 'Talibert',
      name: 'Guilherme Taliberti',
    }

    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockUser } as any)

    const fetchPromise = githubService.getUserProfile('Talibert')

    // Avança os 2000ms de delay simulados no serviço
    await vi.advanceTimersByTimeAsync(2000)
    const result = await fetchPromise

    expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users/Talibert', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })
    expect(result).toEqual(mockUser)
  })

  it('2. Deve propagar o erro caso a requisição ao GitHub falhe (após delay de 2000ms)', async () => {
    vi.mocked(axios.get).mockRejectedValueOnce(new Error('User not found'))

    const assertion = expect(
      githubService.getUserProfile('usuario_inexistente'),
    ).rejects.toThrow('User not found')

    // Avança os 2000ms de delay simulados no serviço
    await vi.advanceTimersByTimeAsync(2000)

    await assertion
  })
})
