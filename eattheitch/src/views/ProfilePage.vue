<template>
  <div class="page-shell">
    <AppHeader :user="user" @logout="auth.logout" />

    <!-- Profile Content -->
    <div class="page-content single-column">
      <div class="content-section" v-if="user">
        <div class="section-header">
          <h2>My Profile</h2>
        </div>
        <MeCard
          :user="user"
          :loading="auth.loading"
          :formatDate="formatDate"
          @logout="handleLogout"
        />
        <CountrySelect v-model="profileForm.country" />
      </div>

      <div class="content-section">
        <div class="section-header">
          <h2>Activity</h2>
        </div>
        <div class="activity-row">
          <span class="activity-label">Last login</span>
          <span class="activity-value">{{ formatDate(user?.last_login) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import MeCard from '@/components/auth/MeCard.vue'
import AppHeader from '@/components/common/AppHeader.vue'
import { reactive } from 'vue'
import CountrySelect from '@/components/common/CountrySelect.vue'
import { formatDate } from '@/utils/formatter'

const profileForm = reactive({
  country: '',
})

const auth = useAuthStore()
const user = auth.user
</script>

<style scoped></style>
