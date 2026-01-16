export type TaskStatus = 'todo' | 'doing' | 'done'

export interface Task {
  id: string
  title: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

export interface TaskCreateDto {
  title: string
  status?: TaskStatus
}

export interface TaskUpdateDto {
  title?: string
  status?: TaskStatus
}

export interface TaskListQuery {
  q?: string
  status?: TaskStatus
  page?: number
  pageSize?: number
}

export interface TaskListResponse {
  items: Task[]
  total: number
  page: number
  pageSize: number
}

