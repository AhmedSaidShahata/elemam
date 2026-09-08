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



const { t } = useI18n();

useHead(() => {
  const title = t("landing.seo.title");
  const description = t("landing.seo.description");

  return {
    title,
    meta: [
      { name: "description", content: description },
      { name: "keywords", content: t("landing.seo.keywords") },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  };
});


onMounted(() => {
  if (!window.location.hash) return;

  const target = document.getElementById(window.location.hash.slice(1));
  if (!target) return;

  const land = () => target.scrollIntoView({ behavior: "auto", block: "start" });
  [0, 50, 150, 300, 600, 1000].forEach((delay) => setTimeout(land, delay));
});
</script>
