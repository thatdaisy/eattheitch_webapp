<template>
  <div class="page-shell">
    <AppHeader :user="user" @logout="auth.logout" />

    <div class="page-content single-column">
      <div class="content-section">
        <div class="section-header">
          <h2>Trades</h2>
        </div>
        <div v-if="loading">Loading...</div>
        <div v-for="trade in trades">
          <TradeCard :trade="trade" :user="user"/>
        </div>
        <p v-if="error">
          {{ error }}
        </p>
      </div>
      <div class="content-section">
        <div class="section-header">
          <h2>Create New Trade</h2>
        </div>
        <div>
          <TradeForm :user="user"></TradeForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AppHeader from '@/components/common/AppHeader.vue'
import TradeCard from '@/components/trades/TradeCard.vue'
import TradeForm from '@/components/trades/TradeForm.vue'
import { useAuthStore } from '@/stores/auth'
import { useTradesStore } from '@/stores/trades'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const { user } = storeToRefs(auth)

const tradesStore = useTradesStore()
const { trades, loading, error } = storeToRefs(tradesStore)

onMounted(() => {
  tradesStore.initialize()
})
</script>
