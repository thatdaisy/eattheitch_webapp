import { defineStore } from 'pinia'
import { apiFetch } from '@/utils/api'
import { ref } from 'vue'

export const useCountriesStore = defineStore('countries', {
  state: () => ({
    initialized: ref(false),
    loading: ref(false),

    countries: ref([]),

    error: ref(''),
  }),

  getters: {
  },

  actions: {
    async initialize() {
      if (this.initialized) return
      await this.fetchCountries()
      this.initialized = true
    },

    async fetchCountries() {
      this.loading = true
      try {
        const { ok, data } = await apiFetch('/countries', {
          method: 'GET',
        })
        this.countries = ok ? data : ref([])
      } catch {
        this.countries = ref([])
      }  finally {
        this.loading = false
      }
    },
  }
})
