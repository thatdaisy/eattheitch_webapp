import { defineStore } from 'pinia'
import { apiFetch } from '@/utils/api'

export const useReviewsStore = defineStore('reviews', {
  state: () => ({
    initialized: false,
    loading: false,

    reviews: null,
    selectedReview: null,

    error: '',
    successMsg: '',

    fieldErrors: {},
  }),

  getters: {
    reviewsByBrand: (state) => {
      return (brandName) => {
        return (state.reviews ?? []).filter((review) => brand.brand === brandName)
      }
    },

    latestReviews: (state) => {
    return (n = 5) => {
      console.log(state.reviews)
      return [...(state.reviews ?? [])]
        .sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )
        .slice(0, n)
    }
  },
  },

  actions: {
    clearErrors() {
      this.error = ''
      this.successMsg = ''
      this.fieldErrors = {}
    },

    async initialize() {
      if (this.initialized) return
      await this.fetchReviews()
      this.initialized = true
    },

    async fetchReviews() {
      this.loading = true
      try {
        const { ok, data } = await apiFetch('/reviews', {
          method: 'GET',
        })
        this.reviews = ok ? data : null
      } catch {
        this.reviews = null
      } finally {
        this.loading = false
      }
    },

    async fetchReviewById(id) {
      this.loading = true

      try {
        const { ok, data } = await apiFetch(`/reviews/${id}`, {
          method: 'GET',
        })

        if (ok) {
          this.selectedReview = data.review ?? data
        } else {
          this.selectedReview = null
          this.error = data?.message || 'Failed to load review.'
        }
      } catch {
        this.selectedReview = null
        this.error = 'Could not reach the server.'
      } finally {
        this.loading = false
      }
    },

    async createReview(payload) {
      this.clearErrors()
      this.loading = true

      try {
        const { ok, status, data } = await apiFetch('/reviews', {
          method: 'POST',
          body: JSON.stringify(payload),
        })

        if (ok) {
          await this.fetchReviews()
          this.successMsg = 'Review created successfully.'
        } else {
          this.handleApiError(data, status)
        }
      } catch {
        this.error = 'Could not reach the server.'
      } finally {
        this.loading = false
      }
    },

    async updateReview(id, payload) {
      this.clearErrors()
      this.loading = true

      try {
        const { ok, status, data } = await apiFetch(`/reviews/${id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })

        if (ok) {
          await this.fetchReviews()
          this.successMsg = 'Review updated successfully.'
        } else {
          this.handleApiError(data, status)
        }
      } catch {
        this.error = 'Could not reach the server.'
      } finally {
        this.loading = false
      }
    },

    async deleteReview(id) {
      this.clearErrors()
      this.loading = true

      try {
        const { ok, status, data } = await apiFetch(`/reviews/${id}`, {
          method: 'DELETE',
        })

        if (ok) {
          this.reviews = this.reviews.filter((r) => r.id !== id)
          this.successMsg = 'Review deleted successfully.'
        } else {
          this.handleApiError(data, status)
        }
      } catch {
        this.error = 'Could not reach the server.'
      } finally {
        this.loading = false
      }
    },
  },
})
