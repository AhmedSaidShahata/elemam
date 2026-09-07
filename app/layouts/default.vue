<template>
  <main>
    <v-app v-show="!loading">
      <ClientOnly>
        <template v-if="headerComponent">
          <component :is="headerComponent" />
        </template>
        <template v-else>
          <SharedLayoutDefaultHeader v-if="$vuetify.display.lgAndUp" />
          <SharedLayoutDefaultDrawer v-else />
        </template>
      </ClientOnly>
      <v-main class="pt-0 d-flex flex-column" style="min-height: 100vh;">
        <div class="flex-grow-1" :class="{
          'mt-0 mt-lg-n16': !isHomePage && (
            mainDefinitionLayoutCode === 'main_with_nav_section_minimal' ||
            mainDefinitionLayoutCode === 'main_with_nav_section_gradient'
          ),

          'mt-16 pt-lg-0 pt-5 mt-lg-n16': !isHomePage &&
            (mainDefinitionLayoutCode === 'main_with_nav_section_elegant' || mainDefinitionLayoutCode === 'main_with_nav_section_almosafer'),

            'pt-3': !isHomePage &&
            (mainDefinitionLayoutCode === 'main_with_nav_section_default'),
        }">
          <slot />
        </div>

        <GlobalBanners v-if="!isHomePage" />
        <SharedLayoutFooter />
      </v-main>
    </v-app>
    <LazyWhatsAppReserve />
  </main>
</template>

<script lang="js" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from '#app'
import { useDefaultCompanyStore } from '~/stores/defaultCompany'

import SharedLayoutDefaultHeader from '~/components/Shared/Layout/Header/Default/index.vue'
import SharedLayoutDefaultDrawer from '~/components/Shared/Layout/Default/Drawer/index.vue'
import SharedLayoutHeaderMinimal from '~/components/Shared/Layout/Header/Minimal/index.vue'
import SharedLayoutHeaderElegant from '~/components/Shared/Layout/Header/Elegant/index.vue'
import SharedLayoutHeaderElmsafer from '~/components/Shared/Layout/Header/Elmsafer/index.vue'

const showScrollToButton = ref(false)
const loading = ref(true)

const route = useRoute()
const localePath = useLocalePath()
const defaultCompanyStore = useDefaultCompanyStore()

const defaultCompany = computed(() => defaultCompanyStore.getDefaultCompany)

const mainDefinitionLayoutCode = computed(() => {
  const layouts = defaultCompany.value?.layouts || []
  const mainLayout = layouts.find((layout) =>
    layout?.layout_code?.startsWith("main_with_nav_section_")
  )
  return mainLayout?.layout_code || "main_with_nav_section_default"
})

const headerComponent = computed(() => {
  const code = mainDefinitionLayoutCode.value
  if (code === 'main_with_nav_section_minimal' || code === 'main_with_nav_section_gradient') {
    return SharedLayoutHeaderMinimal
  } else if (code === 'main_with_nav_section_elegant') {
    return SharedLayoutHeaderElegant
  } else if (code === 'main_with_nav_section_almosafer') {
    return SharedLayoutHeaderElmsafer
  }
  return null
})

const isHomePage = computed(() => {
  const name = route.name ? String(route.name) : ''
  return name.startsWith('index') || route.path === '/' || route.path === '/ar' || route.path === '/en' || route.path === '/ar/' || route.path === '/en/'
})

const handleScrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const onScroll = () => {
  showScrollToButton.value = window.scrollY > 50
}

onMounted(() => {
  loading.value = false
  window.addEventListener('scroll', onScroll)
  if (typeof WOW !== "undefined") {
    new WOW({ live: false }).init()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
