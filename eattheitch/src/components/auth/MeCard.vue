<template>
  <div class="me-card">
    <div class="me-header">
      <div class="avatar">{{ user.username[0].toUpperCase() }}</div>
      <div>
        <div class="me-name">{{ user.username }}</div>
        <div class="me-email">{{ user.email }}</div>
      </div>
    </div>

    <div class="me-fields">
      <div class="me-row">
        <span class="me-key">User ID</span>
        <span class="me-val">{{ user.id }}</span>
      </div>

      <div class="me-row">
        <span class="me-key">Member since</span>
        <span class="me-val">{{ formatDate(user.created_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: Object,
  loading: Boolean,
  formatDate: Function,
})
</script>
