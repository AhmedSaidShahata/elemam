<template>
    <footer class="footer text-white mt-8 pt-2">
        <section v-if="globalSettings.subscription_phone?.displayed || globalSettings.primary_email?.displayed">
            <v-container class="d-flex justify-center">
                <v-row class="footer-links px-2 pb-4">
                    <v-col cols="12" class="pt-4 text-center" v-if="hasAndroidApp || hasIosApp">
                        <h3 class="mb-4">{{ $t("download_app") }}</h3>
                        <v-row class="d-flex justify-center">
                            <v-col v-if="hasAndroidApp" cols="12" sm="5" class="d-flex justify-center justify-md-end">
                                <a v-if="globalSettings.android_link_mobile_app?.value"
                                    :href="globalSettings.android_link_mobile_app?.value" target="_blank">
                                    <v-img width="162" height="48" alt="google play"
                                        src='/assets/images/google_play.webp' contain eager position="center bottom" />
                                </a>
                                <a v-else>
                                    <v-img width="162" height="48" alt="google play"
                                        src='/assets/images/google_play.webp' contain eager position="center bottom" />
                                </a>
                            </v-col>
                            <v-col v-if="hasIosApp" cols="12" sm="5"
                                :offset-md="hasAndroidApp || hasIosApp ? '1' : '0'">
                                <a v-if="globalSettings.ios_link_mobile_app?.value"
                                    :href="globalSettings.ios_link_mobile_app?.value" target="_blank">
                                    <v-img width="162" height="48" src='/assets/images/app_store.webp' contain eager
                                        position="center bottom" alt="app store" />
                                </a>
                                <a v-else>
                                    <v-img width="162" height="48" src='/assets/images/app_store.webp' contain eager
                                        position="center bottom" alt="app store" />
                                </a>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" :sm="hasAndroidApp || hasIosApp ? '7' : '12'"
                        class="footer-links__contacts pt-4 px-lg-4 text-center">
                        <h3 class="mb-4 mt-0">{{ $t("contact") }}</h3>
                        <v-row class="d-flex justify-center mx-lg-15" v-if="mdAndUp">
                            <v-col :class="globalSettings.subscription_phone ? 'justify-end' : 'justify-center'"
                                class="d-flex pb-3 px-4" v-if="globalSettings.primary_email?.displayed" cols="12"
                                :md="globalSettings.subscription_phone ? '5' : '12'" sm="12"
                                :offset-md="hasAndroidApp || hasIosApp ? '1' : '0'">
                                <div class="d-flex flex-wrap align-center gap-sm justify-center justify-md-end">
                                    <div class="footer-links__icon__wrapper">

                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_3779_11173)">
                                                <path
                                                    d="M16 0.800781C7.17764 0.800781 4.30008e-05 7.26051 4.30008e-05 15.2008C4.30008e-05 17.9762 0.87791 20.6648 2.54298 22.9896C2.22778 26.476 1.38298 29.0642 0.15631 30.2904C-0.00582366 30.4525 -0.046357 30.7005 0.056043 30.9053C0.14671 31.0882 0.333376 31.2008 0.533376 31.2008C0.55791 31.2008 0.582443 31.1992 0.60751 31.1954C0.82351 31.165 5.84111 30.4429 9.47044 28.348C11.5312 29.1794 13.7264 29.6008 16 29.6008C24.8224 29.6008 32 23.141 32 15.2008C32 7.26051 24.8224 0.800781 16 0.800781ZM8.53338 17.3341C7.35684 17.3341 6.40004 16.3773 6.40004 15.2008C6.40004 14.0242 7.35684 13.0674 8.53338 13.0674C9.70991 13.0674 10.6667 14.0242 10.6667 15.2008C10.6667 16.3773 9.70991 17.3341 8.53338 17.3341ZM16 17.3341C14.8235 17.3341 13.8667 16.3773 13.8667 15.2008C13.8667 14.0242 14.8235 13.0674 16 13.0674C17.1766 13.0674 18.1334 14.0242 18.1334 15.2008C18.1334 16.3773 17.1766 17.3341 16 17.3341ZM23.4667 17.3341C22.2902 17.3341 21.3334 16.3773 21.3334 15.2008C21.3334 14.0242 22.2902 13.0674 23.4667 13.0674C24.6432 13.0674 25.6 14.0242 25.6 15.2008C25.6 16.3773 24.6432 17.3341 23.4667 17.3341Z"
                                                    fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_3779_11173">
                                                    <rect width="32" height="32" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </div>
                                    <div>
                                        <p class="font-weight-bold mt-0">{{ $t("email_us") }}</p>
                                        <p class="font-weight-bold mt-0" v-html="globalSettings.primary_email?.value">
                                        </p>
                                    </div>
                                </div>
                            </v-col>
                            <v-col :class="globalSettings.primary_email ? 'justify-start' : 'justify-center'"
                                class="d-flex pb-3 px-4" v-if="globalSettings.subscription_phone?.displayed" cols="12"
                                md="5" sm="12" :offset-md="globalSettings.primary_phone?.displayed ? '1' : ''">
                                <div class="d-flex flex-wrap align-center gap-sm justify-center justify-md-start">
                                    <div class="footer-links__icon__wrapper">

                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15 0C12.0333 0 9.13319 0.879735 6.66645 2.52796C4.19972 4.17618 2.27713 6.51886 1.14181 9.25975C0.00649941 12.0006 -0.290551 15.0166 0.288228 17.9264C0.867006 20.8361 2.29562 23.5088 4.3934 25.6066C6.49119 27.7044 9.16394 29.133 12.0737 29.7118C14.9834 30.2906 17.9994 29.9935 20.7403 28.8582C23.4812 27.7229 25.8238 25.8003 27.4721 23.3336C29.1203 20.8668 30 17.9667 30 15C30 11.0218 28.4197 7.20644 25.6066 4.3934C22.7936 1.58035 18.9783 0 15 0ZM15.643 9.214C17.0065 9.21559 18.3137 9.75795 19.2779 10.7221C20.2421 11.6863 20.7844 12.9935 20.786 14.357H19.5C19.4989 13.3344 19.0922 12.354 18.3691 11.6309C17.646 10.9078 16.6656 10.5011 15.643 10.5V9.214ZM19.808 24C19.769 24 15.908 23.934 10.943 19.057C6.06601 14.094 6.00001 10.231 6.00001 10.192C6.00001 9.711 9.00001 6 9.66301 6C9.89301 6 10.072 6.156 10.268 6.39C10.74 6.952 12.827 10.246 12.731 10.795C12.685 11.053 12.466 11.249 11.838 11.776C11.5286 12.0193 11.239 12.2868 10.972 12.576C11.0999 13.1052 11.2898 13.6174 11.538 14.102C12.4625 16.0029 13.9986 17.5383 15.9 18.462C16.3846 18.7102 16.8968 18.9001 17.426 19.028C17.7152 18.761 17.9827 18.4714 18.226 18.162C18.753 17.534 18.949 17.315 19.207 17.269C19.756 17.169 23.05 19.26 23.612 19.732C23.846 19.932 24.002 20.107 24.002 20.337C24 21 20.289 24 19.808 24ZM22.714 14.357C22.7119 12.4823 21.9662 10.685 20.6406 9.35939C19.315 8.03378 17.5177 7.28812 15.643 7.286V6C17.8586 6.00265 19.9827 6.88396 21.5494 8.45063C23.116 10.0173 23.9974 12.1414 24 14.357H22.714Z"
                                                fill="white" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="font-weight-bold mt-0">{{ $t("for_reservations") }}</p>
                                        <p class="font-weight-bold mt-0">
                                            {{
                                                `\u202A(${globalSettings.subscription_phone?.country_code})
                                            ${globalSettings.subscription_phone?.number}\u202C`
                                            }}
                                        </p>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>

                        <div v-else class="d-flex justify-center mt-5 hidden-md-and-up">
                            <div class="ps-7" style="min-width: 248px;">
                                <div class="d-flex mb-5" v-if="globalSettings.primary_email?.displayed"
                                    :offset-md="hasAndroidApp || hasIosApp ? '1' : '0'">

                                    <div class="footer-links__icon__wrapper">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_3779_11173)">
                                                <path
                                                    d="M16 0.800781C7.17764 0.800781 4.30008e-05 7.26051 4.30008e-05 15.2008C4.30008e-05 17.9762 0.87791 20.6648 2.54298 22.9896C2.22778 26.476 1.38298 29.0642 0.15631 30.2904C-0.00582366 30.4525 -0.046357 30.7005 0.056043 30.9053C0.14671 31.0882 0.333376 31.2008 0.533376 31.2008C0.55791 31.2008 0.582443 31.1992 0.60751 31.1954C0.82351 31.165 5.84111 30.4429 9.47044 28.348C11.5312 29.1794 13.7264 29.6008 16 29.6008C24.8224 29.6008 32 23.141 32 15.2008C32 7.26051 24.8224 0.800781 16 0.800781ZM8.53338 17.3341C7.35684 17.3341 6.40004 16.3773 6.40004 15.2008C6.40004 14.0242 7.35684 13.0674 8.53338 13.0674C9.70991 13.0674 10.6667 14.0242 10.6667 15.2008C10.6667 16.3773 9.70991 17.3341 8.53338 17.3341ZM16 17.3341C14.8235 17.3341 13.8667 16.3773 13.8667 15.2008C13.8667 14.0242 14.8235 13.0674 16 13.0674C17.1766 13.0674 18.1334 14.0242 18.1334 15.2008C18.1334 16.3773 17.1766 17.3341 16 17.3341ZM23.4667 17.3341C22.2902 17.3341 21.3334 16.3773 21.3334 15.2008C21.3334 14.0242 22.2902 13.0674 23.4667 13.0674C24.6432 13.0674 25.6 14.0242 25.6 15.2008C25.6 16.3773 24.6432 17.3341 23.4667 17.3341Z"
                                                    fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_3779_11173">
                                                    <rect width="32" height="32" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div class="ps-3" style="text-align: start">
                                        <p class="font-weight-bold mt-n2">{{ $t("email_us") }}</p>
                                        <p class="font-weight-bold mt-0" style="overflow-wrap: anywhere;"
                                            v-html="globalSettings.primary_email?.value">
                                        </p>
                                    </div>

                                </div>

                                <div class="d-flex" v-if="globalSettings.subscription_phone?.displayed">

                                    <div class="footer-links__icon__wrapper">
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15 0C12.0333 0 9.13319 0.879735 6.66645 2.52796C4.19972 4.17618 2.27713 6.51886 1.14181 9.25975C0.00649941 12.0006 -0.290551 15.0166 0.288228 17.9264C0.867006 20.8361 2.29562 23.5088 4.3934 25.6066C6.49119 27.7044 9.16394 29.133 12.0737 29.7118C14.9834 30.2906 17.9994 29.9935 20.7403 28.8582C23.4812 27.7229 25.8238 25.8003 27.4721 23.3336C29.1203 20.8668 30 17.9667 30 15C30 11.0218 28.4197 7.20644 25.6066 4.3934C22.7936 1.58035 18.9783 0 15 0ZM15.643 9.214C17.0065 9.21559 18.3137 9.75795 19.2779 10.7221C20.2421 11.6863 20.7844 12.9935 20.786 14.357H19.5C19.4989 13.3344 19.0922 12.354 18.3691 11.6309C17.646 10.9078 16.6656 10.5011 15.643 10.5V9.214ZM19.808 24C19.769 24 15.908 23.934 10.943 19.057C6.06601 14.094 6.00001 10.231 6.00001 10.192C6.00001 9.711 9.00001 6 9.66301 6C9.89301 6 10.072 6.156 10.268 6.39C10.74 6.952 12.827 10.246 12.731 10.795C12.685 11.053 12.466 11.249 11.838 11.776C11.5286 12.0193 11.239 12.2868 10.972 12.576C11.0999 13.1052 11.2898 13.6174 11.538 14.102C12.4625 16.0029 13.9986 17.5383 15.9 18.462C16.3846 18.7102 16.8968 18.9001 17.426 19.028C17.7152 18.761 17.9827 18.4714 18.226 18.162C18.753 17.534 18.949 17.315 19.207 17.269C19.756 17.169 23.05 19.26 23.612 19.732C23.846 19.932 24.002 20.107 24.002 20.337C24 21 20.289 24 19.808 24ZM22.714 14.357C22.7119 12.4823 21.9662 10.685 20.6406 9.35939C19.315 8.03378 17.5177 7.28812 15.643 7.286V6C17.8586 6.00265 19.9827 6.88396 21.5494 8.45063C23.116 10.0173 23.9974 12.1414 24 14.357H22.714Z"
                                                fill="white" />
                                        </svg>
                                    </div>
                                    <div class="ps-3" style="text-align: start">
                                        <p class="font-weight-bold mt-n2">{{ $t("for_reservations") }}</p>
                                        <p class="font-weight-bold mt-0" style="overflow-wrap: anywhere;">
                                            {{
                                                `\u202A(${globalSettings.subscription_phone?.country_code})
                                            ${globalSettings.subscription_phone?.number}\u202C`
                                            }}
                                        </p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </section>

        <!-- Payment methods -->
        <div class="footer__payments mt-2 d-flex flex-wrap align-center justify-center"
            v-if="payments && payments.length">
            <div v-for="payment in payments" :key="payment.id" class="me-2 my-1">
                <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                        <div v-bind="props">
                            <v-img :src="payment.image.path" :alt="payment.name" contain width="40"
                                class="default-footer__payment-img" />
                        </div>
                    </template>
                    <span>{{ payment.name }}</span>
                </v-tooltip>
            </div>
        </div>

        <section class="footer-info mt-6 mb-3 mb-0">
            <v-container>
                <v-row :class="visibleColumns == 2 ? 'mx-lg-16 px-lg-16' : ''">
                    <v-col cols="12">
                        <v-row>
                            <v-col v-if="definitionLinks.length" cols="12" :md="colMd"
                                class="d-flex flex-wrap justify-md-center">
                                <section class="links">
                                    <h3 class="font-weight-black footer-text my-0" style="font-size: 20px;">{{
                                        $t("defination") }}</h3>
                                    <ul class="ps-0 my-0">
                                        <li v-for="(link, i) in definitionLinks" :key="i" class="mt-2">
                                            <nuxt-link :to="link.to" class="text-white px-2">
                                                <span class="font-weight-bold ps-2"
                                                    style="font-size: 14px; font-weight: 600;">{{ link.title ||
                                                        "" }}</span>
                                            </nuxt-link>
                                        </li>
                                    </ul>
                                </section>
                            </v-col>

                            <v-col v-if="importantLinks.length" cols="12" :md="colMd" class="d-flex justify-md-center">
                                <section class="links">
                                    <h3 class="font-weight-black footer-text my-0" style="font-size: 20px;">{{
                                        $t("important") }}</h3>
                                    <ul class="ps-0 my-0">
                                        <li v-for="(link, i) in importantLinks" :key="i" class="mt-2 links__icon">
                                            <nuxt-link class="text-white px-2" :to="link.to">
                                                <span class="ps-2" style="font-size: 14px; font-weight: 600;">{{
                                                    link.title || "" }}</span>
                                            </nuxt-link>
                                        </li>
                                    </ul>
                                </section>
                            </v-col>
                            <v-col v-if="discoverLinks.length" cols="12" :md="colMd" class="d-flex justify-md-center">
                                <section class="links">
                                    <h3 class="font-weight-black footer-text my-0" style="font-size: 20px;">{{
                                        $t("discover")
                                        }}</h3>
                                    <ul class="ps-0 my-0">
                                        <li v-for="(link, i) in discoverLinks" :key="i" class="mt-2 links__icon">
                                            <nuxt-link class="text-white px-2" :to="link.to">
                                                <span class="ps-2" style="font-size: 14px; font-weight: 600;">{{
                                                    link.title || "" }}</span>
                                            </nuxt-link>
                                        </li>
                                    </ul>
                                </section>
                            </v-col>

                            <v-col v-if="displaySocial.length && socials.length" cols="12" :md="colMd"
                                class="d-flex justify-md-center">
                                <section class="links">
                                    <h3 class="text-white footer-text my-0">
                                        {{ $t("social__contacts") }}
                                    </h3>
                                    <ul class="mt-4 ps-0 my-0">
                                        <li v-for="(social, i) in socials" :key="i" class="mt-2 links__icon mb-4">
                                            <a v-if="social.display" class="px-2 d-flex flex-wrap align-center"
                                                :href="social.to" target="_blank">
                                                <span class="footer-links__social-icon__wrapper"
                                                    v-html="social.icon"></span>

                                                <span style="font-size: 14px" class="px-2 text-white text-center">
                                                    {{ social.text || "" }}
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </section>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </section>

        <div class="hidden-md-and-down">
            <LazyLegalInfo />
        </div>
        <div class="hidden-lg-and-up">
            <LazyLegalInfoMobile />
        </div>
        <section class="primary">
            <v-container style="padding-inline: 0px;padding-bottom: 0px;padding-top: 0px;">
                <v-row>
                    <v-col cols="12" class="pa-0">
                        <p class="text-white text-center d-flex justify-center mb-0 mb-md-3 mt-0" v-if="company">
                            {{ $t("right_reserved") }} &copy; {{ new Date().getFullYear() }}
                            {{ company.display_name }}
                        </p>
                    </v-col>
                </v-row>
            </v-container>

            <ReleaseVersions />
        </section>
    </footer>
</template>
<script setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
    globalSettings: {
        type: Object,
        default: () => ({})
    },
    company: {
        type: Object,
        default: () => null
    },
    payments: {
        type: Array,
        default: () => []
    },
    definitionLinks: {
        type: Array,
        default: () => []
    },
    importantLinks: {
        type: Array,
        default: () => []
    },
    discoverLinks: {
        type: Array,
        default: () => []
    },
    socials: {
        type: Array,
        default: () => []
    },
    displaySocial: {
        type: Array,
        default: () => []
    },
    hasAndroidApp: {
        type: Boolean,
        default: false
    },
    hasIosApp: {
        type: Boolean,
        default: false
    }
})

const { mdAndUp } = useDisplay()

const visibleColumns = computed(() => {
    return [
        props.definitionLinks.length > 0,
        props.importantLinks.length > 0,
        props.discoverLinks.length > 0,
        props.displaySocial.length > 0 && props.socials.length > 0
    ].filter(Boolean).length
})

const colMd = computed(() => {
    return {
        1: 12,
        2: 6,
        3: 4,
        4: 3
    }[visibleColumns.value] || 3
})
</script>
<style>
.v-tooltip .v-overlay__content {
    background-color: var(--secondary);
}
</style>
