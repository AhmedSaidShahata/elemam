<template>
  <div v-if="isClient">
    <Swiper
      :breakpoints="breakpoints"
      :modules="swiperModules"
      ref="swiperRef"
      class="mySwiper"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      @init="onSwiperInit"
    >
      <SwiperSlide v-for="(item, index) in items" :key="index">
        <slot :item="item"></slot>
      </SwiperSlide>
    </Swiper>
    <slot name="button-next" :handleNext="swiperNextSlide" :isLastSlide="isLastSlide" />
    <slot name="button-prev" :handlePrev="swiperPrevSlide" :isFirstSlide="isFirstSlide" />
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, watch } from 'vue';
import { A11y, Navigation, Pagination, Autoplay } from "swiper";

const swiperModules = ref([Navigation, Pagination, A11y, Autoplay]);
const swiperInstance = ref();
const isClient = ref(false);
const isLastSlide = ref(false);
const isFirstSlide = ref(false); 

onMounted(() => {
  isClient.value = true;
});

const props = defineProps({
  breakpoints: Object,
  items: Array,
});

function onSwiper(swiper) {
  swiperInstance.value = swiper;
}

function onSwiperInit(swiper) {
  updateSlideStatus(); // Update status after Swiper is fully initialized
}

function onSlideChange() {
  updateSlideStatus();
}

function updateSlideStatus() {
  if (swiperInstance.value) {
    isFirstSlide.value = swiperInstance.value.isBeginning;
    isLastSlide.value = swiperInstance.value.isEnd;
  }
}

const swiperNextSlide = () => {
  swiperInstance.value.slideNext();
};

const swiperPrevSlide = () => {
  swiperInstance.value.slidePrev();
};

defineExpose({
  swiperNextSlide,
  swiperPrevSlide
});

// Watch for changes in items to re-evaluate slide status
watch(() => props.items, () => {
  // Delay to ensure Swiper has processed the new items
  setTimeout(() => {
    updateSlideStatus();
  }, 0);
}, { deep: true });
</script>