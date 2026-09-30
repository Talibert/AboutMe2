import type { CareerExperience } from '@/types/career'

/**
 * ============================================================================
 * JORNADA PROFISSIONAL & EVOLUÇÃO DE CARREIRA
 * ============================================================================
 * Dados da carreira de Guilherme Taliberti na Élin Duxus Consulting,
 * refletindo sua evolução de Estagiário (03/2024) -> Programador (01/2025) ->
 * Analista de Sistemas Jr (01/2026 - Presente).
 */
export const CAREER_DATA: CareerExperience = {
  company: 'Élin Duxus Consulting',
  companyType: 'Consultoria em Tecnologia & Soluções Corporativas',
  currentRole: 'Analista de Sistemas Jr',
  period: '03/2024 — Presente',
  location: 'São Paulo, SP',
  description:
    'Atuação no ciclo completo de engenharia de software corporativo, com foco em arquiteturas modernas, robustez e performance. Responsável pelo desenvolvimento de APIs RESTful e serviços em Java com Spring Boot, além da construção de interfaces web reativas e tipadas com Vue.js 3 e TypeScript.',
  highlights: [
    'Desenvolvimento de APIs RESTful escaláveis com Java, Spring Boot e Clean Architecture.',
    'Construção de SPAs modernas, responsivas e de alta performance com Vue.js 3 e TypeScript.',
    'Modelagem de banco de dados relacional e otimização de consultas SQL.',
    'Garantia de qualidade contínua com testes automatizados e práticas ágeis.',
  ],
  technologies: [
    'Java',
    'Spring Boot',
    'Vue.js 3',
    'TypeScript',
    'PostgreSQL',
    'Clean Architecture',
    'Docker',
    'Git',
  ],
  milestones: [
    {
      id: 'estagiario',
      role: 'Estagiário',
      date: '03/2024',
      status: 'completed',
      description:
        'Início da jornada, com foco em aprendizado prático de regras de negócio, desenvolvimento assistido de rotinas back-end e front-end, e absorção de padrões corporativos.',
    },
    {
      id: 'programador',
      role: 'Programador',
      date: '01/2025',
      status: 'completed',
      description:
        'Promoção com maior autonomia na entrega de features de ponta a ponta, desenvolvimento de integrações de microsserviços e refinamento da arquitetura de telas.',
    },
    {
      id: 'analista-sistemas-jr',
      role: 'Analista de Sistemas Jr',
      date: '01/2026',
      status: 'current',
      description:
        'Cargo atual, com responsabilidade sobre análise de sistemas, sustentação técnica, tomada de decisões de arquitetura e evolução contínua da qualidade do ecossistema de software.',
      badge: 'Atual',
    },
  ],
}
