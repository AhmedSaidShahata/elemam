<template>
  <div class="w-100">
    <v-label v-if="label" class="text-body-2 mb-1 d-block">
      <strong class="font-weight-dark"> {{ label }} </strong>
      <span v-if="required" class="text-error ms-1">*</span>
    </v-label>
    <p v-if="hint" class="my-0 pb-3">* {{ hint }}</p>

    <v-input
      :error-messages="errorMessage ? errorMessage : errorsResult && errorsResult[name]"
      persistent-hint
      hide-details="auto"
      density="compact"
      class="pa-0"
    >
      <v-btn-toggle
        v-model="value"
        class="btn-groups d-flex flex-wrap gap-2 overflow-visible w-100 h-auto"
        color="primary"
        v-bind="$attrs"
        :multiple="multiple"
        style="height: auto !important;"
      >
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          class="mx-1 no-transition-btn"
          rounded="lg"
          variant="outlined"
          :ripple="false"
          min-width="65px !important"
          :value="valueText ? item : item[itemValue]"
        >
          {{ valueText ? item : item[itemText] }}
        </v-btn>
      </v-btn-toggle>
    </v-input>
  </div>
</template>

<style scoped>
.no-transition-btn {
  transition: none !important;
}
.no-transition-btn::before,
.no-transition-btn::after,
.no-transition-btn .v-btn__overlay {
  transition: none !important;
}
</style>

<script setup>
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { watch, onUnmounted } from "vue";
import { storeToRefs } from "pinia";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  itemValue: {
    type: String,
    default: "id",
  },
  itemText: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  form: {
    type: Object,
    default: () => ({}),
  },
  hint: {
    type: String,
    default: "",
  },
  multiple: {
    type: [Boolean, Number],
    default: true,
  },
  valueText: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  validation: {
    type: String,
    default: "",
  },
});

const { value, errorMessage, resetField } = useField(
  props.name,
  props.validation
);
const errorsStore = useErrorsStore();
const { errorsResult } = storeToRefs(errorsStore);
const { resetErrors } = errorsStore;

watch(
  () => value.value,
  (newValue) => {
    if (props.form && props.form[props.name] !== newValue) {
      props.form[props.name] = newValue;
    }
    if (errorsResult.value && errorsResult.value[props.name]) {
      errorsResult.value[props.name] = "";
    }
  }
);

watch(
  () => props.form?.[props.name],
  (newValue) => {
    if (newValue !== value.value) {
      value.value = newValue;
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  resetErrors();
});
</script>
