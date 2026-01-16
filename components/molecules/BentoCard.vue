<script setup lang="ts">
type Tone = 'neutral' | 'primary' | 'success' | 'warning'

interface Props {
  title: string
  subtitle?: string
  icon?: string
  tone?: Tone
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: '',
  icon: '',
  tone: 'neutral',
})

const tones: Record<Tone, string> = {
  neutral: 'from-white/10 to-white/0 dark:from-white/10 dark:to-white/0',
  primary: 'from-blue-500/15 to-blue-500/0 dark:from-blue-400/15 dark:to-blue-400/0',
  success: 'from-emerald-500/15 to-emerald-500/0 dark:from-emerald-400/15 dark:to-emerald-400/0',
  warning: 'from-amber-500/15 to-amber-500/0 dark:from-amber-400/15 dark:to-amber-400/0',
}
</script>

<template>
  <section class="relative overflow-hidden rounded-2xl border border-white/30 bg-white/60 p-5 shadow-sm backdrop-blur-xl transition will-change-transform hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500/30 dark:border-white/10 dark:bg-gray-900/40 dark:hover:shadow-black/20">
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-br" :class="tones[props.tone]" />
    <div class="relative flex items-start justify-between gap-4">
      <div>
        <div class="text-sm font-medium text-gray-700 dark:text-gray-200">
          {{ title }}
        </div>
        <div v-if="subtitle" class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {{ subtitle }}
        </div>
      </div>
      <div v-if="icon" class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/70 text-gray-700 shadow-sm dark:border-white/10 dark:bg-gray-900/50 dark:text-gray-200">
        <Icon :name="icon" class="text-xl" />
      </div>
    </div>

    <div class="relative mt-4">
      <slot />
    </div>
  </section>
</template>
