import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AxiosError } from 'axios'
import apiClient from '../client'

describe('HTTP Client Centralizado (src/api/client.ts)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('1. Deve possuir configuração padrão de timeout e headers JSON', () => {
    expect(apiClient.defaults.timeout).toBe(15000)
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json')
    expect(apiClient.defaults.headers.Accept).toBe('application/json')
  })

  it('2. Deve retornar dados de sucesso através do interceptor de resposta', async () => {
    apiClient.defaults.adapter = async (config) => {
      return {
        data: { message: 'sucesso' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      }
    }

    const response = await apiClient.get('/teste')
    expect(response.data).toEqual({ message: 'sucesso' })
  })

  it('3. Deve propagar rejeição de erros HTTP normalmente', async () => {
    apiClient.defaults.adapter = async (config) => {
      const error = new AxiosError(
        'Request failed with status code 500',
        'ERR_BAD_RESPONSE',
        config,
        null,
        {
          status: 500,
          statusText: 'Internal Server Error',
          data: { error: 'Falha no servidor' },
          headers: {},
          config,
        },
      )
      throw error
    }

    await expect(apiClient.get('/teste-erro')).rejects.toThrow('Request failed with status code 500')
  })
})
