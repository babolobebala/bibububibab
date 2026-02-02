import { deleteCookie, sendRedirect } from 'h3'
import { getBpsConfig } from '../../utils/bps-sso'

export default defineEventHandler((event) => {
  const config = getBpsConfig()
  deleteCookie(event, config.cookieName, { path: '/' })
  return sendRedirect(event, '/')
})
