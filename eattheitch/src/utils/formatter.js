export function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-AT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
