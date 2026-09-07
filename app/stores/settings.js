import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useApi from "../composables/useApi";

export const useSettingsStore = defineStore("settingsStore", () => {
  const { get } = useApi();
  const settings = ref({});

  const allSettings = computed(() => settings);

  async function getSettings() {
    try {
      const res = await get("project-settings", { pagination: "all" });

      if (res) {
        const { data: settingsData = [] } = res.data || {};
        const convertedSettings = settingsData.reduce((acc, currentSetting) => {
          if (currentSetting.value) {
            acc[currentSetting.key] = currentSetting;
          } else if (currentSetting.phone) {
            const formattedCountryCode = currentSetting.phone.country_code.replace(/^00/, '+');
            acc[currentSetting.key] = {
              country_code: formattedCountryCode,
              number: currentSetting.phone.number,
              extension: currentSetting.phone.extension,
              displayed: currentSetting.displayed
            };
          }
          return acc;
        }, {});

        settings.value = convertedSettings;
        return settingsData;
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  }

  return {
    allSettings,
    getSettings,
  };
});
