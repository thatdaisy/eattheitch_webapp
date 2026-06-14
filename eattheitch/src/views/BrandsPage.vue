<template>
  <div class="page-shell">
    <AppHeader
      :user="user"
      @logout="auth.logout"
    />

    <!-- Brands Content -->
    <div class="page-content single-column">
      <!-- Brands list -->
      <div class="content-section">
        <div class="section-header">
          <h2>Top Brands</h2>
          <button class="add-btn" @click="openModal">+ Add Brand</button>
        </div>
        <div class="brand-cards">
          <div v-for="b in brands" :key="b.id" class="brand-card">
            <div class="brand-card-name">{{ b.name }}</div>
            <div class="brand-card-meta">{{ b.reviews.length }} reviews</div>
          </div>
        </div>
      </div>

      <!-- Reviews list -->
      <div class="content-section">
        <div class="section-header">
          <h2>Recent Reviews</h2>
        </div>
        <div class="items-list">
          <div class="review" v-for="r in recentReviews" :key="r.id">
            <div class="review-head">
              <div class="review-brand">{{ r.brand }}</div>
              <div class="rating">{{ '🐑'.repeat(r.rating) }}{{ r.rating === 0 ? '—' : '' }}</div>
            </div>
            <div class="review-body">{{ r.text }}</div>
            <div class="review-author">{{ r.author || 'Anonymous' }}</div>
          </div>
        </div>
      </div>
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
            <option v-for="n in 6" :key="n - 1" :value="n - 1">{{ n - 1 }}</option>
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
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { apiFetch } from '../utils/api'
import AppHeader from '@/components/common/AppHeader.vue'

const auth = useAuthStore()
const router = useRouter()
const user = auth.user

async function handleLogout() {
  await auth.logout()
  router.replace('/')
}

const showModal = ref(false)

const brands = ref([
  { id: 1, name: 'Happy Sheep', reviews: [{ id: 1, text: 'Great yarn', rating: 5 }] },
  { id: 2, name: 'Cool Knitting', reviews: [{ id: 2, text: 'Lovely colors', rating: 4 }] },
])

const form = ref({ name: '', text: '', rating: 5 })

function openModal() { showModal.value = true }

function closeModal() {
  showModal.value = false
  form.value = { name: '', text: '', rating: 5 }
}

async function submit() {
  const brandName = form.value.name.trim()
  const reviewBody = { text: form.value.text.trim(), rating: form.value.rating }

  if (!brandName || !reviewBody.text) return

  try {
    let brand = brands.value.find((b) => b.name.toLowerCase() === brandName.toLowerCase())

    if (!brand) {
      const { ok, data } = await apiFetch('http://localhost:8080/brands', {
        method: 'POST',
        body: JSON.stringify({ name: brandName }),
        credentials: 'include',
      })

      if (ok && data?.id) {
        brand = { id: data.id, name: data.name || brandName, reviews: [] }
        brands.value.push(brand)
      } else {
        brand = { id: Date.now(), name: brandName, reviews: [] }
        brands.value.push(brand)
      }
    }

    const { ok: ok2, data: reviewResp } = await apiFetch(
      `http://localhost:8080/brands/${brand.id}/reviews`,
      { method: 'POST', body: JSON.stringify(reviewBody), credentials: 'include' },
    )

    if (ok2 && (reviewResp?.id || reviewResp?.review)) {
      brand.reviews.push(reviewResp.review || reviewResp)
    } else {
      brand.reviews.push({ id: Date.now(), text: reviewBody.text, rating: reviewBody.rating })
    }
  } catch {
    let brand = brands.value.find((b) => b.name.toLowerCase() === brandName.toLowerCase())
    if (!brand) {
      brand = { id: Date.now(), name: brandName, reviews: [] }
      brands.value.push(brand)
    }
    brand.reviews.push({ id: Date.now(), text: reviewBody.text, rating: reviewBody.rating })
  }

  closeModal()
}

const recentReviews = computed(() =>
  brands.value
    .flatMap((b) => b.reviews.map((r) => ({ id: r.id, brand: b.name, text: r.text, rating: r.rating })))
    .slice()
    .reverse(),
)
</script>
