import { useSiteUrl } from '~/utils/siteUrl'

export const useTeamMembersSchema = ({ data, pageTitle, pageDescription }) => {
    const { t } = useI18n()
    const localePath = useLocalePath()
    const route = useRoute()
    const siteUrl = useSiteUrl()

    const schemaJson = computed(() => {
        const itemListElement = (data.value || []).map((member, index) => {
            const sameAs = [
                member.facebook_url,
                member.linkedin_url,
                member.twitter_url,
                member.instagram_url,
                member.snapchat_url,
            ].filter(Boolean)

            return {
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'Person',
                    name: member.name,
                    jobTitle: member.title_text,
                    description: member.short_bio,
                    image: member.image?.path || undefined,
                    sameAs: sameAs.length ? sameAs : undefined,
                },
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
                    name: pageTitle.value || t('team_members'),
                    item: `${siteUrl.value}${localePath('team-members')}`,
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
