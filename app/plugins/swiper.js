// plugins/swiper.js
import { defineNuxtPlugin } from '#app';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Swiper', Swiper);
  nuxtApp.vueApp.component('SwiperSlide', SwiperSlide);
  nuxtApp.provide('swiperModules', [Navigation, Pagination, A11y, Autoplay]);
});
