<template>
  <v-toolbar flat color="#200462" height="32" class="px-0 justify-center">
    <p>{{ $t("header.top-text") }}</p>
    <v-spacer></v-spacer>
    <v-list flat class=" d-flex justify-space-around">
      <v-list-item v-for="(item, index) in items" :key="index" class="px-0 text-center" dense>
        <v-btn exact-active-class="'v-btn--active'" exact text class="text-capitalize px-0 mx-3 font-weight-bold"
          :to="localePath(item.to)">
          <span>{{ item.title }}</span>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-toolbar>
</template>

<script setup>
const localePath = useLocalePath();
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>