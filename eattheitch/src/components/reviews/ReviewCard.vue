<template>
  <div class="card-base">
    <div class="card-inline">
      <div class="author">{{ review.author }}</div>
      <div class="date">{{ formatDate(review.created_at) }}</div>
    </div>
    <div>
      <div v-if="isEditing">
      </div>
      <div v-else>
        <div class="card-brand">{{ review.brand }}</div>
        <p class="card-text">
          {{ review.text }}
        </p>
      </div>
    </div>

    <div v-if="isOwner" class="card-actions">
      <div v-if="isEditing">
        <button class="form-btn-icon" @click="saveEdit"><SaveIcon /></button>
        <button class="form-btn-icon" @click="cancelEdit"><CancelIcon /></button>
      </div>
      <div v-else>
        <button class="form-btn-icon" @click="startEdit"><EditIcon /></button>
        <button class="form-btn-icon" @click="remove"><BinIcon /></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BinIcon from '../icons/BinIcon.vue'
import EditIcon from '../icons/EditIcon.vue'
import SaveIcon from '../icons/SaveIcon.vue'
import CancelIcon from '../icons/CancelIcon.vue'
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { formatDate } from '@/utils/formatter'
import { useReviewsStore } from '@/stores/reviews.js'

const props = defineProps({
  review: Object,
  user: Object,
})

const reviewsStore = useReviewsStore()
const {fieldErrors} = storeToRefs(reviewsStore)

const isOwner = computed(() => {
  return props.user.username === props.review.author
})

const isEditing = ref(false)

const editForm = reactive({
  brand_name: '',
  location: '',
  title: '',
  text: '',
})

const startEdit = () => {
  editForm.author = props.review.author
  editForm.brand_name = props.review.brand_name
  editForm.location = props.review.location
  editForm.title = props.review.title
  editForm.text = props.review.text
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
}

const remove = async () => {
  await reviewsStore.deleteReview(props.review.id)
}

const saveEdit = async () => {
  await reviewsStore.updateReview(props.review.id, { ...editForm })
  isEditing.value = false
}
</script>

<style scoped>
@import '../../styles/card-style.css';
@import '../../styles/form.css';
</style>
