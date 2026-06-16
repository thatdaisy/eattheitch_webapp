<template>
  <div class="me-card">
    <div v-if="successMsg" class="success-flash">{{ successMsg }}</div>
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
      <div class="me-row">
        <span class="me-key">Location</span>
        <CountrySelect v-model="profileForm.country" :selected-country-name="user.location"/>
        <button class="form-btn-icon" @click="save"><SaveIcon /></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import CountrySelect from '@/components/common/CountrySelect.vue'
import SaveIcon from '../icons/SaveIcon.vue';
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { formatDate } from '@/utils/formatter.js';
import { storeToRefs } from 'pinia'

const auth = useAuthStore()
const { successMsg } =  storeToRefs(auth)

const profileForm = reactive({
  country: '',
})

const props = defineProps({
  user: Object
})

const save = async () => {
  await auth.updateUser(props.user.id, { "location":  profileForm.country})
}
</script>

<style scoped>
@import '../../styles/card-style.css';
@import '../../styles/form.css';
</style>