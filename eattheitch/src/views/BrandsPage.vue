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
            <BrandCardSmall :brand="brand" />
          </div>
          <p v-if="error">
            {{ error }}
          </p>
        </section>
      </div>

      <div class="content-right" v-if="selectedBrand">
        <section class="content-section">
          <div>
            <BrandCardSmall :brand="selectedBrand" />
          </div>

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
import BrandCardSmall from '@/components/brands/BrandCardSmall.vue'
import ReviewForm from '@/components/reviews/ReviewForm.vue'
import { useAuthStore } from '@/stores/auth'
import { useBrandsStore } from '@/stores/brands'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const brandsStore = useBrandsStore()

const currentBrand = 'b0000015-0000-4000-8000-000000000015'
const { user } = storeToRefs(auth)
const { brands, loading, error, selectedBrand } = storeToRefs(brandsStore)

onMounted(() => {
  brandsStore.initialize()
})
</script>
