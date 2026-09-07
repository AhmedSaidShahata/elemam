export default defineNuxtPlugin({
    name: 'default-company',
    dependsOn: ['api', 'local-url'],
    async setup() {
        const companyStore = useDefaultCompanyStore()
        const localeStore = useLocaleStore()

        const route = useRoute()

        await companyStore.setDefaultCompany()

        const locale = localeStore.localeValue?.value

        if (!locale) return


    }
})