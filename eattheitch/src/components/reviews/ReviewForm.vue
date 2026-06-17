<template>
  <div class="form-panel">
    <form class="form-base" @submit.prevent="submitReview">
      <input id="author" v-model="form.author" type="text" required disabled hidden />

      <div class="form-group">
        <label for="brand">Brand</label>
        <select id="brand" v-model="selectedBrandId" required :disabled="loadingBrands">
          <option value="" disabled>
            {{ loadingBrands ? 'Loading brands...' : 'Select a brand' }}
          </option>
          <option v-for="brand in brands" :key="brand.id" :value="brand.id">
            {{ brand.name }}
          </option>
        </select>
        <p v-if="brandsError" class="status error">{{ brandsError }}</p>
      </div>

      <div class="form-group">
        <label for="rating_overall">Overall Rating</label>
        <select id="rating_overall" v-model.number="form.rating_overall" required>
          <option value="" disabled>Select rating</option>
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="rating_softness">Softness</label>
        <select id="rating_softness" v-model.number="form.rating_softness" required>
          <option value="" disabled>Select rating</option>
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="rating_quality">Quality</label>
        <select id="rating_quality" v-model.number="form.rating_quality" required>
          <option value="" disabled>Select rating</option>
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="rating_price_value">Price/Value</label>
        <select id="rating_price_value" v-model.number="form.rating_price_value" required>
          <option value="" disabled>Select rating</option>
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="rating_eco">Eco</label>
        <select id="rating_eco" v-model.number="form.rating_eco" required>
          <option value="" disabled>Select rating</option>
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="text">Review</label>
        <textarea id="text" v-model="form.text" rows="4" required></textarea>
      </div>

      <button class="form-button" type="submit" :disabled="submitting || !selectedBrandId">
        {{ submitting ? 'Submitting...' : 'Submit Review' }}
      </button>

      <p v-if="success" class="status success">Review submitted successfully!</p>
      <p v-if="error" class="status error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { apiFetch } from '@/utils/api'

const props = defineProps({
  user: Object,
})


const brands = ref([])
const selectedBrandId = ref('')
const loadingBrands = ref(false)
const brandsError = ref('')

async function loadBrands() {
  loadingBrands.value = true
  brandsError.value = ''
  try {
    const res = await apiFetch('/brands?per_page=100')

    if (!res.ok) {
      console.error('Brands request failed:', res.status, res.data)
      brandsError.value = `Failed to load brands (status ${res.status})`
      return
    }

    brands.value = res.data?.brands ?? []

    if (brands.value.length === 0) {
      console.warn('Brands response had no brands array:', res.data)
    }
  } catch (e) {
    console.error(e)
    brandsError.value = 'Failed to load brands'
  } finally {
    loadingBrands.value = false
  }
}
onMounted(loadBrands)

const form = reactive({
  author: props.user.username,
  rating_overall: '',
  rating_softness: '',
  rating_quality: '',
  rating_price_value: '',
  rating_eco: '',
  text: '',
})

const submitting = ref(false)
const success = ref(false)
const error = ref('')

const emit = defineEmits(['created'])

async function submitReview() {
  submitting.value = true
  success.value = false
  error.value = ''

  try {
    const url = '/brands/' + selectedBrandId.value + '/reviews'
    const res = await apiFetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    success.value = true
    emit('created', res.data)

    Object.assign(form, {
      
      rating_overall: '',
      rating_softness: '',
      rating_quality: '',
      rating_price_value: '',
      rating_eco: '',
      text: '',
    })
  } catch (e) {
    console.error(e)
    error.value = 'Failed to submit review'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
@import '../../styles/form.css';
</style>