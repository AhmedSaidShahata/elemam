<template>
  <div class="landing-section-header" :class="modifiers">
    <p class="landing-section-header__eyebrow">{{ eyebrow }}</p>
    <h2 class="landing-section-header__title">{{ title }}</h2>
    <span class="landing-section-header__accent" aria-hidden="true" />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["eyebrow", "title", "align", "variant"]);

const modifiers = computed(() => [
  `landing-section-header--${props.align || "center"}`,
  props.variant && props.variant !== "default"
    ? `landing-section-header--${props.variant}`
    : null,
]);
</script>
