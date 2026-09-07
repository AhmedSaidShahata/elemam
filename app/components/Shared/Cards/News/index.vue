<template>
  <div>
  <NuxtLink 
  :to="localePath({ name: 'blogs-id', params: { id: item.slug } })"
  style="color: inherit;">
  <div>
    <v-card class="blogs__card d-flex flex-column justify-end overflow-hidden" :class="`${textColor}--text`">
      <img 
        class="card__image"
        :src="typeof image === 'string' ? image : image?.path"
        :title="image?.media_meta?.meta_title"
        :alt="image?.media_meta?.alternative_text"
      />
      <SharingButton v-if="showShare" :item="item" :customPath="{ name: 'blogs-id', params: { id: item.slug } }" :news="true" />
    </v-card>

    <div class="card-content pa-5">
        <div class="d-flex justify-space-between card-description mt-2">
          <h3 class="mb-2 mt-1 font-din">
            {{ title }}
          </h3>
          <div class="mt-1 text-secondary font-weight-bold text-body-1">
            <SharedImage width="25" height="25" name="blogs/arrow-right.png" class="description-image" />
          </div>
        </div>
        <p v-if="description" class="description-text" v-html="truncate(description, 100)"></p>
      </div>
  </div>
  </NuxtLink>
  </div>
</template>

  
  <script setup>
  import { computed } from 'vue';
  import { useLocalePath } from "#imports";
 
  
 
  const localePath = useLocalePath();
  
 
  const props = defineProps({
    item: {
      type: [Object, String],
      default: () => {},
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: [Object, String],
      default: () => '',
    },
    textColor: {
      type: String,
      default: 'white',
    },
    showShare: {
      type: Boolean,
      default: false,
    },
  })
 
  
  function truncate(str, length) {
    const div = document.createElement('div');
    div.innerHTML = str;
    const result = [];
    let currentLength = 0;

    Array.from(div.childNodes).forEach(node => {
      if (currentLength >= length) return;

      const text = node.textContent?.trim();
      if (!text) return;

      const remaining = length - currentLength;
      const slice = text.length > remaining ? text.slice(0, remaining) + '...' : text;

      result.push(`<p>${slice}</p>`);
      currentLength += slice.replace('...', '').length;
    });

    return result.join('');
}
  </script>