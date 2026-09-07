import {
  defineEventHandler,
  getRequestHeader,
  setResponseHeader,
  setResponseStatus
} from 'h3'
import { staticUrl } from '~/utils/localUrl.js'

const TENANT_ROOT_DOMAINS = new Set(['otasapp.net', 'otasapp.com', 'spbeta.net'])

const getEnvMode = () => process.env.VITE_ENV_MODE || process.env.NODE_ENV || 'dev'

const getEnvUrl = () => {
  const envMode = getEnvMode()
  const keyByEnv = {
    production: 'WEBSITE_PRODUCTION',
    dproduction: 'WEBSITE_DPRODUCTION',
    tproduction: 'WEBSITE_TPRODUCTION',
    int: 'WEBSITE_INT',
    dev: 'WEBSITE_DEV',
    testing: 'WEBSITE_TEST',
    beta: 'WEBSITE_BETA',
    sdev: 'WEBSITE_SDEV',
    stesting: 'WEBSITE_STEST',
    sproduction: 'WEBSITE_SPRODUCTION'
  }
  const key = keyByEnv[envMode] || 'WEBSITE_DEV'

  return process.env[`VITE_${key}`] || process.env[`NUXT_PUBLIC_${key}`] || process.env.VITE_WEBSITE_DEV || process.env.NUXT_PUBLIC_WEBSITE_DEV
}

const getHost = (event) => {
  const host = getRequestHeader(event, 'x-forwarded-host') || getRequestHeader(event, 'host')

  return typeof host === 'string' ? host : ''
}

const getMainDomain = (host) => {
  if (!host) return ''

  const parts = host.split('.')
  if (parts.length < 2) return host

  const rootDomain = parts.slice(-2).join('.')

  return TENANT_ROOT_DOMAINS.has(rootDomain) ? parts[0] : host
}

export default defineEventHandler(async (event) => {
  const host = getHost(event)
  const mainDomain = getMainDomain(host)
  const envUrl = getEnvUrl()
  const apiUrl =
    mainDomain === 'localhost:3000' || mainDomain === '127.0.0.1:3000'
      ? `${staticUrl}/sitemap`
      : `${envUrl}/${mainDomain}/sitemap`

  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setResponseHeader(event, 'Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400')

  try {
    const xml = await $fetch(apiUrl, {
      headers: { Accept: 'application/xml, text/xml, */*' },
      responseType: 'text',
      retry: 1,
      timeout: 10000
    })

    return typeof xml === 'string' ? xml.trimStart() : String(xml)
  } catch (error) {
    console.error('[sitemap] API fetch failed:', error?.message || error)

    setResponseStatus(event, 502)
    setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')

    return 'Sitemap is temporarily unavailable.'
  }
})
