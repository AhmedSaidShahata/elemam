import { useHead } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const getCanonicalBaseUrl = () => {
    if (process.env.NODE_ENV !== 'production') {
        return ''
    }

    const req = nuxtApp.ssrContext?.event?.req
    const headers = req?.headers || {}

    const serverHost = headers['x-forwarded-host'] || headers.host
    const serverProtocol = headers['x-forwarded-proto'] || 'https'
    const clientOrigin = process.client ? window.location.origin : ''
    const serverOrigin = serverHost ? `${serverProtocol}://${serverHost}` : ''

    return (serverOrigin || clientOrigin || '').replace(/\/$/, '')
  }

  const updateCanonical = () => {
    if (process.env.NODE_ENV !== 'production') {
      return
    }

    const route = nuxtApp.$router?.currentRoute?.value
    const path = route?.path || '/'
    const baseUrl = getCanonicalBaseUrl()

    useHead({
      link: [
        {
          key: 'canonical',
          rel: 'canonical',
          href: `${baseUrl}${path}`,
        },
      ],
    })
  }

  nuxtApp.hook('page:finish', updateCanonical)
  updateCanonical()
})
