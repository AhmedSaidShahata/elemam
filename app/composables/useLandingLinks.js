// Single source of truth for the landing page's in-page navigation.
//
// `registerHref` is the registration form external to the site - every
// "Register now" call to action links here and opens it in a new tab, so
// visitors never lose their place on the landing page.
export const useLandingLinks = () => {
  const sections = ["about", "programs", "international", "faq", "contact"];

  const navLinks = sections.map((key) => ({ key, href: `#${key}` }));

  return {
    navLinks,
    registerHref: "https://forms.gle/xozvuXoCBwPWsaNo6",
  };
};
