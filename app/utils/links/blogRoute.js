export default function blogRoute(link = '') {
  if (!link) return { name: 'blogs' }

  if (typeof link === 'object' && link !== null) {
    return link
  }

  const value = String(link).trim()

  if (!value) return { name: 'blogs' }

  const normalized = value.replace(/^\/+/, '').replace(/^blogs\//, '')

  return {
    name: 'blogs-id',
    params: { id: normalized },
  }
}
