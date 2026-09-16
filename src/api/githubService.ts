/**
 * ============================================================================
 * SERVIÇO GITHUB (API EXTERNA)
 * ============================================================================
 *
 * Importa o Axios puro diretamente da biblioteca ('axios'), e NÃO o nosso
 * 'apiClient' customizado. Dessa forma:
 * - Aproveitamos o parse automático de JSON e tratamento de erro do Axios;
 * - Garantimos que NENHUM token Bearer da nossa aplicação seja enviado ao GitHub.
 */

import axios from 'axios'
import type { GitHubUser } from '@/types/github'

export const githubService = {
  /**
   * Busca o perfil público de qualquer usuário no GitHub.
   * @param username Nome de usuário no GitHub
   */
  async getUserProfile(username: string): Promise<GitHubUser> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await axios.get<GitHubUser>(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })
    return response.data
  },
}

export default githubService
