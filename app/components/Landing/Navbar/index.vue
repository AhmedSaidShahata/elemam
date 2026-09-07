<template>
  <nav class="landing-navbar" :aria-label="$t('landing.nav.aria_label')">
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
        <a class="landing-navbar__link" :href="link.href">
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

    <a class="landing-navbar__cta" :href="registerHref">
      {{ $t("landing.nav.register_now") }}
    </a>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import cookies from "js-cookie";
import { setLocale as setLocaleValidate } from "@vee-validate/i18n";
import { useLocaleStore } from "~/stores/locale";

const { locale, setLocale } = useI18n();
const { setLocaleApp } = useLocaleStore();
const { navLinks: links, registerHref } = useLandingLinks();

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
</script>
