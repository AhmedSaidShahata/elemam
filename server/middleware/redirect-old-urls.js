import routes from "~/plugins/i18n/i18n-routes";

const enMatchers = Object.values(routes)
  .filter((route) => route?.en)
  .map((route) => {
    const pattern =
      "^" +
      route.en
        .replace(/\[[^\]]+\]/g, "[^/]+")
        .replace(/\//g, "\\/") +
      "$";

    return new RegExp(pattern);
  });

export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  const path = url.pathname;


  if (/^\/(en)(\/|$)/.test(path)) {
    return;
  }

  const isEnglishRoute = enMatchers.some((regex) =>
    regex.test(path)
  );

  if (isEnglishRoute) {
    return sendRedirect(
      event,
      `/en${path}${url.search}`,
      301
    );
  }
});