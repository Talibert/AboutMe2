# ⚡ BaseFront — Template Base Vue 3 + TypeScript

Um template inicial (starter kit) moderno, modular e pronto para produção, construído com **Vue 3**, **Vite**, **TypeScript**, **Vue Router 4**, **Pinia** e **Axios**.

Projetado para servir como alicerce arquitetural para qualquer nova aplicação SPA (*Single Page Application*), evitando a necessidade de reconfigurar roteamento, gerenciamento de estado, autenticação e clientes HTTP do zero a cada novo projeto.

---

## 🚀 Tecnologias e Ferramentas

* **[Vue 3](https://vuejs.org/)** (v3.5+) — Framework reativo utilizando Composition API com a sintaxe `<script setup>`.
* **[Vite](https://vite.dev/)** — Ferramenta de build de ultra performance e Hot Module Replacement (HMR) instantâneo.
* **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estrita em toda a base de código com checagem incremental via `vue-tsc`.
* **[Vue Router 4](https://router.vuejs.org/)** — Roteamento com suporte a code-splitting (lazy-loading), metadados tipados e guardas de navegação.
* **[Pinia](https://pinia.vuejs.org/)** — Gerenciador de estado global oficial do Vue 3, estruturado no padrão moderno de *Setup Stores*.
* **[pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)** — Sincronização e persistência seletiva de estado no `localStorage`.
* **[Axios](https://axios-http.com/)** — Cliente HTTP centralizado com interceptors de token e tratamento unificado de erros.

---

## 📁 Arquitetura de Pastas

A estrutura dentro de `src/` segue princípios de responsabilidade única e escalabilidade:

```text
src/
├── api/                  # Camada de rede e comunicação HTTP
│   ├── client.ts         # Instância centralizada do Axios com interceptors (backend próprio)
│   ├── authService.ts    # Serviços de autenticação (login, logout, perfil)
│   └── githubService.ts  # Exemplo de consumo de API externa (Axios limpo sem interceptors)
├── assets/               # Recursos estáticos globais e estilos
│   ├── base.css          # Reset de CSS e variáveis de cores (temas claro/escuro)
│   ├── main.css          # Estilos globais e regras de transição de tela
│   └── logo.svg          # Logotipo vetorial da aplicação
├── components/           # Componentes reutilizáveis
│   ├── common/           # Elementos da interface (GitHubProfileCard, botões, modais)
│   └── feedback/         # Alertas, spinners, modais de diálogo e toasts
├── composables/          # Funções de lógica reutilizável (Composition API)
├── layouts/              # Cascas visuais intercambiáveis
│   ├── DefaultLayout.vue # Layout padrão (com navbar responsiva, container e footer)
│   ├── AuthLayout.vue    # Layout centralizado para login, cadastro e recuperação
│   └── BlankLayout.vue   # Layout limpo sem casca (páginas 404, landing pages)
├── router/               # Configuração e guardas do Vue Router
│   ├── index.ts          # Instância do router, scrollBehavior e navigation guards
│   └── routes.ts         # Mapeamento e declaração de todas as rotas
├── stores/               # Gerenciamento de estado global com Pinia
│   ├── index.ts          # Inicialização e registro de plugins do Pinia
│   ├── auth.ts           # Store de autenticação, usuário ativo e tokens
│   └── theme.ts          # Store de tema (claro, escuro ou sistema)
├── types/                # Definições de interfaces e modelos TypeScript
│   ├── api.ts            # Tipagens de respostas e erros HTTP genéricos
│   ├── auth.ts           # Interfaces de User, LoginCredentials e AuthResponse
│   ├── github.ts         # Modelo da resposta da API pública do GitHub
│   └── router.d.ts       # Extensão de tipos dos metadados de rotas (RouteMeta)
├── utils/                # Funções utilitárias puras (formatadores, máscaras, datas)
├── views/                # Páginas/Telas associadas às rotas
│   ├── HomeView.vue      # Página inicial com vitrine de recursos e testes
│   ├── AboutView.vue     # Página informativa sobre a stack
│   ├── LoginView.vue     # Tela de login com formulário e redirecionamento
│   ├── ProfileView.vue   # Tela protegida com dados do usuário autenticado
│   └── NotFoundView.vue  # Tela 404 para rotas inexistentes
├── App.vue               # Componente raiz com resolução dinâmica de layouts
├── env.d.ts              # Tipagem estrita de variáveis de ambiente Vite
└── main.ts               # Ponto de entrada da aplicação (bootstrap)
```

---

## ⚙️ Principais Funcionalidades

### 1. Sistema Dinâmico de Layouts
Permite que cada tela utilize uma estrutura visual própria (ex: tela de Login sem navbar vs Dashboard completo com sidebar e navbar):

1. A rota declara qual layout deseja utilizar através do campo `meta.layout` em [`src/router/routes.ts`](file:///Users/taliberti/Development/Personal/basefront/src/router/routes.ts):
   ```typescript
   {
     path: '/login',
     component: () => import('@/views/LoginView.vue'),
     meta: { layout: 'auth' }
   }
   ```
2. O arquivo [`src/App.vue`](file:///Users/taliberti/Development/Personal/basefront/src/App.vue) mapeia o nome informado para o componente correspondente (`default`, `auth` ou `blank`).
3. Se a rota não especificar nenhum layout, o fallback automático é o `DefaultLayout`.
4. Transições suaves em animação fade (`mode="out-in"`) são aplicadas entre as trocas de página.

### 2. Navegação Segura e Guardas de Rota (*Navigation Guards*)
Em [`src/router/index.ts`](file:///Users/taliberti/Development/Personal/basefront/src/router/index.ts):
* **Título Dinâmico da Aba**: O título do documento (`document.title`) é atualizado automaticamente baseado no `to.meta.title`.
* **Rotas Protegidas (`requiresAuth: true`)**: Usuários não autenticados são barrados e redirecionados para `/login?redirect=<url_original>`.
* **Redirecionamento Pós-Login**: Ao entrar no sistema, o usuário é direcionado de volta para a rota que tentou acessar originalmente.
* **Bloqueio de Login Redundante**: Usuários já logados que tentarem acessar a rota `/login` são redirecionados de volta para a Home.
* **Scroll Inteligente**: Toda navegação retorna ao topo (`top: 0`), preservando a posição anterior ao clicar no botão "Voltar" do navegador.

### 3. Gerenciamento de Estado Global (Pinia)
Construído com o padrão **Setup Store** (Composition API):

* **`useAuthStore`** ([`src/stores/auth.ts`](file:///Users/taliberti/Development/Personal/basefront/src/stores/auth.ts)):
  * Gerencia o estado de `user`, `token` e `isLoading`.
  * Fornece o getter computado `isAuthenticated`.
  * **Persistência Seletiva**: Utiliza `pinia-plugin-persistedstate` gravando apenas `user` e `token` no `localStorage` via opção `pick: ['user', 'token']`, mantendo estados efêmeros apenas em memória.
* **`useThemeStore`** ([`src/stores/theme.ts`](file:///Users/taliberti/Development/Personal/basefront/src/stores/theme.ts)):
  * Permite alternar entre os temas `light`, `dark` e `system`.
  * Injeta a classe `.dark` e o atributo `data-theme="dark"` no elemento raiz `<html>`.
  * Ouve automaticamente preferências do sistema operacional caso esteja em modo `system`.

### 4. Camada HTTP Profissional (Axios)
Configurada em [`src/api/client.ts`](file:///Users/taliberti/Development/Personal/basefront/src/api/client.ts) e desacoplada em serviços:

* **Request Interceptor**: Anexa automaticamente o cabeçalho `Authorization: Bearer <token>` lendo o token ativo na store do Pinia.
* **Response Interceptor**: Intercepta erros `401 Unauthorized` globalmente, executando logout automático e redirecionamento para o login caso a sessão expire no servidor.
* **Modo Mock / Backend Real**: O serviço [`src/api/authService.ts`](file:///Users/taliberti/Development/Personal/basefront/src/api/authService.ts) possui uma chave seletora via variável de ambiente. Em desenvolvimento sem backend, ele simula a autenticação com delay de rede. Quando conectado a um backend real, executa requisições HTTP normais sem exigir alterações nas telas ou stores.

---

## 🔐 Variáveis de Ambiente

As variáveis de ambiente são tipadas em [`env.d.ts`](file:///Users/taliberti/Development/Personal/basefront/env.d.ts) para fornecer autocompletion seguro no TypeScript.

Consulte o arquivo [`.env.example`](file:///Users/taliberti/Development/Personal/basefront/.env.example):

| Variável | Tipo | Descrição | Exemplo Padrão |
| :--- | :--- | :--- | :--- |
| `VITE_APP_TITLE` | `string` | Nome exibido na aba do navegador | `"BaseFront Template"` |
| `VITE_API_BASE_URL` | `string` | Endereço base da API backend | `"https://api.exemplo.com/v1"` |
| `VITE_USE_MOCK_API` | `string` | Ativa simulação local (`"true"`) ou chamadas reais (`"false"`) | `"true"` |

> **Nota de Segurança:** O arquivo `.env` está registrado no `.gitignore` para impedir que credenciais e chaves secretas sejam enviadas ao repositório Git.

---

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
* **Node.js**: Versão `^22.18.0` ou `>=24.12.0`
* **Gerenciador de Pacotes**: `npm` (ou `pnpm` / `yarn`)

### Instalação

1. Clone o repositório ou use este projeto como base:
   ```bash
   git clone <url-do-repositorio> meu-novo-projeto
   cd meu-novo-projeto
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie o arquivo de configuração local a partir do exemplo:
   ```bash
   cp .env.example .env
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador em: `http://localhost:5173`

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento com Hot Module Replacement (HMR) |
| `npm run build` | Executa a checagem de tipos (`vue-tsc`) e gera o bundle de produção na pasta `dist/` |
| `npm run preview` | Inicia um servidor local para testar o resultado do build de produção |
| `npm run type-check` | Executa apenas a verificação estrita de tipos do TypeScript sem gerar arquivos |

---

## 📖 Guia Prático: Como Adicionar Novas Funcionalidades

### 1. Como Criar uma Nova Página e Rota

1. Crie o arquivo da tela em `src/views/` (ex: `src/views/DashboardView.vue`):
   ```vue
   <script setup lang="ts">
   // Lógica do componente
   </script>

   <template>
     <div class="dashboard-view">
       <h1>Meu Painel</h1>
     </div>
   </template>
   ```

2. Registre a rota em [`src/router/routes.ts`](file:///Users/taliberti/Development/Personal/basefront/src/router/routes.ts):
   ```typescript
   {
     path: '/dashboard',
     name: 'dashboard',
     component: () => import('@/views/DashboardView.vue'),
     meta: {
       title: 'Painel',
       layout: 'default',   // Escolha entre: 'default', 'auth' ou 'blank'
       requiresAuth: true,  // Defina como true para proteger a rota
     },
   }
   ```

---

### 2. Como Criar uma Nova Store (Pinia)

Crie um arquivo em `src/stores/` (ex: `src/stores/cart.ts`):

```typescript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore(
  'cart',
  () => {
    // State
    const items = ref<string[]>([])

    // Getter
    const totalItems = computed(() => items.value.length)

    // Action
    function addItem(item: string) {
      items.value.push(item)
    }

    return { items, totalItems, addItem }
  },
  {
    persist: true, // Salva automaticamente no localStorage
  }
)
```

---

### 3. Como Criar um Novo Serviço de API

Crie um arquivo em `src/api/` (ex: `src/api/productService.ts`):

```typescript
import apiClient from './client'

export interface Product {
  id: number
  title: string
  price: number
}

export const productService = {
  async getAll(): Promise<Product[]> {
    const response = await apiClient.get<Product[]>('/products')
    return response.data
  },

  async getById(id: number): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${id}`)
    return response.data
  },

  async create(data: Omit<Product, 'id'>): Promise<Product> {
    const response = await apiClient.post<Product>('/products', data)
    return response.data
  },
}

export default productService
```

---

### 4. Como Conectar ao seu Backend Real

Quando o seu servidor backend estiver pronto:
1. Abra o arquivo [`.env`](file:///Users/taliberti/Development/Personal/basefront/.env);
2. Altere a URL da API para o endereço do seu servidor:
   ```env
   VITE_API_BASE_URL="http://localhost:3000/api"
   ```
3. Mude a flag de simulação para `false`:
   ```env
   VITE_USE_MOCK_API="false"
   ```

A partir desse momento, todas as chamadas de login e requisições passarão a se comunicar com seu servidor real através da internet, injetando cabeçalhos de autenticação e tratando respostas 401 automaticamente.

---

## 📄 Licença

Este projeto foi feito pelo Taliberti e é disponibilizado como template livre para uso pessoal e comercial sob a licença [MIT](https://opensource.org/licenses/MIT).
