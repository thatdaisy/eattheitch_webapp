<template>
  <div class="page-shell">
    <AppHeader :user="user" @logout="auth.logout" />

    <!-- Profile Content -->
    <div class="page-content single-column">
      <div class="content-section" v-if="user">
        <div class="section-header">
          <h2>My Profile</h2>
        </div>
        <MeCard
          :user="user"
          :loading="auth.loading"
          :formatDate="formatDate"
          @logout="handleLogout"
        />
        <CountrySelect v-model="profileForm.country" />
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
            @edit="handleEdit"
            @delete="tradesStore.deleteTrade"
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
import { useAuthStore } from '@/stores/auth'
import { useTradesStore } from '@/stores/trades'
import MeCard from '@/components/auth/MeCard.vue'
import AppHeader from '@/components/common/AppHeader.vue'
import { onMounted, computed, reactive } from 'vue'
import CountrySelect from '@/components/common/CountrySelect.vue'
import { formatDate } from '@/utils/formatter'
import TradeCard from '@/components/trades/TradeCard.vue'

const profileForm = reactive({
  country: '',
})

const auth = useAuthStore()
const user = auth.user
const tradesStore = useTradesStore()
console.log('username: ', user.username)
const myTrades = computed(() => tradesStore.tradesByAuthor(user.username))

onMounted(() => {
  tradesStore.initialize()
})
</script>

<style scoped></style>
