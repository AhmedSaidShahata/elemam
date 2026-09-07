<template>
  <LazySharedRoute :to="`/category/${item.id}`">
    <div class="card-category d-flex flex-column align-center" v-if="item">
      <div class="card-category__image bg-lighten-grey">
        <SharedImage :url="item.image" :alt="item.title" />
      </div>
      <h4 class="mt-2 font-weight-medium text-black text-center">
        {{ $textTruncate(item.title) }}
      </h4>
    </div>
  </LazySharedRoute>
</template>

<script setup lang="js">
defineProps(['item']);

</script>
