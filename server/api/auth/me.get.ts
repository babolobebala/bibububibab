import { getCookie } from 'h3'
import { getBpsConfig } from '../../utils/bps-sso'

const decodeSession = (value?: string) => {
  if (!value) return null
  try {
    return JSON.parse(Buffer.from(value, 'base64url').toString('utf8'))
  } catch {
    return null
  }
}

export default defineEventHandler((event) => {
  const config = getBpsConfig()
  const session = decodeSession(getCookie(event, config.cookieName))
  return { user: session }
})
