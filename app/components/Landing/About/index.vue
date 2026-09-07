<template>
  <section id="about" class="landing-about">
    <div class="landing-about__header">
      <LandingSectionHeader
        :eyebrow="$t('landing.about.eyebrow')"
        :title="$t('landing.about.title')"
      />

      <div class="landing-about__partners">
        <div class="landing-about__partner">
          <div class="landing-about__partner-text">
            <p class="landing-about__partner-name">
              {{ $t("landing.about.partner_university") }}
            </p>
            <p class="landing-about__partner-role">
              {{ $t("landing.about.partner_university_role") }}
            </p>
          </div>
          <span class="landing-about__partner-icon-box">
            <img
              class="landing-about__partner-icon"
              src="/assets/icons/landing/university.svg"
              alt=""
              width="24"
              height="24"
              aria-hidden="true"
            />
          </span>
        </div>

        <div class="landing-about__connector" aria-hidden="true">
          <img
            class="landing-about__connector-line"
            src="/assets/icons/landing/connector-line.png"
            alt=""
            width="32"
            height="2"
          />
          <span class="landing-about__connector-badge">
            <img
              class="landing-about__connector-icon"
              src="/assets/icons/landing/handshake.svg"
              alt=""
              width="12"
              height="12"
            />
          </span>
          <img
            class="landing-about__connector-line"
            src="/assets/icons/landing/connector-line.png"
            alt=""
            width="32"
            height="2"
          />
        </div>

        <div class="landing-about__partner">
          <div class="landing-about__partner-text">
            <p class="landing-about__partner-name">
              {{ $t("landing.about.partner_otas") }}
            </p>
            <p class="landing-about__partner-role">
              {{ $t("landing.about.partner_otas_role") }}
            </p>
          </div>
          <span class="landing-about__partner-icon-box">
            <img
              class="landing-about__partner-icon"
              src="/assets/icons/landing/app-window.svg"
              alt=""
              width="24"
              height="24"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </div>

    <div class="landing-about__grid">
      <div class="landing-about__content">
        <p class="landing-about__intro">{{ $t("landing.about.intro") }}</p>

        <ul class="landing-about__bullets">
          <li
            v-for="index in goalsCount"
            :key="index"
            class="landing-about__bullet"
          >
            <span class="landing-about__bullet-marker" aria-hidden="true">
              <img
                class="landing-about__bullet-icon"
                src="/assets/icons/landing/check.svg"
                alt=""
                width="12"
                height="12"
              />
            </span>
            <p class="landing-about__bullet-text">
              {{ $t(`landing.about.goal_${index}`) }}
            </p>
          </li>
        </ul>
      </div>

      <div class="landing-about__cards">
        <div class="landing-about__note landing-about__note--financial">
          <div class="landing-about__note-head">
            <span class="landing-about__note-icon-box">
              <img
                class="landing-about__note-icon"
                src="/assets/icons/landing/file-text.svg"
                alt=""
                width="16"
                height="16"
                aria-hidden="true"
              />
            </span>
            <p class="landing-about__note-title">
              {{ $t("landing.about.note_financial_title") }}
            </p>
          </div>
          <img
            class="landing-about__note-divider"
            src="/assets/icons/landing/note-divider-light.svg"
            alt=""
            aria-hidden="true"
          />
          <p class="landing-about__note-body">
            {{ $t("landing.about.note_financial_body") }}
          </p>
        </div>

        <div class="landing-about__note landing-about__note--privacy">
          <div class="landing-about__note-head">
            <span class="landing-about__note-icon-box">
              <img
                class="landing-about__note-icon"
                src="/assets/icons/landing/shield-check.svg"
                alt=""
                width="16"
                height="16"
                aria-hidden="true"
              />
            </span>
            <p class="landing-about__note-title">
              {{ $t("landing.about.note_privacy_title") }}
            </p>
          </div>
          <img
            class="landing-about__note-divider"
            src="/assets/icons/landing/note-divider-dark.svg"
            alt=""
            aria-hidden="true"
          />
          <p class="landing-about__note-body">
            {{ $t("landing.about.note_privacy_body") }}
          </p>
        </div>
      </div>
    </div>

    <div class="landing-about__duration">
      <img
        class="landing-about__duration-icon"
        src="/assets/icons/landing/calendar.svg"
        alt=""
        width="16"
        height="16"
        aria-hidden="true"
      />
      <p class="landing-about__duration-text">
        {{ $t("landing.about.duration") }}
      </p>
    </div>
  </section>
</template>

<script setup>
const goalsCount = 5;
</script>
