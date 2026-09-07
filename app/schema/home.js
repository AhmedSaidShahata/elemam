import { useSiteUrl } from '~/utils/siteUrl'

export const useHomeSchema = ({ company, allSettings, pageTitle, pageDescription }) => {
    const siteUrl = useSiteUrl()

    const schemaJson = computed(() => {
        const sameAs = [
            allSettings.value?.facebook_link?.value,
            allSettings.value?.twitter_link?.value,
            allSettings.value?.instagram_link?.value,
            allSettings.value?.linkedin_link?.value,
            allSettings.value?.youtube_link?.value,
            allSettings.value?.snapchat_link?.value,
        ].filter(Boolean)

        const phone = allSettings.value?.primary_phone?.number
            ? `${allSettings.value?.primary_phone?.country_code || ''} ${allSettings.value?.primary_phone?.number}`.trim()
            : undefined

        const address = allSettings.value?.first_address?.value
            ? {
                '@type': 'PostalAddress',
                streetAddress: allSettings.value.first_address.value,
                addressCountry: company.value?.default_country?.code || undefined,
            }
            : undefined

        const schema = {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: siteUrl.value,
            name: company.value?.display_name || company.value?.name || pageTitle.value,
            description: pageDescription.value || undefined,
            logo: company.value?.logo || undefined,
            image: company.value?.logo || undefined,
            email: allSettings.value?.primary_email?.value || undefined,
            telephone: phone,
            address: address,
            sameAs: sameAs.length ? sameAs : undefined,
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
