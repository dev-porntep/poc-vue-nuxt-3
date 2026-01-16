<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: Variant
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  disabled: false,
  loading: false,
})

const isDisabled = computed(() => props.disabled || props.loading)

const base =
  'inline-flex items-center justify-center font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:outline-none'

const variants: Record<Variant, string> = {
  primary:
    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 disabled:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
  secondary:
    'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 disabled:text-gray-400 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700',
  danger:
    'text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 disabled:bg-red-400 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900',
  ghost:
    'text-gray-900 hover:bg-gray-100 focus:ring-gray-200 disabled:text-gray-400 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700',
}
</script>

<template>
  <button :type="type" :disabled="isDisabled" :class="[base, variants[variant]]">
    <AppSpinner v-if="loading" class="mr-2" />
    <slot />
  </button>
</template>

