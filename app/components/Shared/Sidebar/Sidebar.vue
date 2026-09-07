<template>
  <v-card max-width="280" elevation="0">
    <SharedRoute
      :to="link.path"
      v-for="(link, i) in Links"
      :key="i"
      :class="['mb-2 text-primary', { 'last-child': i === Links.length - 1 }]"
    >
      <div class="my-icon" style="font-size: 14px; padding: 10px">
        <v-icon class="me-5" style="color: #f24d18">{{ link.icon }}</v-icon>
        <span style="color: #0e001a">{{ link.title }}</span>
      </div>
    </SharedRoute>
    <SharedButton @click="handleLogout" class="mx-n4 mb-3" variant="text">
      <div class="my-icon" style="font-size: 14px; padding: 10px">
        <v-icon class="me-5" style="color: #f24d18">mdi-location-exit</v-icon>
        <span class="text-primary">
          {{ $t("logout") }}
        </span>
      </div>
    </SharedButton>
  </v-card>
</template>

<script setup>
const router = useRouter();
const localePath = useLocalePath();

import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();

import useApi from "@/composables/useApi";
const { post } = useApi();

import { useI18n } from "vue-i18n";

const { t } = useI18n();

const Links = ref([
  {
    title: t("my_orders"),
    icon: "mdi-shopping-outline",
    path: "/profile/orders",
  },
  {
    title: t("my_account"),
    icon: "mdi-account",
    path: "/profile/account",
  },
  {
    title: t("my_wallet"),
    icon: "mdi-wallet-bifold-outline",
    path: "/profile/wallet",
  },
  // {
  //   title: t("my_addresses"),
  //   icon: "mdi-map-marker-radius-outline",
  //   path: "/address",
  // },
]);

const handleLogout = async () => {
  try {
    await post("/logout");
    await auth.logout();
    router.push(localePath("/"));
  } catch (error) {
    console.error("API error:", error);
  }
};
</script>

<style scoped>
.router-link-exact-active {
  background-color: rgba(242, 77, 24, 0.1) !important;
  border: 1px solid #f24d18;
  border-radius: 6px;
  font-weight: bold;
  display: block;
}
.last-child {
  color: #f24d18 !important;
  display: block;
}
</style>
