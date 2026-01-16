<script setup lang="ts">
interface NavItem {
  label: string
  to: string
  icon?: string
}

interface Props {
  items: NavItem[]
}

defineProps<Props>()
</script>

<template>
  <nav class="space-y-1">
    <NuxtLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
      active-class="bg-gray-100 dark:bg-gray-800 font-medium"
    >
      <Icon v-if="item.icon" :name="item.icon" class="text-lg" />
      <span>{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>

