<script setup>
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => ['all']
  }
})
const emit = defineEmits(['update:modelValue'])

const OPTIONS = ['all', 'Trade', 'Pattern', 'Events']

function toggle(option) {
  if (option === 'all') {
    emit('update:modelValue', ['all'])
    return
  }
  let next = props.modelValue.filter(v => v !== 'all')
  const idx = next.indexOf(option)
  if (idx >= 0) next.splice(idx, 1)
  else next.push(option)
  emit('update:modelValue', next.length ? next : ['all'])
}

function isChecked(option) {
  return props.modelValue.includes(option)
}
</script>

<template>
  <div class="filter-bar">
    <label
      v-for="opt in OPTIONS"
      :key="opt"
      class="filter-label"
      :class="{ checked: isChecked(opt) }"
    >
      <input
        type="checkbox"
        :checked="isChecked(opt)"
        @change="toggle(opt)"
      />
      {{ opt }}
    </label>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 10px 16px 12px;
  background: var(--clr-filter-bar);
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #e8e0d4;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
}

.filter-label input[type='checkbox'] {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #e8e0d4;
  border-radius: 3px;
  background: transparent;
  cursor: pointer;
  position: relative;
}

.filter-label.checked input[type='checkbox'] {
  background: var(--clr-orange);
  border-color: var(--clr-orange);
}

.filter-label.checked input[type='checkbox']::after {
  content: '';
  display: block;
  position: absolute;
  top: 1px;
  left: 4px;
  width: 5px;
  height: 9px;
  border: 2px solid #fff;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
}
</style>
