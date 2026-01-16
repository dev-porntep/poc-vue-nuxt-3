import { createError } from 'h3'
import { requireUser } from '~/server/poc-store'

export default defineEventHandler((event) => {
  const user = requireUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
  return user
})

