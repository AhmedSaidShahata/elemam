import { defineEventHandler, getRequestHeader, setResponseHeader } from 'h3'
import { staticUrl } from '~/utils/localUrl.js'

export default defineEventHandler(async (event) => {
  try {
    const host = getRequestHeader(event, 'x-forwarded-host') ?? getRequestHeader(event, 'host');

    const getMainDomain = () => {
      if (!host || typeof host !== "string") return "";

      const parts = host.split(".");
      if (parts.length < 2) return host;

      const base = parts.slice(-2).join(".");
      return ["otasapp.net", "otasapp.com", "spbeta.net"].includes(base)
        ? parts[0]
        : host;
    };

    const mainDomain = getMainDomain();
    
    let apiUrl = '';

    if (host === "localhost:3000" || host === "127.0.0.1:3000") {
      apiUrl = `${staticUrl}/mobile-links/android`;
    } else {
      const config = useRuntimeConfig();
      const urlEnv = config.public.envUrl;
      apiUrl = `${urlEnv}/${mainDomain}/mobile-links/android`;
    }

    const data = await $fetch(apiUrl);

    setResponseHeader(event, "Content-Type", "application/json; charset=utf-8");
    return data;
  } catch (err) {
    console.error("Assetlinks fetch failed:", err.message);
    setResponseHeader(event, "Content-Type", "application/json; charset=utf-8");
    event.node.res.statusCode = 500;
    return { error: "Failed to load assetlinks" };
  }
});
