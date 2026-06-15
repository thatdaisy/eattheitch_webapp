<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useReviewsStore } from '@/stores/reviews'

const auth = useAuthStore()
const reviews = useReviewsStore()

onMounted(() => {
  auth.initialize()
  reviews.initialize()
})
</script>
