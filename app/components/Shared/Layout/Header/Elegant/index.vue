<template>

    <!-- Mobile drawer -->
    <v-navigation-drawer
      v-if="!$vuetify.display.lgAndUp"
      v-model="drawer"
      class="drawer glass-drawer"
      :location="isRight ? 'right' : 'left'"
      temporary
      disable-resize-watcher
      z-index="10000000"
      style="top: 0 !important; height: 100dvh !important; overflow-y: auto !important; z-index: 10000000 !important;"
    >
      <div class="d-flex justify-start pa-4">
        <v-btn icon @click="drawer = false" variant="text">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <LazyNavBarMobItemsInfo />
    </v-navigation-drawer>

    <!-- ── Desktop header ──────────────────────────────────────────────── -->
    <header class="header-elegant d-none d-lg-block header-elegant-root">
      <div class="header-elegant__inner">

        <!-- Top settings bar -->
        <div class="header-elegant__top" :class="isLoggedIn ? 'ms-n16' : ''">
          <LazySharedLayoutHeaderSettingsBar />
        </div>

        <!-- Main row: logo + nav + actions -->
        <div class="header-elegant__main">
          <NuxtLink exact :to="localePath('/')" class="header-elegant__logo">
            <img
              v-if="getCompany?.logo"
              :src="getCompany.logo"
              height="90"
              :alt="getCompany.display_name"
              class="white-logo"
            />
            <span v-if="getCompany" class="header-elegant__logo-name">{{ getCompany.display_name }}</span>
          </NuxtLink>

          <nav class="header-elegant__nav" aria-label="Main navigation">
            <template v-for="(item, index) in navItems" :key="index">
              <!-- Direct link -->
              <NuxtLink
                v-if="item.to"
                exact
                :to="localePath(item.to)"
                class="header-elegant__nav-link"
                :class="{ 'header-elegant__nav-link--active': isNavActive(item.to) }"
              >
                {{ item.name }}
              </NuxtLink>

              <!-- Dropdown -->
              <v-menu
                v-else-if="item.moreItems && item.moreItems.length"
                offset-y
                transition="slide-y-transition"
                content-class="header-elegant__menu"
              >
                <template #activator="{ props: menuProps }">
                  <button
                    type="button"
                    class="header-elegant__nav-link header-elegant__nav-link--dropdown"
                    :class="{ 'header-elegant__nav-link--active': isSubItemActive(item.moreItems) }"
                    v-bind="menuProps"
                  >
                    {{ item.name }}
                    <v-icon size="14" class="header-elegant__nav-menu">mdi-menu-down</v-icon>
                  </button>
                </template>
                <v-list class="pa-0">
                  <v-list-item
                    v-for="(moreItem, moreIndex) in item.moreItems"
                    :key="moreIndex"
                    exact
                    :to="localePath(getItemLink(moreItem))"
                    class="header-elegant__menu-item"
                  >
                    <v-list-item-title>{{ moreItem.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </nav>

          <!-- Actions: notification + auth CTA -->
          <div class="header-elegant__actions">
            <!-- Notification bell (logged in) -->
            <v-btn
              v-if="isLoggedIn"
              class="header__notification-btn pa-1 rounded-xl header-elegant__notification"
              variant="flat"
              @click.stop="toggleNotifications"
            >
              <div class="notification-dot-wrapper">
                <span
                  v-if="unreadCount > 0"
                  class="notification-count d-flex-justify-center align-center font-weight-bold"
                  style="color: #201F3F !important"
                >{{ unreadCount }}</span>
                <span v-if="unreadCount > 0" class="notification-dot" />
              </div>
              <v-img class="notification-icon" />
            </v-btn>

            <!-- Auth CTA — not logged in -->
            <v-menu v-if="!isLoggedIn" bottom offset-y transition="slide-y-transition" content-class="header-elegant__menu">
              <template #activator="{ props: menuProps }">
                <button type="button" class="header-elegant__cta" v-bind="menuProps">
                  {{ $t('header_elegant.register_now') }}
                </button>
              </template>
              <v-list class="py-0 profile-list">
                <v-list-item :to="localePath('/login')" class="bordered-bottom">
                  <v-list-item-title><small><span class="px-3">{{ $t('login') }}</span></small></v-list-item-title>
                </v-list-item>
                <v-list-item :to="localePath('/signup')">
                  <v-list-item-title><small><span class="px-3">{{ $t('register') }}</span></small></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <!-- Auth CTA — logged in -->
            <v-menu v-else bottom offset-y transition="slide-y-transition" content-class="header-elegant__menu">
              <template #activator="{ props: menuProps }">
                <button type="button" class="header-elegant__cta" v-bind="menuProps">
                  {{ $t('my_profile') }}
                </button>
              </template>
              <v-list class="py-0 profile-list">
                <v-list-item :to="localePath('/profile/personal-info')" class="bordered-bottom">
                  <v-list-item-title><small><span class="px-3">{{ $t('my_profile') }}</span></small></v-list-item-title>
                </v-list-item>
                <v-list-item class="bordered-bottom" @click="handleLogout">
                  <v-list-item-title><small><span class="px-3">{{ $t('logout') }}</span></small></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
      </div>
    </header>

    <!-- ── Mobile app bar ──────────────────────────────────────────────── -->
    <v-app-bar
      class="header-elegant-mobile d-lg-none"
      elevation="0"
      height="86px !important"
    >
      <div class="header-elegant-mobile__inner" style="height: 86px !important">
        <div class="header-elegant-mobile__start">
          <!-- Notification (logged in) -->
          <v-btn
            v-if="isLoggedIn"
            class="header__notification-btn pa-1 rounded-xl header-elegant__notification"
            variant="flat"
            size="small"
            @click.stop="toggleNotifications"
          >
            <div class="notification-dot-wrapper">
              <span
                v-if="unreadCount > 0"
                class="notification-count d-flex-justify-center align-center font-weight-bold"
                style="color: #201F3F !important"
              >{{ unreadCount }}</span>
              <span v-if="unreadCount > 0" class="notification-dot" />
            </div>
            <v-img class="notification-icon" />
          </v-btn>

          <!-- Hamburger -->
          <v-btn icon size="x-small" class="header-elegant-mobile__menu-btn rounded-circle" @click.stop="drawer = !drawer">
            <v-icon color="white">mdi-menu</v-icon>
          </v-btn>
        </div>

        <!-- Logo (mobile) -->
        <NuxtLink
          exact
          :to="localePath('/')"
          class="header-elegant-mobile__logo d-flex flex-column align-center mt-5"
        >
          <img
            v-if="getCompany?.logo"
            :src="getCompany.logo"
            height="44"
            :alt="getCompany.display_name"
            class="white-logo"
          />
          <span v-if="getCompany?.display_name" class="font-weight-bold size-12 text-white text-center">
            {{ getCompany.display_name }}
          </span>
        </NuxtLink>
      </div>
    </v-app-bar>

    <!-- Notification popup -->
    <NotificationPopup
      v-if="notificationToggle"
      :visible="notificationToggle"
      :position="popupPosition"
      :topOffset="notificationTopOffset"
      :overlayTop="notificationTopOffset"
      @close="closeNotifications"
      @resetUnread="markAllAsRead"
      @decrementUnread="decrementUnread"
    />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { getExcludedFeatureIdentifiers, filterNavItemsByExcludedFeatures } from '~/utils/filterNavItems'

const { mdAndDown, lgAndUp } = useDisplay()


const notificationTopOffset = computed(() => (lgAndUp.value ? 100 : 86))

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()

const companyStore = useCompanyStore()
const getCompany = computed(() => companyStore.company)
const { allServices } = useServicesStore()
const authStore = useAuthStore()
const profileStore = useProfileStore()
const notificationsStore = useNotificationsStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)
const profile = computed(() => profileStore.profile)
const unreadCount = computed(() => profile.value?.un_read_notifications_count ?? 0)

const isRight = computed(() => locale.value === 'ar')
const popupPosition = computed(() => ((locale.value === 'ar' && lgAndUp.value) || (locale.value === 'en' && !lgAndUp.value)) ? 'left' : 'right')
const isHomePage = computed(() => route.path === localePath('/'))

const drawer = ref(false)
const notificationToggle = ref(false)

// ─── Nav items ───────────────────────────────────────────────────────────────
const excludedFeatureIdentifiers = computed(() => getExcludedFeatureIdentifiers(getCompany.value))

const hasOffers = computed(() => {
  const spec = getCompany.value?.license?.specifications?.find((i) => i.code === 'has_offers')
  return spec?.value === 1
})

const rawNavItems = computed(() => [
  { name: t('home'), to: { name: 'index' } },
  ...(allServices.value?.length > 0
    ? [{
        identifier: 'services',
        name: t('services'),
        to: '',
        moreItems: [
          { identifier: 'all_services', name: t('all_services_nav'), to: { name: 'services' } },
          ...allServices.value,
        ],
      }]
    : []),
  { identifier: 'blogs', name: t('header_elegant.blog_news'), to: { name: 'blogs' } },
  { identifier: 'destinations', name: t('tourism_destinations'), to: { name: 'countries' } },
  ...(hasOffers.value ? [{ identifier: 'offers', name: t('offers'), to: { name: 'offers' } }] : []),
  {
    name: t('more'),
    to: '',
    moreItems: [
      { identifier: 'about_us', name: t('about_us'), to: { name: 'about-us' } },
      { identifier: 'terms_and_conditions', name: t('terms_conidtions'), to: { name: 'terms-conditions' } },
      { identifier: 'privacy_policy', name: t('privacy_policy'), to: { name: 'privacy-policy' } },
      { identifier: 'refund_policy', name: t('pay_policy'), to: { name: 'return-policy' } },
      { identifier: 'contact_us', name: t('contact_us'), to: { name: 'contact-us' } },
      { identifier: 'top_customers', name: t('all_top_customers'), to: { name: 'top-customers' } },
      { identifier: 'quotes', name: t('all_quotes'), to: { name: 'quotes' } },
      { identifier: 'customer_reviews', name: t('customer_reviews'), to: { name: 'customer-reviews' } },
      { identifier: 'board_members', name: t('directors'), to: { name: 'board-members' } },
      { identifier: 'team_members', name: t('team_members'), to: { name: 'team-members' } },
    ],
  },
])

const navItems = computed(() =>
  filterNavItemsByExcludedFeatures(rawNavItems.value, excludedFeatureIdentifiers.value)
)

// ─── Routing helpers ─────────────────────────────────────────────────────────
const getItemLink = (item) => {
  const resolvedItem = item?.service && typeof item.service === 'object' ? item.service : item
  const itemType = String(resolvedItem?.type || resolvedItem?.service_type || resolvedItem?.serviceType || item?.type || item?.service_type || item?.serviceType || '').toLowerCase()
  const routeId = resolvedItem?.slug || resolvedItem?.id || item?.slug || item?.id

  if (itemType === 'rental') {
    return { name: 'services-rental-id', params: { id: routeId } }
  }

  if (itemType === 'form') {
    return { name: 'services-form-id', params: { id: routeId } }
  }

  if (itemType === 'booking' || itemType === 'book') {
    return {
      name: resolvedItem?.data?.has_category || resolvedItem?.has_category || item?.data?.has_category || item?.has_category ? 'services-booking-id-categories' : 'services-booking-id-models',
      params: { id: routeId },
    }
  }

  return item.to
}

const normalizePath = (p) => (p || '').replace(/\/+$/, '') || '/'
const isNavActive = (path) => normalizePath(route.path) === normalizePath(localePath(path))
const isSubItemActive = (moreItems) =>
  moreItems.some((mi) => normalizePath(route.path) === normalizePath(localePath(getItemLink(mi))))

// ─── Auth ────────────────────────────────────────────────────────────────────
const handleLogout = async () => {
  await authStore.logout()
  await profileStore.clearProfile()
  router.push(localePath('/'))
}

// ─── Notifications ───────────────────────────────────────────────────────────
const markAllAsRead = async () => {
  if (unreadCount.value > 0) await notificationsStore.markAllRead()
}
const toggleNotifications = () => {
  notificationToggle.value = !notificationToggle.value
  markAllAsRead()
}
const closeNotifications = () => { notificationToggle.value = false }
const decrementUnread = () => {
  if (profile.value?.un_read_notifications_count > 0) profile.value.un_read_notifications_count--
}

// ─── Drawer body-scroll lock ─────────────────────────────────────────────────
watch(drawer, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  document.documentElement.style.overflow = isOpen ? 'hidden' : ''
  document.body.style.touchAction = isOpen ? 'none' : ''
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
  document.body.style.touchAction = ''
})
</script>
