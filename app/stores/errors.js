import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useErrorsStore = defineStore('errors', () => {
    const errors = ref([])
    const errorsResult = computed(() => errors.value)

    const setErrors = (item) => {
        errors.value = item
    }

    const resetErrors = () => {
        errors.value = []
    }

    return { setErrors, errorsResult, resetErrors }
})



