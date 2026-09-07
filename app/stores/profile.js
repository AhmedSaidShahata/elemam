// stores/profile.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useApi from "../composables/useApi";

const { get } = useApi();

export const useProfileStore = defineStore("profile", () => {
    const profile = ref({});

    const getUserProfile = computed(() => profile.value);

    async function setUserProfile() {
        try {
            const res = await get("/profile/username");
            if (!res || !res.data) return;
            const { user } = res.data;

            profile.value = user;

            // ⚠️ optional legacy support
            const { $auth } = useNuxtApp();
            if ($auth) {
                $auth.$user = user;
                $auth.setUser(user);
            }

        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }

    function clearProfile() {
        profile.value = {};
    }

    return {
        profile,
        getUserProfile,
        setUserProfile,
        clearProfile,
    };
});