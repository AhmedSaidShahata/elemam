<template>
  <section class="subscribe__form__container px-6 py-4">
    <Form @submit="submitHandler" v-if="render">
      <v-row class>
        <!-- Name Input -->
        <v-col cols="12" md="8" class="py-2">
          <SharedInputText
            :form="formData"
            v-model="formData.person_name"
            name="person_name"
            :hint="$t('refund.name_hint')"
            :label="$t('refund.name')"
            type="text"
            imageName="icons/refund-name.svg"
            class="w-100"
            :validation="'required|min:3|max:190'"
          />
        </v-col>

        <!-- Receipt Input -->
        <v-col cols="12" md="8" class="py-2">
          <SharedInputText
            :form="formData"
            v-model="formData.order_number"
            name="order_number"
            :label="$t('refund.recipt')"
            :hint="$t('refund.recipt_hint')"
            type="text"
            imageName="icons/recipt.svg"
            class="w-100"
            :validation="'required|min:10|max:190'"
          />
        </v-col>

        <!-- Email Input -->
        <v-col cols="12" md="8" class="py-2">
          <SharedInputText
            :form="formData"
            v-model="formData.person_email"
            name="person_email"
            :label="$t('refund.email')"
            :hint="$t('refund.email_hint')"
            type="email"
            imageName="icons/refund-email.svg"
            class="w-100"
            :validation="'required|email|max:191'"
          />
        </v-col>

        <!-- Phone Input -->
        <v-col cols="12" md="8" class="py-2">
          <SharedInputPhone
            :form="formData"
            name="phone"
            :label="$t('refund.phone')"
            :hint="$t('refund.phone_hint')"
            imageName="icons/refund-phone.svg"
            :validation="'required|numeric|numeric_min:9|numeric_max:15'"
            v-model="formData.phone"
          />
        </v-col>

        <!-- Passport Input -->
        <v-col cols="12" md="8" class="py-2">
          <SharedInputText
            :form="formData"
            v-model="formData.national_id"
            name="national_id"
            :label="$t('refund.passport')"
            :hint="$t('refund.passport_hint')"
            type="text"
            imageName="icons/passport.svg"
            class="w-100"
            :validation="'required|min:8|max:20'"
          />
        </v-col>

        <!-- Message Input -->
        <v-col cols="12" md="8" class="py-2">
          <SharedInputTextarea
            :form="formData"
            v-model="formData.reasons"
            name="reasons"
            :label="$t('refund.message')"
            :hint="$t('refund.message_hint')"
            imageName="icons/refund-msg.svg"
            :validation="'required|min:3|max:40000'"
          />
        </v-col>

        <!-- Submit Button -->
        <v-col cols="12" md="8" class="d-flex justify-center">
          <SharedButton
            type="submit"
            radius="16px"
            gradient="true"
            class="w-100"
            :loading="loading"
          >
            {{ $t("refund.submit") }}
          </SharedButton>
        </v-col>
      </v-row>
    </Form>
  </section>
</template>

<script setup>
import { Form, useForm } from "vee-validate";
import { ref } from "vue";

import { formData, loading, submited } from "./script.js";

const render = ref(true);

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
