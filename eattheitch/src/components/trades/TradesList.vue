<template>
  
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTradesStore } from '@/stores/trades'

const tradesStore = useTradesStore()

const { trades, loading, error } = storeToRefs(tradesStore)

onMounted(() => {
  tradesStore.initialize()
})

function remove(id) {
  tradesStore.deleteTrade(id)
}
</script>
