const express = require('express')
const { users } = require('../data/db')
const { verifyToken } = require('../middleware/auth')

const router = express.Router()

// GET /api/profile
router.get('/', verifyToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json({ id: user.id, email: user.email, username: user.username, bio: user.bio })
})

// PUT /api/profile
router.put('/', verifyToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  const { username, bio } = req.body
  if (username) user.username = username
  if (bio !== undefined) user.bio = bio
  res.json({ id: user.id, email: user.email, username: user.username, bio: user.bio })
})

module.exports = router
