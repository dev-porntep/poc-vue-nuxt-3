<script setup lang="ts">
import type { LoginDto } from '~/types/auth'
import AppButton from '~/components/atoms/AppButton.vue'
import AppInput from '~/components/atoms/AppInput.vue'
import FormField from '~/components/molecules/FormField.vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'auth',
})

const auth = useAuthStore()
const email = ref('admin@example.com')
const password = ref('admin123')
const emailError = ref('')
const passwordError = ref('')
const formError = ref<string | null>(null)

async function submit() {
  formError.value = null
  emailError.value = ''
  passwordError.value = ''

  const normalizedEmail = email.value.trim()
  if (!normalizedEmail) {
    emailError.value = 'Email is required'
  } else if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
    emailError.value = 'Email is invalid'
  }

  if (!password.value) {
    passwordError.value = 'Password is required'
  }

  if (emailError.value || passwordError.value) return

  const dto: LoginDto = { email: normalizedEmail, password: password.value }
  try {
    await auth.login(dto)
    await navigateTo('/dashboard')
  } catch (e: unknown) {
    formError.value = e instanceof Error ? e.message : 'Login failed'
  }
}
</script>

<template>
  <div>
    <h1 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      Login
    </h1>
    <p class="mb-6 text-sm text-gray-600 dark:text-gray-300">
      Use mock credentials to explore the POC
    </p>

    <form class="space-y-4" @submit.prevent="submit">
      <FormField label="Email" :error="emailError">
        <AppInput v-model="email" type="email" autocomplete="email" />
      </FormField>

      <FormField label="Password" :error="passwordError">
        <AppInput v-model="password" type="password" autocomplete="current-password" />
      </FormField>

      <p v-if="formError" class="text-sm text-red-600 dark:text-red-400">
        {{ formError }}
      </p>

      <AppButton type="submit" class="w-full" :loading="auth.loading">
        Sign in
      </AppButton>
    </form>
  </div>
</template>
