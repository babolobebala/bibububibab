/* eslint-disable import/no-duplicates */
import { getCookie, sendRedirect } from 'h3'
import { getBpsConfig } from '../utils/bps-sso'
import { getRequestURL } from 'h3'

export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  if (url.pathname !== '/') {
    return
  }

  if (url.searchParams.has('code')) {
    return
  }

  const config = getBpsConfig()
  const session = getCookie(event, config.cookieName)

  if (session) {
    return sendRedirect(event, '/main-menu')
  }

  return sendRedirect(event, '/landing-page')
})
