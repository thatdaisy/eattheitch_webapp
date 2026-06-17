<template>
  <div class="card-base">
    <form @submit.prevent="submit">
      <div v-if="successMsg" class="success-flash">
        {{ successMsg }}
      </div>
      <div v-if="error" class="error-banner">
        {{ error }}
      </div>

      <input v-model="form.author" disabled required hidden/>

      <select v-model="selectedBrandId" class="card-brand-select" required>
        <option value="" disabled>Select a brand</option>
        <option v-for="brand in props.brands" :key="brand.id" :value="brand.id">
          {{ brand.name }}
        </option>
      </select>
      <span class="field-error">{{ fieldErrors.brand }}</span>

      <div class="rating-row">
        <label>Overall</label>
        <Rating v-model="form.rating_overall" :max="5" />
        <span class="field-error">{{ fieldErrors.rating_overall }}</span>
      </div>

      <div class="rating-row">
        <label>Softness</label>
        <Rating v-model="form.rating_softness" :max="5" />
        <span class="field-error">{{ fieldErrors.rating_softness }}</span>
      </div>

      <div class="rating-row">
        <label>Quality</label>
        <Rating v-model="form.rating_quality" :max="5" />
        <span class="field-error">{{ fieldErrors.rating_quality }}</span>
      </div>

      <div class="rating-row">
        <label>Price / value</label>
        <Rating v-model="form.rating_price_value" :max="5" />
        <span class="field-error">{{ fieldErrors.rating_price_value }}</span>
      </div>

      <div class="rating-row">
        <label>Eco-friendliness</label>
        <Rating v-model="form.rating_eco" :max="5" />
        <span class="field-error">{{ fieldErrors.rating_eco }}</span>
      </div>

      <textarea
        v-model="form.text"
        class="card-text"
        placeholder="Write your review..."
      ></textarea>
      <span class="field-error">{{ fieldErrors.text }}</span>

      <div>
        <button class="form-btn-secondary" :disabled="loading">
          {{ loading ? 'Saving...' : 'Create' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useReviewsStore } from '@/stores/reviews'
import Rating from '../common/Rating.vue'

const props = defineProps({
  user: Object,
  brands: {
    type: Array,
    default: () => [],
  },
})

const reviewsStore = useReviewsStore()
const { loading, successMsg, error, fieldErrors } = storeToRefs(reviewsStore)

const selectedBrandId = ref('')

const defaultForm = () => ({
  author: props.user.username,
  rating_overall: 0,
  rating_softness: 0,
  rating_quality: 0,
  rating_price_value: 0,
  rating_eco: 0,
  text: '',
})

const form = reactive(defaultForm())

async function submit() {
  await reviewsStore.createReview(selectedBrandId.value, form)

  if (!reviewsStore.error) {
    Object.assign(form, defaultForm())
    selectedBrandId.value = ''
  }

  setTimeout(() => {
    reviewsStore.successMsg = ''
  }, 1500)
}
</script>

<style scoped>
@import '../../styles/card-style.css';
@import '../../styles/form.css';

.rating-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.rating-row label {
  min-width: 7rem;
  font-weight: 600;
}
</style>
