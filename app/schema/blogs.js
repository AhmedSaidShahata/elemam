import { useSiteUrl } from '~/utils/siteUrl'
import blogRoute from '~/utils/links/blogRoute'

export const useBlogsSchema = ({ blogs, pageTitle, pageDescription }) => {
    const localePath = useLocalePath()
    const route = useRoute()
    const siteUrl = useSiteUrl()

    const schemaJson = computed(() => {
        const blogPosts = (blogs.value || []).map((blog) => ({
            '@type': 'BlogPosting',
            headline: blog.name,
            url: `${siteUrl.value}${localePath(blogRoute(blog.slug))}`,
            image: blog.main_image?.path,
            datePublished: blog.created_at
                ? new Date(blog.created_at).toISOString().split('T')[0]
                : undefined,
        }))

        const data = {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: pageTitle.value,
            url: `${siteUrl.value}${route.fullPath}`,
            description: pageDescription.value,
            blogPost: blogPosts,
        }

        return JSON.stringify(data, null, 2).replace(/</g, '\\u003c')
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
