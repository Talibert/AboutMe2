import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

// Navigation Guard: Atualizar título da página dinamicamente
router.beforeEach((to, _from, next) => {
  const appTitle = import.meta.env.VITE_APP_TITLE || 'BaseFront'
  document.title = to.meta.title ? `${to.meta.title} | ${appTitle}` : appTitle
  next()
})

// Navigation Guard: Exemplo de verificação de autenticação
router.beforeEach((to, _from, next) => {
  const isAuthenticated = Boolean(localStorage.getItem('token'))

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  if (to.name === 'login' && isAuthenticated) {
    return next({ name: 'home' })
  }

  next()
})

export default router
