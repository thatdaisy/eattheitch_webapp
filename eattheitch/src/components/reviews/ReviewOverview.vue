<template>
  <div class="card-base">
    <div class="card-inline">
      <div class="author">{{ review.author }}</div>
      <div class="date">{{ formatDate(review.created_at) }}</div>
    </div>
    <div>
      <div class="card-inline">
        <div class="card-brand">{{ review.brand }}</div>
        <div class="card-item">{{ review.rating_overall }} / 5 <SheepIcon /></div>
      </div>

      <p class="card-text">
        {{ review.text }}
      </p>
    </div>
  </div>
</template>

<script setup>
import SheepIcon from '../icons/SheepIcon.vue'
import { formatDate } from '@/utils/formatter'
const props = defineProps({
  review: Object,
})
</script>

<style scoped>
@import '../../styles/card-style.css';
</style>
