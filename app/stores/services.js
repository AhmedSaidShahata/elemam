import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useApi from "../composables/useApi";

const { get } = useApi();

export const useServicesStore = defineStore("servicesStore", () => {
  const services = ref([]);
  const header_services = ref([]);

  const allServices = computed(() => services);
  const allHeaderServices = computed(() => header_services);

  async function getServices() {
    try {
      const response = await get("/services?sort_by=sorting_number");
      const servicesData = response.data.data || [];
      services.value = servicesData;
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }

  async function getHeaderServices() {
    try {
      const response = await get("/services?sort_by=header_sorting_number");
      const headerServicesData = response.data.data || [];
      header_services.value = headerServicesData;
    } catch (error) {
      console.error("Error fetching header services:", error);
    }
  }


  function setData(payload) {
    services.value = payload;
  }

  function setHeaderData(payload) {
    header_services.value = payload;
  }

  return {
    services,
    header_services,
    allServices,
    allHeaderServices,
    getServices,
    getHeaderServices,
    setData,
    setHeaderData
  };
});
