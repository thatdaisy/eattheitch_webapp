import { defineStore } from 'pinia'
import { apiFetch } from '@/utils/api'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    initialized: false,
    loading: false,

    user: null,

    error: '',
    successMsg: '',

    view: 'login',

    fieldErrors: {},

    loginForm: {
      email: '',
      password: '',
    },

    registerForm: {
      username: '',
      email: '',
      password: '',
    },
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    clearErrors() {
      this.error = ''
      this.successMsg = ''
      this.fieldErrors = {}
    },

    switchView(view) {
      this.clearErrors()
      this.view = view
    },

    formatDate(iso) {
      if (!iso) return '—'

      return new Date(iso).toLocaleDateString('en-AT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },

    async initialize() {
      if (this.initialized) return
      await this.fetchCurrentUser()
      this.initialized = true
    },

    async fetchCurrentUser() {
      this.loading = true

      try {
        const { ok, data } = await apiFetch('/auth/current')

        this.user = ok ? data.user : null
      } catch {
        this.user = null
      } finally {
        this.loading = false
      }
    },

    async login() {
      this.clearErrors()
      this.loading = true

      try {
        const { ok, status, data } = await apiFetch('/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: this.loginForm.email,
            password: this.loginForm.password,
          }),
        })

        if (ok) {
          await this.fetchCurrentUser()
          this.loginForm.email = ''
          this.loginForm.password = ''
          await router.push({ name: 'home' })
        } else {
          this.handleApiError(data, status)
        }
      } catch {
        this.error = 'Could not reach the server.'
      } finally {
        this.loading = false
      }
    },

    async register() {
      this.clearErrors()
      this.loading = true

      try {
        const { ok, status, data } = await apiFetch('/auth/register', {
          method: 'POST',
          body: JSON.stringify(this.registerForm),
        })

        if (ok) {
          await this.fetchCurrentUser()
          this.registerForm.username = ''
          this.registerForm.email = ''
          this.registerForm.password = ''
          await router.push({ name: 'home' })
        } else {
          this.handleApiError(data, status)
        }
      } catch {
        this.error = 'Could not reach the server.'
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true

      try {
        await apiFetch('/auth/logout', {
          method: 'POST',
        })
      } finally {
        this.user = null
        this.loading = false
        this.view = 'login'
        this.successMsg = "You've been signed out."
        router.push({
          name: 'auth',
        })
      }
    },

    handleApiError(data, status) {
      if (status === 422 && data?.fields) {
        this.fieldErrors = data.fields
        this.error = 'Please fix the errors below.'
      } else {
        this.error = data?.message || data?.error || 'Something went wrong.'
      }
    },
  },
})
