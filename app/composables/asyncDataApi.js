
import { usePagesStore } from "~/stores/pages";
import { usePageHead } from "@/composables/usePageHead";
import { useNuxtApp } from '#app'
export const useAsyncDataApi = async (endPoint) => {
  const { fetchPage, getPages } = usePagesStore();
  const nuxtApp = useNuxtApp()
  const dynamicUrl = nuxtApp.$apiBase;
  const staticUrl = nuxtApp.$staticUrl;
  const checkLocal = nuxtApp.$checkLocal();
  const apiURL = checkLocal ? staticUrl : dynamicUrl;

  const { locale } = useI18n();
  const cacheKey = `${endPoint}_${locale.value}`;
  const cachedPages = getPages(cacheKey);

  const allPages = computed(() => cachedPages);
  let cuurentPages = allPages.value


  if (cuurentPages.has(cacheKey)) {
    fetchPage(cacheKey);
    let cachedPage = cuurentPages.get(cacheKey)
    usePageHead(cachedPage);
    return {
      data: { value: { page: cachedPage } },
    };
  }

  const { data } = await useAsyncData(
    cacheKey,
    () => $fetch(`${apiURL}/pages/${endPoint}`, {
      headers: {
        'X-Locale': locale.value,
      },
    })
  );

  const page = data.value?.page;
  if (page) {
    fetchPage(cacheKey, page);
    usePageHead(page);
  }
  return { data };
};
