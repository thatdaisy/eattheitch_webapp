require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoutes = require('./src/routes/auth')
const profileRoutes = require('./src/routes/profile')
const favoritesRoutes = require('./src/routes/favorites')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/favorites', favoritesRoutes)

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
