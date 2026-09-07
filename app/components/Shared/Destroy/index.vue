<template>
  <v-dialog max-width="500" style="z-index: 999999999 !important;">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" color="surface-variant" text="Open Dialog" variant="flat"></v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card title="Dialog">
        <v-card-text>
          Are You Sure to Delete
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
          <v-btn :loading="loading" color="danger" variant="text" @click="deleteItem">{{ $t('ok') }}</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup>
import {  defineEmits } from 'vue';
import useApi from "@/use/api";
import accessEmitter from '@/utils/bus'
const emitter = accessEmitter();

const { remove, loading } = useApi();
const props = defineProps({
  dialogDelete: Boolean,
  url: String,
  id: [String, Number],
});

const emit = defineEmits(['destroyItem']);

const deleteItem = async () => {
  await remove(`api/admin/${props.url}/${props.id}`);
  emitter.emit("reload-data");
};
</script>
