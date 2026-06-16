<template>
  <div class="field">
    <select
      :value="modelValue"
      @change="updateValue"
      :disabled="loading"
      class="country-select"
    >
      <option value="">
        {{ loading ? 'Loading countries…' : props.placeholder }}
      </option>

      <option v-for="country in countries" :key="country.code" :value="country.name">
        {{ country.flag }} {{ country.name }}
      </option>
    </select>

    <div v-if="error" class="field-error">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCountriesStore } from '@/stores/countries'

const countriesStore = useCountriesStore()
const {countries, loading, error } = storeToRefs(countriesStore)

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Select a country',
  },
  modelValue: {
    type: String,
    default: '',
  },
  selectedCountryName: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

watch(
  () => [countries.value, props.selectedCountryName],
  ([list, selectedName]) => {
    if (!list.length || !selectedName) return

    const match = list.find((c) => c.name.toLowerCase() === selectedName.toLowerCase())

    if (match) {
      emit('update:modelValue', match.name)
    }
  },
  { immediate: true },
)

function updateValue(event) {
  emit('update:modelValue', event.target.value)
}

onMounted(() => {
  countriesStore.initialize()
})
</script>

<style scoped>
@import '../../styles/card-style.css';
@import '../../styles/form.css';
</style>
