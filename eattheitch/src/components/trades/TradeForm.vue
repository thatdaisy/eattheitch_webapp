<template>
  <form @submit.prevent="submit">
    <div v-if="successMsg" class="success-message">
      {{ successMsg }}
    </div>

    <input v-model="form.author" placeholder="Author" disabled hidden />
    <span>{{ fieldErrors.author }}</span>

    <input v-model="form.brand_name" placeholder="Brand" />
    <span>{{ fieldErrors.brand_name }}</span>

    <input v-model="form.location" placeholder="Location" />
    <span>{{ fieldErrors.location }}</span>

    <input v-model="form.title" placeholder="Title" />
    <span>{{ fieldErrors.title }}</span>

    <textarea v-model="form.text" />

    <button :disabled="loading">
      {{ selectedTrade ? 'Update' : 'Create' }}
    </button>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTradesStore } from '@/stores/trades'

const tradesStore = useTradesStore()

const props = defineProps({
  user: Object,
})

const { selectedTrade, loading, fieldErrors, successMsg } = storeToRefs(tradesStore)

const form = reactive({
  author: props.user.username,
  brand_name: '',
  location: '',
  title: '',
  text: '',
})

watch(
  selectedTrade,
  (trade) => {
    if (!trade) {
      Object.assign(form, {
        author: props.user.username,
        brand_name: '',
        location: '',
        title: '',
        text: '',
      })
      return
    }

    Object.assign(form, {
      author: trade.author,
      brand_name: trade.brand_name,
      location: trade.location,
      title: trade.title,
      text: trade.text ?? '',
    })
  },
  { immediate: true },
)

async function submit() {
  if (selectedTrade.value) {
    await tradesStore.updateTrade(selectedTrade.value.id, form)
  } else {
    await tradesStore.createTrade(form)
    Object.assign(form, {
      author: '',
      brand_name: '',
      location: '',
      title: '',
      text: '',
    })
    setTimeout(() => {
      tradesStore.successMsg = ''
    }, 1000)
  }
}
</script>

<style>
.success-message {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
}
</style>
