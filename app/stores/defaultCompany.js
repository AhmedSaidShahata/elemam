import { ref, computed } from "vue";
import { defineStore } from "pinia";
import useApi from "~/composables/useApi";
import cookie from "js-cookie";
import { useNuxtApp, useRouter } from "#app";
import { useLocaleStore } from "@/stores/locale";

export const useDefaultCompanyStore = defineStore("defaultCompany", () => {
  const defaultCompany = ref({});

  const getDefaultCompany = computed(() => defaultCompany.value);

  const { $i18n } = useNuxtApp();
  const router = useRouter();

  const { get } = useApi();

  const setDefaultCompany = async () => {
    try {
      const localeStore = useLocaleStore();
      const serverLangCookie = process.server ? useCookie("_lang").value : null;

      const res = await get("company-profile");

      if (!res?.data) {
        return;
      }

      const company = res.data.company;

      defaultCompany.value = company;

      const langCookie = serverLangCookie || cookie.get("_lang");

      // if (langCookie) {
      //   await $i18n.setLocale(langCookie);
      //   localeStore.setLocaleApp(langCookie);
      //   return;
      // }

      const currentLocale = $i18n?.locale?.value;
      if (currentLocale) {
        localeStore.setLocaleApp(currentLocale);
      }

      if (!langCookie) {
        const defaultLang = company?.default_language?.code?.toLowerCase();

        if (defaultLang) {
          const currentPath = router.currentRoute.value.path;
          if (currentPath === "/" || currentPath === "/en") {
            await $i18n.setLocale(defaultLang);
            localeStore.setLocaleApp(defaultLang);
            await router.push(`${defaultLang == "ar" ? "/" : "/" + defaultLang}`);
          }
        }
      }


      return company;
    } catch (error) {
      console.error("Error setting default company:", error);
      throw error;
    }
  };

  return {
    defaultCompany,
    getDefaultCompany,
    setDefaultCompany,
  };
});
