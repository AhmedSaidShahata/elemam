import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useApi from "../composables/useApi";

const { get } = useApi();

export const usePageImagesStore = defineStore("pageImagesStore", () => {
    const images = ref([]);

    const allImages = computed(() => images);

    const getByKey = computed(() => (key) => {
        return images.value?.find(img => img?.key === key) || null;
    });

    const getMediaByKey = computed(() => (key) => {
        const img = getByKey.value(key);
        return img ? img.media : null;
    });


    async function fetchImages(data) {
        images.value = data
    }


    function setImages(payload) {
        images.value = payload;

    }

    return {
        images,
        allImages,
        getByKey,
        getMediaByKey,
        setImages,
        fetchImages
    };
});
