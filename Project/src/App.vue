<script setup>
import NavBar from '@/components/common/NavBar.vue'
</script>

<template>
  <div id="app-shell">
    <header class="app-header">
      <div class="brand">
        <span class="brand-name">eat the itch</span>
        <h1 class="brand-title">Crafting Community</h1>
      </div>
      <NavBar />
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
.app-header {
  background: var(--clr-header);
}

.brand {
  padding: 16px 16px 8px;
}

.brand-name {
  display: block;
  color: var(--clr-orange);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.brand-title {
  color: #fff;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.2;
  margin-top: 4px;
}
</style>
