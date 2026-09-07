import { useSiteUrl } from '~/utils/siteUrl'

export const useQuotesSchema = ({ data, pageTitle, pageDescription }) => {
    const { t } = useI18n()
    const localePath = useLocalePath()
    const route = useRoute()
    const siteUrl = useSiteUrl()

    const schemaJson = computed(() => {
        const itemListElement = (data.value || []).map((quote, index) => {
            const item = {
                '@type': 'Quotation',
                name: quote.headline || undefined,
                text: quote.quote_text,
                creator: {
                    '@type': 'Person',
                    name: quote.name,
                    image: quote.personal_image?.path || undefined,
                },
                dateCreated: quote.quote_date || undefined,
                locationCreated: quote.quote_location
                    ? {
                        '@type': 'Place',
                        name: quote.quote_location,
                    }
                    : undefined,
            }

            return {
                '@type': 'ListItem',
                position: index + 1,
                item: item,
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
                    name: pageTitle.value || t('all_quotes'),
                    item: `${siteUrl.value}${localePath('quotes')}`,
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
