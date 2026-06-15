<template>
  <div class="review-card">
    <div class="review-header">
      <div class="author">{{ review.author }}</div>
      <div class="date">{{ formatDate(review.created_at) }}</div>
    </div>

    <div class="rating-overall">⭐ {{ review.rating_overall }}/5</div>

    <div class="rating-grid">
      <div class="rating-item">
        <span>Softness</span>
        <strong>{{ review.rating_softness }}/5</strong>
      </div>

      <div class="rating-item">
        <span>Quality</span>
        <strong>{{ review.rating_quality }}/5</strong>
      </div>

      <div class="rating-item">
        <span>Price/Value</span>
        <strong>{{ review.rating_price_value }}/5</strong>
      </div>

      <div class="rating-item">
        <span>Eco</span>
        <strong>{{ review.rating_eco }}/5</strong>
      </div>
    </div>

    <p class="review-text">
      {{ review.text }}
    </p>
  </div>
</template>

<script setup>
import { useReviewsStore } from '@/stores/reviews'
const reviews = useReviewsStore()

const review = reviews[0]

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-AT', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<style scoped>
.review-card {
  border: 1px solid var(--light-gray);
  border-radius: 10px;
  padding: 1rem;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.review-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--mid-gray);
}

.author {
  font-weight: 600;
  color: var(--charcoal);
}

.rating-overall {
  font-size: 1.1rem;
  font-weight: 600;
}

.rating-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.rating-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  padding: 0.25rem 0;
  border-top: 1px solid #eee;
}

.review-text {
  margin-top: 0.5rem;
  font-size: 0.95rem;
  line-height: 1.4;
}
</style>
