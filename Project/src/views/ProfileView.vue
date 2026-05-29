<script setup>
</script>

<template>
  <div class="profile-page">
    <div class="content">
      <a class="back-link" href="#">← back</a>
      <h2 class="section-title">Profile</h2>
      <div class="placeholder">
        <p>Sign in with your Ravelry account to manage your profile.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
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

.placeholder {
  background: var(--clr-card-events);
  border-radius: 10px;
  padding: 20px;
  font-size: 15px;
  color: #4a4030;
}
</style>
