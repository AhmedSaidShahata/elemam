import cookies from "js-cookie";
import { useCountriesStore } from "@/stores/countries";
import { useServerCookies } from "@/composables/useServerCookies";




const SKIP_DEFAULT_COUNTRY_COOKIE = "skip_default_country";

let clientSkipDefaultOnce = false;

async function readSkipDefaultOnce(event) {
  if (import.meta.server) {
    if (event?.context?.skipDefaultCountryOnce === true) return true;
    if (!event) return false;
    const { getCookie } = await import("h3");
    return getCookie(event, SKIP_DEFAULT_COUNTRY_COOKIE) === "1";
  }
  return clientSkipDefaultOnce || cookies.get(SKIP_DEFAULT_COUNTRY_COOKIE) === "1";
}

function consumeSkipDefaultOnceOnClient() {
  clientSkipDefaultOnce = false;
  cookies.remove(SKIP_DEFAULT_COUNTRY_COOKIE, { path: "/" });
}

async function markSkipDefaultOnce(event) {
  if (import.meta.server) {
    if (!event) return;
    event.context.skipDefaultCountryOnce = true;
    const { setCookie } = await import("h3");
    setCookie(event, SKIP_DEFAULT_COUNTRY_COOKIE, "1", { path: "/", maxAge: 60 });
  } else {
    clientSkipDefaultOnce = true;
  }
}

export default defineNuxtRouteMiddleware(async (to) => {
  const countriesStore = useCountriesStore();
  const event = import.meta.server ? useRequestEvent() : null;

  if (!countriesStore.availableTarget.length) {
    await countriesStore.getAvailableTarget();
  }
  const availableTargets = countriesStore.availableTarget;

  function isValidTargetCountry(code) {
    if (!code || !availableTargets.length) return true;
    return availableTargets.some(
      (c) => c.code && c.code.toLowerCase() === code.toLowerCase()
    );
  }


  if (!availableTargets.length) {
    // No target country at all — the country filter shouldn't exist in the
    // route, so strip it if present. Otherwise let the route render as requested.
    if (to.query.country) {
      const { country, ...restQuery } = to.query;
      return navigateTo({ path: to.path, query: restQuery });
    }
    return;
  }

  const skipDefaultOnce = await readSkipDefaultOnce(event);

  const defaultTargetCountry = availableTargets[0];

  const targetCountryQuery = to.query.country;
  if (targetCountryQuery) {

    if (!isValidTargetCountry(targetCountryQuery)) {
      await markSkipDefaultOnce(event);
      const { country, ...restQuery } = to.query;
      return navigateTo({ path: to.path, query: restQuery });
    }

    if (!countriesStore.countries.length) {
      await countriesStore.getCountries();
    }
    const matchedCountry =
      countriesStore.countries.find(
        (c) => c.code && c.code.toLowerCase() === targetCountryQuery.toLowerCase()
      ) ||
      availableTargets.find(
        (c) => c.code && c.code.toLowerCase() === targetCountryQuery.toLowerCase()
      );


    const currentSelected = countriesStore.selectedCountry;
    if (
      matchedCountry &&
      (!currentSelected || currentSelected.code?.toLowerCase() !== matchedCountry.code?.toLowerCase())
    ) {
      countriesStore.setSelectedCountry(matchedCountry);
    }
    return;
  }

  if (skipDefaultOnce) {

    if (import.meta.client) {
      consumeSkipDefaultOnceOnClient();
    }
    return;
  }

  let countryCode = "";
  let rawCountryCookie;

  if (import.meta.server) {
    const serverCookies = await useServerCookies();
    rawCountryCookie = serverCookies.country;
  } else if (import.meta.client) {
    rawCountryCookie = cookies.get("country");
  }

  if (rawCountryCookie) {
    try {
      const countryObj = JSON.parse(rawCountryCookie);
      if (countryObj && countryObj.code) {
        countryCode = countryObj.code;
      }
    } catch (e) {
      console.warn("Error parsing country cookie in target-country middleware:", e);
    }
  }

  if (countryCode && !isValidTargetCountry(countryCode)) {
    const defaultCode = defaultTargetCountry?.code || "";
    return navigateTo({
      path: to.path,
      query: {
        ...to.query,
        ...(defaultCode ? { country: defaultCode } : {}),
      },
    });
  }

  if (countryCode && to.query.country !== countryCode) {
    return navigateTo({
      path: to.path,
      query: { ...to.query, country: countryCode },
    });
  }

  if (!to.query.country) {
    const defaultCode = defaultTargetCountry?.code || "";
    if (defaultCode) {
      return navigateTo({
        path: to.path,
        query: { ...to.query, country: defaultCode },
      });
    }
  }
});
