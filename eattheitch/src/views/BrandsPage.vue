<template>
  <div class="page-shell">
    <AppHeader :user="user" @logout="auth.logout" />

    <div class="main-content">
      <div class="content-left">
        <section class="content-section">
          <div class="section-header">
            <h2>Brands</h2>
          </div>
        </section>
      </div>

      <div class="content-right">
        <section class="content-section">
          <div class="section-header">
            <h2>New Review</h2>
          </div>
          <ReviewForm :user="user" :currentBrand="currentBrand" />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/common/AppHeader.vue'
import ReviewForm from '@/components/reviews/ReviewForm.vue'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const user = auth.user
const currentBrand = 'b0000015-0000-4000-8000-000000000015'
</script>
