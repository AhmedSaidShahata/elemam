<template>
  <div v-if="isClient">
    <Swiper
      :breakpoints="breakpoints"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :modules="swiperModules"
      ref="swiperRef"
      class="mySwiper"
      @swiper="onSwiper"
    >
      <SwiperSlide v-for="(item, index) in items" :key="index">
        <slot :item="item"></slot>
      </SwiperSlide>
    </Swiper>
    <slot name="button-next" :handleNext="swiperNextSlide" />
    <slot name="button-prev" :handlePrev="swiperPrevSlide" />
  </div>
</template>

<script setup lang="js">
import { ref,onMounted } from 'vue';
import { A11y, Navigation, Pagination, Autoplay } from "swiper";


const swiperModules = ref([Navigation, Pagination, A11y, Autoplay]);
const swiperInstance = ref();
const isClient = ref(false)
onMounted(() => {
  isClient.value = true
})
const props = defineProps({
  breakpoints: Object,
  items: Array,
});

function onSwiper(swiper) {
  swiperInstance.value = swiper;
}

const swiperNextSlide = () => {
  swiperInstance.value.slideNext();
};

const swiperPrevSlide = () => {
  swiperInstance.value.slidePrev();
};
</script>
