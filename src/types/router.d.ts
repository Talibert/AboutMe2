import 'vue-router'

/**
 * Cada rota do projeto tem:
 * Um titulo
 * O boolean se precisa ou não de autenticação
 * Um layout
 */
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requiresAuth?: boolean
    layout?: 'default' | 'auth' | 'blank'
  }
}
