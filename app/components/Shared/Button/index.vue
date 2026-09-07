<template>
  <v-btn v-bind="$attrs" variant="flat" :to="localePath(to)" :style="buttonStyle" class="button">
    <slot />
    <v-icon v-if="icon" :icon="icon" class="mx-2" :color="iconColor" />
    <v-img v-if="image" :src="image" class="mx-2" :width="imageWidth" :height="imageHeight" />
  </v-btn>
</template>

<script setup>
const localePath = useLocalePath();
const props = defineProps(["to", "radius", "icon", "image", "imageWidth", "imageHeight", "iconColor"]);

</script>
