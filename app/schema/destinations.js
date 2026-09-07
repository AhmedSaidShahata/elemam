import { useSiteUrl } from '~/utils/siteUrl'

export const useDestinationsSchema = ({ country }) => {
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

        if (country.value?.name) {
            breadcrumbItems.push({
                '@type': 'ListItem',
                position: 3,
                name: country.value.name,
                item: `${siteUrl.value}${route.fullPath}`,
            })
        }

        const breadcrumbList = {
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbItems,
        }

        const schema = {
            '@context': 'https://schema.org',
            '@graph': [breadcrumbList],
        }

        return JSON.stringify(schema, null, 2).replace(/</g, '\\u003c')
    })

    useHead(() => ({
        title: `${t("tourism_destination")} ${country.value?.name || ""}`,
        script: [
            {
                key: 'schema-json-ld',
                type: 'application/ld+json',
                innerHTML: schemaJson.value,
            },
        ],
    }))
}
