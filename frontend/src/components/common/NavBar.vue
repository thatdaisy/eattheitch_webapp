<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
</script>

<template>
  <nav class="navbar">
    <button
      class="nav-btn"
      :class="{ active: route.path === '/brands' }"
      @click="router.push('/brands')"
    >Brands</button>
    <button
      class="nav-btn"
      :class="{ active: route.path === '/community' }"
      @click="router.push('/community')"
    >Home</button>
    <button
      class="nav-btn"
      :class="{ active: route.path === '/profile' }"
      @click="router.push('/profile')"
    >Profile</button>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 10px;
  padding: 10px 16px 14px;
}

.nav-btn {
  flex: 1;
  padding: 9px 8px;
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
