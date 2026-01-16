<template>
  <div class="mx-auto max-w-3xl p-8 text-center">
    <h1 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
      Nuxt Enterprise POC
    </h1>
    <p class="mb-8 text-gray-600 dark:text-gray-300">
      Demo: Auth + Task CRUD พร้อมโครงสร้างแบบ Enterprise (Atomic + Pinia + Service Layer)
    </p>
    <div class="flex flex-col items-center justify-center gap-3 sm:flex-row">
      <NuxtLink to="/dashboard">
        <AppButton variant="primary">
          Open Dashboard
        </AppButton>
      </NuxtLink>
      <NuxtLink to="/tasks">
        <AppButton variant="secondary">
          Go to Tasks
        </AppButton>
      </NuxtLink>
    </div>
    <div class="mt-8 text-sm text-gray-500 dark:text-gray-400">
      Credentials: admin@example.com / admin123
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>
