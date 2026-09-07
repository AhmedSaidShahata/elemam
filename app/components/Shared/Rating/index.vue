<template>
  <v-rating
    class="rating"
    v-bind="$attrs"
    :model-value="value"
    color="#DDDCDE"
    active-color="#F1B04F"
    half-increments
    empty-icon="mdi-star"
    :size="size"
  ></v-rating>
</template>

<script>
export default {
  name: "Rating",
  props: {
    value: {
      default: 4,
    },
    size: {
      default: "24",
    },
  },
};
</script>


