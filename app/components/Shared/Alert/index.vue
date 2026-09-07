<template>
  <v-alert
    variant="tonal"
    type="error"
    :closable="true"
    color="error lighten-12 mb-3 py-2"
    dark
  >
    <p>
      {{ title }}
    </p>
  </v-alert>
</template>

<script setup>
defineProps(["title"]);
</script>
