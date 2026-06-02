<script setup>
defineProps({
  title: { type: String, required: true },
  organizer: { type: String, required: true },
  date: { type: String, required: true }
})

function showDetails() {
  alert('Event details coming soon!')
}
</script>

<template>
  <div class="event-card">
    <div class="card-left">
      <span class="card-title">{{ title }}</span>
      <span class="card-sub">{{ organizer }}</span>
    </div>
    <div class="card-right">
      <span class="card-date">Date {{ date }}</span>
      <button 
      class="btn-details"
      @click="showDetails"
      >Details
      </button>
    </div>
  </div>
</template>

<style scoped>
.event-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--clr-card-events);
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
  color: #2a2a2a;
}

.card-sub {
  font-size: 13px;
  color: #4a4030;
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
  color: #4a4030;
}

.btn-details {
  background: var(--clr-orange);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.btn-details:hover {
  background: var(--clr-orange-dark);
}
</style>
