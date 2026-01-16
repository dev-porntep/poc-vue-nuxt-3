import { createError, getRouterParam } from 'h3'
import { getTasks, requireUser } from '~/server/poc-store'

export default defineEventHandler((event) => {
  const user = requireUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'Task id is required' })
  }

  const tasks = getTasks()
  const index = tasks.findIndex((t) => t.id === id)
  if (index < 0) {
    throw createError({ statusCode: 404, message: 'Task not found' })
  }

  tasks.splice(index, 1)
  return { ok: true }
})

