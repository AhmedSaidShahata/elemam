// Single source of truth for the landing page's in-page navigation.
//
// The Figma design shows the nav items and the "register" calls to action but
// never defines a registration destination, so `registerHref` points at the
// enquiries block for now. Swap it for the real registration route/URL here and
// every call to action on the page follows.
export const useLandingLinks = () => {
  const sections = ["about", "programs", "international", "faq", "contact"];

  const navLinks = sections.map((key) => ({ key, href: `#${key}` }));

  return {
    navLinks,
    registerHref: "#contact",
  };
};
