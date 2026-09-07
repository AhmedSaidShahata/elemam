import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import i18nRoutes from './app/plugins/i18n/i18n-routes'

export default defineNuxtConfig({
  devtools: { enabled: false },
  imports: {
    dirs: ["composables"],
  },
  experimental: {
    asyncContext: true,
    scanPageMeta: true,
    defaults: {
      nuxtLink: {
        componentName: "NuxtLink",
        activeClass: "router-link-active",
        exactActiveClass: "router-link-exact-active",
      },
    },
  },
  runtimeConfig: {
    public: {
      envUrl: (() => {
        const env = import.meta.env
        if (env.VITE_ENV_MODE === "production") {
          return env.NUXT_PUBLIC_WEBSITE_PRODUCTION
        } else if (env.VITE_ENV_MODE === "dproduction") {
          return env.NUXT_PUBLIC_WEBSITE_DPRODUCTION
        } else if (env.VITE_ENV_MODE === "tproduction") {
          return env.NUXT_PUBLIC_WEBSITE_TPRODUCTION
        } else if (env.VITE_ENV_MODE === "int") {
          return env.NUXT_PUBLIC_WEBSITE_INT
        } else if (env.VITE_ENV_MODE === "dev") {
          return env.NUXT_PUBLIC_WEBSITE_DEV
        } else if (env.VITE_ENV_MODE === "testing") {
          return env.NUXT_PUBLIC_WEBSITE_TEST
        } else if (env.VITE_ENV_MODE === "beta") {
          return env.NUXT_PUBLIC_WEBSITE_BETA
        } else if (env.VITE_ENV_MODE === "sdev") {
          return env.NUXT_PUBLIC_WEBSITE_SDEV
        } else if (env.VITE_ENV_MODE === "stesting") {
          return env.NUXT_PUBLIC_WEBSITE_STEST
        } else if (env.VITE_ENV_MODE === "sproduction") {
          return env.NUXT_PUBLIC_WEBSITE_SPRODUCTION
        } else {
          return env.NUXT_PUBLIC_WEBSITE_DEV
        }
      })(),
      currentEnv: import.meta.env.VITE_ENV_MODE
    }
  },
  nitro: {
    prerender: {
      routes: [process.env.NUXT_APP_BASE_URL || "/", `${process.env.NUXT_APP_BASE_URL || "/"}en`],
    },
  },
  pages: true,
  app: {
    head: {
      script: [
        { src: '/js/wow.min.js', defer: true },
        { src: '/js/main.js', defer: true }
      ],
      link: [
        // This config runs at build time, outside any Vue template, so it
        // never gets the same-file static-src base-URL rewrite Vue's SFC
        // compiler applies to a plain template `src="/assets/..."` - the
        // base path has to be prefixed by hand here, same as
        // `useLandingAsset()` does for the equivalent case at runtime.
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: `${process.env.NUXT_APP_BASE_URL || '/'}assets/icons/landing/otas-mark.svg`,
        },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;700;800;900&display=swap'
        }
      ],

    },
    pageTransition: {
      name: 'fade',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
  },
  css: [
    "~~/public/assets/scss/main.scss",
    "~~/public/assets/fonts/main.scss",
    "@mdi/font/css/materialdesignicons.css",
    "~~/public/assets/animate.css",
    '@fortawesome/fontawesome-free/css/all.min.css'
  ],
  components: [
    {
      path: "~/components",
    },
  ]
  ,
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@vee-validate/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  veeValidate: {
    autoImports: true,
  },
  i18n: {
    defaultLocale: 'ar',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ar', name: 'Arabic', file: 'ar.json' }
    ],
    bundle: {
      optimizeTranslationDirective: false,
    },
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
    customRoutes: 'config',
    pages: i18nRoutes,
  },
  vite: {
    optimizeDeps: {
      include: [
        'swiper/vue',
        'swiper',
        '@vee-validate/i18n',
        'js-cookie',
        'axios',
      ]
    },
    build: {
      chunkSizeWarningLimit: 100000,
    },

    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  compatibilityDate: '2025-06-11',
  plugins: [
    '~/plugins/canonical.js',
    '~/plugins/axios.server.js',
    '~/plugins/vuetify.js'
  ]
})
