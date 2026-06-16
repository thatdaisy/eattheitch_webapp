import { defineStore } from 'pinia'
import { apiFetch } from '@/utils/api'

export const useTradesStore = defineStore('trades', {
  state: () => ({
    initialized: false,
    loading: false,

    trades: null,
    selectedTrade: null,

    error: '',
    successMsg: '',

    fieldErrors: {},
  }),

  getters: {
    tradesByAuthor: (state) => {
      return (username) => {
        return (state.trades ?? []).filter((trade) => trade.author === username)
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
      await this.fetchTrades()
      this.initialized = true
    },

    async fetchTrades() {
      this.loading = true
      try {
        const { ok, data } = await apiFetch('/trades', {
          method: 'GET',
        })
        this.trades = ok ? data : null
      } catch {
        this.trades = null
      } finally {
        this.loading = false
      }
    },

    async fetchTradeById(id) {
      this.loading = true

      try {
        const { ok, data } = await apiFetch(`/trades/${id}`, {
          method: 'GET',
        })

        if (ok) {
          this.selectedTrade = data.trade ?? data
        } else {
          this.selectedTrade = null
          this.error = data?.message || 'Failed to load trade.'
        }
      } catch {
        this.selectedTrade = null
        this.error = 'Could not reach the server.'
      } finally {
        this.loading = false
      }
    },

    async createTrade(payload) {
      this.clearErrors()
      this.loading = true

      try {
        const { ok, status, data } = await apiFetch('/trades', {
          method: 'POST',
          body: JSON.stringify(payload),
        })

        if (ok) {
          await this.fetchTrades()
          this.successMsg = 'Trade created successfully.'
        } else {
          this.handleApiError(data, status)
        }
      } catch {
        this.error = 'Could not reach the server.'
      } finally {
        this.loading = false
      }
    },

    async updateTrade(id, payload) {
      this.clearErrors()
      this.loading = true

      try {
        const { ok, status, data } = await apiFetch(`/trades/${id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })

        if (ok) {
          await this.fetchTrades()
          this.successMsg = 'Trade updated successfully.'
        } else {
          this.handleApiError(data, status)
        }
      } catch {
        this.error = 'Could not reach the server.'
      } finally {
        this.loading = false
      }
    },

    async deleteTrade(id) {
      this.clearErrors()
      this.loading = true

      try {
        const { ok, status, data } = await apiFetch(`/trades/${id}`, {
          method: 'DELETE',
        })

        if (ok) {
          this.trades = this.trades.filter((r) => r.id !== id)
          this.successMsg = 'Trade deleted successfully.'
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
