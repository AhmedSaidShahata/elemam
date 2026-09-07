<template>
  <NuxtLink :to="localePath({ name: 'blogs-id', params: { id: item.slug } })" style="color: inherit;">
    <div>
      <v-card class="relative blogs__card d-flex flex-column justify-end mb-2" :class="`${textColor}--text`">
        <img class="card__image" :src="image" cover />
        <SharingButton :item="item" :customPath="{ name: 'blogs-id', params: { id: item.slug } }" />
      </v-card>
      <div class="d-flex justify-space-between align-center card-description">
        <h3 class="mb-1 mt-1 font-tajawal">
          {{ title }}
        </h3>
        <div class="mt-1 text-secondary font-weight-bold text-body-1">
          <SharedImage width="25" height="25" name="blogs/arrow-right.png" class="description-image" />
        </div>
      </div>
      <div v-if="showDescription" class="card-description mb-5">
        <p class="description-text" v-html="truncate(description, 100)"></p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { computed } from "vue";
import { useLocalePath } from "#imports";
import { useI18n } from "vue-i18n";

const localePath = useLocalePath();
const { locale } = useI18n();

const props = defineProps({
  item: {
    type: [Object, String],
    default: () => { },
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  showDescription: {
    type: Boolean,
    default: true,
  },
  image: {
    type: [Object, String],
    default: () => "",
  },
  textColor: {
    type: String,
    default: "white",
  },
});

function truncate(str, length) {
  const div = document.createElement("div");
  div.innerHTML = str;
  const result = [];
  let currentLength = 0;

  Array.from(div.childNodes).forEach((node) => {
    if (currentLength >= length) return;

    const text = node.textContent?.trim();
    if (!text) return;

    const remaining = length - currentLength;
    const slice =
      text.length > remaining ? text.slice(0, remaining) + "..." : text;

    result.push(`<p>${slice}</p>`);
    currentLength += slice.replace("...", "").length;
  });

  return result.join("");
}
</script>