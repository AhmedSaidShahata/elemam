<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="auto"
    scroll-strategy="close"
  >
    <template #activator="{ props: menuProps }">
      <div class="w-100">
        <v-label v-if="showLabel" :for="name" class="mb-1 d-block">
          <strong class="font-weight-dark"> {{ $t(name) }}</strong>
        </v-label>
        <v-text-field
          v-model="form[name]"
          readonly
          v-bind="{ ...menuProps, ...$attrs }"
          :focused="menu"
          :active="menu"
          color="primary"
          class="input-date size-12"
          variant="outlined"
          :label="$t(label)"
          :hint="$t(hint)"
          persistent-hint
          hide-details="auto"
          density="compact"
        >
          <template #append-inner>
            <svg
              class="date-icon"
              width="20"
              height="20"
              viewBox="0 0 26 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="date-icon"
                d="M20.948 1.848H20V.942c0-.517-.444-.937-.992-.937-.547 0-.99.42-.99.937v.906H8.292V.942c0-.517-.444-.937-.991-.937-.548 0-.992.42-.992.937v.906h-.946C2.66 1.848.462 3.927.462 6.482V19.36c0 2.555 2.199 4.634 4.902 4.634h15.584c2.702 0 4.9-2.079 4.9-4.634V6.481c0-2.554-2.198-4.633-4.9-4.633zM5.364 3.722h.946V5.55c0 .517.444.937.992.937.547 0 .99-.42.99-.937V3.722h9.726V5.55c0 .517.444.937.991.937.548 0 .992-.42.992-.937V3.722h.947c1.609 0 2.918 1.238 2.918 2.76v.895H2.445v-.895c0-1.522 1.31-2.76 2.919-2.76zM20.948 22.12H5.364c-1.61 0-2.92-1.237-2.92-2.759V9.251h21.422v10.11c0 1.522-1.309 2.76-2.918 2.76zm-11.68-9.183c0 .518-.444.937-.992.937H6.327c-.547 0-.991-.42-.991-.937 0-.517.444-.937.991-.937h1.95c.547 0 .99.42.99.937zm11.707 0c0 .518-.443.937-.99.937h-1.95c-.548 0-.991-.42-.991-.937 0-.517.443-.937.99-.937h1.95c.548 0 .991.42.991.937zm-5.86 0c0 .518-.443.937-.99.937h-1.95c-.547 0-.991-.42-.991-.937 0-.517.444-.937.991-.937h1.95c.547 0 .99.42.99.937zm-5.847 5.529c0 .517-.444.937-.992.937H6.327c-.547 0-.991-.42-.991-.937 0-.518.444-.937.991-.937h1.95c.547 0 .99.42.99.937zm11.707 0c0 .517-.443.937-.99.937h-1.95c-.548 0-.991-.42-.991-.937 0-.518.443-.937.99-.937h1.95c.548 0 .991.42.991.937zm-5.86 0c0 .517-.443.937-.99.937h-1.95c-.547 0-.991-.42-.991-.937 0-.518.444-.937.991-.937h1.95c.547 0 .99.42.99.937z"
                fill="#0F6FFD"
                fill-rule="evenodd"
              />
            </svg>
          </template>
        </v-text-field>
      </div>
    </template>
    <v-date-picker
      v-model="dateInput"
      @update:model-value="onDateSelect"
      color="primary"
      hide-header
      :min="min"
      :max="max"
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
  </v-menu>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  form: {
    type: Object,
    default: () => ({}),
  },
  name: {
    type: String,
    default: "",
  },
  hint: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  min: {
    type: String,
    default: undefined,
  },
  max: {
    type: String,
    default: undefined,
  },
});

const menu = ref(false);
const dateInput = ref(null);
const isInitializing = ref(false);
const oldValue = ref("");

// Format Date object to YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const initDate = () => {
  isInitializing.value = true;
  const currentVal = props.form[props.name];
  oldValue.value = currentVal || "";
  
  if (currentVal) {
    dateInput.value = new Date(currentVal);
  } else {
    dateInput.value = new Date();
  }
  
  // Use a short timeout to ensure the v-date-picker internal update has finished
  setTimeout(() => {
    isInitializing.value = false;
  }, 200);
};

watch(menu, (newVal) => {
  if (newVal) initDate();
});

const onDateSelect = (val) => {
  if (isInitializing.value) return;
  if (dateInput.value) {
    props.form[props.name] = formatDate(dateInput.value);
  }
};

const cancelDate = () => {
  props.form[props.name] = oldValue.value;
  menu.value = false;
};

const saveDate = () => {
  if (dateInput.value) {
    props.form[props.name] = formatDate(dateInput.value);
  }
  menu.value = false;
};
</script>
