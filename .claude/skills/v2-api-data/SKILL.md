---
name: v2-api-data
description: Add or edit any HTTP data-fetching, mutation, or tenant/environment base-URL logic in otas_tourism_website_v2. Use this skill when the user asks to call a new backend endpoint, add a method to a Pinia store that talks to the API, fetch CMS page content for a new page, or touch anything related to tenant-domain or per-environment base-URL resolution. This project has known duplication and a couple of real bugs in this area (see "Known traps" below) — read this before writing new fetch code so you don't add a fourth copy of already-duplicated logic or rely on a broken code path.
---

# API & Data Fetching (otas_tourism_website_v2)

There is **no local backend** (`server/` only holds sitemap/robots/redirect Nitro routes) — all application data comes from an external API reached through one of two existing patterns. Do not call `axios`/`$fetch` directly from a component or page; use one of these.

## Pattern 1 — mutations: `useApi()`

`app/composables/useApi.js` wraps the shared axios instance (`app/axios/index.js`) with loading/error state:

```js
import useApi from "@/composables/useApi";
const { get, post, remove, loading, errorsResponse } = useApi();

await post("signin", formData);       // POST
await get("offers", { simple: true }); // GET, params object
await remove("some-resource/5");       // DELETE
```

- `errorsResponse` is set from `error.response?.data?.errors` on failure — read it for field-level errors after an await, rather than wrapping every call in try/catch yourself.
- `loading` toggles around the request — bind it to a button's `:loading` prop instead of managing a separate local ref.
- **Known bug**: `remove(url, params)` takes a `params` argument but never uses it — the implementation is `axios.delete(url)` only. If you need a delete request with a body/params, check with the user before assuming this composable supports it; don't silently pass params expecting them to be sent.
- This is the pattern used inside Pinia store actions (see `app/stores/offers.js`, `app/stores/auth.js`) and form `formModule.js` files (see the v2-forms skill).

## Pattern 2 — page content: `useAsyncDataApi()`

`app/composables/asyncDataApi.js` fetches and caches CMS page content (title/description/keywords) per `{endpoint, locale}`, and also fires `usePageHead()` for you:

```js
import { useAsyncDataApi } from "~/composables/asyncDataApi";
const { data: pageData } = await useAsyncDataApi("login");
const pageTitle = computed(() => pageData.value?.page?.title);
```

- Backed by native `useAsyncData` + raw `$fetch` against `${apiURL}/pages/${endPoint}` — this bypasses the `useApi()` axios instance and its interceptors (no auth/currency/country headers are attached here; only `X-Locale`).
- Caching is a `Map` inside `usePagesStore` (`app/stores/pages.js`), keyed by `${endPoint}_${locale}`.
- Use this specifically for a page's CMS-editable title/description/keywords content, mirroring `app/pages/login/index.vue`. For actual entity data (e.g. the list of offers), use a Pinia store + `useApi()`'s `get` instead (see `app/stores/offers.js`).

## Tenant & environment base-URL resolution

Tenant identity is the request subdomain, checked against `otasapp.net`, `otasapp.com`, `spbeta.net` (anything else falls back to using the full host as-is). This resolution is implemented **independently in three places** — a known, already-flagged duplication, not something to "fix" by deleting two of them without checking all call sites and asking first:

1. `app/plugins/api.js` — `$apiBase` provided to the Nuxt app (`nuxtApp.$apiBase`), used by `useAsyncDataApi()` and the axios request interceptor.
2. `app/axios/baseUrl.js` — `getBaseURL()`, a second independent env-mode switch reading `import.meta.env.VITE_WEBSITE_*` vars.
3. `nuxt.config.ts`'s `runtimeConfig.public.envUrl` — a third independent env-mode switch reading `NUXT_PUBLIC_WEBSITE_*` vars (note: this one additionally branches on `sdev`/`stesting`/`sproduction`, which `app/axios/baseUrl.js` does not).

If a change requires touching per-environment URL resolution, update the specific call site you're working on and flag to the user that the same logic exists in the other files — don't assume fixing one location is sufficient, and don't consolidate them into a shared util without approval (see AGENTS.md's approval process).

## The shared axios instance (`app/axios/index.js`)

This is what `useApi()` calls. Its interceptors are the source of truth for what headers/behavior every API call gets — read it before assuming you need to add a header or error-handling call manually:

- **Request interceptor** (client-side only): reads `_lang` cookie / `useI18n().locale`, reconciles a mismatch by trusting i18n and syncing the cookie + `useLocaleStore()`; attaches `Authorization: Bearer <token>` from the `token` cookie if present; sets `X-locale`, `Accept-Language`, `X-timezone`, `X-Target-Country` (from the `country` cookie), `X-currency` (from the `currency` cookie, default `USD`). Also resolves `config.baseURL` from `nuxtApp.$apiBase`/`$staticUrl` per the tenant logic above.
- **Response interceptor**: on success, shows a toast via `useNotificationStore().setNotification(...)` if `response.data.message` is present and the method is POST/PUT/DELETE, and clears `useErrorsStore()`. On error: shows a toast for `[403, 503, 422, 409]` status codes; sets `useErrorsStore().setErrors(data.errors)` when the response body has `errors`; and **redirects** via `navigateTo` for specific statuses — `404 → /not-found`, `429 → /too-many-requests`, `402 → /license-expired`. This redirect behavior is the project's de facto error-page mechanism (there is no `error.vue`) — don't add a separate error page/handler for these statuses, this is already handled globally.
- Comments in this file marked `// v1 match: ...` indicate the behavior was deliberately ported from the sibling v1 project — treat as intentional, not something to "clean up."

## Reading auth/session state

`app/stores/auth.js` (`useAuthStore`) exposes `user`, `isLoggedIn` (`computed(() => !!user.value)`), `getUser()`, `logout()`. Token itself lives in the `token` cookie (`js-cookie`), not in the store. Route gating uses `app/middleware/auth.js` / `guest.js` via `definePageMeta({ middleware: [...] })` — see the vue-scaffold-v2 skill for adding a new page with one of these.

## What not to do

- Don't call `axios`/`$fetch` directly in a page or component — go through `useApi()` or `useAsyncDataApi()`.
- Don't add a fourth copy of the tenant/env base-URL resolution logic.
- Don't assume `useApi().remove()` sends a request body/params.
- Don't add a new global error page/handler for 404/429/402 — the axios response interceptor already redirects for these.
- Don't remove the `// v1 match` behavior in `app/axios/index.js` without confirming with the user first — it's intentional parity with the older app, not leftover cruft.
