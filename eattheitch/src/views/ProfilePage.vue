<template>
  <div class="page-shell">
    <!-- Header -->
    <div class="page-header">
      <div class="header-top">
        <div class="brand">
          <div class="brand-name">eat the itch</div>
          <div class="brand-sub">Crafting Community</div>
        </div>
        <button class="logout-btn" @click="handleLogout">Sign Out</button>
      </div>

      <!-- Navigation -->
      <nav class="nav-links">
        <RouterLink to="/home" class="nav-button">Dashboard</RouterLink>
        <RouterLink to="/brands" class="nav-button">Brands</RouterLink>
        <RouterLink to="/community" class="nav-button">Community</RouterLink>
        <RouterLink to="/profile" class="nav-button">Profile</RouterLink>
      </nav>

      <!-- Filters -->
      <div class="filters">
        <label><input type="checkbox" checked /><span>all</span></label>
        <label><input type="checkbox" /><span>Trade</span></label>
        <label><input type="checkbox" /><span>Pattern</span></label>
        <label><input type="checkbox" /><span>Events</span></label>
      </div>
    </div>

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
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import MeCard from '@/components/auth/MeCard.vue'

const auth = useAuthStore()
const router = useRouter()
const user = computed(() => auth.user)

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

async function handleLogout() {
  await auth.logout()
  router.replace('/')
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
