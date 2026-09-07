---
name: v2-forms
description: Build or edit any form in otas_tourism_website_v2 — login/signup/contact/profile-style forms and any new ones. Use this skill whenever the user asks to create a form, add a field to an existing form, add a new validation rule, or write a test for a form component. This project uses vee-validate with string-based rules (not the installed zod dependency) and a specific formModule.js + index.vue + index.spec.js file trio with a module-scoped-state gotcha — read this before scaffolding a form so you don't reach for zod or duplicate a form on the same page unsafely.
---

# Forms (otas_tourism_website_v2)

## The file trio

Every form component in this codebase is three colocated files under one folder, e.g. `app/components/Auth/LoginForm/ByEmail/`:

- **`formModule.js`** — form state (`ref`) and submit logic, as plain exported bindings (not inside the component).
- **`index.vue`** — the `<script setup>` component, importing state/handlers from `./formModule.js`.
- **`index.spec.js`** — a Vitest spec using the shared `app/utils/testUtils.js` helpers.

Follow this trio for any new form rather than inlining state/logic into the `.vue` file.

### `formModule.js`

```js
import { ref } from "vue";
import useApi from "../../../../composables/useApi";
const { post, loading } = useApi();
import cookies from "js-cookie";
import { useAuthStore } from "@/stores/auth";

const form = ref({
  email: "",
  password: "",
});

const formData = () => {
  const formData = new FormData();
  formData.append("email", form.value.email);
  formData.append("password", form.value.password);
  return formData;
};

const submited = async (router) => {
  const { getUser } = useAuthStore();
  const { data } = await post("signin", formData());
  if (data?.access_token) {
    cookies.set("token", data.access_token);
    await getUser();
    router.push("/");
  }
};

export { post, form, submited, loading, formData };
```

**Important gotcha**: `form`/`loading`/etc. are module-scoped `ref`s, not per-component-instance state. If the same form component is ever rendered twice on the same page, both instances share the same `form` object. Before doing that, flag it to the user — this is not a supported pattern anywhere in the current codebase.

### `index.vue`

```vue
<template>
  <Form @submit="submitHandler" class="px-3">
    <v-col cols="12" class="pt-2 pb-3">
      <SharedInputText validation="required|email" :hint="$t('hint_email')" :label="$t('email')" name="email" :form="form" />
    </v-col>
    <v-col cols="12" class="pt-2 pb-3">
      <SharedInputPassword validation="required" :hint="$t('hint_password')" :label="$t('enter_password')" name="password" :form="form" />
    </v-col>
    <v-col cols="12">
      <v-btn color="primary" type="submit" :loading="loading" size="large" block>{{ $t("login") }}</v-btn>
    </v-col>
  </Form>
</template>

<script setup>
import { form, submited, loading } from "./formModule.js";
import { useRouter } from "vue-router";
import { Form, useForm } from "vee-validate";

const router = useRouter();
const { handleSubmit } = useForm();
const submitHandler = handleSubmit(async () => {
  await submited(router);
});
</script>
```

- Wrap the form in vee-validate's `<Form>` component and `handleSubmit` from `useForm()`.
- Use a `Shared/Input/<Type>` component per field (`Shared/Input/Text`, `Password`, `Select`, `Boolean`, `Date`, `Number`, `Phone`, `File`, `Counter`, `AutoComplete`, `ButtonGroup`, `Textarea`, `Time`), passing `validation="<rule string>"`, `:form="form"`, and a matching `name`. Never bind a raw `v-text-field` for something an `Input/<Type>` component already covers.
- The `validation` prop is a **string of pipe-separated rule names** (`"required|email"`), not a zod schema object.

## Validation rules — vee-validate string rules, not zod

`zod` and `@vee-validate/zod` are installed dependencies but **nothing in this codebase uses them**. Do not write a zod schema for a new form — it will be inconsistent with every existing form and won't be picked up by the `Shared/Input/*` components (which read a `validation` string prop, not a schema object).

Available rules are registered in `app/plugins/veeValidate.js` via `defineRule`. Standard rules (from `@vee-validate/rules`): `required`, `email`, `between`, `confirmed`, `min`, `max`, `min_value`, `max_value`, `alpha`, `numeric`. Custom project rules defined there: `required_boolean`, `max_words`, `min_words`, `numeric_max`, `numeric_min`, `strongPassword` (uses `app/utils/validate.js`'s `strongPassword` regex), `notSameOld`, `sameAsNew`, `min_time`, `max_time`. Check this list before inventing a new rule name — if you need a rule not listed here, add it to `app/plugins/veeValidate.js` following the existing `defineRule('name', (value, [args]) => ...)` shape, and register its message in **both** `app/utils/veeValidate/en.json` and `app/utils/veeValidate/ar.json`.

## Two separate translation files — don't confuse them

- `i18n/locales/{ar,en}.json` — the app's general UI strings (labels, hints, buttons). Used via `$t()`.
- `app/utils/veeValidate/{ar,en}.json` — vee-validate's own rule-failure messages, fed to `localize()` in `app/plugins/veeValidate.js`. A custom rule (e.g. `numeric_max`, `strongPassword`) reads its message from this dictionary, not from `i18n/locales/`.

Keep both files' `ar`/`en` in sync independently — a key missing from one is a silent gap, not a build error, in both cases.

## Testing a form

Use `app/utils/testUtils.js`, don't hand-roll mount/mock logic:

```js
import { mountComponent, checkValidation, mockingApiCreate } from "../../../../utils/testUtils";
import { describe, it, expect } from 'vitest';
import component from './index.vue';
import { form, post, submited, formData } from './formModule.js';

let wrapper = mountComponent(component);

describe(`test component inputs`, () => {
  it("check inputs", () => {
    checkValidation(wrapper, '[name="email"]', "required|email");
  });
});
```

- `mountComponent(component)` — mounts with Pinia and a mocked `$t` (returns the key as-is).
- `checkValidation(wrapper, selector, expectedValidation)` — asserts the `validation` string prop rendered on a field.
- `mockingApiCreate(wrapper, endpoint, form, methodOrFn, post, expectedPayload, reset, resetData, router, redirect)` — asserts the submit path calls `post` with the expected endpoint/payload.
- The spec file mocks `../composables/useApi` at the top (`vi.mock(...)`) so no real network call happens — follow this pattern rather than mocking axios directly.
- This project's test coverage is form-only and example-driven (11 spec files total, all colocated `index.spec.js`) — add a spec for a new form's validation/submit behavior; don't feel obligated to add exhaustive coverage beyond that.

## What not to do

- Don't use `zod`/`@vee-validate/zod` — no existing form uses them; string-based `validation` props are the actual mechanism.
- Don't inline form state/submit logic directly in `index.vue` — use the `formModule.js` split.
- Don't render the same form component twice on one page without flagging the shared-module-state risk to the user first.
- Don't add a validation rule message to only one of `app/utils/veeValidate/{ar,en}.json`.
- Don't bind a raw Vuetify input (`v-text-field`, etc.) where a `Shared/Input/<Type>` component already exists for that field type.
- Don't hand-roll axios/fetch mocking in a spec — mock `useApi` and use the `testUtils.js` helpers.
