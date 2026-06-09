export async function apiFetch(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  const res = await fetch(url, { ...options, headers })
  const data = res.status === 204 ? null : await res.json()

  return {
    ok: res.ok,
    status: res.status,
    data,
  }
}
