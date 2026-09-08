<template>
  <div>
    <LazyPreloader  />
    <div id="main-app-content">
      <v-locale-provider :rtl="locale == 'ar'">
        <NuxtLayout>
          <NuxtPage
            :page-key="typeof route.meta.key === 'function' ? route.meta.key(route) : (route.meta.key || route.path)" />
        </NuxtLayout>
      </v-locale-provider>
      <SharedNotification />
      <ContactUsPopup />
    </div>
  </div>
</template>

<script lang="js" setup>
import { ref, onMounted,  watch } from 'vue';
import cookies from 'js-cookie';
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n';

import { setLocale as setLocaleValidate } from "@vee-validate/i18n";
const route = useRoute()

const { locale } = useI18n();
const loading = ref(true);



onMounted(async () => {
  handleLocale(locale.value);
  loading.value = false;
});

watch(locale, async (newLocale) => {
  handleLocale(newLocale);
  
});

const handleLocale = (locale) => {
  cookies.set('_lang', locale);
  document.documentElement.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", locale);
  setLocaleValidate(locale);
};




</script>
