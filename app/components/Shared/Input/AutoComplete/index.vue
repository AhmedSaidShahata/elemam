<template>
  <div class="w-100">
    <v-label class="text-body-2 mb-1 d-block">
      {{ label }} <span v-if="required" class="text-error">*</span>
    </v-label>
  <v-autocomplete
    variant="outlined"
    density="compact"
    :no-data-text="$t('no_items')"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    @click="errorsResult[name] = ''"
    v-model="value"
    @keyup="errorsResult[name] = ''"
    v-bind="$attrs"
    :menu-props="{ scrollStrategy: 'close' }"
    color="primary"
    persistent-hint
    :error-messages="errorMessage ? errorMessage : errorsResult && errorsResult[name]"
    class="locale-selector-input"
    >
  </v-autocomplete>
  </div>
</template>
<script setup>
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { computed, watch, onUnmounted, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
const props = defineProps([
  "form",
  "name",
  "label",
  "multiple",
  "validation",
  "icon",
  "itemTitle",
  "itemValue",
  "items",
  "imageName",
  "nullable",
  "required"
]);
const { value, errorMessage, resetField } = useField(props.name, props.validation);

const errorsStore = useErrorsStore();
const { errorsResult } = storeToRefs(errorsStore);
const { resetErrors } = errorsStore;


watch(
  () => value.value,
  (newValue) => {
    if (newValue) {
      props.form[props.name] = newValue;
    }
  }
);

watch(
  () => props.form[props.name],
  (newValue) => {
   if (props.nullable) {
      resetField({
        value: newValue,
      });
    } else if (newValue) {
      resetField({
        value: props.form[props.name],
      });
    }
  },
  { immediate: true }
);


onUnmounted(() => {
  resetErrors()
})
</script>
