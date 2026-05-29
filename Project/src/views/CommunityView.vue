<script setup>
import { ref, computed, onMounted } from 'vue'
import FilterPills from '@/components/common/FilterPills.vue'
import TradeItem from '@/components/community/TradeItem.vue'
import PatternItem from '@/components/community/PatternItem.vue'
import EventItem from '@/components/community/EventItem.vue'
import { searchPatterns, MOCK_TRADES, MOCK_EVENTS } from '@/services/ravelryServices.js'

const activeFilters = ref(['all'])
const patterns = ref([])
const loading = ref(true)

const showAll = computed(() => activeFilters.value.includes('all'))
const showTrade = computed(() => showAll.value || activeFilters.value.includes('Trade'))
const showPattern = computed(() => showAll.value || activeFilters.value.includes('Pattern'))
const showEvents = computed(() => showAll.value || activeFilters.value.includes('Events'))

onMounted(async () => {
  patterns.value = await searchPatterns('', 4)
  loading.value = false
})
</script>

<template>
  <div class="community-page">
    <FilterPills v-model="activeFilters" />

    <div class="content">
      <a class="back-link" href="#">← back</a>

      <!-- Trade -->
      <section v-if="showTrade" class="section">
        <div class="section-header">
          <h2>Trade</h2>
          <a class="show-more" href="#">show more</a>
        </div>
        <div class="card-list">
          <TradeItem
            v-for="item in MOCK_TRADES"
            :key="item.id"
            :title="item.title"
            :username="item.username"
            :date="item.date"
          />
        </div>
      </section>

      <hr v-if="showTrade && (showPattern || showEvents)" class="divider" />

      <!-- Pattern -->
      <section v-if="showPattern" class="section">
        <div class="section-header">
          <h2>Pattern</h2>
          <a class="show-more" href="#">show more</a>
        </div>
        <div v-if="loading" class="loading">Loading patterns…</div>
        <div v-else class="card-list">
          <PatternItem
            v-for="item in patterns.slice(0, 2)"
            :key="item.id"
            :title="item.title"
            :author="item.author"
            :date="item.date"
            :permalink="item.permalink"
          />
        </div>
      </section>

      <hr v-if="showPattern && showEvents" class="divider" />

      <!-- Events -->
      <section v-if="showEvents" class="section">
        <div class="section-header">
          <h2>Events</h2>
          <a class="show-more" href="#">show more</a>
        </div>
        <div class="card-list">
          <EventItem
            v-for="item in MOCK_EVENTS"
            :key="item.id"
            :title="item.title"
            :organizer="item.organizer"
            :date="item.date"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.community-page {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.content {
  padding: 12px 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 0;
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

.section {
  padding: 8px 0 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
}

.section-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: var(--clr-text);
}

.show-more {
  color: var(--clr-orange);
  font-size: 13px;
  text-decoration: none;
}

.show-more:hover {
  text-decoration: underline;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.divider {
  border: none;
  border-top: 1px solid var(--clr-section-divider);
  margin: 4px 0;
}

.loading {
  font-size: 14px;
  color: #888;
  padding: 8px 0;
}
</style>
