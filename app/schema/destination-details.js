import { useSiteUrl } from '~/utils/siteUrl'

export const useDestinationDetailsSchema = ({ destination, pageDescription }) => {
    const { t } = useI18n()
    const localePath = useLocalePath()
    const route = useRoute()
    const siteUrl = useSiteUrl()

    const schemaJson = computed(() => {
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
                name: t('tourism_destinations'),
                item: `${siteUrl.value}${localePath('countries')}`,
            },
        ]

        if (destination.value?.name) {
            breadcrumbItems.push({
                '@type': 'ListItem',
                position: 3,
                name: destination.value.name,
                item: `${siteUrl.value}${route.fullPath}`,
            })
        }

        const breadcrumbList = {
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbItems,
        }

        const touristAttraction = {
            '@type': 'TouristAttraction',
            name: destination.value?.name,
            url: `${siteUrl.value}${route.fullPath}`,
            description: pageDescription.value,
            image: destination.value?.main_image?.path || undefined,
            containedInPlace: destination.value?.country
                ? {
                    '@type': 'Country',
                    name: destination.value.country?.name,
                }
                : undefined,
        }

        const schema = {
            '@context': 'https://schema.org',
            '@graph': [breadcrumbList, touristAttraction],
        }

        return JSON.stringify(schema, null, 2).replace(/</g, '\\u003c')
    })

    useHead(() => ({
        meta: [
            { hid: "og:image", property: "og:image", content: destination.value?.main_image?.path || "" },
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
