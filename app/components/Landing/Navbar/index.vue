<template>
  <div class="landing-navbar-slot" :style="slotStyle">
    <nav ref="navEl" class="landing-navbar" :class="{ 'landing-navbar--stuck': isStuck }"
      :aria-label="$t('landing.nav.aria_label')">
      <button type="button" class="landing-navbar__logos" :aria-label="$t('landing.nav.back_to_top')"
        @click="onLogoClick">
        <img class="landing-navbar__logo-university" src="/assets/images/landing/imam-university-logo.png"
          :alt="$t('landing.nav.university_logo_alt')" width="61" height="83" />
        <span class="landing-navbar__logo-divider-wrap" aria-hidden="true">
          <img class="landing-navbar__logo-divider" src="/assets/icons/landing/logo-divider.svg" alt="" width="24"
            height="1" />
        </span>
        <img class="landing-navbar__logo-otas" src="/assets/icons/landing/otas-logo.svg"
          :alt="$t('landing.nav.otas_logo_alt')" width="118" height="45" />
      </button>

      <ul class="landing-navbar__links">
        <li v-for="link in links" :key="link.key">
          <a class="landing-navbar__link" :class="{ 'landing-navbar__link--active': activeSection === link.key }"
            :href="link.href" :aria-current="activeSection === link.key ? 'true' : undefined"
            @click="scrollToSection($event, link.href)">
            {{ $t(`landing.nav.${link.key}`) }}
          </a>
        </li>
      </ul>

      <button type="button" class="landing-navbar__lang" :aria-label="$t('landing.nav.switch_language')"
        @click="switchLocale">
        <img class="landing-navbar__lang-icon" src="/assets/icons/landing/globe.svg" alt="" width="20" height="20"
          aria-hidden="true" />
        <span class="landing-navbar__lang-label">{{ nextLocaleLabel }}</span>
      </button>

      <a class="landing-navbar__cta" :href="registerHref" target="_blank" rel="noopener noreferrer"
        @click="scrollToSection($event, registerHref)">
        {{ $t("landing.nav.register_now") }}
      </a>
    </nav>
  </div>


  <v-app-bar class="landing-mobile-bar px-2" :elevation="isStuck ? 3 : 0" flat>
    <button type="button" class="landing-mobile-bar__toggle" :aria-expanded="drawerOpen ? 'true' : 'false'"
      aria-controls="landing-navbar-drawer"
      :aria-label="$t(drawerOpen ? 'landing.nav.close_menu' : 'landing.nav.open_menu')"
      @click="drawerOpen = !drawerOpen">
      <svg v-if="!drawerOpen" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
    <button type="button" class="landing-mobile-bar__logo" :aria-label="$t('landing.nav.back_to_top')"
      @click="onLogoClick">
      <img style="object-fit:contain;width: 118px;height: auto;" src="/assets/icons/landing/logo-mobile.svg"
        :alt="$t('landing.nav.otas_logo_alt')" width="95" height="44" />

    </button>

    <v-spacer />


  </v-app-bar>

  <v-navigation-drawer id="landing-navbar-drawer" v-model="drawerOpen" temporary disable-resize-watcher
    disable-route-watcher location="end" :width="drawerWidth" scrim="rgba(20, 14, 33, 0.55)" role="dialog"
    :aria-modal="drawerOpen ? 'true' : undefined" :aria-label="$t('landing.nav.aria_label')"
    class="landing-navbar__drawer">
    <div class="landing-navbar__drawer-head">
      <button type="button" class="landing-navbar__drawer-logo-button" :aria-label="$t('landing.nav.back_to_top')"
        @click="onDrawerLogoClick">
        <img class="landing-navbar__drawer-logo" src="/assets/icons/landing/otas-logo.svg"
          :alt="$t('landing.nav.otas_logo_alt')" width="70" height="27" />
      </button>
      <button type="button" class="landing-navbar__drawer-close" :aria-label="$t('landing.nav.close_menu')"
        @click="closeDrawer">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <ul class="landing-navbar__drawer-links">
      <li v-for="link in links" :key="link.key">
        <a class="landing-navbar__drawer-link"
          :class="{ 'landing-navbar__drawer-link--active': activeSection === link.key }" :href="link.href"
          :aria-current="activeSection === link.key ? 'true' : undefined" @click="onDrawerLinkClick($event, link.href)">
          {{ $t(`landing.nav.${link.key}`) }}
        </a>
      </li>
    </ul>

    <button type="button" class="landing-navbar__drawer-lang" :aria-label="$t('landing.nav.switch_language')"
      @click="onDrawerLangClick">
      <img class="landing-navbar__drawer-lang-icon" src="/assets/icons/landing/globe.svg" alt="" width="18" height="18"
        aria-hidden="true" />
      <span class="landing-navbar__drawer-lang-label">{{ nextLocaleLabel }}</span>
    </button>

    <a class="landing-navbar__drawer-cta" :href="registerHref" target="_blank" rel="noopener noreferrer"
      @click="onDrawerLinkClick($event, registerHref)">
      {{ $t("landing.nav.register_now") }}
    </a>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, nextTick, ref, watch } from "vue";
import cookies from "js-cookie";
import { setLocale as setLocaleValidate } from "@vee-validate/i18n";
import { useLocaleStore } from "~/stores/locale";

const { locale, setLocale } = useI18n();
const { setLocaleApp } = useLocaleStore();
const { navLinks: links, registerHref } = useLandingLinks();
const { scrollToSection, scrollToTop } = useLandingScroll();

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

// Matches the `screen(1279px)` breakpoint in _landing-navbar.scss where
// `&__links` hides and the drawer becomes the only way to reach the sections.
const DRAWER_BREAKPOINT = 1279;

const navEl = ref(null);
const isStuck = ref(false);
const reservedHeight = ref(0);
const activeSection = ref("");
const drawerOpen = ref(false);

// <v-navigation-drawer> computes its own slide-out distance from this prop's
// *number*, not from whatever width the CSS actually renders it at - a plain
// `width: 100%` override in the stylesheet would leave the closed drawer
// sliding out by the wrong (default 256px) distance instead of the full
// viewport, visibly clipping into view at the edge. Feeding it the real
// viewport width keeps the two in sync.
const drawerWidth = ref(0);

const closeDrawer = () => {
  drawerOpen.value = false;
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
// Closing the drawer normally snaps back to wherever the visitor was before
// opening it (below) - set for the one click that's deliberately taking them
// somewhere else instead (see onDrawerLinkClick), so that restore doesn't
// immediately undo it.
let suppressScrollRestore = false;

const unlockBodyScroll = () => {
  document.documentElement.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
};

watch(drawerOpen, (open) => {
  if (open) {
    lockedScrollY = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.width = "100%";
    return;
  }

  unlockBodyScroll();
  if (suppressScrollRestore) {
    suppressScrollRestore = false;
    return;
  }
  window.scrollTo(0, lockedScrollY);
});

const onDrawerLinkClick = (event, href) => {
  // A link to an on-page section is a real navigation, not just a "close and
  // stay put" - suppress the watcher's restore above so it doesn't scroll
  // back to the pre-open position right after this scrolls to the target,
  // and unlock the body synchronously first, since scrollIntoView has no
  // visible effect while it's still pinned via the lock's position:fixed.
  if (href?.startsWith("#") && document.getElementById(href.slice(1))) {
    suppressScrollRestore = true;
    closeDrawer();
    unlockBodyScroll();
  } else {
    closeDrawer();
  }
  scrollToSection(event, href);
};

// The scroll spy below only ever sets activeSection when a tracked section
// enters view - the hero itself isn't one of them, so scrolling back up to
// it never clears whichever link was last active. The logo means "go to the
// top", so it clears that itself rather than leaving a stale link
// highlighted once you're back at the hero with nothing actually active.
const onLogoClick = (event) => {
  activeSection.value = "";
  scrollToTop(event);
};

// Same reasoning as onDrawerLinkClick above: this is a real navigation (back
// to the top), so the watcher's restore-to-pre-open-position is suppressed
// and the body unlocked synchronously first, or the scroll below would have
// no visible effect while it's still pinned via the lock's position:fixed.
const onDrawerLogoClick = (event) => {
  activeSection.value = "";
  suppressScrollRestore = true;
  closeDrawer();
  unlockBodyScroll();
  scrollToTop(event);
};

// Closing the drawer alongside the switch avoids showing it flip from one
// side of the screen to the other while still open.
const onDrawerLangClick = () => {
  switchLocale();
  closeDrawer();
};

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
  drawerWidth.value = window.innerWidth;

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
  drawerWidth.value = window.innerWidth;
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

  // The observer only fires on entries that just crossed the threshold, not
  // "here's what's currently intersecting" - so the callback tracks that set
  // itself, in intersectingSections, rather than trusting activeSection to
  // reflect it. Without that, scrolling back up past a tracked section (e.g.
  // to the hero, which isn't tracked at all) leaves its link stuck "active":
  // the section's own exit event fires as isIntersecting:false, and with
  // nothing handling that case the last value set on the way through just
  // sits there with nothing left on screen for it to describe.
  const intersectingSections = new Set();

  spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectingSections.add(entry.target.id);
          activeSection.value = entry.target.id;
        } else {
          intersectingSections.delete(entry.target.id);
        }
      });

      if (intersectingSections.size === 0) activeSection.value = "";
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
  unlockBodyScroll();
});
</script>
