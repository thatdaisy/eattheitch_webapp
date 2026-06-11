import { createRouter, createWebHistory } from 'vue-router'

import AuthView from '@/views/AuthPage.vue'
import DashboardView from '@/views/DashboardView.vue'

import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  // ensure session is checked once
  if (!auth.initialized) {
    await auth.initialize()
  }

  const isAuth = auth.isAuthenticated

  // protect dashboard
  if (to.meta.requiresAuth && !isAuth) {
    return { name: 'auth' }
  }

  // prevent login page if already logged in
  if (to.name === 'auth' && isAuth) {
    return { name: 'dashboard' }
  }
})

export default router
