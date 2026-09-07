<template>
    <v-app class="error__app-wrapper--402">
        <slot />
    </v-app>
</template>

<script setup>
import { onMounted } from 'vue'

defineOptions({
    name: 'LicenseExpiredLayout'
})

useHead({
    meta: [
        {
            hid: "robots",
            name: "robots",
            content: "noindex, nofollow",
        },
    ],
});

onMounted(() => {
    const body = document.body

    if (body) {
        body.style.visibility = 'visible'
        body.style.display = 'block'
    }
})
</script>