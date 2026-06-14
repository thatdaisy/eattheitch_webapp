import { createRouter, createWebHistory } from 'vue-router'

import AuthView from '@/views/AuthPage.vue'
import HomeView from '@/views/HomePage.vue'
import BrandsView from '@/views/BrandsPage.vue'
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
    return { name: 'home' }
  }
})

export default router
