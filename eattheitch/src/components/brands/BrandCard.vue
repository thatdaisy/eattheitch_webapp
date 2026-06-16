<template>
  <div class="card-base">
    <div class="card-inline">
      <div class="card-brand">{{ brand.name }}</div>
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

const props = defineProps({
  brand: Object
})

</script>

<style scoped>
@import '../../styles/card-style.css';
@import '../../styles/form.css';
</style>
