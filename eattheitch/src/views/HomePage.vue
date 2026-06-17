<template>
  <div class="page-shell">
    <AppHeader :user="user" @logout="auth.logout" />

    <div class="main-content">
      <div class="content-left">
        <section class="content-section">
          <div class="section-header">
            <h2>Latest Reviews</h2>
          </div>
          <div v-for="review in latestReviews" v-bind:key="review.id">
            <ReviewOverview 
            :review="review"
            />
          </div>
        </section>
      </div>

      <div class="content-right">
        <section class="content-section">
          <div class="section-header">
            <h2>New Trades</h2>
          </div>
          <div v-for="trade in latestTrades" v-bind:key="trade.id">
            <TradeOverview 
            :trade="trade"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/common/AppHeader.vue'
import ReviewOverview from '@/components/reviews/ReviewOverview.vue'
import TradeOverview from '@/components/trades/TradeOverview.vue'
import { useAuthStore } from '@/stores/auth'
import { useReviewsStore } from '@/stores/reviews'
import { useTradesStore } from '@/stores/trades'
import { onMounted, computed} from 'vue'

const reviewsStore = useReviewsStore()
const latestReviews = computed(() => reviewsStore.latestReviews(3))
const tradesStore = useTradesStore()
const latestTrades = computed(() => tradesStore.latestTrades(3))

const auth = useAuthStore()
const user = auth.user

onMounted(() => {
  reviewsStore.initialize()
  tradesStore.initialize()
})
</script>
