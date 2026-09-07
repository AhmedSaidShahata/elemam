<template>
  <!-- Mobile / Tablet navigation drawer -->
  <v-navigation-drawer v-model="drawer" class="drawer glass-drawer" :location="isRight ? 'right' : 'left'" temporary
    disable-resize-watcher z-index="10000000"
    style="top: 0 !important; height: 100dvh !important; overflow-y: auto !important; z-index: 10000000 !important;">
    <div class="d-flex justify-start pa-4">
      <v-btn icon @click="drawer = false" variant="text">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </div>
    <LazyNavBarMobItemsInfo />
  </v-navigation-drawer>

  <!-- App bar -->
  <v-app-bar :class="isHeroHeader ? 'app-bar-minimal' : 'app-bar-minimal'" elevation="0" height="110px"
    :style="isHeroHeader ? 'background-color: transparent !important;' : 'background-color: #ffffff !important;'" app>
    <div class="d-flex flex-row align-center w-100 justify-space-between mx-6 mt-lg-0 mt-3">
      <!-- Left: hamburger + notification -->
      <div class="d-flex align-center">
        <v-btn icon width="40" height="40"
          :class="['mx-2 rounded-circle', isHeroHeader ? 'text-white glass-btn' : 'text-primary light-primary']"
          @click.stop="drawer = !drawer" style="border-radius: 50% !important;">
          <v-icon style="font-size: 24px !important">mdi-menu</v-icon>
        </v-btn>

        <v-btn v-if="isLoggedIn"
          :class="['header__notification-btn pa-1 rounded-xl mx-2', isHeroHeader ? 'glass-btn white-bell' : 'light-primary primary-bell']"
          @click.stop="toggleNotifications" variant="flat" size="small">
          <div class="notification-dot-wrapper">
            <span v-if="unreadCount > 0"
              class="notification-count d-flex-justify-center align-center font-weight-bold">{{ unreadCount }}</span>
            <span v-if="unreadCount > 0" class="notification-dot" />
          </div>
          <v-img class="notification-icon" />
        </v-btn>
      </div>

      <!-- Center: Logo -->
      <NuxtLink exact :to="localePath('/')" class="logo d-flex flex-column align-center text-decoration-none">
        <img v-if="getCompany?.logo" :src="getCompany.logo" height="50px" class="wow fadeInRight minimal-img" alt="logo"
          :class="isHeroHeader ? 'white-logo' : ''" />
        <span :class="['font-weight-bold size-14', isHeroHeader ? 'text-white' : 'text-black']">
          {{ getCompany.display_name }}
        </span>
      </NuxtLink>
    </div>
  </v-app-bar>

  <!-- Notification popup -->
  <NotificationPopup v-if="notificationToggle" :visible="notificationToggle" :position="popupPosition"
    @close="closeNotifications" @resetUnread="markAllAsRead" @decrementUnread="decrementUnread" topOffset="76"
    overlayTop="76" />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const { getCompany } = useCompanyStore()
const authStore = useAuthStore()
const profileStore = useProfileStore()
const notificationsStore = useNotificationsStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)
const profile = computed(() => profileStore.profile)
const unreadCount = computed(() => profile.value?.un_read_notifications_count ?? 0)

const isRight = computed(() => locale.value === 'ar')
const popupPosition = computed(() => (locale.value == 'ar' ? 'right' : 'left'))

const drawer = ref(false)
const notificationToggle = ref(false)
const isScrolled = ref(false)

const isHomePage = computed(() => {
  const name = route.name ? String(route.name) : ''
  return name.startsWith('index') || route.path === '/' || route.path === '/ar' || route.path === '/en' || route.path === '/ar/' || route.path === '/en/'
})
const isHeroHeader = computed(() => !isScrolled.value && isHomePage.value)

// ─── Scroll detection ────────────────────────────────────────────────────────
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
  document.body.style.touchAction = ''
})

// ─── Drawer body-scroll lock ─────────────────────────────────────────────────
watch(drawer, (isOpen) => {
  if (isOpen) {
    document.documentElement.style.overflow = 'hidden'
  } else {
    document.documentElement.style.overflow = ''
  }
})

// ─── Notifications ───────────────────────────────────────────────────────────
const markAllAsRead = async () => {
  if (unreadCount.value > 0) {
    await notificationsStore.markAllRead()
  }
}

const toggleNotifications = () => {
  notificationToggle.value = !notificationToggle.value
  markAllAsRead()
}

const closeNotifications = () => {
  notificationToggle.value = false
}

const decrementUnread = () => {
  if (profile.value?.un_read_notifications_count > 0) {
    profile.value.un_read_notifications_count--
  }
}
</script>
