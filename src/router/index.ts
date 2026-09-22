import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useAuthStore } from '@/stores/auth'

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
router.beforeEach((to) => {
  const appTitle = import.meta.env.VITE_APP_TITLE || 'Taliberti'
  document.title = to.meta.title ? `${to.meta.title} | ${appTitle}` : appTitle
})

// Navigation Guard: Verificação de autenticação com a Store Pinia
router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.name === 'login' && authStore.isAuthenticated) {
    return { name: 'home' }
  }
})

export default router
