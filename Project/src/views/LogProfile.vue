<template>
  <section class="login-page">
    <div class="login-card">
      <h1>Log In</h1>
      <form @submit.prevent="onSubmit" class="login-form">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          v-model="email"
          required
          placeholder="you@example.com"
        />

        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          v-model="password"
          required
          minlength="6"
          placeholder="Enter password"
        />

        <button type="submit">Log In</button>
      </form>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const onSubmit = () => {
  errorMessage.value = ''

  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter your email and password.'
    return
  }

  // Add actual login logic here
  console.log('Login attempt', { email: email.value, password: password.value })
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1.5rem;
  background: rgba(235, 235, 235, 0.64);
}

.login-card {
  width: min(100%, 420px);
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 18px 40px rgba(46, 68, 101, 0.12);
  padding: 2rem;
}

.login-card h1 {
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  text-align: center;
  color: #27334a;
}

.login-form {
  display: grid;
  gap: 1rem;
}

.login-form label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #3a4b6a;
}

.login-form input {
  width: 100%;
  padding: 0.95rem 1rem;
  border: 1px solid #d1d9e6;
  border-radius: 12px;
  background: #f8fbff;
  color: #1b2438;
}

.login-form input:focus {
  outline: none;
  border-color:  #f2f2f2;
  box-shadow: 0 0 0 3px rgba(107, 135, 255, 0.12);
}

.login-form button {
  padding: 0.95rem 1rem;
  border: none;
  border-radius: 12px;
  background: #1a2e18;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

.login-form button:hover {
  background: #4a6530;
}

.error {
  margin-top: 1rem;
  color: #d24f4f;
  text-align: center;
}
</style>
