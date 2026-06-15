<template>
  <div class="page-shell">
    <AppHeader :user="user" @logout="auth.logout" />

    <div class="main-content">
      <div class="content-left">
        <section class="content-section">
          <div class="section-header">
            <h2>Latest Reviews</h2>
          </div>
          <ReviewCardSmall />
        </section>
      </div>

      <div class="content-right">
        <section class="content-section">
          <div class="section-header">
            <h2>New Trades</h2>
          </div>
          <TradeCardSmall />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/common/AppHeader.vue'
import ReviewCardSmall from '@/components/home/ReviewCardSmall.vue'
import TradeCardSmall from '@/components/home/TradeCardSmall.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const user = auth.user
</script>
