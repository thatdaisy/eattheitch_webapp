<template>
  <div class="card-base">
    <div class="card-inline">
      <div class="card-brand">{{ brand.name }}</div>
    </div>
    <div>
      <div class="card-inline">
        <div class="card-item-bold">ECO Score: {{ brand.eco_score }}</div>
        <div class="card-item">{{ brand.origin_country }}</div>
      </div>
      <div class="card-text">{{ brand.description }}</div>
      <div class="cert-list">
        <div class="cert-tag" v-for="cert in brand.certifications" :key="cert">
          {{ cert }}
        </div>
      </div>
      <div class="card-inline">
        <span>Average Softness:</span>
        <div class="card-item">{{ brand.avg_softness }} / 5</div>
        <span>Average Quality:</span>
        <div class="card-item">{{ brand.avg_quality }} / 5</div>
      </div>

      <div class="card-inline">
        <span>Average Price Value:</span>
        <div class="card-item">{{ brand.avg_price_value }} / 5</div>
        <span>Average Rating:</span>
        <div class="card-item">{{ brand.avg_rating }} / 5</div>
      </div>
    </div>
  </div>
  <div class="review-card-base">
    <h3>Reviews</h3>
    <div v-for="review in reviewsForBrand" v-bind:key="review.id">
      <ReviewOverview :review="review" />
    </div>
  </div>
</template>

<script setup>
import ReviewOverview from '../reviews/ReviewOverview.vue'
import { useReviewsStore } from '@/stores/reviews'
import { onMounted, computed } from 'vue'

const props = defineProps({
  brand: Object,
})

const reviewsStore = useReviewsStore()
const reviewsForBrand = computed(() => {
  console.log('SELECTED BRAND: ' + props.brand.name)
  return reviewsStore.reviewsForBrand(props.brand.name)
})

onMounted(() => {
  reviewsStore.initialize()
})
</script>

<style scoped>
@import '../../styles/card-style.css';
@import '../../styles/form.css';

.review-card-base {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  background: var(--light-grey);
  margin: 25px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 1rem 1.25rem;
}

.cert-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.cert-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;

  background-color: var(--sage);
  color: #333;

  border: 1px solid #e0e0e0;
  white-space: nowrap;
}
</style>
