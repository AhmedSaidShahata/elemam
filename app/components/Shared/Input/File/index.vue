<template>
  <div class="upload-file-container">
    <v-label :for="name" v-if="label" class="mb-1 d-block">
      <strong class="font-weight-dark">
        {{ label }} <span v-if="required" class="text-error">*</span>
      </strong>
    </v-label>

    <v-file-input
      v-model="value"
      :accept="computedAccept"
      persistent-hint
      :hint="hint"
      :multiple="multiple"
      variant="outlined"
      density="compact"
      color="primary"
      :error-messages="validationError || errorMessage || errorsResult?.[name]"
      @update:model-value="onUpload"
      v-bind="$attrs"
      class="custom-field"
      prepend-icon=""
    >
      <template #append-inner>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24">
          <path class="primary--fill" d="M6.73 22.682A6.265 6.265 0 0 1 2.3 11.984l9.246-9.248a.818.818 0 1 1 1.157 1.156L3.455 13.14a4.632 4.632 0 1 0 6.55 6.546L21.95 7.74a2.998 2.998 0 0 0-4.24-4.239L8.08 13.14a1.362 1.362 0 0 0 1.926 1.927l6.163-6.164a.817.817 0 1 1 1.157 1.155l-6.164 6.165a2.997 2.997 0 0 1-4.24-4.238l9.634-9.627a4.632 4.632 0 0 1 6.55 6.55l-11.943 11.94a6.228 6.228 0 0 1-4.433 1.835z" fill="#0F6FFD" fill-rule="evenodd"/>
        </svg>
      </template>
    </v-file-input>

    <div class="d-flex mt-2">
      <!-- Example Image -->
      <div v-if="showExample && exampleImage?.path && !multiple" class="upload-file__example me-1 mt-1">
        <a :href="exampleImage.path" download target="_blank">
          <img class="upload-file__example rounded-lg" :src="exampleImage.path" style="max-width: 80px; height: 65px;">
        </a>
        <p class="upload-file__example__text text-center size-14 mt-1">{{ $t('example') }}</p>
      </div>

      <!-- Multiple files preview -->
      <div v-if="multiple" class="d-flex flex-wrap gap-4 w-100">
        <div v-if="!src && showExample && exampleImage?.path" class="upload-file__example me-2 mt-1">
        <a :href="exampleImage.path" download target="_blank">
          <img class="upload-file__example rounded-lg" :src="exampleImage.path" style="max-width: 80px; height: 65px;">
        </a>
        <p class="upload-file__example__text text-center size-14 mt-1">{{ $t('example') }}</p>
      </div>
        <div
          v-for="(file, index) in files"
          :key="index"
          class="position-relative preview-item me-2 mt-1"
          style="min-width: 80px;"
        >
          <v-btn
            icon
            size="x-small"
            color="error"
            class="position-absolute remove-btn"
            style="top: 0px; left: 0px; width: 22px; height: 22px; z-index: 2;"
            @click="remove(index)"
          >
            <img src="/assets/images/icons/remove-img.svg" alt="trash" width="12" style="border-radius: 8px !important;"/>
          </v-btn>

          <!-- Previews -->
          <div class="upload-file__images text-center">
            <template v-if="file.type?.includes('image')">
              <img class="rounded-lg mb-1" :src="file.path" alt="image" style="width: 80px; height:65px; object-fit: cover;">
            </template>
            <template v-else-if="file.type?.includes('pdf')">
              <img class="mb-1" src="/assets/images/pdf-file.svg" alt="pdf" style="width: 80px; height:65px;">
            </template>
            <template v-else>
              <img class="mb-1" src="/assets/images/false.svg" alt="file" style="width: 80px; height:65px;">
            </template>
            
            <p class="size-10 my-0 text-truncate px-1" style="max-width: 80px;" :title="file.name">{{ truncate(file.name, 10) }}</p>
            <p class="size-8 my-0">{{ getSize(file.size) }} {{ $t('kb') }}</p>
          </div>
        </div>
      </div>

      <!-- Single file preview -->
      <div v-if="src && !multiple" :class="{ 'ms-3': showExample && exampleImage?.path }" class="position-relative preview-item upload-file__example me-1 mt-1" style="width: 80px; min-width: 80px;">
        <v-btn
          icon
          size="x-small"
          color="error"
          class="position-absolute remove-btn"
          style="top: 0px; left: 0px; width: 22px; height: 22px; z-index: 2;"
          @click="remove(0)"
        >
          <img src="/assets/images/icons/remove-img.svg" alt="trash" width="12" style="border-radius: 8px !important;"/>
        </v-btn>
        <img class="rounded-lg" :src="src" alt="preview" style="width: 80px; height: 65px; object-fit: cover;">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from "vue";
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const props = defineProps({
  multiple: { type: Boolean, default: false },
  minFiles: { type: Number, default: 0 },
  maxFiles: { type: Number, default: 5 },
  showExample: { type: Boolean, default: false },
  exampleImage: { type: Object, default: () => ({}) },
  name: { type: String, default: "" },
  label: { type: String, default: "" },
  hint: { type: String, default: "" },
  accept: { type: String, default: ".png, .jpg, .jpeg, .pdf" },
  form: { type: Object, default: () => ({}) },
  required: { type: Boolean, default: false },
  validation: { type: String, default: "" },
  minSizeKb: { type: Number, default: null },
  maxSizeKb: { type: Number, default: null },
  allowImage: { type: Boolean, default: null },
  allowDocs: { type: Boolean, default: null },
});

const emit = defineEmits(["uploaded"]);
const { t } = useI18n();

const { value, errorMessage } = useField(props.name, props.validation);
const errorsStore = useErrorsStore();
const { errorsResult } = storeToRefs(errorsStore);
const { resetErrors } = errorsStore;

const files = ref([]);
const src = ref(null);
const validationError = ref("");
let errorTimeout = null;

const computedAccept = computed(() => {
  if (props.allowImage === null && props.allowDocs === null) {
    return props.accept;
  }
  let types = [];
  if (props.allowImage) types.push("image/png, image/jpeg, image/jpg");
  if (props.allowDocs) types.push(".pdf");
  return types.length ? types.join(", ") : props.accept;
});

const getSize = (size) => (size / 1024).toFixed(1);

const truncate = (text, length) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};

const revokePreviews = () => {
  files.value.forEach(file => {
    if (file.path) URL.revokeObjectURL(file.path);
  });
  if (src.value) URL.revokeObjectURL(src.value);
};

const onUpload = (newFiles) => {
  validationError.value = "";
  
  if (!newFiles || (Array.isArray(newFiles) && newFiles.length === 0)) {
    // If user cancelled the file picker, we shouldn't necessarily delete old files
    // But Vuetify sets newFiles to [] when cancelled. 
    // We will restore the value to the existing files to prevent clearing.
    if (files.value.length > 0) {
       value.value = files.value;
       emit("uploaded", props.name, files.value);
       return;
    }
    src.value = null;
    if (props.required) {
      validationError.value = t('validation.required');
    }
    emit("uploaded", props.name, []);
    return;
  }

  let incomingFiles = Array.isArray(newFiles) ? newFiles : [newFiles];
  if (!props.multiple) {
    revokePreviews();
    files.value = [];
  }
  incomingFiles.forEach(file => {
    // Ignore files that are already in our list (by name and size)
    const exists = files.value.some(f => f.name === file.name && f.size === file.size);
    if (exists) return;

    const fileWithPreview = file;
    fileWithPreview.path = URL.createObjectURL(file);
    files.value.push(fileWithPreview);
  });

  value.value = files.value;

  if (files.value.length === 0) {
    value.value = null;
    revokePreviews();
    src.value = null;
    if (props.required) {
      validationError.value = t('validation.required');
    } else {
      validationError.value = "";
    }
    emit("uploaded", props.name, []);
    return;
  }

  // Calculate persistent errors (like min/max count and sizes)
  let persistentError = "";
  let hasSizeError = false;

  files.value.forEach(file => {
    if (hasSizeError) return; // Only show first size error

    const isImage = file.type?.includes("image");
    const isStandardImage = file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg";
    const isPdf = file.type?.includes("pdf");
    const isWord = file.type?.includes("msword") || file.type?.includes("wordprocessingml");
    const isDoc = isPdf || isWord;

    if (props.allowImage === false && isImage) {
      persistentError = t('validation.isNotAllowImage');
      hasSizeError = true;
    } else if (props.allowDocs === false && isDoc) {
      persistentError = t('validation.isNotAllowFile');
      hasSizeError = true;
    } else if (props.allowImage === true && isImage && !isStandardImage) {
      // It's an image but not a standard one (like SVG)
      persistentError = t('validation.imageType');
      hasSizeError = true;
    } else if ((props.allowImage !== null || props.allowDocs !== null) && !isImage && !isDoc) {
      // Not an image or doc, but restrictions are active
      persistentError = props.allowImage && props.allowDocs ? t('validation.isPdfOrImage') : (props.allowImage ? t('validation.imageType') : t('validation.isNotAllowFile'));
      hasSizeError = true;
    }

    if (hasSizeError) return;

    const sizeKb = file.size / 1024;
    if (props.minSizeKb && sizeKb < props.minSizeKb) {
      persistentError = t('validation.fileTooSmall', { min: props.minSizeKb });
      hasSizeError = true;
    } else if (props.maxSizeKb && sizeKb > props.maxSizeKb) {
      persistentError = t('validation.fileTooLarge', { max: props.maxSizeKb });
      hasSizeError = true;
    }
  });

  if (!hasSizeError && props.multiple) {
    if (props.minFiles && files.value.length < props.minFiles) {
      persistentError = t('validation.minFiles', { min: props.minFiles });
    } else if (props.maxFiles && files.value.length > props.maxFiles) {
      persistentError = t('validation.maxFiles', { max: props.maxFiles });
    }
  }

  if (!props.multiple && files.value[0]) {
    src.value = files.value[0].path;
  }

  validationError.value = persistentError;

  emit("uploaded", props.name, files.value);
};

const remove = (index) => {
  const file = files.value[index];
  if (file.path) URL.revokeObjectURL(file.path);
  
  if (Array.isArray(value.value)) {
    const newVal = [...value.value];
    newVal.splice(index, 1);
    value.value = newVal;
  } else {
    value.value = null;
  }

  files.value.splice(index, 1);
  onUpload(value.value); // Re-validate and refresh
};

// Sync with external form
watch(() => value.value, (newVal) => {
  if (props.form && props.form[props.name] !== newVal) {
    props.form[props.name] = newVal;
  }
});

watch(() => props.form?.[props.name], (newVal) => {
  if (newVal !== value.value) {
    value.value = newVal;
  }
}, { immediate: true });

onUnmounted(() => {
  revokePreviews();
  resetErrors();
});
</script>

