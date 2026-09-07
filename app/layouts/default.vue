<template>
  <v-app>
    <v-main class="pt-0">
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>

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
