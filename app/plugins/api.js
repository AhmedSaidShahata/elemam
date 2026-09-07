export default defineNuxtPlugin(
    {
        name: 'api',
        async setup() {
            const config = useRuntimeConfig()
            const mainDomain = () => {
                let host

                if (import.meta.server) {
                    const headers = useRequestHeaders(['host'])
                    host = headers.host
                } else if (import.meta.client) {
                    host = window.location.host
                }

                if (!host) return null

                const urlSpliting = host.split('.')

                const domain = urlSpliting[0]

                const checkingDomain =
                    urlSpliting[urlSpliting.length - 2] +
                    '.' +
                    urlSpliting[urlSpliting.length - 1]

                let theDomain

                if (
                    checkingDomain === 'otasapp.net' ||
                    checkingDomain === 'otasapp.com' ||
                    checkingDomain === 'spbeta.net'
                ) {
                    theDomain = domain
                } else {
                    theDomain = host
                }

                return theDomain
            }
            const domain = mainDomain()

            const apiBase = `${config.public.envUrl}/${domain}`

            return {
                provide: {
                    apiBase
                }
            }
        }
    })