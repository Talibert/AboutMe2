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
router.beforeEach((to) => {
  const appTitle = import.meta.env.VITE_APP_TITLE || 'Taliberti'
  document.title = to.meta.title ? `${to.meta.title} | ${appTitle}` : appTitle
})

export default router
