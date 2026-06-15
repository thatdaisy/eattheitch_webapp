<template>
  <div class="card-base">
    <div class="card-header">
      <div class="author">{{ trade.author }}</div>
      <div class="date">{{ formatDate(trade.created_at) }}</div>
    </div>
    <div>
      <div class="card-brand">{{ trade.brand_name }}</div>
      <div class="card-item">{{ trade.location }}</div>
      <div class="card-item-bold">{{ trade.title }}</div>
      <p class="card-text">
        {{ trade.text }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from '@/utils/formatter'

const props = defineProps({
  trade: Object,
})
</script>

<style scoped>
@import '../../styles/card-style.css';
</style>
