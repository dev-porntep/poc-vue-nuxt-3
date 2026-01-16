## What’s happening
- [login.vue](file:///Users/porntepdannoi/github/poc-vue-nuxt-3/pages/login.vue) uses local writable refs (`email`, `password`) and standard `v-model` bindings, so the page code itself is not inherently “read-only”.
- The `AppInput` atom is implemented as a controlled input using `:value` + a manual `@input` emit ([AppInput.vue](file:///Users/porntepdannoi/github/poc-vue-nuxt-3/components/atoms/AppInput.vue)). This usually works, but it can break input on some devices/browsers/input methods (notably IME/composition input on mobile/Asian keyboards), where emitting and immediately re-setting `:value` can cancel composition and make it feel like you “can’t type”.
- No `disabled`, `readonly`, overlay, or `pointer-events-none` is applied by [auth.vue](file:///Users/porntepdannoi/github/poc-vue-nuxt-3/layouts/auth.vue), [FormField.vue](file:///Users/porntepdannoi/github/poc-vue-nuxt-3/components/molecules/FormField.vue), or global CSS, so the most plausible code-level cause is the input event handling approach inside `AppInput`.

## Fix (code changes)
1. Update the `AppInput` atom to rely on Vue’s native `v-model` directive on the underlying `<input>` instead of a manual `@input` handler:
   - Create a computed getter/setter proxy to `modelValue` and bind it via `v-model`.
   - This uses Vue’s built-in composition/IME handling and is more robust across browsers/devices.
2. Harden `modelValue` handling:
   - Allow `modelValue` to default to `''` (prevents “controlled input locked to undefined” edge cases).
3. (Optional but recommended) Remove the random ID generation in `AppInput`:
   - `Math.random()` in SSR can cause hydration attribute mismatches.
   - If no `id` is provided, omit the `id` attribute entirely.

## Login form validation / submission checks
4. Keep submission handling in [login.vue](file:///Users/porntepdannoi/github/poc-vue-nuxt-3/pages/login.vue) as-is (it already uses `@submit.prevent` and try/catch).
5. Add lightweight client-side validation (non-breaking) before calling `auth.login`:
   - Require non-empty email/password.
   - Optionally validate email format.
   - Show errors via `FormField`’s existing `error` prop.
   - Do not log credentials; preserve existing store/service flow.

## Verification (after applying changes)
6. Test input scenarios:
   - Type, delete, select-all/replace, paste.
   - Mobile autofill/password managers.
   - IME composition (e.g., Thai/Japanese/Chinese keyboards).
7. Test submission scenarios:
   - Empty fields (client validation errors shown).
   - Wrong credentials (server/store error surfaced).
   - Correct credentials (navigate to `/dashboard`).
8. Cross-browser spot-check:
   - Chrome + Safari (macOS), and Firefox if available.

Once you confirm, I’ll implement the changes (primarily in `components/atoms/AppInput.vue`, plus small validation wiring in `pages/login.vue`) and then verify in the running dev server.