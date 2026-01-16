import type { Task, TaskCreateDto, TaskListQuery, TaskListResponse, TaskUpdateDto } from '~/types/tasks'
import type { ApiFetch } from '~/services/http'
import type { OkResponse } from '~/types/api'

export function createTasksService(apiFetch: ApiFetch) {
  return {
    list: (query: TaskListQuery) =>
      apiFetch<TaskListResponse>('/tasks', {
        method: 'GET',
        query,
      }),
    create: (dto: TaskCreateDto) =>
      apiFetch<Task>('/tasks', {
        method: 'POST',
        body: dto,
      }),
    update: (id: string, dto: TaskUpdateDto) =>
      apiFetch<Task>(`/tasks/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: dto,
      }),
    remove: (id: string) =>
      apiFetch<OkResponse>(`/tasks/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      }),
  }
}
