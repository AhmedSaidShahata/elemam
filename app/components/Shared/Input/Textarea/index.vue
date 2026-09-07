<template>
  <div class="w-100">
    <v-label class="text-body-2 mb-1 d-block">
      {{ label }} <span v-if="required" class="text-error">*</span>
    </v-label>
    <v-textarea
    variant="outlined"
    :type="type"
    v-model="value"
    @keyup="errorsResult[name] = ''"
    class="textarea"
    v-bind="$attrs"
    :prepend-icon="icon"
    color="primary"
    rows="4"
    no-resize
    persistent-hint
    :hint="computedHint"
    :error-messages="errorMessage ? errorMessage : errorsResult && errorsResult[name]"
  >
    <template #prepend-inner v-if="imageName">
      <Image width="19px" :name="imageName"></Image>
    </template>
  </v-textarea>
  </div>
</template>
<script setup>
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { watch, onUnmounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const props = defineProps(["form", "type", "name", "label","imageName", "validation", "icon", "hint", "required"]);
const { value, errorMessage, resetField } = useField(props.name, props.validation, {
  label: props.label,
});

const { t, te } = useI18n();

const computedHint = computed(() => {
  if (!props.hint) return '';
  return te(props.hint) ? t(props.hint) : (props.hint.startsWith('hint_') ? '' : props.hint);
});
const errorsStore = useErrorsStore();
const { errorsResult } = storeToRefs(errorsStore);
const { resetErrors } = errorsStore;

watch(
  () => value.value,
  (newValue) => {
      props.form[props.name] = newValue;
  }
);

watch(
  () => props.form[props.name],
  (newValue) => {
    if (newValue) {
      resetField({
        value: props.form[props.name],
      });
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  resetErrors();
});
</script>
