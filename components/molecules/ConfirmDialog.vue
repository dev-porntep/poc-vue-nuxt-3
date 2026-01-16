<script setup lang="ts">
interface Props {
  open: boolean
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  description: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  loading: false,
})

const emit = defineEmits<{
  (e: 'confirm' | 'cancel'): void
}>()
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div class="w-full max-w-md rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        {{ title }}
      </h3>
      <p v-if="description" class="mb-6 text-sm text-gray-600 dark:text-gray-300">
        {{ description }}
      </p>
      <div class="flex justify-end gap-2">
        <AppButton variant="secondary" :disabled="loading" @click="emit('cancel')">
          {{ cancelText }}
        </AppButton>
        <AppButton variant="danger" :loading="loading" @click="emit('confirm')">
          {{ confirmText }}
        </AppButton>
      </div>
    </div>
  </div>
</template>
