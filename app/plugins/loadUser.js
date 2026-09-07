import { useAuthStore } from "@/stores/auth";
import cookies from 'js-cookie';
import { useServerCookies } from '~/composables/useServerCookies'

export default defineNuxtPlugin({
  name: 'load-user',
  enforce: 'post',
  async setup({ $pinia }) {
    const auth = useAuthStore($pinia);
    let token;

    if (process.client) {
      token = cookies.get('token');
    } else {
      const serverCookies = await useServerCookies();
      token = serverCookies.token;
    }

    if (token && !auth.isLoggedIn) {
      await auth.getUser();
    }
  }
});
