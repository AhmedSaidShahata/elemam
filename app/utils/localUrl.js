export const staticUrl =
  'https://dev.api.tenant.otas.spbeta.net/api/personalenglish'

export const getHost = () => {
  if (import.meta.server) {
    const headers = useRequestHeaders(['host'])
    return headers.host || ''
  }

  if (import.meta.client) {
    return window.location.host
  }

  return ''
}

export const checkLocal = () => {
  const host = getHost()

  return (
    host === 'localhost:3000' ||
    host === '127.0.0.1:3000'
  )
}