<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="profile-page">
    <div class="content">
      <RouterLink class="back-link" to="/community">← back</RouterLink>
      <h2 class="section-title">Profile</h2>
      <div class="placeholder">
        <p>Sign in with your Ravelry account to manage your profile.</p>
        <div class="btn-wrapper">
          <button
          class="nav-btn"
          @click="router.push('/login')"
          >Log In</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  flex: 1;
}

.content {
  padding: 12px 16px 24px;
}

.back-link {
  display: inline-block;
  color: var(--clr-orange);
  font-size: 14px;
  text-decoration: none;
  margin-bottom: 16px;
}

.back-link:hover {
  text-decoration: underline;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 14px;
}

.placeholder {
  background: var(--clr-card-events);
  border-radius: 10px;
  padding: 20px;
  font-size: 15px;
  color: #4a4030;
}

.btn-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

.nav-btn {
  padding: 9px 24px;
  background: var(--clr-orange);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.nav-btn:hover,
.nav-btn.active {
  background: var(--clr-orange-dark);
}
</style>
