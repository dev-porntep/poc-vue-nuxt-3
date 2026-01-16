import { readBody, setCookie, createError } from 'h3'
import type { LoginDto, User } from '~/types/auth'
import { getSessions } from '~/server/poc-store'

const ADMIN_EMAIL = 'admin@example.com'
const ADMIN_PASSWORD = 'admin123'

const ADMIN_USER: User = {
  id: 'u-admin',
  email: ADMIN_EMAIL,
  name: 'Admin',
  role: 'admin',
}

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginDto>(event)

  if (!body?.email || !body?.password) {
    throw createError({ statusCode: 400, message: 'Email and password are required' })
  }

  if (body.email !== ADMIN_EMAIL || body.password !== ADMIN_PASSWORD) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  const sessionId = crypto.randomUUID()
  getSessions().set(sessionId, ADMIN_USER)

  setCookie(event, 'poc_session', sessionId, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  })

  return ADMIN_USER
})

