<template>
  <div>
    <article v-for="rating in ratings" :key="rating.id" class="rating-card">
      <h3>
        {{ rating.brand }}
      </h3>

      <p>
        {{ rating.review }}
      </p>

      <strong> {{ rating.score }}/5 </strong>
    </article>
  </div>
</template>

<script setup>
defineProps({
  ratings: Array,
})
</script>
