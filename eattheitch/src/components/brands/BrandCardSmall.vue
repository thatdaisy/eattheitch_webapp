<template>
  <div >

  </div>
  <div class="card-base-selected">
    <div class="card-inline">
      <div class="card-brand">{{ brand.name }}</div>

      <button class="form-btn-icon" @click="select"><MoreIcon /></button>
    </div>
    <div>
      <div class="card-inline">
        <div class="card-item-bold">ECO Score: {{ brand.eco_score }}</div>
        <div class="card-item">{{ brand.origin_country }}</div>
      </div>
      <div class="card-text">{{ brand.description }}</div>
    </div>
  </div>
</template>

<script setup>
import MoreIcon from '../icons/MoreIcon.vue'
import { useBrandsStore } from '@/stores/brands.js'

const props = defineProps({
  brand: Object,
  selectedBrand: Object,
})

const brandsStore = useBrandsStore()

const select = async () => {
  await brandsStore.setSelectedBrandById(props.brand.id)
}

</script>

<style scoped>
@import '../../styles/card-style.css';
@import '../../styles/form.css';
</style>
