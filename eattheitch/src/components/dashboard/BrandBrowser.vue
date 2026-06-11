<template>
  <div>
    <input v-model="search" type="text" placeholder="Search brands..." />

    <div class="brand-list">
      <button
        v-for="brand in filteredBrands"
        :key="brand.id"
        class="brand-card"
        @click="$emit('select', brand)"
      >
        <h3>{{ brand.name }}</h3>

        <p>{{ brand.country }}</p>

        <small> {{ brand.rating.toFixed(1) }}/5 community rating </small>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  brands: Array,
})

defineEmits(['select'])

const search = ref('')

const filteredBrands = computed(() =>
  props.brands.filter((brand) => brand.name.toLowerCase().includes(search.value.toLowerCase())),
)
</script>
