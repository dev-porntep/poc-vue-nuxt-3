<template>
  <AppShell :user="auth.user" @logout="onLogout">
    <slot />
  </AppShell>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

async function onLogout() {
  await auth.logout()
  await navigateTo('/login')
}
</script>
