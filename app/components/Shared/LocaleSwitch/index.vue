<template>
  <v-menu
    transition="slide-x-transition"
    location="bottom"
    :close-on-content-click="true"
    content-class="header-menu"
    :offset="[20, 60]"
  >
    <template v-slot:activator="{ props }">
      <v-btn class="py-5" v-bind="props">
        <span class="mx-1 mt-lg-n2 mt-n5"> {{ locale }} </span>
      </v-btn>
    </template>

    <v-list class="pa-0">
      <v-list-item
        v-for="(locale, index) in $i18n.locales"
        :key="index"
        @click="changeLocale(locale)"
        :input-value="locale.code"
      >
        <v-list-item-title
          style="cursor: pointer"
          class="d-flex align-center justify-center"
        >
          <span class="text-capitalize">{{ locale }}</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { useLocaleStore } from "@/stores/locale";
import cookies from "js-cookie";
import { setLocale as setLocaleValidate } from "@vee-validate/i18n";
const { locale, setLocale } = useI18n();
const { setLocaleApp } = useLocaleStore();

const handleLocale = (locale) => {
  cookies.set("_lang", locale);
  document.documentElement.setAttribute("dir", locale == "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", locale);
};

const changeLocale = async (locale) => {

  setLocale(locale);
  setLocaleValidate(locale);
  setLocaleApp(locale);
  handleLocale(locale);
};
</script>
