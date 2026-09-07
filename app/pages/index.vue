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
</script>
