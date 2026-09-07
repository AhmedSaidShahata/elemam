<template>
  <div class="w-100 counter-input-wrapper">
    <div v-bind="$attrs" class="counter-input counter-input__shadow w-100">
      <div class="d-flex align-center justify-space-between w-100 px-4 py-3" style="min-height: 56px; gap: 12px;">
        <v-label :for="name" class="opacity-100 ma-0" style="flex: 1; min-width: 0; white-space: normal;">
          <strong class="font-weight-dark counter-input__label text-black d-inline-block" style="line-height: 1.2;">
            {{ label }}
            <span v-if="required" class="text-error">*</span>
          </strong>
        </v-label>

        <div class="d-flex align-center flex-shrink-0">
          <v-btn
            icon="mdi-plus"
            size="x-small"
            width="32px"
            height="32px"
            class="custom-primary pa-0"
            @click.stop="increment"
            :loading="$attrs.loadingIncrement"
            :disabled="value >= max"
            flat
          ></v-btn>

          <span class="mx-4 font-weight-bold" style="min-width: 20px; text-align: center;">
            {{ value }}
          </span>

          <v-btn
            icon="mdi-minus"
            size="x-small"
            width="32px"
            height="32px"
            class="custom-secondary pa-0"
            @click.stop="decrement"
            :loading="$attrs.loadingDecrement"
            :disabled="value <= min"
            flat
          ></v-btn>
        </div>
      </div>
    </div>
    <div v-if="errorMessage || (errorsResult && errorsResult[name]) || hint" class="px-1 mt-1">
      <p v-if="errorMessage || (errorsResult && errorsResult[name])" class="text-error size-12 my-0">
        {{ errorMessage || (Array.isArray(errorsResult[name]) ? errorsResult[name][0] : errorsResult[name]) }}
      </p>
      <p v-else-if="hint" class="text-grey size-12 my-0">{{ hint }}</p>
    </div>
  </div>
</template>

<script setup>
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { watch, onUnmounted } from "vue";
import { storeToRefs } from "pinia";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  form: {
    type: Object,
    default: () => ({}),
  },
  label: {
    type: String,
    default: "",
  },
  step: {
    type: Number,
    default: 1,
  },
  name: {
    type: String,
    default: "",
  },
  defaultValue: {
    type: Number,
    default: 1,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100000,
  },
  required: {
    type: Boolean,
    default: false,
  },
  validation: {
    type: String,
    default: "",
  },
  hint: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["changed"]);

const { value, errorMessage } = useField(props.name, props.validation);
const errorsStore = useErrorsStore();
const { errorsResult } = storeToRefs(errorsStore);
const { resetErrors } = errorsStore;

// Initialize value from defaultValue if provided
if (value.value === undefined && props.defaultValue !== undefined) {
  value.value = props.defaultValue;
}

const decrement = () => {
  if (value.value > props.min) {
    value.value = Math.max(props.min, value.value - props.step);
    emit("changed", props.name, value.value);
  }
};

const increment = () => {
  if (value.value < props.max) {
    value.value = Math.min(props.max, value.value + props.step);
    emit("changed", props.name, value.value);
  }
};

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
      value.value = newValue !== undefined ? newValue : props.defaultValue;
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  resetErrors();
});
</script>

