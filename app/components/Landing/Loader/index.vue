<template>
  <!-- Only ever shown under `html.js-reveal` (see _landing-loader.scss) - a
       visitor without JavaScript never gets stuck behind it, since nothing
       would ever be able to remove it for them. -->
  <div class="landing-loader" :class="{ 'landing-loader--hidden': ready }" aria-hidden="true">
    <div class="landing-loader__mark">
      <img
        class="landing-loader__logo"
        src="/assets/icons/landing/otas-logo-white.svg"
        alt=""
        width="140"
        height="54"
      />
      <span class="landing-loader__ring" />
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

// Reads as considered rather than instant, and covers the moment the hero's
// background photo and the Cairo webfont are still swapping in - without
// this, that swap happens visibly on top of the page instead of behind cover.
const MIN_VISIBLE_MS = 500;
// Upper bound so a slow asset (or one that never fires `load`, e.g. blocked by
// an extension) cannot stall the reveal indefinitely.
const MAX_WAIT_MS = 2500;

const ready = ref(false);

let timers = [];
const after = (ms) => new Promise((resolve) => timers.push(setTimeout(resolve, ms)));

onMounted(async () => {
  const pageLoaded =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));

  await Promise.all([Promise.race([pageLoaded, after(MAX_WAIT_MS)]), after(MIN_VISIBLE_MS)]);

  ready.value = true;
});

onBeforeUnmount(() => {
  timers.forEach(clearTimeout);
});
</script>
