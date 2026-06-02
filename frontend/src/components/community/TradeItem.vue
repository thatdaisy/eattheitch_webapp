<script setup>
defineProps({
  title: { type: String, required: true },
  username: { type: String, required: true },
  date: { type: String, required: true }
})
</script>

<template>
  <div class="trade-card">
    <div class="card-left">
      <span class="card-title">{{ title }}</span>
      <span class="card-sub">{{ username }}</span>
    </div>
    <div class="card-right">
      <span class="card-date">created {{ date }}</span>
      <button class="btn-details">Details</button>
    </div>
  </div>
</template>

<style scoped>
.trade-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--clr-card-trade);
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
  color: #1a2e18;
}

.card-sub {
  font-size: 13px;
  color: #2a4228;
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
  color: #2a4228;
}

.btn-details {
  background: var(--clr-btn-dark);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.btn-details:hover {
  background: #1e3614;
}
</style>
