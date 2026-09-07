<template>
  
  <div class="text-center" v-if="config.total_pages > 1">
    <v-pagination
      @click="$emit('change', config.current_page)"
      v-model="config.current_page"
      :length="Math.ceil(config.total / config.per_page)"
      rounded="circle"
    />
  </div>
</template>

<script>
export default {
  props: ["config"],
  data() {
    return {
      current_page: 1,
    };
  },
};
</script>
