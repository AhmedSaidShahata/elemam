import cookie from 'js-cookie';
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCountriesStore = defineStore("allCountriesStore", () => {
  const countries = ref([]);
  const availableTarget = ref([]);
  const availablePhone = ref([]);
  const selectedCountry = ref(null);

  const allCountries = computed(() => countries.value);

  async function getCountries() {
    try {
      const { get } = useApi();
      const response = await get("/countries?pagination=all");
      const countriesData = response.data.data || [];
      countries.value = countriesData;
    } catch (error) {
      console.error(error);
    }
  }

  async function getAvailableTarget() {
    try {
      const { get } = useApi();
      const res = await get("/countries?target_available=yes&pagination=all");
      availableTarget.value = res.data.data || [];
    } catch (err) {
      console.error(err);
    }
  }

  async function getAvailablePhone() {
    try {
      const { get } = useApi();
      const res = await get("/countries?phone_available=yes&pagination=all");
      availablePhone.value = res.data.data || [];
    } catch (err) {
      console.error(err);
    }
  }

  function setSelectedCountry(country) {
    selectedCountry.value = country;


    cookie.set("country", JSON.stringify(country));
  }


  function initSelectedCountry() {
    const saved = cookie.get("country");
    if (saved) {
      try {
        selectedCountry.value = JSON.parse(saved);
      } catch (e) {
        selectedCountry.value = null;
      }
    }
  }

  return {
    countries,
    availableTarget,
    availablePhone,
    selectedCountry,
    allCountries,
    getCountries,
    getAvailableTarget,
    getAvailablePhone,
    setSelectedCountry,
    initSelectedCountry,
  };
});