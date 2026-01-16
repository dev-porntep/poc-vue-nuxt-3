<script setup lang="ts">
interface Props {
  page: number
  pageSize: number
  total: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:page', value: number): void
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const canPrev = computed(() => props.page > 1)
const canNext = computed(() => props.page < totalPages.value)
</script>

<template>
  <div class="flex items-center justify-between gap-4">
    <p class="text-sm text-gray-600 dark:text-gray-300">
      Page {{ page }} / {{ totalPages }}
    </p>
    <div class="flex gap-2">
      <AppButton variant="secondary" :disabled="!canPrev" @click="emit('update:page', page - 1)">
        Prev
      </AppButton>
      <AppButton variant="secondary" :disabled="!canNext" @click="emit('update:page', page + 1)">
        Next
      </AppButton>
    </div>
  </div>
</template>

