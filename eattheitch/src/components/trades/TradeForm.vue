<template>
  <input v-model="props.form.author" class="card-brand" disabled required hidden/>
  <span>{{ props.fieldErrors.author }}</span>
  <input v-model="props.form.brand_name" class="card-brand" placeholder="Brand" required/>
  <span>{{ props.fieldErrors.brand_name }}</span>
  <input v-model="props.form.location" class="card-item" placeholder="Location" required/>
  <span>{{ props.fieldErrors.location }}</span>
  <input v-model="props.form.title" class="card-item-bold" placeholder="Title" required/>
  <span>{{ props.fieldErrors.title }}</span>
  <textarea v-model="props.form.text" class="card-text" required></textarea>
  <span>{{ props.fieldErrors.text }}</span>
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
