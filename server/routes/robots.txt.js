import { defineEventHandler, getRequestHeader, setResponseHeader } from 'h3'

const getRequestBaseUrl = (event) => {
  const host = getRequestHeader(event, 'x-forwarded-host') || getRequestHeader(event, 'host') || 'localhost'
  const protocol = getRequestHeader(event, 'x-forwarded-proto') || 'https'

  return `${protocol}://${host}`.replace(/\/$/, '')
}

export default defineEventHandler((event) => {
  const baseUrl = getRequestBaseUrl(event)
  const envMode = process.env.VITE_ENV_MODE || process.env.NODE_ENV

  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setResponseHeader(event, 'Cache-Control', 'public, max-age=300, s-maxage=3600')

  if (envMode !== 'production') {
    return [
      `User-agent: *`,
      `Disallow: /`,
      `Sitemap: ${baseUrl}/sitemap`
    ].join('\n')
  }

  return [
    `User-agent: *`,
    `Disallow: /public/assets/`,
    `Disallow: /profile`,
    `Disallow: /profile/`,
    `Disallow: /en/profile`,
    `Disallow: /en/profile/`,
    `Allow: /`,
    `Sitemap: ${baseUrl}/sitemap`
  ].join('\n')
})
