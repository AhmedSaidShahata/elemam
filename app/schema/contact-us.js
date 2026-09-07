import { useSiteUrl } from '~/utils/siteUrl'

export const useContactUsSchema = ({ company, allSettings, pageTitle, pageDescription }) => {
    const { t } = useI18n()
    const localePath = useLocalePath()
    const route = useRoute()
    const siteUrl = useSiteUrl()

    const schemaJson = computed(() => {
        const contactPoints = []

        if (allSettings?.value?.primary_phone?.number) {
            contactPoints.push({
                '@type': 'ContactPoint',
                telephone: `\u202A(${allSettings?.value?.primary_phone?.country_code}) ${allSettings?.value?.primary_phone?.number}\u202C`,
                contactType: 'customer service',
                email: allSettings?.value?.primary_email?.value || undefined,
                areaServed: company.value?.default_country?.name || undefined,
            })
        }

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
                    name: pageTitle.value || t('contact_us'),
                    item: `${siteUrl.value}${localePath('contact-us')}`,
                },
            ],
        }

        const contactPage = {
            '@type': 'ContactPage',
            name: pageTitle.value,
            url: `${siteUrl.value}${route.fullPath}`,
            description: pageDescription.value,
            mainEntity: {
                '@type': 'Organization',
                name: company.value?.display_name,
                url: siteUrl.value,
                logo: company.value?.logo || undefined,
                email: allSettings?.value?.primary_email?.value || undefined,
                telephone: allSettings?.value?.primary_phone?.number
                    ? `\u202A(${allSettings?.value?.primary_phone?.country_code}) ${allSettings?.value?.primary_phone?.number}\u202C`
                    : undefined,
                address: allSettings?.value?.first_address?.value
                    ? {
                        '@type': 'PostalAddress',
                        streetAddress: allSettings?.value?.first_address?.value,
                        addressCountry: company.value?.default_country?.code || undefined,
                    }
                    : undefined,
                contactPoint: contactPoints.length ? contactPoints : undefined,
            },
        }

        const schema = {
            '@context': 'https://schema.org',
            '@graph': [breadcrumbList, contactPage],
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
