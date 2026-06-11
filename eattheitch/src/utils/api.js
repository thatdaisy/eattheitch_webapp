const API_BASE = 'http://localhost:8080'

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  let data = null

  if (res.status !== 204) {
    try {
      data = await res.json()
    } catch {
      data = null
    }
  }

  return {
    ok: res.ok,
    status: res.status,
    data,
  }
}
