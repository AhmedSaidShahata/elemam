<template>
  <NuxtLink v-bind="$attrs" :to="localePath(to)">
    <slot />
  </NuxtLink>

</template>

<script setup>
import { useLocalePath } from '#imports'
const localePath = useLocalePath()
const props = defineProps(['to']);

</script>
