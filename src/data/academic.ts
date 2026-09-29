import type { AcademicItem } from '@/types/academic'

/**
 * ============================================================================
 * FORMAÇÃO ACADÊMICA & CURSOS TÉCNICOS
 * ============================================================================
 * Dados das graduações e cursos técnicos de Guilherme Taliberti.
 * Estrutura preparada para alteração posterior com os dados reais/oficiais.
 */
export const DEFAULT_ACADEMIC_ITEMS: AcademicItem[] = [
  {
    id: 'faculdade-sistemas-informacao',
    type: 'Faculdade',
    title: 'Bacharelado em Sistemas de Informação',
    institution: 'Estácio',
    period: '2023 - 2026',
    status: 'Cursando',
    description:
      'Graduação superior focada no ciclo completo de desenvolvimento de software, estruturas de dados, arquiteturas distribuídas, modelagem relacional de banco de dados e gestão ágil de projetos.',
    skills: [
      'Engenharia de Software',
      'Estruturas de Dados',
      'Arquiteturas Distribuídas',
      'Banco de Dados SQL',
      'Gestão Ágil (Scrum)',
    ],
    icon: '🎓',
    accentColor: '#38bdf8',
  },
  {
    id: 'faculdade-automacao-industrial',
    type: 'Faculdade',
    title: 'Tecnólogo em Automação Industrial',
    institution: 'Fatec São Paulo',
    period: '2019 - 2022',
    status: 'Concluído',
    description:
      'Formação tecnológica com ênfase em controle de processos, programação de controladores lógicos programáveis (CLPs), redes industriais de comunicação, instrumentação e automação de sistemas.',
    skills: [
      'Lógica & Controle de Processos',
      'Programação C/C++',
      'Redes Industriais',
      'Sistemas Embarcados',
      'CLPs & Supervisórios',
    ],
    icon: '🏛️',
    accentColor: '#10b981',
  },
  {
    id: 'tecnico-mecatrônica',
    type: 'Curso Técnico',
    title: 'Técnico em Mecatrônica',
    institution: 'SENAI Roberto Simonsen',
    period: '2016 - 2018',
    status: 'Concluído',
    description:
      'Curso técnico profissionalizante com imersão em lógica de programação, robótica, elétrica e mecânica.',
    skills: [
      'Lógica de Programação',
      'Sistemas Embarcados',
      'CLPs',
      'Redes Industriais',
      'Algoritmos',
    ],
    icon: '⚙️',
    accentColor: '#f59e0b',
  },
]
