import api from '~/axios'
import { useServerCookies } from '~/composables/useServerCookies'
import { useRequestURL } from '#app'

export default defineNuxtPlugin(async () => {
  if (process.server) {
    let cookies = await useServerCookies()

    let locale = cookies._lang

    // If cookie is missing or empty, derive locale from URL path.
    if (!locale || locale.trim() === '') {
      const { pathname } = useRequestURL()
      locale = pathname.startsWith('/en') ? 'en' : 'ar'
    }

    // Build per-request headers object to inject into each axios call
    const requestHeaders = {
      "X-locale": locale,
      "Accept-Language": locale,
      "X-timezone": `UTC +${-new Date().getTimezoneOffset() / 60}`,
    }

    if (cookies.token) {
      requestHeaders["Authorization"] = `Bearer ${cookies.token}`
    }

    if (cookies.currency) {
      try {
        const currency = JSON.parse(cookies.currency)
        if (currency?.code) {
          requestHeaders["X-currency"] = currency.code
        }
      } catch (e) {
        console.error("Error parsing currency cookie in server plugin", e)
      }
    }

    if (cookies.country) {
      try {
        const country = JSON.parse(cookies.country)
        if (country?.id) {
          requestHeaders["X-target-country"] = country.id
        }
      } catch (e) {
        console.error("Error parsing country cookie in server plugin", e)
      }
    }

    // Add a per-request interceptor — runs for each axios call made during
    // this SSR request's lifecycle. We eject it immediately after to avoid
    // accumulating interceptors across requests on the same server instance.
    const interceptorId = api.interceptors.request.use((config) => {
      Object.assign(config.headers, requestHeaders)
      return config
    })

    // Use Nuxt's hook to eject the interceptor when the SSR request is done.
    const nuxtApp = useNuxtApp()
    nuxtApp.hook('app:rendered', () => {
      api.interceptors.request.eject(interceptorId)
    })
  }
})
