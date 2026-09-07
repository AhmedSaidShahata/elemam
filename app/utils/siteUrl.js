export const useSiteUrl = () => {
    const requestEvent = useRequestEvent()

    return computed(() => {
        if (import.meta.client) {
            return window.location.origin
        }
        const req = requestEvent?.node?.req
        if (req) {
            const protocol = req.headers['x-forwarded-proto'] || 'https'
            return `${protocol}://${req.headers.host}`
        }
        return ''
    })
}