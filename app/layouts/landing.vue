<template>
  <v-app>
    <v-main class="pt-0">
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
// Marks the document as reveal-capable before the first paint, so the
// server-rendered elements carrying `data-reveal` start hidden rather than
// appearing and then hiding themselves once the app hydrates. A visitor with
// JavaScript disabled never gets the class, and `_landing-motion.scss` only
// hides anything under `html.js-reveal` - so for them the page renders in full.
useHead({
  script: [
    {
      innerHTML: "document.documentElement.classList.add('js-reveal')",
      tagPosition: "head",
    },
  ],
});
</script>
