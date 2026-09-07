
import axios from 'axios';
import { navigateTo } from '#app';
import { useErrorsStore } from "../stores/errors";
import { useNotificationStore } from "../stores/notification";
import { useLocaleStore } from "../stores/locale";
import cookies from 'js-cookie';

const api = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});
api.interceptors.request.use(
  (config) => {
    if (process.client) {

      let locale = cookies.get('_lang');

      // useNuxtApp() can throw before the Nuxt context is ready — guard only that.
      // Everything else (cookie sync, store update) is outside so real errors surface.
      let i18nLocale;
      try {
        i18nLocale = useNuxtApp().$i18n?.locale?.value;
      } catch { /* Nuxt context not yet initialised — fall back to cookie */ }

      if (i18nLocale && i18nLocale !== locale) {
        // i18n and cookie disagree — trust i18n (route is the source of truth)
        // and sync the cookie + store so subsequent calls are already correct.
        locale = i18nLocale;
        cookies.set('_lang', locale);
        useLocaleStore().setLocaleApp(locale);
      } else if (!locale) {
        locale = i18nLocale || 'ar';
      }

      const token = cookies.get('token');
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      config.headers["X-locale"] = locale;
      config.headers["Accept-Language"] = locale;
      config.headers['X-timezone'] = `UTC +${-new Date().getTimezoneOffset() / 60}`;

      const countryCookie = cookies.get('country');
      const currencyCookie = cookies.get('currency');

      let countryId = null;
      if (countryCookie) {
        try {
          const parsed = JSON.parse(countryCookie);
          countryId = parsed?.id || null;
        } catch (e) { }
      }

      let currencyCode = "USD";
      if (currencyCookie) {
        try {
          const parsed = JSON.parse(currencyCookie);
          currencyCode = parsed?.code || "USD";
        } catch (e) { }
      }

      config.headers["X-Target-Country"] = countryId;
      config.headers["X-currency"] = currencyCode;
    }


    try {
      const nuxtApp = useNuxtApp();
      if (nuxtApp && nuxtApp.$apiBase) {
        const dynamicUrl = nuxtApp.$apiBase;
        const staticUrl = nuxtApp.$staticUrl;
        const checkLocal = nuxtApp.$checkLocal();
        config.baseURL = checkLocal ? staticUrl : dynamicUrl;
      }
    } catch (error) {

    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      const { setNotification } = useNotificationStore();
      const { method } = response.config;
      const allowedMethods = ["post", "put", "delete"];
      if (allowedMethods.includes(method)) {
        setNotification({ text: response.data.message, color: 'success', visible: true });
      }
    }
    // v1 match: clear server errors after a successful response
    const { resetErrors } = useErrorsStore();
    if (resetErrors) resetErrors();
    return response;
  },
  (error) => {
    const response = error?.response;
    // v1 match: guard against network errors with no response (e.g. timeout)
    if (!response) return Promise.reject(error);

    const { status, data } = response;

    if ([403, 503, 422, 409].includes(status)) {
      const { setNotification } = useNotificationStore();
      let errorMsg = data?.message;
      let textMsgNotification;
      if (errorMsg) {
        textMsgNotification = errorMsg?.replace(/\([^)]*\)/g, "")?.trim();
      }
      setNotification({ text: textMsgNotification, color: 'error', visible: true });
    }

    // v1 match: set server errors for any error response that includes data.errors
    if (data?.errors) {
      const { setErrors } = useErrorsStore();
      setErrors(data.errors);
    }

    if (status === 404) {
      navigateTo('/not-found');
    } else if (status === 429) {
      navigateTo('/too-many-requests');
    } else if (status === 402) {
      navigateTo('/license-expired');
    }

    return Promise.reject(error);
  }
);

export default api;