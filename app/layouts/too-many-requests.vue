<template>
    <v-app class="error__app-wrapper--429">
        <slot />
    </v-app>
</template>

<script setup>
import { onMounted } from 'vue'

defineOptions({
    name: 'TooManyRequestLayout'
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