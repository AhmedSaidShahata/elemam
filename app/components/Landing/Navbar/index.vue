<template>
  <!-- The slot holds the navbar's place in the hero's flow. Once the bar goes
       fixed it reserves the height the bar used to occupy, so nothing below it
       jumps at the moment it detaches. -->
  <div class="landing-navbar-slot" :style="slotStyle">
    <nav
      ref="navEl"
      class="landing-navbar"
      :class="{ 'landing-navbar--stuck': isStuck }"
      :aria-label="$t('landing.nav.aria_label')"
    >
      <div class="landing-navbar__logos">
        <img
          class="landing-navbar__logo-university"
          src="/assets/images/landing/imam-university-logo.png"
          :alt="$t('landing.nav.university_logo_alt')"
          width="61"
          height="83"
        />
        <span class="landing-navbar__logo-divider-wrap" aria-hidden="true">
          <img
            class="landing-navbar__logo-divider"
            src="/assets/icons/landing/logo-divider.svg"
            alt=""
            width="24"
            height="1"
          />
        </span>
        <img
          class="landing-navbar__logo-otas"
          src="/assets/icons/landing/otas-logo.svg"
          :alt="$t('landing.nav.otas_logo_alt')"
          width="118"
          height="45"
        />
      </div>

      <ul class="landing-navbar__links">
        <li v-for="link in links" :key="link.key">
          <a
            class="landing-navbar__link"
            :class="{ 'landing-navbar__link--active': activeSection === link.key }"
            :href="link.href"
            :aria-current="activeSection === link.key ? 'true' : undefined"
            @click="scrollToSection($event, link.href)"
          >
            {{ $t(`landing.nav.${link.key}`) }}
          </a>
        </li>
      </ul>

      <button
        type="button"
        class="landing-navbar__lang"
        :aria-label="$t('landing.nav.switch_language')"
        @click="switchLocale"
      >
        <img
          class="landing-navbar__lang-icon"
          src="/assets/icons/landing/globe.svg"
          alt=""
          width="20"
          height="20"
          aria-hidden="true"
        />
        <span class="landing-navbar__lang-label">{{ nextLocaleLabel }}</span>
      </button>

      <a
        class="landing-navbar__cta"
        :href="registerHref"
        @click="scrollToSection($event, registerHref)"
      >
        {{ $t("landing.nav.register_now") }}
      </a>
    </nav>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, nextTick, ref } from "vue";
import cookies from "js-cookie";
import { setLocale as setLocaleValidate } from "@vee-validate/i18n";
import { useLocaleStore } from "~/stores/locale";

const { locale, setLocale } = useI18n();
const { setLocaleApp } = useLocaleStore();
const { navLinks: links, registerHref } = useLandingLinks();
const { scrollToSection } = useLandingScroll();

const nextLocaleCode = computed(() => (locale.value === "ar" ? "en" : "ar"));
const nextLocaleLabel = computed(() => nextLocaleCode.value.toUpperCase());

const switchLocale = () => {
  const code = nextLocaleCode.value;
  setLocale(code);
  setLocaleValidate(code);
  setLocaleApp(code);
  cookies.set("_lang", code);
  document.documentElement.setAttribute("dir", code === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", code);
};

// How far the page scrolls before the bar detaches from the hero.
const STICK_AFTER = 80;

const navEl = ref(null);
const isStuck = ref(false);
const reservedHeight = ref(0);
const activeSection = ref("");

const slotStyle = computed(() =>
  isStuck.value ? { height: `${reservedHeight.value}px` } : null
);

// Only meaningful while the bar is still in the flow; once it is fixed it has
// been restyled to its compact height and no longer reports the flow height.
const measure = () => {
  if (!navEl.value || isStuck.value) return;
  reservedHeight.value = navEl.value.offsetHeight;
};

// Gap left between the bar and the top of the section jumped to.
const CLEARANCE_GAP = 32;

// `scroll-margin-top` on the sections needs to match whatever the detached bar
// actually measures - which varies with breakpoint and with the locale's text
// length - so publish the measured height instead of trusting the CSS default.
const publishClearance = () => {
  if (!navEl.value || !isStuck.value) return;
  document.documentElement.style.setProperty(
    "--landing-header-clearance",
    `${Math.round(navEl.value.offsetHeight) + CLEARANCE_GAP}px`
  );
};

let frame = null;

const onScroll = () => {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = null;

    const shouldStick = window.scrollY > STICK_AFTER;
    if (shouldStick === isStuck.value) return;

    // Capture the flow height before detaching, and re-measure after
    // reattaching so a viewport resize made while stuck is picked back up.
    if (shouldStick) measure();
    isStuck.value = shouldStick;
    nextTick(() => {
      if (!shouldStick) measure();
      publishClearance();
    });
  });
};

const onResize = () => {
  measure();
  publishClearance();
};

// Highlights the link for whichever section is crossing the middle of the
// viewport. The negative margins collapse the observer root to a band around
// the centre line, so exactly one section is the active one at a time.
let spy = null;
let barResize = null;

onMounted(() => {
  measure();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  onScroll();

  // The bar's height also changes for reasons a resize listener never sees -
  // a webfont swapping in, a longer translation rewrapping the link strip - and
  // a single measurement at mount can be taken before any of that settles. One
  // observer keeps both numbers current; the two calls are naturally exclusive,
  // since each no-ops in the state the other one cares about.
  barResize = new ResizeObserver(() => {
    measure();
    publishClearance();
  });
  barResize.observe(navEl.value);

  spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSection.value = entry.target.id;
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  links.forEach(({ key }) => {
    const section = document.getElementById(key);
    if (section) spy.observe(section);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onResize);
  if (frame) cancelAnimationFrame(frame);
  spy?.disconnect();
  barResize?.disconnect();
  document.documentElement.style.removeProperty("--landing-header-clearance");
});
</script>
