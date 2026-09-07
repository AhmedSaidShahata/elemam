<template>
  <div class="input-number-container w-100">
    <v-label :for="name" v-if="label" class="mb-1 d-block">
      <strong class="font-weight-dark">
        {{ label }} <span v-if="required" class="text-error">*</span>
      </strong>
    </v-label>

    <v-text-field
      v-model="value"
      type="number"
      :autofocus="focus"
      autocomplete="off"
      variant="outlined"
      density="compact"
      color="primary"
      :id="`input_${Math.random()}`"
      :error-messages="errorMessage || errorsResult?.[name]"
      :hint="computedHint"
      persistent-hint
      @keypress="preventInvalidNumberChars"
      v-bind="$attrs"
      class="custom-field"
    >
    </v-text-field>
  </div>
</template>

<script setup>
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { watch, onUnmounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const { t, te } = useI18n();

const props = defineProps({
  form: {
    type: Object,
    default: () => ({}),
  },
  name: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  hint: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  validation: {
    type: String,
    default: "",
  },
  focus: {
    type: Boolean,
    default: false,
  },
});

const { value, errorMessage, resetField } = useField(props.name, props.validation);
const errorsStore = useErrorsStore();
const { errorsResult } = storeToRefs(errorsStore);
const { resetErrors } = errorsStore;

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
      resetField({
        value: newValue !== undefined ? newValue : "",
      });
    }
  },
  { immediate: true }
);

const computedHint = computed(() => {
  if (props.hint) {
    return te(props.hint) ? t(props.hint) : (props.hint.startsWith('hint_') ? '' : props.hint);
  }
  const defaultKey = `hint_${props.name}`;
  return te(defaultKey) ? t(defaultKey) : '';
});

const preventInvalidNumberChars = (event) => {
  if (['e', 'E', '-', '+'].includes(event.key)) {
    event.preventDefault();
  }
};

onUnmounted(() => {
  resetErrors();
});
</script>
