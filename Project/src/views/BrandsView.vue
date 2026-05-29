<script setup>
import { ref, onMounted } from 'vue'
import { searchYarns } from '@/services/ravelryServices.js'

const yarns = ref([])
const loading = ref(true)

onMounted(async () => {
  yarns.value = await searchYarns('', 10)
  loading.value = false
})
</script>

<template>
  <div class="brands-page">
    <div class="content">
      <a class="back-link" href="#">← back</a>
      <h2 class="section-title">Yarn Brands</h2>
      <div v-if="loading" class="loading">Loading yarns…</div>
      <div v-else class="yarn-list">
        <div
          v-for="yarn in yarns"
          :key="yarn.id"
          class="yarn-card"
        >
          <div class="yarn-info">
            <span class="yarn-name">{{ yarn.name }}</span>
            <span class="yarn-brand">{{ yarn.brand }}</span>
          </div>
          <button class="btn-details">Details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.brands-page {
  flex: 1;
}

.content {
  padding: 12px 16px 24px;
}

.back-link {
  display: inline-block;
  color: var(--clr-orange);
  font-size: 14px;
  text-decoration: none;
  margin-bottom: 16px;
}

.back-link:hover {
  text-decoration: underline;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 14px;
}

.yarn-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.yarn-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--clr-card-trade);
  border-radius: 10px;
  padding: 12px 14px;
}

.yarn-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.yarn-name {
  font-size: 16px;
  font-weight: 700;
  color: #1a2e18;
}

.yarn-brand {
  font-size: 13px;
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

.loading {
  font-size: 14px;
  color: #888;
  padding: 8px 0;
}
</style>
