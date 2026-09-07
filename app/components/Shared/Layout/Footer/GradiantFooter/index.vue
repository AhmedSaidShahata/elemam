<template>
    <footer class="gradiant-footer text-white mt-8">
        <section v-if="importantLinks.length" class="gradiant-footer-upper">
            <v-col cols="12" class="d-flex justify-md-center pt-1">
                <section>
                    <ul class="d-lg-flex d-md-flex mt-0 mb-3 ps-0">
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
        <div class="gradiant-footer-container pt-5">
            <section class="gradiant-footer-info mb-0 mb-md-3">
                <v-container>
                    <v-row :class="visibleColumns == 2 ? 'mx-lg-16 px-lg-16' : ''">
                        <v-col v-if="discoverLinks.length" cols="12" :md="colMd" class="d-flex justify-md-center">
                            <section class="links">
                                <p class="font-weight-black gradiant-footer-text mb-2 mt-0">{{
                                    $t("discover")
                                }}</p>
                                <ul class="ps-0 mt-0">
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
                                <p class="font-weight-black gradiant-footer-text mb-3 mt-0">{{
                                    $t("defination") }}</p>
                                <ul class="ps-0 mt-0">
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

                        <v-col v-if="(globalSettings?.primary_email) || (globalSettings?.subscription_phone)" cols="12"
                            :md="colMd" class="d-flex flex-wrap justify-md-center">
                            <section class="links ms-md-n15">
                                <p class="font-weight-black gradiant-footer-text mb-3 mt-0">{{
                                    $t("contact") }}</p>
                                <ul class="ps-0 mt-0">
                                    <li v-if="globalSettings?.primary_email" class="mt-2">
                                        <div class="d-flex align-start gap-sm justify-start">
                                            <div class="gradiant-footer-links__icon__wrapper my-auto">


                                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_3780_14396)">
                                                        <path
                                                            d="M23.5 9.4375C24.2754 9.4375 24.9062 8.80662 24.9062 8.03125C24.9062 7.25587 24.2754 6.625 23.5 6.625C22.7246 6.625 22.0938 7.25587 22.0938 8.03125C22.0938 8.80662 22.7246 9.4375 23.5 9.4375ZM23.5 7.5625C23.7585 7.5625 23.9688 7.77275 23.9688 8.03125C23.9688 8.28975 23.7585 8.5 23.5 8.5C23.2415 8.5 23.0312 8.28975 23.0312 8.03125C23.0312 7.77275 23.2415 7.5625 23.5 7.5625Z"
                                                            fill="white" />
                                                        <path
                                                            d="M21.1562 8.03125C21.1562 7.25587 20.5254 6.625 19.75 6.625C18.9746 6.625 18.3438 7.25587 18.3438 8.03125C18.3438 8.80662 18.9746 9.4375 19.75 9.4375C20.5254 9.4375 21.1562 8.80662 21.1562 8.03125ZM19.2812 8.03125C19.2812 7.77275 19.4915 7.5625 19.75 7.5625C20.0085 7.5625 20.2188 7.77275 20.2188 8.03125C20.2188 8.28975 20.0085 8.5 19.75 8.5C19.4915 8.5 19.2812 8.28975 19.2812 8.03125Z"
                                                            fill="white" />
                                                        <path
                                                            d="M17.4062 8.03125C17.4062 7.25587 16.7754 6.625 16 6.625C15.2246 6.625 14.5938 7.25587 14.5938 8.03125C14.5938 8.80662 15.2246 9.4375 16 9.4375C16.7754 9.4375 17.4062 8.80662 17.4062 8.03125ZM15.5312 8.03125C15.5312 7.77275 15.7415 7.5625 16 7.5625C16.2585 7.5625 16.4688 7.77275 16.4688 8.03125C16.4688 8.28975 16.2585 8.5 16 8.5C15.7415 8.5 15.5312 8.28975 15.5312 8.03125Z"
                                                            fill="white" />
                                                        <path
                                                            d="M29.6562 0.0625H9.84375C8.55138 0.0625 7.5 1.11388 7.5 2.40625V10.8438C7.5 11.1027 7.70988 11.3125 7.96875 11.3125C8.22762 11.3125 8.4375 11.1027 8.4375 10.8438V2.40625C8.4375 1.63087 9.06831 1 9.84375 1H29.6562C30.4317 1 31.0625 1.63087 31.0625 2.40625V18.1496L28.1127 15.1998C28.0248 15.1119 27.9056 15.0626 27.7812 15.0626H24.5V14.5938C24.5 13.3014 23.4486 12.2501 22.1562 12.2501H2.34375C1.05138 12.25 0 13.3014 0 14.5938V31.4688C0 31.6583 0.114188 31.8293 0.289375 31.9018C0.347375 31.9258 0.40825 31.9375 0.468688 31.9375C0.590688 31.9375 0.710562 31.8899 0.80025 31.8002L4.41288 28.1875H22.1562C23.4486 28.1875 24.5 27.1361 24.5 25.8438V16H27.5871L31.1998 19.6127C31.2895 19.7024 31.4094 19.75 31.5314 19.75C31.5918 19.75 31.6527 19.7383 31.7107 19.7143C31.8859 19.6418 32.0001 19.4708 32.0001 19.2812V2.40625C32 1.11388 30.9486 0.0625 29.6562 0.0625ZM23.5625 25.8438C23.5625 26.6191 22.9317 27.25 22.1562 27.25H4.21875C4.09444 27.25 3.97519 27.2994 3.88731 27.3873L0.9375 30.3371V14.5938C0.9375 13.8184 1.56831 13.1875 2.34375 13.1875H22.1562C22.9317 13.1875 23.5625 13.8184 23.5625 14.5938V25.8438Z"
                                                            fill="white" />
                                                        <path
                                                            d="M8.5 18.8125C7.72456 18.8125 7.09375 19.4434 7.09375 20.2188C7.09375 20.9941 7.72456 21.625 8.5 21.625C9.27544 21.625 9.90625 20.9941 9.90625 20.2188C9.90625 19.4434 9.27544 18.8125 8.5 18.8125ZM8.5 20.6875C8.2415 20.6875 8.03125 20.4772 8.03125 20.2188C8.03125 19.9603 8.2415 19.75 8.5 19.75C8.7585 19.75 8.96875 19.9603 8.96875 20.2188C8.96875 20.4772 8.7585 20.6875 8.5 20.6875Z"
                                                            fill="white" />
                                                        <path
                                                            d="M12.25 18.8125C11.4746 18.8125 10.8438 19.4434 10.8438 20.2188C10.8438 20.9941 11.4746 21.625 12.25 21.625C13.0254 21.625 13.6562 20.9941 13.6562 20.2188C13.6562 19.4434 13.0254 18.8125 12.25 18.8125ZM12.25 20.6875C11.9915 20.6875 11.7812 20.4772 11.7812 20.2188C11.7812 19.9603 11.9915 19.75 12.25 19.75C12.5085 19.75 12.7188 19.9603 12.7188 20.2188C12.7188 20.4772 12.5085 20.6875 12.25 20.6875Z"
                                                            fill="white" />
                                                        <path
                                                            d="M16 18.8125C15.2246 18.8125 14.5938 19.4434 14.5938 20.2188C14.5938 20.9941 15.2246 21.625 16 21.625C16.7754 21.625 17.4062 20.9941 17.4062 20.2188C17.4062 19.4434 16.7754 18.8125 16 18.8125ZM16 20.6875C15.7415 20.6875 15.5312 20.4772 15.5312 20.2188C15.5312 19.9603 15.7415 19.75 16 19.75C16.2585 19.75 16.4688 19.9603 16.4688 20.2188C16.4688 20.4772 16.2585 20.6875 16 20.6875Z"
                                                            fill="white" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_3780_14396">
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
                                    <li v-if="globalSettings?.subscription_phone">
                                        <div class="d-flex align-start gap-sm justify-start">
                                            <div class="gradiant-footer-links__icon__wrapper my-auto">


                                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_3780_14405)">
                                                        <path
                                                            d="M18.2148 0C17.8696 0 17.5898 0.279785 17.5898 0.624999C17.5898 0.970214 17.8696 1.25 18.2148 1.25C25.1267 1.25 30.7497 6.87328 30.7497 13.7849C30.7497 14.1301 31.0298 14.4099 31.3747 14.4099C31.72 14.4099 31.9997 14.1301 31.9997 13.7849C31.9997 6.18407 25.8159 0 18.2148 0Z"
                                                            fill="white" />
                                                        <path
                                                            d="M27.615 14.4121C27.9602 14.4121 28.24 14.1321 28.24 13.7871C28.24 8.25903 23.7427 3.76172 18.2148 3.76172C17.8696 3.76172 17.5898 4.04175 17.5898 4.38672C17.5898 4.73193 17.8696 5.01172 18.2148 5.01172C23.0535 5.01172 26.99 8.94824 26.99 13.7871C26.99 14.1321 27.2698 14.4121 27.615 14.4121Z"
                                                            fill="white" />
                                                        <path
                                                            d="M23.2295 13.7881C23.2295 14.133 23.5093 14.4131 23.8545 14.4131C24.1997 14.4131 24.4795 14.133 24.4795 13.7881C24.4795 10.3337 21.6692 7.52344 18.2148 7.52344C17.8696 7.52344 17.5898 7.80322 17.5898 8.14819C17.5898 8.49341 17.8696 8.77319 18.2148 8.77319C20.98 8.77319 23.2295 11.0227 23.2295 13.7881Z"
                                                            fill="white" />
                                                        <path
                                                            d="M17.5898 11.9062C17.5898 12.2512 17.8696 12.531 18.2148 12.531C18.9067 12.531 19.4697 13.094 19.4697 13.7861C19.4697 14.1311 19.7495 14.4111 20.0947 14.4111C20.4397 14.4111 20.7197 14.1311 20.7197 13.7861C20.7197 12.4048 19.5959 11.2812 18.2148 11.2812C17.8696 11.2812 17.5898 11.561 17.5898 11.9062Z"
                                                            fill="white" />
                                                        <path
                                                            d="M11.7148 20.293C11.7148 20.6382 11.4351 20.918 11.0898 20.918C10.7446 20.918 10.4648 20.6382 10.4648 20.293C10.4648 19.948 10.7446 19.668 11.0898 19.668C11.4351 19.668 11.7148 19.948 11.7148 20.293Z"
                                                            fill="white" />
                                                        <path
                                                            d="M17.127 31.2415C19.9729 32.6363 23.3968 32.056 25.6473 29.8055L26.9395 28.5132C27.6411 27.8123 27.6414 26.6768 26.9397 25.9754L21.9466 20.9827C21.2461 20.2813 20.1104 20.2803 19.4092 20.9825L17.2876 23.1043C16.8721 23.5198 16.2308 23.6046 15.763 23.306C15.0003 22.8184 14.2584 22.2808 13.5579 21.7081C13.2906 21.4896 12.897 21.5291 12.6785 21.7962C12.46 22.0635 12.4996 22.4573 12.7667 22.6756C13.5047 23.2791 14.2862 23.8455 15.0901 24.3592C16.0484 24.9713 17.3443 24.8153 18.1714 23.9881L20.2935 21.866C20.5057 21.6536 20.8494 21.6531 21.0625 21.8663L26.0559 26.8592C26.2686 27.0721 26.2691 27.4163 26.0559 27.629L24.7635 28.9217C22.8887 30.7964 20.0411 31.2776 17.677 30.1192C9.01666 25.8724 4.30475 19.1385 1.87702 14.2371C0.715645 11.8931 1.19782 9.05624 3.07697 7.17758L4.34113 5.91366C4.55304 5.70126 4.89704 5.70053 5.10993 5.91391L10.1038 10.9076C10.3152 11.1187 10.3174 11.463 10.1033 11.6766L7.98175 13.7984C7.1546 14.6256 6.99859 15.9215 7.61065 16.88C7.97125 17.4442 8.35992 18.0008 8.76617 18.5343C8.97515 18.8089 9.36724 18.8619 9.6419 18.6529C9.91656 18.4439 9.96978 18.0518 9.76055 17.7769C9.3753 17.2708 9.00616 16.7425 8.66388 16.2071C8.36529 15.7391 8.45001 15.0977 8.86554 14.6822L10.9869 12.5609C11.6883 11.8604 11.689 10.7244 10.9874 10.0235L5.99396 5.03036C5.29376 4.32895 4.15778 4.32797 3.45685 5.03012L2.19318 6.29379C-0.0656044 8.55184 -0.642752 11.9671 0.756904 14.7921C3.27082 19.867 8.15118 26.8402 17.127 31.2415Z"
                                                            fill="white" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_3780_14405">
                                                            <rect width="32" height="32" fill="white" />
                                                        </clipPath>
                                                    </defs>
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

                        <v-col v-if="licensesOrPayments" cols="12" :md="colMd"
                            class="d-lg-flex flex-column justify-center">
                            <section v-if="hasLicenses" class="links">
                                <p class="font-weight-black gradiant-footer-text mb-3 mt-0">{{
                                    $t("licenses") }}</p>
                                <ul class="ps-0 my-0">
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
                            </section>

                            <div v-if="payments && payments.length" class="mt-7">
                                <!-- Payment methods -->
                                <div class="elegant-footer__payments mt-2 d-flex flex-wrap align-center justify-center">
                                    <div v-for="payment in payments" :key="payment.id" class="me-2 my-1">
                                        <v-tooltip color="secondary" location="bottom">
                                            <template v-slot:activator="{ props }">
                                                <div v-bind="props">
                                                    <v-img :src="payment.image.path" :alt="payment.name" contain
                                                        width="40" class="elegant-footer__payment-img" />
                                                </div>
                                            </template>
                                            <span>{{ payment.name }}</span>
                                        </v-tooltip>
                                    </div>
                                </div>
                            </div>
                        </v-col>

                    </v-row>
                </v-container>
            </section>

            <section v-if="socials.length" class="d-flex justify-center position-relative">
                <div class="gradiant-footer__social-bar d-flex flex-wrap mx-auto mx-lg-3 w-100">
                    <div v-for="(social, i) in displaySocial" :key="i" class="mt-2 d-flex links__icon mb-4">
                        <a class="px-2 d-flex flex-wrap align-center" :href="social.to" target="_blank">
                            <span class="" v-html="social.icon"></span>
                        </a>
                    </div>
                </div>
            </section>
        </div>

        <section class="primary">
            <v-container>
                <v-row>
                    <v-col cols="12" class="pa-0">
                        <p class="text-white text-center mt-0 d-flex justify-center mb-0 mb-md-3" v-if="company">
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
    hasAndroidApp: {
        type: Boolean,
        default: false
    },
    hasIosApp: {
        type: Boolean,
        default: false
    }
})

const licensesOrPayments = computed(() => {
    return Boolean(
        props.payments?.length ||
        (props.globalSettings?.commercial_registration_number?.displayed &&
            props.globalSettings?.commercial_registration_number?.value) ||
        (props.globalSettings?.freelance_license_number?.displayed &&
            props.globalSettings?.freelance_license_number?.value) ||
        (props.globalSettings?.franchise_number?.displayed &&
            props.globalSettings?.franchise_number?.value) ||
        (props.globalSettings?.tourism_license_number?.displayed &&
            props.globalSettings?.tourism_license_number?.value)
    )
})

const hasLicenses = computed(() => {
    return Boolean(
        (props.globalSettings?.commercial_registration_number?.displayed &&
            props.globalSettings?.commercial_registration_number?.value) ||
        (props.globalSettings?.freelance_license_number?.displayed &&
            props.globalSettings?.freelance_license_number?.value) ||
        (props.globalSettings?.franchise_number?.displayed &&
            props.globalSettings?.franchise_number?.value) ||
        (props.globalSettings?.tourism_license_number?.displayed &&
            props.globalSettings?.tourism_license_number?.value)
    )
})

const visibleColumns = computed(() => {
    return [
        props.discoverLinks.length > 0,
        props.definitionLinks.length > 0,
        props.globalSettings?.subscription_phone ||
        props.globalSettings?.primary_email,
        licensesOrPayments.value
    ].filter(Boolean).length
})

const colMd = computed(() => ({
    1: 12,
    2: 6,
    3: 4,
    4: 3
}[visibleColumns.value] || 3))
</script>