<template>
  <div class="page-shell">
    <AppHeader
      :user="user"
      @logout="auth.logout"
    />

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
        <CountrySelect
          v-model="profileForm.country"
        />

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

const profileForm = reactive({
  country: ''
})

const auth = useAuthStore()
const user = auth.user

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-AT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
.activity-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  padding: 0.5rem 0;
  border-top: 1px solid var(--light-gray);
}

.activity-label { color: var(--mid-gray); font-weight: 500 }
.activity-value { color: var(--charcoal) }
</style>
