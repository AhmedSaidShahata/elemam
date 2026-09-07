<template>
  <v-snackbar style="z-index: 2000000000000 !important;" location="top" v-model="notify.visible" :timeout="notify.timeout" :color="notify.color">
    <p class="snack text-center">
      {{ notify.text }}
    </p>
    <!-- <template v-slot:actions>
      <v-btn color="white" variant="text" @click="notify.visible = false">
     {{ $t('close') }}
      </v-btn>
    </template> -->
  </v-snackbar>
</template>

<script setup>
import { useNotificationStore } from "@/stores/notification"
const { notify } = useNotificationStore()
</script>
