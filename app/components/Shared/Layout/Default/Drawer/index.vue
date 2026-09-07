<template>
  <v-app-bar app fixed elevation="0" :class="{ scrolled: scrolled }" height="80" class="custom-app-bar app-space" color="#fff"
  style="position: sticky;top: 0;backdrop-filter: blur(10px);-webkit-backdrop-filter: blur(10px);">

    <v-btn icon="mdi-menu" size="x-small" class="light-primary text-primary menu-button mx-2" @click.stop="drawer = !drawer">
    </v-btn>

     <!-- Notifications -->
    <v-btn v-if="isLoggedIn" class="header__notification-btn pa-1 mx-lg-2 mx-md-2 mx-sm-2 rounded-xl d-lg-none"
      @click.stop="toggleNotifications" variant="flat">
      <div class="notification-dot-wrapper">
        <span v-if="unreadCount > 0" class="notification-count d-flex-justify-center align-center font-weight-bold">
          {{ unreadCount }}
        </span>
        <span v-if="unreadCount > 0" class="notification-dot"></span>
      </div>
      <v-img class="notification-icon" />
    </v-btn>


    <v-spacer></v-spacer>

    <div class="d-flex justify-between">
      <div class="mt-lg-2 mx-1">
        <div class="d-flex align-center flex-column mt-2">
          <SharedRoute exact to="/" class="logo d-flex align-center">
            <img v-if="getCompany && getCompany.logo" :src="getCompany.logo" height="40px" alt="logo" />
          </SharedRoute>
          <v-divider vertical class="border-opacity-100 align-self-center ma-auto mx-4" length="20" color="black" />
          <SharedRoute exact to="/" class="text-decoration-none text-black">
            <span class="size-14 font-weight-bold"
              style="max-width: 140px;  overflow-wrap: break-word; word-wrap: break-word;">{{ getCompany.display_name
              }}</span>
          </SharedRoute>
        </div>
      </div>
    </div>
  </v-app-bar>

  <v-navigation-drawer :width="255" v-model="drawer" :location="currentLocale == 'ar' ? 'right' : 'left'" temporary
    class="glass-drawer" z-index="10000000"
      style="top: 0 !important; height: 100dvh !important; overflow-y: auto !important; z-index: 10000000 !important;">
    <div class="d-flex justify-start pa-4">
      <v-btn icon @click="drawer = false" variant="text">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </div>
    <LazyNavBarMobItemsInfo />
  </v-navigation-drawer>

  <NotificationPopup v-if="notificationToggle" :visible="notificationToggle" :position="popupPosition"
    @close="closeNotifications" @resetUnread="markAllAsRead" @decrementUnread="decrementUnread" topOffset="80"
      overlayTop="70"/>
</template>

<script setup lang="js">
import { useRoute } from 'vue-router'
const localePath = useLocalePath();
const { t, locale } = useI18n();
const router = useRouter();

const currentLocale = computed(() => locale.value);
const switchLocalePath = useSwitchLocalePath();
const { getCompany } = useCompanyStore();
const profileStore = useProfileStore()
const profile = computed(() => profileStore.profile)

const unreadCount = computed(() => profile.value?.un_read_notifications_count)


const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)

const drawer = ref(false)
const scrolled = ref(false);
const isSafari = ref(false)

// Notifications
const notificationToggle = ref(false)

const popupPosition = computed(() =>
  locale.value === 'ar' ? 'right' : 'left'
)

const notificationsStore = useNotificationsStore()

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

watch(drawer, (isOpen) => {
  if (isOpen) {
    document.documentElement.style.overflow = 'hidden'
  } else {
    document.documentElement.style.overflow = ''
  }
})

const links = computed(() => [
  {
    title: t("home"),
    to: { name: "index" },
  },

  {
    title: t("about_us"),
    to: { name: "about-us" },
  },

  {
    title: t("routes.terms-conditions"),
    to: { name: "terms-conditions" },
  },
  {
    title: t("routes.privacy-policy"),
    to: { name: "privacy-policy" },
  },
  {
    title: t("routes.return-policy"),
    to: { name: "return-policy" },
  },
  {
    title: t("routes.contact-us"),
    to: { name: "contact-us" },
  },
  {
    title: t("blogs"),
    to: { name: "blogs" },
  },

])


const onChangeLanguage = () => {
  router.push(switchLocalePath(locale.value === 'ar' ? 'en' : 'ar'));
};


const handleScroll = () => {
  scrolled.value = window.scrollY > 5;
};

onMounted(async () => {
  await profileStore.setUserProfile()
  window.addEventListener("scroll", handleScroll);
  const ua = navigator.userAgent.toLowerCase()
  isSafari.value = ua.includes('safari') && !ua.includes('chrome') && !ua.includes('android')
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
