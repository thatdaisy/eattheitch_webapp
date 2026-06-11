<template>
  <div class="page">
    <LeftPanel />

    <main class="panel-right">
      <transition name="fade" mode="out-in">
        <!-- AUTH STATE -->
        <div v-if="!user" :key="'auth'" class="form-card">
          <div class="mobile-brand">
            <div class="brand-name">eat the itch</div>
            <div class="brand-sub">conscious crafting</div>
          </div>

          <div class="tabs">
            <button
              class="tab-btn"
              :class="{ active: view === 'login' }"
              @click="auth.switchView('login')"
            >
              Sign in
            </button>

            <button
              class="tab-btn"
              :class="{ active: view === 'register' }"
              @click="auth.switchView('register')"
            >
              Create account
            </button>
          </div>

          <LoginForm
            v-if="view === 'login'"
            :loading="loading"
            :error="error"
            :successMsg="successMsg"
            :fieldErrors="fieldErrors"
            :form="loginForm"
            @submit="auth.login"
            @switch="switchView"
          />

          <RegisterForm
            v-else
            :loading="loading"
            :error="error"
            :fieldErrors="fieldErrors"
            :form="registerForm"
            @submit="auth.register"
            @switch="switchView"
          />
        </div>

        <!-- AUTHENTICATED -->
        <MeCard
          v-else
          :user="user"
          :loading="loading"
          :formatDate="auth.formatDate"
          @logout="auth.logout"
        />
      </transition>
    </main>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

import LeftPanel from '@/components/LeftPanel.vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import MeCard from '@/components/MeCard.vue'

const auth = useAuthStore()

const { user, view, loading, error, successMsg, fieldErrors, loginForm, registerForm } =
  storeToRefs(auth)
</script>
