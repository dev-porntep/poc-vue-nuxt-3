<script setup lang="ts">
import type { TaskStatus } from '~/types/tasks'
import { useTasksStore } from '~/stores/tasks'

definePageMeta({
  layout: 'default',
  requiresAuth: true,
})

const tasks = useTasksStore()

const search = ref('')
const status = ref<TaskStatus | ''>('')
const createTitle = ref('')
const createStatus = ref<TaskStatus>('todo')

const editOpen = ref(false)
const editId = ref<string | null>(null)
const editTitle = ref('')
const editStatus = ref<TaskStatus>('todo')

const deleteOpen = ref(false)
const deleteId = ref<string | null>(null)

const statusOptions = [
  { label: 'All', value: '' },
  { label: 'Todo', value: 'todo' },
  { label: 'Doing', value: 'doing' },
  { label: 'Done', value: 'done' },
]

async function reload(partial?: { page?: number }) {
  await tasks.fetchList({
    q: search.value || undefined,
    status: status.value || undefined,
    page: partial?.page ?? tasks.page,
  })
}

function openEdit(id: string) {
  const target = tasks.items.find((t) => t.id === id)
  if (!target) return
  editId.value = id
  editTitle.value = target.title
  editStatus.value = target.status
  editOpen.value = true
}

function openDelete(id: string) {
  deleteId.value = id
  deleteOpen.value = true
}

async function submitCreate() {
  if (!createTitle.value.trim()) return
  await tasks.create({ title: createTitle.value.trim(), status: createStatus.value })
  createTitle.value = ''
  createStatus.value = 'todo'
}

async function submitEdit() {
  if (!editId.value) return
  await tasks.update(editId.value, { title: editTitle.value.trim(), status: editStatus.value })
  editOpen.value = false
}

async function confirmDelete() {
  if (!deleteId.value) return
  await tasks.remove(deleteId.value)
  deleteOpen.value = false
}

async function onPageChange(p: number) {
  await reload({ page: p })
}

onMounted(async () => {
  if (!tasks.items.length) {
    try {
      await reload()
    } catch {
      await navigateTo('/login')
    }
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
        Tasks
      </h1>
      <div class="flex gap-2">
        <AppButton variant="secondary" :loading="tasks.loading" @click="reload()">
          Refresh
        </AppButton>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
      <FormField label="Search">
        <AppInput v-model="search" placeholder="Search by title" />
      </FormField>
      <FormField label="Status">
        <AppSelect v-model="status" :options="statusOptions" />
      </FormField>
      <div class="flex items-end">
        <AppButton class="w-full" variant="primary" :loading="tasks.loading" @click="reload({ page: 1 })">
          Apply Filter
        </AppButton>
      </div>
    </div>

    <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
      <h2 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
        Create Task
      </h2>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
        <FormField label="Title">
          <AppInput v-model="createTitle" placeholder="e.g. Improve README" />
        </FormField>
        <FormField label="Status">
          <AppSelect v-model="createStatus" :options="statusOptions.slice(1)" />
        </FormField>
        <div class="flex items-end">
          <AppButton class="w-full" variant="primary" :loading="tasks.loading" @click="submitCreate">
            Create
          </AppButton>
        </div>
      </div>
    </div>

    <div v-if="tasks.error" class="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
      {{ tasks.error }}
    </div>

    <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table class="w-full text-left text-sm text-gray-700 dark:text-gray-200">
        <thead class="bg-gray-50 text-xs uppercase text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          <tr>
            <th class="px-4 py-3">Title</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in tasks.items" :key="t.id" class="border-t border-gray-200 dark:border-gray-700">
            <td class="px-4 py-3">
              <div class="font-medium text-gray-900 dark:text-white">
                {{ t.title }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Updated: {{ new Date(t.updatedAt).toLocaleString() }}
              </div>
            </td>
            <td class="px-4 py-3">
              <AppBadge :variant="t.status === 'done' ? 'green' : t.status === 'doing' ? 'yellow' : 'gray'">
                {{ t.status }}
              </AppBadge>
            </td>
            <td class="px-4 py-3 text-right">
              <div class="flex justify-end gap-2">
                <AppButton variant="secondary" :disabled="tasks.loading" @click="openEdit(t.id)">
                  Edit
                </AppButton>
                <AppButton variant="danger" :disabled="tasks.loading" @click="openDelete(t.id)">
                  Delete
                </AppButton>
              </div>
            </td>
          </tr>
          <tr v-if="!tasks.loading && tasks.items.length === 0">
            <td class="px-4 py-6 text-center text-gray-500 dark:text-gray-400" colspan="3">
              No tasks found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <PaginationBar :page="tasks.page" :page-size="tasks.pageSize" :total="tasks.total" @update:page="onPageChange" />

    <ConfirmDialog
      :open="deleteOpen"
      title="Delete task?"
      description="This action cannot be undone."
      confirm-text="Delete"
      :loading="tasks.loading"
      @cancel="deleteOpen = false"
      @confirm="confirmDelete"
    />

    <div v-if="editOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div class="w-full max-w-lg rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Edit Task
        </h3>
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
          <FormField label="Title">
            <AppInput v-model="editTitle" />
          </FormField>
          <FormField label="Status">
            <AppSelect v-model="editStatus" :options="statusOptions.slice(1)" />
          </FormField>
        </div>
        <div class="mt-6 flex justify-end gap-2">
          <AppButton variant="secondary" :disabled="tasks.loading" @click="editOpen = false">
            Cancel
          </AppButton>
          <AppButton variant="primary" :loading="tasks.loading" @click="submitEdit">
            Save
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>
