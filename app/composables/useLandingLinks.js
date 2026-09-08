
export const useLandingLinks = () => {
  const sections = ["about", "programs", "international", "faq", "contact"];

  const navLinks = sections.map((key) => ({ key, href: `#${key}` }));

  return {
    navLinks,
    registerHref: "https://forms.gle/xozvuXoCBwPWsaNo6",
  };
};
