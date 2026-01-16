<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useTasksStore } from '~/stores/tasks'

definePageMeta({
  layout: 'default',
  requiresAuth: true,
})

const auth = useAuthStore()
const tasks = useTasksStore()

const total = computed(() => tasks.total)
const doneCount = computed(() => tasks.items.filter((t) => t.status === 'done').length)
const doingCount = computed(() => tasks.items.filter((t) => t.status === 'doing').length)
const todoCount = computed(() => tasks.items.filter((t) => t.status === 'todo').length)

const isBootstrapping = computed(() => tasks.loading || !auth.initialized)

onMounted(async () => {
  if (!auth.initialized) {
    try {
      await auth.fetchMe()
    } catch {
      await navigateTo('/login')
    }
  }

  if (!tasks.items.length && !tasks.loading) {
    try {
      await tasks.fetchList({ page: 1, pageSize: 20 })
    } catch {
      await navigateTo('/login')
    }
  }
})
</script>

<template>
  <section class="relative overflow-hidden rounded-2xl border border-white/30 bg-white/40 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/30 sm:p-6">
    <div class="pointer-events-none absolute -top-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl sm:-top-36 sm:h-[22rem] sm:w-[22rem]" />
    <div class="pointer-events-none absolute -bottom-28 left-0 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl sm:-bottom-36 sm:h-[22rem] sm:w-[22rem]" />
    <div class="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl sm:h-[22rem] sm:w-[22rem]" />

    <div class="relative">
      <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div class="min-w-0">
          <h1 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Dashboard
          </h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Bento Grid + Liquid Glass (POC)
          </p>
        </div>

        <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
          <NuxtLink to="/tasks" class="w-full sm:w-auto">
            <AppButton class="w-full sm:w-auto" variant="secondary">
              Open Tasks
            </AppButton>
          </NuxtLink>
          <AppButton class="w-full sm:w-auto" variant="primary" :loading="tasks.loading" @click="tasks.fetchList({ page: 1, pageSize: tasks.pageSize })">
            Refresh
          </AppButton>
        </div>
      </header>

      <div class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
        <div class="lg:col-span-7">
          <BentoCard title="Session" subtitle="Cookie-based mock auth" icon="mdi:account-circle-outline" tone="primary">
            <div class="flex flex-col gap-2">
              <div class="text-xs font-medium text-gray-600 dark:text-gray-300">Signed in as</div>

              <div v-if="isBootstrapping" class="space-y-2">
                <div class="h-6 w-40 animate-pulse rounded bg-gray-900/10 dark:bg-white/10" />
                <div class="h-4 w-64 animate-pulse rounded bg-gray-900/10 dark:bg-white/10" />
              </div>
              <template v-else>
                <div class="text-lg font-semibold leading-tight text-gray-900 dark:text-white">
                  {{ auth.user?.name || '—' }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ auth.user?.email || '—' }}
                  <span class="px-1">•</span>
                  {{ auth.user?.role || '—' }}
                </div>
              </template>

              <div class="pt-2">
                <NuxtLink to="/login">
                  <AppButton variant="ghost">View Login</AppButton>
                </NuxtLink>
              </div>
            </div>
          </BentoCard>
        </div>

        <div class="lg:col-span-5">
          <BentoCard title="Task Summary" subtitle="Live from Nitro in-memory API" icon="mdi:check-circle-outline" tone="neutral">
            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-xl border border-white/30 bg-white/60 p-3 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/10 dark:bg-white/5">
                <div class="text-xs font-medium text-gray-500 dark:text-gray-400">Total</div>
                <div v-if="tasks.loading" class="mt-2 h-8 w-10 animate-pulse rounded bg-gray-900/10 dark:bg-white/10" />
                <div v-else class="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ total }}</div>
              </div>
              <div class="rounded-xl border border-white/30 bg-white/60 p-3 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/10 dark:bg-white/5">
                <div class="text-xs font-medium text-gray-500 dark:text-gray-400">Done</div>
                <div v-if="tasks.loading" class="mt-2 h-8 w-10 animate-pulse rounded bg-gray-900/10 dark:bg-white/10" />
                <div v-else class="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ doneCount }}</div>
              </div>
              <div class="rounded-xl border border-white/30 bg-white/60 p-3 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/10 dark:bg-white/5">
                <div class="text-xs font-medium text-gray-500 dark:text-gray-400">Doing</div>
                <div v-if="tasks.loading" class="mt-2 h-8 w-10 animate-pulse rounded bg-gray-900/10 dark:bg-white/10" />
                <div v-else class="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ doingCount }}</div>
              </div>
              <div class="rounded-xl border border-white/30 bg-white/60 p-3 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/10 dark:bg-white/5">
                <div class="text-xs font-medium text-gray-500 dark:text-gray-400">Todo</div>
                <div v-if="tasks.loading" class="mt-2 h-8 w-10 animate-pulse rounded bg-gray-900/10 dark:bg-white/10" />
                <div v-else class="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ todoCount }}</div>
              </div>
            </div>
          </BentoCard>
        </div>

        <div class="lg:col-span-6">
          <BentoCard title="Architecture" subtitle="Page → Store → Service → API" icon="mdi:source-branch" tone="success">
            <div class="space-y-3 text-sm leading-6 text-gray-700 dark:text-gray-200">
              <div class="flex items-center gap-3">
                <AppBadge variant="blue">UI</AppBadge>
                <span>Atomic components (atoms/molecules/organisms)</span>
              </div>
              <div class="flex items-center gap-3">
                <AppBadge variant="gray">State</AppBadge>
                <span>Pinia Setup Stores</span>
              </div>
              <div class="flex items-center gap-3">
                <AppBadge variant="yellow">Service</AppBadge>
                <span>Repository pattern with typed API fetcher</span>
              </div>
              <div class="flex items-center gap-3">
                <AppBadge variant="green">API</AppBadge>
                <span>Nitro server routes + in-memory seed</span>
              </div>
            </div>
          </BentoCard>
        </div>

        <div class="lg:col-span-6">
          <BentoCard title="Quick Actions" subtitle="Jump to demo flows" icon="mdi:rocket-launch-outline" tone="warning">
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <NuxtLink to="/tasks" class="w-full">
                <AppButton class="w-full" variant="primary">Manage Tasks</AppButton>
              </NuxtLink>
              <NuxtLink to="/login" class="w-full">
                <AppButton class="w-full" variant="secondary">Re-Login</AppButton>
              </NuxtLink>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  </section>
</template>
