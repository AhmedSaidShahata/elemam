import { useSiteUrl } from '~/utils/siteUrl'

export const useCustomerReviewsSchema = ({ data, pageTitle, pageDescription }) => {
    const { t } = useI18n()
    const localePath = useLocalePath()
    const route = useRoute()
    const siteUrl = useSiteUrl()

    const schemaJson = computed(() => {
        const extractYoutubeId = (value) => {
            if (!value) return null
            const match = value.match(/(?:v=)([a-zA-Z0-9_-]{6,})/)
            return match ? match[1] : value
        }

        const itemListElement = (data.value || []).map((review, index) => {
            const youtubeId = extractYoutubeId(review.youtube_video_id)

            let image
            if (review.image) {
                image = review.image.path
            } else if (youtubeId) {
                image = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
            }

            const text = review.review_text || review.headline || undefined

            const item = {
                '@type': 'Comment',
                author: {
                    '@type': 'Person',
                    name: review.name,
                },
            }

            if (text) item.text = text
            if (review.headline) item.headline = review.headline
            if (image) item.image = image

            if (youtubeId) {
                item.associatedMedia = {
                    '@type': 'MediaObject',
                    contentUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
                    thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
                }
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
                    name: pageTitle.value || t('customer_reviews'),
                    item: `${siteUrl.value}${localePath('customer-reviews')}`,
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
