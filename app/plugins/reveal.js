import { defineNuxtPlugin } from "#app";

// Scroll-reveal for the landing sections.
//
// The `v-reveal` directive is opt-in per element, so nothing animates unless a
// component asks for it:
//
//   v-reveal            fade up (the default)
//   v-reveal.left       slide in from the left  (.right / .up / .down / .zoom / .blur)
//   v-reveal.start      slide in from the reading edge, so it mirrors in RTL (.end)
//   v-reveal.stagger    reveal the element's direct children one after another
//   v-reveal="240"      hold the reveal back by 240ms
//
// The hidden start state is server-rendered (see `getSSRProps`) and gated on
// `html.js-reveal`, which the landing layout sets from a blocking inline script.
// That combination means the element is already hidden in the very first paint
// - no flash of content that then hides itself - while a visitor without
// JavaScript never gets the class and so sees the page fully rendered.

const VARIANTS = ["up", "down", "left", "right", "start", "end", "zoom", "blur"];
const STAGGER_STEP = 90;

const variantOf = (binding) => {
  const named = binding.arg || (typeof binding.value === "string" ? binding.value : null);
  if (VARIANTS.includes(named)) return named;
  return VARIANTS.find((name) => binding.modifiers[name]) || "up";
};

export default defineNuxtPlugin((nuxtApp) => {
  // One observer for the page rather than one per element. Every reveal is
  // one-shot, so targets unobserve themselves as they fire and the observer is
  // empty again once the visitor has been through the page.
  let observer = null;

  const ensureObserver = () => {
    if (observer) return observer;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      // Fire a little before the element is fully in view so the motion reads
      // as arriving with the scroll instead of starting late.
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    return observer;
  };

  nuxtApp.vueApp.directive("reveal", {
    // Emit the attribute during SSR so the hidden state is in the first paint.
    // Per-child stagger delays are a client concern; until they are applied the
    // CSS falls back to a 0ms delay, which just means children arrive together.
    getSSRProps(binding) {
      return binding.modifiers.stagger
        ? { "data-reveal-stagger": "" }
        : { "data-reveal": variantOf(binding) };
    },

    mounted(el, binding) {
      if (binding.modifiers.stagger) {
        el.dataset.revealStagger = "";
        Array.from(el.children).forEach((child, index) => {
          child.style.setProperty("--reveal-delay", `${index * STAGGER_STEP}ms`);
        });
      } else {
        el.dataset.reveal = variantOf(binding);
        if (typeof binding.value === "number") {
          el.style.setProperty("--reveal-delay", `${binding.value}ms`);
        }
      }

      // Honour the OS setting: land on the final state and never animate.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.classList.add("is-revealed");
        return;
      }

      ensureObserver().observe(el);
    },

    unmounted(el) {
      observer?.unobserve(el);
    },
  });
});
