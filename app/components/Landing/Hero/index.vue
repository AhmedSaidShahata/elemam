<template>
  <section id="hero" class="landing-hero">
    <div class="landing-hero__bg" aria-hidden="true">
      <img
        class="landing-hero__bg-media"
        src="/assets/images/landing/hero-bg.jpg"
        alt=""
        width="1920"
        height="1209"
      />
    </div>
    <div class="landing-hero__overlay" aria-hidden="true" />

    <LandingNavbar />

    <div v-reveal.stagger class="landing-hero__card">
      <div class="landing-hero__badge">
        <p class="landing-hero__badge-text">{{ $t("landing.hero.badge") }}</p>
        <img
          class="landing-hero__badge-dot"
          src="/assets/icons/landing/badge-dot.svg"
          alt=""
          width="8"
          height="8"
          aria-hidden="true"
        />
      </div>

      <h1 class="landing-hero__title">{{ $t("landing.hero.title") }}</h1>

      <div class="landing-hero__body">
        <p
          v-for="index in paragraphsCount"
          :key="index"
          class="landing-hero__paragraph"
        >
          {{ $t(`landing.hero.paragraph_${index}`) }}
        </p>
      </div>

      <blockquote class="landing-hero__quote">
        <p class="landing-hero__quote-text">{{ $t("landing.hero.quote") }}</p>
      </blockquote>

      <p class="landing-hero__note">{{ $t("landing.hero.note") }}</p>

      <div class="landing-hero__actions">
        <a
          class="landing-hero__cta landing-hero__cta--secondary"
          :href="programsHref"
        >
          {{ $t("landing.hero.cta_secondary") }}
        </a>
        <a class="landing-hero__cta landing-hero__cta--primary" :href="registerHref">
          {{ $t("landing.hero.cta_primary") }}
          <img
            class="landing-hero__cta-icon"
            src="/assets/icons/landing/arrow-left.svg"
            alt=""
            width="20"
            height="20"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const paragraphsCount = 4;

const { navLinks, registerHref } = useLandingLinks();
const programsHref = navLinks.find((link) => link.key === "programs").href;
</script>
