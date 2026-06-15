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
    reviewsByBrand: (state) => (brandId) => state.reviews.filter((r) => r.brand_id === brandId),

    averageRating: (state) => {
      if (!state.reviews.length) return 0

      const sum = state.reviews.reduce((acc, r) => {
        return acc + (r.rating_overall || 0)
      }, 0)

      return sum / state.reviews.length
    },
  },

  actions: {
    clearErrors() {
      this.error = ''
      this.successMsg = ''
      this.fieldErrors = {}
    },

    formatDate(iso) {
      if (!iso) return '—'

      return new Date(iso).toLocaleDateString('en-AT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },

    async initialize() {
      if (this.initialized) return
      await this.fetchReviews()
      this.initialized = true
    },

    async fetchReviews() {
      this.loading = true
      try {
        const { ok, data } = await apiFetch('/reviews')
        console.log(data)
        this.reviews = ok ? data : null
      } catch {
        this.user = null
      } finally {
        this.loading = false
      }
    },

    async fetchReviewById(id) {
      this.loading = true

      try {
        const { ok, data } = await apiFetch(`/reviews/${id}`)

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

    handleApiError(data, status) {
      if (status === 422 && data?.fields) {
        this.fieldErrors = data.fields
        this.error = 'Please fix the errors below.'
      } else {
        this.error = data?.message || data?.error || 'Something went wrong.'
      }
    },
  },
})
