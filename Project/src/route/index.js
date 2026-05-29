import { createRouter, createWebHistory } from 'vue-router'
import CommunityView from '@/views/CommunityView.vue'
import BrandsView from '@/views/BrandsView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/community' },
    { path: '/community', component: CommunityView },
    { path: '/brands', component: BrandsView },
    { path: '/profile', component: ProfileView }
  ]
})

export default router
