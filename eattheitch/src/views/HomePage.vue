<template>
  <div class="home-page">
    <!-- Header -->
    <div class="home-header">
      <div class="header-top">
        <div class="brand">
          <div class="brand-name">eat the itch</div>
          <div class="brand-sub">Crafting Community</div>
        </div>
        <button class="logout-btn" @click="handleLogout">Sign Out</button>
      </div>

      <!-- Navigation -->
      <nav class="nav-links">
        <RouterLink to="/dashboard" class="nav-button">
          Dashboard 
        </RouterLink>
        <RouterLink to="/brands" class="nav-button">
          Brands 
        </RouterLink>
        <RouterLink to="/community" class="nav-button">
          Community 
        </RouterLink>
        <RouterLink to="/profile" class="nav-button">
          Profile 
        </RouterLink>
      </nav>

      <!-- Filters -->
      <div class="filters">
        <label>
          <input type="checkbox" checked />
          <span>all</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>Trade</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>Pattern</span>
        </label>
        <label>
          <input type="checkbox" />
          <span>Events</span>
        </label>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="home-content">
      <!-- Left Column (Mobile: stacked, Desktop: Trade + Pattern) -->
      <div class="content-left">
        <!-- Trade Section -->
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

        <!-- Pattern Section -->
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

      <!-- Right Column (Mobile: stacked, Desktop: Events + Forum) -->
      <div class="content-right">
        <!-- Events Section -->
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

        <!-- Forum Section -->
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
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

async function handleLogout() {
  await auth.logout()
  router.replace('/')
}
</script>

<style scoped>
.home-page {
  width: 100%;
  background: var(--cream);
  padding: 0;
}

/* ── Header ─────────────────────────────────── */
.home-header {
  background: var(--forest);
  color: white;
  padding: 1.5rem;
  min-height: 50vh;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.brand {
  flex: 1;
}

.brand-name {
  font-size: 1.75rem;
  color: var(--rust);
  font-weight: bold;
  font-family: var(--font-serif);
  margin-bottom: 0.5rem;
}

.brand-sub {
  font-size: 1.75rem;
  font-weight: 300;
  color: white;
}

.logout-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition);
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

/* Navigation */
.nav-links {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.nav-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 120px;
  padding: 0.75rem 1rem;

  background: var(--warm-white);
  color: var(--forest);

  border: 1.5px solid var(--forest);
  border-radius: var(--radius-md);

  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 600;

  text-decoration: none;
  cursor: pointer;

  transition:
    background var(--transition),
    color var(--transition),
    border-color var(--transition),
    transform var(--transition),
    box-shadow var(--transition);
}

.nav-button:hover {
  background: var(--terracotta);
  color: var(--warm-white);

  transform: translateY(-2px);

  box-shadow: 0 4px 12px rgba(44, 95, 45, 0.15);
}

.nav-button:active {
  transform: translateY(0);
}

/* Current route */
.nav-button.router-link-exact-active {
  background: var(--rust);
  border-color: var(--rust);
  color: var(--warm-white);

  box-shadow: 0 4px 12px rgba(196, 97, 42, 0.2);
}

/* Filters */
.filters {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  align-items: center;
}

.filters label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 0.95rem;
  cursor: pointer;
}

.filters input[type='checkbox'] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--rust);
}

/* ── Content Grid ─────────────────────────────────── */
.home-content {
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 901px) {
  .home-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .content-left,
  .content-right {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}

/* ── Sections ─────────────────────────────────── */
.content-section {
  background: white;
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--light-gray);
  padding-bottom: 1rem;
}

.section-header h2 {
  font-size: 1.5rem;
  color: var(--charcoal);
  font-weight: 600;
}

.show-more {
  color: var(--rust);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color var(--transition);
}

.show-more:hover {
  color: var(--terracotta);
}

/* ── Items ─────────────────────────────────── */
.items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item {
  padding: 1.25rem;
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all var(--transition);
}

.item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Item Types */
.trade-item {
  background: var(--sage);
  color: var(--charcoal);
}

.pattern-item {
  background: var(--rust);
  color: white;
}

.event-item {
  background: var(--light-gray);
  color: var(--charcoal);
}

.forum-item {
  background: var(--sand);
  color: var(--charcoal);
}

/* Item Content */
.item-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.item-subtitle {
  font-size: 0.95rem;
  opacity: 0.85;
}

.item-meta {
  font-size: 0.85rem;
  opacity: 0.7;
}

.details-btn {
  align-self: flex-end;
  background: var(--moss);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition);
}

.details-btn:hover {
  background: var(--forest);
}

.pattern-item .details-btn {
  background: var(--terracotta);
}

.pattern-item .details-btn:hover {
  background: var(--rust);
}

/* Mobile Responsiveness */
@media (max-width: 600px) {
  .home-header {
    padding: 1rem;
    min-height: auto;
  }

  .brand-name {
    font-size: 1.5rem;
  }

  .brand-sub {
    font-size: 1.5rem;
  }

  .section-header h2 {
    font-size: 1.25rem;
  }

  .nav-buttons {
    gap: 0.5rem;
  }

  .nav-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .home-content {
    padding: 1.5rem 1rem;
    gap: 1.5rem;
  }

  .content-section {
    padding: 1rem;
  }
}
</style>
