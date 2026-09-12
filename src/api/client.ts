/**
 * ============================================================================
 * CLIENTE HTTP CENTRALIZADO (AXIOS)
 * ============================================================================
 *
 * Este arquivo é a "espinha dorsal" de toda a comunicação do frontend com a API.
 * Em vez de chamar `axios.get()` ou `fetch()` espalhado pelos componentes,
 * centralizamos toda a configuração aqui por 3 motivos cruciais:
 *
 * 1. PADRONIZAÇÃO: URL base, headers e timeouts são configurados uma única vez.
 * 2. SEGURANÇA (Request Interceptor): Injeção automática de token JWT em cada requisição.
 * 3. RESILIÊNCIA (Response Interceptor): Tratamento global de erros (ex: logout em 401).
 */

import axios from 'axios'
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

/**
 * ----------------------------------------------------------------------------
 * 1. CRIAÇÃO DA INSTÂNCIA DO AXIOS
 * ----------------------------------------------------------------------------
 * Criamos uma instância dedicada para não poluir o objeto global do Axios.
 */
export const apiClient: AxiosInstance = axios.create({
  // Lê a URL base definida no arquivo .env (ex: https://api.exemplo.com/v1).
  // Se não estiver definida, usa '/api' como fallback relativo.
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',

  // Tempo limite de espera por resposta (15 segundos).
  // Evita que requisições fiquem travadas eternamente caso o servidor caia.
  timeout: 15000,

  // Cabeçalhos padrão enviados em todas as requisições
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

/**
 * ----------------------------------------------------------------------------
 * 2. REQUEST INTERCEPTOR ("O Pedágio de Saída")
 * ----------------------------------------------------------------------------
 * Toda requisição que sai da sua aplicação passa por esta função ANTES de ir
 * para a internet.
 *
 * Papel principal: Verificar se o usuário está logado no Pinia. Se estiver,
 * anexa automaticamente o cabeçalho 'Authorization: Bearer <token>'
 * conforme o padrão RFC 6750 de APIs REST modernas.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Acessa a store de autenticação do Pinia
    const authStore = useAuthStore()

    // Se temos um token salvo e os cabeçalhos existem na requisição:
    if (authStore.token && config.headers) {
      // Injeta o token. Exemplo: "Bearer eyJhbGciOiJIUzI1NiIs..."
      config.headers.Authorization = `Bearer ${authStore.token}`
    }

    // Retorna a requisição modificada para seguir viagem até o servidor
    return config
  },
  (error: AxiosError) => {
    // Executado se houver falha na própria montagem da requisição (raro)
    return Promise.reject(error)
  },
)

/**
 * ----------------------------------------------------------------------------
 * 3. RESPONSE INTERCEPTOR ("O Pedágio de Entrada")
 * ----------------------------------------------------------------------------
 * Toda resposta que volta do servidor passa por aqui ANTES de chegar nas suas
 * stores ou componentes (.then / .catch).
 *
 * Papel principal: Tratar respostas com erro de forma global e padronizada.
 */
apiClient.interceptors.response.use(
  // Caso de Sucesso (HTTP status 200 a 299):
  (response: AxiosResponse) => {
    // Entrega a resposta intacta para quem a chamou
    return response
  },

  // Caso de Erro (HTTP status 4xx, 5xx ou falha de rede):
  (error: AxiosError) => {
    // ------------------------------------------------------------------------
    // TRATAMENTO DE 401 UNAUTHORIZED (Não Autorizado / Sessão Expirada)
    // ------------------------------------------------------------------------
    // Ocorre quando o token expirou no backend ou foi revogado.
    if (error.response?.status === 401) {
      const authStore = useAuthStore()

      // 1. Limpa o token e o usuário do estado global e do localStorage
      authStore.logout()

      // 2. Redireciona o usuário para o login (salvando onde ele estava)
      // Evitamos redirecionar caso ele já esteja na própria tela de login
      if (router.currentRoute.value.name !== 'login') {
        router.push({
          name: 'login',
          query: { redirect: router.currentRoute.value.fullPath },
        })
      }
    }

    // ------------------------------------------------------------------------
    // TRATAMENTO DE OUTROS ERROS (Exemplos para expansão futura):
    // ------------------------------------------------------------------------
    // - status === 403: Acesso proibido (usuário logado sem permissão/role)
    // - status === 404: Endpoint não encontrado
    // - status >= 500: Erro interno do servidor backend
    // - !error.response: Sem conexão com a internet (offline)

    // Rejeita a promise para que o try/catch do serviço ou componente
    // também possa exibir mensagens específicas caso deseje.
    return Promise.reject(error)
  },
)

export default apiClient
