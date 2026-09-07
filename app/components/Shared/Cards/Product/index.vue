<template>
  <LazySharedRoute v-if="item" :to="`/products/${item?.slug}`">
    <v-card class="card-product" flat rounded="lg">
      <v-card-text class="px-0 py-0 pb-3">
        <div
          :style="`background-image:url(${item.image})`"
          class="card-product__image bg-lighten-grey position-relative d-flex align-center justify-center"
        >
          <!-- <v-img src="/assets/images/product.png"></v-img> -->
          <!-- <span
          class="card-product__image--discount d-flex align-center justify-center text-white"
        >
          خصم 20
        </span> -->
          <div
            class="card-product__image--heart bg-white d-flex align-center justify-center"
          >
            <v-icon size="16">mdi-heart-outline</v-icon>
          </div>
        </div>
        <div class="cart-product__content mt-4 d-flex flex-column align-center">
          <div style="max-width: 200px" class="font-size-14 text-secondary text-center">
            {{ $textTruncate(item.title) }}
          </div>
          <div class="d-flex align-center">
            <SharedRating readonly :value="item.reviews_count"></SharedRating>
            <span class="mx-2 font-size-14">({{ item.reviews_average }})</span>
          </div>
          <div class="cart-product__price mt-3 d-flex align-center">
            <h4 class="primary--text">
              {{ item.price }}

              {{ $t(currencyResult) }}
            </h4>
            <!-- <del style="color: #9c96a1" class="mx-1 font-size-14">2400 جنيه مصري</del> -->
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="px-2 d-flex justify-center" v-if="showBtn">
        <v-btn color="primary" variant="flat" class="mt-3" height="40" block rounded="lg">
          <v-icon class="mx-1" color="#fff">mdi-cart</v-icon>
          {{ $t("add_to_cart") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </LazySharedRoute>
</template>

<script setup lang="js">
import { useCurrencyStore } from "@/stores/currency";
const { currencyResult } = useCurrencyStore();

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  showBtn: {
    type: Boolean,
    default: true
  }
});
</script>
