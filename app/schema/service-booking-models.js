import { useSiteUrl } from '~/utils/siteUrl'

export const useServiceBookingModelsSchema = ({ service, bookingModels, pageTitle, pageDescription }) => {
    const { t } = useI18n()
    const localePath = useLocalePath()
    const route = useRoute()
    const siteUrl = useSiteUrl()

    const bookingModelRoute = (item) => ({
        name: 'services-booking-id-models-modelId',
        params: {
            id: route.params.id,
            modelId: item?.slug || item?.id,
        },
        query: route.query,
    })

    const schemaJson = computed(() => {
        const itemListElement = (bookingModels.value || []).map((model, index) => {
            const hasPrice = model.sale_price !== undefined || model.main_price !== undefined
            const price = model.sale_price || model.main_price || 0
            const offer = hasPrice
                ? {
                    '@type': 'Offer',
                    price: price,
                    priceCurrency: model.currency_code || undefined,
                    availability: model.available
                        ? 'https://schema.org/InStock'
                        : 'https://schema.org/OutOfStock',
                    url: `${siteUrl.value}${localePath(bookingModelRoute(model))}`,
                    validThrough: model.deadline_at || undefined,
                }
                : undefined

            const product = {
                '@type': 'Service',
                name: model.name,
                description: model.description,
                image: model.main_image?.path || undefined,
                url: `${siteUrl.value}${localePath(bookingModelRoute(model))}`,
                offers: offer,
            }

            return {
                '@type': 'ListItem',
                position: index + 1,
                item: product,
            }
        })

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
                    name: t('services'),
                    item: `${siteUrl.value}${localePath('services')}`,
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: pageTitle.value || service.value?.name || t('services'),
                    item: `${siteUrl.value}${route.fullPath}`,
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
        title: pageTitle.value,
        meta: [
            { hid: "description", name: "description", content: pageDescription.value },
            { hid: "og:title", property: "og:title", content: pageTitle.value || "" },
            { hid: "og:image", property: "og:image", content: service.value?.data?.header_image?.path || "" },
            { hid: "twitter:image", property: "twitter:image", content: service.value?.data?.header_image?.path || "" },
            { hid: "twitter:title", name: "twitter:title", content: pageTitle.value || "" },
            { hid: "twitter:description", name: "twitter:description", content: pageDescription.value || "" },
            { hid: "og:description", property: "og:description", content: pageDescription.value || "" },
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
