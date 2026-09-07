import { useSiteUrl } from '~/utils/siteUrl'

export const useServiceBookingModelDetailsSchema = ({ bookingModel, pageTitle, pageDescription }) => {
    const { t } = useI18n()
    const localePath = useLocalePath()
    const route = useRoute()
    const siteUrl = useSiteUrl()
    const defaultCompanyStore = useDefaultCompanyStore()
    const defaultCompany = computed(() => defaultCompanyStore.getDefaultCompany)

    const schemaJson = computed(() => {
        const model = bookingModel.value || {}

        const itinerary = (model.program || []).flatMap((prog) =>
            (prog.daily_programs || []).map((day) => ({
                '@type': 'ListItem',
                position: day.day_number,
                item: {
                    '@type': 'TouristAttraction',
                    name: day.title,
                    description: day.description,
                    image: day.images?.[0]?.path || undefined,
                },
            }))
        )

        const additionalImages = (model.images || []).map((img) => img.path).filter(Boolean)

        const offer = model.price_from
            ? {
                '@type': 'Offer',
                price: model.price_from,
                priceCurrency: defaultCompany.value?.default_currency?.code || 'USD',
                availability: model.available
                    ? 'https://schema.org/InStock'
                    : 'https://schema.org/OutOfStock',
                validThrough: model.deadline_at || undefined,
                url: `${siteUrl.value}${route.fullPath}`,
            }
            : undefined

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

        if (model.name) {
            breadcrumbItems.push({
                '@type': 'ListItem',
                position: 3,
                name: model.name,
                item: `${siteUrl.value}${route.fullPath}`,
            })
        }

        const breadcrumbList = {
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbItems,
        }

        const productSchema = {
            '@type': 'TouristTrip',
            name: model.name,
            description: model.description,
            url: `${siteUrl.value}${route.fullPath}`,
            image: model.main_image?.path
                ? [model.main_image.path, ...additionalImages]
                : additionalImages,
            offers: offer,
            itinerary: itinerary.length
                ? {
                    '@type': 'ItemList',
                    itemListElement: itinerary,
                }
                : undefined,
        }

        const schema = {
            '@context': 'https://schema.org',
            '@graph': [breadcrumbList, productSchema],
        }

        return JSON.stringify(schema, null, 2).replace(/</g, '\\u003c')
    })

    useHead(() => ({
        title: pageTitle.value,
        meta: [
            { hid: "description", name: "description", content: pageDescription.value },
            { hid: "og:title", property: "og:title", content: pageTitle.value || "" },
            { hid: "og:description", property: "og:description", content: pageDescription.value || "" },
            { hid: "og:image", property: "og:image", content: bookingModel.value?.main_image?.path || "" },
            { hid: "twitter:title", name: "twitter:title", content: pageTitle.value || "" },
            { hid: "twitter:description", name: "twitter:description", content: pageDescription.value || "" },
            { hid: "twitter:image", name: "twitter:image", content: bookingModel.value?.main_image?.path || "" },
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
