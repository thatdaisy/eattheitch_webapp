<template>
  <div class="card-base">
    <form @submit.prevent="submit">
      <div v-if="successMsg" class="success-message">
        {{ successMsg }}
      </div>

      <TradeForm :form="form" :field-errors="fieldErrors" />

      <div>
        <button class="form-btn-secondary" :disabled="loading">Create</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import TradeForm from './TradeForm.vue'
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useTradesStore } from '@/stores/trades'

const tradesStore = useTradesStore()

const props = defineProps({
  user: Object,
})
const { loading, fieldErrors, successMsg } = storeToRefs(tradesStore)

const form = reactive({
  author: props.user.username,
  brand_name: '',
  location: '',
  title: '',
  text: '',
})

async function submit() {
  await tradesStore.createTrade(form)
  Object.assign(form, {
    brand_name: '',
    location: '',
    title: '',
    text: '',
  })
  setTimeout(() => {
    tradesStore.successMsg = ''
  }, 1000)
}
</script>

<style scoped>
@import '../../styles/card-style.css';
@import '../../styles/form.css';

.success-message {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
}
</style>
