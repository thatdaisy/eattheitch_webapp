<template>
  <div class="card-base">
    <div class="card-header">
      <div class="author">{{ trade.author }}</div>
      <div class="date">{{ formatDate(trade.created_at) }}</div>
    </div>
    <div>
      <div v-if="isEditing">
        <TradeForm :form="editForm" :field-errors="fieldErrors"/>
      </div>
      <div v-else>
        <div class="card-brand">{{ trade.brand_name }}</div>
        <div class="card-item">{{ trade.location }}</div>
        <div class="card-item-bold">{{ trade.title }}</div>
        <p class="card-text">
          {{ trade.text }}
        </p>
      </div>
    </div>

    <div v-if="isOwner" class="card-actions">
      <template v-if="isEditing">
        <button class="form-btn-icon" @click="saveEdit"><SaveIcon /></button>
        <button class="form-btn-icon" @click="cancelEdit"><CancelIcon /></button>
      </template>
      <template v-else>
        <button class="form-btn-icon" @click="startEdit"><EditIcon /></button>
        <button class="form-btn-icon" @click="remove"><BinIcon /></button>
      </template>
    </div>
  </div>
</template>

<script setup>
import TradeForm from './TradeForm.vue'
import BinIcon from '../icons/BinIcon.vue'
import EditIcon from '../icons/EditIcon.vue'
import SaveIcon from '../icons/SaveIcon.vue'
import CancelIcon from '../icons/CancelIcon.vue'
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { formatDate } from '@/utils/formatter'
import { useTradesStore } from '@/stores/trades.js'

const props = defineProps({
  trade: Object,
  user: Object,
})

const tradesStore = useTradesStore()
const {fieldErrors} = storeToRefs(tradesStore)

const isOwner = computed(() => {
  return props.user.username === props.trade.author
})

const isEditing = ref(false)

const editForm = reactive({
  brand_name: '',
  location: '',
  title: '',
  text: '',
})

const startEdit = () => {
  editForm.author = props.trade.author
  editForm.brand_name = props.trade.brand_name
  editForm.location = props.trade.location
  editForm.title = props.trade.title
  editForm.text = props.trade.text
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
}

const remove = async () => {
  await tradesStore.deleteTrade(props.trade.id)
}

const saveEdit = async () => {
  await tradesStore.updateTrade(props.trade.id, { ...editForm })
  isEditing.value = false
}
</script>

<style scoped>
@import '../../styles/card-style.css';
@import '../../styles/form.css';
</style>
