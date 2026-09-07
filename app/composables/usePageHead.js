export const usePageHead = (data) => {
const { getCompany } = useCompanyStore();

    const title = computed(() =>
        data?.title || getCompany?.value?.display_name
    )

    const description = computed(() =>
        data?.description || ''
    )

    const logo = computed(() =>
        getCompany?.value?.logo
    )

    const keywords = computed(() => {
        if (!data?.keywords) return '';
        if (Array.isArray(data.keywords)) {
            return data.keywords
                .map(k => (typeof k === "object" ? k.name || k.keyword || "" : k))
                .filter(Boolean)
                .join(', ');
        }
        return typeof data.keywords === 'string' ? data.keywords : '';
    })

    useHead(() => {
        const metaTags = [
            {
                name: 'description',
                content: description.value,
            },
            {
                property: 'og:title',
                content: title.value,
            },
            {
                property: 'og:description',
                content: description.value,
            },
            {
                property: 'og:image',
                content: logo.value,
            },
            {
                name: 'twitter:title',
                content: title.value,
            },
            {
                name: 'twitter:description',
                content: description.value,
            },
        ]

        if (keywords.value) {
            metaTags.push({
                name: 'keywords',
                content: keywords.value,
            })
        }

        return {
            title: title.value,
            meta: metaTags,
            link: [
                {
                    rel: 'icon',
                    href: logo.value,
                },
            ],
        }
    })
}