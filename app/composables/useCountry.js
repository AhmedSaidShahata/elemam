import cookie from 'js-cookie'
import { useCountriesStore } from '@/stores/countries'

export const useCountry = () => {
    const countriesStore = useCountriesStore()

    const setCountry = (defaultCountry) => {
        const countryCookie = cookie.get('country')

        // If cookie exists
        if (countryCookie) {
            try {
                const parsed =
                    typeof countryCookie === 'string'
                        ? JSON.parse(countryCookie)
                        : countryCookie

                if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
                    countriesStore.setSelectedCountry(parsed)
                    return
                }
            } catch (error) {
                console.log('Error parsing country cookie:', error)
            }
        }

        // If default country provided
        if (defaultCountry) {
            countriesStore.setSelectedCountry(defaultCountry)
            return
        }

    }

    return {
        setCountry,
    }
}
