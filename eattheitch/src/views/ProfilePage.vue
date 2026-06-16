<template>
  <div class="page-shell">
    <AppHeader :user="user" @logout="auth.logout" />

    <!-- Profile Content -->
    <div class="page-content single-column">
      <div class="content-section" v-if="user">
        <div class="section-header">
          <h2>My Profile</h2>
        </div>
        <MeCard :user="user" />
      </div>

      <div class="content-section">
        <div class="section-header">
          <h2>My Trades</h2>
        </div>
        <div v-if="loading">Loading...</div>
        <div v-for="trade in myTrades" v-bind:key="trade.ID">
          <TradeCard
            :trade="trade"
            :user="user"
          />
        </div>
        <p v-if="error">
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import MeCard from '@/components/auth/MeCard.vue'
import AppHeader from '@/components/common/AppHeader.vue'
import TradeCard from '@/components/trades/TradeCard.vue'
import { useAuthStore } from '@/stores/auth'
import { useTradesStore } from '@/stores/trades'
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const user = auth.user
const tradesStore = useTradesStore()
const { loading, error } = storeToRefs(tradesStore)
const myTrades = computed(() => tradesStore.tradesByAuthor(user.username))

onMounted(() => {
  tradesStore.initialize()
})
</script>

<style scoped></style>
