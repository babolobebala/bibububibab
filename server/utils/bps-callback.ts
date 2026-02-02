/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteCookie, getCookie, getQuery, sendRedirect, setCookie } from 'h3'
import { getBpsConfig, getBpsEndpoints, getSatkerCode, mapBpsUser } from './bps-sso'

const encodeSession = (value: unknown) => Buffer.from(JSON.stringify(value)).toString('base64url')

export const handleBpsCallback = async (event: any) => {
  const config = getBpsConfig()
  const endpoints = getBpsEndpoints(config)
  const query = getQuery(event)
  const code = query.code as string | undefined
  const state = query.state as string | undefined

  const storedState = getCookie(event, 'bps_oauth_state')
  deleteCookie(event, 'bps_oauth_state', { path: '/' })

  if (!code || !state || !storedState || state !== storedState) {
    return sendRedirect(event, '/landing-page?sso=error&reason=invalid_state')
  }

  const tokenResponse = await $fetch<Record<string, any>>(endpoints.token, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.redirect,
      client_id: config.clientId,
      client_secret: config.clientSecret
    }).toString()
  })

  const accessToken = tokenResponse.access_token
  if (!accessToken) {
    return sendRedirect(event, '/landing-page?sso=error&reason=token_missing')
  }

  const rawProfile = await $fetch<Record<string, any>>(endpoints.userinfo, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const user = mapBpsUser(rawProfile)
  const satker = getSatkerCode(user)

  if (satker !== config.allowedSatker) {
    return sendRedirect(event, '/landing-page?sso=error&reason=satker')
  }

  const sessionPayload = {
    email: user.email,
    nama: user.nama,
    username: user.username,
    nip: user.nip,
    nip_baru: user.nip_baru,
    golongan: user.golongan,
    jabatan: user.jabatan,
    url_foto: user.url_foto,
    satker
  }

  setCookie(event, config.cookieName, encodeSession(sessionPayload), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  })

  return sendRedirect(event, '/main-menu?sso=success')
}
