<template>
  <div>
    <p class="form-title">Join the community.</p>
    <p class="form-desc">Create your account and start sharing your yarn experiences.</p>

    <div v-if="error" class="error-banner">{{ error }}</div>

    <form @submit.prevent="$emit('submit')">
      <div class="field">
        <label>Username</label>
        <input v-model="form.username" type="text" />
      </div>

      <div class="field">
        <label>Email</label>
        <input v-model="form.email" type="email" />
      </div>

      <div class="field">
        <label>Password</label>
        <input v-model="form.password" type="password" />
      </div>

      <button class="btn-primary" :disabled="loading">
        {{ loading ? 'Creating account…' : 'Create account' }}
      </button>
    </form>

    <div class="divider">or</div>

    <button class="btn-secondary" @click="$emit('switch', 'login')">
      Sign in to existing account
    </button>
  </div>
</template>

<script setup>
defineProps({
  form: Object,
  loading: Boolean,
  error: String,
  fieldErrors: Object,
})

defineEmits(['submit', 'switch'])
</script>
