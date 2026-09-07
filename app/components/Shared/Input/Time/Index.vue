<template>
  <div class="input-time-container">
    <v-label :for="name" v-if="label" class="mb-1 d-block">
      <strong class="font-weight-dark">
        {{ label }} <span v-if="required" class="text-error">*</span>
      </strong>
    </v-label>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      min-width="auto"
      scroll-strategy="close"
    >
      <template #activator="{ props: menuProps }">
        <v-text-field
          v-model="timeView"
          readonly
          v-bind="{ ...menuProps, ...$attrs }"
          :focused="menu"
          :active="menu"
          color="primary"
          class="custom-field"
          variant="outlined"
          density="compact"
          :error-messages="errorMessage || errorsResult?.[name]"
          :hint="hint"
          persistent-hint
        >
          <template #append-inner>
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
              class="primary--fill"
                d="M18.094 0c.48 0 .877.362.93.828l.007.11v.937h1.219a3.755 3.755 0 0 1 3.745 3.551l.005.199v5.344a.937.937 0 0 1-1.869.11l-.006-.11V5.625c0-.985-.763-1.794-1.729-1.87l-.146-.005h-1.219v.938a.937.937 0 0 1-1.868.109l-.007-.11V3.75h-4.265v.938a.937.937 0 0 1-1.87.109l-.005-.11V3.75h-4.22v.938a.937.937 0 0 1-1.868.109l-.006-.11V3.75H3.75c-.985 0-1.794.763-1.87 1.729l-.005.146V20.25c0 .985.763 1.794 1.729 1.87l.146.005h7.172a.937.937 0 0 1 .11 1.869l-.11.006H3.75a3.755 3.755 0 0 1-3.745-3.551L0 20.25V5.625A3.755 3.755 0 0 1 3.551 1.88l.199-.005h1.172V.938A.937.937 0 0 1 6.79.828l.006.11v.937h4.219V.938a.937.937 0 0 1 1.868-.11l.007.11v.937h4.265V.938c0-.518.42-.938.938-.938zm.234 12.656A5.678 5.678 0 0 1 24 18.328 5.678 5.678 0 0 1 18.328 24a5.678 5.678 0 0 1-5.672-5.672 5.678 5.678 0 0 1 5.672-5.672zm0 1.875a3.801 3.801 0 0 0-3.797 3.797 3.801 3.801 0 0 0 3.797 3.797 3.801 3.801 0 0 0 3.797-3.797 3.801 3.801 0 0 0-3.797-3.797zm0 .938c.48 0 .877.362.931.828l.007.11v.984h.422a.937.937 0 0 1 .109 1.868l-.11.007h-1.359a.938.938 0 0 1-.931-.829l-.006-.109v-1.922c0-.518.42-.937.937-.937zM5.86 17.063a.937.937 0 1 1 0 1.875.937.937 0 0 1 0-1.875zm4.079 0a.937.937 0 1 1 0 1.874.937.937 0 0 1 0-1.874zm0-4.079a.937.937 0 1 1 0 1.875.937.937 0 0 1 0-1.875zm-4.079 0a.937.937 0 1 1 0 1.875.937.937 0 0 1 0-1.875zm12.235-4.078a.938.938 0 1 1 0 1.875.938.938 0 0 1 0-1.875zm-4.078 0a.938.938 0 1 1 0 1.875.938.938 0 0 1 0-1.875zm-8.157 0a.938.938 0 1 1 0 1.875.938.938 0 0 1 0-1.875zm4.079 0a.937.937 0 1 1 0 1.875.937.937 0 0 1 0-1.875z"
                fill="currentColor" fill-rule="evenodd" />
            </svg>
          </template>
        </v-text-field>
      </template>

      <v-time-picker
        v-model="value"
        v-if="menu"
        :max="maxValue"
        :min="minValue"
        title=""
        full-width
        color="primary"
      >
        <template #actions>
          <v-spacer></v-spacer>
          <v-btn class="my-1" variant="text" color="primary" @click="menu = false">
            {{ $t("cancel") }}
          </v-btn>
          <v-btn
            class="my-1"
            variant="text"
            color="primary"
            @click="saveTime"
            :disabled="isTimeInvalid"
          >
            {{ $t("ok") }}
          </v-btn>
        </template>
      </v-time-picker>
    </v-menu>
  </div>
</template>

<script setup>
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { ref, watch, onUnmounted, computed } from "vue";
import { storeToRefs } from "pinia";

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
  defaultValue: {
    type: String,
    default: "",
  },
  minValue: {
    type: String,
    default: "",
  },
  maxValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["changed"]);

const { value, errorMessage, resetField } = useField(props.name, props.validation);
const errorsStore = useErrorsStore();
const { errorsResult } = storeToRefs(errorsStore);
const { resetErrors } = errorsStore;

const menu = ref(false);
const timeView = ref("");

const isTimeInvalid = computed(() => {
  if (!value.value) return false;
  if (props.minValue && value.value < props.minValue) return true;
  if (props.maxValue && value.value > props.maxValue) return true;
  return false;
});

const convertTimeToAmPm = (val) => {
  if (!val) {
    timeView.value = "";
    return;
  }
  
  let date;
  if (val.includes("T")) {
    date = new Date(val);
  } else {
    const timeParts = val.split(":");
    date = new Date(2000, 0, 1, timeParts[0], timeParts[1]);
  }

  if (isNaN(date.getTime())) {
    timeView.value = val;
    return;
  }

  timeView.value = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const saveTime = () => {
  emit("changed", props.name, value.value);
  menu.value = false;
};

watch(
  () => value.value,
  (newVal) => {
    convertTimeToAmPm(newVal);
    if (props.form && props.form[props.name] !== newVal) {
      props.form[props.name] = newVal;
    }
  },
  { immediate: true }
);

watch(
  () => props.form?.[props.name],
  (newValue) => {
    if (newValue !== value.value) {
      resetField({
        value: newValue !== undefined ? newValue : props.defaultValue,
      });
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  resetErrors();
});
</script>
