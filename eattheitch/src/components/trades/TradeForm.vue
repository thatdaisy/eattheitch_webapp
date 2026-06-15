<template>
  <input v-model="form.author" class="card-brand" disabled required hidden/>
  <span>{{ fieldErrors.author }}</span>
  <input v-model="form.brand_name" class="card-brand" placeholder="Brand" required/>
  <span>{{ fieldErrors.brand_name }}</span>
  <input v-model="form.location" class="card-item" placeholder="Location" required/>
  <span>{{ fieldErrors.location }}</span>
  <input v-model="form.title" class="card-item-bold" placeholder="Title" required/>
  <span>{{ fieldErrors.title }}</span>
  <textarea v-model="form.text" class="card-text" required></textarea>
  <span>{{ fieldErrors.text }}</span>
</template>

<script setup>
const props = defineProps({
  form: Object,
  fieldErrors: Object
})
</script>

<style scoped>
@import '../../styles/card-style.css';
@import '../../styles/form.css';
</style>
