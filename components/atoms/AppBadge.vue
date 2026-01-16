<script setup lang="ts">
type Variant = 'gray' | 'blue' | 'green' | 'yellow'

interface Props {
  variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'gray',
})

const variants: Record<Variant, string> = {
  gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
}
</script>

<template>
  <span class="text-xs font-medium px-2.5 py-0.5 rounded" :class="variants[props.variant]">
    <slot />
  </span>
</template>

