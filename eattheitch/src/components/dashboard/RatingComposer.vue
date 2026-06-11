<template>
  <form @submit.prevent="submit">
    <p v-if="!brand">Select a brand to review.</p>

    <template v-else>
      <p>Reviewing {{ brand.name }}</p>

      <label> Overall rating </label>

      <input v-model.number="score" type="range" min="1" max="5" />

      <span>{{ score }}/5</span>

      <label> Your review </label>

      <textarea v-model="review" rows="5" />

      <button>Publish review</button>
    </template>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  brand: Object,
})

const emit = defineEmits(['submit'])

const score = ref(5)
const review = ref('')

function submit() {
  emit('submit', {
    brandId: props.brand.id,
    score: score.value,
    review: review.value,
  })

  review.value = ''
  score.value = 5
}
</script>
