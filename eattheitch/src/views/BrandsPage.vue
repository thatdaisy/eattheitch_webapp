<template>
  <div class="brands-page">
    <div class="brands-header">
      <button class="back-btn" @click="navigate('home')">← back</button>
      <h1>Brands & Reviews</h1>
      <button class="add-btn" @click="openModal">+ Add Brand</button>
    </div>

    <div class="brands-content">
      <section class="brands-list">
        <h2>Top Brands</h2>
        <div class="brand-cards">
          <div v-for="b in brands" :key="b.id" class="brand-card">
            <div class="brand-name">{{ b.name }}</div>
            <div class="brand-meta">{{ b.reviews.length }} reviews</div>
          </div>
        </div>
      </section>

      <section class="reviews-list">
        <h2>Recent Reviews</h2>
        <div class="review" v-for="r in recentReviews" :key="r.id">
          <div class="review-head">
            <div class="review-brand">{{ r.brand }}</div>
            <div class="rating">{{ '🐑'.repeat(r.rating) }}{{ r.rating===0?'—':'' }}</div>
          </div>
          <div class="review-body">{{ r.text }}</div>
          <div class="review-author">{{ r.author || 'Anonymous' }}</div>
        </div>
      </section>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal">
        <h3>Add brand + review</h3>
        <form @submit.prevent="submit">
          <label>Brand name</label>
          <input v-model="form.name" required />

          <label>Review</label>
          <textarea v-model="form.text" rows="4" required></textarea>

          <label>Rating (0-5 sheep)</label>
          <select v-model.number="form.rating">
            <option v-for="n in 6" :key="n-1" :value="n-1">{{ n-1 }}</option>
          </select>

          <div class="modal-actions">
            <button type="button" @click="closeModal">Cancel</button>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePage } from '../composables/usePage'
import { apiFetch } from '../utils/api'

const { navigate } = usePage()

const showModal = ref(false)

const brands = ref([
  { id: 1, name: 'Happy Sheep', reviews: [{ id: 1, text: 'Great yarn', rating: 5 }] },
  { id: 2, name: 'Cool Knitting', reviews: [{ id: 2, text: 'Lovely colors', rating: 4 }] },
])

const form = ref({ name: '', text: '', rating: 5 })

function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  form.value = { name: '', text: '', rating: 5 }
}

async function submit() {
  const brandName = form.value.name.trim()
  const reviewBody = { text: form.value.text.trim(), rating: form.value.rating }

  if (!brandName || !reviewBody.text) return

  // Try to create or find brand on backend
  try {
    // Check if brand exists locally to get an id placeholder
    let brand = brands.value.find((b) => b.name.toLowerCase() === brandName.toLowerCase())

    if (!brand) {
      // Create brand on backend
      const { ok, data } = await apiFetch('http://localhost:8080/brands', {
        method: 'POST',
        body: JSON.stringify({ name: brandName }),
        credentials: 'include',
      })

      if (ok && data?.id) {
        brand = { id: data.id, name: data.name || brandName, reviews: [] }
        brands.value.push(brand)
      } else {
        // fallback local creation
        const id = Date.now()
        brand = { id, name: brandName, reviews: [] }
        brands.value.push(brand)
      }
    }

    // Post review to backend
    const { ok: ok2, data: reviewResp } = await apiFetch(`http://localhost:8080/brands/${brand.id}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewBody),
      credentials: 'include',
    })

    if (ok2 && (reviewResp?.id || reviewResp?.review)) {
      const newReview = reviewResp.review || reviewResp
      brand.reviews.push(newReview)
    } else {
      // fallback local review
      const rid = Date.now() + Math.floor(Math.random() * 1000)
      brand.reviews.push({ id: rid, text: reviewBody.text, rating: reviewBody.rating })
    }
  } catch (err) {
    // network or server error — fall back to local update
    console.error('Failed to save to backend, falling back to local:', err)
    let brand = brands.value.find((b) => b.name.toLowerCase() === brandName.toLowerCase())
    if (!brand) {
      const id = Date.now()
      brand = { id, name: brandName, reviews: [] }
      brands.value.push(brand)
    }
    const rid = Date.now() + Math.floor(Math.random() * 1000)
    brand.reviews.push({ id: rid, text: reviewBody.text, rating: reviewBody.rating })
  }

  closeModal()
}

const recentReviews = computed(() => {
  return brands.value.flatMap((b) => b.reviews.map((r) => ({ id: r.id, brand: b.name, text: r.text, rating: r.rating }))).slice().reverse()
})
</script>

<style scoped>
.brands-header { display:flex; align-items:center; gap:1rem; padding:1rem }
.back-btn, .add-btn { background:var(--moss); color:white; border:none; padding:0.5rem 1rem; border-radius:8px }
.brands-list, .reviews-list { padding:1rem }
.brands-content { display:flex; flex-direction:column; gap:1.25rem }
.brand-cards { display:flex; gap:1rem; flex-wrap:wrap }
.brand-card { background:var(--sage); padding:0.75rem 1rem; border-radius:10px }
.review { background:white; padding:0.75rem; border-radius:10px; margin-bottom:0.75rem }
.modal-backdrop { position:fixed; inset:0; background:rgba(0,0,0,0.35); display:flex; align-items:center; justify-content:center }
.modal { background:white; padding:1rem; border-radius:10px; width:90%; max-width:480px }
.modal-actions { display:flex; justify-content:flex-end; gap:0.5rem; margin-top:0.75rem }

@media (min-width: 901px) {
  .brands-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    align-items: start;
  }

  .brands-list { grid-column: 1 }
  .reviews-list { grid-column: 2 }

  .brand-cards { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:1rem }
}
</style>
