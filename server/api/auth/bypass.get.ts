import { getQuery, sendRedirect, setCookie } from 'h3'
import { getBpsConfig } from '../../utils/bps-sso'

const encodeSession = (value: unknown) => Buffer.from(JSON.stringify(value)).toString('base64url')

export default defineEventHandler((event) => {
  const config = getBpsConfig()
  if (!config.bypassEnabled) {
    throw createError({ statusCode: 403, statusMessage: 'Bypass disabled' })
  }

  const { email } = getQuery(event)
  if (!email || typeof email !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Email required' })
  }

  const sessionPayload = {
    email,
    nama: 'Bypass User',
    satker: config.allowedSatker
  }

  setCookie(event, config.cookieName, encodeSession(sessionPayload), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  })

  return sendRedirect(event, '/')
})
