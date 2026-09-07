<template>
  <div class="w-100">
    <v-label class="text-body-2 mb-1 d-block font-weight-bold">
      {{ label }} <span v-if="required" class="text-error">*</span>
    </v-label>
    <v-text-field autocomplete="off" variant="outlined" density="compact" :type="type" v-model="value"
      @keyup="errorsResult[name] = ''" v-bind="$attrs" :prepend-icon="icon" color="primary" persistent-hint :hint="computedHint"
      :error-messages="errorMessage ? errorMessage : errorsResult && errorsResult[name]">
      <template #prepend-inner v-if="imageName">
        <SharedImage width="19px" :name="imageName" :class="customIconClass"></SharedImage>
      </template>
    </v-text-field>
  </div>
</template>

<script setup>
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { watch, onUnmounted, computed } from "vue";
import { storeToRefs } from 'pinia'
import { useI18n } from "vue-i18n";

const props = defineProps(["form", "type", "name", "label", "imageName", "validation", "icon", "hint", "customIconClass", "required"]);
const { value, errorMessage, resetField } = useField(props.name, props.validation);
const errorsStore = useErrorsStore();
const { errorsResult } = storeToRefs(errorsStore);
const { resetErrors } = errorsStore;

const { t, te } = useI18n();

const computedHint = computed(() => {
  if (!props.hint) return '';
  return te(props.hint) ? t(props.hint) : (props.hint.startsWith('hint_') ? '' : props.hint);
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
