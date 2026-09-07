<template>
    <main>
        <v-app v-show="!loading">
            <v-navigation-drawer v-model="drawerTop" class="drawer" :location="isRight ? 'right' : 'left'"
                :clipped="lgAndUp" :disable-resize-watcher="true" width="310" z-index="10000000"
                style="top: 0 !important; height: 100dvh !important; overflow-y: auto !important; z-index: 10000000 !important;">
                <NavBarMobItems />
                <NavBarMobItemsInfo />
            </v-navigation-drawer>

            <!-- <LayoutHeader /> -->
            <!-- <v-app-bar elevation="0" :clipped-left="clipped" fixed app :class="['bottom-toolbar']">
                <v-container class="pa-0">
                    <LazyNavBar class="hidden-md-and-down" />
                    <v-app-bar-nav-icon class="hidden-md-and-up" small @click.stop="drawer = !drawer" />
                </v-container>
            </v-app-bar> -->
            <SharedLayoutHeaderDefault :show-layout-info="false" v-if="lgAndUp" />
            <SharedLayoutDefaultDrawer v-else />
            <LayoutProfileHeader @toggle:drawer="drawer = !drawer" />
            <v-main class="pt-lg-10 pt-0">
                <LayoutProfileSideBar :items="profileLinks">
                    <slot />
                </LayoutProfileSideBar>
            </v-main>
            <v-navigation-drawer v-model="drawer" app :right="isRight" :clipped="lgAndUp" :disable-resize-watcher="true"
                class="drawer profile__drawer hidden-lg-and-up" z-index="10000000"
                style="top: 0 !important; height: 100dvh !important; overflow-y: auto !important; z-index: 10000000 !important;">
                <LayoutProfileSideMenu :items="profileLinks" :drawer="drawer" :right="isRight" />
            </v-navigation-drawer>
        </v-app>
    </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useDisplay } from "vuetify";
import { useI18n } from "vue-i18n";


import { useCompanyStore } from "@/stores/company";

const profileLinks = useProfileLinks()
// stores
const companyStore = useCompanyStore();

// state
const loading = ref(true);
const drawerTop = ref(false);
const drawer = ref(false);

// vuetify display (replaces $vuetify.breakpoint)
const { lgAndUp } = useDisplay();

// i18n
const { locale } = useI18n();


const company = computed(() => companyStore.getCompany);

// RTL check
const isRight = computed(() => locale.value === "ar");

// lifecycle
onMounted(() => {
    loading.value = false;
});

// Logout svg 
const logoutIcon = `
<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.638 2.099A2.018 2.018 0 0 1 10 4l-.001 15.5h3.25c.69 0 1.25-.561 1.25-1.25v-4.5a.75.75 0 0 1 1.5 0v4.5A2.752 2.752 0 0 1 13.25 21H10v1c0 1.103-.896 2-2 2a2.06 2.06 0 0 1-.62-.093l-6.017-2.005A2.018 2.018 0 0 1 0 20V2C0 .899.897 0 2 0h11.25A2.752 2.752 0 0 1 16 2.75v4.5a.75.75 0 0 1-1.5 0v-4.5c0-.689-.561-1.25-1.25-1.25H6.842l1.796.599zM2 1.5c-.275 0-.5.226-.5.5v18c0 .213.143.41.347.482l5.99 1.996c.043.014.099.022.163.022.275 0 .5-.225.5-.5V4a.52.52 0 0 0-.347-.482l-5.99-1.996A.543.543 0 0 0 2 1.5zm18.03 4.718 3.75 3.75a.748.748 0 0 1 .154.222l.01.027a.48.48 0 0 1 .025.068l.007.028a.51.51 0 0 1 .015.069l.003.03c.004.024.005.048.006.073v.03a.754.754 0 0 1-.005.07L24 10.5a.754.754 0 0 1-.212.523l-.007.006-3.75 3.75a.745.745 0 0 1-1.06.001.75.75 0 0 1 0-1.06l2.468-2.47H13.75a.75.75 0 0 1 0-1.5h7.69l-2.47-2.47a.75.75 0 1 1 1.06-1.062z" fill="#FFF"/>
</svg>
`;

// expose to template
defineExpose({
    profileLinks,
    logoutIcon,
});
</script>