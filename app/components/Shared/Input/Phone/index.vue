<template>
  <div class="w-100">
    <v-label class="text-body-2 mb-1 d-block font-weight-bold">{{ label }}</v-label>
    <v-row no-gutters>
      <v-col>
        <v-text-field variant="outlined" density="compact" persistent-hint :hint="hint"
          @keyup="errorsResult[name] = ''" :type="type" :prepend-icon="icon" color="primary"
          :error-messages="errorMessage ? errorMessage : errorsResult && errorsResult[name]" 
          v-model="value"
          :disabled="disabled" class="phone">
          <template #prepend-inner v-if="imageName">
            <SharedImage width="19" :name="imageName"></SharedImage>
          </template>
        </v-text-field>
      </v-col>
      <v-col style="max-width: 105px !important; min-width: 70px" class="ms-n4">
        <v-autocomplete :disabled="disabled" variant="plain" density="compact" :no-data-text="$t('no_items')"
          :items="allCountries" :item-title="item => `${item.name} (${item.phone_code})`" item-value="phone_code"
          class="country" v-model="form.country_code"
          :menu-icon="false" :menu-props="{ scrollStrategy: 'close', ...menuProps }">
          <template v-slot:chip="{ item }">
            <div class="d-flex align-center ms-3 text-black font-weight-medium">
              <span class="code">
                {{ formattedPhoneCode(item?.phone_code) }}
              </span>
              <span class="font-flag ms-1">{{ item?.flag }}</span>
            </div>
          </template>
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props">
              <template #title>
                <div class="d-flex align-center justify-space-between w-100">
                  <div class="d-flex align-center">
                    <span class="me-2 font-flag">{{ item?.flag }}</span>
                    <span style="direction: ltr">{{ `+${item?.phone_code?.startsWith('00') ? item?.phone_code?.slice(2)
                      : item?.phone_code || ''}` }}</span>
                  </div>
                </div>
              </template>
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useErrorsStore } from '@/stores/errors';
import { useCountriesStore } from '@/stores/countries';
import { useI18n } from 'vue-i18n';
import { watch, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useField } from "vee-validate";
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);


const { locale } = useI18n();
const props = defineProps({
  form: Object,
  name: String,
  label: String,
  validation: [String, Object],
  icon: String,
  imageName: String,
  hint: String,
  disabled: Boolean,
  type: {
    type: String,
    default: 'text'
  },
  menuProps: {
    type: Object,
    default: () => ({})
  }
});

const errorsStore = useErrorsStore();
const { errorsResult } = storeToRefs(errorsStore);
const { resetErrors } = errorsStore;

const countriesStore = useCountriesStore();
const { allCountries } = storeToRefs(countriesStore);

const { value, errorMessage, resetField } = useField(props.name, props.validation);

const formattedPhoneCode = (phoneCode) => {
  if (!phoneCode) return '';
  const trimmedCode = phoneCode.startsWith('00') ? phoneCode.slice(2) : phoneCode;
  return locale.value == 'ar' ? `(+${trimmedCode})` : `(+${trimmedCode})`;
};

watch(
  () => value.value,
  (newValue) => {
    if (props.form && props.form[props.name] !== newValue) {
      props.form[props.name] = newValue;
    }
    if(user.value?.phone){
      props.form.country_code = user.value?.phone.country_code;
      props.form.phone = user.value?.phone.number;
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

onMounted(async () => {
  await useCountriesStore().getCountries();
  if (!props.form.country_code) {
    props.form.country_code = "966";
  }
});

onUnmounted(() => {
  resetErrors();
});
</script>