<template>
  <v-expansion-panels class="accordion" rounded="xl" variant="accordion" flat>
    <v-expansion-panel rounded="xl" v-for="item in items" :key="item.id">
      <v-expansion-panel-title>
        {{ item.question }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>{{ item.answer }} </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="js">
const props= defineProps(['items'])
</script>
