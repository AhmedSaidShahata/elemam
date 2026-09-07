<template>
  <v-container class="scrollable--container my-16 pt-0 mt-0 mt-md-4">
    <h2 class="text-center font-weight-black font-din my-6  mt-8 d-md-none font-size-35 about-heading">{{ title }}</h2>
    <h2 class="text-center font-weight-black font-din mb-md-10 my-10 mt-md-n5 d-none d-md-block font-size-35">{{ title }}</h2>
    <div class="content-container rounded-xl mb-5">
      <div class="scrollable-content rounded-xl pe-10" v-html="content"></div>
    </div>
  </v-container>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "title",
  },
  content: {
    type: String,
    required: true,
    default: "<p>content</p>",
  },
});
</script>