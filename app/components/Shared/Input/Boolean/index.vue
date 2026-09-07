<template>
  <div class="w-100">
    <v-label v-if="label" class="text-body-2 mb-1 d-block">
      {{ label }} <span v-if="required" class="text-error">*</span>
    </v-label>

    <v-input
      :error-messages="errorMessage ? errorMessage : errorsResult && errorsResult[name]"
      :hint="hint"
      persistent-hint
      hide-details="auto"
      class="pa-0"
    >
      <v-btn
        variant="flat"
        rounded="xl"
        class="pa-0 d-flex btn-input w-100 overflow-hidden"
        density="compact"
        :width="width"
        :class="btnClasses"
        :style="btnStyle"
        @click="toggle"
      >
        <div
          class="d-flex justify-space-between align-center wrapper pa-2 w-100"
        >
          <p class="question-text px-2 py-2 mb-0 text-wrap text-start">
            {{ text }}
          </p>
          <span class="mx-2 d-flex align-center">
            <i :class="iconClass"></i>
          </span>
        </div>
      </v-btn>
    </v-input>
  </div>
</template>

<script setup>
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { computed, watch, onUnmounted } from "vue";
import { storeToRefs } from "pinia";

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  defaultValue: {
    type: [Boolean, String, Number],
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  hint: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  form: {
    type: Object,
    default: () => ({}),
  },
  width: {
    type: String,
    default: "100%",
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

const emit = defineEmits(["changed"]);

const { value, errorMessage, resetField } = useField(
  props.name,
  props.validation
);
const errorsStore = useErrorsStore();
const { errorsResult } = storeToRefs(errorsStore);
const { resetErrors } = errorsStore;

// Initialize value from defaultValue if provided
if (value.value === undefined && props.defaultValue !== undefined) {
  value.value = !!props.defaultValue;
}

const toggle = () => {
  value.value = !value.value;
  emit("changed", props.name, value.value);
  if (errorsResult.value && errorsResult.value[props.name]) {
    errorsResult.value[props.name] = "";
  }
};

const btnClasses = computed(() => {
  return value.value ? "bg-primary text-white" : "bg-white text-black";
});

const btnStyle = computed(() => ({
  border: value.value ? "" : "1px solid #333 !important",
  height: "auto",
  minHeight: "48px",
}));

const iconClass = computed(() => {
  return value.value
    ? "fa-regular fa-square-check fa-lg"
    : "far fa-square fa-lg";
});

watch(
  () => value.value,
  (newValue) => {
    if (props.form && props.form[props.name] !== newValue) {
      props.form[props.name] = newValue;
    }
  }
);

watch(
  () => props.form?.[props.name],
  (newValue) => {
    if (newValue !== value.value) {
      value.value = !!newValue;
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  resetErrors();
});
</script>
