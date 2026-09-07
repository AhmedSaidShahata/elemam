<template>
  <section id="contact" class="landing-contact">
    <div class="landing-contact__bg" aria-hidden="true">
      <img
        class="landing-contact__bg-media"
        src="/assets/images/landing/contact-bg.png"
        alt=""
        width="1920"
        height="420"
      />
    </div>
    <div class="landing-contact__overlay" aria-hidden="true" />

    <LandingSectionHeader
      class="landing-contact__header"
      variant="inverse"
      :eyebrow="$t('landing.contact.eyebrow')"
      :title="$t('landing.contact.title')"
    />

    <p v-reveal class="landing-contact__lead">{{ $t("landing.contact.lead") }}</p>

    <div v-reveal.stagger class="landing-contact__row">
      <a class="landing-contact__card" :href="`tel:${phone}`">
        <span class="landing-contact__card-icon-box">
          <img
            class="landing-contact__card-icon"
            src="/assets/icons/landing/phone.svg"
            alt=""
            width="20"
            height="20"
            aria-hidden="true"
          />
        </span>
        <span class="landing-contact__card-text">
          <span class="landing-contact__card-label">
            {{ $t("landing.contact.phone_label") }}
          </span>
          <span class="landing-contact__card-value">{{ phone }}</span>
        </span>
      </a>

      <a class="landing-contact__card" :href="`mailto:${email}`">
        <span class="landing-contact__card-icon-box">
          <img
            class="landing-contact__card-icon"
            src="/assets/icons/landing/mail.svg"
            alt=""
            width="20"
            height="20"
            aria-hidden="true"
          />
        </span>
        <span class="landing-contact__card-text">
          <span class="landing-contact__card-label">
            {{ $t("landing.contact.email_label") }}
          </span>
          <span class="landing-contact__card-value">{{ email }}</span>
        </span>
      </a>
    </div>
  </section>
</template>

<script setup>
const phone = "0555373298";
const email = "Contact@otas.net";
</script>
