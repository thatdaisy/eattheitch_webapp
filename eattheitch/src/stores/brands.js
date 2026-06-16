import { defineStore } from 'pinia'
import { apiFetch } from '@/utils/api'

export const useBrandsStore = defineStore('brands', {
  state: () => ({
    initialized: false,
    loading: false,

    brands: null,
    selectedBrand: null,

    error: '',
    successMsg: '',

    fieldErrors: {},
  }),

  getters: {
  },

  actions: {
    clearErrors() {
      this.error = ''
      this.successMsg = ''
      this.fieldErrors = {}
    },

    async initialize() {
      if (this.initialized) return
      await this.fetchBrands()
      this.initialized = true
    },

    async fetchBrands() {
      this.loading = true
      try {
        const { ok, data } = await apiFetch('/brands?sort=eco_score_desc&page=1&per_page=15', {
          method: 'GET',
        })
        this.brands = ok ? data.brands : null
      } catch {
        this.brands = null
      } finally {
        this.loading = false
      }
    },

    async fetchBrandById(id) {
      this.loading = true

      try {
        const { ok, data } = await apiFetch(`/brands/${id}`, {
          method: 'GET',
        })

        if (ok) {
          this.selectedBrand = data.brand ?? data
        } else {
          this.selectedBrand = null
          this.error = data?.message || 'Failed to load brand.'
        }
      } catch {
        this.selectedBrand = null
        this.error = 'Could not reach the server.'
      } finally {
        this.loading = false
      }
    },
  },
})
