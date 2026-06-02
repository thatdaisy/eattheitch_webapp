const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { users, uuidv4 } = require('../data/db')
const { JWT_SECRET } = require('../middleware/auth')


const router = express.Router()

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password, username } = req.body
  if (!email || !password || !username) {
    return res.status(400).json({ error: 'email, password and username are required' })
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'Email already registered' })
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const user = { id: uuidv4(), email, passwordHash, username, bio: '' }
  users.push(user)
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' })
  res.status(201).json({ token, user: { id: user.id, email: user.email, username: user.username } })
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' })
  res.json({ token, user: { id: user.id, email: user.email, username: user.username } })
})

module.exports = router
