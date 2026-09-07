import { defineStore } from "pinia";
import useApi from "../composables/useApi";
import cookies from 'js-cookie';
import { ref, computed } from 'vue'
const { get, remove } = useApi();
export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);

  const isLoggedIn = computed(() => !!user.value)

  async function logout() {
    const response = await remove("signout");
    if (response) {
      cookies.remove("token")
      user.value = null;
    }

  }

  async function getUser() {
    try {
      const response = await get("profile/username");
      user.value = response.data?.user;
    } catch (error) {
      console.log(error);
      if (process.client) {
        cookies.remove("token");
      }
      user.value = null;
    }
  }

  return { user, isLoggedIn, getUser, logout }
})