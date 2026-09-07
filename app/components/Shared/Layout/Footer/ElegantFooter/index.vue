<template>
    <footer class="elegant-footer text-white mt-8">
        <section v-if="importantLinks.length" class="mb-lg-13 mb-2">
            <v-col cols="12" class="d-flex justify-md-center">
                <section>
                    <ul class="d-lg-flex d-md-flex mb-0 mt-3 ps-0">
                        <li v-for="(link, i) in importantLinks" :key="i" class="mt-2 mx-2">
                            <nuxt-link class="text-white px-2" :to="link.to">
                                <span style="font-size: 14px; font-weight: 600;">{{
                                    link.title || "" }}</span>
                            </nuxt-link>
                        </li>
                    </ul>
                </section>
            </v-col>
        </section>
        <section class="elegant-footer-info mt-lg-6 mb-0 mb-md-3">
            <v-container>
                <v-row :class="visibleColumns == 2 ? 'mx-lg-16 px-lg-16' : ''">
                    <v-col v-if="discoverLinks.length" cols="12" :md="colMd" class="d-flex justify-md-center">
                        <section class="links">
                            <h3 class="font-weight-black elegant-footer-text" style="font-size: 20px;">{{
                                $t("discover")
                                }}</h3>
                            <ul class="mt-0 ps-0">
                                <li v-for="(link, i) in discoverLinks" :key="i" class="mt-2 links__icon">
                                    <nuxt-link class="text-white pe-2" :to="link.to">
                                        <span style="font-size: 14px; font-weight: 600;">{{
                                            link.title || "" }}</span>
                                    </nuxt-link>
                                </li>
                            </ul>
                        </section>
                    </v-col>

                    <v-col v-if="definitionLinks.length" cols="12" :md="colMd"
                        class="d-flex flex-wrap justify-md-center">
                        <section class="links">
                            <h3 class="font-weight-black elegant-footer-text" style="font-size: 20px;">{{
                                $t("defination") }}</h3>
                            <ul class="mt-0 ps-0">
                                <li v-for="(link, i) in definitionLinks" :key="i" class="mt-2">
                                    <nuxt-link :to="link.to" class="text-white pe-2">
                                        <span class="font-weight-bold" style="font-size: 14px; font-weight: 600;">{{
                                            link.title ||
                                            "" }}</span>
                                    </nuxt-link>
                                </li>
                            </ul>
                        </section>
                    </v-col>

                    <v-col v-if="globalSettings?.primary_email || globalSettings?.subscription_phone" cols="12"
                        :md="colMd" class="d-flex flex-wrap justify-md-center">
                        <section class="links">
                            <h3 class="font-weight-black elegant-footer-text" style="font-size: 20px;">{{
                                $t("contact") }}</h3>
                            <ul class="ms-n5 mt-0 ps-0">
                                <li v-if="globalSettings?.primary_email?.value" class="mt-2">
                                    <div class="d-flex align-start gap-sm justify-start">
                                        <div class="elegant-footer-links__icon__wrapper my-auto">

                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_3779_11173)">
                                                    <path
                                                        d="M16 0.800781C7.17764 0.800781 4.30008e-05 7.26051 4.30008e-05 15.2008C4.30008e-05 17.9762 0.87791 20.6648 2.54298 22.9896C2.22778 26.476 1.38298 29.0642 0.15631 30.2904C-0.00582366 30.4525 -0.046357 30.7005 0.056043 30.9053C0.14671 31.0882 0.333376 31.2008 0.533376 31.2008C0.55791 31.2008 0.582443 31.1992 0.60751 31.1954C0.82351 31.165 5.84111 30.4429 9.47044 28.348C11.5312 29.1794 13.7264 29.6008 16 29.6008C24.8224 29.6008 32 23.141 32 15.2008C32 7.26051 24.8224 0.800781 16 0.800781ZM8.53338 17.3341C7.35684 17.3341 6.40004 16.3773 6.40004 15.2008C6.40004 14.0242 7.35684 13.0674 8.53338 13.0674C9.70991 13.0674 10.6667 14.0242 10.6667 15.2008C10.6667 16.3773 9.70991 17.3341 8.53338 17.3341ZM16 17.3341C14.8235 17.3341 13.8667 16.3773 13.8667 15.2008C13.8667 14.0242 14.8235 13.0674 16 13.0674C17.1766 13.0674 18.1334 14.0242 18.1334 15.2008C18.1334 16.3773 17.1766 17.3341 16 17.3341ZM23.4667 17.3341C22.2902 17.3341 21.3334 16.3773 21.3334 15.2008C21.3334 14.0242 22.2902 13.0674 23.4667 13.0674C24.6432 13.0674 25.6 14.0242 25.6 15.2008C25.6 16.3773 24.6432 17.3341 23.4667 17.3341Z"
                                                        fill="var(--secondary)" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_3779_11173">
                                                        <rect width="32" height="32" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                        </div>
                                        <div class="d-flex flex-column justify-space-between mb-2">
                                            <p class="font-weight-bold mb-1 mt-0">{{ $t("email_us") }}</p>
                                            <p class="font-weight-bold mt-0"
                                                v-html="globalSettings.primary_email?.value">
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li v-if="globalSettings?.subscription_phone" class="mt-3">
                                    <div class="d-flex align-start gap-sm justify-start">
                                        <div class="elegant-footer-links__icon__wrapper my-auto">


                                            <svg width="24" height="33" viewBox="0 0 24 33" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M23.3078 27.8968L23.0947 26.5407C22.9118 25.3733 22.1734 24.3585 21.1198 23.8265L16.6347 21.5596C16.0841 21.2819 15.9266 20.4037 15.9107 20.3562C15.8622 20.2772 15.78 20.2296 15.6537 20.2296C15.6499 20.2296 15.6461 20.2296 15.6423 20.2296C15.5349 20.2446 15.4469 20.3247 15.4178 20.4342L14.9002 22.4324L11.6664 28.8876L8.44074 22.4539L7.91451 20.4342C7.8865 20.3252 7.79826 20.2446 7.65055 20.2266C7.5575 20.2266 7.47201 20.2751 7.4075 20.3947C7.40598 20.4037 7.25023 21.281 6.69805 21.5596L2.21223 23.8265C1.15906 24.3589 0.420956 25.3732 0.237851 26.5407L0.024804 27.8968C-0.0588679 28.4282 0.0601946 29.1709 0.519335 29.5462C0.573359 29.5907 0.641152 29.6568 0.726991 29.7408C1.55258 30.5465 4.0649 32.9985 11.6664 32.9985C19.2665 32.9985 21.7795 30.5465 22.6053 29.7408C22.6913 29.6573 22.7593 29.5907 22.8134 29.5462C23.2728 29.1703 23.3917 28.4277 23.3078 27.8968Z"
                                                    fill="var(--secondary)" />
                                                <path
                                                    d="M13.8047 8.07892C14.8916 10.3227 16.3801 13.3968 17.0298 13.8431L17.1531 13.9277L17.605 10.0465C17.7288 8.34157 17.2305 6.72779 16.2021 5.50228C15.0779 4.16268 13.4251 3.39453 11.6674 3.39453C9.90955 3.39453 8.25662 4.16268 7.13244 5.50228C6.10388 6.72727 5.60548 8.34157 5.72959 10.0505L6.14068 13.8927L6.2782 13.7275C6.56185 13.3877 7.07296 13.033 7.71996 12.5836C9.21632 11.5448 11.4654 9.98351 13.2319 6.90349C13.3955 7.23375 13.5903 7.63606 13.8047 8.07892Z"
                                                    fill="var(--secondary)" />
                                                <path
                                                    d="M2.64913 15.6418C2.72489 15.9886 3.00397 16.2308 3.32776 16.2308C3.38249 16.2308 3.43727 16.2232 3.49095 16.2093L4.66727 15.8985C4.89169 15.8394 5.07333 15.6608 5.15483 15.4231L5.20329 15.4265L5.18126 15.3295C5.20774 15.2074 5.20845 15.0878 5.18343 14.9727L4.57018 12.1809C4.42311 11.2076 4.34852 10.3754 4.34852 9.70632C4.34852 5.26769 7.6313 1.65677 11.6663 1.65677C15.7012 1.65677 18.9839 5.26769 18.9839 9.70632C18.9839 10.3749 18.9093 11.2076 18.7515 12.2119L18.149 14.9727C18.1401 15.0137 18.1347 15.0552 18.1326 15.0988L18.1086 15.1578C18.1006 15.1774 17.2896 17.1064 14.7705 17.6504C14.6397 17.3847 14.3874 17.217 14.1086 17.217H12.5908C12.1756 17.217 11.8378 17.5888 11.8378 18.0457V18.6987C11.8378 19.1555 12.1756 19.5274 12.5908 19.5274H14.1086C14.4243 19.5274 14.7061 19.3062 14.8136 18.9814C16.3213 18.6972 17.3297 17.9992 17.9124 17.4597C18.5161 16.9013 18.877 16.3293 19.054 16.0015L19.8416 16.2092C19.8951 16.2232 19.95 16.2307 20.0047 16.2307C20.3285 16.2307 20.6075 15.9885 20.6832 15.6417L21.2858 12.881C21.3755 12.4691 21.1441 12.0538 20.7698 11.9547L20.3348 11.8401C20.4381 11.0324 20.4905 10.3149 20.4905 9.70632C20.4903 4.35458 16.5319 0 11.6663 0C6.80073 0 2.84225 4.35458 2.84225 9.70645C2.84225 10.3149 2.89458 11.0325 2.99782 11.8397L2.56247 11.9548C2.18817 12.0539 1.95684 12.4692 2.04673 12.8811L2.64913 15.6418Z"
                                                    fill="var(--secondary)" />
                                            </svg>

                                        </div>
                                        <div class="d-flex flex-column justify-space-between">
                                            <p class="font-weight-bold mb-1 mt-0">{{ $t("for_reservations") }}</p>
                                            <p class="font-weight-bold mt-0">
                                                {{
                                                    `\u202A(${globalSettings.subscription_phone?.country_code})
                                                ${globalSettings.subscription_phone?.number}\u202C`
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </section>
                    </v-col>

                    <v-col v-if="((globalSettings.commercial_registration_number?.displayed &&
                        globalSettings.commercial_registration_number?.value) ||
                        (globalSettings.freelance_license_number?.displayed &&
                            globalSettings.freelance_license_number?.value) ||
                        (globalSettings.franchise_number?.displayed && globalSettings.franchise_number?.value) ||
                        (globalSettings.tourism_license_number?.displayed &&
                            globalSettings.tourism_license_number?.value)) || (payments && payments.length)" cols="12"
                        :md="colMd" class="d-lg-flex flex-wrap justify-md-center">
                        <section class="links">
                            <div v-if="(globalSettings.commercial_registration_number?.displayed &&
                                globalSettings.commercial_registration_number?.value) ||
                                (globalSettings.freelance_license_number?.displayed &&
                                    globalSettings.freelance_license_number?.value) ||
                                (globalSettings.franchise_number?.displayed && globalSettings.franchise_number?.value) ||
                                (globalSettings.tourism_license_number?.displayed &&
                                    globalSettings.tourism_license_number?.value)
                            ">
                                <h3 class="font-weight-black elegant-footer-text" style="font-size: 20px;">{{
                                    $t("licenses") }}</h3>
                                <ul class="mt-0 ps-0">
                                    <li class="d-flex mt-2" v-if="
                                        globalSettings.commercial_registration_number?.displayed &&
                                        globalSettings.commercial_registration_number?.value
                                    ">
                                        <p class="mt-0">
                                            <span> {{ $t("commercial_registration_number") }} </span>
                                            :
                                            <span>{{ globalSettings.commercial_registration_number?.value }}</span>
                                        </p>
                                    </li>

                                    <li class="d-flex mt-2" v-if="
                                        globalSettings.freelance_license_number?.displayed &&
                                        globalSettings.freelance_license_number?.value
                                    ">
                                        <p class="mt-0">
                                            <span> {{ $t("freelance_work_license_number") }} </span>
                                            :
                                            <span>{{ globalSettings.freelance_license_number?.value }} </span>
                                        </p>
                                    </li>

                                    <li class="d-flex mt-2"
                                        v-if="globalSettings.franchise_number?.displayed && globalSettings.franchise_number?.value">
                                        <p class="mt-0">
                                            <span> {{ $t("commercial_franchise_number") }} </span>
                                            :
                                            <span> {{ globalSettings.franchise_number?.value }}</span>
                                        </p>
                                    </li>
                                    <li class="d-flex mt-2" v-if="
                                        globalSettings.tourism_license_number?.displayed &&
                                        globalSettings.tourism_license_number?.value
                                    ">
                                        <p class="mt-0">
                                            <span>{{ $t("tourism_license_number") }} </span>
                                            :
                                            <span>{{ globalSettings.tourism_license_number?.value }}</span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div class="mt-7" v-if="payments && payments.length">
                                <!-- Payment methods -->
                                <div class="elegant-footer__payments mt-2 d-flex flex-wrap align-center justify-center">
                                    <div v-for="payment in payments" :key="payment.id" class="me-2 my-1">
                                        <v-tooltip color="secondary" bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <div v-on="on" v-bind="attrs">
                                                    <v-img :src="payment.image.path" :alt="payment.name" contain
                                                        width="40" class="elegant-footer__payment-img" />
                                                </div>
                                            </template>
                                            <span>{{ payment.name }}</span>
                                        </v-tooltip>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </v-col>

                </v-row>
            </v-container>
        </section>

        <section class="d-flex position-relative elegant-footer__bar__container">
            <div class="elegant-footer__right-bar hidden-md-and-down"></div>
            <div class="elegant-footer__social-bar d-flex flex-wrap mx-auto mx-lg-3">
                <div v-for="(social, i) in displaySocial" :key="i" class="mt-2 d-flex links__icon mb-4">
                    <a class="px-2 d-flex flex-wrap align-center" :href="social.to" target="_blank">
                        <span class="" v-html="social.icon"></span>
                    </a>
                </div>
            </div>
            <div class="elegant-footer__left-bar hidden-md-and-down"></div>
        </section>

        <section class="primary">
            <v-container>
                <v-row>
                    <v-col cols="12" class="pa-0">
                        <p class="text-white text-center d-flex justify-center my-0 mb-md-3" v-if="company">
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
const props = defineProps({
    globalSettings: {
        type: Object,
        default: () => ({})
    },
    company: {
        default: null
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
    hasAndroidApp: Boolean,
    hasIosApp: Boolean
})

const visibleColumns = computed(() => {
    const licensesOrPayments = Boolean(
        props.payments.length ||
        (props.globalSettings.commercial_registration_number?.displayed &&
            props.globalSettings.commercial_registration_number?.value) ||
        (props.globalSettings.freelance_license_number?.displayed &&
            props.globalSettings.freelance_license_number?.value) ||
        (props.globalSettings.franchise_number?.displayed &&
            props.globalSettings.franchise_number?.value) ||
        (props.globalSettings.tourism_license_number?.displayed &&
            props.globalSettings.tourism_license_number?.value)
    )

    return [
        props.discoverLinks.length > 0,
        props.definitionLinks.length > 0,
        props.globalSettings.subscription_phone ||
        props.globalSettings.primary_email,
        licensesOrPayments
    ].filter(Boolean).length
})

const colMd = computed(() => ({
    1: 12,
    2: 6,
    3: 4,
    4: 3
}[visibleColumns.value] || 3))
</script>