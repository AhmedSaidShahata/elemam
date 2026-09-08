<template>
  <v-app>
    <LandingLoader />
    <v-main class="pt-0">
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>

useHead({
  script: [
    {
      innerHTML: "document.documentElement.classList.add('js-reveal')",
      tagPosition: "head",
    },
  ],
});
</script>
