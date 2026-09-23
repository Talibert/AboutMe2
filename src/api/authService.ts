/**
 * ============================================================================
 * SERVIÇO DE AUTENTICAÇÃO (AUTH SERVICE)
 * ============================================================================
 *
 * Responsável exclusivamente por fazer as requisições relacionadas a auth
 * (login, logout, obter perfil).
 *
 * Ele NÃO gerencia reatividade nem grava coisas no localStorage — essa
 * responsabilidade pertence à store Pinia (src/stores/auth.ts).
 */

import apiClient from './client'
import type { LoginCredentials, AuthResponse, User } from '@/types/auth'

export const authService = {
  /**
   * Realiza a autenticação do usuário.
   *
   * FLUXO DE DECISÃO:
   * 1. Se VITE_USE_MOCK_API === 'true':
   *    Simula a espera de rede e devolve um usuário fictício com token fake.
   *    Isso permite testar todo o template sem depender de um backend rodando.
   *
   * 2. Se VITE_USE_MOCK_API for 'false' (ou qualquer outro valor):
   *    O `if` abaixo é ignorado e a função executa a chamada HTTP real com Axios:
   *    `apiClient.post('/auth/login', credentials)`
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // ------------------------------------------------------------------------
    // FLUXO A: MOCK LOCAL (Executado quando VITE_USE_MOCK_API='true')
    // ------------------------------------------------------------------------
    if (import.meta.env.VITE_USE_MOCK_API !== 'false') {
      // Simula 600ms de latência de rede
      await new Promise((resolve) => setTimeout(resolve, 600))

      const user: User = {
        id: 'user_1',
        name: credentials.email.split('@')[0] ?? 'Usuário BaseFront',
        email: credentials.email,
        role: 'admin',
      }

      // IMPORTANTE: O 'return' encerra a função aqui mesmo.
      // As linhas abaixo deste 'if' NUNCA rodam quando o mock está ativo.
      return {
        user,
        token: `mock_jwt_token_${Date.now()}`,
      }
    }

    // ------------------------------------------------------------------------
    // FLUXO B: REQUISIÇÃO REAL À API (Executado quando VITE_USE_MOCK_API='false')
    // ------------------------------------------------------------------------
    // 1. O Axios monta a URL: baseURL + '/auth/login' (ex: https://api.site.com/v1/auth/login)
    // 2. Converte `credentials` para JSON e envia via POST.
    // 3. O backend processa e responde com status 200 e payload JSON: { user: {...}, token: "..." }
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials)

    // response.data contém exatamente o AuthResponse retornado pelo seu servidor
    return response.data
  },

  /**
   * Busca os dados do usuário autenticado (endpoint GET /auth/me).
   * O token Bearer é anexado automaticamente pelo Request Interceptor do client.ts!
   */
  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me')
    return response.data
  },

  /**
   * Notifica a API sobre o encerramento da sessão (logout) para invalidar o token no servidor.
   */
  async logout(): Promise<void> {
    if (import.meta.env.VITE_USE_MOCK_API === 'true') {
      return
    }

    await apiClient.post('/auth/logout')
  },
}

export default authService
