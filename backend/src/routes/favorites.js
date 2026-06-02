const express = require('express')
const { favorites, uuidv4 } = require('../data/db')
const { verifyToken } = require('../middleware/auth')

const router = express.Router()

// GET /api/favorites
router.get('/', verifyToken, (req, res) => {
  res.json(favorites.filter(f => f.userId === req.user.id))
})

// POST /api/favorites
router.post('/', verifyToken, (req, res) => {
  const { yarnName, brand } = req.body
  if (!yarnName) return res.status(400).json({ error: 'yarnName is required' })
  const fav = { id: uuidv4(), userId: req.user.id, yarnName, brand: brand || 'Unknown' }
  favorites.push(fav)
  res.status(201).json(fav)
})

// DELETE /api/favorites/:id
router.delete('/:id', verifyToken, (req, res) => {
  const idx = favorites.findIndex(f => f.id === req.params.id && f.userId === req.user.id)
  if (idx === -1) return res.status(404).json({ error: 'Favorite not found' })
  favorites.splice(idx, 1)
  res.status(204).send()
})

module.exports = router
