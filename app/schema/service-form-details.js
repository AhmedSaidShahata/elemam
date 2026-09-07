import { useSiteUrl } from '~/utils/siteUrl'

export const useServiceFormDetailsSchema = ({ service, pageTitle, pageDescription }) => {
    const { t } = useI18n()
    const localePath = useLocalePath()
    const route = useRoute()
    const siteUrl = useSiteUrl()

    const schemaJson = computed(() => {
        const svc = service.value || {}
        const additionalImages = (svc.data?.images || []).map((img) => img.path).filter(Boolean)

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
            image: svc.data?.header_image?.path
                ? [svc.data.header_image.path, ...additionalImages]
                : additionalImages,
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
            { hid: "og:image", property: "og:image", content: service.value?.data?.header_image?.path || "" },
            { hid: "twitter:title", name: "twitter:title", content: pageTitle.value || "" },
            { hid: "twitter:description", name: "twitter:description", content: pageDescription.value || "" },
            { hid: "twitter:image", name: "twitter:image", content: service.value?.data?.header_image?.path || "" },
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
