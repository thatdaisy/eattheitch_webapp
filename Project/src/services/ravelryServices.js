// Ravelry API – Basic Auth via a free API key pair from ravelry.com/pro
// Set credentials in .env (VITE_RAVELRY_USER / VITE_RAVELRY_KEY)

const BASE = 'https://api.ravelry.com'

function authHeader() {
  const user = import.meta.env.VITE_RAVELRY_USER
  const key = import.meta.env.VITE_RAVELRY_KEY
  if (!user || !key) return null
  return 'Basic ' + btoa(`${user}:${key}`)
}

function formatDate(isoString) {
  if (!isoString) return ''
  const d = new Date(isoString)
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`
}

export async function searchPatterns(query = '', pageSize = 4) {
  const auth = authHeader()
  if (!auth) return MOCK_PATTERNS

  try {
    const url = `${BASE}/patterns/search.json?query=${encodeURIComponent(query)}&sort=created&page_size=${pageSize}`
    const res = await fetch(url, { headers: { Authorization: auth } })
    if (!res.ok) return MOCK_PATTERNS
    const data = await res.json()
    return data.patterns.map(p => ({
      id: p.id,
      title: p.name,
      author: p.pattern_author?.name ?? 'Unknown',
      date: formatDate(p.published_at ?? p.created_at),
      permalink: p.permalink
    }))
  } catch {
    return MOCK_PATTERNS
  }
}

export async function searchYarns(query = '', pageSize = 4) {
  const auth = authHeader()
  if (!auth) return MOCK_YARNS

  try {
    const url = `${BASE}/yarns/search.json?query=${encodeURIComponent(query)}&sort=created&page_size=${pageSize}`
    const res = await fetch(url, { headers: { Authorization: auth } })
    if (!res.ok) return MOCK_YARNS
    const data = await res.json()
    return data.yarns.map(y => ({
      id: y.id,
      name: y.name,
      brand: y.yarn_company?.name ?? 'Unknown',
      permalink: y.permalink
    }))
  } catch {
    return MOCK_YARNS
  }
}


// ── Mock data (used when no Ravelry credentials are configured) ──────────────

const MOCK_PATTERNS = [
  { id: 1, title: 'Hawthorn Pullover', author: 'Elowen Maris', date: '10.04.2026', permalink: null },
  { id: 2, title: 'Scarf Thin', author: 'FiberNerd', date: '23.02.2026', permalink: null }
]

const MOCK_YARNS = [
  { id: 1, name: 'Cascade 220 Superwash', brand: 'Cascade Yarns', permalink: null },
  { id: 2, name: 'Malabrigo Rios', brand: 'Malabrigo', permalink: null }
]

export const MOCK_TRADES = [
  { id: 1, title: 'Cascade Superwash, used', username: 'WoolWitch', date: '20.04.2026' },
  { id: 2, title: 'Merri More, new', username: 'FiberNerd', date: '17.03.2026' }
]

export const MOCK_EVENTS = [
  { id: 1, title: 'Knitting Club', organizer: 'WoolWitch', date: '19.07.2026' }
]
