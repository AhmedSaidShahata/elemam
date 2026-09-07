<template>
  <main>
    <LandingHero />
    <LandingAbout />
    <LandingPrograms />
    <LandingInternational />
    <LandingFaq />
    <LandingContact />
    <LandingFooter />
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { usePageHead } from "~/composables/usePageHead";

definePageMeta({
  layout: "landing",
});

const { t } = useI18n();

usePageHead({
  title: t("landing.seo.title"),
  description: t("landing.seo.description"),
  keywords: t("landing.seo.keywords"),
});

// A direct link to e.g. #programs should land on that section, but on this
// static build something client-side resets scroll to the top after the
// initial mount, discarding the browser's own jump to the fragment - the
// hash itself is untouched, only the scroll position is lost. A single
// reassertion loses that race unpredictably depending on exactly when the
// resetter runs, so this reasserts a few times over the first second instead
// of depending on a guess about that timing.
onMounted(() => {
  if (!window.location.hash) return;

  const target = document.getElementById(window.location.hash.slice(1));
  if (!target) return;

  const land = () => target.scrollIntoView({ behavior: "auto", block: "start" });
  [0, 50, 150, 300, 600, 1000].forEach((delay) => setTimeout(land, delay));
});
</script>
