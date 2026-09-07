<template>
  <div>
    <LazyPreloader v-if="loaderValue && localeValue" :locale="localeValue" />
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
import { ref, onMounted, nextTick, watch } from 'vue';
import cookies from 'js-cookie';
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n';
import { usePageHead } from "@/composables/usePageHead";
import { setLocale as setLocaleValidate } from "@vee-validate/i18n";
const { loaderValue } = useLoaderStore()
const { localeValue } = useLocaleStore()
const { getSettings } = useSettingsStore();
const { getCountries } = useCountriesStore();
const defaultCompanyStore = useDefaultCompanyStore();
const { setCurrency } = useCurrency();
const { setCountry } = useCountry();
const route = useRoute()

usePageHead();

const layoutName = computed(() => {
  const layout = route.meta.layout
  return layout
})
const { getCurrencies } = useCurrenciesStore();
const { getLanguages } = useLanguagesStore();

const { changeTheme } = useColors();
const { locale } = useI18n();
const loading = ref(true);



onMounted(async () => {
  handleLocale(locale.value);
  setCurrency(defaultCompanyStore.defaultCompany?.default_currency);
  setCountry(defaultCompanyStore.defaultCompany?.default_country);
  await getSettings();
  await getCountries();
  changeTheme();
  await getCurrencies();
  await getLanguages();
  loading.value = false;
});

watch(locale, async (newLocale) => {
  handleLocale(newLocale);
  await getSettings();
  changeTheme();
  await getCurrencies();
  await getLanguages();
});

const handleLocale = (locale) => {
  cookies.set('_lang', locale);
  document.documentElement.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", locale);
  setLocaleValidate(locale);
};




</script>
