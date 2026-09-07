import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCookie } from '#app'

export const useLocaleStore = defineStore('locale', () => {
    const locale = ref('')

    const localeCookie = useCookie('_lang')
    locale.value = localeCookie.value || 'ar'

    const localeValue = computed(() => locale)

    const setLocaleApp = (item) => {
        locale.value = item
        localeCookie.value = item
    }

    return {
        setLocaleApp,
        localeValue,
    }
})