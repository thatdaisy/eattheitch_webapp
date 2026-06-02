import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/services/api'

export const useUserStore = defineStore('user', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const token = ref(localStorage.getItem('token') || null)

  const isLoggedIn = computed(() => !!token.value)

  async function login(email, password) {
    const { data } = await apiClient.post('/auth/login', { email, password })
    _persist(data)
  }

  async function register(email, password, username) {
    const { data } = await apiClient.post('/auth/register', { email, password, username })
    _persist(data)
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  function _persist(data) {
    token.value = data.token
    user.value = data.user
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  return { user, token, isLoggedIn, login, register, logout }
})
