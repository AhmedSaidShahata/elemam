<template>
  <v-list class="flat" style="background-color: transparent">
    <v-list-item class="justify-center px-0">
      <v-menu rounded offset-y transition="slide-x-transition">
        <template v-slot:activator="{ props }">
          <v-btn v-if="!isDrawer" width="80" text v-bind="props" class="mb-5 mb-md-0" elevation="0">
            <span 
            class="font-weight-bold"
         
            >{{ currentLocale }}</span>
         
          </v-btn>
          <v-btn v-else width="80" text v-bind="props" class="mb-5 mb-md-0" elevation="0">
            <span 
            class="font-weight-bold text-black"
            >{{ currentLocale }}</span>
  
          </v-btn>
        </template>

        <v-list class="pa-0">
          <v-list-item
            v-for="(locale, index) in allLocales"
            :key="index"
            @click="onChangeLanguage(locale)"
          >
            <v-list-item-title
              style="cursor: pointer"
              class="text-center d-flex justify-center align-center"
            >
              <span class="text-capitalize mx-2">{{ locale.code }}</span>
              <LazySharedImage width="25px" :name="`locale/${locale.code}.svg`" />
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item>
  </v-list>
</template>

<script setup>
const { locale, locales } = useI18n();
const router = useRouter();
const switchLocalePath = useSwitchLocalePath();
import { ref  } from 'vue';
import { useRoute } from 'vue-router'

const { isDrawer } = defineProps({
  isDrawer: {
    type: Boolean,
    default: false 
  } 
})


const route = useRoute()


const allLocales = computed(() => locales.value);
const currentLocale = computed(() => locale.value);
const isScrolled = ref(false);

if (process.client) {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50;
  });
}

const onChangeLanguage = (locale) => {
  router.push(switchLocalePath(locale.code));
};
</script>
