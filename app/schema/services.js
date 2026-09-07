import { useSiteUrl } from '~/utils/siteUrl'

export const useServicesSchema = ({ allServices, pageTitle, pageDescription, getLink }) => {
    const { t } = useI18n()
    const localePath = useLocalePath()
    const route = useRoute()
    const siteUrl = useSiteUrl()

    const resolveLink = (service) => {
        if (typeof getLink === 'function') {
            return getLink(service)
        }
        const resolvedItem = service?.service && typeof service.service === 'object' ? service.service : service
        const itemType = String(resolvedItem?.type || resolvedItem?.service_type || resolvedItem?.serviceType || service?.type || service?.service_type || service?.serviceType || '').toLowerCase()
        const routeId = resolvedItem?.slug || resolvedItem?.id || service?.slug || service?.id

        if (itemType === 'rental') {
            return { name: 'services-rental-id', params: { id: routeId } }
        }
        if (itemType === 'form') {
            return { name: 'services-form-id', params: { id: routeId } }
        }
        if (itemType === 'booking' || itemType === 'book') {
            return {
                name: service?.data?.has_category || service?.has_category ? 'services-booking-id-categories' : 'services-booking-id-models',
                params: { id: routeId },
            }
        }
        return { name: 'services' }
    }

    const schemaJson = computed(() => {
        const itemListElement = (allServices?.value || []).map((service, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Service',
                name: service.name,
                url: `${siteUrl.value}${localePath(resolveLink(service))}`,
                image: service.image?.path || service.main_image?.path || undefined,
                description: service.description || undefined,
            },
        }))

        const breadcrumbList = {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: t('home'),
                    item: `${siteUrl.value}${localePath('/')}`,
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: pageTitle.value || t('services'),
                    item: `${siteUrl.value}${localePath('services')}`,
                },
            ],
        }

        const collectionPage = {
            '@type': 'CollectionPage',
            name: pageTitle.value,
            url: `${siteUrl.value}${route.fullPath}`,
            description: pageDescription.value,
            mainEntity: {
                '@type': 'ItemList',
                itemListElement: itemListElement,
            },
        }

        const schema = {
            '@context': 'https://schema.org',
            '@graph': [breadcrumbList, collectionPage],
        }

        return JSON.stringify(schema, null, 2).replace(/</g, '\\u003c')
    })

    useHead(() => ({
        script: [
            {
                key: 'schema-json-ld',
                type: 'application/ld+json',
                innerHTML: schemaJson.value,
            },
        ],
    }))
}
