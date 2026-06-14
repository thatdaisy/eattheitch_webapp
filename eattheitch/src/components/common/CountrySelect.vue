<template>
  <div class="field">
    <label :for="id">{{ label }}</label>

    <select
      :id="id"
      :value="modelValue"
      @change="updateValue"
      :disabled="loading"
      class="country-select"
    >
      <option value="">
        {{ loading ? 'Loading countries…' : placeholder }}
      </option>

      <option
        v-for="country in countries"
        :key="country.code"
        :value="country.code"
      >
        {{ country.flag }} {{ country.name }}
      </option>
    </select>

    <div
      v-if="error"
      class="field-error"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiFetch } from '@/utils/api'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },

  label: {
    type: String,
    default: 'Country'
  },

  placeholder: {
    type: String,
    default: 'Select a country'
  },

  id: {
    type: String,
    default: 'country'
  }
})

const emit = defineEmits([
  'update:modelValue'
])

const countries = ref([])
const loading = ref(false)
const error = ref('')

async function loadCountries() {
  loading.value = true
  error.value = ''

  try {
    const res = await apiFetch('/countries')

    console.log('API DATA:', res)

    countries.value = res.data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load countries'
  } finally {
    loading.value = false
  }

  console.log('COUNTRIES VALUE:', countries.value)
}

function updateValue(event) {
  emit('update:modelValue', event.target.value)
}

onMounted(loadCountries)
</script>