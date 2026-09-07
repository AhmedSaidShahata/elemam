<template>
  <section class="contact__form__container pa-6">
    <v-locale-provider :rtl="$i18n?.locale == 'ar'">
      
    <Form v-if="render" @submit="submitHandler" >
      <v-row>
        <!-- Name Input -->
        <v-col cols="12" class="pt-2 my-1">
          <SharedInputText
            :form="formData"
            v-model="formData.person_name"
            :validation="'required|min:3|max:190'"
            name="person_name"
            :hint="$t('contact.name_hint')"
            :label="$t('contact.name')"
            type="text"
            imageName="icons/name.svg"
            class="w-100"
          />
        </v-col>

        <!-- Email Input -->
        <v-col cols="12" class="py-0 my-1">
          <SharedInputText
            :form="formData"
            v-model="formData.person_email"
            :validation="'required|email|max:191'"
            name="person_email"
            :label="$t('contact.email')"
            :hint="$t('contact.email_hint')"
            type="email"
            imageName="icons/email-contact.svg"
            class="w-100"
          />
        </v-col>

        <!-- Phone Input -->
        <v-col cols="12" class="py-0 my-3 ">
          <SharedInputPhone
            :form="formData"
            v-model="formData.phone"
            :validation="'required|numeric|numeric_min:9|numeric_max:15'"
            name="phone"
            :label="$t('contact.phone')"
            :hint="$t('contact.phone_hint')"
            imageName="icons/phone-contact.svg"
          />
        </v-col>

        <!-- topic Input -->
        <v-col cols="12" class="py-0 my-1">
              
          <SharedInputAutoComplete
            :form="formData"
            v-model="formData.contact_topic"
            :items="allTopics"
            item-title="name"
            item-value="id"
            :validation="'required'"
            name="contact_topic"
            :label="$t('contact.topic')"
            :hint="$t('contact.topic_hint')"
            imageName="icons/topic-contact.svg"
          >
          </SharedInputAutoComplete>
        </v-col>

        <!-- Message Input -->
        <v-col cols="12" class="py-0 my-1">
          <SharedInputTextarea
            :form="formData"
            v-model="formData.body"
            :validation="'required|min:3|max:40000'"
            name="body"
            :label="$t('contact.message')"
            :hint="$t('contact.message_hint')"
            class="pa-0"
            imageName="icons/message-contact.svg"
          />
        </v-col>

        <!-- Submit Button -->
        <v-col cols="12" class="d-flex justify-center">
          <SharedButton
            radius="16px"
            gradient="true"
            type="submit"
            class="w-100"
            height="40px"
            
          >
            {{ $t("contact.btn") }}
          </SharedButton>
        </v-col>
        <v-col v-if="popupMode" cols="12" class="d-flex justify-center">
          <SharedRoute
            to="contact-us"
            color="white"
            class="contact-us-popup__card__button w-100 button--custom shadow font-weight-bold"
            block


            radius="16px"
            :gradient="false"
            @click="isActive?.value && (isActive.value = false)"
          >
            <span class="button__text--custom">
              {{ $t("buttons.contact_us") }}
            </span>
          </SharedRoute>
        </v-col>
      </v-row>
    </Form>
    </v-locale-provider>

  </section>
</template>

<script setup>
import { Form, useForm } from "vee-validate";
import { ref, onMounted } from "vue";

import {
  formData,
  loading,
  submited,
  getAllTopics,
  allTopics,
} from "./script.js";

const render = ref(true);

const props = defineProps({
  popupMode: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Object,
    default: null,
  },
});

const { resetForm, handleSubmit } = useForm();

const submitHandler = handleSubmit(async () => {
  await submited();
  render.value = false;
  setTimeout(() => {
    render.value = true;
  }, 10);
  resetForm();
  props.isActive.value = false;
  if (popupMode.value) {
  }
});
onMounted(async () => {
  await getAllTopics();
});
</script>
