<template>
  <div class="input-date-container">
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
          v-model="value"
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
            <svg
              width="26"
              height="24"
              viewBox="0 0 26 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="primary--fill"
                d="M20.948 1.848H20V.942c0-.517-.444-.937-.992-.937-.547 0-.99.42-.99.937v.906H8.292V.942c0-.517-.444-.937-.991-.937-.548 0-.992.42-.992.937v.906h-.946C2.66 1.848.462 3.927.462 6.482V19.36c0 2.555 2.199 4.634 4.902 4.634h15.584c2.702 0 4.9-2.079 4.9-4.634V6.481c0-2.554-2.198-4.633-4.9-4.633zM5.364 3.722h.946V5.55c0 .517.444.937.992.937.547 0 .99-.42.99-.937V3.722h9.726V5.55c0 .517.444.937.991.937.548 0 .992-.42.992-.937V3.722h.947c1.609 0 2.918 1.238 2.918 2.76v.895H2.445v-.895c0-1.522 1.31-2.76 2.919-2.76zM20.948 22.12H5.364c-1.61 0-2.92-1.237-2.92-2.759V9.251h21.422v10.11c0 1.522-1.309 2.76-2.918 2.76zm-11.68-9.183c0 .518-.444.937-.992.937H6.327c-.547 0-.991-.42-.991-.937 0-.517.444-.937.991-.937h1.95c.547 0 .99.42.99.937zm11.707 0c0 .518-.443.937-.99.937h-1.95c-.548 0-.991-.42-.991-.937 0-.517.443-.937.99-.937h1.95c.548 0 .991.42.991.937zm-5.86 0c0 .518-.443.937-.99.937h-1.95c-.547 0-.991-.42-.991-.937 0-.517.444-.937.991-.937h1.95c.547 0 .99.42.99.937zm-5.847 5.529c0 .517-.444.937-.992.937H6.327c-.547 0-.991-.42-.991-.937 0-.518.444-.937.991-.937h1.95c.547 0 .99.42.99.937zm11.707 0c0 .517-.443.937-.99.937h-1.95c-.548 0-.991-.42-.991-.937 0-.518.443-.937.99-.937h1.95c.548 0 .991.42.991.937zm-5.86 0c0 .517-.443.937-.99.937h-1.95c-.547 0-.991-.42-.991-.937 0-.518.444-.937.991-.937h1.95c.547 0 .99.42.99.937z"
                fill="#0F6FFD"
                fill-rule="evenodd"
              />
            </svg>
          </template>
        </v-text-field>
      </template>
      <v-locale-provider :locale="locale">
        <v-date-picker
          :key="locale"
          v-model="dateInput"
          :max="maxValue"
          :min="minValue"
          color="primary"
          hide-header
        >
          <template #actions>
            <v-spacer></v-spacer>
            <v-btn variant="text" color="primary" @click="cancelDate">
              {{ $t("cancel") }}
            </v-btn>
            <v-btn variant="text" color="primary" @click="saveDate">
              {{ $t("ok") }}
            </v-btn>
          </template>
        </v-date-picker>
      </v-locale-provider>
    </v-menu>
  </div>
</template>

<script setup>
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { ref, watch, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const props = defineProps({
  form: {
    type: Object,
    default: () => ({}),
  },
  label: {
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
  hint: {
    type: String,
    default: "",
  },
  defaultValue: {
    type: String,
    default: "",
  },
  name: {
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
});

const emit = defineEmits(["changed"]);

const { value, errorMessage } = useField(props.name, props.validation);
const errorsStore = useErrorsStore();
const { errorsResult } = storeToRefs(errorsStore);
const { resetErrors } = errorsStore;

const menu = ref(false);
const dateInput = ref(null);
const previousDate = ref(null);

// Format Date object to YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Initialize dateInput from value or defaultValue
const initDate = () => {
  const currentVal = value.value || props.defaultValue;
  if (currentVal) {
    dateInput.value = new Date(currentVal);
  } else {
    dateInput.value = new Date();
  }
};

const onMenuToggle = (isOpen) => {
  if (isOpen) {
    previousDate.value = value.value;
    initDate();
  }
};

watch(menu, (newVal) => onMenuToggle(newVal));

const cancelDate = () => {
  value.value = previousDate.value;
  menu.value = false;
};

const saveDate = () => {
  if (dateInput.value) {
    const formatted = formatDate(dateInput.value);
    value.value = formatted;
    emit("changed", props.name, formatted);
    if (errorsResult.value && errorsResult.value[props.name]) {
      errorsResult.value[props.name] = "";
    }
  }
  menu.value = false;
};

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
    // Detect ISO string and format it to YYYY-MM-DD
    const val = newValue || props.defaultValue;
    if (val && typeof val === "string" && val.includes("T")) {
      const date = new Date(val);
      if (!isNaN(date.getTime())) {
        const formatted = formatDate(date);
        if (value.value !== formatted) {
          value.value = formatted;
        }
        return;
      }
    }

    if (newValue !== value.value) {
      value.value = newValue || props.defaultValue || "";
    }
  },
  { immediate: true }
);

initDate();

onUnmounted(() => {
  resetErrors();
});
</script>
