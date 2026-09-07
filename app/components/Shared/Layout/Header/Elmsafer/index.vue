<template>
    <!-- Mobile drawer -->
    <v-navigation-drawer
      v-if="!$vuetify.display.lgAndUp"
      v-model="drawer"
      class="drawer glass-drawer header-elmsafer__drawer"
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
      <LazyNavBarMobItemsInfo :no-menu="true" />
    </v-navigation-drawer>

    <!-- ── Desktop header ──────────────────────────────────────────────── -->
    <header class="header-elmsafer d-none d-lg-block header-elmsafer-root">
      <div class="header-elmsafer__inner">

        <!-- Logo (start) -->
        <div class="header-elmsafer__start">
          <NuxtLink exact :to="localePath('/')" class="header-elmsafer__logo">
            <img
              v-if="getCompany?.logo"
              :src="getCompany.logo"
              height="90"
              :alt="getCompany.display_name"
              class="white-logo"
            />
            <span v-if="getCompany" class="header-elmsafer__logo-name">{{ getCompany.display_name }}</span>
          </NuxtLink>
        </div>

        <!-- Settings + auth CTA (center-right) -->
        <div class="header-elmsafer__center mt-n10 me-16">
          <LazySharedLayoutHeaderSettingsBar class="header-elmsafer__settings" :no-label="true" />

          <!-- Notification (logged in) -->
          <v-btn
            v-if="isLoggedIn"
            class="header__notification-btn pa-1 rounded-xl header-elmsafer__notification me-3 mt-2"
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
          <v-menu v-if="!isLoggedIn" bottom offset-y transition="slide-y-transition" content-class="header-elmsafer__menu">
            <template #activator="{ props: menuProps }">
              <button type="button" class="header-elmsafer__cta" v-bind="menuProps">
                {{ $t('header_elegant.login') }}
              </button>
            </template>
            <v-list class="py-0 profile-list">
              <v-list-item :to="localePath('/login')" class="bordered-bottom">
                <v-list-item-title><small><span class="px-3">{{ $t('header_elegant.login') }}</span></small></v-list-item-title>
              </v-list-item>
              <v-list-item :to="localePath('/signup')">
                <v-list-item-title><small><span class="px-3">{{ $t('register') }}</span></small></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <!-- Auth CTA — logged in -->
          <v-menu v-else bottom offset-y transition="slide-y-transition" content-class="header-elmsafer__menu">
            <template #activator="{ props: menuProps }">
              <button type="button" class="header-elmsafer__cta" v-bind="menuProps">
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
    </header>

    <!-- ── Mobile app bar ──────────────────────────────────────────────── -->
    <v-app-bar class="header-elmsafer-mobile d-lg-none" elevation="0" fixed app style="height: 88px !important;">
      <div class="header-elmsafer-mobile__inner">
        <div class="header-elmsafer-mobile__actions">
          <!-- Notification (logged in) -->
          <v-btn
            v-if="isLoggedIn"
            class="header__notification-btn pa-1 rounded-xl header-elmsafer__notification"
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

          <!-- Hamburger -->
          <v-btn icon size="x-small" class="header-elegant-mobile__menu-btn rounded-circle" @click.stop="drawer = !drawer">
            <v-icon color="white">mdi-menu</v-icon>
          </v-btn>
        </div>

        <!-- Logo (mobile) -->
        <NuxtLink
          exact
          :to="localePath('/')"
          class="header-elmsafer-mobile__logo d-flex align-center flex-column mt-4"
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
      :topOffset="topOffset"
      overlayTop="75"
      @close="closeNotifications"
      @resetUnread="markAllAsRead"
      @decrementUnread="decrementUnread"
    />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useDisplay } from 'vuetify'

const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()

const { getCompany } = useCompanyStore()
const authStore = useAuthStore()
const profileStore = useProfileStore()
const notificationsStore = useNotificationsStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)
const profile = computed(() => profileStore.profile)
const unreadCount = computed(() => profile.value?.un_read_notifications_count ?? 0)

const { lgAndUp } = useDisplay()

const isRight = computed(() => locale.value === 'ar')
const popupPosition = computed(() => (locale.value === 'ar' && lgAndUp.value) ? 'left' : (locale.value === 'ar' && !lgAndUp.value) ? 'right' : (locale.value === 'en' && lgAndUp.value) ? 'right' : 'left')
const isHomePage = computed(() => route.path === localePath('/'))
const topOffset = computed(() => (lgAndUp.value ? '75' : '90'))

const drawer = ref(false)
const notificationToggle = ref(false)

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
