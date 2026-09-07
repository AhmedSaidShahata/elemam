import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { ar, en } from 'vuetify/locale'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        locale: {
            locale: 'ar',
            fallback: 'en',
            messages: { ar, en },
        },
        rtl: {
            customLocale: true,
        },
        components,
        directives,
        theme: {
            defaultTheme: "light",
            themes: {
                light: {
                    dark: false,
                    colors: {
                        background: '#FFFFFF',
                        primary: '#FFFFFF',
                        secondary: '#FFFFFF',
                        error: '#ff5252',
                    },
                },

            },
        },
    })
    app.vueApp.use(vuetify)
})