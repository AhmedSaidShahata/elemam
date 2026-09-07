import cookie from "js-cookie";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCurrenciesStore = defineStore("allCurrenciesStore", () => {
  const currencies = ref([]);
  const selectedCurrency = ref(null);

  const allCurrencies = computed(() => currencies.value);

  async function getCurrencies() {
      try {
        const { get } = useApi();

        const response = await get("/currencies?pagination=all");
        const currenciesData = response.data.data || [];
        currencies.value = currenciesData;
        } catch (error) {
          console.error(error);
        }
  }

  function setSelectedCurrency(currency) {
    selectedCurrency.value = currency;
    cookie.set("currency", JSON.stringify(currency));
  }

  function initSelectedCurrency() {
    const saved = cookie.get("currency");
    if (saved) {
      try {
        selectedCurrency.value = JSON.parse(saved);
      } catch {
        selectedCurrency.value = null;
      }
    }
  }

  return {
    currencies,
    selectedCurrency,
    allCurrencies,
    getCurrencies,
    setSelectedCurrency,
    initSelectedCurrency,
  };
});