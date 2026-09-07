<template>
    <component :is="footerComponent" :globalSettings="allSettings" :company="company" :payments="payments"
        :definition-links="definitionLinks" :important-links="importantLinksToPass" :discover-links="discover_links"
        :socials="socialsToPass" :display-social="displaySocial" :has-android-app="getSpecsKey('has_android_app')"
        :has-ios-app="getSpecsKey('has_ios_app')" :excluded-features="excludedFeatures" />
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocalePath } from '#i18n';
import { useDisplay } from 'vuetify';
import useApi from "~/composables/useApi";

import DefaultFooter from './DefaultFooter'
import MosaferFooter from './MosaferFooter'
import MinimalFooter from './MinimalFooter'
import GradiantFooter from './GradiantFooter'
import ElegantFooter from './ElegantFooter'


const { t } = useI18n();
const localePath = useLocalePath();
const { mdAndUp } = useDisplay();
const { get } = useApi();


const payments = ref([]);



const { allSettings } = useSettingsStore();
const companyStore = useCompanyStore()
const company = computed(() => companyStore.company);


const fetchPayments = async () => {
    const res = await get("display-payments");
    payments.value = res?.data.data || [];
};

onMounted(async () => {
    await fetchPayments();
});

const getSpecsKey = (key) => {

    return false
};

const componentMap = {
    footer_almosafer: MosaferFooter,
    footer_default: DefaultFooter,
    footer_minimal: MinimalFooter,
    footer_gradient: GradiantFooter,
    footer_elegant: ElegantFooter
}

const footerLayoutCode = computed(() => {
    const layouts = company.value?.layouts || []
    const footerLayout = layouts.find(layout =>
        layout.layout_code?.startsWith('footer_')
    )
    return footerLayout?.layout_code || 'footer_default'
})

const footerComponent = computed(() => {
    return componentMap[footerLayoutCode.value] || DefaultFooter
})

const excludedFeatures = computed(() => {
    const list = company.value?.excluded_system_features || []

    return new Set(
        list.map(feature => feature.identifier)
    )
})

const importantLinks = computed(() => {
    return [
        {
            title: t('about_us'),
            to: localePath({ name: 'about-us' }),
            featureKey: 'about_us'
        },
        {
            title: t('contact_us'),
            to: localePath({ name: 'contact-us' }),
            featureKey: 'contact_us'
        },
        {
            title: t('terms_conidtions'),
            to: localePath({ name: 'terms-conditions' }),
            featureKey: 'terms_and_conditions'
        },
        {
            title: t('pay_policy'),
            to: localePath({ name: 'return-policy' }),
            featureKey: 'refund_policy'
        },
        {
            title: t('privacy_policy'),
            to: localePath({ name: 'privacy-policy' }),
            featureKey: 'privacy_policy'
        }
    ].filter(({ featureKey }) => {
        return !excludedFeatures.value.has(featureKey)
    })
})

const importantLinksReordered = computed(() => {
    return [
        importantLinks.value.find(i => i.featureKey === 'about_us'),
        importantLinks.value.find(i => i.featureKey === 'contact_us'),
        importantLinks.value.find(i => i.featureKey === 'terms_and_conditions'),
        importantLinks.value.find(i => i.featureKey === 'refund_policy'),
        importantLinks.value.find(i => i.featureKey === 'privacy_policy')
    ].filter(Boolean)
})

const importantLinksToPass = computed(() => {
    const reorderedFooters = [
        'footer_minimal',
        'footer_gradient',
        'footer_elegant'
    ]

    return reorderedFooters.includes(footerLayoutCode.value)
        ? importantLinksReordered.value
        : importantLinks.value
})

const definitionLinks = computed(() => {
    return [
        {
            title: t("directors"),
            to: localePath({ name: 'board-members' }),
            featureKey: 'board_members'
        },
        {
            title: t("team_members"),
            to: localePath({ name: 'team-members' }),
            featureKey: 'team_members'
        },
        {
            title: t("customer_reviews"),
            to: localePath({ name: 'customer-reviews' }),
            featureKey: 'customer_reviews'
        },
        {
            title: t("all_top_customers"),
            to: localePath({ name: 'top-customers' }),
            featureKey: 'top_customers'
        },
        {
            title: t("all_quotes"),
            to: localePath({ name: 'quotes' }),
            featureKey: 'quotes'
        },
    ].filter(({ featureKey }) => {
        return !excludedFeatures.value.has(featureKey)
    })
})

const discover_links = computed(() => {
    const baseLinks = [
        {
            title: t("services"),
            to: localePath({ name: 'services' }),
            featureKey: 'services'
        },
        {
            title: t("articles"),
            to: localePath({ name: 'blogs' }),
            featureKey: 'blogs'
        },
        {
            title: t("offers"),
            to: localePath({ name: 'offers' }),
            featureKey: 'offers'
        },
        {
            title: t("tourism_destinations"),
            to: localePath({ name: 'countries' }),
            featureKey: 'destinations'
        },
    ]

    return baseLinks.filter(({ featureKey }) => {
        return !excludedFeatures.value.has(featureKey)
    })
})

const socials = computed(() => {
    const list = [
        {
            to: (allSettings?.value?.x_page_link?.value == null) ? '' : allSettings?.value.x_page_link.value,
            icon: '<svg width="15" height="20" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.0656 0H15.12H15.1192L10.2672 5.45237L6.0744 0H0L7.2552 9.33298L0.3752 17.0667H3.3256L8.6328 11.1014L13.276 17.0667H19.2L11.632 7.22865L18.0656 0ZM15.7168 15.3352H14.0856H14.0848L3.4336 1.64098H5.1856L15.7168 15.3352Z" fill="white"/></svg>',
            text: t("x_footer"),
            display: (allSettings?.value?.x_page_link?.displayed == null) ? true : allSettings?.value.x_page_link?.displayed
        },
        {
            to: (allSettings?.value?.instagram_page_link?.value == null) ? '' : allSettings?.value.instagram_page_link.value,
            icon:
                `<svg width="15" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.62816 0H14.8929C16.353 0 17.5211 1.16807 17.5211 2.62816V5.54834V14.8929C17.5211 16.353 16.353 17.5211 14.8929 17.5211H2.62816C1.16807 17.5211 0 16.353 0 14.8929V5.54834V2.62816C0 1.69371 0.467229 0.876054 1.22648 0.408825C1.28488 0.350422 1.34328 0.292018 1.46009 0.292018C1.81051 0.116807 2.21934 0 2.62816 0ZM1.16798 3.21211V1.22638C0.817558 1.57681 0.583944 2.10244 0.583944 2.62807V5.25623H4.96422C5.08102 5.25623 5.19783 5.31464 5.25623 5.43144C5.31464 5.54825 5.25623 5.66506 5.19783 5.72346C4.49699 6.59952 4.08816 7.65078 4.08816 8.76045C4.08816 11.3302 6.19069 13.4327 8.76045 13.4327C11.3302 13.4327 13.4327 11.3302 13.4327 8.76045C13.4327 7.65078 13.0239 6.54111 12.3231 5.72346C12.2063 5.66506 12.2063 5.54825 12.2647 5.43144C12.3231 5.31464 12.4399 5.25623 12.5567 5.25623H16.937V2.62807C16.937 1.5184 16.0025 0.583944 14.8928 0.583944H4.08816V3.21211C4.08816 3.38732 3.97135 3.50413 3.79614 3.50413C3.62093 3.50413 3.50412 3.38732 3.50412 3.21211V0.583944H2.92009V3.21211C2.92009 3.38732 2.80328 3.50413 2.62807 3.50413C2.45286 3.50413 2.33605 3.38732 2.33605 3.21211V0.583944C2.10244 0.642347 1.92723 0.700751 1.75202 0.817558V3.21211C1.75202 3.38732 1.63521 3.50413 1.46 3.50413C1.28479 3.50413 1.16798 3.38732 1.16798 3.21211Z" fill="white"/>
<path d="M12.5576 4.08815H14.8938C15.069 4.08815 15.1858 3.97134 15.1858 3.79613V1.45999C15.1858 1.28478 15.069 1.16797 14.8938 1.16797H12.5576C12.3824 1.16797 12.2656 1.28478 12.2656 1.45999V3.79613C12.2656 3.97134 12.3824 4.08815 12.5576 4.08815Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.8484 8.76013C12.8484 11.0379 11.0379 12.8484 8.76013 12.8484C6.48239 12.8484 4.67188 11.0379 4.67188 8.76013C4.67188 6.48239 6.48239 4.67188 8.76013 4.67188C11.0379 4.67188 12.8484 6.48239 12.8484 8.76013ZM10.5122 8.76004C10.5122 7.76718 9.7529 7.00793 8.76004 7.00793C7.76718 7.00793 7.00793 7.76718 7.00793 8.76004C7.00793 9.7529 7.76718 10.5122 8.76004 10.5122C9.7529 10.5122 10.5122 9.7529 10.5122 8.76004Z" fill="white"/>
</svg>`,
            text: t("instagram"),
            display: (allSettings?.value?.instagram_page_link?.displayed == null) ? true : allSettings?.value.instagram_page_link?.displayed
        },
        {
            to: (allSettings?.value?.facebook_page_link?.value == null) ? '' : allSettings?.value.facebook_page_link.value,
            icon: '<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2.88889H9.04167C9.21667 2.88889 9.33333 2.77333 9.33333 2.6V0.288889C9.33333 0.115556 9.21667 0 9.04167 0H6.70833C4.55 0 2.91667 1.61778 2.91667 3.75556V6.35556H0.291667C0.116667 6.35556 0 6.47111 0 6.64444V8.95556C0 9.12889 0.116667 9.24444 0.291667 9.24444H2.91667V17.0444C2.91667 17.2178 3.03333 17.3333 3.20833 17.3333H5.54167C5.71667 17.3333 5.83333 17.2178 5.83333 17.0444V9.24444H8.45833C8.575 9.24444 8.69167 9.12889 8.75 9.01333L9.33333 6.70222C9.33333 6.64444 9.33333 6.52889 9.275 6.47111C9.21667 6.41333 9.15833 6.35556 9.04167 6.35556H5.83333V4.04444C5.83333 3.40889 6.35833 2.88889 7 2.88889Z" fill="white"/></svg>',
            text: t("facebook"),
            display: (allSettings?.value?.facebook_page_link?.displayed == null) ? true : allSettings?.value.facebook_page_link?.displayed
        },
        {
            to: (allSettings?.value?.snapchat_page_link?.value == null) ? '' : allSettings?.value.snapchat_page_link.value,
            icon: '<svg width="15" height="20" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.45098 17.3333C9.40269 17.3333 9.24652 17.3333 9.21513 17.3333C8.1092 17.3333 7.39961 16.8372 6.7132 16.3569C6.23922 16.0257 5.79185 15.7129 5.26491 15.626C5.00772 15.5839 4.75178 15.5628 4.50487 15.5628C4.05898 15.5628 3.70761 15.6308 3.45099 15.6805C3.29505 15.7107 3.16058 15.7365 3.05818 15.7365C2.95122 15.7365 2.83592 15.7137 2.78535 15.5436C2.74174 15.396 2.71024 15.2537 2.67953 15.1155C2.6011 14.7604 2.5454 14.5419 2.39517 14.5191C0.641176 14.2511 0.139008 13.8853 0.0271356 13.6261C0.0113822 13.5892 0.00224981 13.5518 0.000309177 13.5152C-0.00528444 13.4155 0.0656059 13.3274 0.165492 13.3115C2.86149 12.8723 4.07062 10.146 4.12108 10.0304C4.12211 10.0272 4.12348 10.0241 4.12519 10.021C4.29037 9.69011 4.32245 9.40281 4.22165 9.16735C4.0366 8.73629 3.43295 8.54668 3.03341 8.42121C2.93592 8.39049 2.84311 8.36169 2.77005 8.33278C1.97291 8.02109 1.90681 7.70127 1.93809 7.53831C1.99152 7.26016 2.36674 7.06648 2.67051 7.06648C2.75361 7.06648 2.82679 7.08139 2.88843 7.10973C3.24734 7.27563 3.57017 7.3601 3.84927 7.3601C4.23455 7.3601 4.4027 7.19985 4.42325 7.17885C4.41331 6.99838 4.40133 6.8099 4.38877 6.61509C4.30863 5.35421 4.20875 3.78694 4.6124 2.89275C5.82107 0.211973 8.38397 0.00327501 9.14093 0.00327501C9.16022 0.00327501 9.47289 0 9.47289 0H9.51764C10.276 0 12.8448 0.208585 14.0543 2.89117C14.4576 3.78604 14.3576 5.35432 14.2772 6.6143L14.274 6.66941C14.2627 6.84468 14.2519 7.01521 14.2427 7.17862C14.2623 7.19816 14.4169 7.34542 14.766 7.35863H14.7663C15.032 7.3487 15.3369 7.26468 15.672 7.10985C15.7698 7.06445 15.8788 7.05496 15.9529 7.05496C16.0666 7.05496 16.1813 7.07664 16.2766 7.11594L16.2826 7.11832C16.5531 7.2134 16.7308 7.40098 16.7346 7.59715C16.7382 7.78202 16.5956 8.0596 15.8963 8.33278C15.8238 8.36136 15.731 8.39027 15.6329 8.42121C15.2328 8.54668 14.6297 8.73629 14.4447 9.16735C14.3439 9.40281 14.376 9.68977 14.5411 10.0207C14.5425 10.0241 14.5441 10.027 14.5456 10.0304C14.5957 10.146 15.8035 12.8715 18.501 13.3113C18.6005 13.3274 18.6719 13.4155 18.6664 13.515C18.6641 13.5523 18.6546 13.5899 18.6386 13.6266C18.5272 13.8838 18.0257 14.2492 16.2715 14.517C16.1279 14.5389 16.0722 14.7238 15.9868 15.1114C15.9556 15.2522 15.9243 15.3908 15.881 15.5365C15.8435 15.663 15.764 15.722 15.6297 15.722H15.6082C15.5151 15.722 15.3832 15.7053 15.2156 15.6728C14.9185 15.6154 14.5856 15.5627 14.1617 15.5627C13.9142 15.5627 13.6583 15.5838 13.4009 15.6259C12.8747 15.7127 12.4277 16.0248 11.9545 16.3557C11.2671 16.8371 10.5574 17.3333 9.45098 17.3333Z" fill="white"/></svg>',
            text: t("snapchat"),
            display: (allSettings?.value?.snapchat_page_link?.displayed == null) ? true : allSettings?.value.snapchat_page_link?.displayed
        },
        {
            to: (allSettings?.value?.tiktok_page_link?.value == null) ? '' : allSettings?.value.tiktok_page_link.value,
            icon: '<svg width="15" height="20" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.73784 10.3382C2.83401 9.54198 3.16057 9.0962 3.77594 8.63923C4.65647 8.02029 5.75633 8.37037 5.75633 8.37037V6.29343C6.02377 6.28654 6.29127 6.30242 6.55569 6.34075V9.01362C6.55569 9.01362 5.45615 8.66354 4.57567 9.28278C3.96061 9.73945 3.63337 10.1856 3.53754 10.9818C3.53454 11.4142 3.61568 11.9793 3.98935 12.468C3.89692 12.4206 3.80277 12.3667 3.70683 12.3061C2.88375 11.7534 2.73383 10.9242 2.73784 10.3382ZM11.0972 2.45307C10.4915 1.78934 10.2624 1.1192 10.1796 0.648438H10.9416C10.9416 0.648438 10.7896 1.88278 11.8969 3.09665L11.9123 3.11297C11.6138 2.92526 11.3401 2.70369 11.0972 2.45307ZM14.7678 4.33483V6.95391C14.7678 6.95391 13.7955 6.91588 13.0759 6.73281C12.0711 6.47675 11.4254 6.08408 11.4254 6.08408C11.4254 6.08408 10.9793 5.80409 10.9432 5.78458V11.193C10.9432 11.4942 10.8608 12.2462 10.6093 12.8735C10.2811 13.6941 9.77458 14.2327 9.68141 14.3427C9.68141 14.3427 9.06536 15.0708 7.9785 15.5611C6.99882 16.0034 6.13866 15.9922 5.88155 16.0034C5.88155 16.0034 4.39469 16.0623 3.05672 15.1928C2.76739 15.0011 2.49732 14.784 2.25 14.5443L2.25668 14.5491C3.59498 15.4187 5.08151 15.3598 5.08151 15.3598C5.33898 15.3486 6.19909 15.3598 7.17845 14.9175C8.26434 14.4272 8.88137 13.6992 8.88137 13.6992C8.97355 13.5891 9.4824 13.0505 9.80929 12.2296C10.0601 11.6027 10.1432 10.8503 10.1432 10.5492V5.14133C10.1792 5.16115 10.625 5.44114 10.625 5.44114C10.625 5.44114 11.2712 5.83418 12.2759 6.08987C12.9957 6.27294 13.9678 6.31103 13.9678 6.31103V4.25867C14.3003 4.33323 14.5838 4.35341 14.7678 4.33483ZM13.9683 4.25867V6.31036C13.9683 6.31036 12.9963 6.27226 12.2764 6.08925C11.2717 5.8332 10.6255 5.44053 10.6255 5.44053C10.6255 5.44053 10.1798 5.16053 10.1437 5.14066V10.5498C10.1437 10.8509 10.0612 11.6033 9.80981 12.2302C9.48157 13.0511 8.97506 13.5897 8.88189 13.6998C8.88189 13.6998 8.26553 14.4278 7.17897 14.9182C6.19961 15.3604 5.3395 15.3492 5.08203 15.3604C5.08203 15.3604 3.59549 15.4193 2.2572 14.5498L2.25052 14.545C2.10922 14.4082 1.97622 14.2637 1.85217 14.1123C1.4251 13.5916 1.16332 12.9759 1.09754 12.8002V12.798C0.991697 12.4927 0.769314 11.7595 0.799701 11.0493C0.85346 9.79644 1.29421 9.02741 1.41075 8.83473C1.71937 8.30939 2.12079 7.83931 2.59712 7.44553C3.01745 7.10566 3.49388 6.83527 4.00685 6.64543C4.56142 6.42254 5.15526 6.30303 5.75654 6.29343V8.37037C5.75654 8.37037 4.65662 8.02158 3.77646 8.63923C3.16108 9.0962 2.83452 9.54198 2.73836 10.3382C2.73435 10.9242 2.88427 11.7534 3.70667 12.3064C3.80261 12.3672 3.89676 12.4212 3.98919 12.4683C4.13282 12.6551 4.30771 12.8179 4.50672 12.95C5.31009 13.4585 5.98324 13.494 6.84409 13.1637C7.41804 12.943 7.85009 12.4453 8.05046 11.8939C8.17636 11.5496 8.1747 11.2029 8.1747 10.8445V0.648438H10.1781C10.2609 1.1192 10.49 1.78934 11.0957 2.45307C11.3386 2.70369 11.6124 2.92526 11.9107 3.11297C11.9989 3.20417 12.4497 3.65509 13.0283 3.93192C13.3275 4.07501 13.643 4.18465 13.9683 4.25867Z" fill="white"/><path d="M0.302734 12.1562V12.1578L0.352444 12.2926C0.346733 12.2769 0.32826 12.2292 0.302734 12.1562Z" fill="#69C9D0"/><path d="M4.00779 6.64096C3.49481 6.83087 3.01839 7.10126 2.59805 7.44107C2.12158 7.83577 1.72026 8.30683 1.41202 8.83316C1.29549 9.02522 0.854734 9.79487 0.800976 11.0478C0.770589 11.7579 0.992972 12.4911 1.09882 12.7964V12.7986C1.1656 12.9728 1.42638 13.5884 1.85345 14.1108C1.9775 14.2622 2.1105 14.4066 2.25179 14.5434C1.79908 14.2433 1.39533 13.8806 1.05374 13.4668C0.630345 12.9507 0.369231 12.3413 0.301115 12.1615C0.301035 12.1602 0.301035 12.1589 0.301115 12.1576V12.1554C0.194933 11.8504 -0.0281149 11.1169 0.0029368 10.4058C0.0566957 9.15291 0.497456 8.38388 0.613989 8.19121C0.922136 7.66476 1.32346 7.19369 1.80002 6.79911C2.22026 6.45912 2.69671 6.18873 3.20977 5.99901C3.52979 5.87175 3.86318 5.7779 4.20416 5.71901C4.71799 5.63304 5.24285 5.62554 5.75914 5.69692V6.28897C5.15731 6.29838 4.56286 6.41789 4.00779 6.64096Z" fill="white"/><path d="M10.1805 0.643894H8.17704V10.8403C8.17704 11.1987 8.17704 11.5444 8.05286 11.8897C7.85052 12.4408 7.42007 12.9384 6.84642 13.1592C5.98533 13.4908 5.31218 13.454 4.50912 12.9455C4.30974 12.8139 4.13442 12.6517 3.99023 12.4654C4.6744 12.8152 5.28676 12.8091 6.04539 12.5173C6.61873 12.2964 7.0498 11.7988 7.25146 11.2474C7.37767 10.903 7.37601 10.5565 7.37601 10.1983V0H10.1424C10.1424 0 10.1114 0.253459 10.1805 0.643894ZM13.969 3.68672V4.25413C13.6442 4.17999 13.3294 4.07036 13.0307 3.92738C12.4521 3.65056 12.0013 3.19964 11.9131 3.10843C12.0154 3.1728 12.1216 3.23135 12.231 3.2838C12.9345 3.62047 13.6274 3.72096 13.969 3.68672Z" fill="white"/></svg>',
            text: t("tiktok"),
            display: (allSettings?.value?.tiktok_page_link?.displayed == null) ? true : allSettings?.value.tiktok_page_link?.displayed
        },
        {
            to: (allSettings?.value?.linkedin_page_link?.value == null) ? '' : allSettings?.value.linkedin_page_link.value,
            icon: '<svg width="15" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_3779_11111)"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.64075 15.6309V5.332H0.217969V15.6309H3.64075V15.6309ZM1.92972 3.92638C3.12294 3.92638 3.86622 3.13488 3.86622 2.14659C3.84366 1.13634 3.12294 0.367188 1.95209 0.367188C0.781062 0.367219 0.015625 1.13638 0.015625 2.14663C0.015625 3.13491 0.7585 3.92641 1.90719 3.92641L1.92972 3.92638ZM5.53512 15.6309C5.53512 15.6309 5.58003 6.29831 5.53512 5.33203H8.95844V6.82559H8.93572C9.38584 6.12278 10.1968 5.09019 12.0432 5.09019C14.2959 5.09019 15.9843 6.56216 15.9843 9.72559V15.6309H12.5616V10.1213C12.5616 8.73691 12.0663 7.79222 10.8273 7.79222C9.88188 7.79222 9.31844 8.42909 9.071 9.04472C8.98047 9.26384 8.95844 9.57163 8.95844 9.87944V15.6309H5.53512Z" fill="white"/></g><defs><clipPath id="clip0_3779_11111"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>',
            text: t("linkedin"),
            display: (allSettings?.value?.linkedin_page_link?.displayed == null) ? true : allSettings?.value.linkedin_page_link?.displayed
        },
    ];

    return list.map(item => ({
        ...item,
        display: item.display && !!item.to
    }));
});

const socialsReordered = computed(() => {
    const order = [
        'linkedin',
        'tiktok',
        'facebook',
        'x_footer',
        'instagram',
        'snapchat'
    ]

    return order
        .map(key =>
            socials.value?.find(
                social => social.text === t(key)
            )
        )
        .filter(Boolean)
})

const socialsToPass = computed(() => {
    const reorderedFooters = [
        'footer_minimal',
        'footer_gradient',
        'footer_elegant',
        'footer_almosafer'
    ]

    return reorderedFooters.includes(footerLayoutCode.value)
        ? socialsReordered.value
        : socials.value
})

const displaySocial = computed(() => socialsToPass.value.filter(social => social.display));
</script>
