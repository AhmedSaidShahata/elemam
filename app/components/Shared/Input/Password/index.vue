<template>
  <div class="w-100">
    <v-label class="text-body-2 mb-1 d-block font-weight-bold">{{ label }}</v-label>

    <v-text-field variant="outlined" density="compact" :hint="hint" persistent-hint :type="show ? 'text' : 'password'"
      :prepend-icon="icon" color="primary" v-model="value" @keyup="errorsResult[name] = ''" v-bind="$attrs"
      :error-messages="errorMessage ? errorMessage : errorsResult && errorsResult[name]"
      :autocomplete="isSignUp ? 'new-password' : 'current-password'" :readonly="isSignUp && isReadonly"
      @focus="isSignUp ? (isReadonly = false) : null" @keydown.space.prevent>
      <template #prepend-inner v-if="imageName">
        <SharedImage width="19px" :name="imageName" :class="customIconClass"></SharedImage>
      </template>
      <template #append-inner>
        <SharedImage :name="show ? 'auth/show-password-slash-icon.svg' : 'auth/show-password-icon.svg'" width="20"
          height="20" style="cursor: pointer;" @click="show = !show" />
      </template>
    </v-text-field>
  </div>
</template>

<script setup>
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { watch, ref, onUnmounted } from "vue";
import { storeToRefs } from 'pinia'

const props = defineProps({
  form: { type: Object, default: () => ({}) },
  name: { type: String, default: "" },
  label: { type: String, default: "" },
  imageName: { type: String, default: "" },
  validation: { type: [String, Object], default: "" },
  icon: { type: String, default: "" },
  hint: { type: String, default: "" },
  isSignUp: { type: Boolean, default: false }
});

const validationRules = computed(() => props.validation)
const { value, errorMessage, resetField } = useField(props.name, validationRules);
const errorsStore = useErrorsStore();
const { errorsResult } = storeToRefs(errorsStore);
const { resetErrors } = errorsStore;

const show = ref(false);
const isReadonly = ref(true);

watch(
  () => value.value,
  (newValue) => {
    const cleaned = newValue ? newValue.replace(/\s/g, "") : "";
    if (cleaned !== newValue) {
      value.value = cleaned;
    }
    if (props.form) {
      props.form[props.name] = cleaned;
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

onUnmounted(() => {
  resetErrors();
});
</script>
