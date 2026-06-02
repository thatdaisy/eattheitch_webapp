const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

// In-memory store — data resets on server restart
const users = [
  {
    id: 'seed-1',
    email: 'demo@eattheitch.com',
    passwordHash: bcrypt.hashSync('password123', 10),
    username: 'WoolWitch',
    bio: 'Knitting since forever'
  }
]

const favorites = [
  { id: 'fav-1', userId: 'seed-1', yarnName: 'Cascade 220 Superwash', brand: 'Cascade Yarns' }
]

module.exports = { users, favorites, uuidv4 }
