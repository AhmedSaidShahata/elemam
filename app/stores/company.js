import { defineStore } from "pinia";
import { ref, computed } from "vue";



export const useCompanyStore = defineStore("companyStore", () => {
  const company = ref({});
  const licenses = ref([]);

  const getCompany = computed(() => company);
  const getLicenses = computed(() => licenses);


  async function setCompany(data) {
    company.value = data[0]
  }


  return {
    company,
    licenses,
    getCompany,
    getLicenses,
    setCompany,
  };
});
