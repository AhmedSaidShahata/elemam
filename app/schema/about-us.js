import { useSiteUrl } from '~/utils/siteUrl'

export const useAboutSchema = ({ company, image, pageTitle, pageDescription }) => {
    const { t } = useI18n()
    const localePath = useLocalePath()
    const route = useRoute()
    const siteUrl = useSiteUrl()

    const pageUrl = computed(() => `${siteUrl.value}${route.fullPath}`)

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
                    name: pageTitle.value || t('about_us'),
                    item: `${siteUrl.value}${localePath('about-us')}`,
                },
            ],
        }

        const aboutPage = {
            '@type': 'AboutPage',
            name: pageTitle.value,
            url: pageUrl.value,
            description: pageDescription.value,
            mainEntity: {
                '@type': 'Organization',
                name: company.value?.display_name,
                image: image.value?.path || undefined,
                description: pageDescription.value || undefined,
            },
        }

        const schema = {
            '@context': 'https://schema.org',
            '@graph': [breadcrumbList, aboutPage],
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