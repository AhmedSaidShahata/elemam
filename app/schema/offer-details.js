import { useSiteUrl } from '~/utils/siteUrl'

export const useOfferDetailsSchema = ({ offer, pageDescription }) => {
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
                name: t('offers'),
                item: `${siteUrl.value}${localePath('offers')}`,
            },
        ]

        if (offer.value?.name) {
            breadcrumbItems.push({
                '@type': 'ListItem',
                position: 3,
                name: offer.value.name,
                item: `${siteUrl.value}${route.fullPath}`,
            })
        }

        const breadcrumbList = {
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbItems,
        }

        const offerPage = {
            '@type': 'WebPage',
            name: offer.value?.name,
            url: `${siteUrl.value}${route.fullPath}`,
            description: pageDescription.value,
            image: offer.value?.header_image?.path || undefined,
        }

        const schema = {
            '@context': 'https://schema.org',
            '@graph': [breadcrumbList, offerPage],
        }

        return JSON.stringify(schema, null, 2).replace(/</g, '\\u003c')
    })

    useHead(() => ({
        meta: [
            { hid: "og:image", property: "og:image", content: offer.value?.header_image?.path || "" },
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
