<script setup>
defineProps({
  title: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  permalink: { type: String, default: null }
})
</script>

<template>
  <div class="pattern-card">
    <div class="card-left">
      <span class="card-title">{{ title }}</span>
      <span class="card-sub">{{ author }}</span>
    </div>
    <div class="card-right">
      <span class="card-date">published {{ date }}</span>
      <a
        v-if="permalink"
        :href="`https://www.ravelry.com/patterns/library/${permalink}`"
        target="_blank"
        class="btn-details"
      >Details</a>
      <button v-else class="btn-details">Details</button>
    </div>
  </div>
</template>

<style scoped>
.pattern-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--clr-card-pattern);
  border-radius: 10px;
  padding: 12px 14px;
  gap: 8px;
}

.card-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}

.card-sub {
  font-size: 13px;
  color: #f0d4c4;
}

.card-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
}

.card-date {
  font-size: 12px;
  color: #f0d4c4;
}

.btn-details {
  display: inline-block;
  background: var(--clr-btn-dark);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
}

.btn-details:hover {
  background: #1e3614;
}
</style>
