import { sendRedirect, setCookie } from 'h3'
import { buildAuthUrl, createState, getBpsConfig } from '../../utils/bps-sso'

export default defineEventHandler(async (event) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const config = getBpsConfig()
  const state = createState()

  setCookie(event, 'bps_oauth_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  })

  const authUrl = buildAuthUrl(event, state)
  return sendRedirect(event, authUrl)
})
