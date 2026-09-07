import { computed } from 'vue'
import cookie from 'js-cookie'
import { useCurrenciesStore } from '@/stores/currencies'
import { useLocaleStore } from '@/stores/locale'

export const useCurrency = () => {
    const currencyStore = useCurrenciesStore()
    const { locale } = useI18n()

    const setCurrency = (defaultCurrency) => {
        const currencyCookie = cookie.get('currency')

        // If cookie exists
        if (currencyCookie) {
            try {
                const parsed =
                    typeof currencyCookie === 'string'
                        ? JSON.parse(currencyCookie)
                        : currencyCookie

                if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
                    currencyStore.setSelectedCurrency(parsed)
                    return
                }
            } catch (error) {
                console.log('Error parsing currency cookie:', error)
            }
        }

        // If default currency provided
        if (defaultCurrency) {
            currencyStore.setSelectedCurrency(defaultCurrency)
            return
        }

        // Fallback 
        const isArabic = locale.value === 'ar'

        const fallbackCurrency = {
            id: 2,
            name: isArabic ? 'دولار امريكي' : 'American Dollar',
            sign: '$',
            code: 'USD',
            visible: true,
        }

        if ((!defaultCurrency && currencyCookie) || (defaultCurrency && !currencyCookie))
            currencyStore.setSelectedCurrency(fallbackCurrency)
    }

    const priceSign = computed(() => {
        return currencyStore.selectedCurrency?.name || ''
    })

    return {
        setCurrency,
        priceSign,
    }
}