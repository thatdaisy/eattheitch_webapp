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

    <!-- Content Grid -->
    <div class="page-content">
      <!-- Left Column -->
      <div class="content-left">
        <section class="content-section">
          <div class="section-header">
            <h2>Trade</h2>
            <a href="#" class="show-more">show more</a>
          </div>
          <div class="items-list">
            <div class="item trade-item">
              <div class="item-title">Cascade Superwash, used</div>
              <div class="item-subtitle">WoolWitch</div>
              <div class="item-meta">created 20.04.2026</div>
              <button class="details-btn">Details</button>
            </div>
            <div class="item trade-item">
              <div class="item-title">Merri More, new</div>
              <div class="item-subtitle">FiberNerd</div>
              <div class="item-meta">created 17.03.2026</div>
              <button class="details-btn">Details</button>
            </div>
          </div>
        </section>

        <section class="content-section">
          <div class="section-header">
            <h2>Pattern</h2>
            <a href="#" class="show-more">show more</a>
          </div>
          <div class="items-list">
            <div class="item pattern-item">
              <div class="item-title">Hawthorn Pullover</div>
              <div class="item-subtitle">Elowen Moris</div>
              <div class="item-meta">published 10.04.2026</div>
              <button class="details-btn">Details</button>
            </div>
            <div class="item pattern-item">
              <div class="item-title">Scarf Thin</div>
              <div class="item-subtitle">FiberNerd</div>
              <div class="item-meta">published 23.02.2026</div>
              <button class="details-btn">Details</button>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column -->
      <div class="content-right">
        <section class="content-section">
          <div class="section-header">
            <h2>Events</h2>
            <a href="#" class="show-more">show more</a>
          </div>
          <div class="items-list">
            <div class="item event-item">
              <div class="item-title">Knitting Club</div>
              <div class="item-subtitle">WoolWitch</div>
              <div class="item-meta">Date 19.07.2026</div>
              <button class="details-btn">Details</button>
            </div>
          </div>
        </section>

        <section class="content-section">
          <div class="section-header">
            <h2>Forum</h2>
            <a href="#" class="show-more">show more</a>
          </div>
          <div class="items-list">
            <div class="item forum-item">
              <div class="item-title">Yarn Weight Recommendations</div>
              <div class="item-subtitle">Started by WoolWitch</div>
              <div class="item-meta">Last post 08.06.2026</div>
              <button class="details-btn">Details</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

async function handleLogout() {
  await auth.logout()
  router.replace('/')
}
</script>

<style scoped>
/* Two-column grid is handled by page-layout.css .page-content;
   only the column sub-divs need their own stacking behaviour */
@media (min-width: 901px) {
  .content-left,
  .content-right {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
