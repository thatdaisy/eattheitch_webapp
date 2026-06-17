<template>
  <div
    class="star-rating"
    role="radiogroup"
    :aria-label="ariaLabel"
  >
    <button
      v-for="star in max"
      :key="star"
      type="button"
      class="star"
      role="radio"
      :aria-checked="star === modelValue"
      :aria-label="`${star} star${star > 1 ? 's' : ''}`"
      :disabled="readonly"
      :style="{ fontSize: size }"
      @click="select(star)"
      @mouseenter="hover = star"
      @mouseleave="hover = 0"
    >
      <span :class="{ filled: star <= (hover || modelValue) }">★</span>
    </button>

    <span v-if="showValue" class="value-label">
      {{ modelValue }} / {{ max }}
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  max: {
    type: Number,
    default: 5
  },
  readonly: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: '2rem'
  },
  showValue: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: 'Star rating'
  }
})

const modelValue = defineModel({
  type: Number,
  default: 0
})

const hover = ref(0)

function select(star) {
  if (props.readonly) return
  modelValue.value = star
}
</script>

<style scoped>
.star-rating {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.star {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  line-height: 1;
  color: #d1d5db;
  transition: transform 0.1s ease, color 0.15s ease;
}

.star:disabled {
  cursor: default;
}

.star:not(:disabled):hover {
  transform: scale(1.15);
}

.star .filled {
  color: #fbbf24; /* filled star color */
}

.value-label {
  margin-left: 0.5rem;
  font-size: 0.9rem;
  color: #6b7280;
}
</style>