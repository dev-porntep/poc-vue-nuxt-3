import { createError, getRouterParam, readBody } from 'h3'
import { getTasks, isTaskStatus, requireUser } from '~/server/poc-store'
import type { TaskUpdateDto } from '~/types/tasks'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'Task id is required' })
  }

  const body = await readBody<TaskUpdateDto>(event)
  const tasks = getTasks()
  const existing = tasks.find((t) => t.id === id)
  if (!existing) {
    throw createError({ statusCode: 404, message: 'Task not found' })
  }

  const nextTitle = typeof body?.title === 'string' ? body.title.trim() : undefined
  if (nextTitle !== undefined) {
    if (!nextTitle) {
      throw createError({ statusCode: 400, message: 'Title is required' })
    }
    existing.title = nextTitle
  }

  if (body?.status !== undefined) {
    if (!isTaskStatus(body.status)) {
      throw createError({ statusCode: 400, message: 'Invalid status' })
    }
    existing.status = body.status
  }

  existing.updatedAt = new Date().toISOString()
  return existing
})

