<template>
  <v-progress-linear
    class="custom-progress"
    color="#F1B04F"
    :model-value="progress"
    v-bind="$attrs"
    height="8"
    rounded="sm"
    bg-color="#DDDCDE"
  ></v-progress-linear>
</template>

<script setup>
const props = defineProps(["progress"]);
</script>