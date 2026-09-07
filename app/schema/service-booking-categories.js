import { useSiteUrl } from '~/utils/siteUrl'

export const useServiceBookingCategoriesSchema = ({ service, categories, pageTitle, pageDescription }) => {
    const { t } = useI18n()
    const localePath = useLocalePath()
    const route = useRoute()
    const siteUrl = useSiteUrl()

    const categoryModelRoute = (item) => ({
        name: 'services-booking-id-models',
        params: { id: route.params.id },
        query: { category: item?.slug || item?.id },
    })

    const schemaJson = computed(() => {
        const itemListElement = (categories.value || []).map((category) => ({
            '@type': 'Service',
            name: category.name,
            url: `${siteUrl.value}${localePath(categoryModelRoute(category))}`,
            image: category.main_image?.path || undefined,
            description: category.description || undefined,
        }))

        const breadcrumbItems = [
            {
                '@type': 'ListItem',
                position: 1,
                name: t('home'),
                item: `${siteUrl.value}${localePath('/')}`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: t('services'),
                item: `${siteUrl.value}${localePath('services')}`,
            },
        ]

        if (service.value?.name) {
            breadcrumbItems.push({
                '@type': 'ListItem',
                position: 3,
                name: service.value.name,
                item: `${siteUrl.value}${route.fullPath}`,
            })
        }

        const breadcrumbList = {
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbItems,
        }

        const serviceObj = {
            '@type': 'Service',
            name: service.value?.name,
            url: `${siteUrl.value}${route.fullPath}`,
            description: pageDescription.value,
            image: service.value?.data?.header_image?.path || undefined,
            hasOfferCatalog: itemListElement.length
                ? {
                    '@type': 'OfferCatalog',
                    name: service.value?.sub_name || service.value?.name,
                    itemListElement: itemListElement,
                }
                : undefined,
        }

        const schema = {
            '@context': 'https://schema.org',
            '@graph': [breadcrumbList, serviceObj],
        }

        return JSON.stringify(schema, null, 2).replace(/</g, '\\u003c')
    })

    useHead(() => ({
        title: pageTitle.value,
        meta: [
            { hid: "description", name: "description", content: pageDescription.value },
            { hid: "og:title", property: "og:title", content: pageTitle.value || "" },
            { hid: "og:description", property: "og:description", content: pageDescription.value || "" },
            { hid: "og:image", property: "og:image", content: service.value?.data?.header_image?.path || "" },
            { hid: "twitter:image", property: "twitter:image", content: service.value?.data?.header_image?.path || "" },
            { hid: "twitter:title", name: "twitter:title", content: pageTitle.value || "" },
            { hid: "twitter:description", name: "twitter:description", content: pageDescription.value || "" },
        ],
        script: [
            {
                key: 'schema-json-ld',
                type: 'application/ld+json',
                innerHTML: schemaJson.value,
            },
        ],
    }))
}
