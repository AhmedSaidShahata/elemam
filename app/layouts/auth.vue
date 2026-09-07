<template>
  <main>
    <v-app v-show="!loading">
      <ClientOnly>
        <SharedLayoutHeaderDefault :showLayoutInfo="false" v-if="$vuetify?.display?.lgAndUp" />
        <SharedLayoutDefaultDrawer v-else />
      </ClientOnly>
      <slot />
    </v-app>
  </main>
</template>

<script lang="js" setup>
const loading = ref(true);
onMounted(() => {
  loading.value = false;
});
</script>
