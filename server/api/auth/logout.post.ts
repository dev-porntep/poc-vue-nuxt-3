import { setCookie } from 'h3'

export default defineEventHandler((event) => {
  setCookie(event, 'poc_session', '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })

  return { ok: true }
})

