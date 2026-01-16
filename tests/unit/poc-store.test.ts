import { describe, expect, it } from 'vitest'
import { getTasks, isTaskStatus } from '~/server/poc-store'

describe('poc-store', () => {
  it('seeds tasks on first access', () => {
    const tasks = getTasks()
    expect(tasks.length).toBeGreaterThan(0)
    expect(tasks[0]).toHaveProperty('id')
  })

  it('validates task status', () => {
    expect(isTaskStatus('todo')).toBe(true)
    expect(isTaskStatus('doing')).toBe(true)
    expect(isTaskStatus('done')).toBe(true)
    expect(isTaskStatus('invalid')).toBe(false)
  })
})

