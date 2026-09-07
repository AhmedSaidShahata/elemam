<template>
  <div class="w-100">
    <v-label class="text-body-2 mb-1 d-block font-weight-bold">
      {{ label }} <span v-if="required" class="text-error">*</span>
    </v-label>
    <v-select
      variant="outlined"
      density="compact"
      autocomplete="off"
      :items="itemsList"
      :item-title="effectiveItemTitle"
      :item-value="effectiveItemValue"
      :no-data-text="$t('no_items')"
      v-model="value"
      :prepend-icon="icon"
      :multiple="multiple"
      @click="errorsResult[name] = ''"
      @keyup="errorsResult[name] = ''"
      v-bind="$attrs"
      :menu-props="{ scrollStrategy: 'close', ...menuProps }"
      color="primary"
      :return-object="false"
      :hint="hint"
      :chips="chips"
      persistent-hint
      :auto-select-first="false"
      class="locale-selector-input"
      :error-messages="errorMessage ? errorMessage : errorsResult && errorsResult[name]"
    >
    <template #prepend-inner v-if="imageName">
      <SharedImage width="19px" :name="imageName"></SharedImage>
    </template>
  </v-select>
  </div>
</template>
 
<script setup>
import { computed, watch, onUnmounted, onMounted, ref } from 'vue'
import { useErrorsStore } from '@/stores/errors'
import { useField } from 'vee-validate'
import { storeToRefs } from 'pinia'
 
const props = defineProps([
  'form',
  'name',
  'chips',
  'label',
  'multiple',
  'validation',
  'icon',
  'itemTitle',
  'itemValue',
  'items',
  'imageName',
  'hint',
  'required',
  'menuProps'
])
const { value, errorMessage, resetField, validate } = useField(props.name, props.validation)
const errorsStore = useErrorsStore()
const { errorsResult } = storeToRefs(errorsStore)
const { resetErrors } = errorsStore
 
const itemsList = computed(() =>
  Array.isArray(props.items) ? props.items : props.items?.value || []
)
 
const effectiveItemTitle = computed(() => props.itemTitle || 'name')
const effectiveItemValue = computed(() => props.itemValue || 'id')
 
onUnmounted(() => {
  resetErrors()
})
 
// Sync Vue model with form
watch(
  () => value.value,
  (newValue) => {
    if (props.multiple && Array.isArray(newValue)) {
      props.form[props.name] = newValue
    } else if (newValue && typeof newValue === 'object' && newValue.id !== undefined) {
      props.form[props.name] = newValue.id
    } else {
      props.form[props.name] = newValue
    }
  }
)
 
watch(
  () => props.form[props.name],
  (newValue) => {
    if (newValue !== value.value) {
      resetField({
        value: newValue !== undefined ? newValue : props.multiple ? [] : '',
      })
    }
  },
  { immediate: true }
)
</script>
 
<style scoped>
.locale-selector-input {
  position: relative;
}
 
:deep(.v-list-item--highlighted::before),
:deep(.v-list-item--highlighted > .v-list-item__overlay) {
  opacity: 0 !important;
}
</style>