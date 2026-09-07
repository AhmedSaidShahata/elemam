import { useSiteUrl } from '~/utils/siteUrl'

export const useOffersSchema = ({ data, pageTitle, pageDescription }) => {
    const { t } = useI18n()
    const localePath = useLocalePath()
    const route = useRoute()
    const siteUrl = useSiteUrl()

    const schemaJson = computed(() => {
        const itemListElement = (data.value || []).map((offer, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'WebPage',
                name: offer.name,
                description: offer.description || undefined,
                url: offer.offer_url || `${siteUrl.value}/${localePath('offers')}/${offer.slug}`,
                image: offer.main_image?.path || undefined,
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
                    name: pageTitle.value || t('offers'),
                    item: `${siteUrl.value}${localePath('offers')}`,
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
                itemListElement,
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