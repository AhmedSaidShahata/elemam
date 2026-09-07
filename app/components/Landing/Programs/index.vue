<template>
  <section id="programs" class="landing-programs">
    <div v-reveal class="landing-programs__header">
      <LandingSectionHeader
        :eyebrow="$t('landing.programs.eyebrow')"
        :title="$t('landing.programs.title')"
      />
      <p class="landing-programs__subtitle">
        {{ $t("landing.programs.subtitle") }}
      </p>
    </div>

    <div class="landing-programs__grid">
      <div v-reveal.stagger class="landing-programs__row">
        <div class="landing-programs__stack">
          <article
            v-for="program in stackedPrograms"
            :key="program.key"
            class="landing-programs__card landing-programs__card--stacked"
            :class="`landing-programs__card--${program.tone}`"
          >
            <div class="landing-programs__card-media">
              <img
                class="landing-programs__card-image"
                :class="`landing-programs__card-image--${program.key}`"
                :src="`/assets/images/landing/program-${program.key}.png`"
                :alt="$t(`landing.programs.${program.key}_title`)"
                width="540"
                height="180"
              />
              <span class="landing-programs__card-scrim" aria-hidden="true" />
            </div>
            <div class="landing-programs__card-body">
              <h3 class="landing-programs__card-title">
                {{ $t(`landing.programs.${program.key}_title`) }}
              </h3>
              <p class="landing-programs__card-text">
                {{ $t(`landing.programs.${program.key}_text`) }}
              </p>
            </div>
          </article>
        </div>

        <article
          class="landing-programs__card landing-programs__card--feature landing-programs__card--purple"
        >
          <div class="landing-programs__card-media">
            <img
              class="landing-programs__card-image"
              src="/assets/images/landing/program-traveltech.png"
              :alt="$t('landing.programs.traveltech_title')"
              width="1116"
              height="468"
            />
            <span class="landing-programs__card-scrim" aria-hidden="true" />
          </div>
          <div class="landing-programs__card-body">
            <h3 class="landing-programs__card-title">
              {{ $t("landing.programs.traveltech_title") }}
            </h3>
            <p class="landing-programs__card-text">
              {{ $t("landing.programs.traveltech_text") }}
            </p>
          </div>
        </article>
      </div>

      <div v-reveal.stagger class="landing-programs__row">
        <article
          v-for="program in quarterPrograms"
          :key="program.key"
          class="landing-programs__card landing-programs__card--quarter"
          :class="`landing-programs__card--${program.tone}`"
        >
          <div class="landing-programs__card-media">
            <img
              class="landing-programs__card-image"
              :class="`landing-programs__card-image--${program.key}`"
              :src="`/assets/images/landing/program-${program.key}.png`"
              :alt="$t(`landing.programs.${program.key}_title`)"
              width="402"
              height="180"
            />
            <span class="landing-programs__card-scrim" aria-hidden="true" />
          </div>
          <div class="landing-programs__card-body">
            <h3 class="landing-programs__card-title">
              {{ $t(`landing.programs.${program.key}_title`) }}
            </h3>
            <p class="landing-programs__card-text">
              {{ $t(`landing.programs.${program.key}_text`) }}
            </p>
          </div>
        </article>
      </div>
    </div>

    <div v-reveal.zoom class="landing-programs__actions">
      <a class="landing-programs__cta" :href="registerHref">
        {{ $t("landing.programs.cta") }}
        <img
          class="landing-programs__cta-icon"
          src="/assets/icons/landing/arrow-left-white.svg"
          alt=""
          width="16"
          height="16"
          aria-hidden="true"
        />
      </a>
      <p class="landing-programs__trust">
        <img
          class="landing-programs__trust-icon"
          src="/assets/icons/landing/info.svg"
          alt=""
          width="14"
          height="14"
          aria-hidden="true"
        />
        <span class="landing-programs__trust-text">
          {{ $t("landing.programs.trust") }}
        </span>
      </p>
    </div>
  </section>
</template>

<script setup>
const { registerHref } = useLandingLinks();

// Card order and tones follow the Figma bento grid.
const stackedPrograms = [
  { key: "media", tone: "plain" },
  { key: "languages", tone: "sky" },
];

const quarterPrograms = [
  { key: "compliance", tone: "plain" },
  { key: "fintech", tone: "purple" },
  { key: "ai", tone: "plain" },
  { key: "data", tone: "sky" },
];
</script>
