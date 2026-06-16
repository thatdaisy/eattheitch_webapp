<template>
  <div class="page-shell">
    <AppHeader :user="user" @logout="auth.logout" />

    <div class="main-content">
      <div class="content-left">
        <section class="content-section">
          <div class="section-header">
            <h2>Brands</h2>
          </div>
          <div v-if="loading">Loading...</div>
          <div v-for="brand in brands" v-bind:key="brand.id">
            <BrandCardSmall :brand="brand" :selected-brand="selectedBrand"/>
          </div>
          <p v-if="error">
            {{ error }}
          </p>
        </section>
      </div>

      <div class="content-right" v-if="selectedBrand">
        <section class="content-section">
          <div class="section-header">
            <h2>Details</h2>
          </div>
          <div>
            <BrandCard :brand="selectedBrand" />
          </div>

          <div class="section-header">
            <h2>New Review</h2>
          </div>
          <ReviewForm :user="user" />
        </section>
        <section class="content-section" v-if="selectedBrand">
          <div class="section-header">
            <h2>Details</h2>
          </div>
          <div>
            <BrandCard :brand="selectedBrand" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/common/AppHeader.vue'
import BrandCardSmall from '@/components/brands/BrandCardSmall.vue'
import BrandCard from '@/components/brands/BrandCard.vue'
import ReviewForm from '@/components/reviews/ReviewForm.vue'
import { useAuthStore } from '@/stores/auth'
import { useBrandsStore } from '@/stores/brands'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const brandsStore = useBrandsStore()

const { user } = storeToRefs(auth)
const { brands, loading, error, selectedBrand } = storeToRefs(brandsStore)

onMounted(() => {
  brandsStore.initialize()
})
</script>
