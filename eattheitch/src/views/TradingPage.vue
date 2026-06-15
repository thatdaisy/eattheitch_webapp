<template>
  <div class="page-shell">
    <AppHeader :user="user" @logout="auth.logout" />

    <div class="page-content single-column">
      <div class="content-section">
        <div class="section-header">
          <h2>Trades</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/common/AppHeader.vue'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const user = auth.user
</script>
