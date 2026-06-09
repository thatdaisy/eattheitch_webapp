import { ref, reactive } from 'vue'
import { apiFetch } from '../utils/api'

const API_BASE = 'http://localhost:8080'

export function useAuth() {
  const view = ref('login')
  const loading = ref(false)
  const error = ref('')
  const successMsg = ref('')
  const fieldErrors = reactive({})
  const user = ref(null)

  const loginForm = reactive({ email: '', password: '' })
  const registerForm = reactive({ username: '', email: '', password: '' })

  function clearErrors() {
    error.value = ''
    successMsg.value = ''
    Object.keys(fieldErrors).forEach((k) => delete fieldErrors[k])
  }

  function switchView(v) {
    clearErrors()
    view.value = v
  }

  function formatDate(iso) {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('en-AT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  async function login() {
    clearErrors()
    loading.value = true

    const { ok, data, status } = await apiFetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(loginForm),
      credentials: 'include',
    })

    if (ok) user.value = data.user
    else error.value = data?.message || 'Login failed'

    loading.value = false
  }

  async function register() {
    clearErrors()
    loading.value = true

    const { ok, data } = await apiFetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(registerForm),
      credentials: 'include',
    })

    if (ok) user.value = data.user
    else error.value = data?.message || 'Register failed'

    loading.value = false
  }

  async function logout() {
    await apiFetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })

    user.value = null
    view.value = 'login'
    successMsg.value = "You've been signed out."
  }

  return {
    view,
    loading,
    error,
    successMsg,
    fieldErrors,
    user,
    loginForm,
    registerForm,
    switchView,
    login,
    register,
    logout,
    formatDate,
  }
}
