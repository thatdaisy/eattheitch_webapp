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

    <div v-if="isOwner" class="card-actions">
      <button class="form-btn-icon" @click="$emit('edit', trade)"><EditIcon /></button>
      <button class="form-btn-icon" @click="$emit('delete', trade.id)"><BinIcon /></button>
    </div>
  </div>
</template>

<script setup>
import BinIcon from '../icons/BinIcon.vue'
import EditIcon from '../icons/EditIcon.vue'
import { formatDate } from '@/utils/formatter'
import { computed } from 'vue'

const props = defineProps({
  trade: Object,
  user: Object,
})

const emit = defineEmits(['edit', 'delete'])

const isOwner = computed(() => {
  return props.user.username === props.trade.author
})
</script>

<style scoped>
@import '../../styles/card-style.css';
@import '../../styles/form.css';
</style>
