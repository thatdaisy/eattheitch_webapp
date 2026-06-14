<template>
    <header class="page-header">
        <div class="header-top">
            <div class="brand">
                <div class="brand-name">eat the itch</div>
                <div class="brand-sub">conscious crafting</div>

                <div class="welocme-back">Welcome back {{ user.username }}</div>
            </div>
            <button class="logout-btn" @click="$emit('logout')">Sign Out</button>
        </div>

        <MainNavigation/>
    </header>
</template>

<script setup>
import MainNavigation from '@/components/common/MainNavigation.vue'

defineProps({
  user: Object
})
defineEmits(['logout'])
</script>