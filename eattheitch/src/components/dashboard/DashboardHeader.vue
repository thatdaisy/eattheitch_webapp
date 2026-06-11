<template>
  <div class="dashboard">

    <!-- HEADER -->
    <header class="dash-header">
      <div class="welcome">
        <h1>Eat the Itch</h1>
        <p v-if="auth.user">
          Welcome back, <strong>{{ auth.user.username }}</strong>
        </p>
      </div>

      <button class="logout-btn" @click="handleLogout">
        Sign out
      </button>
    </header>

    <!-- MAIN GRID -->
    <div class="dash-grid">

      <!-- LEFT: BRAND BROWSER -->
      <section class="panel">
        <h2>Yarn brands</h2>

        <input
          v-model="search"
          class="search"
          placeholder="Search yarn brands..."
        />

        <div class="brand-list">
          <button
            v-for="brand in filteredBrands"
            :key="brand.id"
            class="brand-card"
            :class="{ active: selectedBrand?.id === brand.id }"
            @click="selectedBrand = brand"
          >
            <div class="brand-name">{{ brand.name }}</div>
            <div class="brand-meta">{{ brand.country }}</div>
          </button>
        </div>
      </section>

      <!-- MIDDLE: CREATE RATING -->
      <section class="panel">
        <h2>Create rating</h2>

        <div v-if="!selectedBrand" class="empty-state">
          Select a yarn brand to start rating
        </div>

        <form v-else @submit.prevent="submitRating">
          <h3>{{ selectedBrand.name }}</h3>

          <label>Score: {{ score }}/5</label>
          <input type="range" min="1" max="5" v-model.number="score" />

          <label>Review</label>
          <textarea v-model="review" rows="5" />

          <button class="primary-btn">
            Publish review
          </button>
        </form>
      </section>

      <!-- RIGHT: RECENT RATINGS -->
      <section class="panel">
        <h2>Your reviews</h2>

        <div v-if="ratings.length === 0">
          No reviews yet
        </div>

        <article
          v-for="r in ratings"
          :key="r.id"
          class="rating-card"
        >
          <h4>{{ r.brandName }}</h4>
          <p>{{ r.review }}</p>
          <strong>{{ r.score }}/5</strong>
        </article>
      </section>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { apiFetch } from '@/utils/api'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

// ----------------------
// state
// ----------------------
const search = ref('')
const selectedBrand = ref(null)

const score = ref(5)
const review = ref('')

const brands = ref([])
const ratings = ref([])

// ----------------------
// computed
// ----------------------
const filteredBrands = computed(() => {
  return brands.value.filter(b =>
    b.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

// ----------------------
// lifecycle
// ----------------------
onMounted(async () => {
  // safety: ensure session exists
  if (!auth.initialized) {
    await auth.initialize()
  }

  // if session expired mid-navigation
  if (!auth.isAuthenticated) {
    router.replace('/auth')
    return
  }

  await loadBrands()
  await loadRatings()
})

// ----------------------
// API
// ----------------------
async function loadBrands() {
  const { ok, data } = await apiFetch('/brands')
  if (ok) brands.value = data
}

async function loadRatings() {
  const { ok, data } = await apiFetch('/ratings/me')
  if (ok) ratings.value = data
}

async function submitRating() {
  if (!selectedBrand.value) return

  const payload = {
    brandId: selectedBrand.value.id,
    score: score.value,
    review: review.value
  }

  const { ok } = await apiFetch('/ratings', {
    method: 'POST',
    body: JSON.stringify(payload)
  })

  if (ok) {
    review.value = ''
    score.value = 5
    await loadRatings()
  }
}

// ----------------------
// logout
// ----------------------
async function handleLogout() {
  await auth.logout()
  router.replace('/')
}
</script>