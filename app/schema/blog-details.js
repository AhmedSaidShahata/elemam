import { useSiteUrl } from '~/utils/siteUrl'

export const useBlogDetailsSchema = ({ item, company }) => {
    const route = useRoute()
    const siteUrl = useSiteUrl()

    const pageUrl = computed(() => `${siteUrl.value}${route.fullPath}`)

    const datePublished = computed(() => {
        if (!item.value?.created_at) return ''
        return new Date(item.value.created_at)
            .toISOString()
            .split('T')[0]
    })

    const schemaJson = computed(() => {
        const schema = {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: item.value?.name,
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': pageUrl.value,
            },
            url: pageUrl.value,
            author: {
                '@type': 'Organization',
                name: company.value?.display_name || '',
            },
            datePublished: datePublished.value,
            image: item.value?.main_image?.path,
        }

        return JSON.stringify(schema, null, 2).replace(/</g, '\\u003c')
    })

    useHead(() => ({
        title: computed(() => item.value?.meta_title || 'Blog Details'),

        meta: [
            {
                name: 'description',
                content: computed(() =>
                    item.value?.meta_description || 'Blog Details'
                ),
            },

            {
                property: 'og:title',
                content: computed(() => item.value?.meta_title || ''),
            },

            {
                property: 'og:description',
                content: computed(() => item.value?.meta_description || ''),
            },

            {
                property: 'og:image',
                content: computed(() => item.value?.main_image?.path || ''),
            },

            {
                name: 'twitter:title',
                content: computed(() => item.value?.meta_title || ''),
            },

            {
                name: 'twitter:description',
                content: computed(() => item.value?.meta_description || ''),
            },

            {
                name: 'twitter:image',
                content: computed(() => item.value?.main_image?.path || ''),
            },
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
