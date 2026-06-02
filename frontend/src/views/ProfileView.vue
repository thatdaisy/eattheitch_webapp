<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import apiClient from '@/services/api'

const router = useRouter()
const userStore = useUserStore()

const profile = ref(null)
const favorites = ref([])
const editMode = ref(false)
const editUsername = ref('')
const editBio = ref('')
const newYarnName = ref('')
const newBrand = ref('')
const saving = ref(false)
const adding = ref(false)
const errorMsg = ref('')

onMounted(async () => {
  if (!userStore.isLoggedIn) return
  await loadProfile()
  await loadFavorites()
})

async function loadProfile() {
  const { data } = await apiClient.get('/profile')
  profile.value = data
}

async function loadFavorites() {
  const { data } = await apiClient.get('/favorites')
  favorites.value = data
}

function startEdit() {
  editUsername.value = profile.value.username
  editBio.value = profile.value.bio
  editMode.value = true
}

async function saveProfile() {
  saving.value = true
  errorMsg.value = ''
  try {
    const { data } = await apiClient.put('/profile', {
      username: editUsername.value,
      bio: editBio.value
    })
    profile.value = data
    editMode.value = false
  } catch {
    errorMsg.value = 'Could not save profile.'
  } finally {
    saving.value = false
  }
}

async function addFavorite() {
  if (!newYarnName.value.trim()) return
  adding.value = true
  try {
    const { data } = await apiClient.post('/favorites', {
      yarnName: newYarnName.value.trim(),
      brand: newBrand.value.trim() || 'Unknown'
    })
    favorites.value.push(data)
    newYarnName.value = ''
    newBrand.value = ''
  } finally {
    adding.value = false
  }
}

async function removeFavorite(id) {
  await apiClient.delete(`/favorites/${id}`)
  favorites.value = favorites.value.filter(f => f.id !== id)
}

function logout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="profile-page">
    <div class="content">
      <RouterLink class="back-link" to="/community">← back</RouterLink>
      <h2 class="section-title">Profile</h2>

      <!-- Not logged in -->
      <div v-if="!userStore.isLoggedIn" class="placeholder">
        <p>Sign in to manage your profile.</p>
        <div class="btn-wrapper">
          <button class="nav-btn" @click="router.push('/login')">Log In</button>
        </div>
      </div>

      <!-- Logged in -->
      <template v-else>

        <!-- Profile card -->
        <div class="card" v-if="profile">
          <div v-if="!editMode" class="profile-info">
            <p class="username">{{ profile.username }}</p>
            <p class="email">{{ profile.email }}</p>
            <p class="bio">{{ profile.bio || 'No bio yet.' }}</p>
            <div class="row">
              <button class="btn-secondary" @click="startEdit">Edit Profile</button>
              <button class="btn-logout" @click="logout">Log Out</button>
            </div>
          </div>

          <div v-else class="edit-form">
            <label>Username</label>
            <input v-model="editUsername" type="text" />
            <label>Bio</label>
            <textarea v-model="editBio" rows="3"></textarea>
            <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
            <div class="row">
              <button class="nav-btn" @click="saveProfile" :disabled="saving">
                {{ saving ? 'Saving…' : 'Save' }}
              </button>
              <button class="btn-secondary" @click="editMode = false">Cancel</button>
            </div>
          </div>
        </div>

        <!-- Favorites -->
        <h3 class="sub-title">My Yarn Favourites</h3>

        <div class="add-form card">
          <input v-model="newYarnName" type="text" placeholder="Yarn name" />
          <input v-model="newBrand" type="text" placeholder="Brand (optional)" />
          <button class="nav-btn" @click="addFavorite" :disabled="adding || !newYarnName.trim()">
            {{ adding ? 'Adding…' : '+ Add' }}
          </button>
        </div>

        <div v-if="favorites.length === 0" class="placeholder">
          <p>No favourites yet. Add one above!</p>
        </div>
        <div v-else class="fav-list">
          <div class="fav-card" v-for="fav in favorites" :key="fav.id">
            <div class="fav-info">
              <span class="fav-name">{{ fav.yarnName }}</span>
              <span class="fav-brand">{{ fav.brand }}</span>
            </div>
            <button class="btn-remove" @click="removeFavorite(fav.id)">✕</button>
          </div>
        </div>

      </template>
    </div>
  </div>
</template>

<style scoped>
.profile-page { flex: 1; }

.content { padding: 12px 16px 24px; }

.back-link {
  display: inline-block;
  color: var(--clr-orange);
  font-size: 14px;
  text-decoration: none;
  margin-bottom: 16px;
}
.back-link:hover { text-decoration: underline; }

.section-title { font-size: 20px; font-weight: 700; margin-bottom: 14px; }
.sub-title { font-size: 16px; font-weight: 700; margin: 20px 0 10px; }

.card {
  background: var(--clr-card-events);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 12px;
}

.placeholder {
  background: var(--clr-card-events);
  border-radius: 10px;
  padding: 20px;
  font-size: 15px;
  color: #4a4030;
}

.profile-info .username { font-size: 18px; font-weight: 700; margin-bottom: 2px; }
.profile-info .email { font-size: 13px; color: #666; margin-bottom: 8px; }
.profile-info .bio { font-size: 14px; color: #444; margin-bottom: 12px; }

.edit-form { display: flex; flex-direction: column; gap: 8px; }
.edit-form label { font-size: 13px; font-weight: 600; color: #3a4b6a; }
.edit-form input, .edit-form textarea {
  padding: 8px 10px;
  border: 1px solid #d1d9e6;
  border-radius: 8px;
  font-size: 14px;
  background: #f8fbff;
  resize: vertical;
}

.add-form { display: flex; flex-direction: column; gap: 8px; }
.add-form input {
  padding: 8px 10px;
  border: 1px solid #d1d9e6;
  border-radius: 8px;
  font-size: 14px;
  background: #f8fbff;
}

.row { display: flex; gap: 8px; margin-top: 8px; }

.fav-list { display: flex; flex-direction: column; gap: 8px; }
.fav-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--clr-card-trade);
  border-radius: 10px;
  padding: 10px 14px;
}
.fav-info { display: flex; flex-direction: column; gap: 2px; }
.fav-name { font-size: 15px; font-weight: 700; color: #1a2e18; }
.fav-brand { font-size: 12px; color: #2a4228; }

.btn-wrapper { display: flex; justify-content: center; margin-top: 12px; }

.nav-btn {
  padding: 8px 20px;
  background: var(--clr-orange);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.nav-btn:hover:not(:disabled) { background: var(--clr-orange-dark); }
.nav-btn:disabled { opacity: 0.6; cursor: default; }

.btn-secondary {
  padding: 8px 20px;
  background: #e8e8e8;
  color: #333;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.btn-secondary:hover { background: #d4d4d4; }

.btn-logout {
  padding: 8px 20px;
  background: transparent;
  color: #c0392b;
  border: 1px solid #c0392b;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.btn-logout:hover { background: #fdf0ef; }

.btn-remove {
  background: transparent;
  border: none;
  color: #c0392b;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
}
.btn-remove:hover { color: #a93226; }

.error { color: #d24f4f; font-size: 13px; }
</style>
