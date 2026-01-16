import { createError, getQuery } from 'h3'
import { getTasks, requireUser } from '~/server/poc-store'
import type { TaskListResponse, TaskStatus } from '~/types/tasks'

function toNumber(value: unknown, fallback: number) {
  const asNumber = typeof value === 'string' ? Number(value) : typeof value === 'number' ? value : NaN
  return Number.isFinite(asNumber) ? asNumber : fallback
}

export default defineEventHandler((event) => {
  const user = requireUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const query = getQuery(event)
  const q = typeof query.q === 'string' ? query.q.trim().toLowerCase() : ''
  const status = (typeof query.status === 'string' ? query.status : undefined) as TaskStatus | undefined
  const page = Math.max(1, toNumber(query.page, 1))
  const pageSize = Math.min(50, Math.max(1, toNumber(query.pageSize, 10)))

  const all = getTasks()
  const filtered = all.filter((task) => {
    if (q && !task.title.toLowerCase().includes(q)) {
      return false
    }
    if (status && task.status !== status) {
      return false
    }
    return true
  })

  const total = filtered.length
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)

  const response: TaskListResponse = { items, total, page, pageSize }
  return response
})

