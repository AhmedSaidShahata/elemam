<template>
  <section class="ms-lg-16 ps-lg-16 second-section">
    <div class="subscribe__form__container px-6 py-8">
      <Form v-if="render" @submit="submitHandler">
        <v-row>
          <!-- Name Input -->
          <v-col cols="12" class="py-2">
            <SharedInputText
              :form="formData"
              v-model="formData.firstname"
              :validation="'required|min:3|max:50'"
              name="firstname"
              :hint="$t('subscribe.name_hint')"
              :label="$t('subscribe.name')"
              type="text"
              imageName="icons/leading-icon.svg"
              class="w-100"
            />
          </v-col>

          <!-- Family Name Input -->
          <v-col cols="12" class="py-2">
            <SharedInputText
              :form="formData"
              v-model="formData.lastname"
              :validation="'required|min:3|max:50'"
              name="lastname"
              :label="$t('subscribe.fam_name')"
              :hint="$t('subscribe.fam_name_hint')"
              type="text"
              imageName="icons/sub-family.svg"
              class="w-100"
            />
          </v-col>

          <!-- Email Input -->
          <v-col cols="12" class="py-2">
            <SharedInputText
              :form="formData"
              v-model="formData.email"
              :validation="'required|email|max:50'"
              name="email"
              :label="$t('subscribe.email')"
              :hint="$t('subscribe.email_hint')"
              type="email"
              imageName="icons/sub-email.svg"
              class="w-100"
            />
          </v-col>

          <!-- First checkbox with custom label and links -->
          <v-col cols="12" class="pb-0">
            <v-checkbox
              id="checkbox1"
              color="#9368f9"
              class="custom-checkbox"
              hide-details
              v-model="checkbox1"
            >
              <template v-slot:label>
                <span>
                  {{ $t("subscribe.check1") + " " }}
                  <SharedRoute
                    to="privacy-policy"
                    class="text-primary text-decoration-underline"
                  >
                    {{ $t("subscribe.link1") }}
                  </SharedRoute>
                  {{ " " + $t("subscribe.and") + " " }}
                  <SharedRoute
                    to="terms-conditions"
                    class="text-primary text-decoration-underline"
                  >
                    {{ $t("subscribe.link2") }}
                  </SharedRoute>
                </span>
              </template>
            </v-checkbox>
          </v-col>

          <!-- Second checkbox with plain label -->
          <v-col cols="12" class="py-0 custom-negative-margin">
            <v-checkbox
              id="checkbox2"
              color="#9368f9"
              class="custom-checkbox"
              hide-details
              v-model="checkbox2"
            >
              <template v-slot:label>
                {{ $t("subscribe.check2") }}
              </template>
            </v-checkbox>
          </v-col>

          <!-- Subscribe Button -->
          <v-col cols="12" class="d-flex justify-center">
            <SharedButton
              radius="16px"
              width="200px"
              gradient="true"
              type="submit"
              class="subscribe__form__btn"
              :loading="loading"
              :disabled="!checked"
            >
              {{ $t("subscribe.btn") }}
            </SharedButton>
          </v-col>
        </v-row>
      </Form>
    </div>
  </section>
</template>

<script setup>
import { Form, useForm } from "vee-validate";
import { ref, computed } from "vue";

import { formData, loading, submited } from "./script.js";

const render = ref(true);
const checkbox1 = ref(false);
const checkbox2 = ref(false);

const checked = computed(() => checkbox1.value && checkbox2.value);

const { resetForm, handleSubmit } = useForm();

const submitHandler = handleSubmit(async () => {
  await submited();
  render.value = false;
  setTimeout(() => {
    render.value = true;
  }, 10);
  resetForm();
});
</script>

<style scoped>
.custom-checkbox :deep(.v-input__control) {
  margin: 0;
}


.custom-checkbox :deep(.v-selection-control__input .v-icon) {
  color: #9368f9 !important;
}

.custom-checkbox :deep(.v-input__control::after) {
  display: none !important;
}
</style>
