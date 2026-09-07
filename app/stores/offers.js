// stores/offers.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useApi from "@/composables/useApi";

const { get } = useApi();

export const useOffersStore = defineStore("offers", () => {
    const offers = ref([]);


    const getOffers = computed(() => offers.value);

    async function setOffers() {
        try {
            const res = await get("offers",
                { simple: true, pagination: "all" },
            );

            offers.value = res.data;
        } catch (error) {
            console.error("Error fetching offers:", error);
        }
    }

    return {
        offers,
        getOffers,
        setOffers,
    };
});