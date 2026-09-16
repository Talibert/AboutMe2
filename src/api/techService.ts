/**
 * ============================================================================
 * SERVIÇO DE TECNOLOGIAS / RECURSOS (TECH SERVICE)
 * ============================================================================
 *
 * Responsável por obter a lista de módulos e recursos tecnológicos da aplicação.
 *
 * FLUXO DE DECISÃO:
 * 1. Se VITE_USE_MOCK_API === 'true' (padrão em desenvolvimento local sem backend):
 *    Simula uma requisição assíncrona de rede com delay e retorna o mock de tecnologias.
 * 2. Caso contrário:
 *    Executa a requisição HTTP real ao endpoint configurado no backend:
 *    `apiClient.get<TechFeature[]>('/features')`
 */

import apiClient from './client'
import type { TechItem } from '@/types/tech'

const MOCK_FEATURES: TechItem[] = [
  {
    id: 'pinia',
    icon: '🍍',
    badge: 'Estado Global',
    title: 'Pinia & Persistência',
    description:
      'Gerenciamento de estado reativo com a moderna sintaxe Setup Store e persistência seletiva em localStorage via pinia-plugin-persistedstate.',
    highlights: ['TypeScript Nativo', 'Persistência Seletiva (pick)', 'Stores Modulares'],
  },
  {
    id: 'router',
    icon: '🧭',
    badge: 'Navegação',
    title: 'Vue Router 4 & Layouts',
    description:
      'Sistema de layouts intercambiáveis (Default, Auth, Blank) resolvidos dinamicamente, com proteção de rotas e restauração de scroll.',
    highlights: ['Lazy-Loading (Code-splitting)', 'Guarda de Autenticação', 'Tipagem de RouteMeta'],
  },
  {
    id: 'vite',
    icon: '⚡',
    badge: 'Performance',
    title: 'Vite & TypeScript First',
    description:
      'Ambiente de desenvolvimento com Hot Module Replacement instantâneo e verificação estrita de tipos com vue-tsc.',
    highlights: ['Build em milissegundos', 'TypeScript Strict Mode', 'Alias de caminhos (@/)'],
  },
  {
    id: 'axios',
    icon: '🌐',
    badge: 'Comunicação',
    title: 'Axios & Interceptors',
    description:
      'Cliente HTTP centralizado com injeção automática de token Bearer, tratamento global de status 401 e chave seletora de Mock via .env.',
    highlights: ['Request Interceptors', 'Auto-logout em 401', 'Modo Mock desacoplado'],
  },
  {
    id: 'architecture',
    icon: '📁',
    badge: 'Escalabilidade',
    title: 'Arquitetura Limpa',
    description:
      'Estrutura modular de pastas projetada para que novos projetos cresçam com alta coesão e baixo acoplamento.',
    highlights: ['Separação em Camadas', 'Componentes Reutilizáveis', 'Services Isolados'],
  },
]

export const techService = {
  /**
   * Obtém a lista de features/tecnologias que compõem o ecossistema da aplicação.
   */
  async getItens(): Promise<TechItem[]> {
    if (import.meta.env.VITE_USE_MOCK_API === 'true') {
      await new Promise((resolve) => setTimeout(resolve, 5000))
      return [...MOCK_FEATURES]
    }

    const response = await apiClient.get<TechItem[]>('/features')
    return response.data
  },
}

export default techService
