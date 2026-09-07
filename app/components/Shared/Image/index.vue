<template>
  <img  v-bind="$attrs" :src="url ? url : `/assets/images/${name}`" />
</template>
<script lang="js" setup>
defineProps(['name','url']);
</script>
