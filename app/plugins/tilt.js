import { defineNuxtPlugin } from "#app";

// `v-tilt`: a pointer-tracked 3D tilt for cards, purely a visual flourish.
//
// Desktop pointers only (`hover: hover` + `pointer: fine`) and gated on
// prefers-reduced-motion, so touch devices and motion-sensitive visitors keep
// the flat card untouched. The directive only ever writes CSS custom
// properties - `_landing-tilt.scss` owns the actual transform and glare.

const MAX_TILT_DEG = 10;

const isEligible = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const handlers = new WeakMap();

const attach = (el) => {
  if (handlers.has(el) || !isEligible()) return;

  el.classList.add("landing-tilt");

  const onMove = (event) => {
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    el.style.setProperty("--tilt-rx", `${(0.5 - py) * MAX_TILT_DEG * 2}deg`);
    el.style.setProperty("--tilt-ry", `${(px - 0.5) * MAX_TILT_DEG * 2}deg`);
    el.style.setProperty("--tilt-glare-x", `${px * 100}%`);
    el.style.setProperty("--tilt-glare-y", `${py * 100}%`);
  };

  const onEnter = () => el.classList.add("landing-tilt--active");

  const onLeave = () => {
    el.classList.remove("landing-tilt--active");
    el.style.setProperty("--tilt-rx", "0deg");
    el.style.setProperty("--tilt-ry", "0deg");
  };

  el.addEventListener("pointerenter", onEnter);
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", onLeave);

  handlers.set(el, { onEnter, onMove, onLeave });
};

const detach = (el) => {
  const stored = handlers.get(el);
  if (!stored) return;

  el.removeEventListener("pointerenter", stored.onEnter);
  el.removeEventListener("pointermove", stored.onMove);
  el.removeEventListener("pointerleave", stored.onLeave);
  handlers.delete(el);
  el.classList.remove("landing-tilt", "landing-tilt--active");
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("tilt", {
    mounted: attach,
    unmounted: detach,
  });
});
