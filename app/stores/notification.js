import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notify', () => {
    const notification = ref({
        visible: false,
        timeout:3000,
        color: "error",
        text: "text"
    })

    const notify = computed(() => notification)

    const setNotification = (item) => {
        notification.value = { ...notification.value, ...item }
    }

    return { setNotification, notify }
})

