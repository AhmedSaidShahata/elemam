import { useRequestHeaders } from 'nuxt/app'

export async function useServerCookies() {
  const headers = useRequestHeaders(['cookie'])

  if (!headers.cookie) return {}

  const { parse } = await import('cookie')
  const parsedCookies = parse(headers.cookie)

  return parsedCookies
}
