import { defineStore } from 'pinia'
import { createApiFetcher } from '~/services/http'
import { createTasksService } from '~/services/tasks.service'
import type { Task, TaskCreateDto, TaskListQuery, TaskStatus, TaskUpdateDto } from '~/types/tasks'

export const useTasksStore = defineStore('tasks', () => {
  const items = ref<Task[]>([])
  const total = ref(0)
  const page = ref(1)
  const pageSize = ref(10)
  const q = ref('')
  const status = ref<TaskStatus | ''>('')
  const loading = ref(false)
  const error = ref<string | null>(null)

  const apiFetch = createApiFetcher(useRuntimeConfig().public.apiBase)
  const tasksService = createTasksService(apiFetch)

  async function fetchList(partial?: Partial<TaskListQuery>) {
    loading.value = true
    error.value = null
    try {
      if (partial?.page !== undefined) page.value = partial.page
      if (partial?.pageSize !== undefined) pageSize.value = partial.pageSize
      if (partial?.q !== undefined) q.value = partial.q ?? ''
      if (partial?.status !== undefined) status.value = partial.status ?? ''

      const query: TaskListQuery = {
        page: page.value,
        pageSize: pageSize.value,
        q: q.value || undefined,
        status: status.value || undefined,
      }

      const res = await tasksService.list(query)
      items.value = res.items
      total.value = res.total
      page.value = res.page
      pageSize.value = res.pageSize
      return res
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to load tasks'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function create(dto: TaskCreateDto) {
    loading.value = true
    error.value = null
    try {
      await tasksService.create(dto)
      await fetchList()
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to create task'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function update(id: string, dto: TaskUpdateDto) {
    loading.value = true
    error.value = null
    try {
      await tasksService.update(id, dto)
      await fetchList()
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to update task'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function remove(id: string) {
    loading.value = true
    error.value = null
    try {
      await tasksService.remove(id)
      await fetchList()
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to delete task'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    total,
    page,
    pageSize,
    q,
    status,
    loading,
    error,
    fetchList,
    create,
    update,
    remove,
  }
})

