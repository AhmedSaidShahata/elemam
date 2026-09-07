import { useSiteUrl } from '~/utils/siteUrl'

export const useReturnPolicySchema = ({ pageTitle, pageDescription }) => {
    const { t } = useI18n()
    const localePath = useLocalePath()
    const route = useRoute()
    const siteUrl = useSiteUrl()

    const schemaJson = computed(() => {
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
                    name: pageTitle.value || t('return_policy'),
                    item: `${siteUrl.value}${localePath('return-policy')}`,
                },
            ],
        }

        const webPage = {
            '@type': 'WebPage',
            name: pageTitle.value,
            url: `${siteUrl.value}${route.fullPath}`,
            description: pageDescription.value,
        }

        const schema = {
            '@context': 'https://schema.org',
            '@graph': [breadcrumbList, webPage],
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
