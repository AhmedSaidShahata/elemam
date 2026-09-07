import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useApi from "../composables/useApi";

const { get } = useApi();

export const useLanguagesStore = defineStore("allLanguagesStore", () => {
  const languages = ref([]);

  const allLanguages = computed(() => languages.value);

  async function getLanguages() {
    try {
      const response = await get("/languages?pagination=all");
      const languagesData = response.data.data || [];
      languages.value = languagesData;
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  }

  return { languages, allLanguages, getLanguages };
});