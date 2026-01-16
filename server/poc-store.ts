import { getCookie } from 'h3'
import type { H3Event } from 'h3'
import type { User } from '~/types/auth'
import type { Task, TaskStatus } from '~/types/tasks'

type PocState = {
  sessions: Map<string, User>
  tasks: Task[]
  seeded: boolean
}

function getState(): PocState {
  const anyGlobal = globalThis as unknown as { __pocState?: PocState }
  if (!anyGlobal.__pocState) {
    anyGlobal.__pocState = {
      sessions: new Map<string, User>(),
      tasks: [],
      seeded: false,
    }
  }
  return anyGlobal.__pocState
}

export function getSessions() {
  return getState().sessions
}

export function getTasks() {
  const state = getState()
  if (!state.seeded) {
    const now = new Date().toISOString()
    state.tasks = [
      { id: 't-1', title: 'Review architecture guidelines', status: 'todo', createdAt: now, updatedAt: now },
      { id: 't-2', title: 'Implement Auth session cookie', status: 'doing', createdAt: now, updatedAt: now },
      { id: 't-3', title: 'Create Task CRUD demo', status: 'done', createdAt: now, updatedAt: now },
    ]
    state.seeded = true
  }
  return state.tasks
}

export function requireUser(event: H3Event) {
  const sessionId = getCookie(event, 'poc_session')
  if (!sessionId) {
    return null
  }
  return getSessions().get(sessionId) ?? null
}

export function isTaskStatus(value: unknown): value is TaskStatus {
  return value === 'todo' || value === 'doing' || value === 'done'
}

