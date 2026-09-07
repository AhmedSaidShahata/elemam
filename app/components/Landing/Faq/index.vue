<template>
  <section id="faq" class="landing-faq">
    <LandingSectionHeader
      variant="compact"
      :eyebrow="$t('landing.faq.eyebrow')"
      :title="$t('landing.faq.title')"
    />

    <div v-reveal.stagger class="landing-faq__stack">
      <div
        v-for="index in questionsCount"
        :key="index"
        class="landing-faq__card"
        :class="{ 'landing-faq__card--open': openIndex === index }"
      >
        <button
          type="button"
          class="landing-faq__question"
          :aria-expanded="openIndex === index"
          :aria-controls="`faq-answer-${index}`"
          @click="toggle(index)"
        >
          <span class="landing-faq__trigger" aria-hidden="true">
            <img
              class="landing-faq__trigger-icon"
              :src="
                assetUrl(`assets/icons/landing/chevron-${openIndex === index ? 'up' : 'down'}.svg`)
              "
              alt=""
              width="16"
              height="16"
            />
          </span>
          <span class="landing-faq__question-text">
            {{ $t(`landing.faq.question_${index}`) }}
          </span>
        </button>

        <div
          :id="`faq-answer-${index}`"
          class="landing-faq__answer-wrap"
          :class="{ 'landing-faq__answer-wrap--open': openIndex === index }"
        >
          <div class="landing-faq__answer-clip">
            <div class="landing-faq__answer">
              <img
                class="landing-faq__answer-divider"
                src="/assets/icons/landing/faq-divider.svg"
                alt=""
                aria-hidden="true"
              />
              <p class="landing-faq__answer-text">
                {{ $t(`landing.faq.answer_${index}`) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const { assetUrl } = useLandingAsset();

const questionsCount = 4;

// The design ships the first card expanded and the rest collapsed.
const openIndex = ref(1);

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>
