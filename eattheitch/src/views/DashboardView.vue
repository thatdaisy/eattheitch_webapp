<template>
  <div v-if="auth.isAuthenticated" class="dashboard">
    <DashboardHeader />
  </div>
</template>

<script setup>
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue';
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>