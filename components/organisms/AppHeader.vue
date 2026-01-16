<script setup lang="ts">
import type { User } from '~/types/auth'

interface Props {
  user: User | null
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'logout'): void
}>()
</script>

<template>
  <header class="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <NuxtLink to="/" class="flex items-center gap-2 text-gray-900 dark:text-white">
        <Icon name="mdi:layers-outline" class="text-xl" />
        <span class="font-semibold">Enterprise POC</span>
      </NuxtLink>

      <div class="flex items-center gap-3">
        <div v-if="user" class="text-sm text-gray-700 dark:text-gray-200">
          {{ user.name }} ({{ user.role }})
        </div>
        <AppButton v-if="user" variant="secondary" @click="emit('logout')">
          Logout
        </AppButton>
        <NuxtLink v-else to="/login">
          <AppButton variant="primary">
            Login
          </AppButton>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
