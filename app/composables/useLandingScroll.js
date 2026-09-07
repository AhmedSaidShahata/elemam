// Smooth in-page navigation for the landing page's `#section` links.
//
// Both the navbar and the footer link to the same anchors, so the click
// behaviour lives here rather than being written twice. The clearance under the
// fixed header comes from `scroll-margin-top` on the sections themselves (see
// `_landing-motion.scss`), which keeps the offset correct for plain `#hash`
// deep links too.
export const useLandingScroll = () => {
  const scrollToSection = (event, href) => {
    if (!href?.startsWith("#")) return;

    const target = document.getElementById(href.slice(1));
    // If the section is not on the page, leave the anchor alone and let the
    // browser do whatever it would have done.
    if (!target) return;

    event.preventDefault();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });

    // Keep the hash shareable, but via replaceState: assigning `location.hash`
    // would make the browser jump instantly and cancel the smooth scroll.
    window.history.replaceState(null, "", href);

    // Carry keyboard focus along with the viewport so tabbing continues from
    // the section the visitor just jumped to instead of the top of the page.
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };

  return { scrollToSection };
};
