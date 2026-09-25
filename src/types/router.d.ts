import 'vue-router'

/**
 * Metadados de rota do projeto:
 * - title: título exibido na aba do navegador
 */
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}
