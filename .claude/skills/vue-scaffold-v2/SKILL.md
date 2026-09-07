---
name: vue-scaffold-v2
description: Scaffold new Nuxt/Vue pages, layouts, and general (non-form) components for the otas_tourism_website_v2 project, matching its Nuxt 4 + Vue 3 Composition API + Pinia + Vuetify 4 conventions, its `app/`-srcDir file-based routing with localized slugs, its auto-imported component pattern, and its SEO/schema page structure. Use this skill whenever the user asks to create a new page, layout, general component, composable, or Pinia store in otas_tourism_website_v2 — even if they don't name these conventions explicitly. For anything that is primarily a form, use the v2-forms skill instead. For anything that is primarily new data-fetching/API/tenant-URL logic, use the v2-api-data skill instead.
---

# Vue Scaffold v2 (otas_tourism_website_v2)

Generates new files that match **this project's actual conventions**, derived from `app/pages/`, `app/components/`, `app/stores/`, `app/composables/`, `app/schema/`, and `nuxt.config.ts`. This is a **Nuxt 4 SSR site** using **Vue 3 Composition API with `<script setup>`**, **Pinia** (composition-style stores only), and **Vuetify 4**. It is a migration off an older Nuxt 2/Vuetify 1/Vuex sibling project (`otas_tourism_website`) — do not port that project's Options API / Vuex / vuelidate patterns here.

## Stack conventions (always apply these)

- **Framework**: Nuxt 4 (SSR), `app/` srcDir. Pages live in `app/pages/`, routed automatically. Dynamic segments use bracket folders: `app/pages/offers/[id]/index.vue` (not `_id` — that's the v1 project's Nuxt 2 syntax).
- **API style**: Vue 3 Composition API with `<script setup>`. This is the established majority pattern (248/367 components as of the last audit). A number of older components still use the Options API and even call `this.$axios` (which doesn't exist here — no `@nuxtjs/axios` module is installed) — these are broken/legacy leftovers from the v1 migration, not a pattern to copy.
- **Props**: plain `defineProps(["name", "form", ...])` array syntax (untyped) — no `defineProps<T>()` interfaces observed in this codebase; match that unless the user asks for typed props.
- **State management**: Pinia, one file per domain under `app/stores/`, always `defineStore("name", () => { ... return {...} })` — composition/setup-style. No options-style (`state/getters/actions`) store exists anywhere in this codebase; don't introduce one.
- **UI**: Vuetify 4, wired via a custom Nuxt module hook in `nuxt.config.ts` (`vite:extendConfig` pushing `vite-plugin-vuetify`), configured in `app/plugins/vuetify.js`. Use `v-row`/`v-col`/`v-btn`/`v-text-field`, etc., and this project's own `Shared/*` wrapper components before writing new ones.
- **Auto-imported components**: `components: [{ path: "~/components" }]` in `nuxt.config.ts` — every `.vue` file under `app/components/` is auto-registered PascalCase-from-path, with a `Lazy` prefix for lazy-hydration variants (e.g. `app/components/Auth/LoginForm/ByEmail/index.vue` → `<AuthLoginFormByEmail>` / `<LazyAuthLoginFormByEmail>`). **No manual `import`/`components: {}` entry needed** for anything under `app/components/`.
- **Composables**: auto-imported from `app/composables/` (`imports.dirs: ["composables"]`). Naming: `useXxx`. Check there before writing new fetch/SEO/locale/currency logic — see `useApi`, `useAsyncDataApi`, `usePageHead`, `useCountry`, `useCurrency`, `useFilter`, `useProfileLinks`. (Full detail on the data-fetching composables belongs to the **v2-api-data** skill — this skill only tells you they exist and where.)
- **File naming**: PascalCase feature folders under `app/components/`, each with an `index.vue` (e.g. `app/components/Cards/Hotel/Item/index.vue`). Pages live under `app/pages/` mirroring the URL path, kebab-case folders, `index.vue`, dynamic segments as `[id]` folders.
- **Client/server checks**: prefer `import.meta.client` / `import.meta.server` in new code. The codebase also has legacy `process.client` / `process.server` checks in older files (e.g. `app/stores/auth.js`) — don't add new ones of that legacy form.

## Creating a new page

1. **Create the page file**: `app/pages/<entity>/index.vue` (list/landing) or `app/pages/<entity>/[id]/index.vue` (detail). Nuxt wires the route automatically from the file path.
2. **Page content/SEO fetch** — use the `useAsyncDataApi()` composable (from `v2-api-data`) to get CMS page content (title/description/keywords), then a `useXxxSchema(...)` call from `app/schema/` for JSON-LD. Example, from `app/pages/login/index.vue`:
   ```vue
   <script setup>
   import { computed } from "vue";
   import { useAsyncDataApi } from "~/composables/asyncDataApi";
   import { useLoginSchema } from "~/schema/login";

   definePageMeta({
     layout: "auth",
     middleware: ["guest"],
   });

   const companyStore = useCompanyStore();
   const company = computed(() => companyStore.company);
   const { allSettings } = useSettingsStore();

   const { data: pageData } = await useAsyncDataApi("login");
   const pageTitle = computed(() => pageData.value?.page?.title);
   const pageDescription = computed(() => pageData.value?.page?.description);

   useLoginSchema({ company, allSettings, pageTitle, pageDescription });
   </script>
   ```
3. **`definePageMeta`** — set `layout` (see `app/layouts/`: `Default`, `auth`, `external`, `license-expired`, `profile`, `too-many-requests`) and `middleware` (array of names from `app/middleware/`, e.g. `["auth"]`, `["guest"]`, `["hasOffers"]`) here, not via a separate route-registration step.
4. **SEO / JSON-LD schema** — every real page has a matching `app/schema/<page>.js` exporting a `useXxxSchema(...)` function that builds a JSON-LD object and calls `useHead(() => ({ script: [...] }))`. Follow `app/schema/login.js` as the template: compute the schema object from store/page data, `JSON.stringify(schema, null, 2).replace(/</g, '\\u003c')`, and register it under a stable `key` in the `useHead` script array. For general meta tags (title/description/OG/Twitter/favicon), call the existing `usePageHead(data)` composable instead of writing new `useHead` meta by hand — see `app/composables/usePageHead.js`.
5. **Register the localized slug** in `app/plugins/i18n/i18n-routes.ts` — see below. Skipping this still gives the page a default-locale-shaped route but no translated Arabic URL like every other page has.

## Routing & localized URLs

Nuxt generates routes from `app/pages/` automatically. What needs manual registration is the **localized slug**, in `app/plugins/i18n/i18n-routes.ts`:

```ts
'offers/index': { ar: '/العروض', en: '/offers' },
'offers/[id]/index': { ar: '/[id]/العروض', en: '/offers/[id]' },
```
- The object key is the page's path relative to `app/pages/`, without extension, including `index` for folder-style pages, with `[id]`-style bracket placeholders kept literal (matching the actual folder name, unlike the `_id` convention used by the sibling v1 project).
- Add **both** `ar` and `en` entries.
- Dynamic segments keep their bracket placeholder syntax in the translated path even when they appear in a different position/order (see `'services/booking/[id]/models/[modelId]/index'`).

## Creating a general (non-form) component

- Composition API, `<script setup>`. Use `defineProps([...])` (plain array, untyped) and `defineEmits([...])` to match the project's existing style.
- Reference other project components as their auto-imported PascalCase name (e.g. `<SharedRoute>`, `<AuthLeftSide>`) or the `Lazy`-prefixed variant for lazy hydration — never add a manual `import` for anything under `app/components/`.
- Check `app/components/Shared/*` first for an existing reusable primitive (`Shared/Button`, `Shared/Alert`, `Shared/Loading`, `Shared/Pagination`, `Shared/Rating`, `Shared/Accordion`, `Shared/GenericDialog`, `Shared/Table`, `Shared/SwiperWrapper`, `Shared/Image`, `Shared/Route`, `Shared/LocaleSwitch`, `Shared/Notification`, etc.) before writing a new one. `Shared/Input/*` primitives belong to forms — see the v2-forms skill.

## Creating a new Pinia store

One file per domain under `app/stores/`, composition-style only:
```js
// app/stores/offers.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useApi from "@/composables/useApi";

const { get } = useApi();

export const useOffersStore = defineStore("offers", () => {
  const offers = ref([]);
  const getOffers = computed(() => offers.value);

  async function setOffers() {
    try {
      const res = await get("offers", { simple: true, pagination: "all" });
      offers.value = res.data;
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  }

  return { offers, getOffers, setOffers };
});
```
Note `useApi()` is called once at module scope here (outside `defineStore`'s setup function) — that matches the existing pattern in `app/stores/offers.js` and `app/stores/auth.js`; don't "fix" it into the setup function without checking other stores first.

## Localizing new text (i18n)

Never hardcode user-facing strings. Add every label/hint/button/heading as a key to **both** `i18n/locales/en.json` and `i18n/locales/ar.json` with the same key — a key missing from one file is a silent runtime gap, not a build error. Use `$t('key')` in templates and `useI18n()`'s `t`/`locale`/`te` in `<script setup>`/composables. Note vee-validate has its own **separate** message-dictionary pair (`app/utils/veeValidate/{ar,en}.json`) — that one is covered in the v2-forms skill, don't conflate the two.

## What not to do

- Don't use the Options API (`data()`/`methods`/`mounted()`) or `this.$axios` for new components — this project's current convention (and the only one that actually works, since no `$axios` plugin exists) is `<script setup>` + the composables in `app/composables/`.
- Don't introduce an options-style Pinia store (`{state, getters, actions}`) — every existing store is composition-style (`defineStore(name, () => {...})`).
- Don't manually `import`/register a component from `app/components/` in a consuming file — it's auto-registered.
- Don't use `_id`-style dynamic route folders — this project (unlike its v1 sibling) uses Nuxt 4's `[id]` bracket syntax.
- Don't add a new page without registering its localized slug in `app/plugins/i18n/i18n-routes.ts` for both `ar` and `en`.
- Don't add a translation key to only one of `en.json`/`ar.json`.
- Don't invent new data-fetching logic here — see the v2-api-data skill for `useApi`/`useAsyncDataApi` and tenant/env base-URL rules.
- Don't invent new form/validation logic here — see the v2-forms skill.
