<template>
  <div class="card-base">
    <div v-if="loading" class="status">Loading trades...</div>
    <div v-else-if="error" class="status error">{{ error }}</div>

    <div v-else class="card-element" v-for="trade in visibleTrades" :key="trade.id">
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { apiFetch } from '@/utils/api'
import { formatDate } from '@/utils/formatter'

const trades = ref([])
const loading = ref(false)
const error = ref('')

const visibleTrades = computed(() => trades.value.slice(0, 3))

async function loadTrades() {
  loading.value = true
  error.value = ''

  try {
    const res = await apiFetch('/trades')
    trades.value = res.data.trades ?? res.data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load trades'
  } finally {
    loading.value = false
  }
}

onMounted(loadTrades)
</script>

<style scoped>
@import '../../styles/card-style.css';
</style>
