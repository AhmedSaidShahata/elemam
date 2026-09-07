// stores/pagesStore.js or stores/pagesStore.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useApi from "../composables/useApi";
import { useI18n } from "vue-i18n";

const { get } = useApi();

export const usePagesStore = defineStore("pagesStore", () => {

    const pages = ref(new Map());
    const currentPage = ref({});
    const { locale } = useI18n();

    const page = computed(() => currentPage);

    async function fetchPage(path, response = null) {
        const cacheKey = path;

        if (pages.value.has(cacheKey)) {
            currentPage.value = pages.value.get(cacheKey);
            return currentPage.value;
        } else {
            const responseData = response;
            let pageData = responseData;
            const sectionsMap = {};
            for (const section of Object.values(pageData?.sections || {})) {
                const itemsMap = {};
                for (const item of Object.values(section.items || {})) {
                    const customAttributesMap = {};
                    for (const attr of Object.values(item.custom_attributes || {})) {
                        customAttributesMap[attr.key] = attr;
                    }
                    item.custom_attributes = customAttributesMap;

                    itemsMap[item.identifier] = item;
                }
                section.items = itemsMap;
                sectionsMap[section.identifier] = section;
            }
            pageData.sections = sectionsMap;
            pages.value.set(path, pageData);
            currentPage.value = pageData;
            return pageData
        }

    }
    const getPages = () => {
        return pages.value
    };


    return {
        page,
        getPages,
        fetchPage
    };
});
