export default defineNuxtRouteMiddleware(() => {
    const companyStore = useCompanyStore()

    const company = companyStore.company.value

    if (!company || Object.keys(company).length === 0) {
        return
    }

    const hasOffers = company?.license?.specifications?.some(
        item => item.code === 'has_offers' && item.value === 1
    )

    if (!hasOffers) {
        return navigateTo('/')
    }
})