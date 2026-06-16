<template>
  <div class="card-base">
    <div v-if="loading" class="status">Loading reviews...</div>
    <div v-else-if="error" class="status error">{{ error }}</div>

    <div v-else class="card-element" v-for="review in visibleReviews" :key="review.id">
      <div class="card-inline">
        <div class="author">{{ review.author }}</div>
        <div class="date">{{ formatDate(review.created_at) }}</div>
      </div>

      <div class="rating-overall">
        <SheepIcon /> {{ review.rating_overall }}/5
        <span class="brand-name">{{ brandName(review.brand_id) }}</span>
      </div>

      <div class="rating-grid">
        <div class="rating-item">
          <strong>{{ review.rating_softness }}/5</strong>
          <span>Softness</span>
        </div>

        <div class="rating-item">
          <strong>{{ review.rating_quality }}/5</strong>
          <span>Quality</span>
        </div>

        <div class="rating-item">
          <strong>{{ review.rating_price_value }}/5</strong>
          <span>Price/Value</span>
        </div>

        <div class="rating-item">
          <strong>{{ review.rating_eco }}/5</strong>
          <span>Eco</span>
        </div>
      </div>


      <p class="card-text">
        {{ review.text }}
      </p>
    </div>
  </div>
</template>

<script setup>
import SheepIcon from '../icons/SheepIcon.vue'
import { ref, computed, onMounted } from 'vue'
import { apiFetch } from '@/utils/api'
import { formatDate } from '@/utils/formatter'

const reviews = ref([])
const brands = ref([])
const loading = ref(false)
const error = ref('')

const visibleReviews = computed(() => reviews.value.slice(0, 3))

const brandsById = computed(() => {
  const map = new Map()
  brands.value.forEach((b) => map.set(b.id, b.name))
  return map
})

function brandName(brandId) {
  return brandsById.value.get(brandId) ?? 'Unbekannte Marke'
}

async function loadReviews() {
  loading.value = true
  error.value = ''

  try {
    const res = await apiFetch('/reviews')
    reviews.value = res.data.reviews ?? res.data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load reviews'
  } finally {
    loading.value = false
  }
}

async function loadBrands() {
  try {
    const res = await apiFetch('/brands?per_page=100')
    brands.value = res.data?.brands ?? []
  } catch (e) {
    console.error('Failed to load brands for name lookup:', e)
  }
}

onMounted(() => {
  loadReviews()
  loadBrands()
})
</script>

<style scoped>
@import '../../styles/card-style.css';

.rating-overall {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  color: var(--forest);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--charcoal);
  margin-left: auto;
}

.rating-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem 1rem;
  margin-bottom: 0.75rem;
}

.rating-item {
  display: flex;
  font-size: 0.9rem;
  color: var(--charcoal);
}

.rating-item span {
  margin-left: 10px;
}
</style>