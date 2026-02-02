import { getBpsConfig } from '../utils/bps-sso'
import { handleBpsCallback } from '../utils/bps-callback'
import { getRequestURL } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getRequestURL(event).searchParams
  if (!query.has('code')) {
    return
  }

  const config = getBpsConfig()
  let redirectPath = '/'
  try {
    redirectPath = new URL(config.redirect).pathname || '/'
  } catch {
    redirectPath = config.redirect || '/'
  }

  const currentPath = getRequestURL(event).pathname || '/'
  if (currentPath !== redirectPath) {
    return
  }

  return handleBpsCallback(event)
})
