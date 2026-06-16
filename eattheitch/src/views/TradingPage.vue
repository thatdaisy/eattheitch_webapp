<template>
  <div class="page-shell">
    <AppHeader :user="user" @logout="auth.logout" />

    <div class="main-content">
      <div class="content-left">
        <section class="content-section">
          <div class="section-header">
            <h2>Trades</h2>
          </div>
          <div v-if="loading">Loading...</div>
          <div v-for="trade in trades" v-bind:key="trade.ID">
            <TradeCard
              :trade="trade"
              :user="user"
              @edit="tradesStore.updateTrade"
              @delete="tradesStore.deleteTrade"
            />
          </div>
          <p v-if="error">
            {{ error }}
          </p>
        </section>
      </div>

      <div class="content-right">
        <section class="content-section">
          <div class="section-header">
            <h2>Create New Trade</h2>
          </div>
          <div>
            <TradeCreate :user="user"></TradeCreate>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AppHeader from '@/components/common/AppHeader.vue'
import TradeCard from '@/components/trades/TradeCard.vue'
import TradeCreate from '@/components/trades/TradeCreate.vue'
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
