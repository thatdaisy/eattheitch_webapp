import { createRouter, createWebHistory } from 'vue-router'

import AuthView from '@/views/AuthPage.vue'
import HomeView from '@/views/HomePage.vue'
import BrandsView from '@/views/BrandsPage.vue'
import TradingView from '@/views/TradingPage.vue'
import ProfileView from '@/views/ProfilePage.vue'

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
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/brands',
      name: 'brands',
      component: BrandsView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/trading',
      name: 'trading',
      component: TradingView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (to.name === 'auth') {
    return
  }

  if (!auth.initialized) {
    await auth.initialize()
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'auth' }
  }

  if (to.name === 'auth' && auth.isAuthenticated) {
    return { name: 'home' }
  }
})

export default router
