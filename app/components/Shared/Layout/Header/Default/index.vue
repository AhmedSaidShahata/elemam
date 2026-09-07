<template>
  <div :style="showSticky? ' position: sticky;top: 0;backdrop-filter: blur(10px);-webkit-backdrop-filter: blur(10px);z-index:9 ' : ''">
    <v-app-bar height="40" elevation="0" :clipped-left="clipped" fixed app :class="['bottom-toolbar']">
      <v-container class="pa-0 custom-header-container d-flex justify-end">
        <LazyNavBarDropDowns class="hidden-md-and-down " textColor="text-black" />
        <v-app-bar-nav-icon class="hidden-md-and-up" small @click.stop="drawer = !drawer" />
      </v-container>
    </v-app-bar>
  
  <LazyLayoutInfo v-if="showLayoutInfo" />
  </div>
</template>

<script setup>
const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const props = defineProps({
  showLayoutInfo: {
    default: true
  },
  showSticky: {
    default: true
  }
})

const clipped = ref(false);
const drawer = ref(false);
const isRight = ref(true);
const scrolled = ref(false);

const items = computed(() => [
  { title: t("home"), to: { name: "index" } },
  { title: t("about_us"), to: { name: "about-us" } },
  { title: t("blogs"), to: { name: "blogs" } },

]);

const topItems = computed(() => [
  { title: t("routes.terms-conditions"), to: { name: "terms-conditions" } },
  { title: t("routes.privacy-policy"), to: { name: "privacy-policy" } },
  { title: t("routes.return-policy"), to: { name: "return-policy" } },
  { title: t("routes.contact-us"), to: { name: "contact-us" } },

]);

watch(locale, (newLocale) => {
  isRight.value = newLocale !== "en";
});

const handleScroll = () => {
  scrolled.value = window.scrollY > 5;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
