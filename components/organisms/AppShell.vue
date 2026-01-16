<script setup lang="ts">
import type { User } from '~/types/auth'

interface Props {
  user: User | null
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'logout'): void
}>()

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: 'mdi:view-dashboard-outline' },
  { label: 'Tasks', to: '/tasks', icon: 'mdi:check-circle-outline' },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <AppHeader :user="user" @logout="emit('logout')" />
    <div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[220px_1fr]">
      <aside class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        <SideNav :items="navItems" />
      </aside>
      <main class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        <slot />
      </main>
    </div>
  </div>
</template>

