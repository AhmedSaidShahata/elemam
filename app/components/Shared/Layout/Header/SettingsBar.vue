<template>
  <div class="header-elegant__settings-pill">
    <!-- Language -->
    <div class="header-elegant__setting-item">
      <v-menu location="bottom" transition="slide-y-transition" content-class="header-elegant__menu" :z-index="9000">
        <template #activator="{ props: menuProps }">
          <button type="button" class="header-elegant__setting-btn" v-bind="menuProps">
            <span class="header-elegant__setting-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32" fill="none">
                <g clip-path="url(#clip0_3781_32810)">
                <path d="M24.0877 23.7283L22.7821 21.1172L21.4766 23.7283H24.0877Z" fill="white"/>
                <path d="M29.1885 13.568H27.8602V10.7578C27.8602 10.4926 27.748 10.24 27.5513 10.0622C27.3546 9.88446 27.0917 9.7984 26.8281 9.82509C26.6788 9.84021 23.3352 10.2183 21.6705 13.568H20.3083V15.6235C20.3083 18.2076 18.206 20.3098 15.622 20.3098H13.5664V29.19C13.5664 30.7402 14.8276 32.0013 16.3777 32.0013H29.1885C30.7386 32.0014 31.9998 30.7402 31.9998 29.1901V16.3793C31.9998 14.8291 30.7386 13.568 29.1885 13.568ZM18.1812 26.1287L21.9445 18.6021C22.1033 18.2845 22.4279 18.0839 22.783 18.0839C23.1382 18.0839 23.4627 18.2845 23.6216 18.6021L27.3849 26.1287C27.6165 26.5918 27.4287 27.1549 26.9657 27.3865C26.5026 27.6181 25.9394 27.4304 25.7078 26.9673L25.0262 25.6039H20.54L19.8583 26.9673C19.6941 27.2958 19.363 27.4857 19.0191 27.4857C18.8782 27.4857 18.7352 27.4538 18.6006 27.3865C18.1374 27.155 17.9497 26.5918 18.1812 26.1287Z" fill="white"/>
                <path d="M10.1048 7.89453H8.32812C8.44412 8.82334 8.74144 9.60428 9.2165 10.2335C9.6915 9.60428 9.98881 8.82334 10.1048 7.89453Z" fill="white"/>
                <path d="M15.6221 18.4334C17.1723 18.4334 18.4334 17.1722 18.4334 15.6221V2.81137C18.4334 1.26119 17.1722 0 15.6221 0H2.81137C1.26119 0 0 1.26119 0 2.81137V15.6221C0 17.1723 1.26119 18.4334 2.81131 18.4334H4.13956V21.2436C4.13956 21.5088 4.25181 21.7614 4.4485 21.9392C4.62162 22.0956 4.84588 22.1811 5.077 22.1811C5.10844 22.1811 5.14013 22.1796 5.17169 22.1763C5.32094 22.1612 8.66456 21.7831 10.3293 18.4334H15.6221ZM9.71638 13.0546C9.55238 12.9671 9.38488 12.8682 9.21675 12.7583C9.04856 12.8682 8.88112 12.9671 8.71712 13.0546C7.1175 13.9077 5.52069 13.9175 5.4535 13.9175C4.93575 13.9175 4.516 13.4977 4.516 12.98C4.516 12.4622 4.93575 12.0425 5.4535 12.0425C5.46175 12.0424 6.61844 12.0256 7.76937 11.4342C7.11087 10.591 6.59188 9.44681 6.44194 7.89625H5.45344C4.93569 7.89625 4.51594 7.4765 4.51594 6.95875C4.51594 6.441 4.93569 6.02125 5.45344 6.02125H8.27925V5.45344C8.27925 4.93569 8.699 4.51594 9.21675 4.51594C9.7345 4.51594 10.1543 4.93569 10.1543 5.45344V6.02125H12.98C13.4977 6.02125 13.9175 6.441 13.9175 6.95875C13.9175 7.4765 13.4977 7.89625 12.98 7.89625H11.9916C11.8416 9.44681 11.3227 10.591 10.6642 11.4342C11.8151 12.0256 12.9719 12.0424 12.9839 12.0425C13.5016 12.0425 13.9194 12.4622 13.9194 12.98C13.9194 13.4977 13.4977 13.9175 12.98 13.9175C12.9128 13.9175 11.316 13.9078 9.71638 13.0546Z" fill="white"/>
                <path d="M22.8554 5.3637C23.0385 5.54676 23.2784 5.63832 23.5183 5.63832C23.7582 5.63832 23.9982 5.54682 24.1812 5.3637C24.5473 4.99757 24.5473 4.40401 24.1812 4.03788L23.9121 3.76876C27.3626 3.9732 30.1074 6.8447 30.1074 10.3457C30.1074 10.8634 30.5271 11.2832 31.0449 11.2832C31.5626 11.2832 31.9824 10.8634 31.9824 10.3457C31.9824 5.80363 28.3859 2.08626 23.8913 1.89032L24.1812 1.60038C24.5473 1.23426 24.5473 0.640695 24.1812 0.27457C23.8151 -0.0914922 23.2215 -0.0915547 22.8554 0.27457L20.9738 2.15626C20.6077 2.52238 20.6077 3.11595 20.9738 3.48207L22.8554 5.3637Z" fill="white"/>
                <path d="M9.127 26.6187C8.76094 26.2526 8.16731 26.2526 7.80119 26.6187C7.43506 26.9848 7.43506 27.5784 7.80119 27.9445L8.07031 28.2137C4.61975 28.0093 1.875 25.1377 1.875 21.6367C1.875 21.119 1.45525 20.6992 0.9375 20.6992C0.41975 20.6992 0 21.119 0 21.6367C0 26.1788 3.59644 29.8962 8.09112 30.0921L7.80119 30.382C7.43506 30.7482 7.43506 31.3417 7.80119 31.7078C7.98425 31.8909 8.22419 31.9824 8.46406 31.9824C8.70394 31.9824 8.94394 31.8909 9.12694 31.7078L11.0086 29.8262C11.3747 29.46 11.3747 28.8665 11.0086 28.5003L9.127 26.6187Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_3781_32810">
                <rect width="32" height="32" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            </span>
            <span v-if="!noLabel" class="header-elegant__setting-text">
              {{ $t('header_elegant.change_language') }} :
            </span>
            <span class="header-elegant__setting-text">
              <strong>{{ $t(currentLocale?.name || '') }}</strong>
            </span>
            <v-icon size="14" class="header-elegant__setting-menu">mdi-menu-down</v-icon>
          </button>
        </template>
        <v-list class="pa-0" v-if="currentLocale">
          <v-list-item
            v-for="(lang, index) in languages"
            :key="index"
            :active="currentLocale.code?.toLowerCase() === lang.code?.toLowerCase()"
            active-class="bg-primary text-white"
            :class="{ 'bg-primary text-white cursor-default': currentLocale.code?.toLowerCase() === lang.code?.toLowerCase() }"
            @click="onChangeLanguage(lang)"
          >
            <v-list-item-title class="d-flex align-center justify-center" :class="currentLocale.code?.toLowerCase() === lang.code?.toLowerCase() ? '' : 'pointer'">
              <span class="text-capitalize">{{ lang.name }}</span>
              <v-icon class="px-2">{{ lang.icon }}</v-icon>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <span class="header-elegant__setting-divider" aria-hidden="true" />

    <!-- Currency -->
    <div class="header-elegant__setting-item">
      <v-menu location="bottom" transition="slide-y-transition" content-class="header-elegant__menu" :z-index="9000">
        <template #activator="{ props: menuProps }">
          <button type="button" class="header-elegant__setting-btn" v-bind="menuProps">
            <span class="header-elegant__setting-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32" fill="none">
                <g clip-path="url(#clip0_3781_32800)">
                <path d="M11.2708 11.832C5.70015 11.832 1.1875 16.3447 1.1875 21.9153C1.1875 27.4859 5.70015 31.9986 11.2708 31.9986C16.8414 31.9986 21.354 27.4859 21.354 21.9153C21.354 16.3447 16.8348 11.832 11.2708 11.832ZM12.0936 26.7284V27.2965C12.0936 27.7537 11.7279 28.1194 11.2708 28.1194C10.8136 28.1194 10.4479 27.7537 10.4479 27.2965V26.7218C9.96464 26.5782 9.52709 26.3104 9.17444 25.9382C8.86097 25.6051 8.88056 25.0892 9.20709 24.7757C9.54015 24.4622 10.0561 24.4818 10.3695 24.8084C10.6046 25.0565 10.9246 25.1937 11.2642 25.1937C11.9434 25.1937 12.4985 24.6386 12.4985 23.9594C12.4985 23.2802 11.9434 22.7251 11.2642 22.7251C9.6773 22.7251 8.38423 21.432 8.38423 19.8451C8.38423 18.5455 9.25281 17.4418 10.4414 17.0892V16.521C10.4414 16.0639 10.8071 15.6982 11.2642 15.6982C11.7214 15.6982 12.0871 16.0639 12.0871 16.521V17.0957C12.5704 17.2394 13.0079 17.5071 13.3606 17.8794C13.674 18.2124 13.6544 18.7284 13.3279 19.0418C12.9948 19.3553 12.4789 19.3357 12.1655 19.0092C11.9304 18.761 11.6104 18.6239 11.2708 18.6239C10.5916 18.6239 10.0365 19.179 10.0365 19.8582C10.0365 20.5373 10.5916 21.0924 11.2708 21.0924C12.8577 21.0924 14.1508 22.3855 14.1508 23.9724C14.1442 25.272 13.2757 26.3757 12.0936 26.7284Z" fill="white"/>
                <path d="M7.99397 0C3.95152 0 0.679688 3.27184 0.679688 7.31429C0.679688 9.79592 1.91397 11.9837 3.80132 13.3094C5.79969 11.5722 8.41193 10.5208 11.2723 10.5208C11.5597 10.5208 11.847 10.5339 12.1279 10.5535C12.1866 8.10449 13.1009 5.86449 14.5834 4.13388C13.3948 1.6849 10.8936 0 7.99397 0ZM9.35234 5.89061C9.64622 5.89061 9.88785 6.13225 9.88785 6.42612C9.88785 6.72 9.64622 6.96163 9.35234 6.96163H8.16377V7.49061H9.35234C9.64622 7.49061 9.88785 7.73225 9.88785 8.02612C9.88785 8.32 9.64622 8.56163 9.35234 8.56163H8.16377V9.21469C8.16377 9.50857 7.92214 9.75021 7.62826 9.75021C7.33438 9.75021 7.09275 9.50857 7.09275 9.21469V8.56163H5.90418C5.6103 8.56163 5.36867 8.32 5.36867 8.02612C5.36867 7.73225 5.6103 7.49061 5.90418 7.49061H7.09275V6.96163H5.90418C5.6103 6.96163 5.36867 6.72 5.36867 6.42612C5.36867 6.13225 5.6103 5.89061 5.90418 5.89061H6.55071L5.3752 4.05551C5.21193 3.80735 5.28377 3.47429 5.53846 3.31102C5.78663 3.14776 6.11969 3.21959 6.28295 3.47429L7.63479 5.57714L8.98663 3.47429C9.14989 3.22612 9.47642 3.15429 9.73112 3.31102C9.97928 3.47429 10.0511 3.80082 9.89438 4.05551L8.71234 5.89061H9.35234Z" fill="white"/>
                <path d="M22.3818 1.85547C17.4643 1.85547 13.4806 5.81955 13.4414 10.7306C17.9867 11.6057 21.572 15.191 22.4602 19.7363C27.3647 19.6971 31.3222 15.7069 31.3222 10.7959C31.3222 5.85873 27.319 1.85547 22.3818 1.85547ZM25.5557 7.25628C25.4447 7.5371 25.1312 7.67424 24.8504 7.56322C24.5826 7.45873 24.2953 7.40649 24.0079 7.40649C23.0937 7.40649 22.2904 7.942 21.8398 8.75179H24.1451C24.4455 8.75179 24.6871 8.99343 24.6871 9.29384C24.6871 9.59424 24.4455 9.83588 24.1451 9.83588H21.4871C21.4675 9.96649 21.4675 10.502 21.4871 10.6326H24.1516C24.452 10.6326 24.6937 10.8742 24.6937 11.1747C24.6937 11.4751 24.452 11.7167 24.1516 11.7167H21.8463C22.2969 12.52 23.1002 13.062 24.0145 13.062C24.2496 13.062 24.4847 13.0293 24.7067 12.9575C24.9941 12.8661 25.301 13.0293 25.3924 13.3167C25.4839 13.604 25.3206 13.911 25.0332 14.0024C24.7002 14.1069 24.3606 14.1591 24.0145 14.1591C22.4994 14.1591 21.1998 13.1534 20.6512 11.7298H19.7239C19.4234 11.7298 19.1818 11.4881 19.1818 11.1877C19.1818 10.8873 19.4234 10.6457 19.7239 10.6457H20.3965C20.3834 10.5151 20.3834 9.97955 20.3965 9.84894H19.7239C19.4234 9.84894 19.1818 9.60731 19.1818 9.3069C19.1818 9.00649 19.4234 8.76486 19.7239 8.76486H20.6512C21.1932 7.34118 22.4994 6.33547 24.0145 6.33547C24.439 6.33547 24.8569 6.41384 25.2488 6.57057C25.523 6.662 25.6602 6.97547 25.5557 7.25628Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_3781_32800">
                <rect width="32" height="32" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            </span>
            <span class="header-elegant__setting-text" v-if="!noLabel">
              {{ $t('header_elegant.change_currency') }} :
            </span>
            <span class="header-elegant__setting-text">
              <strong>{{ currency?.code || 'SAR' }}</strong>
            </span>
            <v-icon size="14" class="header-elegant__setting-menu">mdi-menu-down</v-icon>
          </button>
        </template>
        <v-list class="pa-0" v-if="currencies.length">
          <v-list-item
            v-for="(item, index) in currencies"
            :key="index"
            :active="currency && currency.code === item.code"
            active-class="bg-primary text-white"
            @click="onSelectCurrency(item)"
          >
            <v-list-item-title class="d-flex align-center justify-center text-capitalize pointer">
              {{ item.code }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <span class="header-elegant__setting-divider" aria-hidden="true" />

    <!-- Country -->
    <div class="header-elegant__setting-item">
      <v-menu max-height="165px" location="bottom" transition="slide-y-transition" content-class="header-elegant__menu" :z-index="9000">
        <template #activator="{ props: menuProps }">
          <button type="button" class="header-elegant__setting-btn" v-bind="menuProps">
            <span class="header-elegant__setting-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32" fill="none">
                <path d="M24.5608 3.56641C21.9202 3.56641 19.7489 5.61328 19.5495 8.20328C19.5402 8.33141 19.5352 8.46141 19.5352 8.59203C19.5352 12.4189 23.9439 16.8402 23.9883 16.8845C24.1364 17.0314 24.3345 17.1139 24.5464 17.117C24.5514 17.1177 24.5558 17.1177 24.5608 17.1177C24.7783 17.1177 24.9814 17.0345 25.1333 16.8839C25.1777 16.8402 29.5864 12.4183 29.5864 8.59203C29.5864 5.82078 27.332 3.56641 24.5608 3.56641ZM24.5608 10.8095C23.3377 10.8095 22.3427 9.81453 22.3427 8.59203C22.3427 7.36891 23.3377 6.37391 24.5608 6.37391C25.7839 6.37391 26.7789 7.36891 26.7789 8.59203C26.7789 9.81453 25.7839 10.8095 24.5608 10.8095Z" fill="white"/>
                <path d="M8.63047 9.36688C9.09922 8.475 9.63297 7.73875 10.2142 7.17188C7.56047 7.94563 5.32484 9.7075 3.93359 12.0319H7.58047C7.85797 11.0663 8.20984 10.1688 8.63047 9.36688Z" fill="white"/>
                <path d="M18.5966 8.59172C18.5966 8.27859 18.6209 7.97109 18.6678 7.67047C18.5591 7.61109 18.4491 7.55359 18.3372 7.49797C18.2234 7.71672 17.9559 7.80984 17.7284 7.70672C17.2541 7.49109 16.7684 7.31172 16.2734 7.16797C16.8559 7.73609 17.3909 8.47297 17.8603 9.36672C18.2841 10.1748 18.6384 11.0798 18.9172 12.0542C19.1059 12.1142 19.2428 12.2911 19.2428 12.5005C19.2428 12.6236 19.1947 12.7355 19.1166 12.8192C19.4353 14.1611 19.6172 15.6148 19.6484 17.1173H22.2559C22.5147 17.1173 22.7247 17.3273 22.7247 17.5861C22.7247 17.8448 22.5147 18.0548 22.2559 18.0548H19.6484C19.6184 19.5017 19.4484 20.903 19.1516 22.203H23.0672C23.5584 21.1555 23.8884 20.0123 24.0234 18.8036C24.0516 18.5523 24.2741 18.3692 24.5241 18.388C24.5322 18.2773 24.5384 18.1661 24.5434 18.0542C24.0828 18.0505 23.6516 17.8717 23.3266 17.5498C23.1334 17.358 18.5966 12.8105 18.5966 8.59172Z" fill="white"/>
                <path d="M17.8616 25.805C17.3916 26.7 16.8566 27.4369 16.2734 28.005C18.9284 27.2375 21.1753 25.4831 22.5703 23.1406H18.9116C18.6341 24.1062 18.2822 25.0031 17.8616 25.805Z" fill="white"/>
                <path d="M17.9367 23.1406H8.55859C8.80547 23.9456 9.10797 24.6944 9.46234 25.3694C10.4992 27.345 11.8436 28.4325 13.2473 28.4325C14.6517 28.4325 15.9961 27.345 17.0336 25.3694C17.388 24.6944 17.6898 23.9456 17.9367 23.1406Z" fill="white"/>
                <path d="M8.63047 25.805C8.20984 25.0031 7.85797 24.1062 7.58047 23.1406H3.93359C5.32484 25.4644 7.56047 27.2269 10.2142 28.0006C9.63297 27.4331 9.09922 26.6975 8.63047 25.805Z" fill="white"/>
                <path d="M6.84203 18.0547H2.41016C2.47328 19.5328 2.83391 20.9347 3.43266 22.2028H7.33891C7.04203 20.9028 6.87203 19.5016 6.84203 18.0547Z" fill="white"/>
                <path d="M8.3025 22.2028H18.1931C18.5044 20.9141 18.6825 19.5103 18.7144 18.0547H7.78125C7.81312 19.5103 7.99125 20.9141 8.3025 22.2028Z" fill="white"/>
                <path d="M18.1931 12.9688H8.3025C7.99125 14.2575 7.81312 15.6606 7.78125 17.1169H18.7144C18.6825 15.6606 18.5044 14.2575 18.1931 12.9688Z" fill="white"/>
                <path d="M7.33891 12.9688H3.43266C2.83391 14.2369 2.47328 15.6388 2.41016 17.1169H6.84203C6.87203 15.67 7.04203 14.2687 7.33891 12.9688Z" fill="white"/>
                <path d="M8.55859 12.0308H17.9367C17.6898 11.2258 17.388 10.477 17.0336 9.80203C15.9961 7.82641 14.6517 6.73828 13.2473 6.73828C11.8436 6.73828 10.4992 7.82641 9.46234 9.80203C9.10797 10.477 8.80547 11.2258 8.55859 12.0308Z" fill="white"/>
              </svg>
            </span>
            <span v-if="!noLabel" class="header-elegant__setting-text">
              {{ $t('header_elegant.change_country') }} :
            </span>
            <span v-if="country?.flag && countries.some(c => c.code?.toLowerCase() === country.code?.toLowerCase())"
              class="header-elegant__setting-flag country-icon">
              <span class="mx-1 font-flag">{{ country?.flag }}</span>
            </span>
            <img
              v-else
              class="header-elegant__setting-flag-img"
              src="/assets/images/empty-flag.svg"
              alt=""
            />
            <v-icon v-if="countries.length > 1" size="14" class="header-elegant__setting-menu">mdi-menu-down</v-icon>
          </button>
        </template>
        <v-list v-if="countries.length > 0" class="pa-0">
          <v-list-item
            v-for="countryItem in countries"
            :key="countryItem.id"
            :active="country && country.code?.toLowerCase() === countryItem.code?.toLowerCase()"
            active-class="bg-primary text-white"
            @click="onSelectCountry(countryItem)"
          >
            <v-list-item-title class="d-flex align-center justify-center pointer">
              <span class="px-1 font-flag">{{ countryItem?.flag }}</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/stores/locale'

const props = defineProps({
  noLabel: {
    type: Boolean,
    default: false,
  },
})

const { locale } = useI18n()

// ── Stores ───────────────────────────────────────────────────────────────────
const languagesStore = useLanguagesStore()
const currenciesStore = useCurrenciesStore()
const countriesStore = useCountriesStore()
const { setLocaleApp } = useLocaleStore()
const { setLoader } = useLoaderStore()

// ── Language ─────────────────────────────────────────────────────────────────
const languages = computed(() => languagesStore.allLanguages)

const currentLocale = computed(() =>
  languages.value.find(l => l.code?.toLowerCase() === locale.value?.toLowerCase())
)

const onChangeLanguage = async (lang) => {
  const router = useRouter()
  const switchLocalePath = useSwitchLocalePath()

  const newLocale = lang.code.toLowerCase()
  if (locale.value === newLocale) return

  setLoader(false)
  await setLocaleApp(newLocale)
  localStorage.setItem('refetch_sections_target_country', 'yes')
  await router.push(switchLocalePath(newLocale))
  setLoader(true)
}

// ── Currency ─────────────────────────────────────────────────────────────────
const currencies = computed(() => currenciesStore.allCurrencies)
const selectedCurrency = computed(() => currenciesStore.selectedCurrency)

const currency = computed({
  get: () => selectedCurrency.value,
  set: (val) => currenciesStore.setSelectedCurrency(val),
})

const onSelectCurrency = (item) => {
  currency.value = item
  localStorage.setItem('refetch_sections_currency', 'yes')
  window.location.reload()
}

watch(
  currencies,
  (list) => {
    if (!list?.length) return
    const valid = list.find(c => c.code === selectedCurrency.value?.code)
    currency.value = valid || list[0]
  },
  { immediate: true }
)

watch(locale, async () => {
  currenciesStore.setSelectedCurrency(selectedCurrency.value)
})

// ── Country ──────────────────────────────────────────────────────────────────
const countries = computed(() => countriesStore.availableTarget)
const selectedCountry = computed(() => countriesStore.selectedCountry)

const country = computed({
  get: () => selectedCountry.value,
  set: (val) => countriesStore.setSelectedCountry(val),
})

const onSelectCountry = (item) => {
  country.value = item
  localStorage.setItem('refetch_sections_target_country', 'yes')

  const route = useRoute()
  const middlewares = Array.isArray(route.meta?.middleware)
    ? route.meta.middleware
    : route.meta?.middleware
      ? [route.meta.middleware]
      : []
  const hasTargetCountryMiddleware = middlewares.includes('target-country')

  const url = new URL(window.location.href)
  if (hasTargetCountryMiddleware) {
    url.searchParams.set('country', item.code)
  } else {
    url.searchParams.delete('country')
  }
  window.location.href = url.toString()
}

watch(
  countries,
  (newCountries) => {
    if (!newCountries?.length) return
    const currentValid = newCountries.find(
      c => c.code?.toLowerCase() === selectedCountry.value?.code?.toLowerCase()
    )
    country.value = currentValid || newCountries[0]
  },
  { immediate: true }
)

watch(locale, async () => {
  await countriesStore.getAvailableTarget()
  countriesStore.getAvailableTarget(true)
})

onMounted(async () => {
  if (!countries.value.length) await countriesStore.getAvailableTarget()
 
  currenciesStore.initSelectedCurrency()
  countriesStore.initSelectedCountry()
})
</script>
