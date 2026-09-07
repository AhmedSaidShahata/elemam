import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoaderStore = defineStore("loader", () => {
    const loader = ref(true);
    const loaderValue = computed(() => loader)

    function setLoader(value) {
        loader.value = value;
    }

    return {
        loaderValue,
        setLoader,
    };
});