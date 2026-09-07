import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import useApi from '~/composables/useApi'

export const useNotificationsStore = defineStore('notifications', () => {
    const notifications = ref([])

    const allNotifications = computed(() => notifications.value)

    const groupedNotifications = computed(() => {
        const today = []
        const others = []
        const now = new Date()

        notifications.value.forEach((n) => {
            const created = new Date(n.created_at)
            const diff = Math.floor((now.getTime() - created.getTime()) / 1000)

            if (diff < 86400) {
                today.push(n)
            } else {
                others.push(n)
            }
        })

        return { today, others }
    })


    const fetchNotifications = async ({ page }) => {
        try {
            const { get } = useApi()

            const res = await get(`notifications?page=${page}`)

            if (page === 1) {
                notifications.value = res.data.data
            } else {
                notifications.value = [
                    ...notifications.value,
                    ...res.data.data,
                ]
            }

            return res.data.data
        } catch (err) {
            console.error('Error fetching notifications:', err)
        }
    }

    const fetchAllNotifications = async ({ page }) => {
        try {
            const { get } = useApi()

            const res = await get(`notifications?page=${page}`)

            notifications.value = res.data.data

            return res.data.data
        } catch (err) {
            console.error('Error fetching notifications:', err)
        }
    }

    const markAllRead = async () => {
        try {
            const { post } = useApi()

            await post('/notifications')

            notifications.value.forEach((n) => {
                n.read_at = new Date()
            })
        } catch (err) {
            console.error('Error marking all read:', err)
        }
    }

    const clearNotifications = () => {
        notifications.value = []
    }

    return {
        notifications,
        allNotifications,
        groupedNotifications,
        fetchNotifications,
        fetchAllNotifications,
        markAllRead,
        clearNotifications,
    }
})