/**
 * ============================================================================
 * CLIENTE HTTP CENTRALIZADO (AXIOS)
 * ============================================================================
 *
 * Centraliza a configuração de chamadas HTTP da aplicação:
 * 1. PADRONIZAÇÃO: URL base, cabeçalhos padrão e tempo de timeout.
 * 2. RESILIÊNCIA: Interceptação e tratamento padronizado de erros de resposta.
 */

import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

export default apiClient
