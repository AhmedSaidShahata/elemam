<template>
  <section id="international" class="landing-international">
    <div v-reveal.start class="landing-international__visual">
      <img
        class="landing-international__visual-media"
        src="/assets/images/landing/international-visual.png"
        :alt="$t('landing.international.visual_title')"
        width="520"
        height="640"
      />
      <div class="landing-international__visual-card">
        <p class="landing-international__visual-title">
          {{ $t("landing.international.visual_title") }}
        </p>
        <p class="landing-international__visual-text">
          {{ $t("landing.international.visual_text") }}
        </p>
      </div>
    </div>

    <div v-reveal.end class="landing-international__content">
      <LandingSectionHeader
        align="start"
        :eyebrow="$t('landing.international.eyebrow')"
        :title="$t('landing.international.title')"
      />

      <div class="landing-international__intro">
        <p class="landing-international__intro-lead">
          {{ $t("landing.international.intro_lead") }}
        </p>
        <p class="landing-international__intro-sub">
          {{ $t("landing.international.intro_sub") }}
        </p>
      </div>

      <div class="landing-international__features">
        <h3 class="landing-international__features-title">
          {{ $t("landing.international.features_title") }}
        </h3>

        <div v-reveal.stagger class="landing-international__features-grid">
          <article
            v-for="feature in features"
            :key="feature.key"
            class="landing-international__feature"
          >
            <span class="landing-international__feature-icon-box">
              <img
                class="landing-international__feature-icon"
                :src="`/assets/icons/landing/${feature.icon}.svg`"
                alt=""
                width="20"
                height="20"
                aria-hidden="true"
              />
            </span>
            <div class="landing-international__feature-text">
              <p class="landing-international__feature-title">
                {{ $t(`landing.international.${feature.key}_title`) }}
              </p>
              <p class="landing-international__feature-text-body">
                {{ $t(`landing.international.${feature.key}_text`) }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  { key: "global_content", icon: "globe-feature" },
  { key: "fully_virtual", icon: "monitor" },
  { key: "certificates", icon: "award" },
  { key: "language_support", icon: "circle-x" },
];
</script>
