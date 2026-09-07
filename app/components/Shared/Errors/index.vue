<template>
  <div v-if="errorsResult">
    <v-alert
      variant="tonal"
      type="error"
      :closable="true"
      v-for="(error, index) in errorsResult"
      :key="index"
      color="error lighten-12 mb-3 py-2"
      dark
    >
      <p v-if="error">
        {{ error[0] }}
      </p>
    </v-alert>
  </div>
</template>

<script setup>
import { useErrorsStore } from "@/stores/errors";
const { errorsResult } = useErrorsStore();
</script>
