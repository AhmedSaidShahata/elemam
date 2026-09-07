import { useSiteUrl } from '~/utils/siteUrl'

export const useServiceRentalDetailsSchema = ({ service, rentalModels, pageTitle, pageDescription }) => {
    const { t } = useI18n()
    const localePath = useLocalePath()
    const route = useRoute()
    const siteUrl = useSiteUrl()
    const defaultCompanyStore = useDefaultCompanyStore()
    const defaultCompany = computed(() => defaultCompanyStore.getDefaultCompany)

    const schemaJson = computed(() => {
        const svc = service.value || {}

        const itemListElement = (rentalModels.value || []).map((model) => {
            const offers = (model.rental_prices || []).map((rp) => ({
                '@type': 'Offer',
                price: rp.price,
                priceCurrency: defaultCompany.value?.default_currency?.code || 'USD',
                priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    price: rp.price,
                    priceCurrency: undefined,
                    unitText: rp.unit,
                },
                availability: model.available
                    ? 'https://schema.org/InStock'
                    : 'https://schema.org/OutOfStock',
            }))

            return {
                '@type': 'Service',
                name: model.name,
                description: model.description,
                image: model.main_image?.path || undefined,
                offers: offers.length ? offers : undefined,
            }
        })

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

        if (svc.name) {
            breadcrumbItems.push({
                '@type': 'ListItem',
                position: 3,
                name: svc.name,
                item: `${siteUrl.value}${route.fullPath}`,
            })
        }

        const breadcrumbList = {
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbItems,
        }

        const serviceObj = {
            '@type': 'Service',
            name: svc.name,
            description: svc.description,
            url: `${siteUrl.value}${route.fullPath}`,
            image: svc.data?.header_image?.path || svc.icon_image?.path || undefined,
            hasOfferCatalog: itemListElement.length
                ? {
                    '@type': 'OfferCatalog',
                    name: svc.name,
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
