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
        target="_blank"
        rel="noopener noreferrer"
        @click="scrollToSection($event, registerHref)"
      >
        {{ $t("landing.nav.register_now") }}
      </a>

      <!-- Below the breakpoint where `&__links` hides, this is the only way to
           reach the section links - they move into the drawer below. -->
      <button
        type="button"
        class="landing-navbar__menu-toggle"
        :aria-expanded="drawerOpen ? 'true' : 'false'"
        aria-controls="landing-navbar-drawer"
        :aria-label="$t(drawerOpen ? 'landing.nav.close_menu' : 'landing.nav.open_menu')"
        @click="drawerOpen = !drawerOpen"
      >
        <svg v-if="!drawerOpen" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </nav>

    <div
      class="landing-navbar__backdrop"
      :class="{ 'landing-navbar__backdrop--open': drawerOpen }"
      aria-hidden="true"
      @click="closeDrawer"
    />

    <div
      id="landing-navbar-drawer"
      ref="drawerEl"
      class="landing-navbar__drawer"
      :class="{ 'landing-navbar__drawer--open': drawerOpen }"
      role="dialog"
      :aria-modal="drawerOpen ? 'true' : undefined"
      :aria-label="$t('landing.nav.aria_label')"
      :inert="!drawerOpen"
    >
      <div class="landing-navbar__drawer-head">
        <img
          class="landing-navbar__drawer-logo"
          src="/assets/icons/landing/otas-logo.svg"
          :alt="$t('landing.nav.otas_logo_alt')"
          width="70"
          height="27"
        />
        <button
          type="button"
          class="landing-navbar__drawer-close"
          :aria-label="$t('landing.nav.close_menu')"
          @click="closeDrawer"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </div>

      <button
        type="button"
        class="landing-navbar__drawer-lang"
        :aria-label="$t('landing.nav.switch_language')"
        @click="onDrawerLangClick"
      >
        <img
          class="landing-navbar__drawer-lang-icon"
          src="/assets/icons/landing/globe.svg"
          alt=""
          width="18"
          height="18"
          aria-hidden="true"
        />
        <span class="landing-navbar__drawer-lang-label">{{ nextLocaleLabel }}</span>
      </button>

      <ul class="landing-navbar__drawer-links">
        <li v-for="link in links" :key="link.key">
          <a
            class="landing-navbar__drawer-link"
            :class="{ 'landing-navbar__drawer-link--active': activeSection === link.key }"
            :href="link.href"
            :aria-current="activeSection === link.key ? 'true' : undefined"
            @click="onDrawerLinkClick($event, link.href)"
          >
            {{ $t(`landing.nav.${link.key}`) }}
          </a>
        </li>
      </ul>

      <a
        class="landing-navbar__drawer-cta"
        :href="registerHref"
        target="_blank"
        rel="noopener noreferrer"
        @click="onDrawerLinkClick($event, registerHref)"
      >
        {{ $t("landing.nav.register_now") }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, nextTick, ref, watch } from "vue";
import cookies from "js-cookie";
import { setLocale as setLocaleValidate } from "@vee-validate/i18n";
import { useLocaleStore } from "~/stores/locale";

const { locale, setLocale } = useI18n();
const { setLocaleApp } = useLocaleStore();
const { navLinks: links, registerHref } = useLandingLinks();
const { scrollToSection } = useLandingScroll();

const nextLocaleCode = computed(() => (locale.value === "ar" ? "en" : "ar"));
const nextLocaleLabel = computed(() => nextLocaleCode.value.toUpperCase());

// The closed drawer sits at `translateX(100%)` in LTR and `translateX(-100%)`
// in RTL (see the `[dir="rtl"]` override in the stylesheet) - two different
// "off-screen" values for the same closed state. Flipping `dir` recomputes
// which one applies, and since `transform` is a transitioned property, the
// browser animates between them, sliding the closed drawer across the full
// viewport and back out. Suppressing the transition for the two paints
// around the flip removes that phantom swipe without touching the drawer's
// own open/close animation once the frame after has already landed.
//
// This toggles the suppression class directly on the element rather than
// through a reactive ref: Vue only applies a `:class` binding's DOM update on
// its next microtask flush, but `applyChange` below sets `dir` synchronously,
// in this same tick. A browser that hasn't paused to let that microtask land
// before its next paint (any real browser, unlike this project's dev-time
// checks in a backgrounded tab) can start the transition on the old class
// list and still catch the phantom swipe. Setting the class straight on the
// node closes that gap entirely.
const NO_TRANSITION_CLASS = "landing-navbar__drawer--no-transition";

const withoutDrawerTransition = (applyChange) => {
  const el = drawerEl.value;
  el?.classList.add(NO_TRANSITION_CLASS);
  applyChange();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el?.classList.remove(NO_TRANSITION_CLASS);
    });
  });
};

const switchLocale = () => {
  const code = nextLocaleCode.value;
  setLocale(code);
  setLocaleValidate(code);
  setLocaleApp(code);
  cookies.set("_lang", code);
  withoutDrawerTransition(() => {
    document.documentElement.setAttribute("dir", code === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", code);
  });
};

// How far the page scrolls before the bar detaches from the hero.
const STICK_AFTER = 80;

// Matches the `screen(1279px)` breakpoint in _landing-navbar.scss where
// `&__links` hides and the drawer becomes the only way to reach the sections.
const DRAWER_BREAKPOINT = 1279;

const navEl = ref(null);
const drawerEl = ref(null);
const isStuck = ref(false);
const reservedHeight = ref(0);
const activeSection = ref("");
const drawerOpen = ref(false);

const closeDrawer = () => {
  drawerOpen.value = false;
};

const onDrawerLinkClick = (event, href) => {
  scrollToSection(event, href);
  closeDrawer();
};

// Closing the drawer alongside the switch avoids showing it flip from one
// side of the screen to the other while still open - `switchLocale` already
// suppresses the drawer's own transition for the moment `dir` changes, so this
// closes instantly rather than animating out.
const onDrawerLangClick = () => {
  switchLocale();
  closeDrawer();
};

// Body scroll is locked while the drawer covers the page. `overflow: hidden`
// alone (the site's other slide-out drawer's approach) stops the page from
// scrolling on desktop, but iOS Safari still lets a touch drag scroll the
// background underneath a `position: fixed` overlay, which visibly detaches
// the drawer from the header once there is scroll offset behind it - the
// symptom only ever shows up away from the very top of the page, since with
// nothing behind to scroll the naive lock looks fine by accident. Pinning the
// body to its current scroll offset is the standard fix for that class of bug.
let lockedScrollY = 0;

watch(drawerOpen, (open) => {
  if (open) {
    lockedScrollY = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.width = "100%";
  } else {
    document.documentElement.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, lockedScrollY);
  }
});

const onKeydown = (event) => {
  if (event.key === "Escape" && drawerOpen.value) closeDrawer();
};

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

  // The toggle button that opens the drawer disappears above the breakpoint,
  // so a drawer left open while resizing past it (e.g. rotating a tablet, or
  // widening a resizable window) would otherwise be unreachable to close.
  if (drawerOpen.value && window.innerWidth > DRAWER_BREAKPOINT) closeDrawer();
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
  window.addEventListener("keydown", onKeydown);
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
  window.removeEventListener("keydown", onKeydown);
  if (frame) cancelAnimationFrame(frame);
  spy?.disconnect();
  barResize?.disconnect();
  document.documentElement.style.removeProperty("--landing-header-clearance");
  // Leaving the page with the drawer open must not strand the rest of the app
  // with scrolling locked.
  document.documentElement.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
});
</script>
