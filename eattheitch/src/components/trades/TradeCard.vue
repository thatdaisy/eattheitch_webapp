<template>
  <div class="card-base">
    <div class="card-header">
      <div class="author">{{ trade.author }}</div>
      <div class="date">{{ formatDate(trade.created_at) }}</div>
    </div>
    <div>
      <template v-if="isEditing">
        <input v-model="editForm.brand_name" class="card-brand" />
        <input v-model="editForm.location" class="card-item" />
        <input v-model="editForm.title" class="card-item-bold" />
        <textarea v-model="editForm.text" class="card-text"></textarea>
      </template>
      <template v-else>
        <div class="card-brand">{{ trade.brand_name }}</div>
        <div class="card-item">{{ trade.location }}</div>
        <div class="card-item-bold">{{ trade.title }}</div>
        <p class="card-text">
          {{ trade.text }}
        </p>
      </template>
    </div>

    <div v-if="isOwner" class="card-actions">
      <template v-if="isEditing">
        <button class="form-btn-icon" @click="saveEdit"><SaveIcon /></button>
        <button class="form-btn-icon" @click="cancelEdit"><CancelIcon /></button>
      </template>
      <template v-else>
        <button class="form-btn-icon" @click="startEdit"><EditIcon /></button>
        <button class="form-btn-icon" @click="$emit('delete', trade.id)"><BinIcon /></button>
      </template>
    </div>
  </div>
</template>

<script setup>
import BinIcon from '../icons/BinIcon.vue'
import EditIcon from '../icons/EditIcon.vue'
import SaveIcon from '../icons/SaveIcon.vue'
import CancelIcon from '../icons/CancelIcon.vue'
import { formatDate } from '@/utils/formatter'
import { computed, reactive, ref } from 'vue'
import { useTradesStore } from '@/stores/trades.js'

const props = defineProps({
  trade: Object,
  user: Object,
})

const emit = defineEmits(['delete'])

const tradeStore = useTradesStore()

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
  editForm.brand_name = props.trade.brand_name
  editForm.location = props.trade.location
  editForm.title = props.trade.title
  editForm.text = props.trade.text
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
}

const saveEdit = async () => {
  await tradeStore.updateTrade(props.trade.id, { ...editForm })
  isEditing.value = false
}
</script>

<style scoped>
@import '../../styles/card-style.css';
@import '../../styles/form.css';
</style>