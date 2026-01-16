import { createError, readBody } from 'h3'
import { getTasks, isTaskStatus, requireUser } from '~/server/poc-store'
import type { Task, TaskCreateDto } from '~/types/tasks'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody<TaskCreateDto>(event)
  const title = body?.title?.trim()
  if (!title) {
    throw createError({ statusCode: 400, message: 'Title is required' })
  }

  const status = isTaskStatus(body?.status) ? body.status : 'todo'
  const now = new Date().toISOString()

  const task: Task = {
    id: crypto.randomUUID(),
    title,
    status,
    createdAt: now,
    updatedAt: now,
  }

  getTasks().unshift(task)
  return task
})

