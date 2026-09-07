<template>
  <v-toolbar flat color="transparent" class="fix-header px-0 justify-center" style="height: 100px !important">

    <!-- Logo -->
    <v-list flat color="transparent" class="d-sm-flex me-8 mt-9">
      <v-list-item dense class="px-0">
        <NuxtLink
          exact
          :to="localePath('/')"
          class="logo d-flex flex-column align-center text-decoration-none text-black"
        >
          <img
            v-if="getCompany?.logo"
            :src="getCompany.logo"
            height="50px"
            class="mt-n5"
            alt="logo"
          />
          <span
            class="size-14 font-weight-bold text-center mt-2"
            style="line-height: 1.1; white-space: nowrap;"
          >
            {{ getCompany?.display_name }}
          </span>
        </NuxtLink>
      </v-list-item>
    </v-list>

    <!-- Navigation links -->
    <v-list flat color="transparent" class="header-nav-list d-adjust d-sm-flex justify-space-around mt-9">
      <v-list-item v-for="(item, index) in navItems" :key="index" class="px-0 text-center">

        <!-- Direct link -->
        <v-btn
          v-if="item.to"
          exact
          variant="text"
          class="text-capitalize font-weight-bold"
          :to="localePath(item.to)"
          style="height: 45px !important; border-radius: 0px !important;"
        >
          <span class="size-14 font-weight-bold">{{ item.name }}</span>
        </v-btn>

        <!-- Dropdown menu -->
        <v-menu
          v-else-if="!item.to && item.moreItems && item.moreItems.length > 0"
          content-class="more-info"
          transition="slide-x-transition"
          rounded
          offset-y
        >
          <template #activator="{ props: menuProps }">
            <v-btn
              variant="text"
              v-bind="menuProps"
              exact
              :class="isSubItemActive(item.moreItems) ? 'v-btn--active v-btn--exact' : ''"
              style="height: 45px !important; border-radius: 0px !important;"
            >
              <span class="size-14 text-capitalize font-weight-bold">{{ item.name }}</span>
              <span class="mx-1" style="display:inline-block; transform: rotate(0deg);">
                <svg width="10" height="7" viewBox="0 0 12 7" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.98.167A.26.26 0 0 0 11.74 0H.26C.157 0 .062.066.02.168a.285.285 0 0 0 .054.297l5.74 6.202A.255.255 0 0 0 6 6.75c.07 0 .138-.03.187-.083l5.74-6.202a.285.285 0 0 0 .052-.298z"
                    :fill="isSubItemActive(item.moreItems) ? '#fff' : '#000'"
                    fill-rule="nonzero"
                  />
                </svg>
              </span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              class="link"
              exact
              v-for="(moreItem, moreIndex) in item.moreItems"
              :key="moreIndex"
              :to="localePath(getItemLink(moreItem))"
            >
              <v-list-item-title>{{ moreItem.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      </v-list-item>
    </v-list>

    <v-spacer />

    <!-- Right-side dropdowns (locale / currency / country) -->
    <LazyNavBarDropDowns class="d-flex" />
  </v-toolbar>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getExcludedFeatureIdentifiers, filterNavItemsByExcludedFeatures } from '~/utils/filterNavItems'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const companyStore = useCompanyStore()
const getCompany = computed(() => companyStore.company)
const { allServices } = useServicesStore()
const { defaultCompany } = useDefaultCompanyStore()

// ─── Feature filtering ───────────────────────────────────────────────────────
const excludedFeatureIdentifiers = computed(() =>
  getExcludedFeatureIdentifiers(getCompany.value)
)

const hasOffers = computed(() => {
  const offersSpec = getCompany.value?.license?.specifications?.find(
    (item) => item.code === 'has_offers'
  )
  return offersSpec?.value === 1
})

// ─── Nav items ───────────────────────────────────────────────────────────────
const rawNavItems = computed(() => {
  const items = [
    {
      name: t('home'),
      to: { name: 'index' },
    },
    ...(allServices.value?.length > 0
      ? [
          {
            identifier: 'services',
            name: t('services'),
            to: '',
            moreItems: [
              {
                identifier: 'all_services',
                name: t('all_services_nav'),
                to: { name: 'services' },
              },
              ...allServices.value,
            ],
          },
        ]
      : []),
    {
      identifier: 'blogs',
      name: t('articles'),
      to: { name: 'blogs' },
    },
    {
      identifier: 'destinations',
      name: t('tourism_destinations'),
      to: { name: 'countries' },
    },
    {
      name: t('more'),
      to: '',
      moreItems: [
        ...(hasOffers.value
          ? [{ identifier: 'offers', name: t('offers'), to: { name: 'offers' } }]
          : []),
        { identifier: 'about_us', name: t('about_us'), to: { name: 'about-us' } },
        { identifier: 'terms_and_conditions', name: t('terms_conidtions'), to: { name: 'terms-conditions' } },
        { identifier: 'privacy_policy', name: t('privacy_policy'), to: { name: 'privacy-policy' } },
        { identifier: 'refund_policy', name: t('pay_policy'), to: { name: 'return-policy' } },
        { identifier: 'contact_us', name: t('contact_us'), to: { name: 'contact-us' } },
        { identifier: 'top_customers', name: t('all_top_customers'), to: { name: 'top-customers' } },
        { identifier: 'quotes', name: t('all_quotes'), to: { name: 'quotes' } },
        { identifier: 'customer_reviews', name: t('customer_reviews'), to: { name: 'customer-reviews' } },
        { identifier: 'board_members', name: t('directors'), to: { name: 'board-members' } },
        { identifier: 'team_members', name: t('team_members'), to: { name: 'team-members' } },
      ],
    },
  ]
  return items
})

const navItems = computed(() =>
  filterNavItemsByExcludedFeatures(rawNavItems.value, excludedFeatureIdentifiers.value)
)

// ─── Routing helpers ─────────────────────────────────────────────────────────
const getItemLink = (item) => {
  const resolvedItem = item?.service && typeof item.service === 'object' ? item.service : item
  const itemType = String(resolvedItem?.type || resolvedItem?.service_type || resolvedItem?.serviceType || item?.type || item?.service_type || item?.serviceType || '').toLowerCase()
  const routeId = resolvedItem?.slug || resolvedItem?.id || item?.slug || item?.id

  if (itemType === 'rental') {
    return { name: 'services-rental-id', params: { id: routeId } }
  }

  if (itemType === 'form') {
    return { name: 'services-form-id', params: { id: routeId } }
  }

  if (itemType === 'booking' || itemType === 'book') {
    return {
      name: resolvedItem?.data?.has_category || resolvedItem?.has_category || item?.data?.has_category || item?.has_category ? 'services-booking-id-categories' : 'services-booking-id-models',
      params: { id: routeId },
    }
  }

  return item.to
}

const isNavActive = (path) => route.path === localePath(path)

const isSubItemActive = (moreItems) =>
  moreItems.some((moreItem) => route.path === localePath(getItemLink(moreItem)))
</script>
