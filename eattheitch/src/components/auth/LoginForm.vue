<template>
    <div key="login">
      <p class="form-title">Welcome back.</p>
      <p class="form-desc">Sign in to access your reviews and the craftivism hub.</p>

      <div v-if="error" class="error-banner">{{ error }}</div>
      <div v-if="successMsg" class="success-flash">{{ successMsg }}</div>

      <form @submit.prevent="$emit('submit')">
        <div class="field">
          <label>Email</label>
          <!-- eslint-disable-next-line vue/no-mutating-props -->
          <input v-model="form.email" type="email" />
          <div v-if="fieldErrors.email" class="field-error">{{ fieldErrors.email }}</div>
        </div>

        <div class="field">
          <label>Password</label>
          <!-- eslint-disable-next-line vue/no-mutating-props -->
          <input v-model="form.password" type="password" />
          <div v-if="fieldErrors.password" class="field-error">{{ fieldErrors.password }}</div>
        </div>

        <button class="btn-primary" :disabled="loading">
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>

      <div class="divider">or</div>

      <button class="btn-secondary" @click="$emit('switch', 'register')">
        Create a new account
      </button>
    </div>
</template>

<script setup>
defineProps({
  form: Object,
  loading: Boolean,
  error: String,
  successMsg: String,
  fieldErrors: Object,
})

defineEmits(['submit', 'switch'])
</script>
