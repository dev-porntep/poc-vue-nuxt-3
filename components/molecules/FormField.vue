<script setup lang="ts">
interface Props {
  label: string
  error?: string
}

withDefaults(defineProps<Props>(), {
  error: '',
})
</script>

<template>
  <div>
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {{ label }}
    </label>
    <slot />
    <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </p>
  </div>
</template>

