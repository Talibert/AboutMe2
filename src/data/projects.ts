import type { ProjectItem } from '@/types/project'

/**
 * ============================================================================
 * PROJETOS EM DESTAQUE (HOME SHOWCASE)
 * ============================================================================
 * Os 3 projetos selecionados para a vitrine da página inicial, acompanhados de
 * diagramas de arquitetura em camadas e detalhes profundos de engenharia.
 */
export const DEFAULT_FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'base-project',
    repoName: 'BaseProject',
    title: 'BaseProject - Arquitetura Limpa em Java',
    subtitle: 'Template de microsserviços escalável com Clean Arch & Kafka',
    description:
      'Template robusto para microsserviços e aplicações empresariais em Java. Implementa Clean Architecture (independência de frameworks), mensageria com Apache Kafka para eventos assíncronos, conteinerização com Docker, migrações de banco com Flyway e pirâmide completa de testes automatizados.',
    technologies: [
      'Java 21',
      'Spring Boot 3',
      'Clean Architecture',
      'Apache Kafka',
      'Docker',
      'Flyway',
      'JUnit 5 & Mockito',
      'PostgreSQL',
    ],
    githubUrl: 'https://github.com/Talibert/BaseProject',
    accentColor: '#f89820',
    category: 'Backend',
    previewTheme: 'backend-architecture',
    architectureDiagram: {
      topLayer: {
        icon: '☕',
        name: 'Domain & Use Cases',
        tag: 'Clean Arch',
      },
      flow: {
        leftPill: 'Kafka Events',
        rightPill: 'Flyway / Postgres',
        arrow: '⇄',
      },
      bottomLayer: {
        icon: '🐳',
        name: 'Docker & Spring Boot 3',
        tag: 'Infra & Cloud',
      },
    },
  },
  {
    id: 'base-front',
    repoName: 'BaseFront',
    title: 'BaseFront - Template de Frontend Moderno',
    subtitle: 'Arquitetura SPA escalável com Vue 3, Vite & TypeScript',
    description:
      'Estrutura moderna de frontend desenvolvida como modelo de referência para projetos de alta performance. Adota Composition API com TypeScript estrito, gerenciamento de estado persistente com Pinia, roteamento com guards nativos e suíte abrangente de testes unitários (Vitest) e ponta a ponta (Playwright).',
    technologies: [
      'Vue.js 3',
      'TypeScript',
      'Vite',
      'Pinia',
      'Playwright',
      'Vitest',
      'Axios',
      'CSS Moderno',
    ],
    githubUrl: 'https://github.com/Talibert/BaseFront',
    accentColor: '#42b883',
    category: 'Frontend',
    previewTheme: 'frontend-spa',
    architectureDiagram: {
      topLayer: {
        icon: '⚡',
        name: 'Vue 3 & Composition API',
        tag: 'UI & Views',
      },
      flow: {
        leftPill: 'Pinia (State)',
        rightPill: 'Vue Router & Axios',
        arrow: '⇄',
      },
      bottomLayer: {
        icon: '🧪',
        name: 'Vitest & Playwright E2E',
        tag: 'Testes & CI',
      },
    },
  },
  {
    id: 'rune-store',
    repoName: 'RuneStore',
    title: 'RuneStore - Catálogo & E-commerce de Jogos',
    subtitle: 'Sistema de vendas e gerenciamento de transações digitais',
    description:
      'Plataforma completa para controle de inventário, autenticação segura e fluxo de compras de itens virtuais. Desenvolvida com boas práticas de isolamento de domínio, persistência relacional com JPA/Hibernate e validações transacionais consistentes.',
    technologies: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'Spring Data JPA',
      'Hibernate',
      'PostgreSQL / H2',
      'REST APIs',
    ],
    githubUrl: 'https://github.com/Talibert/RuneStore',
    accentColor: '#38bdf8',
    category: 'Fullstack',
    previewTheme: 'ecommerce-platform',
    architectureDiagram: {
      topLayer: {
        icon: '🎮',
        name: 'Catálogo & Inventário',
        tag: 'REST API',
      },
      flow: {
        leftPill: 'Spring Security (Auth)',
        rightPill: 'Transações & Pedidos',
        arrow: '⇄',
      },
      bottomLayer: {
        icon: '🗄️',
        name: 'Spring Data JPA & Hibernate',
        tag: 'PostgreSQL',
      },
    },
  },
]

/**
 * ============================================================================
 * CATÁLOGO COMPLETO DE PROJETOS (FALLBACK & SEED DATA)
 * ============================================================================
 * Todos os 24 repositórios públicos reais de Guilherme Taliberti.
 * Serve como fonte primária dos projetos locais e plano de contingência caso a
 * API do GitHub atinja o rate limit anônimo (HTTP 403) ou o usuário esteja offline.
 */
export const DEFAULT_ALL_PROJECTS: ProjectItem[] = [
  ...DEFAULT_FEATURED_PROJECTS,
  {
    id: 'course-plataform',
    repoName: 'CoursePlataform',
    title: 'CoursePlataform - Gestão de Cursos',
    subtitle: 'Plataforma educacional com Clean Arch & APIs REST',
    description:
      'Plataforma para gestão e disponibilização de cursos com arquitetura desacoplada. Backend robusto em Java com Spring Boot, autenticação e regras de negócio isoladas.',
    technologies: ['Java', 'Spring Boot', 'Clean Architecture', 'PostgreSQL', 'Docker', 'REST API'],
    githubUrl: 'https://github.com/Talibert/CoursePlataform',
    accentColor: '#818cf8',
    category: 'Backend',
    previewTheme: 'backend-architecture',
    architectureDiagram: {
      topLayer: {
        icon: '📚',
        name: 'Domain & Use Cases',
        tag: 'Clean Arch',
      },
      flow: {
        leftPill: 'REST Controllers',
        rightPill: 'Repositories & DB',
        arrow: '⇄',
      },
      bottomLayer: {
        icon: '🗄️',
        name: 'Spring Data & PostgreSQL',
        tag: 'Persistência',
      },
    },
  },
  {
    id: 'api-clean-arch',
    repoName: 'apiCleanArch',
    title: 'apiCleanArch - Padrões de Arquitetura Limpa',
    subtitle: 'Implementação de referência dos princípios de Clean Architecture',
    description:
      'API desenvolvida para explorar e consolidar os princípios de Clean Architecture propostos por Robert C. Martin. Isolamento absoluto das regras de domínio em relação a frameworks externos.',
    technologies: ['Java', 'Spring Boot', 'Clean Architecture', 'SOLID', 'JUnit 5'],
    githubUrl: 'https://github.com/Talibert/apiCleanArch',
    accentColor: '#34d399',
    category: 'Backend',
    previewTheme: 'backend-architecture',
    architectureDiagram: {
      topLayer: {
        icon: '🏛️',
        name: 'Core Domain Entities',
        tag: 'Independência',
      },
      flow: {
        leftPill: 'Input Boundaries',
        rightPill: 'Output Gateways',
        arrow: '⇄',
      },
      bottomLayer: {
        icon: '⚙️',
        name: 'Frameworks & Drivers',
        tag: 'Infraestrutura',
      },
    },
  },
  {
    id: 'employee-avaliation',
    repoName: 'EmployeeAvaliation',
    title: 'EmployeeAvaliation - Avaliação de Desempenho',
    subtitle: 'Sistema para acompanhamento de metas e feedback de equipes',
    description:
      'Aplicação voltada para gestão de recursos humanos e ciclo contínuo de avaliação de performance corporativa. Cadastro de métricas, pontuações e relatórios analíticos.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'REST API', 'Docker'],
    githubUrl: 'https://github.com/Talibert/EmployeeAvaliation',
    accentColor: '#fbbf24',
    category: 'Fullstack',
    previewTheme: 'ecommerce-platform',
    architectureDiagram: {
      topLayer: {
        icon: '👥',
        name: 'Gestão de Colaboradores',
        tag: 'Regras de RH',
      },
      flow: {
        leftPill: 'API REST Endpoints',
        rightPill: 'Relatórios de Metas',
        arrow: '⇄',
      },
      bottomLayer: {
        icon: '📊',
        name: 'Banco Relacional (Postgres)',
        tag: 'Dados',
      },
    },
  },
  {
    id: 'about-me',
    repoName: 'AboutMe',
    title: 'AboutMe - Portfólio & Perfil Profissional',
    subtitle: 'Primeira versão do portfólio pessoal construído com React',
    description:
      'Página de apresentação desenvolvida em ReactJS para exibição de trajetória profissional, habilidades técnicas, artigos e repositórios de estudo.',
    technologies: ['ReactJS', 'JavaScript', 'CSS Modules', 'Git'],
    githubUrl: 'https://github.com/Talibert/AboutMe',
    accentColor: '#38bdf8',
    category: 'Frontend',
    previewTheme: 'frontend-spa',
    architectureDiagram: {
      topLayer: {
        icon: '⚛️',
        name: 'React Components',
        tag: 'UI & Layout',
      },
      flow: {
        leftPill: 'Hooks & States',
        rightPill: 'CSS Modules',
        arrow: '⇄',
      },
      bottomLayer: {
        icon: '🌐',
        name: 'Static Web Hosting',
        tag: 'Deploy',
      },
    },
  },
  {
    id: 'about-me-2',
    repoName: 'AboutMe2',
    title: 'AboutMe2 - Portfólio Profissional Moderno',
    subtitle: 'Aplicação SPA em Vue 3, TypeScript estrito, Pinia & Vitest',
    description:
      'Versão mais recente e avançada do portfólio de Guilherme Taliberti, com integração GitHub em tempo real, design responsivo com tema claro/escuro e suíte completa de testes.',
    technologies: ['Vue.js 3', 'TypeScript', 'Vite', 'Pinia', 'Vitest', 'Playwright'],
    githubUrl: 'https://github.com/Talibert/AboutMe2',
    accentColor: '#42b883',
    category: 'Frontend',
  },
  {
    id: 'course-project',
    repoName: 'CourseProject',
    title: 'CourseProject - Plataforma de Cursos Clean Arch',
    subtitle: 'Estruturação de domínio e serviços educacionais',
    description:
      'Plataforma para gerenciamento e matrícula de cursos com modelagem em Arquitetura Limpa e regras de negócio isoladas.',
    technologies: ['Java', 'Spring Boot', 'Clean Architecture', 'REST API'],
    githubUrl: 'https://github.com/Talibert/CourseProject',
    accentColor: '#a78bfa',
    category: 'Backend',
  },
  {
    id: 'receiver',
    repoName: 'Receiver',
    title: 'Receiver - Mensageria com RabbitMQ',
    subtitle: 'Consumo assíncrono de eventos e filas com Spring AMQP',
    description:
      'Projeto dedicado para consumir mensagens do broker RabbitMQ utilizando sistema de filas para comunicação distribuída.',
    technologies: ['Java', 'Spring Boot', 'RabbitMQ', 'Docker', 'AMQP'],
    githubUrl: 'https://github.com/Talibert/Receiver',
    accentColor: '#f97316',
    category: 'Backend',
  },
  {
    id: 'sender',
    repoName: 'Sender',
    title: 'Sender - Produtor de Eventos RabbitMQ',
    subtitle: 'Envio e despacho de mensagens para filas distribuídas',
    description:
      'Microsserviço responsável por publicar e despachar eventos para filas do RabbitMQ, garantindo entrega confiável de mensagens.',
    technologies: ['Java', 'Spring Boot', 'RabbitMQ', 'Docker', 'AMQP'],
    githubUrl: 'https://github.com/Talibert/Sender',
    accentColor: '#fb923c',
    category: 'Backend',
  },
  {
    id: 'rabbitmq-docker',
    repoName: 'RabbitMQDocker',
    title: 'RabbitMQDocker - Infraestrutura de Mensageria',
    subtitle: 'Cluster e container RabbitMQ com Docker Compose',
    description:
      'Ambiente conteinerizado para subir e gerenciar instâncias do RabbitMQ com painel de gerenciamento para testes locais de mensageria.',
    technologies: ['Docker', 'Docker Compose', 'RabbitMQ', 'DevOps'],
    githubUrl: 'https://github.com/Talibert/RabbitMQDocker',
    accentColor: '#f59e0b',
    category: 'Backend',
  },
  {
    id: 'api-duxus',
    repoName: 'APIDuxus',
    title: 'APIDuxus - API de Gestão de Equipes',
    subtitle: 'Backend desenvolvido para o desafio técnico da Duxus',
    description:
      'API desenvolvida para cadastro e alocação de profissionais em times, cálculo de integrantes mais frequentes e relatórios de composição.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'JPA/Hibernate', 'REST API'],
    githubUrl: 'https://github.com/Talibert/APIDuxus',
    accentColor: '#10b981',
    category: 'Backend',
  },
  {
    id: 'frontend-duxus',
    repoName: 'FrontEndDuxus',
    title: 'FrontEndDuxus - Interface de Composição de Times',
    subtitle: 'Interface web para o desafio da empresa Duxus',
    description:
      'Frontend desenvolvido para gerenciamento interativo de equipes e visualização das composições geradas pela API.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'REST API'],
    githubUrl: 'https://github.com/Talibert/FrontEndDuxus',
    accentColor: '#06b6d4',
    category: 'Frontend',
  },
  {
    id: 'nautik-project',
    repoName: 'NautikProject',
    title: 'NautikProject - API de Integração Comercial',
    subtitle: 'Serviços REST desenvolvidos para a empresa Nautik',
    description:
      'API com persistência de dados comerciais, regras de validação transacional e endpoints para integração corporativa.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'REST API', 'Docker'],
    githubUrl: 'https://github.com/Talibert/NautikProject',
    accentColor: '#3b82f6',
    category: 'Backend',
  },
  {
    id: 'portifolio-vue',
    repoName: 'portifolio-vue',
    title: 'portifolio-vue - Portfólio Inicial em Vue',
    subtitle: 'Primeiros passos na criação de SPA com ecossistema Vue',
    description:
      'Portfólio explorando conceitos de reatividade do VueJS, componentes reutilizáveis e estilização moderna.',
    technologies: ['Vue.js', 'JavaScript', 'CSS3', 'Vite'],
    githubUrl: 'https://github.com/Talibert/portifolio-vue',
    accentColor: '#42b883',
    category: 'Frontend',
  },
  {
    id: 'vuets-training',
    repoName: 'VueTS-Training',
    title: 'VueTS-Training - Laboratório de Vue & TypeScript',
    subtitle: 'Projetos e exercícios práticos de tipagem estrita no Vue',
    description:
      'Laboratório criado para consolidação de Composition API com script setup, tipagem forte de props, emits e gerenciamento de estado.',
    technologies: ['Vue.js 3', 'TypeScript', 'Vite'],
    githubUrl: 'https://github.com/Talibert/VueTS-Training',
    accentColor: '#3b82f6',
    category: 'Frontend',
  },
  {
    id: 'password-generator',
    repoName: 'password-generator',
    title: 'password-generator - Gerador Seguro de Senhas',
    subtitle: 'Utilitário web para geração de senhas criptograficamente seguras',
    description:
      'Interface interativa com opções de comprimento, caracteres especiais, maiúsculas, minúsculas e medição de força de segurança.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    githubUrl: 'https://github.com/Talibert/password-generator',
    accentColor: '#ec4899',
    category: 'Frontend',
  },
  {
    id: 'passwordgen',
    repoName: 'PasswordGen',
    title: 'PasswordGen - Gerador de Senhas em Java',
    subtitle: 'Implementação em Java para treino de lógica e segurança',
    description:
      'Simples gerador de senhas criado em Java para consolidar conceitos de orientação a objetos, segurança e organização modular de código.',
    technologies: ['Java', 'POO', 'Algoritmos'],
    githubUrl: 'https://github.com/Talibert/PasswordGen',
    accentColor: '#ef4444',
    category: 'Backend',
  },
  {
    id: 'api-nodejs',
    repoName: 'API-NodeJS',
    title: 'API-NodeJS - Serviços Backend em Node',
    subtitle: 'Construção de APIs assíncronas com Node.js e Express',
    description:
      'API desenvolvida para explorar o ecossistema backend em JavaScript, roteamento REST e manipulação assíncrona de requisições.',
    technologies: ['Node.js', 'Express', 'JavaScript', 'REST API'],
    githubUrl: 'https://github.com/Talibert/API-NodeJS',
    accentColor: '#22c55e',
    category: 'Backend',
  },
  {
    id: 'portifolio',
    repoName: 'Portifolio',
    title: 'Portifolio - Primeira Versão Web',
    subtitle: 'Portfólio com histórico de projetos e tecnologias',
    description:
      'Primeiro portfólio criado para expor projetos de estudos e trajetória inicial na carreira de tecnologia.',
    technologies: ['JavaScript', 'HTML5', 'CSS3'],
    githubUrl: 'https://github.com/Talibert/Portifolio',
    accentColor: '#eab308',
    category: 'Frontend',
  },
  {
    id: 'springcourse',
    repoName: 'springcourse',
    title: 'springcourse - Práticas e Laboratório Spring Boot',
    subtitle: 'Aprofundamento em JPA, Hibernate, DTOs e validações',
    description:
      'Repositório de exercícios práticos com Spring Boot, anotações de persistência relacional e tratamento padronizado de exceções.',
    technologies: ['Java', 'Spring Boot', 'JPA/Hibernate', 'H2/PostgreSQL'],
    githubUrl: 'https://github.com/Talibert/springcourse',
    accentColor: '#14b8a6',
    category: 'Backend',
  },
  {
    id: 'java-lessons',
    repoName: 'Java-Lessons',
    title: 'Java-Lessons - Estudos e Algoritmos em Java',
    subtitle: 'Exercícios práticos de lógica, POO e coleções',
    description:
      'Coleção de exercícios práticos explorando estruturas de dados, orientação a objetos e boas práticas em Java.',
    technologies: ['Java', 'POO', 'Estruturas de Dados'],
    githubUrl: 'https://github.com/Talibert/Java-Lessons',
    accentColor: '#ea580c',
    category: 'Backend',
  },
  {
    id: 'react-lessons',
    repoName: 'React-Lessons',
    title: 'React-Lessons - Laboratório de React',
    subtitle: 'Estudos e componentes desenvolvidos durante aulas de React',
    description:
      'Repositório contendo implementações práticas de hooks, componentes funcionais e renderização declarativa com React.',
    technologies: ['ReactJS', 'JavaScript', 'Hooks'],
    githubUrl: 'https://github.com/Talibert/React-Lessons',
    accentColor: '#0ea5e9',
    category: 'Frontend',
  },
]
